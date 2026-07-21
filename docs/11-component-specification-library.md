# 11 — Component Specification Library

_Every component documented before development. Each is a build-ready contract:
Purpose · Variants · Props · States · Accessibility · Animations · Responsive ·
CMS Integration · Dependencies · Usage Rules · Design Tokens Used · Acceptance
Criteria · Examples. Consumes **semantic tokens** from `10` and **content types**
from `09`; realises the components mapped in Blueprint `08` §8._

> **Framework-agnostic contract.** Props are typed (TS-style) but map to any
> component framework. Components consume tier-2/3 tokens only — never raw values
> (`10` §0). Everything here is accessible-by-construction; accessibility is a
> build requirement, not a QA afterthought.

---

## 0. Conventions (apply to every component)

### 0.1 Shared prop conventions

Every component accepts: `locale: 'en'|'el'` (drives localised content + `lang`),
`className?`, `id?`, `analyticsId?`, `theme?: 'light'|'dark'` (reads `data-theme`,
dark is scaffolded per `10` §18). Content-bound components accept either explicit
props **or** a `data` object matching a `09` content type (CMS-driven).

### 0.2 Shared accessibility baseline (WCAG 2.2 AA — non-negotiable)

- Semantic HTML + landmarks; **one `<h1>` per page**; heading levels never skip.
- All interactive elements keyboard-operable, visible `:focus-visible` ring (`10` §16),
  logical focus order, ≥44×44px targets (`10` §17).
- Colour never the sole signal; text alternatives for all non-text content.
- Respects `prefers-reduced-motion` (`10` §7); reflows to 320px / 400% zoom (`10` §9).
- Every content image requires localised alt (or `isDecorative`) — enforced upstream by `09` §0.7.

### 0.3 Shared responsive baseline

Mobile-first; breakpoints `10` §9; page gutters `--gutter-mobile/desktop`; content
widths via `10` §10 containers. Touch-first interactions; hover enhancements never gate function.

### 0.4 Shared acceptance-criteria baseline (in addition to each component's own)

✅ Renders EN + EL with correct `lang`. ✅ Keyboard + screen-reader pass (VoiceOver/NVDA).
✅ Axe: zero violations. ✅ Uses only semantic tokens. ✅ Reflow 320px & 400% zoom clean.
✅ Reduced-motion honoured. ✅ Matches Brand Kit; no hardcoded colours/sizes.

### 0.5 Dependency primitives (used across components)

`Button`, `Link`, `Icon`, `Image` (responsive, focal-point, alt-gated), `Heading`,
`RichText` renderer, `Tag/Chip`, `LanguageToggle`. These are assumed built first.

---

## Component contracts

---

## 1. Hero

- **Purpose:** first-screen trust + orientation; one clear primary action. The
  calm, premium opening moment (Blueprint north star).
- **Variants:** `image` (photo + scrim), `plain` (colour/soft-grey, no photo),
  `compact` (inner-page header), `split` (media beside text).
- **Props:**

| Prop            | Type              | Req | Default       | Notes                                   |
| --------------- | ----------------- | --- | ------------- | --------------------------------------- |
| `eyebrow?`      | string (loc)      | –   | –             | small caps label (`--type-eyebrow`)     |
| `heading`       | string (loc)      | ✔   | –             | renders as page `<h1>`                  |
| `subheading?`   | string (loc)      | –   | –             | lead text                               |
| `media?`        | Media             | –   | –             | required for `image`/`split`; alt-gated |
| `primaryCta`    | CTA               | ✔   | "Get started" | one primary action                      |
| `secondaryCta?` | CTA               | –   | –             | e.g. phone                              |
| `align?`        | 'start'\|'center' | –   | start         | –                                       |
| `variant?`      | see above         | –   | image         | –                                       |

- **States:** static; CTA buttons carry their own states (§ Button).
- **Accessibility:** heading is the `<h1>`; text-over-image uses `--color-scrim`
  (`10` §1.2) tuned so overlaid text ≥4.5:1; never place text over faces (Brand Kit);
  media `isDecorative` if purely atmospheric.
