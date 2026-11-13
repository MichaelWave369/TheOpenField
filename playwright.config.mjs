import { defineConfig } from '@playwright/test';

const baseURL = 'http://127.0.0.1:4173/TheOpenField/';

export default defineConfig({
  testDir: './tests',
  testMatch: '*.spec.mjs',
  retries: process.env.CI ? 1 : 0,
  reporter: 'list',
  use: { baseURL, browserName: 'chromium', headless: true },
  webServer: {
    command: 'npm run preview -- --host 127.0.0.1 --port 4173 --strictPort',
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 30000,
  },
});
