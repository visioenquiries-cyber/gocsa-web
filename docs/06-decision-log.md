# 06 — Decision Log

_Lightweight ADR record. Every significant choice lands here with its rationale,
so any future team member understands not just what we chose, but why._

## Format

`ID · Title · Status (Proposed / Accepted / Superseded) · Decision · Why · Date/Phase`

---

## Decided

### DEC-019 · Phase 1 closed; specs `00`–`19` ratified as V1 source of truth · Accepted (client)

Client formally closed Phase 1. All planning/architecture/product/design-system/platform
specs are **Version 1, approved source of truth**. This **ratifies the previously
"proposed" platform decisions to Accepted**: DEC-011 (Payload), DEC-012 (Postgres),
DEC-014 (API strategy). No further specs unless required by implementation. Entering
**Phase 2: Engineering Implementation** — see `20-engineering-implementation-plan.md`.
Remaining real-world inputs (not spec-blocking): **D4** hosting, **D5** compliance
contact, **D6** vector brand assets, **D7** founding year, real service list, CRM/email,
corporate directory for SSO. _(Phase 1 → 2 boundary)_

### DEC-000 · Documentation-first, no code in Phase 0 · Accepted

Establish charter, brand facts, risks, roadmap, and strategy before any build.
**Why:** the client's core principle; prevents rework and creates a source of
truth any developer can inherit. _(Phase 0)_

### DEC-001 · Gold is an accent colour, never text · Accepted (confirmed by Brand Kit V1)

Heritage Gold `#D4AF37` = 2.01:1 on Warm White → fails as text. Reserve for
accents/dividers/CTAs. Confirmed by the client's own kit and by measured contrast.
**Why:** accessibility; primary audience is older adults. _(Phase 0)_

### DEC-004 · Adopt Brand Guidelines V1 as the permanent brand source of truth · Accepted

Client supplied `brand/gocsa-brand-kit-v1.pdf`: Greek Blue #0D5EAF (primary),
Aegean Sky #5CB8E6, Heritage Gold #D4AF37, Warm White #FAFAF8, Soft Grey #F2F4F7,
Charcoal #24323F; Playfair Display + Inter; Greek-key motif; authentic photography.
Versioned as V1; future revisions increment the version. See `01`. _(Phase 1)_

### DEC-006 · Product Blueprint is the master specification · Accepted (client-approved)

`08-product-blueprint.md` (vision, users, journeys, IA, features, content types,
CMS strategy, design-system mapping, engineering strategy, future ecosystem) is
the document Design and Engineering both follow. **Why:** single bridge between
brand and build; prevents divergence. _(Phase 1)_

### DEC-008 · Content Model Specification is the CMS contract · Accepted

`09-content-model-specification.md` defines 18 content objects with full field-level
contracts, four publishing lanes (A care / B marketing / C structural), the role
matrix, localisation (field-level EN/EL), hard publish gates (alt text, consent,
privacy), and SEO/structured-data rules. CMS schema, components, and migration all
implement it. **Why:** eliminate ambiguity before building. _(Specification Phase)_

### DEC-005 · Greek Blue is the primary action colour · Accepted

Greek Blue #0D5EAF with white text = 6.21:1 (passes). Primary buttons/nav use it.
**Why:** the only palette colour that carries white text accessibly. _(Phase 1)_

### DEC-007 · Gold CTAs use Charcoal text, never white · Accepted

White-on-gold = 2.01:1 (fail); Charcoal-on-gold = 6.23:1 (pass). Any gold button
uses dark text. **Why:** prevent the kit's "accent button" from shipping inaccessible. _(Phase 1)_

### DEC-002 · Bilingual (EN/EL) is a brand fact to design around · Accepted (scope TBD)

The mark is bilingual; i18n is considered from the first component **if** any
Greek is in scope. Exact scope pending discovery Q B. **Why:** retrofitting
translation is costly and error-prone. _(Phase 0)_

---

### D1 · CMS & maintenance model · **Accepted → Option A**

Non-technical GOCSA staff will maintain content. Therefore a friendly, structured
CMS with bilingual fields is required. **Why:** staff independence and longevity.
Exact CMS product still to shortlist in Phase 1. _(client-confirmed)_

### D2 · Bilingual scope · **Accepted → Full EN/EL parity**

Full English + Greek across the site. i18n architected from the first component;
Greek is a first-class language, not a translation afterthought. _(client-confirmed)_

### D3 · Migration · **Accepted → Existing site to be replaced**

Existing site: **gocsacommunitycare.com.au** (parent org: gocsa.org.au). We must
crawl it, migrate approved content, preserve SEO, and set up redirects. _(client-confirmed)_

### DEC-003 · Service model · Accepted

