# 16 — Page Builder Specification

_How non-technical GOCSA staff assemble pages without developers — safely. Builds on
the CMS blocks (`12` §4), components (`11`), and tokens (`10`); realises the editor
experience promised in the Blueprint (`08` §7). Specification only — not built._

---

## 0. Philosophy — a structured block builder, not a free canvas (DEC-015)

**The goal:** staff build and rearrange pages themselves. **The trap:** free-canvas
"drag anything anywhere" builders let non-designers produce off-brand, inaccessible,
broken-on-mobile pages — the opposite of what a premium care brand needs.

**Our approach:** a **structured block builder**. Staff **choose blocks from a
palette and drag to reorder them**; each block is a pre-designed, brand-locked,
accessible component (`11`). Editors control _content and sequence_; the _system_
controls colour, spacing, type, responsiveness, and accessibility. There are **no
colour pickers, no font controls, no manual spacing, no raw HTML**.

> **What "drag and drop" means here:** drag-to-**reorder** blocks, drag-to-**add**
> from the palette, drag-to-**arrange** columns — all within guardrails. Not
> free-positioning on a blank canvas. This is deliberate (DEC-015): it's what makes
> "no developers needed" _and_ "always on-brand and accessible" both true.

**Result:** a staff member builds a new page in minutes; it is impossible for them to
ship something that fails WCAG, breaks the grid, or violates Brand Kit V1.

---

## 1. Editor experience

- **Block palette:** a categorised, searchable panel (Content · Layout · Media · CTA ·
  Hero · Interactive). Each block shows an icon, name, and a one-line plain-language
  description. Add by click or drag into the page.
- **The page as a stack:** blocks render as an ordered vertical list (mirrors the real
  page). **Drag handles reorder**; buttons **duplicate**, **remove**, **hide** (draft
  a block without deleting), and **collapse** each block.
- **Inline editing:** click a block to edit its fields in a friendly form (labels +
  help text); text edits reflect in preview.
- **Live preview:** side-by-side or toggle, **desktop + mobile** viewports, in **EN and
  EL** (`12` §13). What they see is what publishes.
- **Guardrails visible, not punitive:** required fields flagged; "EL missing"
  indicators (`09` §0.2); alt-text prompts; "this block can only be added once" tooltips.
- **Undo/versioning:** every change autosaved and versioned (`12` §12); nothing is lost.
- **Accessibility of the editor itself:** keyboard-operable reorder (not mouse-only),
  labelled controls, screen-reader friendly (`11` §0.2).
- **Publish flow:** draft → preview → submit/publish per role & lane (`14`) — a
  Volunteer/Editor drafts; care pages publish only via Community Care / Retirement Living.

---

## 2. Block taxonomy

| Category    | Blocks                                                               | Role                    |
| ----------- | -------------------------------------------------------------------- | ----------------------- |
| **Hero**    | Hero                                                                 | Page opener             |
| **Content** | Rich Text, Statistics, Accordion, Timeline, FAQ, Testimonials, Quote | Words & structured info |
| **Layout**  | Section, Columns, Split, Spacer/Divider                              | Arrange other content   |
| **Media**   | Image, Gallery, Video, Logo Strip                                    | Visual content          |
| **CTA**     | CTA Band, Inline CTA, Downloads, Contact                             | Prompt action           |
| **Feature** | Feature Cards                                                        | Linked summaries        |

All map 1:1 to a documented, tested component in `11` — no block exists without one.

---

## 3. Guardrails & governance

- **Per-collection allowlists:** which blocks are available where (`12` §4). E.g. a
  `Service` body offers Rich Text / Split / Accordion / CTA; a `Page` offers the full
  palette; a `News` article offers Rich Text / Image / Gallery / Quote.
- **Placement rules per block:** `once` (e.g. one Hero, at top), `min`/`max` counts,
  allowed parents (some blocks only inside a Columns/Section).
- **Automatic heading hierarchy:** the page has exactly **one H1** (page title);
  blocks emit H2–H4 at the correct level automatically — editors pick _emphasis_, not
  raw heading tags, so hierarchy can't break (`10` §17 / `11`).
- **Brand-locked styling:** colour/type/spacing come from tokens (`10`); the only
  "style" choices exposed are **safe, enumerated variants** (e.g. background =
  `default | surface | primary`, each pre-verified for contrast). No free hex/px.
