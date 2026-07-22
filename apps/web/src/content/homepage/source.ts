/**
 * Content sources. `LocalHomepageContentSource` powers the preview from fixtures;
 * `PayloadHomepageContentSource` is the seam for later CMS integration — the components
 * never change, only the source. `getContentSource()` chooses based on configuration.
 */
import type { Locale } from "@gocsa/cms";
import type { HomepageContent, HomepageContentSource, SiteChrome } from "./types";
import { homepage, siteChrome } from "./fixtures";

export class LocalHomepageContentSource implements HomepageContentSource {
  async getSiteChrome(_locale: Locale): Promise<SiteChrome> {
    return siteChrome;
  }
  async getHomepage(_locale: Locale): Promise<HomepageContent> {
    // NOTE: preview fixtures. Greek (`el`) content is authored in the CMS later.
    return homepage;
  }
}

/**
 * Later: map Payload globals/collections → HomepageContent (docs/12). Kept as a seam so the
 * homepage can switch from fixtures to CMS with zero component changes.
 */
export class PayloadHomepageContentSource implements HomepageContentSource {
  async getSiteChrome(_locale: Locale): Promise<SiteChrome> {
    throw new Error("PayloadHomepageContentSource is wired in a later sprint.");
  }
  async getHomepage(_locale: Locale): Promise<HomepageContent> {
    throw new Error("PayloadHomepageContentSource is wired in a later sprint.");
  }
}

let source: HomepageContentSource | null = null;

/** The active content source. Preview uses Local; swap to Payload when CMS content lands. */
export function getContentSource(): HomepageContentSource {
  if (!source) source = new LocalHomepageContentSource();
  return source;
}