- **Animations:** optional gentle fade/rise on load (`--motion-slow`, `--ease-decelerate`,
  `--motion-shift-md`); **none** under reduced-motion (opacity only).
- **Responsive:** stacks media under text < md; `--text-display` uses `clamp()`;
  full-bleed background with inner `--container-wide`.
- **CMS Integration:** a `Section` variant `hero` (`09` §0.9); on pillar pages the
  heading/media come from the entry (`Service.name/heroImage`, etc.).
- **Dependencies:** Image, Button, Heading.
- **Usage Rules:** exactly one Hero per page, at top; **one** primary CTA; no more
  than eyebrow+heading+subheading of text.
- **Tokens:** `--type-h1/display`, `--color-scrim`, `--space-section-y`, `--container-wide`, `--motion-*`.
- **Acceptance:** 0.4 baseline + only one `<h1>`; overlaid text contrast verified on the actual image; primary CTA reachable in one tab from top.
- **Example:** Home hero — eyebrow "Community Care", h1 "Helping you stay safe and well at home", CTA "How to get started" + "Call 7088 0500".

---

## 2. Cards (Feature Card)

- **Purpose:** consistent, scannable unit linking to a Service/Resource/News/etc.
- **Variants:** `service`, `resource`, `news`, `link`, `stat` (see Statistics),
  `icon` (icon + label); layouts `vertical` (default) / `horizontal`.
- **Props:** `title` (loc, ✔), `summary?` (loc), `media?|icon?`, `href` (✔ if
  interactive), `tag?`, `meta?` (e.g. date), `variant?`, `elevation?: 0|1|2`.
- **States:** rest, hover (lift `--shadow-1`→`--shadow-2`, `--motion-fast`), focus
  (ring on the whole card), active, disabled.
- **Accessibility:** **one real `<a>` per card** wrapping the title as accessible
  name (whole-card click via that link, not nested interactives); hover-lift never
  the sole affordance; `--radius-card`.
- **Animations:** hover elevation/translate `--motion-shift-sm`; reduced-motion → colour/shadow only.
- **Responsive:** grid `1 / 2 / 3` columns at `sm/md/lg`; horizontal variant stacks < md.
- **CMS Integration:** rendered from `Service.summary/heroImage/icon`,
  `Resource`, `News.excerpt/heroImage`; `Download` cards use file meta.
- **Dependencies:** Image/Icon, Tag, Link.
- **Usage Rules:** uniform card type per grid; summary ≤ `Service.summary` 200-char
  cap; no nested links/buttons inside a linked card.
- **Tokens:** `--card-bg`, `--card-border`, `--card-radius`, `--card-shadow`, `--card-padding`, `--space-6`.
- **Acceptance:** 0.4 + single accessible link name; grid reflows; keyboard focus shows full-card ring.
- **Example:** Services menu — a grid of `service` cards grouped by Service Group.

---

## 3. Timeline

- **Purpose:** heritage storytelling (Our Story since 1930) and step sequences.
- **Variants:** `vertical` (default), `horizontal` (desktop), `steps` (numbered, for
  "How to Get Started").
- **Props:** `items: {year?/step?, title(loc), body(loc, RichText), media?}[]` (✔),
  `variant?`, `ordered?: boolean` (steps → `<ol>`).
- **States:** static; optional scroll-reveal per item.
- **Accessibility:** semantic list (`<ol>` for steps, `<ul>` for history); the line
  is decorative (`aria-hidden`); year/step announced as part of item heading.
- **Animations:** staggered fade/rise on scroll into view (`--motion-base`, small
  stagger); reduced-motion → no transform, items simply present.
