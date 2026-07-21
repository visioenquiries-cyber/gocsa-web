import { describe, expect, it } from "vitest";
import { accessFor, can, canManageUser } from "./policy";
import { ALL_SITES, hasSite, sharesSite, type CmsUser, type Role, type SiteId } from "./roles";

const GOCSA = "gocsa-community-care";
const RGHA = "rgha-retirement-living";

const user = (roles: Role[], sites: SiteId[] | typeof ALL_SITES = ALL_SITES): CmsUser => ({
  id: "u",
  roles,
  sites,
});

describe("can — deny by default", () => {
  it("rejects a null/role-less user", () => {
    expect(can(null, "read", { lane: "care" })).toBe(false);
    expect(can(user([]), "read", { lane: "care" })).toBe(false);
  });
  it("requires a lane for lane operations", () => {
    expect(can(user(["editor"]), "read")).toBe(false);
  });
});

describe("can — super-admin", () => {
  it("can do everything, everywhere", () => {
    const su = user(["super-admin"], [GOCSA]);
    for (const op of ["read", "publish", "delete", "manageUsers", "manageStructural"] as const) {
      expect(can(su, op, { lane: "structural", site: RGHA })).toBe(true);
    }
  });
});

describe("can — read-only", () => {
  const ro = user(["read-only"]);
  it("reads any lane", () => {
    expect(can(ro, "read", { lane: "care" })).toBe(true);
    expect(can(ro, "read", { lane: "marketing" })).toBe(true);
  });
  it("mutates nothing", () => {
    for (const op of ["create", "update", "delete", "publish", "approve", "translate"] as const) {
      expect(can(ro, op, { lane: "care" })).toBe(false);
    }
  });
});

describe("can — editor", () => {
  const ed = user(["editor"]);
  it("drafts care and marketing but cannot publish/approve/delete", () => {
    expect(can(ed, "create", { lane: "care" })).toBe(true);
    expect(can(ed, "update", { lane: "marketing" })).toBe(true);
    expect(can(ed, "publish", { lane: "care" })).toBe(false);
    expect(can(ed, "approve", { lane: "care" })).toBe(false);
    expect(can(ed, "delete", { lane: "care" })).toBe(false);
  });
  it("manages media but not users or structural", () => {
    expect(can(ed, "manageMedia")).toBe(true);
    expect(can(ed, "manageUsers")).toBe(false);
    expect(can(ed, "update", { lane: "structural" })).toBe(false);
  });
});

describe("can — translator / reviewer", () => {
  it("translator translates but cannot create or publish", () => {
    const tr = user(["translator"]);
    expect(can(tr, "translate", { lane: "care" })).toBe(true);
    expect(can(tr, "create", { lane: "care" })).toBe(false);
    expect(can(tr, "publish", { lane: "care" })).toBe(false);
  });
  it("reviewer reviews and approves but cannot publish", () => {
    const rv = user(["reviewer"]);
    expect(can(rv, "review", { lane: "care" })).toBe(true);
    expect(can(rv, "approve", { lane: "marketing" })).toBe(true);
    expect(can(rv, "publish", { lane: "care" })).toBe(false);
  });
});

describe("can — care/marketing managers stay in their lane", () => {
  it("community-care-manager publishes care, only reads marketing", () => {
    const ccm = user(["community-care-manager"], [GOCSA]);
    expect(can(ccm, "publish", { lane: "care", site: GOCSA })).toBe(true);
    expect(can(ccm, "publish", { lane: "marketing", site: GOCSA })).toBe(false);
    expect(can(ccm, "read", { lane: "marketing", site: GOCSA })).toBe(true);
    expect(can(ccm, "update", { lane: "structural", site: GOCSA })).toBe(false);
  });
  it("marketing-manager publishes marketing, only reads care", () => {
    const mm = user(["marketing-manager"], [GOCSA]);
    expect(can(mm, "publish", { lane: "marketing", site: GOCSA })).toBe(true);
    expect(can(mm, "publish", { lane: "care", site: GOCSA })).toBe(false);
  });
});

describe("can — site scope", () => {
  it("denies action outside the user's site", () => {
    const ccm = user(["community-care-manager"], [GOCSA]);
    expect(can(ccm, "publish", { lane: "care", site: RGHA })).toBe(false);
    expect(can(ccm, "publish", { lane: "care", site: GOCSA })).toBe(true);
  });
});

describe("site-admin & user management", () => {
  const su = user(["super-admin"]);
  const sa = user(["site-admin"], [GOCSA]);
  it("site-admin manages structural + users within site", () => {
    expect(can(sa, "manageStructural", { site: GOCSA })).toBe(true);
    expect(can(sa, "publish", { lane: "care", site: GOCSA })).toBe(true);
  });
  it("super-admin can manage anyone; site-admin cannot manage a super-admin", () => {
    expect(canManageUser(su, sa)).toBe(true);
    expect(canManageUser(sa, su)).toBe(false);
    expect(canManageUser(sa, user(["editor"], [GOCSA]))).toBe(true);
    expect(canManageUser(sa, user(["editor"], [RGHA]))).toBe(false);
    expect(canManageUser(user(["editor"]), sa)).toBe(false);
  });
});

describe("helpers", () => {
  it("hasSite / sharesSite honour wildcard", () => {
    expect(hasSite(user(["editor"], ALL_SITES), RGHA)).toBe(true);
    expect(hasSite(user(["editor"], [GOCSA]), RGHA)).toBe(false);
    expect(sharesSite(user(["editor"], ALL_SITES), user(["editor"], [RGHA]))).toBe(true);
    expect(sharesSite(user(["editor"], [GOCSA]), user(["editor"], [RGHA]))).toBe(false);
    expect(sharesSite(user(["editor"], [GOCSA]), user(["editor"], [GOCSA]))).toBe(true);
  });
  it("accessFor curries a lane check", () => {
    const publishCare = accessFor("publish", "care");
    expect(publishCare(user(["community-care-manager"], [GOCSA]), GOCSA)).toBe(true);
    expect(publishCare(user(["editor"]), GOCSA)).toBe(false);
  });
});
