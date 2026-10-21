import { createHash } from 'node:crypto';
import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { renderServiceWorker } from './service-worker.mjs';

async function readPublicFiles(directory, prefix = '') {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (entry.name.startsWith('.')) continue;
    const name = prefix + entry.name;
    if (entry.isDirectory()) {
      files.push(...await readPublicFiles(join(directory, entry.name), name + '/'));
    } else if (entry.isFile()) {
      files.push([name, await readFile(join(directory, entry.name))]);
    }
  }
  return files;
}

export function portfolioPwa() {
  let publicDirectory;
  return {
    name: 'portfolio-pwa',
    apply: 'build',
    configResolved(config) {
      publicDirectory = config.publicDir;
    },
    generateBundle: {
      // Vite emits index.html in its own generateBundle hook.
      order: 'post',
      async handler(_options, bundle) {
        if (!bundle['index.html']) this.error('The offline app shell is missing from the PWA build.');
        const assets = Object.values(bundle).map(asset => [
          asset.fileName,
          asset.type === 'chunk' ? asset.code : asset.source,
        ]);
        if (publicDirectory) assets.push(...await readPublicFiles(publicDirectory));
        assets.sort(([first], [second]) => first.localeCompare(second));

        const hash = createHash('sha256').update(renderServiceWorker.toString());
        for (const [name, contents] of assets) hash.update(name).update(contents);
        const version = hash.digest('hex').slice(0, 16);
        const paths = [...new Set(assets.map(([name]) => encodeURI(name)))];
        this.emitFile({ type: 'asset', fileName: 'sw.js', source: renderServiceWorker(version, paths) });
      },
    },
  };
}
