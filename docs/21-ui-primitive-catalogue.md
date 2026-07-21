# 21 — UI Primitive Catalogue (Storybook-ready)

_The catalogue of the primitive library (`packages/ui`) built on design tokens
(`packages/tokens`, docs/10). Primitives only — no page components/layouts. Each entry
is the Storybook contract: Documentation · Usage · Variants · States · Accessibility ·
Motion · Examples · Acceptance Criteria · Testing. Status: **Built** = implemented this
Sprint-2 pass; **Specified** = documented here, implemented in Sprint-2 pass 2 on the
same pattern (Button is the reference for story + test)._

> **Standing contract (every primitive):** token-driven (no literal colours/magic
> numbers), theme-aware (light/dark/print via tokens), accessible (WCAG 2.2 AA,
> keyboard + SR), responsive, reduced-motion-safe, documented (story), tested
> (unit + axe), reusable, and **RGHA-ready** (re-themes via brand scope, no code change).
> **Global acceptance:** axe 0 serious/critical · keyboard operable · visible focus ·
> only semantic tokens · works EN/EL · reflow 320px/400%. **Global testing:** unit +
> component (Testing Library) + axe per story + visual regression.

---

## Layout & structure

### Box — **Built**

- **Docs:** unstyled layout atom (a `div` passthrough) for composition.
- **Usage:** `<Box className="…">`. Prefer Stack/Inline/Grid for spacing.
- **Variants/States:** none. **Motion:** none.
- **A11y:** neutral; adds no semantics.
- **Acceptance:** forwards ref + props; no styling of its own. **Testing:** render/ref.

### Surface — **Built**

- **Docs:** themed background + border + radius + elevation + padding.
- **Variants:** `bg` page/surface/raised/primary · `border` none/hair/base · `radius` · `elevation` 0–4 · `padding` none/sm/md/lg.
- **States:** static. **Motion:** none (elevation is static).
- **A11y:** `primary` bg pairs with `on-primary` text automatically; contrast guaranteed by tokens.
- **Acceptance:** every visual value is a token; primary bg never renders low-contrast text. **Testing:** variant snapshots + axe.

### Container — **Built**

- **Docs:** centered max-width wrapper with responsive page gutters.
- **Variants:** `size` prose/narrow/base/wide/full.
- **A11y:** `prose` caps reading measure (~68ch). **Motion:** none.
- **Acceptance:** widths/gutters from tokens; no horizontal overflow at 320px. **Testing:** reflow + size snapshots.

### Stack / Inline — **Built**

- **Docs:** vertical (`Stack`) / horizontal wrapping (`Inline`) fl ow with token `gap`, `align`, `justify`.
- **Variants:** `gap` (token scale) · `align` · `justify` · Inline `wrap`.
- **A11y:** layout only; DOM = reading order. **Motion:** none.
- **Acceptance:** gap uses static token classes (no arbitrary values); stacks cleanly on mobile. **Testing:** layout snapshots.

### Grid — **Built**

- **Docs:** responsive column grid (1–4 cols → auto-stacking).
- **Variants:** `cols` 1–4 · `gap`.
- **A11y:** source order preserved. **Motion:** none.
- **Acceptance:** columns collapse to 1 on small screens. **Testing:** responsive snapshots.

### Divider — **Built**

- **Docs:** horizontal (`hr`) or vertical separator.
- **Variants:** `orientation`. **States/Motion:** none.
- **A11y:** decorative rule; vertical uses `role="separator"` + `aria-orientation`.
- **Acceptance:** never the sole carrier of meaning; colour = `divider` token. **Testing:** role/orientation.

---

## Typography

### Text — **Built**

- **Docs:** polymorphic inline/body text (`as` span/p/label/…).
- **Variants:** `size` xs–2xl · `weight` · `tone` default/muted/primary/success/warning/error/onPrimary · `align`. **Gold is intentionally not a text tone** (contrast).
- **States:** inherits. **Motion:** none.
- **A11y:** tones are all contrast-verified; `as="label"` supports `htmlFor`.
- **Acceptance:** no gold/aegean text tone offered; sizes from token scale. **Testing:** tone contrast + polymorphism.

### Heading — **Built**

- **Docs:** semantic `h1`–`h6` in display type; visual `size` independent of level.
- **Variants:** `level` 1–6 · optional `size`.
- **A11y:** level drives the tag → correct outline; page keeps one H1 (enforced by builder, docs/16). **Motion:** none.
- **Acceptance:** level and visual size decoupled but both token-driven. **Testing:** renders correct tag; heading-order lint.

### Paragraph — **Built**

- **Docs:** body copy at readable measure/line-height.
- **Variants:** `measure` (prose cap on/off). **A11y:** line-height 1.6 (token). **Motion:** none.
- **Acceptance:** default measure ≤ ~68ch. **Testing:** snapshot.

