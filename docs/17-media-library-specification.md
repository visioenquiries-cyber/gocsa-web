# 17 — Media Library Specification

_The single source of truth for all media and assets. Consolidates and extends the
media rules in `09` §15, `12` §9, `13` §5, and the Image/Video components (`11`).
Covers every asset type, optimisation, accessibility, organisation, and governance.
Specification only — not built._

---

## 0. Principles

- **One library, referenced everywhere.** Every image/file lives once in the Media
  Library and is _referenced_ by content (`09` DRY). Update once → updates everywhere.
- **Metadata in Postgres, binaries in object storage** (`13` §5) — the DB never serves bytes.
- **Accessibility is a gate, not a wish.** No image publishes without localized alt (or
  a decorative flag); no video without captions + transcript.
- **Uploaded media ≠ system assets.** Photos/documents are uploaded by staff; **icons
  and brand marks are design-system assets** (code-managed, chosen from an approved set)
  — staff don't upload arbitrary logos or icons (§9–10).
- **Authentic only.** Real GOCSA photography; no generic stock (Brand Kit V1).
- **Per-site.** Assets carry `site_id` (`13` §8) so GOCSA and RGHA libraries stay separate.

---

## 1. Asset types (overview)

| Type                      | Examples                                | Upload?                       | Handling                                    |
| ------------------------- | --------------------------------------- | ----------------------------- | ------------------------------------------- |
| **Images**                | Photos, hero images, article images     | staff upload                  | responsive pipeline (§4–6)                  |
| **Video**                 | Story/explainer clips                   | upload or embed               | poster + captions + transcript (§7)         |
| **Documents / Downloads** | Price lists, brochures, policies, forms | staff upload                  | accessible PDF, versioned (§8)              |
| **Brand assets**          | Logo variants, favicon, default OG      | Admin-managed                 | protected, vector masters (§9)              |
| **Icons**                 | UI/section icons                        | **not uploaded** — system set | coded 2px outline set, chosen by name (§10) |

---

## 2. Storage & delivery architecture (recap)

- **Object storage** (S3-compatible; provider depends on **D4**) holds binaries; GOCSA
  owns the bucket. **Content-hash filenames** for immutable, cache-busted delivery.
- **CDN** in front for global caching + fast images; long-lived cache headers.
- **DB (`media`, `media_sizes`)** stores metadata + generated-variant records (`13` §5).
- **Usage tracking** (`usage_refs` from `_rels`): **delete blocked while referenced**.

---

## 3. Metadata model (per asset)

From `09` §15 / `12` §9 — every asset:

| Field                               | Req          | Localized | Notes                                                        |
| ----------------------------------- | ------------ | --------- | ------------------------------------------------------------ |
| `file`                              | ✔            | —         | the binary (image/doc/video)                                 |
| `title`                             | ✔            | ✔         | human label (also aids search)                               |
| `altText`                           | ✔ for images | ✔         | unless `isDecorative`                                        |
| `isDecorative`                      | —            | —         | empty alt, `aria-hidden`                                     |
| `caption`                           | —            | ✔         | optional visible caption                                     |
| `credit`                            | —            | —         | photographer/source                                          |
| `consentOnFile`                     | ✔ if people  | —         | consent for identifiable individuals (privacy R9, Brand Kit) |
| `focalPoint`                        | auto/edit    | —         | x,y for smart cropping (§5)                                  |
| `tags`                              | —            | —         | discovery/filtering                                          |
| `folder`                            | ✔            | —         | organisation (§11)                                           |
| `width/height/mime/filesize/format` | auto         | —         | technical metadata                                           |
| `site_id`                           | ✔            | —         | tenant (`13` §8)                                             |

---

## 4. Alt text & accessibility

- **Required to publish** for informational images (localized **EN + EL**); enforced at
  upload/publish (`12` §9). Decorative images set `isDecorative=true` → empty `alt` +
  `aria-hidden`.
- **Guidance in the editor:** concise, meaningful (describe purpose, not "image of…");
  ≤125 chars recommended; don't start with "picture of"; no keyword stuffing.
- **Never rely on filename** for accessibility — alt is the accessible name.
- **Captions ≠ alt:** caption is visible context; alt is the SR description (both may exist).
- **Future:** AI alt-text **suggestions** — human review/approval required, never auto-published.

---

## 5. Cropping & focal point

- **Focal point** stored per image; editor sets it visually (default centre). All
  generated crops keep the focal subject in frame — a face never gets cropped out.
- **Art-directed aspect ratios** per usage: `16:9` (hero/video poster), `4:3` /
  `3:2` (cards/inline), `1:1` (avatars/gallery thumbs), `1200:630` (OG). The system
  crops each named size around the focal point.
- **Editors never manually crop per breakpoint** — they set one focal point; the
  pipeline handles the rest (keeps it simple + consistent).
