# 10 — Design Token Specification

_The visual contract. Turns every Brand Kit V1 decision into named, code-ready
tokens. Design and Engineering both implement these; components (Phase 2) consume
tokens only — never raw values. Brand-scoped so **RGHA** inherits by swapping one
layer. Every value derived from `01-brand-foundations.md` and **verified against
WCAG 2.2 AA**._

> **No component is designed here.** This is the language, not the sentences.

---

## 0. Token architecture

### 0.1 Three tiers (never skip a tier)

1. **Primitive tokens** — raw, brand-owned values (`--color-blue-600`,
   `--space-4`). The only place literal values live. **Swapped per brand.**
2. **Semantic tokens** — role aliases pointing at primitives
   (`--color-primary` → `--color-blue-600`). Components use these. **Stable across brands.**
3. **Component tokens** — component-scoped aliases pointing at semantic tokens
   (`--button-primary-bg` → `--color-primary`). Optional convenience layer.

**Rule:** components reference tiers 2–3 only. Changing a brand touches tier 1
(and its semantic mapping) — components never change. This is what makes RGHA cheap (§19).

### 0.2 Naming convention

`--{category}-{role}-{variant}-{state}` — lowercase, kebab-case.
Examples: `--color-primary-hover`, `--space-6`, `--text-lg`, `--radius-card`,
`--shadow-2`, `--motion-duration-base`. Platform-agnostic: compiles to CSS custom
properties, JS/TS objects, Tailwind config, or iOS/Android resources.

### 0.3 Brand scoping

Primitives + the semantic mapping live under a brand scope so multiple brands
coexist in one system:

```css
:root[data-brand="gocsa"] {
  /* primitives + semantic mapping — this doc */
}
:root[data-brand="rgha"] {
  /* RGHA's primitives + same semantic keys (§19) */
}
```

### 0.4 Token attributes

Every token below is documented with **Name · Value · Purpose/Usage ·
Accessibility**. Verified contrast ratios are stated where relevant (target: text
4.5:1 normal / 3:1 large; non-text UI 3:1).

---

## 1. Colours

### 1.1 Primitive ramps (tier 1)

**Greek Blue** (brand primary family):

| Name               | Value     | Purpose / Usage                          | Accessibility                |
| ------------------ | --------- | ---------------------------------------- | ---------------------------- |
| `--color-blue-800` | `#083D72` | Darkest — pressed on light, text on tint | 10.5:1 on Warm White ✅ text |
| `--color-blue-700` | `#0A4B8C` | Active/pressed primary                   | 8.4:1 ✅; white text ✅      |
| `--color-blue-600` | `#0D5EAF` | **Primary** (Brand Kit Greek Blue)       | 6.2:1 ✅ text; white-on ✅   |
| `--color-blue-500` | `#397BBD` | Lighter accents, large text only         | 4.24:1 — large text/UI only  |
| `--color-blue-100` | `#D3E2F1` | Subtle fills, selected backgrounds       | decorative; dark text on top |
| `--color-blue-50`  | `#ECF2F9` | Faint tint / hover surface               | decorative only              |

**Aegean Sky** (secondary): `--color-aegean-400 #5CB8E6` — fills, tags, hover
surfaces. _A11y: 2.13:1 on white → **never text on white**; text placed on it must
be Charcoal (5.9:1)._

**Heritage Gold** (accent): `--color-gold-400 #D4AF37` — CTAs, key numbers,
dividers, the Greek-key motif. _A11y: 2.01:1 on white → **never a text colour**;
text/icons on gold must be Charcoal (6.23:1), never white (2.01:1 — DEC-007)._

**Neutrals** (Charcoal→Warm White):

