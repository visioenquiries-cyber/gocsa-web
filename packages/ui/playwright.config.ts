import { defineConfig, devices } from "@playwright/test";

/**
 * Visual-regression foundation (provider-agnostic — DEC-025).
 * Screenshots built Storybook stories across theme × viewport. Baselines are committed
 * PNGs (self-hosted; no paid service). Generate/refresh baselines with `-u`.
 * NOT yet enforced in CI — see docs/22. Provider selection (self-hosted Playwright vs a
 * hosted service like Chromatic) is PENDING.
 */
export default defineConfig({
  testDir: "./visual",
  snapshotDir: "./visual/__snapshots__",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  reporter: "list",
  expect: { toHaveScreenshot: { maxDiffPixelRatio: 0.01 } },
  // Serve the pre-built static Storybook (run `build-storybook` first).
  webServer: {
    command: "npx --yes serve -s storybook-static -l 6007",
    url: "http://localhost:6007",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
  use: { baseURL: "http://localhost:6007" },
  projects: [
    { name: "desktop-light", use: { ...devices["Desktop Chrome"] } },
    {
      name: "mobile-light",
      use: { ...devices["Pixel 5"] },
    },
  ],
});
