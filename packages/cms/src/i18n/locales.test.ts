import { describe, expect, it } from "vitest";
import {
  DEFAULT_LOCALE,
  isLocale,
  missingLocales,
  parityReport,
  resolveLocalized,
} from "./locales";

describe("locale config", () => {
  it("English is the default and locales are recognised", () => {
    expect(DEFAULT_LOCALE).toBe("en");
    expect(isLocale("el")).toBe(true);
    expect(isLocale("fr")).toBe(false);
  });
});

describe("missingLocales", () => {
  it("reports untranslated locales", () => {
    expect(missingLocales({ en: "Hello" })).toEqual(["el"]);
    expect(missingLocales({ en: "Hello", el: "Γειά" })).toEqual([]);
    expect(missingLocales({})).toEqual(["en", "el"]);
    expect(missingLocales({ en: "  ", el: "Γειά" })).toEqual(["en"]);
  });
  it("treats non-string values (e.g. a media reference) as present", () => {
    expect(missingLocales<number>({ en: 42, el: 7 })).toEqual([]);
    expect(missingLocales<{ id: string }>({ en: { id: "media-1" } })).toEqual(["el"]);
  });
});

describe("resolveLocalized — fallback is visible, never hidden", () => {
  it("returns the requested locale when present", () => {
    expect(resolveLocalized({ en: "Hello", el: "Γειά" }, "el")).toEqual({
      value: "Γειά",
      usedFallback: false,
    });
  });
  it("falls back to English and flags it", () => {
    expect(resolveLocalized({ en: "Hello" }, "el")).toEqual({ value: "Hello", usedFallback: true });
  });
  it("does not fabricate a value when English is also missing", () => {
    expect(resolveLocalized({}, "el")).toEqual({ value: undefined, usedFallback: false });
  });
  it("never fallback-loops on the default locale itself", () => {
    expect(resolveLocalized({}, "en")).toEqual({ value: undefined, usedFallback: false });
  });
});

describe("parityReport", () => {
  it("lists only fields with missing translations", () => {
    const report = parityReport({ title: { en: "T", el: "Τ" }, body: { en: "B" } }, [
      "title",
      "body",
    ]);
    expect(report).toEqual([{ field: "body", missing: ["el"] }]);
  });
});
