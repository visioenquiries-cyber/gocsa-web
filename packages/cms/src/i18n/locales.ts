/**
 * Bilingual (EN/EL) configuration and translation-parity helpers (docs/09 §0.2, DEC-002).
 * English is the default/source; Greek is first-class. Fallback renders EN (never hides a
 * missing translation) — parity is surfaced so editors/reviewers see gaps.
 */
export const LOCALES = ["en", "el"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

/** Fallback is a safety net, not the goal — a missing EL value renders EN, flagged. */
export const FALLBACK_ENABLED = true;

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/** A localised value is `{ en?: T; el?: T }`. */
export type Localized<T> = Partial<Record<Locale, T>>;

function present(value: unknown): boolean {
  if (value == null) return false;
  if (typeof value === "string") return value.trim().length > 0;
  return true;
}

/** Locales still missing a value for a localised field. */
export function missingLocales<T>(field: Localized<T>): Locale[] {
  return LOCALES.filter((l) => !present(field[l]));
}

/** Resolve a value with EN fallback; also reports whether a fallback was used. */
export function resolveLocalized<T>(
  field: Localized<T>,
  locale: Locale,
): { value: T | undefined; usedFallback: boolean } {
  if (present(field[locale])) return { value: field[locale], usedFallback: false };
  if (FALLBACK_ENABLED && locale !== DEFAULT_LOCALE && present(field[DEFAULT_LOCALE])) {
    return { value: field[DEFAULT_LOCALE], usedFallback: true };
  }
  return { value: field[locale], usedFallback: false };
}

export interface ParityEntry {
  field: string;
  missing: Locale[];
}

/** Build a translation-parity report over named localised fields (drives the editor view). */
export function parityReport(
  doc: Record<string, Localized<unknown>>,
  fields: string[],
): ParityEntry[] {
  return fields
    .map((field) => ({ field, missing: missingLocales(doc[field] ?? {}) }))
    .filter((e) => e.missing.length > 0);
}
