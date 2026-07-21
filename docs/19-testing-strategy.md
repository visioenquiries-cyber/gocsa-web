# 19 — Testing & Quality Assurance Strategy

_How we prove the platform is correct, accessible, secure, fast, and trustworthy —
**measurably**. Every guarantee made in `08`–`18` becomes a test with a numeric or
binary pass threshold. Specification only — not built. Traceable throughout._

---

## 0. Principles & quality gates

- **Shift left:** most defects caught by fast automated checks before merge; expensive
  manual testing reserved for what machines can't verify (real screen-reader UX, editor
  usability, content accuracy).
- **Test pyramid:** many **unit** → fewer **integration/component** → fewer **E2E** →
  targeted **manual**. Avoid an inverted, slow, flaky suite.
- **Gates are binary and non-negotiable.** A build that fails a gate cannot merge or release.
- **Everything measurable:** each area below has explicit thresholds. "Looks fine" is
  never a pass criterion.

**Merge/release gates (all must pass):**

| Gate                          | Threshold                                                                                                |
| ----------------------------- | -------------------------------------------------------------------------------------------------------- |
| Unit/integration tests        | 100% pass; coverage ≥ **80%** lines/branches (critical modules), **100%** on access-control + validation |
| Accessibility (axe)           | **0** serious/critical violations on every page/component                                                |
| Lighthouse CI (key templates) | Performance ≥ **90**, Accessibility ≥ **100**, Best-Practices ≥ **95**, SEO ≥ **100**                    |
| Core Web Vitals               | LCP < **2.5s**, INP < **200ms**, CLS < **0.1** (lab + field)                                             |
| Security scans                | **0** high/critical (deps + SAST + DAST)                                                                 |
| E2E critical journeys         | **100%** pass (J1–J8, `08` §3)                                                                           |
| Visual regression             | no unreviewed diffs                                                                                      |
| Type/lint/format              | 0 errors                                                                                                 |

---

## 1. Accessibility testing (WCAG 2.2 AA — the highest priority)

_Measurable target: **WCAG 2.2 AA, 0 known violations** at launch; audience is older/
disabled users._

**Automated (every PR):**

- **axe-core** on every page + component: **0 serious/critical** (gate). Run in unit
  (jsdom), component (Storybook/Playwright), and E2E layers.
- **Lighthouse Accessibility ≥ 100** on the 5 key templates.
- **Contrast** auto-verified against `10` tokens (already guaranteed by design; text-over-image
  cases re-checked — Hero/Gallery/Video).
- **Linting:** eslint-plugin-jsx-a11y, HTML validation.

**Manual (per template + release):**

- **Keyboard-only** pass: every interaction reachable/operable, visible focus, logical
  order, no traps, skip-link works, Esc closes dialogs/menus. _Pass = 100% of the
  keyboard checklist._
- **Screen reader** pass on **VoiceOver (Safari/iOS)** + **NVDA (Firefox/Win)**: headings,
  landmarks, alt, form labels/errors, dynamic announcements, language switching. _Pass =
  each checklist item verified._
- **Zoom/reflow:** usable at **400%** and **320px** width, no loss/overlap/horizontal scroll.
- **Reduced-motion, forced-colors/high-contrast**, and **200% text spacing** verified.
- **WCAG 2.2 AA success-criteria checklist** completed and signed off per key template
  (measurable: N/N criteria pass).
- **Bilingual:** every check performed in **EN and EL**.

**Cadence:** automated every PR; manual per template in Phase 2 and a full audit before launch.

---

## 2. Security testing

_Target: **0 high/critical** findings at release; OWASP-aligned._

- **Dependency scanning** (Dependabot/Snyk) on every PR + daily: 0 high/critical (gate);
  auto-PRs for patches.
- **SAST** (CodeQL/Semgrep): 0 high/critical.
- **DAST** (OWASP ZAP) against staging: 0 high; scheduled + pre-release.
- **Access-control tests (automated):** the full role × site × lane matrix (`14`) — assert
  every forbidden action returns 403 and every allowed action succeeds. **100% of matrix
  cells tested.** This is the highest-value security suite (prevents an Editor publishing
  care content or reading PII).
- **Auth tests:** password policy (length, breach reject), MFA enforcement for privileged
  roles, session expiry/revocation, lockout/rate-limit, CSRF, secure-cookie flags.
- **Input/abuse:** injection (SQLi via ORM params, XSS via RichText sanitisation), file-upload
  validation, form spam/rate-limit, no PII in URLs/logs (`15`/`09`).
- **Headers/config:** HSTS, CSP, secure cookies, no secrets in repo (secret-scanning gate).
- **Penetration test:** independent pen test **before launch**; all high/critical
  remediated + retested (measurable close-out).
