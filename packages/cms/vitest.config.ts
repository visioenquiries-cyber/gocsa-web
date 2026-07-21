import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
    coverage: {
      provider: "v8",
      all: true,
      // Security-critical logic — targets ~100% (docs/19). Schema files (fields/blocks/
      // collections) are data definitions exercised by structural tests.
      include: ["src/access/**", "src/workflow/**", "src/validation/**", "src/i18n/**"],
      exclude: ["src/**/*.test.ts"],
      thresholds: { lines: 100, functions: 100, statements: 100, branches: 95 },
    },
  },
});
