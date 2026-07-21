/**
 * Payload configuration (DEC-026). Composes the reviewed @gocsa/cms schema, wires the
 * tested access policy, and reads ALL secrets/URLs from @gocsa/env — no hardcoding.
 * Storage uses the local adapter in dev (provider-agnostic; swapped at deploy, DEC-021).
 */
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildConfig } from "payload";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { getEnv } from "@gocsa/env";
import { collections as cmsCollections, globals as cmsGlobals } from "@gocsa/cms";
import { toPayloadCollection, toPayloadGlobal } from "./payload/toPayload";

const env = getEnv();
const dirname = path.dirname(fileURLToPath(import.meta.url));

export default buildConfig({
  serverURL: env.NEXT_PUBLIC_CMS_URL,
  secret: env.PAYLOAD_SECRET,
  admin: {
    // The users collection is the auth collection.
    user: "users",
    meta: { titleSuffix: "· GOCSA Community Care" },
  },
  // English default, Greek first-class; fallback surfaces EN but is flagged in the UI.
  localization: {
    locales: [
      { label: "English", code: "en" },
      { label: "Ελληνικά", code: "el" },
    ],
    defaultLocale: "en",
    fallback: true,
  },
  editor: lexicalEditor(),
  collections: cmsCollections.map(toPayloadCollection),
  globals: cmsGlobals.map(toPayloadGlobal),
  db: postgresAdapter({
    pool: { connectionString: env.DATABASE_URI },
    migrationDir: path.resolve(dirname, "migrations"),
  }),
  typescript: { outputFile: path.resolve(dirname, "payload-types.ts") },
  telemetry: false,
});
