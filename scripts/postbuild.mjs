// GitHub Pages SPA fallback: unknown paths serve 404.html, which boots the app and lets the router resolve them
import { copyFileSync } from 'node:fs';

copyFileSync('dist/index.html', 'dist/404.html');
