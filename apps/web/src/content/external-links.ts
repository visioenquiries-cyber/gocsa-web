/**
 * Third-party links referenced from site content.
 *
 * DEC-020 bans hardcoded URLs so that *our own* domains come from the typed env config and
 * the app isn't pinned to one environment. These are external government services — they
 * are fixed facts of the content, not deployment configuration, so they live here (in one
 * reviewable place) rather than being scattered through the page registry.
 */

/* eslint-disable no-restricted-syntax */

export const MY_AGED_CARE = {
  /** Start an aged care assessment online. */
  applyOnline: "https://www.myagedcare.gov.au/apply-online",
  home: "https://www.myagedcare.gov.au",
  /** National contact centre. */
  phone: "1800 200 422",
  phoneHref: "tel:1800200422",
} as const;
