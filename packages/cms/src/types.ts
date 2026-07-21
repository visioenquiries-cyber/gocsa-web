/**
 * Local structural seam for CMS schema definitions (Sprint 3 commencement).
 *
 * The full CMS uses **Payload CMS** (DEC-011). Until `payload` + `apps/web` are wired
 * (later in Sprint 3), we type collections/globals/fields against this minimal seam so
 * the shared field groups and collection contracts can be authored and reviewed against
 * the Content Model Spec (docs/09) with zero ambiguity. When Payload is added, swap
 * `Field`/`CollectionConfig`/`GlobalConfig` for Payload's real types — the shapes match.
 */

export type FieldType =
  | "text"
  | "textarea"
  | "richText"
  | "number"
  | "checkbox"
  | "date"
  | "select"
  | "relationship"
  | "upload"
  | "array"
  | "group"
  | "point"
  | "row";

export interface SelectOption {
  label: string;
  value: string;
}

export interface Field {
  name?: string;
  type: FieldType;
  label?: string;
  required?: boolean;
  /** Field-level EN/EL localisation (docs/09 §0.2). */
  localized?: boolean;
  defaultValue?: unknown;
  options?: SelectOption[];
  hasMany?: boolean;
  relationTo?: string | string[];
  fields?: Field[];
  admin?: { description?: string; position?: "sidebar"; readOnly?: boolean };
  validate?: (value: unknown) => true | string;
}

export type PublishingLane = "care" | "marketing" | "structural";

export interface CollectionConfig {
  slug: string;
  labels?: { singular: string; plural: string };
  admin?: { useAsTitle?: string; group?: string; description?: string };
  /** Which publishing lane governs access (docs/12 §0.4). */
  lane: PublishingLane;
  upload?: boolean;
  versions?: { drafts: boolean; retainAll?: boolean };
  localizedFields?: string[];
  fields: Field[];
}

export interface GlobalConfig {
  slug: string;
  admin?: { group?: string; description?: string };
  lane: PublishingLane;
  fields: Field[];
}
