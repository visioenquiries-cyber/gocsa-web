# Changelog

All notable changes to the GOCSA platform. Newest first.

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
