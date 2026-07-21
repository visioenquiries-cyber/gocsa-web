/**
 * Shared field groups (docs/09 §5, §0.3) — defined once, imported into many
 * collections/blocks/globals. Factories so per-use tweaks are trivial. Every field
 * carries an editor-facing description; localisation is marked per docs/09.
 */
import type { Field } from "../types";

/** SEO block (docs/09 §0.3). Localised where marked. */
export function seoField(): Field {
  return {
    name: "seo",
    type: "group",
    label: "Search & social (SEO)",
    admin: {
      description:
        "How this page appears in search and when shared. Leave blank for sensible defaults.",
    },
    fields: [
      {
        name: "metaTitle",
        type: "text",
        localized: true,
        admin: { description: "≤ 60 characters. Defaults to the title." },
      },
      {
        name: "metaDescription",
        type: "textarea",
        localized: true,
        admin: { description: "≤ 160 characters. Defaults to the intro." },
      },
      {
        name: "canonicalUrl",
        type: "text",
        admin: { description: "Only set if this content also lives at another URL." },
      },
      {
        name: "ogTitle",
        type: "text",
        localized: true,
        admin: { description: "Title when shared on social (defaults to meta title)." },
      },
      {
        name: "ogDescription",
        type: "textarea",
        localized: true,
        admin: { description: "Description when shared (defaults to meta description)." },
      },
      {
        name: "ogImage",
        type: "upload",
        relationTo: "media",
        admin: { description: "Share image, ≥ 1200×630." },
      },
      {
        name: "noindex",
        type: "checkbox",
        defaultValue: false,
        admin: { description: "Hide this page from search engines." },
      },
      {
        name: "structuredDataType",
        type: "select",
        admin: { description: "Advanced: structured-data type. Leave as default unless advised." },
        options: [
          { label: "Web page", value: "WebPage" },
          { label: "Article", value: "Article" },
          { label: "Service", value: "Service" },
          { label: "FAQ", value: "FAQPage" },
        ],
      },
    ],
  };
}

/** Call-to-action (docs/09 §5). Gold-on-Charcoal enforced by the UI (DEC-007), not here. */
export function ctaField(name = "cta"): Field {
  return {
    name,
    type: "group",
    label: "Call to action",
    admin: { description: "An optional button prompting the visitor to act." },
    fields: [
      {
        name: "label",
        type: "text",
        localized: true,
        required: true,
        admin: { description: 'Button text, e.g. "Get started".' },
      },
      {
        name: "link",
        type: "group",
        fields: linkFields(),
        admin: { description: "Where the button goes." },
      },
      {
        name: "style",
        type: "select",
        defaultValue: "primary",
        admin: { description: "Visual emphasis. Primary is the main action." },
        options: [
          { label: "Primary", value: "primary" },
          { label: "Accent", value: "accent" },
          { label: "Secondary", value: "secondary" },
        ],
      },
      {
        name: "ariaLabel",
        type: "text",
        localized: true,
        admin: {
          description:
            "Optional. A clearer label for screen readers if the button text alone is ambiguous.",
        },
      },
    ],
  };
}

/**
 * The inner fields of a link (docs/09 §12). Exactly one destination is valid — enforced at
 * the group level by `validateLinkDestination` (../validation/gates) in the Payload hook.
 */
export function linkFields(): Field[] {
  return [
    {
      name: "kind",
      type: "select",
      required: true,
      defaultValue: "internal",
      admin: { description: "What this link points to." },
      options: [
        { label: "A page on this site", value: "internal" },
        { label: "An external website", value: "external" },
        { label: "An email address", value: "email" },
        { label: "A phone number", value: "tel" },
        { label: "A downloadable file", value: "download" },
        { label: "A section on this page", value: "anchor" },
      ],
    },
    {
      name: "reference",
      type: "relationship",
      relationTo: ["pages", "services"],
      admin: { description: "Internal: the page to link to." },
    },
    { name: "url", type: "text", admin: { description: "External: the full https:// address." } },
    { name: "email", type: "text", admin: { description: "Email: the address." } },
    { name: "phone", type: "text", admin: { description: "Phone: the number." } },
    {
      name: "file",
      type: "upload",
      relationTo: "downloads",
      admin: { description: "Download: the file." },
    },
    {
      name: "anchor",
      type: "text",
      admin: { description: "Section: the anchor id on this page." },
    },
    {
      name: "newTab",
      type: "checkbox",
      defaultValue: false,
      admin: { description: "Open in a new tab (used for external links)." },
    },
  ];
}

/** A standalone link group. */
export function linkField(name = "link"): Field {
  return { name, type: "group", label: "Link", fields: linkFields() };
}

/** Postal/geographic address (docs/09 §15). */
export function addressField(name = "address"): Field {
  return {
    name,
    type: "group",
    label: "Address",
    fields: [
      { name: "line1", type: "text", required: true, admin: { description: "Street address." } },
      { name: "line2", type: "text", admin: { description: "Unit/level (optional)." } },
      { name: "suburb", type: "text", required: true },
      { name: "state", type: "text", defaultValue: "SA", required: true },
      { name: "postcode", type: "text", required: true },
      { name: "country", type: "text", defaultValue: "Australia", required: true },
      { name: "geo", type: "point", admin: { description: "Map coordinates (optional)." } },
    ],
  };
}
