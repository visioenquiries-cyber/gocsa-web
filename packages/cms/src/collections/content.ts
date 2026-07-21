/**
 * Representative content collections (docs/09). Foundational + reference + primary examples
 * built to the approved contract; the remaining collections (resources, news, events, staff,
 * policies, careers, forms, redirects) follow the identical pattern and are listed in the
 * registry's `pending` note. Every localised field is marked; SEO/versioning/lane are set.
 */
import { seoField } from "../fields";
import type { CollectionConfig } from "../types";

/** Service Groups — purpose-based grouping (docs/09 §2a). */
export const serviceGroups: CollectionConfig = {
  slug: "service-groups",
  labels: { singular: "Service group", plural: "Service groups" },
  admin: { useAsTitle: "name", group: "Care" },
  lane: "care",
  versions: { drafts: true },
  localizedFields: ["name", "description"],
  fields: [
    { name: "name", type: "text", localized: true, required: true },
    { name: "slug", type: "text", localized: true, required: true },
    { name: "description", type: "textarea", localized: true },
    { name: "order", type: "number", defaultValue: 100 },
  ],
};

/** Services — the product spine (docs/09 §2). Care lane. */
export const services: CollectionConfig = {
  slug: "services",
  labels: { singular: "Service", plural: "Services" },
  admin: { useAsTitle: "name", group: "Care", description: "In-home care services." },
  lane: "care",
  versions: { drafts: true },
  localizedFields: ["name", "slug", "summary", "body", "whoFor"],
  fields: [
    { name: "name", type: "text", localized: true, required: true },
    { name: "slug", type: "text", localized: true, required: true },
    { name: "group", type: "relationship", relationTo: "service-groups", required: true },
    {
      name: "summary",
      type: "textarea",
      localized: true,
      required: true,
      admin: { description: "Short description used in cards/menus (≤ 200 chars)." },
    },
    { name: "body", type: "richText", localized: true, required: true },
    { name: "whoFor", type: "richText", localized: true },
    { name: "relatedFunding", type: "relationship", relationTo: "funding-programs", hasMany: true },
    { name: "faqs", type: "relationship", relationTo: "faqs", hasMany: true },
    { name: "downloads", type: "relationship", relationTo: "downloads", hasMany: true },
    { name: "order", type: "number", defaultValue: 100 },
    seoField(),
  ],
};

/** Funding Programs — SAH / CHSP / Private (docs/09 §3). Care lane. */
export const fundingPrograms: CollectionConfig = {
  slug: "funding-programs",
  labels: { singular: "Funding program", plural: "Funding programs" },
  admin: { useAsTitle: "name", group: "Care" },
  lane: "care",
  versions: { drafts: true },
  localizedFields: ["name", "slug", "summary", "body", "eligibility"],
  fields: [
    { name: "name", type: "text", localized: true, required: true },
    { name: "slug", type: "text", localized: true, required: true },
    {
      name: "shortCode",
      type: "select",
      required: true,
      options: [
        { label: "Support at Home", value: "SAH" },
        { label: "CHSP", value: "CHSP" },
        { label: "Privately funded", value: "PRIVATE" },
      ],
    },
    { name: "summary", type: "textarea", localized: true, required: true },
    { name: "body", type: "richText", localized: true, required: true },
    { name: "eligibility", type: "richText", localized: true },
    { name: "priceLists", type: "relationship", relationTo: "downloads", hasMany: true },
    seoField(),
  ],
};

/** FAQs (docs/09 §4). Care by default. */
export const faqs: CollectionConfig = {
  slug: "faqs",
  labels: { singular: "FAQ", plural: "FAQs" },
  admin: { useAsTitle: "question", group: "Content" },
  lane: "care",
  versions: { drafts: true },
  localizedFields: ["question", "answer"],
  fields: [
    { name: "question", type: "text", localized: true, required: true },
    { name: "answer", type: "richText", localized: true, required: true },
    {
      name: "category",
      type: "select",
      required: true,
      options: [
        { label: "General", value: "general" },
        { label: "Funding", value: "funding" },
        { label: "Services", value: "services" },
        { label: "Getting started", value: "getting-started" },
        { label: "Rights", value: "rights" },
      ],
    },
    { name: "isCareContent", type: "checkbox", defaultValue: true },
  ],
};

/** Testimonials (docs/09 §11). Marketing lane; consent gate. */
export const testimonials: CollectionConfig = {
  slug: "testimonials",
  labels: { singular: "Testimonial", plural: "Testimonials" },
  admin: { useAsTitle: "attribution", group: "Marketing" },
  lane: "marketing",
  versions: { drafts: true },
  localizedFields: ["quote", "attribution"],
  fields: [
    { name: "quote", type: "textarea", localized: true, required: true },
    {
      name: "attribution",
      type: "text",
      localized: true,
      required: true,
      admin: { description: 'e.g. "Maria, daughter of a client".' },
    },
    {
      name: "consentOnFile",
      type: "checkbox",
      required: true,
      defaultValue: false,
      admin: { description: "Must be ticked before this can be published (docs/09 §11)." },
      validate: (v) =>
        v === true ? true : "Consent must be recorded before publishing a testimonial.",
    },
    { name: "relatedService", type: "relationship", relationTo: "services" },
  ],
};

/** Downloads (docs/09 §6). Care lane for price/policy. */
export const downloads: CollectionConfig = {
  slug: "downloads",
  upload: true,
  labels: { singular: "Download", plural: "Downloads" },
  admin: {
    useAsTitle: "title",
    group: "Content",
    description: "Price lists, brochures, policy PDFs.",
  },
  lane: "care",
  versions: { drafts: true },
  localizedFields: ["title", "description"],
  fields: [
    { name: "title", type: "text", localized: true, required: true },
    { name: "description", type: "textarea", localized: true },
    {
      name: "category",
      type: "select",
      required: true,
      options: [
        { label: "Price list", value: "price-list" },
        { label: "Brochure", value: "brochure" },
        { label: "Form", value: "form" },
        { label: "Policy", value: "policy" },
        { label: "Guide", value: "guide" },
      ],
    },
    { name: "effectiveFrom", type: "date" },
    { name: "isCareContent", type: "checkbox", defaultValue: true },
  ],
};

/** Pages — flexible builder (docs/09 §1). Structural. Blocks wired in the Payload config. */
export const pages: CollectionConfig = {
  slug: "pages",
  labels: { singular: "Page", plural: "Pages" },
  admin: { useAsTitle: "title", group: "Content" },
  lane: "structural",
  versions: { drafts: true },
  localizedFields: ["title", "slug", "intro"],
  fields: [
    { name: "title", type: "text", localized: true, required: true },
    { name: "slug", type: "text", localized: true, required: true },
    { name: "intro", type: "textarea", localized: true },
    {
      name: "sections",
      type: "array",
      admin: { description: "Build the page from approved blocks (docs/16)." },
      fields: [],
    },
    seoField(),
  ],
};
