/**
 * @gocsa/cms — framework-agnostic CMS schema + security logic (Payload, DEC-011).
 *
 * Sprint 3: access control, publishing workflow, validation, localisation (all pure +
 * fully tested), shared field groups, page-builder blocks, and the foundational/representative
 * collections + globals. The Payload config (in `apps/web`) composes `collections`/`globals`,
 * attaches `collectionAccess(lane)`, and wires `getEnv()`/`createProviders()` — see DEC-026.
 * RGHA reuses this package unchanged, scoped by site.
 */
export * from "./types";

/** Access control (docs/14). */
export * from "./access/roles";
export { can, canManageUser, accessFor, type AccessContext } from "./access/policy";
export { collectionAccess, type CollectionAccess } from "./access/payload";

/** Publishing workflow (docs/09 §0.4). */
export * from "./workflow/workflow";

/** Validation gates + localisation. */
export * from "./validation/gates";
export * from "./i18n/locales";

/** Schema. */
export { seoField, ctaField, linkField, linkFields, addressField } from "./fields";
export { blocks, pageBlockSlugs } from "./blocks";
export { collections, globals, pendingCollections } from "./registry";
export { media } from "./collections/media";