- **Accessibility gates:** images require localized alt (or decorative flag), videos
  require captions+transcript, gold CTA text stays Charcoal — all enforced before
  publish (`09` §0.7, `12` §9), so a non-technical editor _cannot_ ship an inaccessible page.
- **Content limits** from `09` (e.g. summary ≤200 chars) validated inline.
- **Bilingual:** every text field is EN/EL; parity surfaced, never silently English-only.

---

## 4. Block library

_Each block: Purpose · Editor inputs (fields) · Variants · Placement rules · →
Component (`11`) · Tokens (`10`) · Accessibility guardrails · Responsive · Editor help
text · Example. Full field/prop contracts live in `12` §4 / `11`._

### 4.1 Hero — `hero` _(Category: Hero)_

- **Purpose:** first-screen orientation + one clear action.
- **Editor inputs:** eyebrow, heading, subheading, media (from Library), primary CTA,
  optional secondary CTA, variant.
- **Variants:** `image` (photo + auto scrim) · `plain` · `compact` (inner pages) · `split`.
- **Placement:** **once per page, at top only.**
- **→ Component:** Hero (`11` §1). **Tokens:** `--type-h1/display`, `--color-scrim`, `--space-section-y`.
- **A11y guardrails:** heading auto-set as H1; scrim auto-applied so text ≥4.5:1 over
  any photo; blocks text-over-faces guidance; media alt required.
- **Responsive:** media stacks under text < md; display type clamps.
- **Help text:** "The top of your page. One headline, one main button."
- **Example:** Home — "Helping you stay safe and well at home" + "How to get started".

### 4.2 Rich Text — `richTextBlock` _(Content)_

- **Purpose:** formatted body copy.
- **Editor inputs:** rich text (bold, italic, links, **H2–H4**, lists, quote) — **no raw HTML, no colour/font**.
- **Placement:** anywhere; unlimited.
- **→ Component:** RichText renderer. **Tokens:** `--type-body`, `--leading-body`, `--container-prose`.
- **A11y:** heading levels constrained to valid range; link text meaningfulness warned; measure capped ~70ch.
- **Responsive:** fluid single column.
- **Help text:** "Normal page text. Use headings to break it up."
- **Example:** A service description paragraph.

### 4.3 Statistics — `statistics` _(Content)_

- **Purpose:** credibility numbers.
- **Inputs:** 2–4 stats (value, label, optional prefix/suffix), count-up toggle.
- **Placement:** max ~2 per page; unlimited stats-in-row ≤4.
- **→ Component:** Statistics (`11` §7). **Tokens:** `--color-accent` (number only), `--type-2xl`.
- **A11y:** final values in DOM without JS; **gold on the number only**, label in ink; count-up off under reduced-motion.
- **Responsive:** 4→2→1 columns.
- **Help text:** "Key numbers. Only use figures GOCSA has verified." (risk R1)
- **Example:** "95+ years · Since 1985 · 19 languages".

### 4.4 Accordion — `accordion` _(Content / Interactive)_

- **Purpose:** collapsible Q&A / detail.
- **Inputs:** items (header + rich text), single/multiple open.
- **Placement:** anywhere; unlimited.
- **→ Component:** Accordion (`11` §4). **Tokens:** `--color-border`, `--radius-md`, `--motion-base`.
- **A11y:** button + `aria-expanded`/`aria-controls`, keyboard pattern; don't hide critical info (phone/how-to-start) — editor warned.
- **Responsive:** full-width stack; 44px targets.
- **Help text:** "Expandable sections. Good for details people scan."
- **Example:** "What's included?" sections on a Service.

### 4.5 Timeline — `timeline` _(Content)_

- **Purpose:** history or ordered steps.
- **Inputs:** items (year/step, title, body, optional media), variant, ordered toggle.
- **Placement:** anywhere; ≤ ~8 nodes recommended.
- **→ Component:** Timeline (`11` §3). **Tokens:** `--color-accent` (markers), `--color-divider` (line).
- **A11y:** semantic `<ol>`/`<ul>`; connector decorative; steps variant must be ordered.
- **Responsive:** horizontal → vertical < lg.
- **Help text:** "A sequence — our story, or steps to follow."
- **Example:** "1930 Founded → 1985 Community Care begins".

