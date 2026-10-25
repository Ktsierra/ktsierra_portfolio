# ktsierra_portfolio

Jose Sierra's portfolio: <https://ktsierra.github.io/ktsierra_portfolio/>

The "Data Plate" design: an aviation technical manual look, with paper, ink, hairline rules and one signal orange.

## Stack

- Vite, React 19, TypeScript (strict), react-router-dom
- Tailwind CSS v4. The tokens live in `src/index.css` (`@theme`)
- Self-hosted fonts: Archivo variable (with the `wdth` axis) and JetBrains Mono, from `@fontsource`
- No other runtime dependencies. Motion is CSS plus one IntersectionObserver hook (`src/hooks/useInView.ts`)

```
src/
  content/site.ts         all home-page copy, links, projects, experience
  content/skyvault.ts     the SkyVault case study
  content/caseStudies.ts  case-study registry (slug → content)
  content/types.ts        content types
  components/             Header, IdentPlate, ArchDiagram, Pipeline, Project*, Reveal, ...
  pages/                  Home, CaseStudy (generic), NotFound
scripts/
  postbuild.mjs           copies dist/index.html to dist/404.html (SPA fallback on Pages)
  og.html, render-static.mjs   source and renderer for public/og.png and the favicon PNGs
```

## The <JS/> exhibit (branch `redesign/b-exhibit`)

The hero's right column is a live three.js render of the hand-made Blender logo, with the ident plate hanging off it like an inspection tag.

- **Source model:** `models/logo/scene.gltf` and `scene.bin`, the original Blender export, kept untouched.
- **Shipped model:** `public/exhibit/js.glb` (33 KB). It's the same mesh with unused UVs and tangents pruned, then meshopt compression and quantization. The bounding box and vertex count are identical to the source. To regenerate it:
  ```sh
  npx @gltf-transform/cli prune models/logo/scene.gltf /tmp/pruned.glb --keep-attributes false
  npx @gltf-transform/cli meshopt /tmp/pruned.glb public/exhibit/js.glb
  ```
- **Poster:** `public/exhibit/poster.webp`. It renders immediately in the same box. The viewer chunk (`src/components/exhibit/viewer.ts`, ~166 KB gz) loads with a dynamic import once the page is idle and the figure is on screen, then crossfades in on its first frame.
- **Fallbacks:** without WebGL, or with only a software renderer (SwiftShader, llvmpipe), the poster stays. Add `?force3d` to the URL to render anyway.
- **Behavior:** the model idles within ±35° of the resting pose. Dragging rotates it, and touch uses `pan-y` so vertical scrolling still works. It eases back to the idle motion 3 s after release. Rendering pauses offscreen and in hidden tabs. With `prefers-reduced-motion` the model holds the resting pose and only moves on drag.
- **Material:** `site.exhibit.material` takes `paper`, `graphite` or `signal`.

## Editing content

All text lives in `src/content/`. Components never hard-code copy.

- Placeholders such as `[EMAIL]` and `[LINKEDIN_URL]` are listed in the `TODO` block at the top of `src/content/site.ts`. Fill in the constants just below that block and every use updates.
- The "Open to roles" badge is `site.status.visible`.
- **To add a case study,** create `src/content/<slug>.ts` that exports a `CaseStudy` (copy `skyvault.ts`), then add it to `src/content/caseStudies.ts`. The case study is served at `/work/<slug>`.
- **Decision records** (`decisions.items`): only add confirmed ones. The section hides itself while the list is empty.
- **The NovaEdge loop** (`work.cards[0].media`): set `poster`, `mp4` and `webm` to files in `public/`. Keep the video under ~1.5 MB. Until then a labelled placeholder renders.
- **Copy style:** no em dashes or en dashes. Use a period, colon, comma or ` · `. Date ranges use an arrow: `2023 → Now`.

## Develop

```sh
npm install
npm run dev      # http://localhost:5173/ktsierra_portfolio/
npm run lint
npm run build    # tsc -b, vite build, then postbuild writes 404.html
npm run preview
```

## Deploy

Pushing to `main` runs `.github/workflows/deploy.yaml`, which builds the site and publishes `dist/` to the `gh-pages` branch. The workflow leaves `preview/` alone. `npm run deploy` does the same from your machine.

Vite's `base` comes from `VITE_BASE` and defaults to `/ktsierra_portfolio/`.

### Branch previews

Pushing to `redesign/a-plate` or `redesign/b-exhibit` runs `.github/workflows/preview.yaml`, which publishes the branch into its own folder on `gh-pages`. The live root is never touched:

- A: <https://ktsierra.github.io/ktsierra_portfolio/preview/a/>
- B: <https://ktsierra.github.io/ktsierra_portfolio/preview/b/>

To publish one by hand instead:

```sh
VITE_BASE=/ktsierra_portfolio/preview/a/ npm run build && npx gh-pages -d dist --dest preview/a --add
VITE_BASE=/ktsierra_portfolio/preview/b/ npm run build && npx gh-pages -d dist --dest preview/b --add
```

Reloading a deep link such as `/work/skyvault` inside a preview folder returns a 404. The SPA fallback only works at the root, which is fine for previews.

### Regenerating the OG image and favicons

```sh
npm i --no-save playwright && npx playwright install chromium
node scripts/render-static.mjs
```
