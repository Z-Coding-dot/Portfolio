import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { test } from 'node:test';
import { runInNewContext } from 'node:vm';
import { renderServiceWorker } from '../scripts/service-worker.mjs';
import { createInstallStore } from '../src/pwa/installStore.js';

function workerHarness(source, scope, resources) {
  const handlers = new Map();
  const storage = new Map();
  let offline = false;
  let networkCalls = 0;
  let claimed = false;
  const fetchResource = async (request) => {
    networkCalls++;
    if (offline) throw new TypeError('Offline');
    const url = typeof request === 'string' ? request : request.url;
    return resources.has(url)
      ? new Response(resources.get(url))
      : new Response('Not found', { status: 404 });
  };
  const caches = {
    keys: async () => [...storage.keys()],
    delete: async (name) => storage.delete(name),
    async open(name) {
      if (!storage.has(name)) storage.set(name, new Map());
      const entries = storage.get(name);
      return {
        async addAll(urls) {
          const responses = await Promise.all(urls.map(fetchResource));
          if (responses.some((response) => !response.ok)) throw new Error('Precache request failed');
          urls.forEach((url, index) => entries.set(url, responses[index]));
        },
        match: async (key) => entries.get(key)?.clone(),
      };
    },
  };
  runInNewContext(source, {
    URL, Set, caches, fetch: fetchResource,
    self: {
      registration: { scope },
      location: { origin: new URL(scope).origin },
      clients: { claim: async () => { claimed = true; } },
      addEventListener: (type, listener) => handlers.set(type, listener),
    },
  });
  return {
    storage,
    setOffline: () => { offline = true; },
    networkCalls: () => networkCalls,
    claimed: () => claimed,
    async lifecycle(type) {
      let completion;
      handlers.get(type)({ waitUntil: (promise) => { completion = promise; } });
      await completion;
    },
    async request(path, options = {}) {
      let response;
      handlers.get('fetch')({
        request: { url: new URL(path, scope).href, method: 'GET', mode: 'cors', ...options },
        respondWith: (promise) => { response = promise; },
      });
      return response;
    },
  };
}

test('the built app and its complete assets load from cache while offline', async () => {
  const scope = 'https://portfolio.example/';
  const source = await readFile(new URL('../dist/sw.js', import.meta.url), 'utf8');
  const paths = JSON.parse(source.match(/const PRECACHE_URLS = (\[[^\n]+\])\.map/)[1]);
  assert.ok(paths.includes('index.html'), 'The generated service worker must precache HTML');
  assert.ok(paths.some((path) => /assets\/.*\.js$/.test(path)));
  assert.ok(paths.some((path) => /assets\/.*\.css$/.test(path)));
  const resources = new Map();
  for (const path of paths) {
    resources.set(new URL(path, scope).href, await readFile(resolve('dist', decodeURI(path))));
  }
  const worker = workerHarness(source, scope, resources);
  await worker.lifecycle('install');
  await worker.lifecycle('activate');
  assert.equal(worker.claimed(), true);
  worker.setOffline();
  const calls = worker.networkCalls();
  const page = await worker.request('./?source=installed', { mode: 'navigate' });
  assert.equal(await page.text(), resources.get(scope + 'index.html').toString());
  for (const path of paths) {
    const response = await worker.request(path, { mode: path.endsWith('.pdf') ? 'navigate' : 'cors' });
    assert.ok(response?.ok, `Offline asset missing: ${path}`);
    assert.deepEqual(Buffer.from(await response.arrayBuffer()), resources.get(new URL(path, scope).href));
  }
  assert.equal(worker.networkCalls(), calls, 'Cached content must not hit the network');
  assert.equal(await worker.request('/api/contact', { method: 'POST' }), undefined);
  assert.equal(await worker.request('https://external.example/project'), undefined);
  assert.equal(await worker.request('/unknown-file.png'), undefined);
});

test('cache updates stay within the app scope and support subdirectory hosting', async () => {
  const scope = 'https://portfolio.example/portfolio/';
  const paths = ['index.html', 'assets/app.js', 'Parsa_CV.pdf'];
  const resources = new Map(paths.map((path) => [new URL(path, scope).href, path]));
  const worker = workerHarness(renderServiceWorker('new-version', paths), scope, resources);
  const oldCache = 'parsa-portfolio:' + scope + ':old-version';
  const siblingCache = 'parsa-portfolio:https://portfolio.example/other/:old-version';
  worker.storage.set(oldCache, new Map());
  worker.storage.set(siblingCache, new Map());
  worker.storage.set('another-app', new Map());
  await worker.lifecycle('install');
  assert.ok(worker.storage.has(oldCache), 'Installing an update must not delete the active cache');
  await worker.lifecycle('activate');
  assert.equal(worker.storage.has(oldCache), false);
  assert.equal(worker.storage.has(siblingCache), true);
  assert.equal(worker.storage.has('another-app'), true);
  worker.setOffline();
  assert.equal(await (await worker.request('./', { mode: 'navigate' })).text(), 'index.html');
  assert.equal(await (await worker.request('Parsa_CV.pdf', { mode: 'navigate' })).text(), 'Parsa_CV.pdf');
});