- **Responsive:** horizontal → vertical stack < lg; connector re-drawn per orientation.
- **CMS Integration:** `Page`/`Resource` `timeline` section; `FundingProgram.steps` → `steps` variant.
- **Dependencies:** RichText, Image, Icon.
- **Usage Rules:** ≤ ~8 nodes for legibility; steps variant must be `ordered`.
- **Tokens:** `--color-accent` (node/marker), `--color-divider` (line), `--space-8`, `--type-h3`, `--motion-*`.
- **Acceptance:** 0.4 + reads as an ordered/unordered list to SR; connector not announced.
- **Example:** "1930 — Founded", "1985 — Community Care begins", …

---

## 4 & 5. Accordion (primitive) + FAQ (composition)

- **Purpose:** Accordion = progressive disclosure primitive; FAQ = accordion bound
  to `FAQ` content + emits FAQ schema.
- **Variants:** Accordion: `single` (one open) / `multiple`; FAQ: `grouped` (by
  category) / `flat`.
- **Props:** Accordion: `items:{id,header(loc),content(loc,RichText),defaultOpen?}[]`,
  `type:'single'|'multiple'`, `collapsible?`. FAQ: `faqs: FAQ[]` (from `09`),
  `groupByCategory?`.
- **States:** collapsed/expanded per item; hover, focus, disabled.
- **Accessibility:** header is a `<button>` inside a heading of correct level, with
  `aria-expanded` + `aria-controls`; panel `role=region` `aria-labelledby`; full
  keyboard (Enter/Space toggle, Up/Down move, Home/End); FAQ emits `FAQPage` JSON-LD.
- **Animations:** height/opacity reveal `--motion-base` `--ease-standard`; chevron
  rotate; reduced-motion → instant show/hide (no height animation).
- **Responsive:** full-width stack; comfortable 44px header targets.
- **CMS Integration:** FAQ pulls `FAQ.question/answer/category` (`09` §4); care FAQs
  are Lane A content but render identically.
- **Dependencies:** Icon (chevron), RichText, Heading.
- **Usage Rules:** don't hide critical info (phone, how-to-start) inside collapsed
  panels; default all collapsed except where `defaultOpen` justified.
- **Tokens:** `--color-border`, `--radius-md`, `--space-4/6`, `--type-body`, `--motion-base`.
- **Acceptance:** 0.4 + `aria-expanded` toggles; keyboard pattern complete; FAQ schema validates.
- **Example:** "How to Get Started" FAQ grouped by category.

---

## 6. Split Section

- **Purpose:** alternating text + media blocks for Service/About storytelling.
- **Variants:** `media-left` / `media-right`; media = image | video | stat cluster.
- **Props:** `heading?(loc)`, `body(loc, RichText)`, `media` (Media|Video),
  `reverse?:boolean`, `cta?:CTA`, `background?: 'bg'|'surface'`.
- **States:** static; contained CTA/media carry their own.
- **Accessibility:** DOM order = reading order regardless of visual side (media after
  text in source); measure capped to `--container-prose`.
- **Animations:** subtle on-scroll fade; reduced-motion off.
- **Responsive:** 2-col ≥ md → stacked < md (text first); never squeeze text below ~40ch.
- **CMS Integration:** `splitLayout` section (`09` §0.9); repeatable.
- **Dependencies:** RichText, Image/Video, Button.
- **Usage Rules:** alternate sides for rhythm; one CTA max; avoid >2 stacked splits without variety.
- **Tokens:** `--space-section-y`, `--container-base`, `--type-h2/body`, `--radius-lg` (media).
- **Acceptance:** 0.4 + visual reversal doesn't change SR reading order.
- **Example:** "Personal care" — copy left, warm photo right.

---

## 7. Statistics

- **Purpose:** credibility via key numbers (years of service, clients supported).
- **Variants:** `row` (2–4 stats), `single` (feature), inside Split or standalone band.
- **Props:** `stats:{value:string, label(loc):string, prefix?, suffix?}[]` (✔),
  `animateCountUp?:boolean`.
- **States:** static; optional count-up on view.
- **Accessibility:** value + label are one accessible unit (`<dl>`/grouped);
  count-up is decorative — the final value is present in DOM immediately for SR;
  **gold used only on the number** (accent), label in `--color-text`.
