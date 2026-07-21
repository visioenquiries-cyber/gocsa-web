# 22 — Visual Regression (Foundation)

_Provider-agnostic visual-regression workflow for `packages/ui`, per the approved
Testing Strategy (`19` §4). Self-hostable; **no paid provider required**. Status:
**scaffolded**; baseline generation + provider selection **PENDING** (DEC-025)._

## Approach

- **Tool:** Playwright's built-in `toHaveScreenshot` (open-source, self-hosted) — not a
  paid SaaS. A hosted option (e.g. Chromatic) can be adopted later without changing stories.
- **Target:** the pre-built static Storybook (`build-storybook`), served locally; the spec
  visits story iframes and screenshots them.
- **Config:** `packages/ui/playwright.config.ts` · **Spec:** `packages/ui/visual/foundation.spec.ts`
  · **Script:** `pnpm --filter @gocsa/ui test:visual`.
- **Baselines:** committed PNGs under `visual/__snapshots__/`, generated **in the CI OS**
  (Linux) so they're deterministic: `pnpm --filter @gocsa/ui test:visual -u`.

## States covered (per the Sprint 2 brief)

Buttons (primary/accent/loading) · form controls (input error, checkboxes, switches) ·
tabs · accordion · cards + loading states · typography — each across **light + dark**
themes and **mobile + desktop** viewports, in the **GOCSA brand** scope (via Storybook
globals in the story URL). Dialogs/Drawers/Popovers are exercised by the interaction
tests + axe; adding their open-state screenshots is a fast follow.

## Why not enforced in CI yet (honest status)

Baselines must first be generated in the CI environment and committed; and the **provider
decision** (self-hosted Playwright vs a hosted service) is **pending** (DEC-025). Until
then the visual job is present in `.github/workflows/ci.yml` but **commented out**, so CI
does not falsely claim a gate that hasn't run. There are **no unreviewed visual diffs**
because there are no baselines yet — this is a recorded, accepted limitation, not a silent gap.

## To activate (bounded next step)

1. Choose the provider (DEC-025).
2. `build-storybook` then `test:visual -u` on a Linux CI runner to create baselines; commit them.
3. Uncomment the `Visual regression` job in CI; it then fails on any unreviewed diff.
