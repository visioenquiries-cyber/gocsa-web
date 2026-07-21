/**
 * Publish gates + field validation (docs/09 §0.7, §16, §17). Pure functions reused by
 * collection field `validate` hooks so the rules can't drift between UI and CMS.
 * Return `true` on success or a human, editor-friendly message on failure.
 */

export type ValidationResult = true | string;

/** Alt text is required for non-decorative images (docs/09 §0.7 — hard publish gate). */
export function validateAltText(
  value: unknown,
  opts: { isDecorative?: boolean } = {},
): ValidationResult {
  if (opts.isDecorative) return true;
  return typeof value === "string" && value.trim().length > 0
    ? true
    : "Alt text is required (or mark the image as decorative).";
}

/** Consent must be on file to publish a photo of an identifiable person (privacy R9). */
export function validatePersonConsent(
  consentOnFile: unknown,
  opts: { hasPeople?: boolean } = {},
): ValidationResult {
  if (!opts.hasPeople) return true;
  return consentOnFile === true
    ? true
    : "Consent must be recorded before using a photo of a person.";
}

export type LinkKind = "internal" | "external" | "email" | "tel" | "download" | "anchor";

export interface LinkValue {
  kind: LinkKind;
  reference?: unknown;
  url?: string;
  email?: string;
  phone?: string;
  file?: unknown;
  anchor?: string;
}

/** Exactly one destination must be set for the chosen kind — prevents conflicting links. */
export function validateLinkDestination(link: LinkValue): ValidationResult {
  const set = {
    internal: link.reference != null,
    external: !!link.url,
    email: !!link.email,
    tel: !!link.phone,
    download: link.file != null,
    anchor: !!link.anchor,
  };
  const provided = Object.values(set).filter(Boolean).length;
  if (provided === 0) return "This link needs a destination.";
  if (provided > 1) return "This link has more than one destination — choose just one.";
  if (!set[link.kind])
    return `The chosen link type ("${link.kind}") doesn't match its destination.`;
  return true;
}

/** A form definition must include a privacy-consent field (docs/09 §16). */
export function validateFormHasConsent(
  fields: Array<{ type?: string; name?: string }>,
): ValidationResult {
  const hasConsent = fields.some((f) => f.type === "checkbox" && /consent/i.test(f.name ?? ""));
  return hasConsent ? true : "Every form must include a privacy-consent checkbox.";
}