- **Privacy:** verify submission encryption, retention purge, consent gates (R9).

---

## 3. Performance testing & 4. Lighthouse

_Targets are the CWV budgets from `18` §12, enforced in CI._

**Lighthouse CI (every PR, on 5 key templates, mobile profile):**

| Category       | Min score |
| -------------- | --------- |
| Performance    | **90**    |
| Accessibility  | **100**   |
| Best Practices | **95**    |
| SEO            | **100**   |

**Core Web Vitals (lab + field/CrUX):** LCP < **2.5s**, INP < **200ms**, CLS < **0.1**,
TBT budgeted, TTFB < **0.8s**.

**Budgets (fail build if exceeded):** total page weight, JS bytes, image bytes, request
count — set per template. Images validated through the responsive/AVIF pipeline (`17`).

**Load / stress (pre-launch, on backend/API):** simulate realistic + peak concurrency;
**p95 API response < 400ms**, error rate < 0.1%, DB within connection budget (`13` §7);
CDN cache-hit ratio measured. Verify graceful degradation + rate-limit behaviour.

**Real-device testing:** a mid-range Android on a throttled (3G/4G) connection — our
actual audience — not just a fast laptop.

---

## 5. CMS testing

_Target: editors can perform every task; guardrails hold. Measurable via scenario pass rate._

- **Content model integrity:** each content type creates/validates per `09` (required
  fields, limits, enums, relationships); referential integrity (delete-blocked-while-referenced)
  asserted.
- **Publishing workflow:** the 3 lanes (`12` §0.4) — Editor cannot publish care content;
  CCM/Retirement Living can; structural is Admin-only. **Every transition tested** incl.
  illegal-transition rejection.
- **Localization:** field-level EN/EL, parity report flags gaps, fallback renders EN with
  correct `lang`, localized slugs route.
- **Versioning:** autosave, restore, draft≠published, retention (care = all versions).
- **Preview:** draft/live preview shows unpublished correctly, per-locale, token-gated.
- **Scheduling:** publish/unpublish jobs fire at the right time (Adelaide TZ); auto-close careers.
- **Media gates:** cannot publish image without alt, person-photo without consent, video
  without captions/transcript (`17`) — assert **rejection**.
- **Page builder:** block allowlists, placement rules (Hero once/top), nesting limits,
  auto heading hierarchy, no colour/HTML escape hatch (`16`).
- **Audit:** security/publish events written (`14` §5).

---

## 6. Frontend testing

- **Unit** (Vitest/Jest): utilities, hooks, formatting, i18n helpers — coverage ≥ 80%.
- **Component** (Storybook + Playwright/Testing Library): every `11` component — variants,
  states, props, keyboard/ARIA, reduced-motion; axe per story (0 violations).
- **Visual regression** (Chromatic/Playwright snapshots): key components + templates in
  light/dark, EN/EL, mobile/desktop; **no unreviewed pixel diffs** (gate).
- **E2E** (Playwright): the 8 journeys (`08` §3) — from Google→enquiry, Greek path,
  staff edit→publish — **100% pass**; run in EN + EL, mobile + desktop.
- **Cross-browser/device matrix** (measurable coverage): Chrome, Safari, Firefox, Edge;
  iOS Safari, Android Chrome; small phone → desktop.

---

## 7. Backend / API testing

- **Unit:** business logic, hooks, validators — coverage ≥ 80%; **access functions 100%**.
- **Integration:** API endpoints (`15`) against a test DB — CRUD, query params (locale,
  pagination caps, depth caps), error formats/status codes.
- **Contract:** REST/GraphQL responses match documented shapes; breaking-change detection.
- **Permission/data-scope:** every endpoint enforces role + `site_id` scope; anonymous
  sees published-only; PII filtered; **cross-tenant access impossible** (`13` §8).
- **Validation:** schema rejection (bad types, missing required, oversized, bad file),
  publish gates rejected at API.
- **Caching/invalidation:** publish triggers correct revalidation; authed/PII responses `no-store`.
- **Migration:** redirect resolver returns correct 301s; no chains/loops.

---

## 8. User Acceptance Testing (UAT)

_Real GOCSA staff + representative users validate fitness for purpose. Measurable via
task-completion + sign-off._

- **Editor UAT:** non-technical GOCSA staff perform real tasks (update SAH price list,
  add a service, publish news, build a page) **unassisted**. _Success metric: task
  completion rate ≥ 95%, time-on-task within target, SUS usability score recorded._
- **Content accuracy UAT:** Community Care Manager verifies every service/funding/policy
  page against reality and **signs off** (compliance gate, R1). _0 unverified care pages
  at launch._
