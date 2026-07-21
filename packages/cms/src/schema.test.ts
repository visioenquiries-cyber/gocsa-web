import { describe, expect, it } from "vitest";
import { collections, globals } from "./registry";
import { blocks } from "./blocks";
import { collectionAccess } from "./access/payload";
import { LANES } from "./access/roles";
import type { Field } from "./types";

function fieldNames(fields: Field[]): string[] {
  return fields.map((f) => f.name).filter((n): n is string => !!n);
}

describe("collections are well-formed", () => {
  it("each has a slug, a valid lane, and fields", () => {
    for (const c of collections) {
      expect(c.slug).toMatch(/^[a-z0-9-]+$/);
      expect(LANES).toContain(c.lane);
      expect(c.fields.length).toBeGreaterThan(0);
    }
  });

  it("slugs are unique", () => {
    const slugs = collections.map((c) => c.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("every declared localized field actually exists on the collection", () => {
    for (const c of collections) {
      for (const name of c.localizedFields ?? []) {
        expect(fieldNames(c.fields)).toContain(name);
      }
    }
  });
});

describe("globals are well-formed", () => {
  it("each global is structural and has fields", () => {
    for (const g of globals) {
      expect(g.lane).toBe("structural");
      expect(g.fields.length).toBeGreaterThan(0);
    }
  });
});

describe("blocks are well-formed", () => {
  it("each block has a slug, editor description, and fields", () => {
    for (const b of blocks) {
      expect(b.slug).toMatch(/^[a-zA-Z0-9]+$/);
      expect(b.description.length).toBeGreaterThan(10);
      expect(b.fields.length).toBeGreaterThan(0);
    }
    expect(new Set(blocks.map((b) => b.slug)).size).toBe(blocks.length);
  });
});

describe("collectionAccess wiring", () => {
  it("denies publish to an editor and allows it for the care manager", () => {
    const care = collectionAccess("care");
    const editor = { id: "e", roles: ["editor" as const], sites: "*" as const };
    const ccm = { id: "m", roles: ["community-care-manager" as const], sites: "*" as const };
    expect(care.publish(editor, "gocsa-community-care")).toBe(false);
    expect(care.publish(ccm, "gocsa-community-care")).toBe(true);
    expect(care.read(editor, "gocsa-community-care")).toBe(true);
  });
});
