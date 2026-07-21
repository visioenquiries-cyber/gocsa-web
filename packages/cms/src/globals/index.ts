/**
 * Globals (docs/09 §12–§15). Structural lane — Super/Site Admin only. One instance per site.
 */
import { addressField, linkFields } from "../fields";
import type { GlobalConfig } from "../types";

export const settings: GlobalConfig = {
  slug: "settings",
  admin: { group: "System", description: "Site-wide contact details and defaults." },
  lane: "structural",
  fields: [
    { name: "siteName", type: "text", localized: true, required: true },
    {
      name: "organisationLegalName",
      type: "text",
      required: true,
      defaultValue: "Greek Orthodox Community of South Australia Incorporated",
    },
    { name: "phonePrimary", type: "text", required: true },
    { name: "email", type: "text", required: true },
    addressField(),
    {
      name: "foundingYear",
      type: "number",
      required: true,
      admin: { description: "Confirm 1930 (see D7)." },
    },
    { name: "careSince", type: "number", defaultValue: 1985 },
    { name: "defaultOgImage", type: "upload", relationTo: "media" },
    { name: "acknowledgementOfCountry", type: "richText", localized: true, required: true },
  ],
};

export const navigation: GlobalConfig = {
  slug: "navigation",
  admin: { group: "System", description: "Header menu. Phone and “Get started” are always shown." },
  lane: "structural",
  fields: [
    {
      name: "headerItems",
      type: "array",
      fields: [
        { name: "label", type: "text", localized: true, required: true },
        { name: "link", type: "group", fields: linkFields() },
      ],
    },
  ],
};

export const footer: GlobalConfig = {
  slug: "footer",
  admin: { group: "System", description: "Footer links, acknowledgement, and accreditations." },
  lane: "structural",
  fields: [
    {
      name: "columns",
      type: "array",
      fields: [
        { name: "heading", type: "text", localized: true, required: true },
        { name: "links", type: "array", fields: linkFields() },
      ],
    },
    { name: "acknowledgement", type: "richText", localized: true, required: true },
  ],
};

export const globals: GlobalConfig[] = [settings, navigation, footer];
