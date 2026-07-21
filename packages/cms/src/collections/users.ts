/**
 * Users (auth) collection (docs/14). Payload owns password hashing, sessions, MFA, and
 * throttling (configured in the app); this defines the identity fields + role/site scope
 * that the access layer reads. Managed only by Super/Site Admin (structural lane).
 */
import { ROLES } from "../access/roles";
import type { CollectionConfig } from "../types";

export const users: CollectionConfig = {
  slug: "users",
  auth: true,
  labels: { singular: "User", plural: "Users" },
  admin: { useAsTitle: "email", group: "System", description: "Staff accounts and their roles." },
  lane: "structural",
  fields: [
    { name: "name", type: "text", required: true },
    {
      name: "role",
      type: "select",
      required: true,
      admin: { description: "Determines what this person can do (docs/14)." },
      options: ROLES.map((r) => ({ label: r, value: r })),
    },
    {
      name: "sites",
      type: "select",
      hasMany: true,
      admin: { description: "Sites this person may manage. Leave empty for none until assigned." },
      options: [
        { label: "GOCSA Community Care", value: "gocsa-community-care" },
        { label: "RGHA Retirement Living", value: "rgha-retirement-living" },
      ],
    },
    {
      name: "status",
      type: "select",
      defaultValue: "active",
      options: [
        { label: "Active", value: "active" },
        { label: "Disabled", value: "disabled" },
      ],
    },
    { name: "lastLoginAt", type: "date", admin: { readOnly: true } },
    { name: "failedLoginCount", type: "number", defaultValue: 0, admin: { readOnly: true } },
  ],
};