In-home **aged care** modelled on the Yellow Door Care service menu (à la carte,
grouped by purpose) **but excluding disability/NDIS**. Confirmed services from the
existing site: **Support at Home (SAH)** (the post-1 July 2025 program replacing
Home Care Packages), **CHSP** (Commonwealth Home Support), **Seniors/Social
groups**, **My Aged Care referral pathway**, advocacy info. _(client-confirmed)_

---

### DEC-009 · Design Token Specification is the visual contract · Accepted

`10-design-token-specification.md` defines a three-tier, brand-scoped token system
(primitive → semantic → component) covering colour, type, spacing, radius,
elevation, borders, motion, opacity, breakpoints, containers, buttons, forms, cards,
icons, states, focus, dark-mode readiness, and RGHA inheritance. All state/ramp
values were mathematically derived from Brand Kit V1 and **WCAG 2.2 AA-verified**
(e.g. primary hover/active = 7.6:1 / 9.4:1). Components consume semantic tokens only.
**Why:** eliminate visual ambiguity; guarantee accessibility by construction; make
RGHA a one-scope re-theme. _(Specification Phase)_

### DEC-010 · Component Specification Library is the build contract · Accepted

`11-component-specification-library.md` documents 19 components (Hero, Cards,
Timeline, FAQ/Accordion, Split Section, Statistics, Navigation, Mega Menu, Footer,
CTA, Gallery, Video, Forms, Policy Layout, Downloads, Breadcrumbs, Testimonials,
News) — each with purpose, variants, typed props, states, ARIA/keyboard
accessibility, animation + reduced-motion, responsive, the `09` content types and
`10` tokens consumed, usage rules, and testable acceptance criteria. Pages are
composed from these via the `Section` union; token-only styling enforced in CI.
**Why:** implementation-ready, accessible-by-construction, RGHA-reusable. Completes
the Specification Phase (`08`–`11`). _(Specification Phase)_

---

## Open / Proposed — needs the client

### DEC-011 · CMS platform = Payload CMS · **Proposed (needs client sign-off)**

`12-cms-architecture.md` is expressed in Payload's model (Collections/Globals/Blocks).
Recommended because it natively meets every `09` requirement — code-defined schema,
field-level EN/EL localization, drafts + versioning, function-based access (our 4
lanes), editor-friendly admin, media pipeline, live preview — and is **self-hostable
so GOCSA owns the whole stack** (resolves D1→Option A to a product). Concepts port to
Sanity/Strapi if preferred. **Why surfaced not assumed:** honours "no assumptions".
_(Specification Phase)_

### DEC-012 · Database engine = PostgreSQL · **Proposed (needs sign-off)**

`13-database-architecture.md` uses Postgres (Payload Drizzle adapter). Rationale:
reference-heavy model with hard FK integrity (`12` §3), native full-text search
(tsvector/GIN), mature indexing, row-level multi-tenancy for RGHA (`site_id`),
transactional publish/version workflow, read-replica scaling. Binaries in object
storage, not DB. Depends on **D4** (managed vs self-hosted Postgres). Ports to Mongo
but loses FK integrity + FTS. _(Specification Phase)_

### DEC-013 · Authentication architecture + canonical role taxonomy · Accepted (client-directed)

`14-authentication-architecture.md`. Canonical roles: **Super Admin, Marketing,
Community Care, Retirement Living, Editors, Read Only, Volunteers, Future Staff** —
RBAC × site scope (Community Care vs Retirement Living = the `13` tenants).
**Supersedes** the interim 4-role list in `12` §7 (`care-manager`→Community Care,
`admin`→Super Admin). Includes MFA (TOTP/WebAuthn, mandatory for privileged roles +
step-up), NIST-aligned password policy (argon2id, breach check, no forced rotation),
server-side revocable sessions (httpOnly/Secure/SameSite), auth audit stream, and
OIDC/SAML SSO readiness with JIT/SCIM. Deny-by-default, least privilege, separation
of duties (drafting ≠ publishing care content). Governs **staff→CMS** auth; public
visitors don't authenticate this phase. _(Specification Phase)_

New open item: **corporate directory** for future SSO (Microsoft Entra vs Google Workspace).

### DEC-014 · API surface strategy · Accepted

`15-api-layer-specification.md`. **Local API for SSR** (in-process, fastest/most
secure — primary public-site data path), **REST as the primary browser/external API**
(cacheable, easy to rate-limit), **GraphQL available for complex + integration reads**
(introspection off in prod). All surfaces run the same `14` access rules — no bypass.
Covers endpoint catalogue (auto + custom: by-slug, form submit, search, redirects,
preview, revalidate, health, auth), API-level permission enforcement, request/response
conventions (locale/pagination/depth caps/error format/`/api/v1` versioning),
schema-driven validation + hard publish gates, layered event-driven caching (no-store
for authed/PII), tiered rate limiting, CORS/security, and integration seams (outbound
webhooks/CRM/email, service-account API keys, RGHA + AI-search consumers). _(Specification Phase)_