- **Bilingual UAT:** a Greek-speaking reviewer confirms EL quality/parity across the site.
- **Audience UAT:** representative older users / family members attempt the primary
  journey (find a service → how to start → enquire); observed for confusion points.
- **Stakeholder sign-off:** GOCSA approves against the charter success criteria (`00`).

---

## 9. Regression testing

- **Automated regression suite** = the accumulated unit/component/E2E/visual/access/API
  tests; **runs on every PR + nightly**. Any prior-fixed bug gets a test so it can't recur.
- **Visual regression** guards unintended UI drift (esp. after token/component changes —
  critical for the RGHA-shared library).
- **Release regression checklist** (§10) run before every production deploy.
- _Measurable:_ regression suite green (100%) is a release gate; flaky tests quarantined + fixed, not ignored.

---

## 10. QA checklists (measurable, sign-off required)

**Pre-merge (per PR):** tests pass · coverage met · axe 0 · Lighthouse thresholds ·
lint/type clean · visual diffs reviewed · security scans clean · EN+EL rendered.

**Pre-release (per deploy):** full regression green · E2E journeys pass · manual a11y
spot-check · performance budgets met · security scan · migration/redirects verified ·
staging de-indexed (`18`) · content sign-off · backups/rollback ready.

**Launch checklist:** independent **accessibility audit** signed (WCAG 2.2 AA) ·
**pen test** closed out · CWV in field green · redirects live + 404s monitored · sitemap
submitted · GBP/NAP aligned · analytics + Search Console live · **CCM content sign-off** ·
bilingual review complete · rollback plan tested. _Each item is a checkbox with an owner and evidence._

---

## 11. Metrics, coverage & defect management

**Tracked metrics (dashboards):** test pass rate, coverage %, axe violations (target 0),
Lighthouse scores, CWV field data, open vulnerabilities by severity, defect
escape rate, mean-time-to-fix, flaky-test count, UAT task-completion + SUS.

**Coverage targets:** ≥ 80% lines/branches overall; **100%** on access control, validation,
publish gates, i18n fallback.

**Defect severity + SLA:**

| Severity        | Definition                                                       | Resolution                          |
| --------------- | ---------------------------------------------------------------- | ----------------------------------- |
| **P1 Critical** | Security, data loss, site down, care-content error, a11y blocker | **Blocks release**; fix immediately |
| **P2 Major**    | Broken journey/feature, significant a11y issue                   | Fix before release                  |
| **P3 Minor**    | Non-blocking defect                                              | Scheduled                           |
| **P4 Trivial**  | Cosmetic                                                         | Backlog                             |

**Definition of Done (feature):** code + tests (coverage met) + axe 0 + Lighthouse pass +
a11y keyboard/SR check + EN/EL + docs updated + reviewed. **DoD (release):** all gates +
checklists + sign-offs green.

---

## Traceability & Definition of Done (this doc)

Every test maps to a guarantee: a11y → `10`/`11`; security → `14`/`15`; performance/SEO →
`18`; CMS/workflow → `12`; content model → `09`; journeys → `08`; migration → `13`/`18`.
An engineer/QA lead can implement the test suites, CI gates, manual protocols, UAT plan,
and checklists — every criterion numeric or binary, no subjective pass.

## Open items (config, not shape)

- Independent **a11y auditor** + **pen-test** vendor selection (pre-launch).
- Exact load-test concurrency target (from GOCSA's expected traffic) + CI tool choices.
- UAT participant recruitment (staff + representative users).

## Applied results — Sprint 2 (`packages/ui`)

This strategy is now enforced for the primitive library:

- **119 unit + accessibility tests** (Vitest + Testing Library + **jest-axe**), all passing.
- **Coverage:** Statements 99.05% · Branches 87.94% · Functions 93.33% · Lines 99.05%
  (thresholds ≥80% enforced in `vitest.config.ts`; `all: true` so untested files can't hide).
- **Accessibility:** axe clean; keyboard/focus/Esc/restore behaviour tested on overlays,
  tabs, accordion; **Checkbox/Switch/Select accessible-name regressions** locked in.
- **CI gates** live in `.github/workflows/ci.yml` (install/format/lint-0-warn/typecheck/
  test+coverage+axe/Storybook build).
- **Visual regression:** provider-agnostic Playwright foundation (`docs/22`) — baselines +
  provider **pending** (DEC-025/R15); CI job commented so it is not falsely reported active.

## Recommended next step

Testing completes the quality layer. The final pre-code artefact remains the **Phase 2
Engineering Implementation Plan** — which wires these gates into CI/CD and sequences the
build. Quality is enforced automatically from the first commit.
