/**
 * @gocsa/platform — infrastructure-agnostic provider layer (DEC-021).
 *
 * Consumers import interfaces + the registry only; they never reference a vendor.
 * Providers are selected by env and swappable at deployment with no code change:
 *   Vercel · Cloudflare · self-hosted · managed cloud.
 */
export * from "./types";
export * from "./storage";
export * from "./media";
export * from "./email";
export * from "./analytics";
export * from "./search";
export * from "./cache";
export * from "./auth";
export * from "./deployment";
export * from "./registry";
