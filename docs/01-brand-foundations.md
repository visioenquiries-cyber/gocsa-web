# 01 — Brand Foundations

_Status: aligned to the client's **Brand Guidelines V1** (`brand/gocsa-brand-kit-v1.pdf`),
verified for accessibility. This supersedes the earlier logo-only draft._

## Source of truth

- **Brand Guidelines V1** — the client-authored kit. Primary reference.
- **Official emblem** (`brand/gocsa-emblem.jpg`, `gocsa-logo-lockup.png`) — the real
  laurel-wreath + Southern Cross mark, "EST. 1930", bilingual wordmark.

> ⚠️ **Reconciliation needed (logo).** The V1 kit ships a **placeholder "GO"
> monogram** and explicitly says to _"swap it for the organisation's official
> artwork as soon as high-resolution files are supplied."_ The official artwork is
> the laurel/Southern Cross emblem we already hold. **Decision D6:** confirm the
> emblem (not the GO monogram) is the mark we build around, and obtain it as
> **vector (SVG/EPS)** — current files are raster.

## Brand essence

- Tagline: **"Our Faith. Our Culture. Our Community."**
- Mission/values (from kit §01): dignity & respect, caring, quality service,
  accountability, teamwork, open communication, privacy & confidentiality.
- These values _are_ the design brief: dignity → clarity and calm; caring → warmth;
  privacy → trustworthy forms and data handling.

## Colour palette (V1) — with verified WCAG contrast

Ratios computed against **Warm White #FAFAF8**. WCAG 2.2 AA needs **4.5:1** for
normal text, **3:1** for large text/UI.

| Token             | Hex       | Role (kit)                              | On Warm White | Verdict & rule                                                                                    |
| ----------------- | --------- | --------------------------------------- | ------------- | ------------------------------------------------------------------------------------------------- |
| **Greek Blue**    | `#0D5EAF` | Primary — headers, nav, primary buttons | **6.21:1**    | ✅ Text-safe. **This is the primary button** (white text = 6.21:1).                               |
| **Aegean Sky**    | `#5CB8E6` | Secondary — hover, tags, highlights     | 2.13:1        | ⚠️ **Not a text colour.** Fills/hover only. Any text on it must be Charcoal (5.9:1), never white. |
| **Heritage Gold** | `#D4AF37` | Accent — CTAs, key stats, dividers      | 2.01:1        | ⚠️ **Not a text colour.** See gold-button warning below.                                          |
| **Warm White**    | `#FAFAF8` | Page/card base                          | —             | Base ground.                                                                                      |
| **Soft Grey**     | `#F2F4F7` | Section fills, cards                    | —             | Subtle separation.                                                                                |
| **Charcoal**      | `#24323F` | Body text, footers, dark sections       | **12.54:1**   | ✅ Primary text colour. Excellent.                                                                |

Usage ratio (kit): ~**60%** Warm White/Soft Grey · **30%** Greek Blue · **10%** Heritage Gold.

> ⚠️ **Gold-button warning (accessibility).** The kit lists Heritage Gold for
> "high-priority CTAs" and shows an Accent Button. A gold button with **white**
> text is **2.01:1 — fails badly**. A gold button with **Charcoal** text is
> **6.23:1 — passes.** **Rule:** gold CTAs use dark (Charcoal) text only; for the
> common "primary action," prefer **Greek Blue with white text**. This is
> **Decision D7**, recorded so no one designs a white-on-gold button.

> **Two golds.** The kit's Heritage Gold `#D4AF37` differs from the real emblem's
> gold `#CDAD00` (sampled). When the emblem replaces the GO monogram, both will
> appear. Recommend standardising digital gold to **#D4AF37** and reproducing the
> emblem in that gold for consistency — to confirm (part of D6).

## Typography (V1)

- **Playfair Display** — headings/editorial, weights 600–700.
- **Inter** — body & UI, weights 400–600.
- Scale (kit): H1 40 · H2 28 · H3 20 · Body 14 · Small 11.

> ⚠️ **Body 14px is small for our audience** (older users). Recommend a base of
> **16–18px** for body on web while keeping the type _scale/ratios_; 14px is fine
> for dense UI/metadata, not primary reading. **Decision D8.**

> **Greek coverage (hard requirement — D2 is full EN/EL parity):** both Playfair
> Display and Inter include Greek glyphs. Action: verify Greek rendering quality at
> display sizes before locking, and confirm licensing for web use.

## Other system elements (V1)

- **Icons:** consistent 2px outline stroke, calm and precise.
- **Greek key (meander) motif:** thin borders/dividers/footer only, in Greek Blue
  or Gold — never a full background behind text.
- **Photography:** warm, authentic, real members/clergy/events, natural light —
  **no generic stock**. (Implication: we need a GOCSA photo library or a plan to
  create one; see risk R6/discovery.)

## Corrections to flag back to GOCSA (accuracy matters for a care brand)

1. Kit typography sample reads **"since 1936"** and there's an emblem/history of
   **EST. 1930** (Community Care specifically since **1985**). "1936" looks like a
   typo — confirm the correct founding year so it's consistent everywhere.
2. Kit shows placeholder contact **"+61 8 0000 0000"** and **www.gocsa.org.au** —
   the Community Care entity is **gocsacommunitycare.com.au**, ph **7088 0500**,
   262 Franklin St, Adelaide. Confirm which domain/number the new site presents.

## Ready-to-implement tokens (draft — becomes code in Phase 2)

```
--color-primary:      #0D5EAF;  /* Greek Blue  — nav, primary buttons (white text) */
--color-secondary:    #5CB8E6;  /* Aegean Sky  — hover/tags/fills (dark text only) */
--color-accent:       #D4AF37;  /* Heritage Gold — accents/CTAs (Charcoal text only) */
--color-bg:           #FAFAF8;  /* Warm White */
--color-surface:      #F2F4F7;  /* Soft Grey */
--color-ink:          #24323F;  /* Charcoal — body text */
--font-display: "Playfair Display", Georgia, serif;
--font-body:    "Inter", system-ui, sans-serif;
--text-base: 16px; /* raised from kit's 14 for accessibility (D8) */
```
