import { defineConfig } from "vitest/config";

// Integration tests boot Payload against a real Postgres (DATABASE_URI). They run in CI's
// Postgres-backed job (and locally after `pnpm db:up && db:migrate && db:seed`), NOT in the
// default unit-test run.
export default defineConfig({
  test: {
    environment: "node",
    include: ["src/**/*.integration.test.ts"],
    testTimeout: 60_000,
    hookTimeout: 60_000,
    fileParallelism: false,
  },
});
