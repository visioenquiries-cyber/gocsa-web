/**
 * Bridges the reusable access policy (`can`/`accessFor`) to a collection's CRUD access.
 * The Payload config spreads this onto each collection's `access` — one layer, no ad-hoc
 * per-collection functions (docs/14 §2).
 */
import { accessFor } from "./policy";
import type { Lane } from "./roles";

export function collectionAccess(lane: Lane) {
  return {
    read: accessFor("read", lane),
    create: accessFor("create", lane),
    update: accessFor("update", lane),
    delete: accessFor("delete", lane),
    restore: accessFor("restore", lane),
    publish: accessFor("publish", lane),
  };
}

export type CollectionAccess = ReturnType<typeof collectionAccess>;