### Link — **Built**

- **Docs:** accessible anchor; underlined by default.
- **Variants:** `variant` default/subtle/inverse · `external`.
- **States:** hover, **focus-visible ring (3px)**, visited (inherits).
- **A11y:** meaningful text expected; `external` adds `rel="noopener noreferrer"` + SR "(opens in a new tab)"; underline not colour-only.
- **Motion:** colour transition `fast`/`standard`.
- **Acceptance:** external links safe + announced; focus ring visible. **Testing:** external attrs + axe + keyboard.

---

## Actions

### Button — **Built** (reference for story + test)

- **Docs:** primary action control.
- **Variants:** `variant` primary/accent/secondary/ghost · `size` sm/md/lg · `fullWidth`.
- **States:** default, hover, active, **focus-visible (3px ring + offset)**, disabled (opacity + no pointer), **loading** (spinner + `aria-busy` + disabled).
- **A11y:** real `<button>`; ≥44px target (md); **accent uses Charcoal text (DEC-007)** — never white on gold; loading sets `aria-busy`.
- **Motion:** background/colour transition `fast` `ease-standard`; spinner respects reduced-motion context.
- **Examples:** `<Button variant="primary">Get started</Button>` · `<Button variant="accent">Call us</Button>`.
- **Acceptance:** all four variants meet contrast; disabled not focusable-activatable; loading announced. **Testing:** click, disabled+busy, axe (implemented in `Button.test.tsx`).

### IconButton — **Built**

- **Docs:** square, icon-only control.
- **Variants:** `variant` primary/ghost/secondary · `size`.
- **States:** as Button.
- **A11y:** **`aria-label` is a required prop** (TS-enforced) — no unlabelled icon buttons; ≥44px.
- **Motion:** as Button. **Acceptance:** cannot compile without a label. **Testing:** label presence + axe.

---

## Content & media

### Icon — **Built**

- **Docs:** sizes/labels an inline SVG (2px stroke, `currentColor`).
- **Variants:** `size` sm/md/lg/xl. **States:** inherits colour.
- **A11y:** `label` → `role="img"` + name; no label → `aria-hidden`.
- **Motion:** none. **Acceptance:** decorative icons hidden; informational icons named. **Testing:** aria wiring.

### Badge — **Built**

- **Docs:** small status/label pill.
- **Variants:** `tone` neutral/primary/success/warning/error/info (dark text on light tint).
- **A11y:** colour + text (never colour alone). **Motion:** none.
- **Acceptance:** every tone contrast-safe. **Testing:** tone contrast.

### Card — **Built**

- **Docs:** raised, padded content surface (preset over Surface).
- **Variants:** inherits Surface + `interactive` (hover/focus-within elevation).
- **States:** rest, hover/focus-within (interactive).
- **A11y:** interactive cards wrap **one** real link as the accessible name (docs/11 §2) — enforced by usage, not nesting interactives.
- **Motion:** shadow transition `fast`. **Acceptance:** no nested interactives. **Testing:** interactive snapshot + axe.

### Chip — **Specified**

- **Docs:** compact, optionally removable/selectable tag.
- **Variants:** tone · `removable` · `selected`. **States:** default/selected/focus/disabled.
- **A11y:** removable chip has a labelled remove button; selectable uses `aria-pressed`.
- **Motion:** `fast` selection. **Acceptance:** remove control labelled + keyboard. **Testing:** select/remove + axe.

### Avatar — **Specified**

- **Docs:** user/person image with initials fallback.
- **Variants:** `size` · shape circle/square. **States:** loaded/fallback.
- **A11y:** `alt` = person name, or `aria-hidden` when decorative beside a name.
- **Motion:** none. **Acceptance:** fallback never shows a broken image. **Testing:** fallback + alt.

### Image — **Specified**

- **Docs:** responsive image (AVIF/WebP, srcset, focal-point) via MediaProvider (docs/17).
- **Variants:** `ratio` square/4-3/3-2/16-9 · `fit`. **States:** loading (skeleton)/loaded/error.
- **A11y:** **alt required** (or `decorative`); width/height set (no CLS).
- **Motion:** optional fade-in (reduced-motion off). **Acceptance:** alt gate; no layout shift. **Testing:** alt required + lazy attrs.

### Video — **Specified**

- **Docs:** captioned video (hosted/embed).
- **Variants:** hosted/embed · background. **States:** poster/playing/paused/error.
- **A11y:** **captions + transcript required**; no sound-autoplay; background muted + reduced-motion pause; ≥44px controls.
- **Motion:** controlled by user. **Acceptance:** captions/transcript enforced. **Testing:** required tracks + keyboard.

---

## Forms

### Input / Textarea — **Specified**