New open item: which CRM/email system enquiries route to.

### DEC-015 · Page builder = structured block system, not free canvas · Accepted

`16-page-builder-specification.md`. Staff assemble pages by choosing brand-locked
blocks from a palette and **drag-to-reorder** — no free pixel canvas, no colour/font/
spacing/raw-HTML controls. **Why:** free-canvas builders let non-technical staff ship
off-brand, inaccessible, mobile-broken pages; a structured builder makes "no developers
needed" and "always on-brand + WCAG AA" both true. 21 blocks documented across Hero/
Content/Layout/Media/CTA/Feature, each mapped to a `11` component + `10` tokens with
placement rules, per-collection allowlists, 2-level max nesting, auto heading
hierarchy, and publish gates (alt/captions/consent). Accessibility + brand guaranteed
by construction. _(Specification Phase)_

### DEC-016 · Media Library architecture · Accepted

`17-media-library-specification.md`. One referenced library (metadata in Postgres,
binaries in object storage + CDN, content-hash delivery). Responsive pipeline (AVIF→
WebP→fallback, named sizes 1x/2x, focal-point art-directed crops, EXIF stripped,
compression targets). Alt text localized + gated; video needs poster+captions+
transcript; docs = accessible tagged PDF, versioned via `supersedes`. **Uploaded media
≠ system assets:** icons + brand marks are code-managed design-system assets (approved
set, not free uploads). Protected `/brand` folder (Admin-only); per-site (`site_id`)
folder tree; kebab-case naming w/ no PII; role-based permissions; consent + usage-
tracking + soft-delete-if-referenced. _(Specification Phase)_

### DEC-017 · SEO architecture · Accepted

`18-seo-specification.md`. Framed as **YMYL/E-E-A-T + local + bilingual**: metadata
(localized, fallback chain, ≤60/155), OG + Twitter cards, auto JSON-LD per type
(Organization/LocalBusiness w/ NAP, Service, FAQPage, NewsArticle, Event,
BreadcrumbList, JobPosting, WebSite+SearchAction), self-canonical + hreflang en/el/
x-default, 301 migration map (no blanket-to-home), auto localized sitemap + robots
(staging de-indexed), breadcrumb schema, E-E-A-T content guidelines, a11y↔SEO overlap,
Core Web Vitals budgets as CI gates (LCP<2.5s/INP<200ms/CLS<0.1), AI-search/GEO
readiness (structured content, entity clarity, editable AI-crawler policy, pgvector).
Accuracy = SEO (reinforces R1). _(Specification Phase)_

### DEC-018 · Testing & QA strategy · Accepted

`19-testing-strategy.md`. Shift-left test pyramid with **binary merge/release gates**:
tests 100% pass + coverage ≥80% (100% on access-control/validation/publish-gates/i18n),
axe 0 serious/critical, Lighthouse (Perf≥90/A11y≥100/BP≥95/SEO≥100 on 5 key templates),
CWV (LCP<2.5s/INP<200ms/CLS<0.1), security 0 high/critical (deps+SAST+DAST+pen test),
E2E journeys J1–J8 100%, visual-regression no unreviewed diffs. Plus manual a11y
(keyboard + VoiceOver/NVDA + 400%/320px, EN+EL), CMS/workflow/permission/localization
tests, UAT (non-technical staff ≥95% task completion + SUS; CCM content sign-off = R1
gate; Greek reviewer), regression suite, defect severity SLA (P1 blocks release), and
pre-merge/pre-release/launch checklists. Everything measurable. _(Specification Phase)_

### DEC-025 · Visual regression = self-hosted Playwright (provider selection pending) · Accepted (foundation)

Provider-agnostic visual regression via Playwright `toHaveScreenshot` against built
Storybook (no paid SaaS required). Scaffolded (`packages/ui/playwright.config.ts`,
`visual/foundation.spec.ts`, `test:visual` script; `docs/22`). **Baselines + final
provider choice** (self-hosted Playwright vs a hosted service e.g. Chromatic) **PENDING**;
the CI visual job stays commented until baselines are generated in-CI, so no gate is
falsely reported active. _(Phase 2, Sprint 2 closeout)_

### DEC-024 · Relax `engine-strict` (Node ≥20.19 tooling vs 20.18 sandbox) · Accepted

Some tooling (typescript-eslint transitive `eslint-visitor-keys`, `@testing-library/jest-dom`)
requires Node ≥20.19/≥22. `.npmrc` sets `engine-strict=false` so installs proceed on
20.18 sandboxes; CI (`setup-node` + `.nvmrc` "20") installs the latest 20.x which
satisfies all constraints. `@testing-library/jest-dom` pinned to `6.5.0` (Node-20-safe).
Re-enable `engine-strict` once all envs are ≥20.19. _(Phase 2, Sprint 2 pass 2)_

