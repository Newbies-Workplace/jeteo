import { defineConfig } from "cypress";

export default defineConfig({
  defaultCommandTimeout: 10000,
  e2e: {
    baseUrl: "http://127.0.0.1:3000",
    video: false,
    chromeWebSecurity: false,
    viewportWidth: 1920,
    viewportHeight: 1080,
    waitForAnimations: true,
    supportFile: "cypress/support/e2e.ts",
    specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx}",
    testIsolation: true,
    experimentalModifyObstructiveThirdPartyCode: true,
  },
});
