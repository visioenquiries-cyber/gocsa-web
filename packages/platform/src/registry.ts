/**
 * Provider registry (DEC-021) — the single place infrastructure choices are wired.
 * Reads the typed env and returns concrete adapters behind their interfaces. The rest
 * of the platform depends only on the interfaces, never on a vendor. Swapping providers
 * at deployment = changing env + registering the adapter here. No architectural change.
 */
import { getEnv, type Env } from "@gocsa/env";

import { ProviderNotImplementedError } from "./types";
import { LocalStorageProvider, type StorageProvider } from "./storage";
import { LocalMediaProvider, type MediaProvider } from "./media";
import { ConsoleEmailProvider, type EmailProvider } from "./email";
import { NoopAnalyticsProvider, type AnalyticsProvider } from "./analytics";
import { MemorySearchProvider, type SearchProvider } from "./search";
import { MemoryCacheProvider, type CacheProvider } from "./cache";
import { MemoryAuthenticationProvider, type AuthenticationProvider } from "./auth";
import { LocalDeploymentProvider, type DeploymentProvider } from "./deployment";

export interface Providers {
  storage: StorageProvider;
  media: MediaProvider;
  email: EmailProvider;
  analytics: AnalyticsProvider;
  search: SearchProvider;
  cache: CacheProvider;
  auth: AuthenticationProvider;
  deployment: DeploymentProvider;
}

function createStorage(env: Env): StorageProvider {
  switch (env.STORAGE_PROVIDER) {
    case "local":
      return new LocalStorageProvider({
        assetUrl: env.NEXT_PUBLIC_ASSET_URL,
        dir: env.STORAGE_LOCAL_DIR,
      });
    // "s3" / "r2" adapters registered at deployment.
    default:
      throw new ProviderNotImplementedError("storage", env.STORAGE_PROVIDER);
  }
}

function createEmail(env: Env): EmailProvider {
  switch (env.EMAIL_PROVIDER) {
    case "console":
      return new ConsoleEmailProvider({ defaultFrom: env.EMAIL_FROM });
    default:
      throw new ProviderNotImplementedError("email", env.EMAIL_PROVIDER);
  }
}

function createAnalytics(env: Env): AnalyticsProvider {
  switch (env.ANALYTICS_PROVIDER) {
    case "noop":
      return new NoopAnalyticsProvider();
    default:
      throw new ProviderNotImplementedError("analytics", env.ANALYTICS_PROVIDER);
  }
}

function createSearch(env: Env): SearchProvider {
  switch (env.SEARCH_PROVIDER) {
    case "memory":
      return new MemorySearchProvider();
    // "postgres" FTS adapter wired in Sprint 4/10.
    default:
      throw new ProviderNotImplementedError("search", env.SEARCH_PROVIDER);
  }
}

function createCache(env: Env): CacheProvider {
  switch (env.CACHE_PROVIDER) {
    case "memory":
      return new MemoryCacheProvider();
    default:
      throw new ProviderNotImplementedError("cache", env.CACHE_PROVIDER);
  }
}

function createAuth(env: Env): AuthenticationProvider {
  switch (env.AUTH_SESSION_PROVIDER) {
    case "memory":
      return new MemoryAuthenticationProvider();
    default:
      throw new ProviderNotImplementedError("auth", env.AUTH_SESSION_PROVIDER);
  }
}

function createDeployment(env: Env): DeploymentProvider {
  switch (env.DEPLOYMENT_PROVIDER) {
    case "local":
      return new LocalDeploymentProvider({ environment: env.APP_ENV });
    default:
      throw new ProviderNotImplementedError("deployment", env.DEPLOYMENT_PROVIDER);
  }
}

let cached: Providers | null = null;

/** Build (and memoise) the provider set from the environment. */
export function createProviders(env: Env = getEnv()): Providers {
  if (cached) return cached;
  cached = {
    storage: createStorage(env),
    media: new LocalMediaProvider({ assetUrl: env.NEXT_PUBLIC_ASSET_URL }),
    email: createEmail(env),
    analytics: createAnalytics(env),
    search: createSearch(env),
    cache: createCache(env),
    auth: createAuth(env),
    deployment: createDeployment(env),
  };
  return cached;
}

/** Test/HMR helper. */
export function resetProviders(): void {
  cached = null;
}
