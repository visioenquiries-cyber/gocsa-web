# GOCSA Digital Ecosystem

 
Source of truth for the digital platform of the **Greek Orthodox Community of South Australia (GOCSA)**.

- **Current project:** GOCSA Community Care
- **Future project:** RGHA Retirement Living (will inherit the design system and architecture established here)

## Status

**Phase 1 CLOSED — Specifications `00`–`19` are approved Version 1, the source of
truth. Now in Phase 2: Engineering Implementation**, governed by
`docs/20-engineering-implementation-plan.md`. **Sprint 0 (foundation) is in progress** —
monorepo, tooling, CI, env config, and the [Engineering Playbook](docs/engineering-playbook.md)
are scaffolded. Domains are env-driven and connected only at the production cutover
(DEC-020). No further specifications unless required by implementation.

## Development (Phase 2)

Monorepo: **pnpm workspaces + Turborepo**, Node ≥ 20.11. Standards live in the
[Engineering Playbook](docs/engineering-playbook.md).

```bash
nvm use            # Node 20 (.nvmrc)
pnpm install
cp .env.example .env   # local values — never commit .env (all URLs/domains are env-driven)
pnpm lint && pnpm typecheck && pnpm test && pnpm build
```

Current workspace:

```
package.json · pnpm-workspace.yaml · turbo.json    workspace + task runner
.env.example                                       every URL/domain/secret (DEC-020)
.github/workflows/ci.yml                           CI gates (grow per docs/19, docs/20)
packages/config/                                   shared eslint · prettier · tsconfig · tailwind
packages/env/                                      typed fail-fast config (DEC-020)
packages/platform/                                 provider adapters (DEC-021)
packages/tokens/                                   design tokens: CSS vars · Tailwind · TS (DEC-022)
packages/ui/                                       UI primitive library (docs/21)
apps/…  packages/cms|utils|types                   created per docs/20 §3 build order
```

## How this repository is organised

```
/
├── README.md                     ← you are here
├── brand/                        ← source brand assets (logos, marks)
└── docs/
    ├── 00-project-charter.md     ← who/what/why, scope, principles
    ├── 01-brand-foundations.md   ← verified brand facts + palette (from the mark)
    ├── 02-discovery.md           ← the questions we need answered to proceed
    ├── 03-risk-register.md       ← risks we can already see
    ├── 04-roadmap.md             ← phased plan with decision gates
    ├── 05-technical-strategy.md  ← stack recommendation (options, pending a decision)
    ├── 06-decision-log.md        ← what's decided vs. what's open (ADR style)
    ├── 07-information-architecture.md ← proposed sitemap & service model (Phase 1)
    ├── 08-product-blueprint.md   ← MASTER SPEC: vision→ecosystem, bridges brand & engineering
    ├── 09-content-model-specification.md ← every content object as an implementation-ready contract
    ├── 10-design-token-specification.md ← the visual language as code-ready, WCAG-verified tokens
    ├── 11-component-specification-library.md ← every component as a build-ready contract
    ├── 12-cms-architecture.md    ← complete CMS architecture (Payload) from the content model
    ├── 13-database-architecture.md ← Postgres schema, relationships, indexes, ERD, RGHA tenancy
    ├── 14-authentication-architecture.md ← roles, permissions, MFA, sessions, audit, future SSO
    ├── 15-api-layer-specification.md ← REST/GraphQL/Local strategy, endpoints, limits, integrations
    ├── 16-page-builder-specification.md ← block-based page builder for non-technical staff
    ├── 17-media-library-specification.md ← assets, responsive images, alt/consent, folders, naming
    ├── 18-seo-specification.md   ← metadata, schema, hreflang, redirects, CWV, AI-search readiness
    ├── 19-testing-strategy.md    ← measurable QA: a11y, security, performance, CMS, E2E, gates
    └── 20-engineering-implementation-plan.md ← Phase 2 delivery: milestones, sprints, gates, checklist
```

`brand/gocsa-brand-kit-v1.pdf` is the permanent, versioned **Brand Guidelines V1**
— the brand source of truth for the repository.

## Working principles

1. Document before building. Architect before coding. Validate before deploying.
2. Accessibility is not negotiable and is never traded for aesthetics.
3. Content that changes belongs in a CMS, never hardcoded.
4. Build reusable systems, not one-off pages.
5. Mark assumptions as assumptions. Never present a guess as a fact.

## Audience reality (the north star)

This platform primarily serves elderly people, people with disability, and the
families deciding on their behalf — often stressed, on a phone, sometimes in
Greek. Every decision is judged against: _can this person find what they need,
trust it, and act on it, with nothing in the way?_
