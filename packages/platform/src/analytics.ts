/**
 * AnalyticsProvider — privacy-respecting analytics abstraction (DEC-021, docs/18).
 * Adapters: NoopAnalyticsProvider (dev), Plausible / GA4 (deploy). Client config is
 * exposed for the front-end script; server-side events go through track().
 */
export interface AnalyticsEvent {
  name: string;
  props?: Record<string, string | number | boolean>;
}

export interface AnalyticsClientConfig {
  id?: string;
  domain?: string;
}

export interface AnalyticsProvider {
  readonly name: string;
  track(event: AnalyticsEvent): Promise<void>;
  /** Config handed to the client script; null when analytics is disabled. */
  clientConfig(): AnalyticsClientConfig | null;
}

/** Development adapter — no network, no cookies. */
export class NoopAnalyticsProvider implements AnalyticsProvider {
  readonly name = "noop";
  async track(): Promise<void> {
    /* intentionally does nothing */
  }
  clientConfig(): AnalyticsClientConfig | null {
    return null;
  }
}
