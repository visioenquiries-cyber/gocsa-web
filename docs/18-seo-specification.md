# 18 — SEO Specification

_Search, discoverability, and machine-readability for the platform. Builds on the SEO
block (`09` §0.3), sitemap/redirects (`12`/`13`), breadcrumbs (`11` §17), and the
accessibility + performance contracts (`10`/`11`). Traceable to the Blueprint (`08`).
Specification only — not built._

---

## 0. Strategic framing (why this matters here)

- **This is a YMYL site.** Aged care is "Your Money or Your Life" content — Google
  applies the highest **E-E-A-T** (Experience, Expertise, Authoritativeness, Trust)
  scrutiny. SEO success comes from **demonstrable trustworthiness**, not tricks:
  real accreditation, real people, accurate services, clear contact, honest content.
  This aligns exactly with risk R1 (accuracy) — good SEO and compliance pull the same way.
- **Local intent dominates.** Most valuable queries are local ("home care Adelaide",
  "Greek aged care South Australia") — **local SEO + NAP consistency** are primary.
- **Bilingual is a ranking asset.** Genuine EN/EL parity (not machine translation)
  captures Greek-language search and signals authentic community service.
- **Migration must preserve equity.** Replacing gocsacommunitycare.com.au without
  redirects would discard existing rankings — the redirect map is non-negotiable.

**Primary SEO goal** = the north-star metric (`08`): qualified, in-catchment enquiries.

---

## 1. Metadata

Per the `SEO` block (`09` §0.3), **localized (EN/EL)**, with smart fallbacks:

| Element            | Rule                                                                                                       |
| ------------------ | ---------------------------------------------------------------------------------------------------------- |
| `<title>`          | ≤ ~60 chars; pattern `{Page} · GOCSA Community Care`; unique per page; falls back to entry title           |
| `meta description` | ≤ ~155 chars; benefit-led, plain-language, includes a local cue where natural; falls back to intro/excerpt |
| `<html lang>`      | set per locale (`en`/`el`) — accessibility + SEO                                                           |
| keywords meta      | **omitted** (ignored by search engines; no value)                                                          |
| viewport, charset  | standard, correct                                                                                          |

- **Titles/descriptions are editor-overridable but never empty** (fallback chain guarantees content).
- **Per content type defaults:** Service → "{Service} — in-home care · GOCSA…";
  Funding → "{Program} explained · GOCSA…"; News → "{Headline} · GOCSA News"; etc.
- **No duplicate titles/descriptions** — validation warns editors on collisions.

---

## 2. Open Graph

Every indexable page emits OG (localized):

| Property         | Value                                                                      |
| ---------------- | -------------------------------------------------------------------------- |
| `og:title`       | = title (or OG-specific override)                                          |
| `og:description` | = description                                                              |
| `og:type`        | `website` / `article` (News/Resources)                                     |
| `og:url`         | canonical, locale-correct                                                  |
| `og:image`       | page `ogImage` → entry hero → **Settings default OG** (1200×630, `09` §15) |
| `og:image:alt`   | localized alt                                                              |
| `og:site_name`   | "GOCSA Community Care"                                                     |
| `og:locale`      | `en_AU` / `el_GR`, with `og:locale:alternate`                              |

Image auto-generated at 1200×630 from the source via the media pipeline (`17`).

---

## 3. Twitter / X cards

| Property                        | Value                                  |
| ------------------------------- | -------------------------------------- |
| `twitter:card`                  | `summary_large_image`                  |
| `twitter:title` / `description` | = OG                                   |
| `twitter:image` / `:alt`        | = OG image / alt                       |
| `twitter:site`                  | GOCSA handle (if one exists — confirm) |

Falls back to OG where unset (most platforms read OG anyway).

---

## 4. Schema.org structured data (JSON-LD)

Emitted **automatically per content type** (`09` §0.3), validated against Rich Results:

| Type                             | Emits                     | Notes                                                                                                                               |
| -------------------------------- | ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| **Organization / LocalBusiness** | site-wide (from Settings) | NAP (name/address/phone), geo, hours, logo, sameAs (socials), founding (D7). Aged-care specificity via `additionalType`/description |
| **WebSite + SearchAction**       | site-wide                 | enables sitelinks search box                                                                                                        |
| **Service**                      | service pages             | name, provider, areaServed (SA), serviceType                                                                                        |
| **FAQPage**                      | FAQ blocks/pages          | Q&A pairs                                                                                                                           |
| **NewsArticle**                  | news                      | headline, date, author, image, publisher                                                                                            |
| **Event**                        | events                    | dates, location, offers                                                                                                             |
| **BreadcrumbList**               | all non-home              | mirrors breadcrumb trail (§9)                                                                                                       |
| **JobPosting**                   | open careers              | title, employmentType, hiringOrganization, validThrough                                                                             |
| **Person**                       | staff (when shown)        | name, jobTitle                                                                                                                      |