- **No upscaling** beyond source; warn if a source is too small for hero use.

---

## 6. Compression & responsive images

**Named sizes** (generated on upload; 1x + 2x where relevant):

| Size     | Width          | Use                          |
| -------- | -------------- | ---------------------------- |
| `thumb`  | 160            | admin/list thumbnails        |
| `card`   | 400 / 800@2x   | Feature Cards, article cards |
| `inline` | 800 / 1600@2x  | in-body images, Split media  |
| `hero`   | 1600 / 2400@2x | Hero/full-bleed              |
| `og`     | 1200×630       | social share                 |

- **Formats:** serve **AVIF** first, **WebP** fallback, original as last resort; via
  `<picture>`/`srcset` + `sizes` so the browser picks the right file (`11` Image).
- **Compression targets:** AVIF q≈50–60, WebP q≈75–80 (visually lossless for photos);
  **PNG kept lossless** for transparency/graphics; **SVG optimised (SVGO)**. Metadata
  (EXIF/GPS) **stripped** on processing (privacy + size).
- **Upload caps:** images ≤ 20 MB (source), auto-optimised on ingest; oversized rejected
  with guidance.
- **Lazy loading** for below-the-fold; hero eager + preloaded; width/height set to
  prevent layout shift (CLS). Delivery via CDN with immutable cache.
- **Performance budget:** image weight counts against the site performance budget (`05`/`11`).

---

## 7. Video

- **Two modes:** `hosted` (self/CDN MP4 H.264 + WebM) or privacy-respecting `embed`.
- **Required to publish:** **poster image**, **captions** (WebVTT), **transcript**
  (localized) — enforced (`09`/`11` §13).
- **No sound-autoplay;** background/decorative video is muted, `aria-hidden`, and
  **pauses under `prefers-reduced-motion`**.
- **Caps & delivery:** size limit + lazy-load embeds; adaptive/HLS streaming is a
  **future** option for longer content.
- **Accessibility:** keyboard-operable, labelled controls, ≥44px targets.

---

## 8. Documents / Downloads

- **Preferred format: tagged, accessible PDF** (proper reading order, headings,
  alt on images inside). Also allowed: DOCX (converted/for editing), XLSX where needed.
- **File metadata surfaced to users:** type + human-readable size (e.g. "PDF, 240 KB")
  — link text = title + type + size, never "download here" (`11` §16).
- **Versioning:** managed via the `Download` collection + `supersedes` chain (`09` §6);
  price lists (SAH/CHSP) carry `effectiveFrom`; superseded/expired flagged.
- **Bilingual:** an EL-specific file (`fileEl`) when it exists; else EN served with a note.
- **Governance:** care/price/policy documents are Lane A (Community Care approval);
  **virus scan on upload** (future/recommended); no PII in documents surfaced publicly.

---

## 9. Brand assets

- **Contents:** logo variants (**emblem**, horizontal **lockup**, **monochrome**),
  favicon set, default **OG image**, accreditation logos — the canonical marks.