- **Docs:** text field / multiline field.
- **Variants:** `size` · invalid. **States:** default/focus/filled/invalid/disabled/readonly.
- **A11y:** always a visible associated `<label>` (never placeholder-as-label); errors via `aria-describedby` + `aria-invalid`; ≥44px; `border` token ≥3:1.
- **Motion:** `fast` focus/error. **Acceptance:** label required; error announced. **Testing:** label assoc + invalid wiring + axe.

### Select — **Specified**

- **Docs:** accessible select (native-first; custom listbox where needed).
- **States:** default/open/focus/disabled/invalid.
- **A11y:** labelled; keyboard (Up/Down/Home/End/type-ahead); custom uses `role="listbox"`/`option` + `aria-activedescendant`.
- **Motion:** menu `fast`; reduced-motion instant. **Acceptance:** full keyboard + SR. **Testing:** keyboard nav + axe.

### Checkbox / Radio — **Specified**

- **Docs:** boolean / single-choice controls.
- **States:** unchecked/checked/indeterminate(cb)/focus/disabled/invalid.
- **A11y:** real inputs + labels; radios share a `name`/fieldset with legend; ≥44px hit area; state not colour-only (check/dot mark).
- **Motion:** `fast` check. **Acceptance:** keyboard + grouped semantics. **Testing:** toggle + group + axe.

### Switch — **Specified**

- **Docs:** on/off toggle.
- **States:** on/off/focus/disabled.
- **A11y:** `role="switch"` + `aria-checked`; labelled; Space/Enter toggles; state has a non-colour cue (knob position).
- **Motion:** knob slide `fast` (reduced-motion instant). **Acceptance:** SR announces on/off. **Testing:** toggle + axe.

### Progress — **Specified**

- **Docs:** determinate/indeterminate progress.
- **Variants:** linear/circular · determinate/indeterminate.
- **A11y:** `role="progressbar"` + `aria-valuenow/min/max` (or busy for indeterminate).
- **Motion:** animates; reduced-motion simplifies. **Acceptance:** value exposed to SR. **Testing:** aria values.

---

## Overlays & disclosure

### Tabs — **Specified**

- **Docs:** tabbed panels.
- **States:** selected/focus/disabled tab.
- **A11y:** `role="tablist"/"tab"/"tabpanel"`, `aria-selected`, arrow-key roving tabindex, panel labelled by tab.
- **Motion:** panel fade `fast`; reduced-motion instant. **Acceptance:** full APG tabs pattern. **Testing:** keyboard + roles + axe.

### Accordion — **Specified**

- **Docs:** collapsible sections (single/multiple).
- **States:** collapsed/expanded/focus/disabled.
- **A11y:** header `<button>` in a heading + `aria-expanded`/`aria-controls`; panel region; keyboard (Enter/Space, Up/Down/Home/End).
- **Motion:** height/opacity `base`; **reduced-motion → instant**. **Acceptance:** APG accordion pattern; no critical info hidden by default. **Testing:** expand + keyboard + axe. _(FAQ composes this, docs/11 §4.)_

### Dialog — **Specified**

- **Docs:** modal dialog.
- **States:** open/closed.
- **A11y:** `role="dialog"` + `aria-modal`, labelled; **focus trap**, Esc closes, focus returns to trigger, background inert; scroll lock.
- **Motion:** overlay/content fade+rise `base`; reduced-motion fade only. **Acceptance:** APG dialog; no focus escape. **Testing:** trap/restore/Esc + axe.

### Drawer — **Specified**

- **Docs:** edge-anchored panel (e.g. mobile nav).
- **A11y:** dialog semantics + focus trap + Esc + restore (as Dialog); `z-drawer`.
- **Motion:** slide `base`; reduced-motion instant. **Acceptance:** as Dialog. **Testing:** trap + keyboard + axe.

### Popover — **Specified**

- **Docs:** anchored, interactive floating panel.
- **States:** open/closed.
- **A11y:** trigger `aria-expanded`/`aria-controls`; focus moves in; Esc closes → focus restored; dismiss on outside click; positioned + collision-aware.
- **Motion:** `fast`; reduced-motion instant. **Acceptance:** keyboard open/close/restore. **Testing:** keyboard + axe.

### Tooltip — **Specified**

- **Docs:** brief text on hover/focus.
- **A11y:** `role="tooltip"` + `aria-describedby`; **shows on focus and hover** (not hover-only); Esc dismiss; never contains interactive content or essential-only info.
- **Motion:** `fast` fade + small delay; reduced-motion instant. **Acceptance:** keyboard-reachable. **Testing:** focus-trigger + axe.

### Toast — **Specified**

- **Docs:** transient status notification.
- **Variants:** info/success/warning/error.
- **A11y:** `role="status"` (polite) / `role="alert"` (assertive for errors); not auto-dismiss-only for important messages; dismissible; `z-toast`.
- **Motion:** slide/fade `base`; reduced-motion fade. **Acceptance:** announced; keyboard-dismissible. **Testing:** live-region + axe.

