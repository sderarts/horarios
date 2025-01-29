const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:1234",

  },

  component: {
    devServer: {
      framework: "react",
      bundler: "webpack",
    },
  },
});
