# @gocsa/cms

CMS schema for the GOCSA platform — **Payload CMS** (DEC-011), implementing the Content
Model Spec (`docs/09`), CMS Architecture (`docs/12`), Database Architecture (`docs/13`),
and Auth (`docs/14`).

## Status: Sprint 3 — in progress (commenced)

**Done:** shared field groups (`seo`, `cta`, `link`, `address`) + the **Media** collection
— the objects everything references. Typed against a local seam (`src/types.ts`) so the
contracts are reviewable now; the seam is swapped for Payload's real types when `payload`

- `apps/web` are added.

## Build order (this sprint)

1. ✅ Shared field groups + Media collection.
2. Remaining collections + globals (Pages, Services, Service Groups, Funding, FAQs,
   Policies, Downloads, Resources, News, Events, Staff, Testimonials, Careers, Forms,
   Redirects, Users; Settings/Navigation/Footer) — per `docs/09`/`docs/12`.
3. Role × site × lane **access functions** (`docs/14`) — server-enforced, test-covered.
4. Localisation (EN/EL), drafts/versions, scheduling, audit log.
5. Payload config wired to `getEnv()` + `createProviders()` (Storage/Email/Search/Cache)
   inside `apps/web`; Postgres adapter + migrations; dev seed data.
