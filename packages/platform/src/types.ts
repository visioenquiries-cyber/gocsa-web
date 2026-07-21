/** Shared platform types. */
export type Locale = "en" | "el";
export type SiteId = string;

/** Thrown when a selected provider has no adapter yet — swap one in at deployment. */
export class ProviderNotImplementedError extends Error {
  constructor(kind: string, name: string) {
    super(
      `No "${name}" adapter for ${kind} yet (DEC-021). ` +
        `Add an adapter in packages/platform/src/${kind}.ts and register it, ` +
        `or select an implemented provider via env.`,
    );
    this.name = "ProviderNotImplementedError";
  }
}