- **Animations:** count-up `--motion-slower`; **disabled** under reduced-motion (show final value).
- **Responsive:** 4→2→1 columns; numbers scale via type scale, not layout hacks.
- **CMS Integration:** `statistics` section; values are editor free-text (not computed) to avoid false precision on a care site.
- **Dependencies:** none beyond primitives.
- **Usage Rules:** ≤4 per row; never invent numbers (must be GOCSA-verified — risk R1); gold is accent, label must stay legible.
- **Tokens:** `--color-accent` (number), `--type-2xl`, `--color-text-muted` (label), `--space-8`.
- **Acceptance:** 0.4 + final values in DOM without JS; gold never carries the label text.
- **Example:** "95+ years", "Since 1985", "19 languages".

---

## 8. Navigation (Header)

- **Purpose:** global wayfinding + persistent trust/actions (phone, Start here, language).
- **Variants:** `simple` (links) / `withMegaMenu` (§9); `transparent-on-hero` / `solid`.
- **Props:** `items: Navigation.headerItems` (`09` §12), `settings: Settings`
  (phone, CTA), `currentPath`, `locale`.
- **States:** default, scrolled (solid + `--shadow-1`), item hover/active/current,
  mobile menu open/closed.
- **Accessibility:** `<nav aria-label>`; current item `aria-current="page"`;
  **skip-to-content link** first in tab order; mobile menu is an accessible
  disclosure with focus trap while open + Esc close; language toggle is a labelled
  control; persistent phone is a real `tel:` link. Phone + "Start here" **cannot be
  removed** (Blueprint/`09` §12).
- **Animations:** mobile drawer slide `--motion-base`; scrolled state cross-fade;
  reduced-motion → instant.
- **Responsive:** full horizontal ≥ lg; hamburger drawer < lg with phone + CTA pinned visible.
- **CMS Integration:** structural, Admin-only (Lane C); reads Navigation + Settings.
- **Dependencies:** LanguageToggle, Button, Link, Icon, MegaMenu (optional).
- **Usage Rules:** ≤ ~6 top items; the primary CTA and phone are always present; no dead-end labels.
- **Tokens:** `--color-primary`, `--color-bg/surface-raised`, `--shadow-1`, `--space-*`, `--motion-base`, `--focus-*`.
- **Acceptance:** 0.4 + skip link works; keyboard opens/closes/escapes mobile menu with trapped focus; `aria-current` correct; phone dials.
- **Example:** Support at Home · Services · How to Get Started · About · Community · Contact | 🌐 EN/EL · ☎ 7088 0500 · [Get started].

---

## 9. Mega Menu

- **Purpose:** reveal grouped destinations (Services by Service Group, funding) without deep clicking.
- **Variants:** `columns` (grouped links), `featured` (links + a promo card/CTA).
- **Props:** `panel:{groups:{heading(loc),links[]}[], featured?:{title,media,cta}}`,
  `triggerId`, `open`.
- **States:** closed/open; per-link hover/focus; open triggered by hover **and**
  keyboard/click (never hover-only).
