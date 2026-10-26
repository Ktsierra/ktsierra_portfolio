// GitHub Pages serves static files only. Two things make the client-side routes work there:
//  1. 404.html, a copy of index.html, so unknown paths still boot the app and the router resolves them.
//  2. A real index.html for every page listed in the sitemap (e.g. /work/skyvault/), so those pages
//     answer 200 instead of 404 and can be indexed. The sitemap is the single list of public routes.
import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

copyFileSync('dist/index.html', 'dist/404.html');

const sitemap = readFileSync('dist/sitemap.xml', 'utf8');
for (const [, loc] of sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)) {
  const path = new URL(loc).pathname.replace(/^\/|\/$/g, '');
  if (!path) continue;
  mkdirSync(join('dist', path), { recursive: true });
  copyFileSync('dist/index.html', join('dist', path, 'index.html'));
}