### 4.6 FAQ — `faqBlock` _(Content / Interactive)_

- **Purpose:** curated FAQs with search schema.
- **Inputs:** pick FAQs (from FAQ collection) or a category; grouped/flat.
- **Placement:** anywhere; typically once.
- **→ Component:** FAQ over Accordion (`11` §4). **Tokens:** as Accordion.
- **A11y:** emits `FAQPage` JSON-LD; full keyboard.
- **Responsive:** stacked.
- **Help text:** "Reuse existing FAQs. Edit them once, they update everywhere."
- **Example:** "How to Get Started" FAQs.

### 4.7 Testimonials — `testimonialBlock` _(Content)_

- **Purpose:** consented trust quotes.
- **Inputs:** pick Testimonials (consent-gated), variant (single/grid/carousel).
- **Placement:** anywhere; unlimited.
- **→ Component:** Testimonials (`11` §18). **Tokens:** `--type-quote`, `--color-accent` (quote mark).
- **A11y:** `<blockquote>`/`<cite>`; carousel pausable/keyboard; only consented quotes selectable.
- **Responsive:** grid 2→1; carousel swipe.
- **Help text:** "Client quotes. Only consented ones appear in the list."
- **Example:** Feature quote on About.

### 4.8 Quote — `quoteBlock` _(Content)_

- **Purpose:** a single editorial pull-quote (non-testimonial).
- **Inputs:** quote text, optional attribution.
- **Placement:** within body; unlimited.
- **→ Component:** (uses `--type-quote` styling). **Tokens:** `--type-quote`, `--color-accent`.
- **A11y:** `<blockquote>`; not used for real client claims without consent (use Testimonials).
- **Responsive:** centered, constrained measure.
- **Help text:** "A highlighted line to draw the eye."

### 4.9 Section — `section` _(Layout)_

- **Purpose:** a full-width band wrapping inner blocks with a background.
- **Inputs:** background (`default | surface | primary | soft`), inner blocks, padding size (enum), optional heading.
- **Placement:** top-level; may contain a **constrained set** of inner blocks.
- **→ Component:** section wrapper. **Tokens:** `--color-bg/surface/primary`, `--space-section-y`.
- **A11y:** backgrounds are pre-verified token pairs (text contrast guaranteed); `primary` variant forces white text, `soft`/`surface` force ink.
- **Responsive:** gutters + container from tokens.
- **Help text:** "A coloured band to group content and add rhythm."
- **Example:** A soft-grey band holding Feature Cards.

### 4.10 Columns — `columns` _(Layout)_

- **Purpose:** place blocks side-by-side (2–3 columns).
- **Inputs:** column count (2/3), per-column inner blocks (constrained set), stack order on mobile.
- **Placement:** inside Section or top-level; inner blocks limited to content/media/CTA.
- **→ Component:** grid layout. **Tokens:** `--space-*`, breakpoints (`10` §9), `--container-*`.
- **A11y:** DOM/reading order = intended order; columns collapse to a single readable column on mobile.
- **Responsive:** 3→2→1; never narrower than a readable measure.
- **Help text:** "Put two or three things next to each other. They stack on phones."
- **Example:** Three service highlights across a row.

### 4.11 Split — `splitLayout` _(Layout)_

- **Purpose:** text beside a single media item.
- **Inputs:** heading, rich text, media (image/video), side (left/right), optional CTA, background.
- **Placement:** anywhere; alternate sides for rhythm (guidance).
- **→ Component:** Split Section (`11` §6). **Tokens:** `--container-base`, `--type-h2/body`.
- **A11y:** visual side swap never changes reading order; measure capped.
- **Responsive:** 2-col ≥ md → text-first stack.
- **Help text:** "Text on one side, a picture on the other."
- **Example:** "Personal care" copy + warm photo.

### 4.12 Spacer / Divider — `spacer` _(Layout)_

- **Purpose:** controlled breathing room or a subtle rule.
- **Inputs:** size (enum: sm/md/lg), type (space or divider line).
- **Placement:** between blocks; use sparingly (spacing is mostly automatic).
- **→ Component:** spacer/divider. **Tokens:** `--space-*`, `--color-divider`.
- **A11y:** divider is decorative (`aria-hidden`); never the only separator of meaning.
- **Responsive:** scales with the space scale.
- **Help text:** "Add a little space or a thin line. Usually not needed."

