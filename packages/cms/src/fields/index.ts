/**
 * Shared field groups (docs/09 §5, §0.3) — defined once, imported into many
 * collections/globals. Factories so per-use tweaks (e.g. localised toggles) are trivial.
 */
import type { Field } from "../types";

/** SEO block (docs/09 §0.3). Localised where marked. */
export function seoField(): Field {
  return {
    name: "seo",
    type: "group",
    label: "SEO",
    admin: { description: "Search/social metadata. Leave blank to use sensible defaults." },
    fields: [
      {
        name: "metaTitle",
        type: "text",
        localized: true,
        admin: { description: "≤ 60 characters. Defaults to the page title." },
      },
      {
        name: "metaDescription",
        type: "textarea",
        localized: true,
        admin: { description: "≤ 160 characters. Defaults to the intro/excerpt." },
      },
      {
        name: "ogImage",
        type: "upload",
        relationTo: "media",
        admin: { description: "≥ 1200×630." },
      },
      { name: "canonicalUrl", type: "text" },
      { name: "noindex", type: "checkbox", defaultValue: false },
      {
        name: "structuredDataType",
        type: "select",
        options: [
          { label: "Web page", value: "WebPage" },
          { label: "Article", value: "Article" },
          { label: "Service", value: "Service" },
        ],
      },
    ],
  };
}

/** Call-to-action (docs/09 §5). Charcoal text on gold enforced by the UI, not here. */
export function ctaField(name = "cta"): Field {
  return {
    name,
    type: "group",
    label: "Call to action",
    fields: [
      { name: "label", type: "text", localized: true, required: true },
      {
        name: "type",
        type: "select",
        defaultValue: "internal",
        options: [
          { label: "Internal page", value: "internal" },
          { label: "External URL", value: "external" },
        ],
      },
      { name: "reference", type: "relationship", relationTo: ["pages", "services"] },
      { name: "url", type: "text" },
      {
        name: "style",
        type: "select",
        defaultValue: "primary",
        options: [
          { label: "Primary", value: "primary" },
          { label: "Accent", value: "accent" },
          { label: "Secondary", value: "secondary" },
        ],
      },
    ],
  };
}

/** Navigation/footer link (docs/09 §12/§13). */
export function linkField(name = "link"): Field {
  return {
    name,
    type: "group",
    fields: [
      { name: "label", type: "text", localized: true, required: true },
      {
        name: "type",
        type: "select",
        defaultValue: "internal",
        options: [
          { label: "Internal", value: "internal" },
          { label: "External", value: "external" },
        ],
      },
      { name: "reference", type: "relationship", relationTo: ["pages", "services"] },
      { name: "url", type: "text" },
      { name: "newTab", type: "checkbox", defaultValue: false },
    ],
  };
}

/** Postal/geographic address (docs/09 §15). */
export function addressField(name = "address"): Field {
  return {
    name,
    type: "group",
    fields: [
      { name: "street", type: "text", required: true },
      { name: "suburb", type: "text", required: true },
      { name: "state", type: "text", defaultValue: "SA" },
      { name: "postcode", type: "text", required: true },
      { name: "geo", type: "point" },
    ],
  };
}
