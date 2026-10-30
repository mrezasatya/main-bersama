import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: 'tests/e2e',
  timeout: 30_000,
  use: { baseURL: 'http://localhost:4173', hasTouch: true },
  webServer: {
    command: 'npx vite preview --port 4173 --strictPort',
    port: 4173,
    reuseExistingServer: true,
  },
  projects: [
    { name: 'tablet-portrait', use: { viewport: { width: 820, height: 1180 } } },
    { name: 'tablet-landscape', use: { viewport: { width: 1180, height: 820 } } },
    { name: 'ponsel', use: { viewport: { width: 390, height: 844 } } },
  ],
});
