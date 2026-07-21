import { describe, expect, it } from "vitest";
import {
  validateAltText,
  validateFormHasConsent,
  validateLinkDestination,
  validatePersonConsent,
  type LinkValue,
} from "./gates";

describe("validateAltText", () => {
  it("passes decorative images with no alt", () => {
    expect(validateAltText("", { isDecorative: true })).toBe(true);
  });
  it("requires non-empty alt for informational images", () => {
    expect(validateAltText("")).toMatch(/required/i);
    expect(validateAltText("   ")).toMatch(/required/i);
    expect(validateAltText("Two carers with a client")).toBe(true);
  });
});

describe("validatePersonConsent", () => {
  it("passes when there are no identifiable people", () => {
    expect(validatePersonConsent(false, { hasPeople: false })).toBe(true);
  });
  it("requires consent when people are shown", () => {
    expect(validatePersonConsent(false, { hasPeople: true })).toMatch(/consent/i);
    expect(validatePersonConsent(true, { hasPeople: true })).toBe(true);
  });
});

describe("validateLinkDestination", () => {
  const base = (over: Partial<LinkValue>): LinkValue => ({ kind: "external", ...over });
  it("rejects no destination", () => {
    expect(validateLinkDestination(base({ kind: "external" }))).toMatch(/needs a destination/i);
  });
  it("rejects multiple destinations", () => {
    expect(validateLinkDestination(base({ kind: "external", url: "/a", email: "x@y.z" }))).toMatch(
      /just one/i,
    );
  });
  it("rejects a kind that doesn't match its destination", () => {
    expect(validateLinkDestination(base({ kind: "email", url: "/a" }))).toMatch(/doesn't match/i);
  });
  it("accepts each valid kind", () => {
    expect(validateLinkDestination({ kind: "internal", reference: "id" })).toBe(true);
    expect(validateLinkDestination({ kind: "external", url: "https://x" })).toBe(true);
    expect(validateLinkDestination({ kind: "email", email: "x@y.z" })).toBe(true);
    expect(validateLinkDestination({ kind: "tel", phone: "7088 0500" })).toBe(true);
    expect(validateLinkDestination({ kind: "download", file: "id" })).toBe(true);
    expect(validateLinkDestination({ kind: "anchor", anchor: "section" })).toBe(true);
  });
});

describe("validateFormHasConsent", () => {
  it("requires a consent checkbox", () => {
    expect(validateFormHasConsent([{ type: "text", name: "name" }])).toMatch(/consent/i);
    expect(
      validateFormHasConsent([
        { type: "text", name: "name" },
        { type: "checkbox", name: "privacyConsent" },
      ]),
    ).toBe(true);
  });
});