---

## Feedback

### Spinner — **Built**

- **Docs:** indeterminate loading indicator.
- **Variants:** `size` sm/md/lg · optional `label`.
- **A11y:** `label` → `role="status"` + SR text; unlabelled inside an `aria-busy` control (e.g. Button).
- **Motion:** `animate-spin` (essential feedback). **Acceptance:** standalone spinner is announced. **Testing:** role/label.

### Skeleton — **Built**

- **Docs:** content placeholder.
- **Variants:** `width`/`height`/`radius`.
- **A11y:** `aria-hidden` (decorative); real loading announced elsewhere.
- **Motion:** `animate-pulse`; **`motion-reduce:animate-none`**. **Acceptance:** hidden from SR; stops under reduced-motion. **Testing:** hidden + reduced-motion.

### VisuallyHidden — **Built**

- **Docs:** SR-only text (skip-links, icon labels).
- **A11y:** present in a11y tree, visually hidden; becomes visible on focus when used for skip-links. **Motion:** none.
- **Acceptance:** not visible but announced. **Testing:** presence in SR tree.

---

## Sprint 2 Pass 2 — status: interactive primitives IMPLEMENTED

**All primitives above are now BUILT** (the "Specified" labels are superseded).
Complex interaction behaviour (focus trap, ARIA, keyboard) is provided by **Radix UI
behind the GOCSA API** (DEC-023) — Radix is an implementation detail, not part of our
public surface. Files: `form.tsx` (Input, Textarea), `choice.tsx` (Checkbox, RadioGroup,
Switch), `Select.tsx`, `data-display.tsx` (Progress, Avatar, Chip), `media.tsx` (Image,
Video), `overlays.tsx` (Dialog, Drawer), `Popover.tsx`, `Tooltip.tsx`, `Tabs.tsx`,
`Accordion.tsx`, `Toast.tsx`. Harness in place: **Vitest + Testing Library + jest-axe**
(`vitest.config.ts`, `vitest.setup.ts`) and **Storybook** with light/dark + brand globals
and the a11y addon (`.storybook/`).

### Verification actually executed (this environment, Node 20.18, pnpm 9.12)

| Check                                                                   | Result                  |
| ----------------------------------------------------------------------- | ----------------------- |
| `pnpm install` (+ lockfile generated)                                   | ✅ pass                 |
| `tsc --noEmit` (all 5 packages)                                         | ✅ pass                 |
| `vitest run` (Button, Checkbox/Switch/Radio, Dialog) incl. **jest-axe** | ✅ 11/11 pass           |
| `eslint` (all packages)                                                 | ✅ 0 errors, 0 warnings |
| `prettier --check`                                                      | ✅ pass                 |
| `storybook build`                                                       | ✅ pass                 |

Bugs found + fixed during verification: JSDoc `*/` prematurely closing a comment
(`deployment.ts`); missing `@types/node`/`tailwindcss`/root `@gocsa/config` deps; a real
a11y defect — `<label for>` doesn't name a `role="checkbox"` button (fixed with
`aria-labelledby` on Checkbox + Switch).

### Sprint 2 closeout — final verified results

- **Tests:** 16 files, **119 tests, all passing** — behaviour + keyboard + focus + axe.
- **Coverage (packages/ui):** **Statements 99.05% · Branches 87.94% · Functions 93.33%
  · Lines 99.05%** — all exceed the ≥80% gate (utils 100%).
- **Accessibility:** axe clean across primitive tests; explicit **Checkbox/Switch/Select
  accessible-name regression tests** locked in.
- **Stories:** every primitive has a Storybook story; **Storybook builds successfully**;
  light/dark + brand via global toolbar; a11y addon enabled.
- **CI:** real gates wired (install/format/lint-0-warnings/typecheck/test+coverage+axe/
  Storybook build); placeholders removed.
- **Visual regression:** foundation scaffolded (`docs/22`, DEC-025); provider + baselines
  PENDING (R15); CI job commented so it isn't falsely reported active; **no unreviewed diffs**.

**Sprint 2 status: COMPLETE ✅** — checkpoint `foundation-ui-v1.0`. R13 closed.

## Definition of Done (Sprint 2)

Token system complete (`packages/tokens`: CSS vars + Tailwind theme + TS + brand/theme/
print scopes). **All primitives implemented** (foundational + interactive via Radix behind
the GOCSA API), token-driven, accessible, theme-aware; catalogued to Storybook contract.
Toolchain green (typecheck/lint/format/tests+axe/storybook build). No page components/
layouts. RGHA re-themes by brand scope alone. **Remaining for full closeout:** complete
per-primitive test/story coverage to the ≥80% gate and wire the a11y/visual gates into CI.
