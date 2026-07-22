# Changelog

All notable changes to the GOCSA platform. Newest first.

## [Unreleased] — Sprint 4 (customer homepage preview)

### Added — GOCSA Community Care homepage preview (`apps/web`)

- **Public shell**: root layout with approved Brand Kit V1 fonts (Playfair Display + Inter)
  mapped to tokens, brand scope, skip link, sticky **Header** (desktop nav + accessible
  **mobile Drawer** with Accordion), **Footer**, not-found/error/loading, noindex preview metadata.
- **13 homepage sections** (hero, heritage band, who-we-are, services, independence,
  care-journey timeline, funding, why-choose, testimonials, policies, FAQs, contact) —
  composing `@gocsa/ui` primitives; **all colour from `@gocsa/tokens`** (no literals).
- **Content architecture**: typed `HomepageContentSource` (`LocalHomepageContentSource`
  fixtures now + `PayloadHomepageContentSource` seam) — content fully separated from
  presentation; every fixture carries a `ContentStatus`.
- **Motion**: token-driven fade-and-rise `Reveal` + statistic `CountUp`, reduced-motion-safe.
- **Client review mode** (`NEXT_PUBLIC_REVIEW_MODE`, non-production only) showing content
  status chips; **brand colour scanner** (`pnpm scan:colors`) wired into CI.
- Tailwind wired to the approved token preset; single `@types/react` (19) via pnpm override.
- Docs: **homepage preview handoff (docs/25)** — client inputs, temporary media, presentation flow.

### Verified

color scan ✔ · format ✔ · lint 0 ✔ · typecheck 0 ✔ · 166 unit tests ✔ · Storybook ✔ ·
**`next build` ✔** (homepage compiles with Tailwind + fonts).

### Honesty notes

No fabricated facts presented as confirmed; testimonials are demonstration-only; logo is the
raster lockup pending vector (D6); phone/services marked confirm-with-client. Preview is noindex.

## [Unreleased] — Sprint 3 runtime (apps/web + Payload)

### Added — the real application (`apps/web`)

- **Next 15.4.11 + Payload 3.86.0 + React 19.2.8** (DEC-026 ratified), `@payloadcms/db-postgres`.
- `payload.config.ts` composes `@gocsa/cms` collections/globals via a seam→Payload mapper;
  wires the **tested access policy** into Payload access; reads all config from `@gocsa/env`
  `getEnv()` (no hardcoded secrets/URLs). Localisation en/el, drafts/versions, lexical editor.
- Routes: Payload **admin** + REST + GraphQL, **health**, and a public **`/[locale]`** dev
  shell (tokens + `@gocsa/ui`, CMS query with safe degradation).
- **Seed** (idempotent, env-guarded, demo-only, bilingual, draft + published) + **migrations** dir.
- **Local DB**: `docker-compose.yml` (Postgres 16, volume, healthcheck); root scripts
  `db:up/down/reset/migrate/migrate:create/seed`, `dev`.
- **Integration tests** (`test:integration`, Postgres-backed) — schema, access enforcement, auth.
- **CI**: new `cms-runtime` job with a Postgres service runs generate:types → migrate → seed
  → integration → build. `@gocsa/env` gains `ALLOW_SEED` + `isSeedAllowed`.
- Docs: **local development guide (docs/24)** with exact commands.

### Verified (authoring sandbox, no DB)

typecheck 0 · lint 0 · `payload generate:types` · **`next build` ✓** · 166 unit tests · format.

### Not executed here (R16 — no Docker/Postgres)

migrations, seed, admin login, integration tests — wired to run via docker-compose (docs/24)
and CI's Postgres job. **Sprint 3 is not marked complete until that runtime is observed to pass.**

## [Unreleased] — Sprint 3 (CMS foundation)

### Added — `@gocsa/cms` (framework-agnostic, fully tested)

- **Reusable access-control layer** (`access/`): 8 roles (DEC-027) × 3 lanes × site scope;
  one `can()`/`accessFor()`/`collectionAccess()` policy — no ad-hoc per-collection logic.
