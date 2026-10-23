import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';

// Preview builds pass VITE_BASE=/ktsierra_portfolio/preview/a/ (or /b/)
const base = process.env.VITE_BASE ?? '/ktsierra_portfolio/';

// Fonts the first paint needs: the Archivo wdth latin file and JetBrains Mono 400 latin
const PRELOAD = [/archivo-latin-wdth-normal-.*\.woff2$/, /jetbrains-mono-latin-400-normal-.*\.woff2$/];

/** Adds <link rel="preload"> for the hashed font files at build time */
const preloadFonts = (): Plugin => ({
  name: 'preload-fonts',
  apply: 'build',
  transformIndexHtml: {
    order: 'post',
    handler: (_html, ctx) => {
      const files = Object.keys(ctx.bundle ?? {}).filter((f) => PRELOAD.some((re) => re.test(f)));
      return files.map((f) => ({
        tag: 'link',
        attrs: { rel: 'preload', href: `${base}${f}`, as: 'font', type: 'font/woff2', crossorigin: '' },
        injectTo: 'head-prepend' as const,
      }));
    },
  },
});

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react(), preloadFonts()],
  base,
});
