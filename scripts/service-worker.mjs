export function renderServiceWorker(version, paths) {
  return `
const CACHE_PREFIX = 'parsa-portfolio:' + self.registration.scope + ':';
const CACHE_NAME = CACHE_PREFIX + ${JSON.stringify(version)};
const PRECACHE_URLS = ${JSON.stringify(paths)}.map(path => new URL(path, self.registration.scope).href);
const PRECACHE_SET = new Set(PRECACHE_URLS);
const APP_SHELL = new URL('index.html', self.registration.scope).href;
const SCOPE_PATH = new URL(self.registration.scope).pathname;

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(PRECACHE_URLS)));
});

// Let an existing session finish before replacing its cached app version.
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(names
      .filter(name => name.startsWith(CACHE_PREFIX) && name !== CACHE_NAME)
      .map(name => caches.delete(name)));
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== self.location.origin) return;

  const isAppNavigation = request.mode === 'navigate'
    && (url.pathname === SCOPE_PATH || url.pathname === SCOPE_PATH + 'index.html');
  url.search = '';
  url.hash = '';
  const key = isAppNavigation ? APP_SHELL : url.href;
  if (!PRECACHE_SET.has(key)) return;

  event.respondWith((async () => {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(key);
    return cached || fetch(request);
  })());
});
`.trimStart();
}
