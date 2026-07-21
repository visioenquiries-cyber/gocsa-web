/**
 * Seed runner. Refuses to run outside development or without ALLOW_SEED=true, so it can
 * never touch production. Run with: `pnpm --filter @gocsa/web db:seed`.
 */
import { getPayload } from "payload";
import config from "../payload.config";
import { getEnv, isSeedAllowed } from "@gocsa/env";
import { seed } from "./seed";

async function main() {
  const env = getEnv();
  if (!isSeedAllowed(env)) {
    console.error(
      "Refusing to seed: requires APP_ENV=development and ALLOW_SEED=true (never runs in production).",
    );
    process.exit(1);
  }
  const payload = await getPayload({ config });
  await seed(payload);
  console.info("✔ Development seed complete (demonstration content only).");
  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