| Name                  | Value     | Usage                                        | A11y on Warm White                      |
| --------------------- | --------- | -------------------------------------------- | --------------------------------------- |
| `--color-neutral-900` | `#24323F` | Body text, dark sections (Charcoal)          | 12.5:1 ✅                               |
| `--color-neutral-700` | `#5A646D` | Secondary text, helper/caption, placeholders | 5.78:1 ✅ text                          |
| `--color-neutral-500` | `#848C92` | **Functional borders** (inputs), icons-muted | 3.27:1 ✅ (meets 3:1 UI)                |
| `--color-neutral-300` | `#C4C8CA` | Decorative dividers only                     | 1.61:1 — **not** for functional borders |
| `--color-neutral-200` | `#DCDEDE` | Hairlines on grey surfaces                   | decorative                              |
| `--color-neutral-100` | `#EDEEED` | —                                            | decorative                              |
| `--color-warm-white`  | `#FAFAF8` | Page background (Brand Kit)                  | base                                    |
| `--color-soft-grey`   | `#F2F4F7` | Section/card surface (Brand Kit)             | base                                    |
| `--color-white`       | `#FFFFFF` | Pure white where needed                      | base                                    |

**Feedback** (all text-safe on Warm White):

| Name                    | Value          | Usage                                                 | A11y                             |
| ----------------------- | -------------- | ----------------------------------------------------- | -------------------------------- |
| `--color-success-600`   | `#1E7A46`      | Success text/icon                                     | 5.1:1 ✅                         |
| `--color-warning-700`   | `#8A5A00`      | Warning text/icon (dark amber — gold can't hold text) | 5.7:1 ✅                         |
| `--color-error-600`     | `#B3261E`      | Error text/icon/border                                | 6.3:1 ✅                         |
| `--color-info-600`      | `#0D5EAF`      | Info (= primary)                                      | 6.2:1 ✅                         |
| plus `-50` tint of each | e.g. `#E9F3ED` | soft message backgrounds                              | pair with the `-600`/`-700` text |

### 1.2 Semantic colour tokens (tier 2 — components use these)

| Name                      | → maps to           | Purpose                          | A11y rule                         |
| ------------------------- | ------------------- | -------------------------------- | --------------------------------- |
| `--color-bg`              | `warm-white`        | Page background                  | —                                 |
| `--color-surface`         | `soft-grey`         | Cards, sections                  | —                                 |
| `--color-surface-raised`  | `white`             | Elevated cards, menus            | —                                 |
| `--color-text`            | `neutral-900`       | Primary text                     | 12.5:1                            |
| `--color-text-muted`      | `neutral-700`       | Secondary/helper text            | 5.78:1                            |
| `--color-text-on-primary` | `white`             | Text on Greek Blue               | 6.2:1 ✅                          |
| `--color-text-on-accent`  | `neutral-900`       | **Text on gold — Charcoal only** | 6.23:1 ✅                         |
| `--color-primary`         | `blue-600`          | Primary actions, links, nav      | 6.2:1                             |
| `--color-primary-hover`   | `blue-700`          | Primary hover                    | 8.4:1                             |
| `--color-primary-active`  | `blue-800`          | Primary pressed                  | 10.5:1                            |
| `--color-secondary`       | `aegean-400`        | Fills, tags, hover surfaces      | dark text only                    |
| `--color-accent`          | `gold-400`          | Accent/CTA emphasis, dividers    | dark text only                    |
| `--color-link`            | `blue-600`          | Inline links                     | 6.2:1; underline required (§17)   |
| `--color-border`          | `neutral-500`       | Functional borders (inputs)      | 3.27:1 ≥3:1                       |
| `--color-divider`         | `neutral-300`       | Decorative separators            | non-functional                    |
| `--color-focus`           | `blue-600`          | Focus ring                       | 6.2:1 (≥3:1)                      |
| `--color-scrim`           | `neutral-900 @ 56%` | Image/text overlays, modals      | ensures text contrast over photos |

---

## 2. Typography

### 2.1 Families (tier 1)

| Name             | Value                                | Usage                         | A11y                                             |
| ---------------- | ------------------------------------ | ----------------------------- | ------------------------------------------------ |
| `--font-display` | `"Playfair Display", Georgia, serif` | Headings, editorial (600–700) | Greek subset required (D2); verify glyph quality |
| `--font-body`    | `"Inter", system-ui, sans-serif`     | Body & UI (400–600)           | Greek subset; high legibility for older eyes     |

### 2.2 Weights

`--font-weight-regular 400` · `--font-weight-medium 500` · `--font-weight-semibold 600` · `--font-weight-bold 700`.

### 2.3 Size scale (root = 16px; base raised to 17px per **D8** for older readers)

| Name             | Value (rem/px)     | Purpose                                | A11y                             |
| ---------------- | ------------------ | -------------------------------------- | -------------------------------- |
| `--text-xs`      | `0.75rem` / 12px   | Legal, metadata — **absolute minimum** | never for body; ≥12px floor      |
| `--text-sm`      | `0.875rem` / 14px  | Captions, dense UI, labels             | fine for UI, not primary reading |
| `--text-base`    | `1.0625rem` / 17px | **Body copy**                          | comfortable default for audience |
| `--text-md`      | `1.1875rem` / 19px | Lead paragraphs, intros                | —                                |
| `--text-lg`      | `1.5rem` / 24px    | H3                                     | large-text threshold             |
| `--text-xl`      | `2rem` / 32px      | H2                                     | —                                |
| `--text-2xl`     | `2.5rem` / 40px    | H1                                     | —                                |
| `--text-display` | `3.25rem` / 52px   | Hero display                           | fluid-clamp on mobile (§9)       |

### 2.4 Line height & tracking

`--leading-tight 1.15` (display) · `--leading-heading 1.25` · `--leading-body 1.6`
(long-form legibility) · `--leading-ui 1.4`.
`--tracking-tight -0.01em` (display) · `--tracking-normal 0` · `--tracking-wide 0.04em` (eyebrows/caps).
**A11y:** body line-height ≥1.5; paragraph max width ~65–75ch (`--container-prose`);
line-height/letter-spacing are user-overridable (WCAG 1.4.12 — never lock with `!important`).

### 2.5 Semantic type roles (tier 2)

`--type-h1` = display font / `--text-2xl` / semibold / leading-heading …down to
`--type-body`, `--type-lead`, `--type-caption`, `--type-eyebrow` (caps, tracking-wide,
`--text-sm`), `--type-quote` (display, `--text-lg`). Each is a composite token
components apply as a set.

---

## 3. Spacing

Base unit **4px**. Used for margin, padding, gap.

| Name         | Value | Typical usage             |
| ------------ | ----- | ------------------------- |
| `--space-0`  | 0     | reset                     |
| `--space-1`  | 4px   | icon gap, tight           |
| `--space-2`  | 8px   | inline gaps               |
| `--space-3`  | 12px  | control padding (y)       |
| `--space-4`  | 16px  | default element gap       |
| `--space-5`  | 20px  | —                         |
| `--space-6`  | 24px  | card padding, block gap   |
| `--space-8`  | 32px  | component spacing         |
| `--space-10` | 40px  | —                         |
| `--space-12` | 48px  | small section rhythm      |
| `--space-16` | 64px  | section padding (mobile)  |
| `--space-20` | 80px  | section padding (desktop) |
| `--space-24` | 96px  | large section rhythm      |
| `--space-32` | 128px | hero / major separation   |

Semantic: `--space-section-y` (clamp 64→96px), `--space-gutter` (§10),
`--space-stack` (24px vertical rhythm), `--space-inline` (8px). _A11y: spacing
supports 200% zoom/reflow without loss (WCAG 1.4.10)._

---

## 4. Radius

| Name            | Value | Usage                             | A11y                           |
| --------------- | ----- | --------------------------------- | ------------------------------ |
| `--radius-none` | 0     | dividers, full-bleed              | —                              |
| `--radius-sm`   | 4px   | inputs, tags, small controls      | —                              |
| `--radius-md`   | 8px   | buttons                           | —                              |
| `--radius-lg`   | 12px  | **cards** (`--radius-card` alias) | —                              |
| `--radius-xl`   | 16px  | modals, large media               | —                              |
| `--radius-pill` | 999px | pills/chips, avatar               | shape isn't the sole state cue |

Calm, restrained corners — heritage/premium, not playful.

---

## 5. Elevation (shadows)

Subtle, cool-charcoal based (calm brand — no heavy drop shadows, Brand Kit "don't").

| Name         | Value                            | Usage                         |
| ------------ | -------------------------------- | ----------------------------- |
| `--shadow-0` | none                             | flat surfaces on `--color-bg` |
| `--shadow-1` | `0 1px 2px rgba(36,50,63,.06)`   | resting cards                 |
| `--shadow-2` | `0 2px 8px rgba(36,50,63,.08)`   | raised cards, hover           |
| `--shadow-3` | `0 6px 20px rgba(36,50,63,.10)`  | dropdowns, popovers           |
| `--shadow-4` | `0 12px 32px rgba(36,50,63,.14)` | modals, dialogs               |

_A11y: elevation is never the *only* signal of interactivity — pair with border/colour/label._

---

## 6. Borders

| Name                    | Value | Usage                                 | A11y                              |
| ----------------------- | ----- | ------------------------------------- | --------------------------------- |
| `--border-width-hair`   | 1px   | dividers, card outlines               | decorative → `--color-divider` ok |
| `--border-width-base`   | 1.5px | **inputs, functional borders**        | must use `--color-border` (≥3:1)  |
| `--border-width-strong` | 2px   | selected/active emphasis, icon stroke | —                                 |
| `--border-focus`        | 3px   | focus ring (§16)                      | ≥3:1 + non-colour cue             |

**Rule:** any border that _communicates_ (input boundary, selected state) uses
`--color-border` (neutral-500, 3.27:1) or stronger. `--color-divider` (neutral-300)
is decorative only.

---

## 7. Motion & 8. Animation timing

Motion is purposeful (Brand Kit): orient, confirm, relate — never decorate.

**Durations:** `--motion-instant 0ms` · `--motion-fast 120ms` (hover, small state) ·
`--motion-base 200ms` (most transitions) · `--motion-slow 320ms` (entrances,
disclosure) · `--motion-slower 480ms` (large/hero, sparing).

**Easings:** `--ease-standard cubic-bezier(.2,0,0,1)` (default) ·
`--ease-decelerate cubic-bezier(0,0,0,1)` (enter) ·
`--ease-accelerate cubic-bezier(.3,0,1,1)` (exit) ·
`--ease-emphasized cubic-bezier(.2,0,0,1)` (hero moments).

**Distance:** `--motion-shift-sm 4px` · `--motion-shift-md 8px` (transform offsets).

**Accessibility (mandatory):** honour `prefers-reduced-motion: reduce` — disable
transforms/parallax/auto-play, keep only opacity/instant changes. No animation
flashes >3×/sec (WCAG 2.3.1). No essential info conveyed by motion alone.

---

## 8b. Opacity

| Name                      | Value | Usage                                       | A11y                                                       |
| ------------------------- | ----- | ------------------------------------------- | ---------------------------------------------------------- |
| `--opacity-0`             | 0     | hidden (keep in a11y tree only if intended) | don't hide focusable content                               |
| `--opacity-disabled`      | 0.4   | disabled controls                           | pair with `aria-disabled`; not sole cue; still perceivable |
| `--opacity-muted`         | 0.64  | de-emphasised, watermarks                   | ensure resulting contrast still ≥ target if text           |
| `--opacity-hover-overlay` | 0.08  | subtle hover wash on surfaces               | —                                                          |
| `--opacity-scrim`         | 0.56  | image overlays behind text                  | tuned so overlaid text meets 4.5:1                         |

_Disabled 0.4 is visual only — never rely on opacity for contrast of meaningful text._

---

## 9. Breakpoints

Mobile-first (primary audience is on phones).

| Name       | Value  | Purpose       |
| ---------- | ------ | ------------- |
| `--bp-sm`  | 480px  | large phones  |
| `--bp-md`  | 768px  | tablets       |
| `--bp-lg`  | 1024px | small laptops |
| `--bp-xl`  | 1280px | desktop       |
| `--bp-2xl` | 1536px | large desktop |

Display/hero sizes use `clamp()` between `--bp-sm` and `--bp-xl`. _A11y: layout must
reflow to 320px width and survive 400% zoom with no horizontal scroll (WCAG 1.4.10)._

---

## 10. Containers

| Name                 | Value         | Usage                     | A11y                             |
| -------------------- | ------------- | ------------------------- | -------------------------------- |
| `--container-prose`  | 68ch (~720px) | long-form reading measure | optimal line length              |
| `--container-narrow` | 640px         | forms, focused content    | —                                |
| `--container-base`   | 1024px        | standard content width    | —                                |
| `--container-wide`   | 1200px        | rich layouts, galleries   | —                                |
| `--container-full`   | 100%          | full-bleed sections       | inner content still constrained  |
| `--gutter-mobile`    | 16px          | page side padding < md    | ≥16px so text never touches edge |
| `--gutter-desktop`   | 32px          | page side padding ≥ md    | —                                |

---

## 11. Buttons (component tokens, tier 3)

Sizes: `--button-height-sm 36px` · `--button-height-md 44px` (**default — meets 44px
touch target**) · `--button-height-lg 52px`. Padding-x: `--space-5`; gap (icon/label)
`--space-2`; radius `--radius-md`; font `--font-body`/semibold/`--text-base`.

| Variant            | Tokens                                                                                                                       | A11y                                                   |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| **Primary**        | bg `--color-primary`; text `--color-text-on-primary` (white); hover `--color-primary-hover`; active `--color-primary-active` | 6.2→10.5:1 white text ✅ (the default main action)     |
| **Accent**         | bg `--color-accent` (gold); **text `--color-text-on-accent` (Charcoal)**; hover = gold darkened 8%;                          | **Charcoal text only** (6.23:1); white fails (DEC-007) |
| **Secondary**      | bg transparent; border `--color-primary`; text `--color-primary`; hover bg `--color-blue-50`                                 | 6.2:1 text/border ✅                                   |
| **Ghost/Text**     | text `--color-primary`; hover bg `--color-blue-50`                                                                           | underline or bg on hover, not colour alone             |
| **Disabled (all)** | `--opacity-disabled` + `aria-disabled`                                                                                       | not sole cue; still readable                           |

All buttons: visible focus ring (§16); min 44×44px hit area even if visually smaller.

---

## 12. Forms

| Token                  | Value / mapping                         | Usage                | A11y                                |
| ---------------------- | --------------------------------------- | -------------------- | ----------------------------------- |
| `--field-height`       | 44px                                    | input/select height  | touch target                        |
| `--field-bg`           | `--color-surface-raised` (white)        | input background     | —                                   |
| `--field-border`       | `--color-border` (neutral-500)          | default border       | 3.27:1 ≥3:1 ✅                      |
| `--field-border-focus` | `--color-focus` + `--border-focus`      | focus                | visible ring, ≥3:1                  |
| `--field-border-error` | `--color-error-600`                     | error state          | **+ icon + text**, not colour alone |
| `--field-radius`       | `--radius-sm`                           | —                    | —                                   |
| `--field-text`         | `--color-text`                          | typed value          | 12.5:1                              |
| `--field-placeholder`  | `--color-text-muted` (neutral-700)      | placeholder          | 5.78:1 — **not** a label substitute |
| `--field-label`        | `--type-caption`/medium, `--color-text` | always-visible label | labels never placeholder-only       |
| `--field-help`         | `--text-sm`, `--color-text-muted`       | helper text          | 5.78:1                              |
| `--field-padding-x`    | `--space-3`                             | —                    | —                                   |

Error pattern: red border + error icon + text message tied via `aria-describedby`.
Required marked in text ("required"), not by colour/asterisk alone.

---

## 13. Cards

| Token             | Value                                              | Usage          |
| ----------------- | -------------------------------------------------- | -------------- |
| `--card-bg`       | `--color-surface-raised`                           | default card   |
| `--card-bg-muted` | `--color-surface` (soft grey)                      | secondary card |
| `--card-border`   | `--border-width-hair` `--color-divider`            | subtle outline |
| `--card-radius`   | `--radius-lg` (12px)                               | —              |
| `--card-shadow`   | `--shadow-1` (→ `--shadow-2` on interactive hover) | —              |
| `--card-padding`  | `--space-6` (24px)                                 | —              |

_A11y: a whole-card link uses one real `<a>` with an accessible name; hover/lift is
never the only affordance — a visible link/heading carries it._

---

## 14. Icons

Sizes: `--icon-sm 16px` · `--icon-md 20px` · `--icon-lg 24px` · `--icon-xl 32px`.
Stroke: `--icon-stroke 2px` (Brand Kit outline style). Colour: inherits
`currentColor` (defaults to text colour). _A11y: informational icons need an
accessible label; decorative icons are `aria-hidden`; icon-only buttons require an
`aria-label`; never convey status by icon colour alone._

---

## 15. States

Consistent state tokens applied by all interactive components:

| State              | Signal tokens                                                     | A11y rule                                                    |
| ------------------ | ----------------------------------------------------------------- | ------------------------------------------------------------ |
| **Hover**          | bg/border shift (`-hover` colour) + `--motion-fast`               | supplementary to a persistent affordance                     |
| **Active/Pressed** | `-active` colour                                                  | —                                                            |
| **Focus-visible**  | §16 ring                                                          | **always visible**, never removed                            |
| **Selected**       | `--color-blue-100` bg + `--border-width-strong` `--color-primary` | not colour alone (add mark/weight)                           |
| **Disabled**       | `--opacity-disabled` + `aria-disabled`                            | still perceivable; excluded from tab order if non-actionable |
| **Error**          | `--color-error-600`                                               | + icon + text                                                |
| **Success**        | `--color-success-600`                                             | + icon + text                                                |
| **Loading**        | spinner + `aria-busy`                                             | announce; respect reduced-motion                             |

Every stateful colour has a verified contrast pair (§1). No state is signalled by
colour as the _sole_ means (WCAG 1.4.1).

---

## 16. Focus

| Token                        | Value                             | Purpose                               |
| ---------------------------- | --------------------------------- | ------------------------------------- |
| `--focus-ring-width`         | 3px                               | ring thickness                        |
| `--focus-ring-color`         | `--color-focus` (blue-600, 6.2:1) | ring colour on light                  |
| `--focus-ring-offset`        | 2px                               | gap between element and ring          |
| `--focus-ring-color-inverse` | `--color-white`                   | ring colour on dark/coloured surfaces |

**Rules:** use `:focus-visible`; **never** `outline: none` without an equivalent
replacement. On coloured/photographic surfaces use a **double ring** (white +
blue) so the indicator is visible on any background. Meets WCAG 2.2 **2.4.11 Focus
Appearance** (min area + ≥3:1 against adjacent colours) and **2.4.13**. Focus order
follows reading order; focus never trapped except in intentional dialogs.

---

## 17. Accessibility (cross-cutting contract)

- **Approved text/background pairs** (use only these for text):
  Charcoal on Warm White (12.5) · Charcoal on Soft Grey (~11) · White on Greek Blue
  (6.2) · Charcoal on Gold (6.23) · Charcoal on Aegean (5.9) · neutral-700 on Warm
  White (5.78) · feedback `-600/700` on Warm White (5.1–6.3). **Forbidden:** any
  text on gold/aegean that isn't Charcoal; white text on gold; gold/aegean/neutral-300
  as text on white.
- **Minimum sizes:** body ≥ `--text-base` (17px); UI text ≥ `--text-sm` (14px);
  never below 12px.
- **Touch targets** ≥ 44×44px (`--field-height`, `--button-height-md`).
- **Links** in body text are underlined (colour alone is insufficient).
- **Zoom/reflow:** usable at 400% / 320px (WCAG 1.4.10); no `maximum-scale` lock.
- **Motion:** honour `prefers-reduced-motion` (§7).
- **Colour independence:** state/meaning never by colour alone (icon + text).
- Tokens intentionally exclude any value that cannot be used accessibly for its role.

---

## 18. Dark Mode readiness

Not launching dark mode, but **architected for it** so it's a token swap, not a rebuild:

- All colour usage goes through **semantic tokens** (§1.2) — components never hardcode a ramp step.
- A parallel dark theme scaffold overrides semantics under `[data-theme="dark"]`:

| Semantic             | Light       | Dark (scaffold — to finalise)                     |
| -------------------- | ----------- | ------------------------------------------------- |
| `--color-bg`         | warm-white  | `#141B21` (deep charcoal)                         |
| `--color-surface`    | soft-grey   | `#1E2830`                                         |
| `--color-text`       | neutral-900 | `#EAECEE`                                         |
| `--color-text-muted` | neutral-700 | `#AEB6BC`                                         |
| `--color-primary`    | blue-600    | `blue-500 #397BBD` (lighter for dark-bg contrast) |
| `--color-accent`     | gold-400    | gold-400 (verify text-on-gold stays Charcoal)     |

_Rule for whoever finalises dark mode: re-run the §1 contrast verification against
the dark backgrounds — light-mode ratios do not carry over. `prefers-color-scheme`
may drive `data-theme`._

---

## 19. Future RGHA branding inheritance

RGHA Retirement Living reuses the **entire component library and semantic token
layer** and gets its own identity by supplying **only tier-1 primitives**:

```css
:root[data-brand="rgha"] {
  --color-blue-600: <RGHA primary>; /* semantic --color-primary re-points automatically */
  --color-gold-400: <RGHA accent>;
  --font-display: <RGHA display>;
  /* neutrals, spacing, radius, motion typically shared for family consistency */
}
```

- **What RGHA overrides:** brand colours, possibly display font, logo, photography.
- **What RGHA inherits unchanged:** every semantic + component token, spacing,
  radius, elevation, motion, breakpoints, containers, **and the entire
  accessibility contract** (§17) — including the "text-on-accent must pass"
  discipline. **Mandatory:** RGHA's chosen primaries/accents must be re-verified
  against §1's contrast targets before use; the inheritance model guarantees
  structure, not that a new colour is accessible.
- **Shared vs distinct:** GOCSA and RGHA share the _system and quality bar_; each
  keeps a distinct _palette and voice_. One code change (a brand scope) = a fully
  themed second site.

---

## Definition of Done

An engineer can compile these tokens to CSS variables / Tailwind / JS / native,
build every component (Phase 2) consuming semantic tokens only, and guarantee WCAG
2.2 AA by construction — because inaccessible values are excluded by design. RGHA
inherits by adding one brand scope.

## Recommended next step

Both contracts now exist — **content** (`09`) and **visual** (`10`). This closes
the Specification Phase. Before implementation, the last foundations to confirm are
the still-open decisions **D4–D9** (`06`) and the **real service list**. Then
**Phase 2** begins in the order the strategy set: **compile tokens → build the
component library → implement the CMS schema (`09`) → assemble the 5 key templates
→ migrate content**. I recommend we start Phase 2 with the token compilation +
component library, since every page depends on it.
