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

## Client inputs still required (before launch)

- **Vector logo (SVG/EPS)** — currently the raster lockup is used temporarily (D6).
- **Real founding/contact details** — "since 1985" and phone "(08) 7088 0500" are marked
  _confirm-with-client_ (D7 / contact confirmation).
- **Confirmed service list** — the six services shown are _requires-client-confirmation_.
- **Funding wording** sign-off (no eligibility/fee claims made yet).
- **Real testimonials** (current ones are clearly _demonstration-only_ and must not ship).
- **Policy pages** content (linked, marked _draft_).
- **Documentary photography** — every image is a branded placeholder (see below).

## Temporary media requiring replacement

All imagery is a branded gradient placeholder (`BrandImage`, marked _demo_ in review mode):
hero, "who we are", each service card, funding. Replace with authentic documentary
photography of older South Australians at home.

## Recommended client presentation flow

1. Open `/en` on desktop — scroll slowly through the story (hero → heritage → who we are →
   services → independence → care journey → funding → why choose → testimonials → policies
   → FAQs → contact).
2. Resize to mobile — show the drawer navigation and the intentional mobile layout.
3. Toggle **review mode** to show what's confirmed vs. what needs their input.
4. Walk through the "client inputs still required" list above to agree next steps.
