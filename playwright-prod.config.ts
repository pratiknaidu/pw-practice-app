import { defineConfig, devices } from '@playwright/test';


/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  use: {
    
      globalsQaURL: 'https://www.globalsqa.com/demo-site/draganddrop/',
      baseURL :'http://localhost:4200/',

  },

  /* Configure projects for major browsers */
  projects: [

    {
        name: 'chromium',
    },

    {
      name: 'firefox',
      use: {
        browserName: 'firefox'
      },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },


    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  webServer: {

    command: 'npm run start',
    url: 'http://localhost:4200' 
  }

});
