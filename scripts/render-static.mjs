// Renders public/og.png (1200×630) and the favicon PNGs from scripts/og.html.
// Needs Playwright, which is not a project dependency: `npm i --no-save playwright && npx playwright install chromium`, then `node scripts/render-static.mjs`.
import { chromium } from 'playwright';
import { fileURLToPath } from 'node:url';

const html = fileURLToPath(new URL('./og.html', import.meta.url));
const out = (f) => fileURLToPath(new URL(`../public/${f}`, import.meta.url));

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 900 } });
await page.goto(`file://${html}`);
await page.evaluate(() => document.fonts.ready);
await page.locator('#og').screenshot({ path: out('og.png') });
await page.locator('#icon').screenshot({ path: out('apple-touch-icon.png') });

// 32px favicon: re-render the icon box small so the glyphs are hinted at that size
await page.evaluate(() => {
  const el = document.getElementById('icon');
  el.style.cssText = 'width:32px;height:32px;font-size:12px';
});
await page.locator('#icon').screenshot({ path: out('favicon-32.png') });
await browser.close();