### 4.13 Image — `imageBlock` _(Media)_

- **Purpose:** a single content image.
- **Inputs:** image (Library), optional caption, width (enum: content/wide/full), decorative toggle.
- **Placement:** anywhere; unlimited.
- **→ Component:** Image (responsive, focal-point). **Tokens:** `--radius-lg`, `--space-*`.
- **A11y:** **localized alt required** unless decorative; consent enforced for people; focal-point crop.
- **Responsive:** responsive AVIF/WebP; width variants respect container.
- **Help text:** "One picture. Add a short description for screen readers."
- **Example:** A photo within an article.

### 4.14 Gallery — `gallery` _(Media)_

- **Purpose:** multiple images (events, community).
- **Inputs:** images (Library, alt-gated), variant (grid/masonry/carousel), lightbox toggle.
- **Placement:** anywhere; unlimited.
- **→ Component:** Gallery (`11` §12). **Tokens:** `--radius-lg`, `--shadow-4` (lightbox), `--color-scrim`.
- **A11y:** every image alt; lightbox/carousel keyboard + pausable; **no autoplay**; real GOCSA photos only.
- **Responsive:** columns 3→2→1; swipe on touch.
- **Help text:** "A set of photos. Each needs a short description."
- **Example:** Festival photo grid.

### 4.15 Video — `video` _(Media)_

- **Purpose:** community/story video.
- **Inputs:** source (hosted/embed), poster, **captions (required)**, **transcript (required)**, title.
- **Placement:** anywhere; unlimited.
- **→ Component:** Video (`11` §13). **Tokens:** `--radius-lg`, `--color-scrim`.
- **A11y:** captions + transcript required to publish; no sound-autoplay; reduced-motion pauses background video.
- **Responsive:** 16:9 fluid; lazy-loaded; ≥44px controls.
- **Help text:** "A video. Captions and a transcript are required."
- **Example:** "Meet our care team".

### 4.16 Logo Strip — `logoStrip` _(Media)_

- **Purpose:** accreditations / partners.
- **Inputs:** logos (Library, alt required), optional heading.
- **Placement:** anywhere; typically once near footer.
- **→ Component:** logo strip. **Tokens:** `--space-*`, grayscale-safe.
- **A11y:** each logo alt-texted (org name); not the sole source of credibility claims.
- **Responsive:** wraps; scales evenly.
- **Help text:** "Show accreditation or partner logos."

### 4.17 CTA Band — `ctaBand` _(CTA)_

- **Purpose:** recurring conversion prompt.
- **Inputs:** heading, body, primary CTA, optional secondary, variant (`primary`/`accent`/`soft`).
- **Placement:** anywhere; **avoid two adjacent**; one primary action.
- **→ Component:** CTA (`11` §11). **Tokens:** `--color-primary`/`--color-accent`, `--color-text-on-*`.
- **A11y:** **accent (gold) variant forces Charcoal text** (DEC-007); blue variant white text (6.2:1).
- **Responsive:** center stack < md; full-width buttons on mobile.
- **Help text:** "A prompt to act — usually 'Get started' or 'Call us'."
- **Example:** "Not sure where to begin? We'll guide you."

### 4.18 Inline CTA — `inlineCta` _(CTA)_

- **Purpose:** a lightweight in-content button/link row.
- **Inputs:** label, target (internal reference or URL), style (enum).
- **Placement:** within body; unlimited.
- **→ Component:** Button/Link. **Tokens:** button tokens (`10` §11).
- **A11y:** meaningful label; internal links use references (no broken URLs).
- **Help text:** "A single button inside your text."

### 4.19 Downloads — `downloadsBlock` _(CTA / Content)_

- **Purpose:** present price lists/brochures/policies.
- **Inputs:** pick Downloads (from collection), heading, variant (list/grid).
- **Placement:** anywhere; unlimited.
- **→ Component:** Downloads (`11` §16). **Tokens:** `--color-surface`, `--radius-md`.
- **A11y:** link name = title + file type + size (never "download"); EL file used when present; shows superseded/expired.
- **Responsive:** list < md, grid ≥ md.
- **Help text:** "Attach files like price lists. Managed once in Downloads, reused here."
- **Example:** "2025–2026 SAH Price List — PDF, 240 KB".

