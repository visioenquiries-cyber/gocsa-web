import { describe, expect, it } from "vitest";
import {
  allowedNextStates,
  canSchedulePublish,
  canTransition,
  isLegalTransition,
} from "./workflow";
import { ALL_SITES, type CmsUser, type Role, type SiteId } from "../access/roles";

const GOCSA = "gocsa-community-care";
const user = (roles: Role[], sites: SiteId[] | typeof ALL_SITES = [GOCSA]): CmsUser => ({
  id: "u",
  roles,
  sites,
});

describe("transition legality", () => {
  it("lists legal next states", () => {
    expect(allowedNextStates("draft")).toEqual(["in-review"]);
    expect(allowedNextStates("in-review").sort()).toEqual([
      "approved",
      "changes-requested",
      "draft",
    ]);
    expect(allowedNextStates("approved").sort()).toEqual(["draft", "published"]);
    expect(allowedNextStates("published").sort()).toEqual(["archived", "draft"]);
    expect(allowedNextStates("archived")).toEqual(["draft"]);
  });
  it("rejects skipping states (draft → published is illegal)", () => {
    expect(isLegalTransition("draft", "published")).toBe(false);
    expect(isLegalTransition("draft", "in-review")).toBe(true);
  });
});

describe("canTransition — authorisation per role", () => {
  it("editor submits a draft but cannot publish", () => {
    const ed = user(["editor"]);
    expect(canTransition(ed, { from: "draft", to: "in-review", lane: "care", site: GOCSA })).toBe(
      true,
    );
    expect(
      canTransition(ed, { from: "approved", to: "published", lane: "care", site: GOCSA }),
    ).toBe(false);
  });
  it("reviewer requests changes and approves, but cannot publish", () => {
    const rv = user(["reviewer"]);
    expect(
      canTransition(rv, { from: "in-review", to: "changes-requested", lane: "care", site: GOCSA }),
    ).toBe(true);
    expect(
      canTransition(rv, { from: "in-review", to: "approved", lane: "care", site: GOCSA }),
    ).toBe(true);
    expect(
      canTransition(rv, { from: "approved", to: "published", lane: "care", site: GOCSA }),
    ).toBe(false);
  });
  it("community-care-manager publishes approved care content", () => {
    const ccm = user(["community-care-manager"]);
    expect(
      canTransition(ccm, { from: "approved", to: "published", lane: "care", site: GOCSA }),
    ).toBe(true);
    expect(
      canTransition(ccm, { from: "published", to: "archived", lane: "care", site: GOCSA }),
    ).toBe(true);
    expect(canTransition(ccm, { from: "archived", to: "draft", lane: "care", site: GOCSA })).toBe(
      true,
    );
  });
  it("read-only cannot transition anything", () => {
    const ro = user(["read-only"]);
    expect(canTransition(ro, { from: "draft", to: "in-review", lane: "care", site: GOCSA })).toBe(
      false,
    );
  });
});

describe("canTransition — illegal transitions are always rejected", () => {
  it("even a super-admin cannot skip states", () => {
    const su = user(["super-admin"], ALL_SITES);
    expect(canTransition(su, { from: "draft", to: "published", lane: "care" })).toBe(false);
    // …but a legal one succeeds
    expect(canTransition(su, { from: "approved", to: "published", lane: "care" })).toBe(true);
  });
});

describe("canSchedulePublish", () => {
  it("only an authorised publisher may schedule, and only from approved", () => {
    expect(
      canSchedulePublish(user(["community-care-manager"]), { lane: "care", site: GOCSA }),
    ).toBe(true);
    expect(canSchedulePublish(user(["editor"]), { lane: "care", site: GOCSA })).toBe(false);
  });
});
