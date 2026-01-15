const { defineConfig } = require("cypress");

module.exports = defineConfig({
  defaultCommandTimeout: 6000,

  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    reportDir: 'cypress/reports', // output folder
    charts: true,
    reportPageTitle: 'E2E Test Report',
    embeddedScreenshots: true,
    inlineAssets: true
  },

  video: true,
  screenshotOnRunFailure: true,

  env: {
    url: "https://www.saucedemo.com/",
    apiUrl: "https://jsonplaceholder.typicode.com/posts"
  },

  retries: {
    runMode: 1
  },

  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      return config;
    },
    specPattern: "cypress/integration/**/*.js"
  },
});
