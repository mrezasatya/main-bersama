import { expect, test, type Page } from '@playwright/test';

async function start(page: Page) {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Main Bersama' })).toBeVisible();
  await page.getByRole('button', { name: /2-3 tahun/ }).click();
  await expect(page.getByRole('button', { name: /Cari Warna/ })).toBeVisible();
}

async function noHorizontalScroll(page: Page) {
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );
  expect(overflow).toBeLessThanOrEqual(0);
}

test('mulai, pilih usia, main satu ronde, lalu berhenti', async ({ page }) => {
  await start(page);
  await noHorizontalScroll(page);

  await page.getByRole('button', { name: /Cari Warna/ }).click();
  const choices = page.locator('.choice');
  await expect(choices).toHaveCount(2);
  await noHorizontalScroll(page);

  // Instruksi selalu tampil sebagai teks dan ikon.
  const text = (await page.locator('.instruction-text').textContent()) ?? '';
  await expect(page.locator('.instruction-cue .swatch')).toBeVisible();
  const color = /^Mana \S+ (.+)\?$/.exec(text)?.[1];
  expect(color).toBeTruthy();

  // Semua pilihan cukup besar untuk jari anak 2-3 tahun (>= 64 px) dan muat di layar.
  for (const box of await choices.evaluateAll((els) =>
    els.map((e) => e.getBoundingClientRect().toJSON()),
  )) {
    expect(box.width).toBeGreaterThanOrEqual(64);
    expect(box.bottom).toBeLessThanOrEqual(page.viewportSize()!.height);
  }

  await page.locator(`.choice[data-choice="${color}"]`).click();
  await expect(page.locator('.progress-dots .is-done')).toHaveCount(1, { timeout: 8000 });

  await page.getByRole('button', { name: 'Berhenti' }).click();
  await expect(page.getByRole('button', { name: /Cari Warna/ })).toBeVisible();
  await expect(page.getByLabel('1 bintang')).toBeVisible();
});

test('album dan halaman pendamping (gerbang tekan lama) dapat dibuka', async ({ page }) => {
  await start(page);
  await page.getByRole('button', { name: 'Album' }).click();
  await expect(page.getByRole('heading', { name: 'Album Stiker' })).toBeVisible();
  await noHorizontalScroll(page);
  await page.getByRole('button', { name: 'Kembali' }).click();

  const gate = page.getByRole('button', { name: /Pendamping/ });
  await gate.click(); // ketuk singkat tidak membuka
  await expect(page.getByRole('heading', { name: 'Untuk Pendamping' })).toHaveCount(0);
  await gate.hover();
  await page.mouse.down();
  await page.waitForTimeout(1800);
  await page.mouse.up();
  await expect(page.getByRole('heading', { name: 'Untuk Pendamping' })).toBeVisible();
  await noHorizontalScroll(page);

  await page.getByRole('link', { name: 'Buka Uji Suara' }).click();
  await expect(page.getByRole('heading', { name: 'Uji Suara' })).toBeVisible();
  await expect(page.getByText('Suara ucapan (TTS)')).toBeVisible();
  await noHorizontalScroll(page);
});

test('manifest PWA dan service worker tersedia', async ({ page, request }) => {
  const manifest = await (await request.get('/manifest.webmanifest')).json();
  expect(manifest.name).toBe('Main Bersama');
  expect(manifest.icons.length).toBeGreaterThanOrEqual(3);
  expect((await request.get('/sw.js')).ok()).toBe(true);
  await page.goto('/');
  await expect
    .poll(() => page.evaluate(() => navigator.serviceWorker.getRegistration().then(Boolean)))
    .toBe(true);
});

test('semua permainan di menu terbuka tanpa galat dan muat di layar', async ({ page }) => {
  test.setTimeout(120_000);
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await start(page);
  const titles = await page.locator('.game-card-title').allTextContents();
  expect(titles.length).toBeGreaterThanOrEqual(6);
  for (const title of titles) {
    await page.locator('.game-card', { hasText: title }).click();
    await expect(page.locator('.round'), title).toBeVisible();
    await noHorizontalScroll(page);
    await page.getByRole('button', { name: 'Berhenti' }).click();
    await expect(page.locator('.game-card').first()).toBeVisible();
  }
  expect(errors).toEqual([]);
});

test('menelusuri huruf di papan pasir menyelesaikan ronde', async ({ page }) => {
  await start(page);
  await page.locator('.game-card', { hasText: 'Huruf Pasir' }).click();
  const board = page.locator('.trace-board');
  await expect(board).toBeVisible();
  await page.waitForTimeout(400);
  const box = (await board.boundingBox())!;
  // Sapuan zig-zag rapat menutupi seluruh papan (mulai di dalam: sudut papan membulat).
  await page.mouse.move(box.x + 40, box.y + 40);
  await page.mouse.down();
  for (let y = 20; y < box.height - 10; y += 10) {
    await page.mouse.move(box.x + box.width - 10, box.y + y, { steps: 4 });
    await page.mouse.move(box.x + 10, box.y + y + 5, { steps: 4 });
  }
  await page.mouse.up();
  await expect(page.locator('.progress-dots .is-done')).toHaveCount(1, { timeout: 10_000 });
});
