const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://www.advantageonlineshopping.com",

    setupNodeEvents(on, config) {
      const cucumber = require('cypress-cucumber-preprocessor').default;
      on('file:preprocessor', cucumber());
    },
    // Define a pasta onde estarão os arquivos feature
    specPattern: "cypress/e2e/**/*.feature",
  },
  video: false,
});
