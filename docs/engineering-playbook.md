# Engineering Playbook

_The living standards every engineer follows on the GOCSA platform. Read this before
your first PR. Authored in Sprint 0 (`20` §6); updated as the codebase grows. It governs
**how** we build; the specs (`00`–`19`) govern **what** we build and remain the source of truth._

---

## 1. Stack & repo

- **Monorepo:** pnpm workspaces + Turborepo. Node ≥ 20.11 (`.nvmrc`). pnpm is the only package manager.
- **Ratified stack (DEC-011/012/014/019):** Next.js (App Router, SSR/ISR) · Payload CMS
  (Next-native) · PostgreSQL · object storage + CDN. Self-hosted, GOCSA-owned.
- **Layout:**
  ```
  apps/web            Next.js app (front-end + Payload admin)
  packages/config     lint/format/tsconfig/tailwind (this is live)
  packages/tokens     design tokens (docs/10)
  packages/utils      i18n, seo, formatting helpers
  packages/types      generated Payload + shared types
  packages/cms        Payload collections/globals/blocks/access/hooks/fields
  packages/ui         component library (docs/11) on tokens
  ```
- **Dependency direction:** apps depend on packages; **packages never depend on apps**.
  Build order and the dependency graph are fixed in `20` §3–§4 — follow it; don't build a
  page before its blocks/components exist.

## 2. Non-negotiables (enforced in review + CI)

1. **Tokens only.** No raw hex/px for themable properties — use `packages/tokens` /
   Tailwind preset (`10`). Hardcoded design values fail review.
2. **No hardcoded URLs/domains** (DEC-020). Everything comes from the typed env config.
   ESLint flags literals; app packages treat it as an error.
3. **Accessibility is code.** Semantic HTML, correct heading order (one H1),
   `:focus-visible` (never bare `outline:none`), ARIA per `11` patterns, axe in every
   component test. WCAG 2.2 AA is the floor (`10`/`11`/`19`).
4. **i18n by construction.** No hardcoded user-facing strings; every content field is
   EN/EL; never concatenate translated fragments (`09` §0.2).
5. **Access control is the only authority.** Data access goes through Payload access
   functions (`14`); never bypass. Front-end reads via the Local API on the server (`15`).
6. **Security.** No secrets in the repo; validate/sanitize all input; parameterized
   queries; RichText sanitised; **PII never in URLs/logs** (`09`/`15`).
7. **Tests ship with features.** DoD includes tests to the coverage targets (`19`).

## 3. TypeScript & code style

- **`strict` everywhere**; `noUncheckedIndexedAccess` on. No `any` without a written reason.
- **React Server Components by default;** add `"use client"` only when interactivity needs it.
- Prettier + ESLint from `@gocsa/config` are canonical — don't hand-format or override
  locally without team agreement. Run `pnpm format` before pushing.
- Small, focused modules; name things as the surrounding code does; comment the _why_, not the _what_.

## 4. Environment configuration (DEC-020)

- Every domain/URL/credential/integration target is an env var (`.env.example` documents all).
- A typed schema (Sprint 1) validates env **at boot** — missing/invalid vars **fail fast**.
- Production domains (`gocsacommunitycare.com.au`, future `www.rgha.com.au`) are set only
  at the production cutover; dev/preview/staging use platform URLs. Changing a domain is
  **config, never code**.

## 5. Git & reviews

- **Trunk-based:** short-lived branches off `main`; branch names `type/short-desc`
  (`feat/hero-block`, `fix/focus-ring`).
- **Conventional Commits:** `feat:`, `fix:`, `chore:`, `docs:`, `test:`, `refactor:`…
- **PRs:** small and reviewable; green CI required; at least one review; the PR description
  states what/why and links the spec/sprint. No self-merge of unreviewed code.
- **Every fixed bug gets a regression test** so it can't recur (`19` §9).

## 6. Testing (see `19` for the full strategy + thresholds)

- Unit/integration/component with the sprint's coverage targets (≥80%; **100%** on
  access-control, validation, publish gates, i18n fallback).
- Every component: variants/states/keyboard/ARIA + **axe 0 violations** per story.
- E2E (Playwright) for journeys J1–J8, in EN + EL, mobile + desktop.
- Visual regression on components/templates; no unreviewed diffs.

## 7. Quality gates (per PR — from `20` §7 / `19`)

Build · Test (coverage) · Accessibility (axe 0, Lighthouse A11y 100) · Security
(deps/SAST 0 high, access-matrix) · Performance (Lighthouse ≥90, CWV budgets) ·
Documentation (Storybook/docs updated; spec/plan updated if reality diverged). **A red
gate cannot merge.** CI grows these gates sprint by sprint (see `.github/workflows/ci.yml`).

## 8. Definition of Done

**Feature:** code + tests (coverage met) + axe 0 + Lighthouse pass + keyboard/SR check +
EN/EL + docs updated + reviewed + gates green.
**Release:** all gates + the launch checklist (`19` §10 / `20` §10) signed with evidence,
including independent a11y audit, pen test, content sign-off (R1), and rehearsed rollback.

## 9. Getting started (local)

```bash
nvm use                 # Node 20
pnpm install
cp .env.example .env     # fill in local values (never commit .env)
pnpm dev                 # once apps/web exists (Sprint 3+)
pnpm lint && pnpm typecheck && pnpm test && pnpm build
```

### Verifying in a sandbox without pnpm on PATH

Turbo can't find a corepack-shimmed pnpm, so run the per-package scripts directly:

```bash
corepack pnpm@9.12.0 install
corepack pnpm@9.12.0 format:check
corepack pnpm@9.12.0 -r run lint          # each lint script enforces --max-warnings 0
corepack pnpm@9.12.0 -r run typecheck
corepack pnpm@9.12.0 --filter @gocsa/ui exec vitest run --coverage
corepack pnpm@9.12.0 --filter @gocsa/ui run build-storybook
# Visual regression (pending baselines/provider — docs/22):
corepack pnpm@9.12.0 --filter @gocsa/ui test:visual -u   # generate baselines in-CI first
```

CI (`.github/workflows/ci.yml`) runs the same gates with pnpm on PATH.

> This playbook is living. If a rule blocks good work or reality diverges, propose a
> change in a PR — don't silently work around it. The specs stay the source of truth;
> when the build teaches us something, update the spec.
