import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  fullyParallel: false,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  workers: 1,

  timeout: 60 * 1000,

  expect: {
    timeout: 10 * 1000,
  },

  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    [
      'allure-playwright',
      {
        outputFolder: 'allure-results',
        detail: true,
        suiteTitle: false,
        environmentInfo: {
          framework: 'Playwright',
          application: 'Sauce Demo',
        },
      },
    ],
  ],

  use: {
    baseURL: 'https://www.saucedemo.com',

    testIdAttribute: 'data-test',

    headless: true,
    actionTimeout: 15 * 1000,
    navigationTimeout: 30 * 1000,

    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});