test('manifest, icons, and HTML provide install metadata with valid PNG sizes', async () => {
  const manifest = JSON.parse(await readFile(new URL('../dist/manifest.webmanifest', import.meta.url), 'utf8'));
  assert.equal(manifest.display, 'standalone');
  assert.ok(manifest.name && manifest.short_name && manifest.start_url && manifest.id);
  for (const size of [192, 512]) {
    const icon = manifest.icons.find((entry) => entry.sizes === `${size}x${size}` && entry.purpose === 'any');
    assert.ok(icon);
    const png = await readFile(new URL('../dist/' + icon.src, import.meta.url));
    assert.equal(png.subarray(1, 4).toString(), 'PNG');
    assert.equal(png.readUInt32BE(16), size);
    assert.equal(png.readUInt32BE(20), size);
  }
  const maskable = manifest.icons.find((entry) => entry.purpose === 'maskable');
  assert.ok(maskable);
  const html = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8');
  assert.match(html, /rel="manifest"/);
  assert.match(html, /rel="apple-touch-icon"/);
  assert.match(html, /name="theme-color"/);
});

function browserHarness({ standalone = false, ...navigator } = {}) {
  const browser = new EventTarget();
  const displayMode = new EventTarget();
  displayMode.matches = standalone;
  Object.assign(browser, {
    navigator: { userAgent: 'Chrome', platform: 'Win32', maxTouchPoints: 0, ...navigator },
    isSecureContext: true,
    matchMedia: () => displayMode,
  });
  return browser;
}

test('install prompts are consumed once, dismissal can retry, and installed state comes from the browser', async () => {
  const browser = browserHarness();
  const store = createInstallStore();
  const cleanup = store.initialize(browser);
  let prompts = 0;
  for (const outcome of ['dismissed', 'accepted']) {
    const event = new Event('beforeinstallprompt', { cancelable: true });
    event.prompt = async () => { prompts++; };
    event.userChoice = Promise.resolve({ outcome });
    browser.dispatchEvent(event);
    assert.equal(event.defaultPrevented, true);
    assert.equal(store.getSnapshot().canPrompt, true);
    assert.equal(await store.prompt(), outcome);
    assert.equal(await store.prompt(), 'unavailable');
    assert.equal(store.getSnapshot().installed, false);
  }
  assert.equal(prompts, 2);
  browser.dispatchEvent(new Event('appinstalled'));
  assert.equal(store.getSnapshot().installed, true);
  assert.equal(store.getSnapshot().canPrompt, false);
  cleanup();
});

test('failed prompts recover and already installed sessions are detected', async () => {
  const browser = browserHarness();
  const store = createInstallStore();
  const cleanup = store.initialize(browser);
  const event = new Event('beforeinstallprompt', { cancelable: true });
  event.prompt = async () => { throw new Error('Browser rejected prompt'); };
  browser.dispatchEvent(event);
  assert.equal(await store.prompt(), 'unavailable');
  assert.equal(store.getSnapshot().canPrompt, false);
  cleanup();
  const installedStore = createInstallStore();
  installedStore.initialize(browserHarness({ standalone: true }));
  assert.equal(installedStore.getSnapshot().installed, true);
});

test('iPhone and iPad offer manual installation without claiming a native prompt is available', () => {
  for (const device of [
    { userAgent: 'iPhone Safari' },
    { userAgent: 'iPad Safari' },
    { userAgent: 'iPhone CriOS' },
    { userAgent: 'Macintosh Safari', platform: 'MacIntel', maxTouchPoints: 5 },
  ]) {
    const browser = browserHarness(device);
    const store = createInstallStore();
    const cleanup = store.initialize(browser);
    assert.equal(store.getSnapshot().isAppleMobile, true);
    assert.equal(store.getSnapshot().canPrompt, false);
    assert.equal(store.getSnapshot().installed, false);
    cleanup();
    assert.equal(store.getSnapshot().isAppleMobile, false);
  }
  for (const device of [
    { userAgent: 'Macintosh Safari', platform: 'MacIntel', maxTouchPoints: 0 },
    { userAgent: 'Android Chrome', platform: 'Linux', maxTouchPoints: 5 },
  ]) {
    const store = createInstallStore();
    store.initialize(browserHarness(device));
    assert.equal(store.getSnapshot().isAppleMobile, false);
  }
  const launchedFromHomeScreen = browserHarness({ userAgent: 'iPhone Safari' });
  launchedFromHomeScreen.navigator.standalone = true;
  const installedStore = createInstallStore();
  installedStore.initialize(launchedFromHomeScreen);
  assert.equal(installedStore.getSnapshot().installed, true);
});

test('Apple devices have separate icons at their expected sizes', async () => {
  const html = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8');
  for (const size of [152, 167, 180]) {
    assert.ok(html.includes(`sizes="${size}x${size}"`));
    const icon = await readFile(new URL(`../dist/icons/z-apple-touch-${size}.png`, import.meta.url));
    assert.equal(icon.readUInt32BE(16), size);
    assert.equal(icon.readUInt32BE(20), size);
  }
});
