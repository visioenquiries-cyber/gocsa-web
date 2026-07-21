/**
 * The single reusable access-control layer (docs/14 §2). Server-side authority for the
 * whole CMS — Payload access functions call `can()` / `accessFor()`; no ad-hoc per-collection
 * logic. Hiding admin controls is never security; every forbidden action is denied here.
 */
import {
  ALL_SITES,
  hasSite,
  isGlobalOperation,
  sharesSite,
  type CmsUser,
  type Lane,
  type Operation,
  type Role,
  type SiteId,
} from "./roles";

interface Grant {
  lanes: Partial<Record<Lane, Operation[]>>;
  global: Operation[];
}

const ALL_LANE_OPS: Operation[] = [
  "read",
  "create",
  "update",
  "delete",
  "restore",
  "translate",
  "review",
  "approve",
  "publish",
];

const MANAGER_LANE_OPS: Operation[] = [
  "read",
  "create",
  "update",
  "delete",
  "restore",
  "translate",
  "review",
  "approve",
  "publish",
];

/** Role → capabilities. The one place the matrix lives. */
const CAPABILITIES: Record<Role, Grant> = {
  "super-admin": {
    lanes: { care: ALL_LANE_OPS, marketing: ALL_LANE_OPS, structural: ALL_LANE_OPS },
    global: ["manageUsers", "manageStructural", "manageMedia", "manageSeo"],
  },
  "site-admin": {
    lanes: {
      care: ["read", "create", "update", "delete", "restore", "review", "approve", "publish"],
      marketing: ["read", "create", "update", "delete", "restore", "review", "approve", "publish"],
      structural: ["read", "create", "update", "delete", "restore"],
    },
    global: ["manageUsers", "manageStructural", "manageMedia", "manageSeo"],
  },
  "community-care-manager": {
    lanes: { care: MANAGER_LANE_OPS, marketing: ["read"], structural: ["read"] },
    global: ["manageMedia", "manageSeo"],
  },
  "marketing-manager": {
    lanes: { marketing: MANAGER_LANE_OPS, care: ["read"], structural: ["read"] },
    global: ["manageMedia", "manageSeo"],
  },
  editor: {
    lanes: {
      care: ["read", "create", "update"],
      marketing: ["read", "create", "update"],
      structural: ["read"],
    },
    global: ["manageMedia"],
  },
  translator: {
    lanes: {
      care: ["read", "translate"],
      marketing: ["read", "translate"],
      structural: ["read"],
    },
    global: [],
  },
  reviewer: {
    lanes: {
      care: ["read", "review", "approve"],
      marketing: ["read", "review", "approve"],
      structural: ["read"],
    },
    global: [],
  },
  "read-only": {
    lanes: { care: ["read"], marketing: ["read"], structural: ["read"] },
    global: [],
  },
};

export interface AccessContext {
  lane?: Lane;
  site?: SiteId;
}

/**
 * Can `user` perform `op`? Global ops ignore `lane`; lane ops require `lane`. Site scope
 * is enforced when `ctx.site` is provided. Deny by default.
 */
export function can(
  user: CmsUser | null | undefined,
  op: Operation,
  ctx: AccessContext = {},
): boolean {
  if (!user || user.roles.length === 0) return false;
  if (user.roles.includes("super-admin")) return true;

  const siteOk = ctx.site === undefined || hasSite(user, ctx.site);
  if (!siteOk) return false;

  if (isGlobalOperation(op)) {
    return user.roles.some((r) => CAPABILITIES[r].global.includes(op));
  }
  if (ctx.lane === undefined) return false; // lane ops require a lane
  const lane = ctx.lane;
  return user.roles.some((r) => (CAPABILITIES[r].lanes[lane] ?? []).includes(op));
}

/**
 * User-management authority (docs/14): a site-admin may manage non-super users within a
 * shared site; super-admin may manage anyone. No one may escalate to super-admin here.
 */
export function canManageUser(actor: CmsUser | null | undefined, target: CmsUser): boolean {
  if (!can(actor, "manageUsers")) return false;
  if (actor!.roles.includes("super-admin")) return true;
  if (target.roles.includes("super-admin")) return false;
  return sharesSite(actor!, target);
}

/** Curried helper for Payload access functions: `access: accessFor("update", "care")`. */
export function accessFor(op: Operation, lane?: Lane) {
  return (user: CmsUser | null | undefined, site?: SiteId): boolean =>
    can(user, op, { lane, site });
}

export { ALL_SITES };
