/**
 * Adapter: maps the reviewed, tested `@gocsa/cms` schema (framework-agnostic seam) into
 * Payload's collection/global/field configs, and bridges the tested access policy into
 * Payload's `access` signature. All schema + rules live in @gocsa/cms (RGHA-reusable);
 * this file is the only Payload-specific glue.
 */
import type { Access, CollectionConfig, Field, GlobalConfig } from "payload";
import {
  can,
  type AccessContext,
  type CmsUser,
  type CollectionConfig as CmsCollection,
  type Field as CmsField,
  type GlobalConfig as CmsGlobal,
  type Lane,
  type Operation,
  type Role,
} from "@gocsa/cms";

/** Narrow Payload's `req.user` (generated `User`) to our framework-agnostic `CmsUser`. */
function toCmsUser(user: unknown): CmsUser | null {
  if (!user || typeof user !== "object") return null;
  const u = user as { id?: string | number; role?: Role; sites?: string[] | null };
  return { id: String(u.id ?? ""), roles: u.role ? [u.role] : [], sites: u.sites ?? [] };
}

/** Bridge our tested policy to Payload's `Access` signature. */
function access(op: Operation, ctx: AccessContext = {}): Access {
  return ({ req }) => can(toCmsUser(req.user), op, ctx);
}

function toPayloadField(field: CmsField): Field {
  const common = {
    ...(field.name ? { name: field.name } : {}),
    ...(field.label ? { label: field.label } : {}),
    ...(field.required ? { required: true } : {}),
    ...(field.localized ? { localized: true } : {}),
    ...(field.defaultValue !== undefined ? { defaultValue: field.defaultValue } : {}),
    ...(field.admin ? { admin: field.admin } : {}),
  };
  switch (field.type) {
    case "text":
    case "textarea":
    case "richText":
    case "number":
    case "checkbox":
    case "date":
    case "point":
      return { ...common, type: field.type } as Field;
    case "select":
      return {
        ...common,
        type: "select",
        hasMany: field.hasMany,
        options: field.options ?? [],
      } as Field;
    case "relationship":
      return {
        ...common,
        type: "relationship",
        relationTo: field.relationTo ?? "pages",
        hasMany: field.hasMany,
      } as Field;
    case "upload":
      return {
        ...common,
        type: "upload",
        relationTo: Array.isArray(field.relationTo)
          ? field.relationTo[0]!
          : (field.relationTo ?? "media"),
      } as Field;
    case "array":
    case "group":
      return {
        ...common,
        type: field.type,
        fields: (field.fields ?? []).map(toPayloadField),
      } as Field;
    case "row":
      return { type: "row", fields: (field.fields ?? []).map(toPayloadField) } as Field;
    default:
      return { ...common, type: "text" } as Field;
  }
}

const laneFor = (c: CmsCollection | CmsGlobal): Lane => c.lane;

/** Build a Payload collection from a @gocsa/cms collection, wiring lane-based access. */
export function toPayloadCollection(c: CmsCollection): CollectionConfig {
  const lane = laneFor(c);
  const collection: CollectionConfig = {
    slug: c.slug,
    labels: c.labels,
    admin: {
      useAsTitle: c.admin?.useAsTitle,
      group: c.admin?.group,
      description: c.admin?.description,
    },
    access: {
      read: access("read", { lane }),
      create: access("create", { lane }),
      update: access("update", { lane }),
      delete: access("delete", { lane }),
    },
    fields: c.fields.map(toPayloadField),
  };
  if (c.auth) {
    collection.auth = {
      tokenExpiration: 60 * 60 * 8,
      maxLoginAttempts: 5,
      lockTime: 10 * 60 * 1000,
    };
    collection.access = {
      read: access("read", { lane }),
      create: access("manageUsers"),
      update: access("manageUsers"),
      delete: access("manageUsers"),
    };
  }
  if (c.upload) collection.upload = true;
  if (c.versions?.drafts) collection.versions = { drafts: true };
  return collection;
}

/** Build a Payload global from a @gocsa/cms global (structural lane). */
export function toPayloadGlobal(g: CmsGlobal): GlobalConfig {
  return {
    slug: g.slug,
    admin: { group: g.admin?.group, description: g.admin?.description },
    access: {
      read: access("read", { lane: "structural" }),
      update: access("manageStructural"),
    },
    fields: g.fields.map(toPayloadField),
  };
}
