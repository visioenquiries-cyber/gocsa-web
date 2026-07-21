/**
 * Page-builder blocks (docs/12 §4, docs/16) — **schema only** in Sprint 3 (no public
 * compositions). Each block reuses shared field groups, requires its essential content,
 * localises text, and pulls media from the Media collection (which enforces alt text) —
 * so editors control content, not layout. Accessibility metadata is required, not optional.
 */
import type { Block } from "../types";
import { ctaField, linkFields } from "../fields";

const richText = (name = "content", required = true): import("../types").Field => ({
  name,
  type: "richText",
  localized: true,
  required,
  admin: { description: "Body text. Use headings to structure — the design system styles them." },
});

export const blocks: Block[] = [
  {
    slug: "hero",
    labels: { singular: "Hero" },
    description: "The top of a page: one headline, an optional image, and one main button.",
    fields: [
      { name: "eyebrow", type: "text", localized: true },
      { name: "heading", type: "text", localized: true, required: true },
      { name: "subheading", type: "textarea", localized: true },
      {
        name: "media",
        type: "upload",
        relationTo: "media",
        admin: {
          description: "Optional background image (alt text is required on the image itself).",
        },
      },
      ctaField("primaryCta"),
      ctaField("secondaryCta"),
    ],
  },
  {
    slug: "richText",
    labels: { singular: "Text" },
    description: "Normal page text with headings and links.",
    fields: [richText()],
  },
  {
    slug: "splitContent",
    labels: { singular: "Text + image" },
    description: "Text on one side, an image or video on the other.",
    fields: [
      { name: "heading", type: "text", localized: true },
      richText("body"),
      { name: "media", type: "upload", relationTo: "media", required: true },
      {
        name: "mediaSide",
        type: "select",
        defaultValue: "right",
        options: [
          { label: "Left", value: "left" },
          { label: "Right", value: "right" },
        ],
      },
      ctaField(),
    ],
  },
  {
    slug: "featureCards",
    labels: { singular: "Cards" },
    description: "A row of clickable cards, e.g. services or resources.",
    fields: [
      { name: "heading", type: "text", localized: true },
      {
        name: "cards",
        type: "array",
        fields: [
          { name: "title", type: "text", localized: true, required: true },
          { name: "summary", type: "textarea", localized: true },
          { name: "media", type: "upload", relationTo: "media" },
          { name: "link", type: "group", fields: linkFields() },
        ],
      },
    ],
  },
  {
    slug: "statistics",
    labels: { singular: "Key numbers" },
    description: "2–4 verified figures. Only use numbers GOCSA has confirmed.",
    fields: [
      {
        name: "stats",
        type: "array",
        fields: [
          {
            name: "value",
            type: "text",
            required: true,
            admin: { description: 'The number, e.g. "95+".' },
          },
          { name: "label", type: "text", localized: true, required: true },
        ],
      },
    ],
  },
  {
    slug: "timeline",
    labels: { singular: "Timeline / steps" },
    description: "A sequence — our history, or steps to follow.",
    fields: [
      {
        name: "ordered",
        type: "checkbox",
        defaultValue: false,
        admin: { description: "Tick for numbered steps." },
      },
      {
        name: "items",
        type: "array",
        fields: [
          { name: "marker", type: "text", admin: { description: "Year or step number." } },
          { name: "title", type: "text", localized: true, required: true },
          richText("body", false),
        ],
      },
    ],
  },
  {
    slug: "gallery",
    labels: { singular: "Gallery" },
    description: "A set of real GOCSA photos. Each image needs alt text and consent.",
    fields: [
      { name: "images", type: "upload", relationTo: "media", hasMany: true, required: true },
      { name: "lightbox", type: "checkbox", defaultValue: true },
    ],
  },
  {
    slug: "video",
    labels: { singular: "Video" },
    description: "A captioned video with a transcript (both required for accessibility).",
    fields: [
      { name: "video", type: "upload", relationTo: "media", required: true },
      {
        name: "transcript",
        type: "richText",
        localized: true,
        required: true,
        admin: { description: "Full transcript — required." },
      },
    ],
  },
  {
    slug: "testimonialBlock",
    labels: { singular: "Testimonials" },
    description: "Consented client/family quotes.",
    fields: [
      {
        name: "items",
        type: "relationship",
        relationTo: "testimonials",
        hasMany: true,
        required: true,
      },
    ],
  },
  {
    slug: "faqBlock",
    labels: { singular: "FAQs" },
    description: "Reuse existing FAQs — edit them once, they update everywhere.",
    fields: [
      { name: "faqs", type: "relationship", relationTo: "faqs", hasMany: true, required: true },
    ],
  },
  {
    slug: "downloadList",
    labels: { singular: "Downloads" },
    description: "Attach files like price lists or brochures.",
    fields: [
      { name: "heading", type: "text", localized: true },
      {
        name: "items",
        type: "relationship",
        relationTo: "downloads",
        hasMany: true,
        required: true,
      },
    ],
  },
  {
    slug: "ctaBand",
    labels: { singular: "Call-to-action band" },
    description: 'A prompt to act — usually "Get started" or "Call us".',
    fields: [
      { name: "heading", type: "text", localized: true, required: true },
      { name: "body", type: "textarea", localized: true },
      ctaField("primaryCta"),
      ctaField("secondaryCta"),
    ],
  },
  {
    slug: "contactBlock",
    labels: { singular: "Contact details" },
    description: "Shows GOCSA's phone and address (kept in Site Settings).",
    fields: [
      { name: "heading", type: "text", localized: true },
      { name: "body", type: "textarea", localized: true },
    ],
  },
  {
    slug: "policyContent",
    labels: { singular: "Policy content" },
    description: "Long-form governance/policy text with a contents list.",
    fields: [richText("body"), { name: "showToc", type: "checkbox", defaultValue: true }],
  },
  {
    slug: "relatedContent",
    labels: { singular: "Related content" },
    description: "Link to related services, resources or news.",
    fields: [
      {
        name: "items",
        type: "relationship",
        relationTo: ["services", "resources", "news"],
        hasMany: true,
      },
    ],
  },
];

/** Block slugs available to the flexible `Page` builder (per-collection allowlists, docs/16). */
export const pageBlockSlugs = blocks.map((b) => b.slug);