- **NAP consistency:** single source (Settings, `09` §15) feeds structured data,
  footer, contact — must match Google Business Profile exactly (local SEO).
- **Accuracy gate:** structured data reflects only published, sign-off'd content (R1).
- **hreflang-aware:** per-locale entities.

---

## 5. Canonical URLs

- **Self-referencing canonical** on every page (locale-correct absolute URL).
- **Locale URLs:** `/{path}` (en, default) and `/el/{path}`; each canonical to itself,
  linked via hreflang (§7).
- **Duplicate control:** query params (tracking, filters), pagination, and trailing-slash
  variants canonicalise to the clean URL; faceted/parameter URLs are `noindex` where thin.
- **No mixed signals:** canonical, sitemap, and internal links all point to the same
  preferred URL form (lowercase, no trailing slash, HTTPS).

---

## 6. Redirects (migration — preserve equity)

- **Before switchover:** crawl **gocsacommunitycare.com.au**, inventory every URL +
  its rankings/backlinks, and build a **301 map** old→new (`13` Redirect collection).
- **Rules:** 301 (permanent) for moved content; map to the closest equivalent, not
  blanket-to-homepage (which loses equity); avoid redirect chains/loops (system checks).
- **Preserve** high-value URLs (price lists, service pages) where sensible; keep slugs
  stable post-launch.
- **Post-launch:** monitor 404s → add redirects; broken-link report; update Search
  Console; submit change-of-address if the domain changes (D4/D7).
- **Ongoing:** any slug change auto-creates a redirect (archive-not-delete, `09`/`12`).

---

## 7. XML Sitemap

- **Auto-generated**, includes only **published, indexable, site-scoped** URLs
  (respects `_status`, `noindex`, `showInSearch`).
- **Per-locale entries with hreflang** annotations (`en`, `el`, `x-default`) so Google
  serves the right language.
- Fields: `loc`, `lastmod` (from `updatedAt`), sensible `changefreq`/`priority`.
- **Segmented** if large (sitemap index): pages, services, news, events, downloads.
- **Auto-updates** on publish (hooks); referenced in `robots.txt`; submitted to Search Console.
- **Excludes:** drafts, previews, admin, API, search-result pages, `noindex` pages.

---

## 8. Robots

- **`robots.txt`:** allow public content; **disallow** `/admin`, `/api`, `/preview`,
  internal search-result param URLs; reference the sitemap; no blocking of CSS/JS
  (needed for rendering/ranking).
- **Meta robots / X-Robots-Tag:** `noindex` on thin/utility pages (search results,
  404, some policies), `nofollow` where appropriate; drafts/previews always `noindex`
  - auth-gated (never crawlable).
- **Environment safety:** **staging is fully `noindex`/disallow + auth** — never let a
  pre-launch or preview environment get indexed (a classic, damaging mistake).
- **AI crawler policy (§13):** decide per-bot allow/deny (documented, editable).

---

## 9. Breadcrumbs

- **Visible breadcrumb** on all non-home pages (`11` §17), reflecting the real IA (`07`).
- **`BreadcrumbList` JSON-LD** mirrors it → rich breadcrumb in SERPs.
- Localized labels; `aria-current` on the current page; separators decorative.

---

## 10. Content guidelines (E-E-A-T for a care brand)

- **One H1 per page** (the page title); logical H2–H4 hierarchy (enforced by the
  builder, `16`); headings describe content, not decoration.
- **Search intent first:** answer the visitor's real question ("how do I get home
  care?") in plain language; funding jargon explained, not used as headings (`07`).
- **E-E-A-T signals surfaced:** accreditation, real staff/clergy, quality & rights
  pages, complaints pathway, accurate contact, policies, "since 1930 / care since
  1985" — these _are_ ranking factors for YMYL.
- **Local relevance:** natural mentions of Adelaide/South Australia, service areas;
  consistent NAP; Google Business Profile alignment.
- **Internal linking:** services ↔ funding ↔ how-to-start ↔ FAQs (the reference model
  in `09`) builds topical authority and guides users to convert.
- **Bilingual quality:** EL is **human-quality translation**, not MT — poor translation
  harms trust and rankings; parity report (`12`) prevents English-only gaps.
- **Avoid thin/duplicate content:** each service page has substantive, unique copy;
  no near-duplicate pages competing (canonical + consolidation).
