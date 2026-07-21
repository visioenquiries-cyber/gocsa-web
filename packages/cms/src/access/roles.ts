/**
 * Canonical roles, lanes, operations, and site scope (docs/14 · DEC-013 · DEC-027).
 * Framework-agnostic — the Payload access functions (and RGHA later) consume this.
 */

export const ROLES = [
  "super-admin",
  "site-admin",
  "community-care-manager",
  "marketing-manager",
  "editor",
  "translator",
  "reviewer",
  "read-only",
] as const;
export type Role = (typeof ROLES)[number];

/** Publishing lanes govern which content a capability applies to (docs/12 §0.4). */
export const LANES = ["care", "marketing", "structural"] as const;
export type Lane = (typeof LANES)[number];

/** Every governed action. Global ops are site-wide; the rest are lane-scoped. */
export const OPERATIONS = [
  "read",
  "create",
  "update",
  "delete",
  "restore",
  "translate",
  "review",
  "approve",
  "publish",
  "manageUsers",
  "manageStructural",
  "manageMedia",
  "manageSeo",
] as const;
export type Operation = (typeof OPERATIONS)[number];

export const GLOBAL_OPERATIONS = [
  "manageUsers",
  "manageStructural",
  "manageMedia",
  "manageSeo",
] as const satisfies readonly Operation[];

export type SiteId = string;
export const ALL_SITES = "*" as const;

export interface CmsUser {
  id: string;
  roles: Role[];
  /** Sites this user may act within, or `"*"` for all sites (RGHA readiness, docs/13 §8). */
  sites: SiteId[] | typeof ALL_SITES;
}

/** Whether a user is scoped to a given site. */
export function hasSite(user: CmsUser, site: SiteId): boolean {
  return user.sites === ALL_SITES || user.sites.includes(site);
}

/** Whether two users share at least one site (used for user management). */
export function sharesSite(a: CmsUser, b: CmsUser): boolean {
  if (a.sites === ALL_SITES || b.sites === ALL_SITES) return true;
  return a.sites.some((s) => b.sites !== ALL_SITES && b.sites.includes(s));
}

export function isGlobalOperation(op: Operation): boolean {
  return (GLOBAL_OPERATIONS as readonly Operation[]).includes(op);
}
