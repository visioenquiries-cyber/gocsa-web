/**
 * DeploymentProvider — cache revalidation & CDN purge abstraction (DEC-021, docs/13 §6, docs/15).
 * Adapters: LocalDeploymentProvider (dev), Vercel (revalidate), Cloudflare (purge),
 * Node/self-hosted. Publish hooks call revalidate/purge without knowing the platform.
 */
import type { AppEnvironment } from "@gocsa/env";

export interface DeploymentProvider {
  readonly name: string;
  revalidatePath(path: string): Promise<void>;
  revalidateTag(tag: string): Promise<void>;
  purgeCdn(urls: string[]): Promise<void>;
  environment(): AppEnvironment;
}

/** Development adapter — logs revalidation intent; no external CDN. */
export class LocalDeploymentProvider implements DeploymentProvider {
  readonly name = "local";
  private readonly env: AppEnvironment;

  constructor(opts: { environment: AppEnvironment }) {
    this.env = opts.environment;
  }

  async revalidatePath(path: string): Promise<void> {
    console.info("[deploy:local] revalidatePath", path);
  }

  async revalidateTag(tag: string): Promise<void> {
    console.info("[deploy:local] revalidateTag", tag);
  }

  async purgeCdn(urls: string[]): Promise<void> {
    console.info("[deploy:local] purgeCdn", urls.length, "url(s)");
  }

  environment(): AppEnvironment {
    return this.env;
  }
}
