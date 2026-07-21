/**
 * @gocsa/cms — CMS schema (Payload, DEC-011). Sprint 3, in progress.
 *
 * Commenced with the shared field groups (docs/09 §5) and the Media collection
 * (docs/09 §15) — the objects every other collection references. Next: the remaining
 * collections + globals, the role×site×lane access functions (docs/14), localisation,
 * versions/drafts, media pipeline via @gocsa/platform, and the Payload config wired to
 * `getEnv()` + `createProviders()` inside `apps/web`.
 */
export * from "./types";
export { seoField, ctaField, linkField, addressField } from "./fields";
export { media } from "./collections/media";
