# 04 — Roadmap

_Phased and gated. Sequence is deliberate: we do not build before we've decided.
Durations are placeholders until timeline/budget are known (discovery Q E)._

## Phase 0 — Discovery & Foundations · **(in progress)**

Establish the source of truth. No production code.

- [x] Review repository & brand assets
- [x] Documentation structure + charter, brand foundations, risks, roadmap, tech strategy
- [x] **Client answered the ⭐ discovery questions** — D1, D2, D3 + service model resolved
- [ ] Resolve remaining decisions D4 (hosting/domain), D5 (compliance sign-off)
- **Gate → Phase 1 PASSED** (D1 CMS/maintenance resolved). ✅

## Phase 1 — Strategy & Architecture · **(in progress)**

- [x] Proposed information architecture drafted (`07-information-architecture.md`)
- [x] Brand Kit V1 adopted as permanent brand source of truth (`brand/`, `01`)
- [x] **Product Blueprint — master specification** drafted (`08-product-blueprint.md`)
- [x] Product Blueprint **approved** by GOCSA
- [x] **Content Model Specification** — every object as a contract (`09-content-model-specification.md`)
- [x] **Design Token Specification** — WCAG-verified, brand-scoped tokens (`10-design-token-specification.md`)
- [x] **Component Specification Library** — 19 components as build contracts (`11-component-specification-library.md`)
- [ ] GOCSA confirms the real service list (affects values, not model/token/component shape)
- [ ] Resolve D4–D9 (`06`) — hosting/CMS product, founding year, photography
- [x] **CMS Architecture** — collections/globals/blocks/roles/workflow (Payload) (`12-cms-architecture.md`)
- [x] **Database Architecture** — Postgres schema, relationships, indexes, ERD, RGHA tenancy (`13-database-architecture.md`)
- [x] **Authentication Architecture** — roles/permissions, MFA, sessions, audit, SSO-ready (`14-authentication-architecture.md`)
- [x] **API Layer Specification** — REST/GraphQL/Local strategy, endpoints, limits, integrations (`15-api-layer-specification.md`)
- [x] **Page Builder Specification** — 21 brand-locked blocks for non-technical staff (`16-page-builder-specification.md`)
- [x] **Media Library Specification** — assets, responsive images, alt/consent, folders, naming (`17-media-library-specification.md`)
- [x] **SEO Specification** — metadata, schema, hreflang, redirects, CWV, AI-search (`18-seo-specification.md`)
- [x] **Testing & QA Strategy** — measurable gates: a11y/security/perf/CMS/E2E/UAT (`19-testing-strategy.md`)
- [x] **PHASE 1 FORMALLY CLOSED** — specs `00`–`19` ratified as **V1 source of truth** (DEC-019)
- [x] **Engineering Implementation Plan** — Phase 2 delivery roadmap (`20-engineering-implementation-plan.md`)

## Phase 2 — Engineering Implementation · **(in progress)**

- Governed by `20-engineering-implementation-plan.md`: M0 Foundation → M11 Launch, Sprints 0–12.
- [x] Plan approved · **D4 resolved** (DEC-020: domains env-driven, external deployment dependency)
- [x] **Sprint 0 (Foundation) scaffolded** — monorepo (pnpm+Turborepo), `packages/config`, CI skeleton, `.env.example`, Engineering Playbook
- [ ] Team: `pnpm install` → lockfile → CI green (not runnable in authoring env)
- [x] **Sprint 1 — Infrastructure (in progress):** infra-agnostic (DEC-021). Built `packages/env` (typed fail-fast config) + `packages/platform` (Storage/Media/Email/Analytics/Search/Cache/Auth/Deployment provider interfaces + placeholder adapters + registry). Real infra/adapters swapped at deploy.
- [x] Finish S1 core (env+providers built; app-boot wiring lands with `apps/web` in S3).
- [x] **Sprint 2 (Visual Foundation) — COMPLETE ✅ (checkpoint: foundation-ui-v1.0):** `packages/tokens` + `packages/ui` (all primitives; interactive via Radix behind GOCSA API). **119 tests; coverage 99.05/87.94/93.33/99.05% (≥80% gate met); story per primitive; axe passing; Storybook builds; CI gates wired.** Verified green in-environment. R13 CLOSED. Visual regression scaffolded (provider pending, R15/DEC-025). Nothing hardcoded; RGHA re-themes via brand scope.
- [ ] **Sprint 3 — CMS + Database + Auth (COMMENCED):** `packages/cms` (Payload) per docs/09/12/13/14; wires env+providers into `apps/web` boot.
- **No hosting/DNS decision blocks development** — infra is a deployment detail (DEC-020/021).
- Real-world inputs by sprint: real service list (S8) · D5/D6/D7 + content + client DNS (S11–12) — none block current work.

- Information architecture & sitemap (from real services).
- Content model / CMS schema design.
- Finalise brand system: colour tokens, type, spacing, motion principles.
- Accessibility & performance budgets defined as acceptance criteria.
- Confirm technical stack (`05`) and hosting.
- **Gate → design only after IA + content model are approved.**

## Phase 2 — Design System & Key Templates

- Design tokens → component library (the reusable system RGHA inherits).
- Design 3–4 key templates (home, service detail, "how to start", contact), not every page.
- Accessibility built into components, not bolted on.
- **Gate → build only after the key templates are approved.**

## Phase 3 — Build

- Implement design system as coded components.
- CMS integration; content modelled and entered with GOCSA.
- Bilingual wiring if in scope (built in, not retrofitted).
- SEO, analytics, forms with privacy-safe handling.
- **Gate → launch only after QA + accessibility + compliance sign-off.**

## Phase 4 — QA, Compliance & Launch

- WCAG 2.2 AA audit; performance; cross-device/browser; content proofreading (EN + EL).
- Compliance/legal review of care content. Redirects from any old site.
- Launch runbook; analytics verified; rollback plan.

## Phase 5 — Care & Evolution (ongoing)

- Post-launch monitoring, iteration from real usage, documentation kept current.

## Phase 6 (future) — RGHA Retirement Living

- Separate identity, same foundations. Reuses the design system and architecture.

---

**We are here:** early Phase 1. IA proposed and awaiting GOCSA review. Next: confirm
the real service list, then content model / CMS schema and brand system tokens.
D4 (hosting/domain) and D5 (compliance sign-off) must resolve before build.