### 4.20 Contact — `contactBlock` _(CTA)_

- **Purpose:** phone/enquiry/address prompt.
- **Inputs:** optional heading/body override; pulls phone/address from Settings.
- **Placement:** anywhere; typically once.
- **→ Component:** Contact block. **Tokens:** `--color-primary`, contact styles.
- **A11y:** real `tel:` link, address machine-readable; phone always prominent.
- **Responsive:** stacks; map optional.
- **Help text:** "Shows GOCSA's phone and address (kept in Settings)."

### 4.21 Feature Cards — `featureCards` _(Feature)_

- **Purpose:** grid of linked summaries (services, resources).
- **Inputs:** heading, cards (title, summary, media/icon, link) **or** auto-pull from a Service Group; columns.
- **Placement:** anywhere; unlimited.
- **→ Component:** Cards (`11` §2). **Tokens:** `--card-*`.
- **A11y:** one accessible link per card; uniform card type per grid.
- **Responsive:** 3→2→1.
- **Help text:** "A row of clickable cards linking to services or pages."
- **Example:** Services menu grouped by purpose.

---

## 5. Layout & nesting rules

- **Two-level max nesting:** top-level blocks; **Section** and **Columns** may contain
  a **constrained inner set** (content/media/CTA blocks) — no deep/infinite nesting
  (keeps editing simple and output predictable).
- **Layout blocks can't contain layout blocks** (no Columns-in-Columns) — prevents the
  fragile, unresponsive nests that break free-canvas builders.
- **Order = reading order** always (DOM matches visual), so screen-reader and mobile
  experience never diverge from the design.

---

## 6. Reusable & global blocks

- **Reusable across pages by reference:** FAQs, Testimonials, Downloads, Media are
  _referenced_, not copied — edit once, updates everywhere (`09` DRY).
- **Global/pinned sections (future):** an Admin can define a locked reusable section
  (e.g. a standard "How to get started" CTA) inserted on many pages and updated centrally.
- **Saved templates (future):** starter page layouts (e.g. "Service page", "Campaign
  landing") so staff begin from a proven structure, not a blank page.
- **RGHA:** the same block library + palette, re-themed by brand scope (`10` §19) — RGHA
  staff build with identical tools.

---

## 7. Accessibility & responsive guarantees (why this is safe for non-technical staff)

- **Impossible to fail contrast:** no colour inputs; only pre-verified token variants.
- **Impossible to break heading order:** H1 fixed to title; blocks emit correct levels.
- **Impossible to ship media without alt / video without captions:** publish gates.
- **Impossible to break mobile:** every block has defined responsive behaviour; no
  free positioning; columns auto-stack.
- **Impossible to go off-brand:** type, spacing, radius, motion all token-driven.
- The editor guarantees a WCAG 2.2 AA, on-brand, responsive page **by construction** —
  the staff member simply chooses content and order.

---

## 8. Traceability

| Layer                            | Source  |
| -------------------------------- | ------- |
| Blocks ↔ CMS `blocks` field      | `12` §4 |
| Blocks ↔ components              | `11`    |
| Styling ↔ tokens                 | `10`    |
| Content limits / gates / consent | `09`    |
| Publish by role/lane             | `14`    |
| Editor experience & usability    | `08` §7 |

Every block traces to a component, a set of tokens, and a content contract; no block
is bespoke or unmanaged.

## 9. Future enhancements

Saved templates & global sections; block-level A/B or scheduled swaps; an "insert
recommended block" assist; per-audience content; a richer media picker with AI
alt-text _suggestions_ (human-approved). All within the same guardrails.

## Definition of Done

An engineer can build the page builder: the palette + categories, the drag-to-reorder
/ add / duplicate / hide interactions, live bilingual preview, the per-collection
allowlists and placement rules, every block's inputs/variants/rules/component/tokens/
a11y, the nesting model, and the guardrails that make it safe for non-technical staff
— with no further questions and no code prescribed here.

## Recommended next step

This completes the editor-facing specification. The remaining pre-code artefact is the
**Phase 2 Engineering Implementation Plan** (repo/monorepo, environments/secrets,
CI/CD with a11y + performance + security gates, migration runbook). After that, and
sign-off on DEC-011/012/013/014/015 + D4, Phase 2 implementation is near-mechanical.
