// Membuat ikon PNG PWA dari public/favicon.svg memakai Chromium (Playwright).
// Jalankan: npm run icons
import { readFileSync } from 'node:fs';
import { chromium } from 'playwright';

const svg = readFileSync(new URL('../public/favicon.svg', import.meta.url), 'utf8');
const targets = [
  { file: 'icon-192.png', size: 192, pad: 0 },
  { file: 'icon-512.png', size: 512, pad: 0 },
  { file: 'apple-touch-icon.png', size: 180, pad: 0, square: true },
  // Maskable: konten di zona aman 80% dengan latar penuh.
  { file: 'icon-maskable-512.png', size: 512, pad: 0.12, square: true },
];

const browser = await chromium.launch();
const page = await browser.newPage();
for (const t of targets) {
  const inner = Math.round(t.size * (1 - t.pad * 2));
  const body = t.square ? svg.replace('rx="112"', 'rx="0"') : svg;
  await page.setViewportSize({ width: t.size, height: t.size });
  await page.setContent(
    `<html><body style="margin:0;display:grid;place-items:center;width:${t.size}px;height:${t.size}px;background:${t.square ? '#FFB547' : 'transparent'}">
      <div style="width:${inner}px;height:${inner}px">${body.replace('<svg ', '<svg width="100%" height="100%" ')}</div>
    </body></html>`,
  );
  await page.screenshot({ path: `public/${t.file}`, omitBackground: !t.square });
  console.log('✓', t.file);
}
await browser.close();
