# 25 — Homepage Preview (client) — handoff notes

_The first customer-facing GOCSA Community Care homepage preview. Built on the approved
Brand Kit V1 tokens + `@gocsa/ui`, content separated via a typed `HomepageContentSource`
(fixtures now, Payload later). PREVIEW ONLY — noindex, no live data collection._

## Launch locally

```bash
corepack pnpm@9.12.0 install
pnpm --filter @gocsa/web run dev      # http://localhost:3000/en
# Review mode (shows content-status chips — internal only):
NEXT_PUBLIC_REVIEW_MODE=true pnpm --filter @gocsa/web run dev
```

(The homepage renders from fixtures and needs no database. The CMS admin at `/admin`
still requires Postgres — docs/24.)

## Brand integrity

Every colour comes from `@gocsa/tokens` (Greek Blue `#0d5eaf`, Aegean Sky `#5cb8e6`,
Heritage Gold `#d4af37`, Warm White `#fafaf8`, Charcoal `#24323f`) — a CI scan
(`pnpm scan:colors`) fails on any literal colour in the public app. Type: Playfair
Display + Inter. Gold is decorative/accent only (DEC-001/007); no gold-on-white text.

## Editorial benchmark (Sprint 4D)

The homepage was rebuilt to the approved reference standard while keeping the same
architecture and tokens (DEC-029). Notable sections: a full-bleed **cinematic Hero** with
an italic serif accent word; an archival **Heritage** frame with an overlapping **1930**
date plaque; an oversized-serif **"Who we are"** with a gold-check value checklist; a
full-bleed **"Care in Motion"** chapter break; **stacked cinematic service cards** (a
featured card + varied grid, not a uniform white grid); a **premium numbered care-journey
timeline**; and a full-bleed **cinematic Contact** band. The Community Care palette is
Greek Blue + Heritage Gold — there is **no separate "purple"** (DEC-028).

## Client inputs still required (before launch)

- **Vector logo (SVG/EPS)** — currently the raster lockup is used temporarily (D6).
- **Real founding/contact details** — "since 1930" is confirmed; "Since 1985 · Community
  Care" and phone "(08) 7088 0500" are marked _confirm-with-client_ (D7 / contact
  confirmation).
- **Confirmed service list** — the six services shown are _requires-client-confirmation_.
- **Funding wording** sign-off (no eligibility/fee claims made yet).
- **Real testimonials** (current ones are clearly _demonstration-only_ and must not ship).
- **Policy pages** content (linked, marked _draft_).
- **Documentary photography** — every image is a branded placeholder (see below).

## Temporary media requiring replacement

**Palette (DEC-030):** the public skin is **warm cream** canvas + **gold-forward** accents
(gold eyebrows, rules, italic accent words, and gold primary CTAs with charcoal text) +
navy serif headings, with Greek Blue kept for links/secondary. Pinned to the light theme.

**Imagery (DEC-031):** every media slot now renders a **real photo** via `next/image`, fed
from `apps/web/public/photos/` (see that folder's README for the slot manifest). The files
shipped today are **AI-generated representative placeholders** in the intended warm
Greek-Orthodox / aged-care style — **not authentic GOCSA photography** — and must be
replaced with real, consented photography before launch (drop-in by filename, no code
change).

## Recommended client presentation flow

1. Open `/en` on desktop — scroll slowly through the story (hero → heritage → who we are →
   services → independence → care journey → funding → why choose → testimonials → policies
   → FAQs → contact).
2. Resize to mobile — show the drawer navigation and the intentional mobile layout.
3. Toggle **review mode** to show what's confirmed vs. what needs their input.
4. Walk through the "client inputs still required" list above to agree next steps.