- **Publishing workflow state machine** (`workflow/`): draft → in-review → changes-requested
  → approved → published → archived; illegal transitions rejected; scheduled-publish gated to approved.
- **Validation gates** (`validation/`): alt-text, person-consent, link-destination-conflict,
  form-consent. **Localisation** (`i18n/`): EN/EL, visible fallback, parity report.
- **Schema:** shared field groups (seo/cta/link/address), 15 page-builder blocks, foundational +
  representative collections (users, media, service-groups, services, funding-programs, faqs,
  testimonials, downloads, pages) + globals (settings, navigation, footer).
- **47 tests; 100% statements/lines/functions** on access/workflow/validation/i18n. Vitest wired.

### Decisions

- **DEC-026** Payload 3 ⇒ Next 15 + React 19 in `apps/web`; live Postgres required to run
  (app/DB bring-up gated, R16). **DEC-027** role taxonomy reconciled to the 8-role Sprint-3 set.

### Accepted limitations

- Payload runtime, `apps/web`, migrations, and seed require a database not present in the
  authoring sandbox — implemented as the next bounded step, reported honestly (R16).

## [foundation-ui-v1.0] — Sprint 2 complete (Visual Foundation)

The design-token system and the full UI primitive library, verified against the
approved Sprint 2 quality gate.

### Added

- **`@gocsa/tokens`** — complete design-token system: `variables.css` (all token
  categories, brand/theme/print scopes, dark + reduced-motion), `tailwind.ts` preset,
  typed `index.ts` with `contrastPairs`. (DEC-022)
- **`@gocsa/ui`** — UI primitive library, all primitives implemented:
  - Layout: Box, Surface, Container, Stack, Inline, Grid, Divider
  - Typography: Text, Heading, Paragraph, Link
  - Atoms: Icon, Badge, Card, Spinner, Skeleton, VisuallyHidden
  - Actions: Button, IconButton
  - Forms: Input, Textarea, Checkbox, RadioGroup, Switch, Select
  - Data: Progress, Avatar, Chip
  - Media: Image, Video
  - Disclosure/overlays: Tabs, Accordion, Dialog, Drawer, Popover, Tooltip, Toast
  - Interactive primitives wrap **Radix UI behind the GOCSA API** (DEC-023).
- **Testing harness** — Vitest + Testing Library + jest-axe; **119 tests**; coverage
  **99.05% stmts / 87.94% branch / 93.33% funcs / 99.05% lines** (gate ≥80%).
- **Storybook** — a story for every primitive; light/dark + brand globals; a11y addon.
- **Visual regression foundation** — provider-agnostic Playwright workflow (scaffolded;
  baselines + provider PENDING, DEC-025). See `docs/22`.
- **CI** — real gates: install · format:check · lint (0 warnings) · typecheck · tests +
  coverage + axe · Storybook build. Placeholder steps removed.
- Earlier in Phase 2: `@gocsa/config`, `@gocsa/env` (DEC-020), `@gocsa/platform` provider
  adapters (DEC-021), Engineering Playbook, monorepo tooling.

### Fixed (found during verification)

- Accessibility: `<label for>` does not name a `role="checkbox"/"switch"/"combobox"`
  button — added `aria-labelledby` to Checkbox, Switch, and Select (regression tests added).
- JSDoc `*/` prematurely closing a comment in `platform/deployment.ts`.
- Missing deps: `@types/node`, `tailwindcss`, root `@gocsa/config`, `@vitest/coverage-v8`.

### Decisions

DEC-020 (env-driven domains) · DEC-021 (infra-agnostic providers) · DEC-022 (tokens+ui) ·
DEC-023 (Radix behind GOCSA API) · DEC-024 (engine-strict/Node) · DEC-025 (visual-regression
provider pending).

### Notes / accepted limitations

- Visual-regression execution pending baseline generation + provider selection (DEC-025).
- Toolchain requires Node ≥20.19 (CI's latest-20.x satisfies it); `engine-strict=false` (DEC-024).
