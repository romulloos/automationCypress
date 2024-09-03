const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://www.advantageonlineshopping.com",
  },
  fixturesFolder: false,
  video: false,
});
