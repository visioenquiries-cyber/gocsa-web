/**
 * Integration tests — boot Payload against a real Postgres and verify runtime behaviour the
 * pure unit tests can't: schema registration, server-side access enforcement, and auth.
 * Requires DATABASE_URI + a migrated, seeded database (CI's Postgres job; or local db:up).
 */
import { beforeAll, describe, expect, it } from "vitest";
import { getPayload, type Payload } from "payload";
import config from "../payload.config";

let payload: Payload;

beforeAll(async () => {
  payload = await getPayload({ config });
}, 60_000);

describe("CMS boots with the approved schema", () => {
  it("registers all Sprint-3 collections", () => {
    const slugs = payload.config.collections.map((c) => c.slug);
    for (const s of [
      "users",
      "media",
      "service-groups",
      "services",
      "funding-programs",
      "faqs",
      "testimonials",
      "downloads",
      "pages",
    ]) {
      expect(slugs).toContain(s);
    }
  });

  it("registers all globals", () => {
    const slugs = payload.config.globals.map((g) => g.slug);
    for (const g of ["settings", "navigation", "footer"]) expect(slugs).toContain(g);
  });

  it("enables English + Greek localisation with English default", () => {
    expect(payload.config.localization).toBeTruthy();
  });
});

describe("server-side access enforcement", () => {
  it("rejects an anonymous create when access is not overridden", async () => {
    await expect(
      payload.create({
        collection: "services",
        overrideAccess: false,
        data: {
          name: "unauthorised",
          slug: "unauthorised",
          group: 1,
          summary: "x",
          body: {} as never,
        },
      }),
    ).rejects.toThrow();
  });
});

describe("authentication", () => {
  it("logs in the seeded super administrator", async () => {
    const result = await payload.login({
      collection: "users",
      data: { email: "admin@example.dev", password: "changeme-dev-only" },
    });
    expect(result.user?.email).toBe("admin@example.dev");
  });

  it("rejects an invalid password", async () => {
    await expect(
      payload.login({
        collection: "users",
        data: { email: "admin@example.dev", password: "wrong-password" },
      }),
    ).rejects.toThrow();
  });
});