- **Freshness:** News/Events + updated price lists signal an active, current provider.
- **Accuracy is SEO:** wrong care/funding info fails both compliance (R1) and E-E-A-T.

---

## 11. Accessibility ↔ SEO (the same work)

Much of technical SEO _is_ accessibility:

- Semantic HTML + landmarks, correct heading order, meaningful link text, image **alt**,
  video **captions/transcripts**, `lang` attributes, keyboard/structure — all serve
  both crawlers and assistive tech (`10` §17, `11`).
- Mobile-first, responsive, no intrusive interstitials (Google penalty + a11y harm).
- We get strong SEO **for free** by honouring the accessibility contract already specified.

---

## 12. Performance (Core Web Vitals)

Speed is a ranking factor **and** critical for our slow-phone audience (`05`/`08`).
Budgets (enforced as CI gates, `11` cross-library rules):

| Metric                              | Target                                                      |
| ----------------------------------- | ----------------------------------------------------------- |
| **LCP** (Largest Contentful Paint)  | < 2.5 s                                                     |
| **INP** (Interaction to Next Paint) | < 200 ms                                                    |
| **CLS** (Cumulative Layout Shift)   | < 0.1                                                       |
| TTFB                                | < 0.8 s (SSR/edge cache, `13` §6)                           |
| Total page weight                   | budgeted; images dominate → responsive/AVIF pipeline (`17`) |

Levers already specified: SSR/ISR + CDN (`13`/`15`), responsive AVIF/WebP + lazy-load +
width/height (`17`), token-based CSS (no heavy frameworks), purposeful minimal motion
(`10` §7), font loading strategy (subset EN/EL, `font-display`). **Monitored** in CI
(Lighthouse) + field data (Search Console/CrUX).

---

## 13. Future AI search (GEO / answer engines)

Preparing to be **cited by AI answer engines** (Google AI Overviews, ChatGPT, Perplexity)
and to power on-site AI search:

- **Structured, factual, well-marked content** is what AI engines extract — our
  schema.org + clean semantic HTML + FAQ markup + plain-language answers already
  position GOCSA to be quoted accurately (better than competitors with messy markup).
- **Entity clarity:** consistent NAP, Organization schema, and authoritative pages make
  GOCSA an unambiguous entity to AI models.
- **AI-crawler policy:** an explicit, editable stance (allow reputable answer-engine
  crawlers that drive referrals; block scrapers) — documented in robots/headers; revisit
  as norms evolve (e.g. an `llms.txt`-style summary if it becomes standard).
- **On-site semantic search:** the `search` index + future **pgvector** (`13` §4 / `15`)
  enables natural-language site search without changing the content model.
- **Accuracy caveat:** because AI engines may quote us, content accuracy (R1) matters
  even more — another reason care content stays Lane-A gated.

---

## Governance & measurement

- **Search Console + analytics** (privacy-respecting) set up at launch; track rankings,
  impressions, CTR, Core Web Vitals, 404s, and **enquiry conversions** (north-star).
- **SEO fields are editor-managed** but with safe defaults, so non-technical staff
  can't accidentally `noindex` the site or ship empty metadata (builder guardrails, `16`).
- **Pre-launch SEO checklist** (part of the migration runbook): redirects verified,
  sitemap submitted, staging de-indexed, structured data validated, titles/descriptions
  reviewed EN+EL, GBP aligned.

---

## Traceability & Definition of Done

Every element derives from `09` (SEO block), `12`/`13` (sitemap/redirects/search),
`11` (breadcrumbs/components), `10` (a11y/perf), `17` (images/OG), and `08` (goals).
An engineer can implement SEO end-to-end: metadata + OG + Twitter + JSON-LD per type,
canonical + hreflang, the redirect/migration process, auto sitemap + robots, breadcrumb
schema, performance budgets as CI gates, and an AI-search-ready structured-content
strategy — no further questions, no code prescribed.

## Open items surfaced (config, not shape)

- **D4/D7** — final domain (affects canonical/change-of-address), founding year, phone.
- Google Business Profile ownership + NAP source-of-truth confirmation.
- Social handles for `sameAs`/Twitter; AI-crawler allow/deny stance to confirm with GOCSA.

## Recommended next step

SEO completes the discoverability layer. The last pre-code artefact remains the
**Phase 2 Engineering Implementation Plan** — which folds in the **content-migration +
SEO runbook** (crawl, redirect map, sitemap, staging de-index, GBP alignment) as a
first-class launch gate. After that, and sign-off on DEC-011–017 + D4, Phase 2
implementation is near-mechanical.