- **Accessibility:** disclosure pattern — trigger `aria-expanded`/`aria-controls`;
  panel keyboard-navigable; Esc closes and returns focus to trigger; opens on
  intent with small delay; all links reachable by keyboard; not a `menu` role
  (it's navigation links) — use `<nav>`/list semantics.
- **Animations:** fade/expand `--motion-fast`; reduced-motion → instant; no motion-gated content.
- **Responsive:** **desktop only** (≥ lg); < lg collapses into the mobile drawer's nested list (no hover).
- **CMS Integration:** built from Navigation children + Service Groups/Services (`09`).
- **Dependencies:** Navigation, Card (featured), Link.
- **Usage Rules:** ≤ 4 columns; keep labels plain-language; provide a keyboard/touch path identical to hover.
- **Tokens:** `--color-surface-raised`, `--shadow-3`, `--radius-lg`, `--space-6`, `--motion-fast`.
- **Acceptance:** 0.4 + operable by keyboard and touch (not hover-only); Esc restores focus; no content only reachable via hover.
- **Example:** "Services" → columns per Service Group + featured "How to get started" card.

---

## 10. Footer

- **Purpose:** global closure — quick links, contact, accreditations, legal,
  **Acknowledgement of Country**, social.
- **Variants:** `full` / `compact`.
- **Props:** `data: Footer` (`09` §13), `settings: Settings`.
- **States:** static; link hover/focus.
- **Accessibility:** `<footer>` landmark; column headings are real headings; social
  links have accessible names + `aria-hidden` icons; acknowledgement is prominent
  text; accreditation logos have alt.
- **Animations:** none (calm close).
- **Responsive:** multi-column ≥ md → stacked accordion-free list < md.
- **CMS Integration:** Footer + Settings; Admin-only (Lane C).
- **Dependencies:** Link, Icon, Image.
- **Usage Rules:** contact + Privacy/Accessibility links always present; acknowledgement never omitted.
- **Tokens:** `--color-neutral-900` (dark footer bg option), `--color-text` on dark verified, `--space-12/16`.
- **Acceptance:** 0.4 + landmark present; legal + accessibility statement links resolve; logos alt-texted.
- **Example:** 4 columns + acknowledgement band + social row.

---

## 11. CTA (Call-to-Action Band)

- **Purpose:** recurring conversion prompt pointing to "Get started" / phone.
- **Variants:** `primary` (Greek Blue band), `accent` (gold — **dark text**),
  `soft` (surface), `inline` (within content).
- **Props:** `heading(loc)`, `body?(loc)`, `primaryCta:CTA` (✔), `secondaryCta?`,
  `variant?`, `background?`.
- **States:** buttons carry states.
- **Accessibility:** heading level appropriate to context; on gold variant **all
  text/buttons use Charcoal** (`10` DEC-007); on blue variant white text (6.2:1).
- **Animations:** none/subtle; buttons animate per Button.
- **Responsive:** center stack < md; buttons full-width on mobile.
- **CMS Integration:** `ctaBand` section; also auto-appended to Service/Funding pages via `Service.cta`.
- **Dependencies:** Button, Heading.
- **Usage Rules:** one primary action; don't stack multiple CTA bands adjacently; gold band = dark text only.
- **Tokens:** `--color-primary`/`--color-accent`, `--color-text-on-primary/on-accent`, `--space-section-y`.
- **Acceptance:** 0.4 + gold variant never renders white text; single primary action.
- **Example:** "Not sure where to begin? We'll guide you." [How to get started] [Call us].

---

## 12. Gallery

- **Purpose:** authentic community imagery (events, people, places).
- **Variants:** `grid` / `masonry` / `carousel`; optional `lightbox`.
- **Props:** `images: Media[]` (✔, alt-gated), `variant?`, `columns?`, `lightbox?:boolean`.
- **States:** image hover (subtle), focus; lightbox open/closed; carousel position.
- **Accessibility:** each image has alt; lightbox is a modal dialog (focus trap, Esc,
  labelled, restores focus); carousel has prev/next buttons + `aria-live` slide
  status + pause for any autoplay; **no autoplay motion** by default; keyboard nav.
- **Animations:** lightbox fade `--motion-base`; carousel slide honours reduced-motion (crossfade/instant).
- **Responsive:** columns 3→2→1; carousel = swipe on touch; lightbox full-screen mobile.
- **CMS Integration:** `Gallery` content type / `gallery` section (`09`); consent flags respected.
- **Dependencies:** Image, Modal/Dialog primitive, Button.
- **Usage Rules:** real GOCSA photos only (Brand Kit — no stock); every image consented; captions optional.
- **Tokens:** `--radius-lg`, `--space-4`, `--shadow-4` (lightbox), `--color-scrim`.
- **Acceptance:** 0.4 + lightbox/carousel fully keyboard + SR operable; no autoplay without pause; alt on all.
- **Example:** Community & Events gallery grid with lightbox.

---

## 13. Video

- **Purpose:** community stories / explainers.
- **Variants:** `hosted` (self/CDN), `embed` (privacy-respecting provider), `background` (decorative, muted).
- **Props:** `source`, `poster: Media` (✔), `captionsTrack` (✔ for hosted),
  `transcript(loc)` (✔), `title(loc)`, `autoplay?:false`.
- **States:** unloaded (poster + play), playing, paused, buffering, error.
- **Accessibility:** **captions required**; **transcript required** and visible/linked;
  native/accessible controls (keyboard, labelled); no autoplay with sound; background
  video is `aria-hidden`, muted, paused under reduced-motion, and never carries info.
- **Animations:** play/pause per controls; reduced-motion pauses background video.
- **Responsive:** 16:9 fluid; controls remain ≥44px; embed lazy-loaded.
- **CMS Integration:** `Video` content type (`09`) — poster, captions, transcript enforced as publish reqs.
- **Dependencies:** Image (poster), RichText (transcript).
- **Usage Rules:** never autoplay with audio; always provide captions + transcript; embeds must not set tracking cookies pre-consent (privacy R9).
- **Tokens:** `--radius-lg`, `--color-scrim`, `--focus-*`, `--motion-base`.
- **Acceptance:** 0.4 + captions present, transcript reachable, keyboard controls, no sound-autoplay, reduced-motion pauses bg.
- **Example:** "Meet our care team" with captions + transcript.

---

## 14. Forms

- **Purpose:** enquiry, careers application, callback/RSVP (future) — privacy-safe conversion.
- **Variants:** `enquiry`, `careers`, `callback`, `newsletter`; layouts `single`/`two-col`.
- **Props:** `definition: Form` (`09` §16) → renders fields; `onSubmit`, `locale`.
  Field primitives: Input, Textarea, Select, Checkbox, RadioGroup, DateField.
- **States (form):** idle, validating, submitting (`aria-busy`), success, error.
  **States (field):** default, focus, filled, error, disabled.
- **Accessibility:** every field has a **persistent visible `<label>`** (placeholder
  never a label); errors via `aria-describedby` + inline text + icon (not colour
  alone); error summary at top with links to fields; `aria-live` for submit
  result; required indicated in text; accessible anti-spam only (no image CAPTCHA);
  logical tab order; 44px targets; consent checkbox required (`09` §16).
- **Animations:** inline error reveal `--motion-fast`; no motion-gated feedback; reduced-motion safe.
- **Responsive:** single-column on mobile; grouped fields stack; sticky submit optional on long forms.
- **CMS Integration:** rendered from `Form` definition; submissions handled per `09`
  §16 (PII-minimised, encrypted, never in URL/logs, language captured for routing J4).
- **Dependencies:** field primitives, Button, RichText (consent text).
- **Usage Rules:** keep enquiry short; ask only what's needed (data minimisation R9);
  never pre-tick consent; success message reassures + sets expectations.
- **Tokens:** `--field-*` set (`10` §12), `--color-error-600`, `--space-4/6`, `--focus-*`.
- **Acceptance:** 0.4 + labels visible & associated; errors announced + linked; consent required; no PII in URL; keyboard-complete; validated against WCAG 3.3.x.
- **Example:** Enquiry — Name, Phone, Email, "How can we help?", preferred language, consent → routes to Greek inbox if EL.

---

## 15. Policy Layout

- **Purpose:** legible long-form for policies/rights/privacy (compliance surface).
- **Variants:** `withToc` (sticky table of contents) / `simple`; `document` (embedded/download).
- **Props:** `title(loc)`, `body(loc, RichText)` **or** `document: Download`,
  `version?`, `effectiveDate?`, `showToc?`.
- **States:** static; ToC active-section highlight on scroll.
- **Accessibility:** proper heading hierarchy generates ToC; ToC is a nav landmark
  with in-page links; version/date announced; if `document`, link states type+size
  and PDF must be tagged/accessible (prefer on-page body for a11y).
- **Animations:** smooth in-page scroll (respect reduced-motion → instant jump); ToC highlight fade.
- **Responsive:** ToC sticky sidebar ≥ lg → collapsible top disclosure < lg.
- **CMS Integration:** `Policy` (`09` §5); Lane A; all versions retained.
- **Dependencies:** RichText, Downloads (for document variant), Breadcrumbs.
- **Usage Rules:** prefer on-page HTML over PDF-only; always show version + effective date; plain-language summary at top.
- **Tokens:** `--container-prose`, `--type-body`/`--leading-body`, `--color-divider`, `--space-8`.
- **Acceptance:** 0.4 + ToC links resolve to correct headings; reading measure ≤ ~75ch; document links state type/size.
- **Example:** "Your Rights" with sticky ToC and a downloadable accessible PDF.

---

## 16. Downloads

- **Purpose:** present downloadable assets (price lists, brochures, forms) clearly and accessibly.
- **Variants:** `list`, `grid`, `inline` (single item).
- **Props:** `items: Download[]` (`09` §6), `variant?`, `showCategory?`.
- **States:** rest, hover, focus, (disabled if superseded/expired via `effectiveFrom`).
- **Accessibility:** each item is a link whose **accessible name = title + file type +
  size** (never "download"/"click here"); file type conveyed by text + icon; opens
  are announced (new tab flagged); localised EL file used when `fileEl` present.
- **Animations:** subtle hover; none essential.
- **Responsive:** list < md, grid ≥ md; comfortable tap targets.
- **CMS Integration:** `Download` (title, file, fileType/size auto, category,
  effectiveFrom); Lane A for price-list/policy; expired items flagged.
- **Dependencies:** Icon, Link.
- **Usage Rules:** always show type + human-readable size; group by category; surface newest price list; mark superseded.
- **Tokens:** `--color-surface`, `--radius-md`, `--space-4`, `--color-primary` (link), `--focus-*`.
- **Acceptance:** 0.4 + link names include type+size; keyboard focusable; EL file served when available.
- **Example:** "2025–2026 SAH Price List — PDF, 240 KB".

---

## 17. Breadcrumbs

- **Purpose:** show location in hierarchy; aid orientation and SEO.
- **Variants:** `default`; optional `truncated` (long paths).
- **Props:** `trail: {label(loc), href}[]` (✔); current page last (no link).
- **States:** link hover/focus; current is non-interactive.
- **Accessibility:** `<nav aria-label="Breadcrumb">` + ordered list; current item
  `aria-current="page"`; separators decorative (`aria-hidden`); emits `BreadcrumbList` JSON-LD.
- **Animations:** none.
- **Responsive:** may collapse middle items to "…" < sm (first + current always shown).
- **CMS Integration:** derived from IA/URL hierarchy + entry titles (localised).
- **Dependencies:** Link, Icon (separator).
- **Usage Rules:** not on the homepage; reflect real hierarchy (`07`); localised labels.
- **Tokens:** `--text-sm`, `--color-text-muted`, `--color-link`, `--space-2`.
- **Acceptance:** 0.4 + `aria-current` on last; schema validates; separators not announced.
- **Example:** Home › Our Services › Personal care.

---

## 18. Testimonials

- **Purpose:** trust via consented client/family voices.
- **Variants:** `single` (feature quote), `grid`, `carousel`.
- **Props:** `items: Testimonial[]` (`09` §11, `consentOnFile` required), `variant?`.
- **States:** static; carousel position/controls if used.
- **Accessibility:** use `<blockquote>` + `<cite>` for attribution; carousel controls
  keyboard + `aria-live` + pause (no autoplay); quote text is real text (not image);
  photo (if any) consented + alt.
- **Animations:** carousel transition honours reduced-motion; feature quote static.
- **Responsive:** grid 2→1; carousel swipe on touch; feature centered.
- **CMS Integration:** `Testimonial` — publish blocked without consent (`09` §11); Lane B.
- **Dependencies:** Image (optional), Carousel primitive, Icon.
- **Usage Rules:** only consented quotes; no identifying detail beyond consent; attribute honestly (e.g. "Maria, daughter of a client").
- **Tokens:** `--type-quote` (Playfair), `--color-accent` (quote mark), `--space-8`, `--color-surface`.
- **Acceptance:** 0.4 + blockquote/cite semantics; carousel operable + pausable; consent enforced upstream.
- **Example:** Feature quote on the About page.

---

## 19. News (Card · List · Article)

- **Purpose:** timely community content — freshness, SEO, engagement.
- **Variants:** `NewsCard` (in grids/home feed), `NewsList` (paginated/filterable index), `NewsArticle` (detail).
- **Props:** Card: `article: News` (title, excerpt, heroImage, publishAt, author).
  List: `articles: News[]`, `page`, `pageSize`, `filterTag?`. Article: full `News` entry.
- **States:** card hover/focus; list loading/empty/paginated; article static.
- **Accessibility:** article = one `<h1>` + `<article>` + `<time datetime>`; author
  linked if present; hero alt; list pagination is keyboard-accessible with
  `aria-current`; empty state has helpful text; heading hierarchy correct.
- **Animations:** card hover (per Card); list transitions subtle; reduced-motion safe.
- **Responsive:** card grid 3→2→1; article single prose column `--container-prose`; list filters collapse < md.
- **CMS Integration:** `News` (`09` §8), `NewsArticle` schema, sitemap, homepage feed; Lane B; scheduled publish.
- **Dependencies:** Card, Image, Breadcrumbs, RichText, Tag, Pagination primitive.
- **Usage Rules:** show date + reading context; excerpts ≤200 chars; related articles optional; never orphan an article (breadcrumb + back to News).
- **Tokens:** `--type-h1/body`, `--container-prose`, `--color-text-muted` (meta), `--space-*`.
- **Acceptance:** 0.4 + article single `<h1>` + machine-readable date; list paginates via keyboard; schema validates.
- **Example:** News index with tag filter → article detail with hero, date, body, related.

---

## Cross-library rules

- **Composition over duplication:** pages are assembled from these components via the
  `Section` union (`09` §0.9); no bespoke one-off layouts that bypass the system.
- **Token-only styling:** any PR introducing a raw hex/px value for a themable
  property fails review (`10` §0).
- **Accessibility gates in CI:** axe + keyboard smoke tests per component; contrast
  is guaranteed by tokens but re-checked for text-over-image cases (Hero/Gallery/Video).
- **Bilingual by construction:** every text prop is localised; components never
  concatenate translated fragments (grammar safety).
- **RGHA-ready:** components read semantic tokens only, so a brand scope swap
  (`10` §19) re-themes the whole library with no component changes.

---

## Definition of Done

An engineer can build every component from this document: known variants, typed
props, defined states, explicit accessibility patterns (ARIA, keyboard, focus),
animation + reduced-motion behaviour, responsive rules, the exact `09` content
types and `10` tokens each consumes, usage constraints, and testable acceptance
criteria. Together with `09` (content) and `10` (tokens), the Specification Phase
is fully implementation-ready.

## Recommended next step — Phase 2 implementation

Foundations and specifications are complete (`00`–`11`). The remaining gating
inputs are **the real service list** and **D4–D9** (`06`). With those, Phase 2
proceeds in dependency order:

1. **Compile tokens** (`10`) into the chosen stack (Option A per `05`) + a live preview.
2. **Build primitives** (§0.5) then the component library (this doc), each with tests + a component workbench.
3. **Implement the CMS schema** (`09`).
4. **Assemble the 5 key templates** (Home, Support at Home, Service, How to Get Started, Contact).
5. **Migrate content** from gocsacommunitycare.com.au with redirects.

I recommend starting with **(1) + (2)** so the brand becomes tangible and every
later page stands on a verified, accessible foundation — but confirming the stack
(D4/CMS) first ensures we build the library once.
