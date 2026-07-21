# 05 — Technical Strategy

_Status: recommendation with options. The stack is deliberately **not** finalised,
because it depends on Decision D1 (who maintains the site) and hosting/security
constraints we don't yet have. Choosing now would be building before deciding._

## Non-negotiables (true regardless of stack)

- **Accessibility:** WCAG 2.2 AA minimum, semantic HTML, keyboard + screen-reader tested.
- **Performance:** fast on a mid-range phone / slow connection. Core Web Vitals budget set in Phase 1.
- **Content in a CMS:** editable content is never hardcoded.
- **Reusable design system:** tokens → components, versioned, documented, inheritable by RGHA.
- **SEO & analytics:** server-rendered HTML, clean semantic markup, privacy-respecting analytics.
- **Security & privacy:** HTTPS, no personal/health data in URLs or logs, Australian Privacy Principles, dependency hygiene.
- **Maintainability:** any competent developer can onboard from `docs/`.

## The decision that drives the stack — D1: who maintains content?

**Option A — Non-technical GOCSA staff maintain it (most likely, recommended default).**

- A modern component-based frontend framework with server rendering + a
  friendly **headless or structured CMS** giving editors a safe, WYSIWYG-ish
  experience with bilingual fields.
- Pro: staff independence, longevity, clean content model, scales to RGHA.
- Con: more upfront setup and a hosting/CMS cost.

**Option B — Developers/agency maintain it; content changes rarely.**

- A leaner setup (e.g. structured content in the repo or a lightweight CMS),
  less moving infrastructure.
- Pro: cheaper/simpler to run. Con: staff can't self-serve; agency dependency.

> Recommendation: **Option A**, unless GOCSA confirms a developer will always be
> on hand. For a community organisation, staff independence usually wins over five years.

## Deliberately deferred until D1 + hosting are known

Exact framework, exact CMS product, hosting provider, and i18n library. I will
bring a shortlist with trade-offs and cost implications in Phase 1 — not a
pre-committed choice made in a vacuum. Once chosen, each becomes an entry in
`06-decision-log.md` with its rationale.

## Cross-cutting standards (to formalise in Phase 1)

Design tokens as the single source of styling truth · component library with
docs · content model documented before build · CI checks for accessibility &
performance · everything in version control · GOCSA owns all accounts, domains, and repos.
