import { defineConfig, devices } from "@playwright/test";
export default defineConfig({
  testDir:"./e2e", timeout:30000,
  use:{ baseURL:"http://localhost:3000", ...devices["Desktop Chrome"] },
  webServer:{ command:"node node_modules/next/dist/bin/next dev", url:"http://localhost:3000", reuseExistingServer:!process.env.CI, timeout:120000 }
});
