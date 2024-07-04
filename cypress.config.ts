import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: 'https://carbonm-uat.cedarsdigital.io',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