### DEC-023 · Radix UI behind the GOCSA component API · Accepted

Interactive primitives (Dialog, Drawer, Popover, Tooltip, Tabs, Accordion, Checkbox,
RadioGroup, Switch, Select, Progress, Avatar, Toast) wrap **Radix UI** for battle-tested
focus-trap/ARIA/keyboard behaviour, exposed through our own typed API + tokens. Radix is
an **implementation detail** — not surfaced in the public component contract; it can be
swapped without changing consumers. **Why:** never hand-roll complex a11y interaction
unsafely (client instruction); own the API, borrow the mechanics. _(Phase 2, Sprint 2 pass 2)_

### DEC-022 · Design token system + primitive library (Sprint 2) · Accepted

`packages/tokens` = single styling source of truth: `variables.css` (all token
categories, brand/theme/print scopes, dark + reduced-motion), `tailwind.ts` (utilities
→ CSS vars), `index.ts` (typed refs + `contrastPairs` for a11y tests). `packages/ui` =
primitive library on tokens (cva + `cn`). Foundational primitives **built** (Box,
Surface, Container, Stack, Inline, Grid, Divider, Text, Heading, Paragraph, Link, Icon,
Button, IconButton, Badge, Card, Spinner, Skeleton, VisuallyHidden); all ~35 primitives
**catalogued** to Storybook contract in `21-ui-primitive-catalogue.md`. Button is the
reference story+test. **Nothing hardcoded; RGHA re-themes via brand scope alone.**
Pass 2 (Storybook/Vitest harness + interactive primitives) queued. _(Phase 2, Sprint 2)_

### DEC-021 · Infrastructure-agnostic via provider adapters · Accepted (client)

The platform must remain **infrastructure-agnostic**: no vendor-specific code. All
external services are accessed through **interfaces/adapters** — `StorageProvider`,
`MediaProvider`, `EmailProvider`, `AnalyticsProvider`, `SearchProvider`, `CacheProvider`,
`AuthenticationProvider`, `DeploymentProvider` — selected via env. Development uses
**placeholder/local adapters**; real adapters (Vercel, Cloudflare, self-hosted, managed
cloud) are swapped **at deployment** with no architectural change. No production
credentials in dev; placeholder env vars. Implemented in `packages/env` (typed, fail-fast
config) + `packages/platform` (provider registry + adapters). **Infrastructure is a
deployment detail, never an implementation dependency.** _(Phase 2, Sprint 1)_

### DEC-020 · D4 resolved — domains are an external deployment dependency, config-driven · Accepted (client)

Client owns both production domains (**gocsacommunitycare.com.au**, future
**www.rgha.com.au**) and manages DNS. **Production domains are NOT connected during
development.** Build proceeds on dev/preview/staging only; DNS/SSL/redirects/email-auth
configured at the **Production** cutover (Sprint 12). **Everything domain-related is
env-driven — no hardcoded URLs anywhere.** The app supports changing domains without
code changes. Configurable via env: domains, CMS URL, API URL, asset/CDN URL, email
domain/inboxes, analytics. Repo must be production-ready before any DNS change.
**Domain ownership = external deployment dependency, not implementation dependency** →
Sprint 1 infra is unblocked. _(Phase 2)_

_D4 hosting-provider choice (managed vs self-host for Postgres/storage) still to confirm
at Sprint 1, but abstracted so it's config, not code._

### D4 · Hosting, domain & ownership · **RESOLVED → see DEC-020**

Confirm GOCSA controls the `gocsacommunitycare.com.au` domain/DNS, current host,
and any IT/security constraints. Needed before Phase 3.

### D5 · Aged-care provider registration & compliance contact · **OPEN**

Confirm registration status (My Aged Care provider) and who at GOCSA signs off
care content for compliance.

### D6 · Official emblem vs. placeholder monogram + vector files · **OPEN**

Confirm we build around the real laurel/Southern Cross emblem (not the kit's "GO"
placeholder), standardise its gold, and obtain **vector SVG/EPS** artwork.

### D7 · Founding year & contact details · **OPEN**

Kit says "since 1936"; emblem says EST. 1930 (Community Care since 1985). Confirm
correct year, and which domain/phone the new site presents (gocsacommunitycare.com.au / 7088 0500).

### D8 · Base body font size · **OPEN (recommend 16–18px)**

Kit specifies 14px body. Recommend raising web body to 16–18px for our older
audience, keeping the type scale. Confirm.

### D9 · Photography · **OPEN**

Kit mandates authentic GOCSA photography (no stock). Confirm an existing photo
library or agree a plan/budget to create one.

---

_Phase 1 (IA + content model) can now begin. D4–D5 must resolve before build/launch._