- **Vector masters required:** SVG/EPS. ⚠️ **Current files are raster only** — obtain
  vector artwork (**Decision D6**, `01`). Two golds to reconcile (emblem #CDAD00 vs kit
  #D4AF37) — standardise (D6).
- **Protected folder** `/brand`: **Admin/Super Admin manage**; editors reference but
  cannot replace or delete (prevents accidental brand breakage).
- **Usage rules** link to Brand Guidelines V1 (`brand/`): clear space, min size, don't
  recolour/stretch/rotate — surfaced as guidance in the admin.
- **Per site:** GOCSA and RGHA each have their own `/brand` set (`10` §19 re-theme).

---

## 10. Icons

- **Not user-uploaded.** Icons are a **design-system asset** — the Brand Kit's **2px
  outline** set, shipped as a coded **SVG sprite/component** and chosen by editors from
  an **approved enum** (e.g. on Service/Service Group), never arbitrary uploads.
- **Why:** guarantees stroke/style/accessibility consistency; prevents random,
  off-brand, or inaccessible icons entering content.
- **Accessibility:** informational icons get an accessible label; decorative icons are
  `aria-hidden`; colour inherits `currentColor` (`10` §14) — never colour-as-meaning.
- **Governance:** new icons are added by design/engineering to the set (versioned), not
  uploaded by staff. RGHA inherits the same set (re-themable).

---

## 11. Folder structure

Organised by **site → purpose**, so staff find and reuse assets predictably:

```
/{site}/                         (gocsa-community-care | rgha-retirement-living)
├── brand/                       logos, favicon, OG default   [Admin-only]
├── services/                    service hero + inline images
├── funding/                     funding-related imagery
├── team/                        staff/clergy photos          [consent required]
├── news/                        article images
├── events/                      event imagery
├── gallery/                     community photo sets          [consent required]
├── downloads/
│   ├── price-lists/             SAH/CHSP price lists          [Lane A]
│   ├── policies/                governance PDFs               [Lane A]
│   ├── brochures/               marketing collateral
│   └── forms/                   printable/e-forms
└── video/                       posters + hosted clips
system/icons/                    coded icon set (not uploads)  [design-system]
```

Folders drive permissions (§13) and the media picker's browse/filter experience.

---

## 12. Naming conventions

- **kebab-case, lowercase, descriptive, contextual; no spaces, no PII.**
- **Pattern:** `{context}-{subject}-{descriptor}[-{variant}].{ext}`.
  - `service-personal-care-hero.jpg`
  - `team-maria-p-portrait.jpg`
  - `event-spring-festival-2026-01.jpg`
  - `sah-price-list-2025-2026.pdf` · `policy-privacy-v3.pdf`
  - `brand-emblem.svg` · `brand-lockup-mono.svg`
- **Dates for time-bound files** (price lists, event photo sets) in `YYYY` / `YYYY-YYYY`.
- **Versioning** for documents via filename **and** the `supersedes` chain (`09` §6).
- **System appends a content hash** on delivery for cache-busting — human filename stays clean.
- **No reliance on filename for meaning** (alt/title carry semantics). Filenames aid
  editors, not accessibility.

---

## 13. Permissions

Maps to roles (`14`):

| Action                             |    Super Admin     | Comm. Care / Retirement Living |   Marketing   | Editors  | Volunteers  | Read Only |
| ---------------------------------- | :----------------: | :----------------------------: | :-----------: | :------: | :---------: | :-------: |
| Browse/reference media             |         ✔          |            ✔ (site)            |   ✔ (site)    | ✔ (site) | ✔ (limited) |     ✔     |
| Upload images/docs                 |         ✔          |               ✔                |       ✔       |    ✔     | upload only |     ✖     |
| Edit metadata/alt                  |         ✔          |               ✔                |       ✔       |    ✔     | own uploads |     ✖     |
| Publish Lane-A docs (price/policy) |         ✔          |               ✔                |       ✖       |    ✖     |      ✖      |     ✖     |
| Manage `/brand` assets             |         ✔          |               ✖                |       ✖       |    ✖     |      ✖      |     ✖     |
| Manage icon set                    | ✔ (via design/eng) |               ✖                |       ✖       |    ✖     |      ✖      |     ✖     |
| Delete media                       |         ✔          |         ✔ (if unused)          | ✔ (if unused) |    ✖     |      ✖      |     ✖     |
| Set/confirm consent flag           |         ✔          |               ✔                |       ✔       |    ✔     |      ✖      |     ✖     |

- **Site-scoped:** users see/act only within their assigned site(s) (`13` §8).
- **Delete is soft + blocked while referenced** (`usage_refs`); hard delete Super-Admin-only, audited (`14` §5).

---

## 14. Governance & lifecycle

- **Consent** required on identifiable-person photos before use (Brand Kit / R9);
  consent status visible in the library.
- **Usage tracking** shows "used in N places"; prevents orphan deletion.
- **Retention/cleanup:** periodic review of **unused** assets (Admin); removals audited.
- **Metadata hygiene:** EXIF/GPS stripped; no PII in filenames/metadata.
- **Audit:** uploads, deletes, consent changes, brand-asset edits logged (`14` §5).
- **Accessibility QA:** alt-text presence + quality checked; missing-alt report for editors.

## 15. Future

Shared **DAM taxonomy** across GOCSA + RGHA; AI **alt-text suggestions** (human-approved);
**video transcript auto-draft** (human-checked); adaptive video streaming; automated
**image AV scan**; smart duplicate detection; on-brand **image-treatment presets**.

---

## Traceability & Definition of Done

Every rule traces to `09` (metadata/consent), `12` (pipeline/gates), `13` (storage),
`11` (components), `10` (icons/tokens), `14` (permissions), and Brand Kit V1
(authenticity, marks). An engineer can build the media subsystem: storage + CDN,
the metadata schema, responsive/format/compression pipeline, focal-point cropping,
alt/caption/consent gates, video handling, document/versioning rules, brand-asset
protection, the coded icon system, folder + naming conventions, and role-based
permissions — no further questions, no code prescribed.

## Open items surfaced (config, not shape)

- **D6** — vector brand masters + gold reconciliation (#CDAD00 vs #D4AF37).
- **D4** — object-storage bucket + CDN provider.
- Confirm document AV-scanning requirement and unused-asset retention window with GOCSA.

## Recommended next step

The editor + asset specifications are complete. The final pre-code artefact remains the
**Phase 2 Engineering Implementation Plan** (repo/monorepo, environments/secrets, CI/CD
with a11y + performance + security gates, migration runbook). After that, and sign-off
on DEC-011–016 + D4, Phase 2 implementation is near-mechanical.
