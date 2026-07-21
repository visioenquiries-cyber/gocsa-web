/**
 * Media collection (docs/09 §15, docs/12 §9, docs/17).
 * Binaries go to the StorageProvider (docs/13 §5, @gocsa/platform); the DB holds
 * metadata. Publish gates — **localised alt text required unless decorative**, and
 * **consent required for identifiable people** — are enforced by `validate` here and
 * mirrored by the UI (Image/Video primitives).
 */
import type { CollectionConfig } from "../types";

export const media: CollectionConfig = {
  slug: "media",
  labels: { singular: "Media asset", plural: "Media library" },
  admin: {
    useAsTitle: "title",
    group: "Library",
    description: "Images and documents, reused across the site.",
  },
  lane: "marketing",
  upload: true,
  localizedFields: ["title", "altText", "caption"],
  fields: [
    { name: "title", type: "text", localized: true, required: true },
    {
      name: "isDecorative",
      type: "checkbox",
      defaultValue: false,
      admin: { description: "Tick only for purely decorative images (they get empty alt text)." },
    },
    {
      name: "altText",
      type: "text",
      localized: true,
      admin: { description: "Describe the image for screen readers. Required unless decorative." },
      // Publish gate: alt text required for non-decorative images (docs/09 §0.7).
      validate: (value) =>
        typeof value === "string" && value.trim().length > 0
          ? true
          : "Alt text is required (or mark the image decorative).",
    },
    { name: "caption", type: "text", localized: true },
    { name: "credit", type: "text", admin: { description: "Photographer or source." } },
    {
      name: "rights",
      type: "text",
      localized: false,
      admin: { description: "Usage/rights notes (e.g. licence, expiry)." },
    },
    {
      name: "consentOnFile",
      type: "checkbox",
      defaultValue: false,
      admin: { description: "Required when the image shows identifiable people (privacy R9)." },
    },
    { name: "tags", type: "text", hasMany: true },
    {
      name: "archived",
      type: "checkbox",
      defaultValue: false,
      admin: {
        description: "Hide from the picker without deleting. Cannot archive an asset still in use.",
      },
    },
  ],
};
