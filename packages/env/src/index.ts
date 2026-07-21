/**
 * @gocsa/env — typed, fail-fast environment configuration (DEC-020, DEC-021).
 *
 * The single source of truth for all runtime configuration. Every URL, domain,
 * credential, and PROVIDER SELECTION is read here — nothing is hardcoded, and
 * infrastructure providers are chosen by env, never by code. Invalid/missing
 * required vars throw at startup so misconfiguration can never ship silently.
 */
import { z } from "zod";

const AppEnv = z.enum(["development", "preview", "staging", "production"]);

/** Provider selection — placeholder/local by default; real adapters swapped at deploy. */
const StorageProvider = z.enum(["local", "s3", "r2"]).default("local");
const EmailProvider = z.enum(["console", "smtp", "resend", "ses"]).default("console");
const AnalyticsProvider = z.enum(["noop", "plausible", "ga4"]).default("noop");
const SearchProvider = z.enum(["postgres", "memory"]).default("postgres");
const CacheProvider = z.enum(["memory", "redis"]).default("memory");
const AuthSessionProvider = z.enum(["memory", "redis", "database"]).default("memory");
const DeploymentProvider = z.enum(["local", "vercel", "cloudflare", "node"]).default("local");

const schema = z.object({
  // Environment
  APP_ENV: AppEnv.default("development"),

  // Brand / tenant (multi-site)
  NEXT_PUBLIC_BRAND: z.string().min(1).default("gocsa"),
  NEXT_PUBLIC_SITE_ID: z.string().min(1).default("gocsa-community-care"),

  // Domains / URLs — required; no defaults, so misconfig fails fast (DEC-020)
  NEXT_PUBLIC_SITE_URL: z.string().url(),
  NEXT_PUBLIC_CMS_URL: z.string().url(),
  NEXT_PUBLIC_API_URL: z.string().url(),
  NEXT_PUBLIC_ASSET_URL: z.string().url(),

  // Core secrets / data
  PAYLOAD_SECRET: z.string().min(16),
  DATABASE_URI: z.string().min(1),

  // Provider selection (infrastructure-agnostic — DEC-021)
  STORAGE_PROVIDER: StorageProvider,
  EMAIL_PROVIDER: EmailProvider,
  ANALYTICS_PROVIDER: AnalyticsProvider,
  SEARCH_PROVIDER: SearchProvider,
  CACHE_PROVIDER: CacheProvider,
  AUTH_SESSION_PROVIDER: AuthSessionProvider,
  DEPLOYMENT_PROVIDER: DeploymentProvider,

  // Optional service config (only required when the matching provider is selected)
  REDIS_URL: z.string().url().optional(),
  S3_ENDPOINT: z.string().optional(),
  S3_REGION: z.string().optional(),
  S3_BUCKET: z.string().optional(),
  S3_ACCESS_KEY_ID: z.string().optional(),
  S3_SECRET_ACCESS_KEY: z.string().optional(),
  STORAGE_LOCAL_DIR: z.string().optional(),

  EMAIL_DOMAIN: z.string().optional(),
  EMAIL_FROM: z.string().optional(),
  EMAIL_PROVIDER_API_KEY: z.string().optional(),
  ENQUIRY_INBOX: z.string().email().optional(),
  ENQUIRY_INBOX_EL: z.string().email().optional(),

  NEXT_PUBLIC_ANALYTICS_ID: z.string().optional(),
  NEXT_PUBLIC_ANALYTICS_DOMAIN: z.string().optional(),

  PREVIEW_SECRET: z.string().optional(),
  REVALIDATE_SECRET: z.string().optional(),

  // Seed guard — seeding runs only when this is "true" AND APP_ENV=development.
  ALLOW_SEED: z.enum(["true", "false"]).default("false"),
});

export type Env = z.infer<typeof schema>;
export type AppEnvironment = z.infer<typeof AppEnv>;

let cached: Env | null = null;

/**
 * Parse + validate the environment once. Throws a readable, aggregated error
 * listing every invalid/missing var. Call at process startup (fail fast).
 */
export function getEnv(source: Record<string, string | undefined> = process.env): Env {
  if (cached) return cached;
  const parsed = schema.safeParse(source);
  if (!parsed.success) {
    const issues = parsed.error.issues
      .map((i) => `  • ${i.path.join(".") || "(root)"}: ${i.message}`)
      .join("\n");
    throw new Error(
      `Invalid environment configuration (DEC-020). Fix these variables (see .env.example):\n${issues}`,
    );
  }
  cached = parsed.data;
  return cached;
}

/** Test/HMR helper — clear the memoised env. */
export function resetEnvCache(): void {
  cached = null;
}

export const isProduction = (e: Env): boolean => e.APP_ENV === "production";
export const isPreviewLike = (e: Env): boolean =>
  e.APP_ENV === "development" || e.APP_ENV === "preview" || e.APP_ENV === "staging";
/** Non-production environments must never be indexed (docs/18). */
export const shouldAllowIndexing = (e: Env): boolean => e.APP_ENV === "production";

/** Seeding is permitted only in development and only when explicitly allowed. */
export const isSeedAllowed = (e: Env): boolean =>
  e.APP_ENV === "development" && e.ALLOW_SEED === "true";
