# 09 — Content Model Specification

_The single most important CMS document. Defines every content object as an
implementation-ready **contract**. An engineer can build the CMS from this without
further questions. Derived from the approved Product Blueprint (`08`), Brand Kit V1
(`01`), and decisions (`06`). CMS-agnostic (maps to Sanity, Payload, Strapi,
Contentful, etc.)._

> **How to read this.** §0 defines global standards (field types, localisation,
> SEO, workflow, revisions, permissions, media, accessibility) **once**. §1+ define
> each object. Each object lists all sixteen required attributes; where an attribute
> is fully covered by a §0 standard, the object says which standard applies and
> then states only its deviations. Nothing is left implicit.

---

## 0. Global Standards

### 0.1 Field-type vocabulary

| Type                  | Meaning                                     | Storage/validation guidance                                                                                                                  |
| --------------------- | ------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `String`              | Single-line text                            | max length stated per field                                                                                                                  |
| `RichText`            | Formatted body (portable text / structured) | allowed marks: bold, italic, links, H2–H4, lists, blockquote. **No raw HTML, no inline styles, no colour** (brand is enforced by the system) |
| `PlainText`           | Multi-line, no formatting                   | max length stated                                                                                                                            |
| `Slug`                | URL segment                                 | `^[a-z0-9]+(?:-[a-z0-9]+)*$`, unique per type **per locale**, auto-generated from title, editable                                            |
| `Integer` / `Decimal` | Numbers                                     | ranges stated                                                                                                                                |
| `Money`               | Amount + currency (AUD)                     | Decimal ≥ 0, 2dp; used by price lists                                                                                                        |
| `Boolean`             | true/false                                  | default stated                                                                                                                               |
| `Date` / `DateTime`   | Calendar date / instant                     | ISO 8601; timezone Australia/Adelaide                                                                                                        |
| `Enum`                | Fixed option set                            | options enumerated per field                                                                                                                 |
| `Reference`           | Link to one object                          | target type stated; on-delete rule stated                                                                                                    |
| `ReferenceList`       | Ordered links to many                       | target type + min/max stated                                                                                                                 |
| `Media`               | Reference to a Media Library **image**      | never a raw upload — always via Media Library (§15)                                                                                          |
| `File`                | Reference to a Media Library **document**   | via Download/Media Library                                                                                                                   |
| `URL`                 | Absolute or internal link                   | validated; internal links use Reference where possible                                                                                       |
| `Email` / `Phone`     | Contact values                              | Email RFC 5322; Phone AU format, E.164 stored                                                                                                |
| `Geo`                 | Lat/lng + address                           | for Settings/Events                                                                                                                          |
| `Color`               | Token **reference only**                    | must be a brand token name, not a free hex                                                                                                   |
| `SEO`                 | Embedded SEO object                         | see §0.3                                                                                                                                     |
| `CTA`                 | Embedded call-to-action                     | `{ label:String(loc), target:URL                                                                                                             | Reference, style:Enum[primary,accent,secondary] }` |
| `Section[]`           | Ordered list of page blocks                 | see §1 Page / §0.9                                                                                                                           |

### 0.2 Localisation (bilingual EN/EL) — Decision D2

- **Strategy:** _field-level localisation_. Each field is flagged **Localised**
  (has EN + EL values) or **Shared** (one value across locales).
- **Locales:** `en` (default), `el`. `en` is the source of truth; `el` is
  first-class, never auto-machine-translated silently.
- **Slugs are localised** (each locale has its own URL segment).
- **Publish rule:** a document may publish with EL fields incomplete, **but the CMS
  must show an "EL incomplete" indicator** listing which localised fields are
  missing, and surface a site-wide **"Translation parity" report** for editors.
- **Front-end fallback:** if an EL value is missing at render time, show the EN
  value wrapped with `lang="en"` (correct for screen readers) — never show an empty
  region. This is a safety net, not the goal (parity is the goal).
- **Non-localised by default:** IDs, slugs' internal keys, dates, numbers, prices,
  references, media _files_ (but media **alt text is localised**), boolean flags.

### 0.3 SEO block (embedded `SEO`, localised)

| Field                | Type            | Req      | Validation     | Default                                 |
| -------------------- | --------------- | -------- | -------------- | --------------------------------------- |
| `metaTitle`          | String (loc)    | optional | ≤ 60 chars     | falls back to page/entry title          |
| `metaDescription`    | PlainText (loc) | optional | ≤ 160 chars    | falls back to intro/excerpt             |
| `ogImage`            | Media           | optional | ≥ 1200×630     | falls back to Settings default OG image |
| `canonicalUrl`       | URL             | optional | absolute       | self                                    |
| `noindex`            | Boolean         | —        | —              | `false`                                 |
| `structuredDataType` | Enum            | optional | see per-object | per-object default                      |

Structured data (schema.org) is emitted automatically per object type (e.g.
Service → `Service`/`MedicalBusiness`, Event → `Event`, News → `NewsArticle`,
FAQ → `FAQPage`, Settings → `LocalBusiness`). Sitemap and hreflang (`en`/`el`)
generated automatically for all published, indexable documents.

### 0.4 Publishing workflow (states + lanes)

States: **Draft → In Review → Approved → Published → Archived** (plus **Scheduled**
= approved with a future `publishAt`). Any published doc can return to Draft
(unpublish) or Archived (retire, keep URL→redirect).

- **Lane A — Care/compliance (strict):** Editor drafts → **Community Care Manager**
  approves & publishes. Applies to: **Service, Funding Program, Policy, FAQ (care),
  Download (price/policy), Resource (care)**. Rationale: risk R1 (accuracy/compliance).
- **Lane B — Marketing (light):** **Marketing** may publish directly. Applies to:
  **News, Event, Testimonial, Gallery/Media, non-care FAQ**.
- **Lane C — Structural (admin):** **Administrator** only. Applies to: **Navigation,
  Footer, Settings, Forms, Careers config, Redirects, Pages that are structural**.
- Every state change is timestamped with actor. Scheduled publish/unpublish supported.

### 0.5 Revision history (all objects)

- **Every save creates a version** (autosave included), recording actor, timestamp,
  and a field-level diff. Minimum **90 days or 50 versions** retained (whichever
  greater); care/policy objects retain **all** versions (compliance).
- **Restore** any prior version (creates a new version, never destructive).
- **Soft delete** only: deleting archives + creates a redirect stub; hard delete is
  Administrator-only and audited.
- Published vs draft are distinct versions (edit-in-draft without affecting live).

### 0.6 Permissions (roles) — from Blueprint §7

Roles: **Editor**, **Marketing**, **Community Care Manager (CCM)**,
**Administrator (Admin)** (future: RGHA-scoped equivalents).

| Capability                                  | Editor  | Marketing | CCM     | Admin |
| ------------------------------------------- | ------- | --------- | ------- | ----- |
| Create/edit care content (draft)            | ✔       | –         | ✔       | ✔     |
| Publish care content (Lane A)               | –       | –         | ✔       | ✔     |
| Create/publish marketing content (Lane B)   | –       | ✔         | ✔       | ✔     |
| Edit structural (Nav/Footer/Settings/Forms) | –       | –         | –       | ✔     |
| Manage Media Library                        | ✔       | ✔         | ✔       | ✔     |
| Manage users/roles                          | –       | –         | –       | ✔     |
| Restore versions / hard delete              | restore | restore   | restore | all   |

Per-object deviations are noted in each object's **Permissions** line.

### 0.7 Media requirements (all Media/File usage)

- All images referenced from the **Media Library (§15)** — no orphan uploads.
- **Alt text (localised) is required** on every content image before publish
  (accessibility gate). Decorative images set an explicit `isDecorative=true` (empty alt).
- Focal point stored for responsive cropping; system generates responsive sizes +
  modern formats (AVIF/WebP) automatically.
- **Consent flag required** on photos of identifiable people (Brand Kit photography rule).
- Max upload 20 MB image / 25 MB document; documents are PDF-preferred with a
  human-readable title and file size shown to end users.

### 0.8 Accessibility requirements (all objects) — WCAG 2.2 AA

- Body content uses semantic structure; **one H1 per page** (the page title);
  RichText offers only H2–H4 (no skipping levels).
- Link text must be meaningful (validation warns on "click here"/"read more" without context).
- Images: alt text gate (§0.7). Video: captions + transcript required (§ objects).
- Colour is never the sole information carrier (enforced by components, not editors).
- Editor UI itself must be keyboard-operable and screen-reader labelled.
- Reading-level guidance surfaced for care content (plain language; target ~Grade 8).

### 0.9 Reusable embedded objects

- **`Section` (page block):** discriminated union used by `Page.sections[]` and other
  flexible layouts. Each variant maps to a design component (Blueprint §8). Common
  variants: `hero`, `splitLayout`, `featureCards`, `statistics`, `timeline`,
  `accordion`, `ctaBand`, `downloadsBlock`, `video`, `gallery`, `testimonialBlock`,
  `richTextBlock`, `contactBlock`, `logoStrip`. Each variant has its own field set;
  all inherit spacing/theme tokens and cannot override brand.
- **`CTA`**, **`Link`**, **`SEO`**, **`Address`** — as defined above/in Settings.

---

## Object contracts

_Template per object: Purpose · Description · Relationships · Fields (Required +
Optional in one table) · Validation · Defaults · Bilingual · SEO · Workflow ·
Revisions · Permissions · Media · Accessibility · Future Expansion._

Legend: **R**=required, **O**=optional, **Loc**=localised (EN/EL), **Sh**=shared.

---

## 1. Page

- **Purpose:** flexible, section-built standard pages (e.g. About subpages, How to
  Get Started, static/landing content) that don't warrant a dedicated type.
- **Description:** a title + an ordered list of `Section` blocks (§0.9). The
  page-builder surface for editors, with brand enforced by the blocks.
- **Relationships:** `sections[]` embed/reference reusable blocks; may Reference
  other objects (Services, Downloads) inside blocks; parent Page (optional) for hierarchy.

| Field          | Type           | R/O  | Loc/Sh | Validation             | Default    |
| -------------- | -------------- | ---- | ------ | ---------------------- | ---------- |
| `title`        | String         | R    | Loc    | ≤ 120                  | —          |
| `slug`         | Slug           | R    | Loc    | unique per locale      | from title |
| `parent`       | Reference→Page | O    | Sh     | no cycles, max depth 3 | none       |
| `intro`        | PlainText      | O    | Loc    | ≤ 300                  | —          |
| `sections`     | Section[]      | R    | mixed  | ≥ 1 block              | —          |
| `seo`          | SEO            | O    | Loc    | §0.3                   | fallbacks  |
| `showInSearch` | Boolean        | O    | Sh     | —                      | true       |
| `updatedAt`    | DateTime       | auto | Sh     | —                      | now        |

- **Bilingual:** title/slug/intro/section text Localised; structure shared.
- **SEO:** §0.3; `structuredDataType` default `WebPage`.
- **Workflow:** Lane A if structural/care, else Lane B; structural pages Lane C.
- **Revisions/Permissions/Media/Accessibility:** §0.5 / §0.6 / §0.7 / §0.8.
- **Future:** reusable "saved section" library; A/B variants; scheduled hero swaps.

---

## 2. Service

- **Purpose:** one in-home care service (e.g. Personal care, Domestic assistance) —
  the product's spine.
- **Description:** structured, templated (one design template renders all services),
  grouped by purpose, linked to funding and FAQs, always ending in a CTA.
- **Relationships:** `group` → **Service Group** (§2a); `relatedFunding` →
  ReferenceList Funding Program; `faqs` → ReferenceList FAQ; `downloads` →
  ReferenceList Download; `relatedServices` → ReferenceList Service; `heroImage` → Media.

| Field             | Type                         | R/O | Loc/Sh       | Validation                  | Default                            |
| ----------------- | ---------------------------- | --- | ------------ | --------------------------- | ---------------------------------- |
| `name`            | String                       | R   | Loc          | ≤ 80                        | —                                  |
| `slug`            | Slug                         | R   | Loc          | unique/locale               | from name                          |
| `group`           | Reference→ServiceGroup       | R   | Sh           | must exist                  | —                                  |
| `summary`         | PlainText                    | R   | Loc          | ≤ 200 (used in cards/menus) | —                                  |
| `body`            | RichText                     | R   | Loc          | H2–H4 only                  | —                                  |
| `whoFor`          | RichText                     | O   | Loc          | plain language              | —                                  |
| `whatsIncluded`   | ReferenceList/RichText       | O   | Loc          | bullet-friendly             | —                                  |
| `heroImage`       | Media                        | O   | Sh (alt Loc) | §0.7                        | Settings default                   |
| `icon`            | Enum(icon set)               | O   | Sh           | from approved 2px icon set  | —                                  |
| `relatedFunding`  | ReferenceList→FundingProgram | O   | Sh           | —                           | —                                  |
| `faqs`            | ReferenceList→FAQ            | O   | Sh           | —                           | —                                  |
| `downloads`       | ReferenceList→Download       | O   | Sh           | —                           | —                                  |
| `relatedServices` | ReferenceList→Service        | O   | Sh           | ≠ self                      | —                                  |
| `cta`             | CTA                          | O   | Loc          | —                           | "Get started" → How to Get Started |
| `order`           | Integer                      | O   | Sh           | ≥ 0                         | 100                                |
| `seo`             | SEO                          | O   | Loc          | —                           | fallbacks                          |

- **Bilingual:** all text Localised; references/flags shared.
- **SEO:** `structuredDataType` default `Service`; connects to LocalBusiness.
- **Workflow:** **Lane A** (care) — CCM approves/publishes.
- **Permissions:** Editor drafts; **CCM** publishes; Marketing none.
- **Media:** hero + inline images require alt (Loc) + consent if people.
- **Accessibility:** plain language (~Grade 8); included-items as real lists.
- **Future:** eligibility checker, price ranges, service-area map, availability status.

### 2a. Service Group _(supporting object, from Blueprint §4/§6)_

- **Purpose:** purpose-based grouping (Personal care, In-home nursing & clinical,
  Household help, Social & wellbeing, Specialised).
- **Fields:** `name` String R Loc; `slug` Slug R Loc; `description` PlainText O Loc;
  `icon` Enum O; `order` Integer O (default 100); `seo` O.
- **Relationships:** has many Services (inverse of `Service.group`).
- **Workflow:** Lane A. **Revisions/Perms/A11y:** standard. **Future:** landing hero per group.

---

## 3. Funding Program

- **Purpose:** explain a funding pathway — **Support at Home (SAH)**, **CHSP**,
  **Privately funded** — in plain language, with current price lists.
- **Description:** the "confusing part" made calm; never used as navigation, always
  linked from Services and How to Get Started.
- **Relationships:** `priceLists` → ReferenceList Download; `relatedServices` →
  ReferenceList Service; `faqs` → ReferenceList FAQ; `steps` → embedded ordered steps.

| Field             | Type                          | R/O | Loc/Sh | Validation                    | Default              |
| ----------------- | ----------------------------- | --- | ------ | ----------------------------- | -------------------- |
| `name`            | String                        | R   | Loc    | ≤ 80 (e.g. "Support at Home") | —                    |
| `slug`            | Slug                          | R   | Loc    | unique/locale                 | from name            |
| `shortCode`       | Enum                          | R   | Sh     | [SAH, CHSP, PRIVATE]          | —                    |
| `summary`         | PlainText                     | R   | Loc    | ≤ 200                         | —                    |
| `body`            | RichText                      | R   | Loc    | plain language                | —                    |
| `eligibility`     | RichText                      | O   | Loc    | —                             | —                    |
| `steps`           | Repeater{title Loc, text Loc} | O   | Loc    | ordered                       | —                    |
| `priceLists`      | ReferenceList→Download        | O   | Sh     | —                             | —                    |
| `effectiveFrom`   | Date                          | O   | Sh     | —                             | —                    |
| `relatedServices` | ReferenceList→Service         | O   | Sh     | —                             | —                    |
| `faqs`            | ReferenceList→FAQ             | O   | Sh     | —                             | —                    |
| `cta`             | CTA                           | O   | Loc    | —                             | "How to get started" |
| `seo`             | SEO                           | O   | Loc    | —                             | fallbacks            |

- **Bilingual:** all text Localised; `shortCode`, references shared.
- **SEO:** default structured type `WebPage`; may include FAQ schema if `faqs`.
- **Workflow:** **Lane A** (compliance-sensitive: eligibility & pricing).
- **Permissions:** CCM publishes; price-list changes are CCM-approved.
- **Media/A11y/Revisions:** standard; steps rendered as an ordered list/timeline.
- **Future:** interactive eligibility wizard; auto-flag expired price lists via `effectiveFrom`.

---

## 4. FAQ

- **Purpose:** single question/answer reducing enquiry friction and feeding FAQ schema.
- **Relationships:** `category` Enum; optional links to Service/Funding (context); groupable.
- **Fields:** `question` String R Loc (≤160); `answer` RichText R Loc; `category`
  Enum R Sh [general, funding, services, getting-started, rights]; `relatedService`
  Reference O; `relatedFunding` Reference O; `order` Integer O (100); `isCareContent`
  Boolean R Sh (default true).
- **Bilingual:** question/answer Localised.
- **SEO:** contributes to `FAQPage` schema on host pages; not individually indexed.
- **Workflow:** **Lane A if `isCareContent`**, else Lane B.
- **Permissions:** Editor drafts; CCM publishes care FAQs; Marketing publishes non-care.
- **Revisions/Media/A11y:** standard; answers plain-language, real lists/links.
- **Future:** helpfulness voting; auto-surface top FAQs; feed AI search (Enterprise).

---

## 5. Policy

- **Purpose:** governance/compliance documents (rights, complaints, privacy,
  quality) — a compliance surface.
- **Relationships:** `document` → Download (the file); `category` Enum; may link to Pages.
- **Fields:** `title` String R Loc; `slug` Slug R Loc; `summary` PlainText O Loc;
  `body` RichText O Loc (for on-page policies); `document` Reference→Download O Sh;
  `category` Enum R Sh [rights, privacy, complaints, quality, governance]; `version`
  String O Sh; `effectiveDate` Date O Sh; `reviewDate` Date O Sh.
- **Validation:** at least one of `body` or `document` present.
- **Bilingual:** title/summary/body Localised; document file shared (EL version as
  separate Download referenced if it exists).
- **SEO:** `structuredDataType` `WebPage`; often `noindex` for internal policies (default false, editable).
- **Workflow:** **Lane A** (CCM); **all versions retained** (§0.5 compliance).
- **Permissions:** CCM/Admin publish. **Media/A11y:** accessible PDFs (tagged) recommended; on-page body preferred for a11y.
- **Future:** review-date reminders; acknowledgement tracking (Enterprise).

---

## 6. Download (Document)

- **Purpose:** any downloadable asset — **price lists (SAH/CHSP)**, brochures, forms,
  policy PDFs. Single source, referenced everywhere (Blueprint DRY principle).
- **Relationships:** referenced by Service, Funding Program, Policy, Resource, Page blocks.
- **Fields:** `title` String R Loc; `file` File R Sh (per-locale file optional via
  `fileEl`); `fileEl` File O Sh; `description` PlainText O Loc; `category` Enum R Sh
  [price-list, brochure, form, policy, guide, other]; `fileType` auto Sh; `fileSize`
  auto Sh; `effectiveFrom` Date O Sh; `supersedes` Reference→Download O Sh; `isCareContent` Boolean R (default true).
- **Validation:** file required; if `isCareContent`, changes are Lane A; show
  `fileType` + human-readable `fileSize` to end users (a11y/clarity).
- **Bilingual:** title/description Localised; separate EL file optional (`fileEl`); if
  absent, EN file served with a note.
- **Workflow:** **Lane A** for price-list/policy/form; Lane B for brochures/guides (marketing).
- **Permissions:** CCM approves care downloads. **Revisions:** file replacements versioned; `supersedes` chains history.
- **Media/A11y:** PDFs should be tagged/accessible; link text = title + type + size; never "download here".
- **Future:** auto-expiry warnings via `effectiveFrom`; virus scan on upload; e-forms replacing PDFs.

---

## 7. Resource

- **Purpose:** longer-form explainer/guide (e.g. "Understanding Support at Home"),
  consolidating body content + related downloads/services.
- **Relationships:** `relatedServices`, `relatedFunding`, `downloads` (ReferenceLists);
  `category` Enum; author (Staff) optional.
- **Fields:** `title` String R Loc; `slug` Slug R Loc; `excerpt` PlainText R Loc
  (≤200); `body` RichText R Loc; `heroImage` Media O; `category` Enum R Sh
  [funding, care-guide, wellbeing, community]; `relatedServices` RefList O;
  `relatedFunding` RefList O; `downloads` RefList O; `isCareContent` Boolean R (default true); `seo` SEO O.
- **Bilingual:** all text Localised.
- **SEO:** `Article`/`WebPage`; indexable by default.
- **Workflow:** **Lane A if care**, else Lane B. **Permissions:** accordingly.
- **Media/A11y/Revisions:** standard; hero alt + consent.
- **Future:** a dedicated **Resources hub** (Blueprint Future feature); reading time; series/grouping.

---

## 8. News Article

- **Purpose:** timely community/organisational news — freshness, SEO, engagement.
- **Relationships:** `author` → Staff (O); `category`/`tags`; `heroImage` → Media; `gallery` → Gallery (O).
- **Fields:** `title` String R Loc; `slug` Slug R Loc; `excerpt` PlainText R Loc
  (≤200); `body` RichText R Loc; `heroImage` Media R (alt Loc); `author`
  Reference→Staff O; `publishAt` DateTime R Sh; `tags` ReferenceList/StringList O Loc;
  `gallery` Reference→Gallery O; `seo` SEO O.
- **Bilingual:** all text Localised; `publishAt` shared.
- **SEO:** `NewsArticle`; indexable; appears in sitemap + news listing + homepage feed.
- **Workflow:** **Lane B** (Marketing publishes); supports **Scheduled** publish.
- **Permissions:** Marketing/CCM/Admin. **Revisions:** standard.
- **Media:** hero required with alt + consent; gallery images alt-gated.
- **Accessibility:** dated, meaningful headings, alt text.
- **Future:** categories/tags landing pages; RSS; newsletter integration; related-articles.

---

## 9. Event

- **Purpose:** community events (seniors groups, festivals, info sessions).
- **Relationships:** `location` (Geo/Address or reference to Settings default); `relatedNews`; `image` → Media.
- **Fields:** `title` String R Loc; `slug` Slug R Loc; `summary` PlainText R Loc;
  `body` RichText O Loc; `startDateTime` DateTime R Sh; `endDateTime` DateTime O Sh
  (≥ start); `allDay` Boolean O (false); `location` {name Loc, address, geo} O;
  `isOnline` Boolean O (false); `onlineUrl` URL O; `image` Media O; `rsvp` CTA O;
  `cost` Money|String O; `seo` SEO O.
- **Validation:** `endDateTime` ≥ `startDateTime`; if `isOnline`, `onlineUrl` required.
- **Bilingual:** text/location name Localised; dates/geo shared.
- **SEO:** `Event` structured data; indexable; auto-move to "past events" after end.
- **Workflow:** **Lane B**; Scheduled publish supported.
- **Permissions:** Marketing/CCM/Admin. **Media/A11y/Revisions:** standard.
- **Future:** RSVP capture (→ Form), calendar (.ics) export, recurring events, capacity.

---

## 10. Staff (Team Member)

- **Purpose:** profiles for people/clergy — trust and human connection.
- **Relationships:** optional `services`/`serviceGroup` they relate to; author of News/Resource.
- **Fields:** `name` String R Sh; `role` String R Loc; `photo` Media O (alt Loc,
  consent R if present); `bio` RichText O Loc; `email` Email O Sh; `phone` Phone O Sh;
  `languages` StringList O Sh (e.g. English, Greek); `order` Integer O (100); `showOnSite` Boolean R (true).
- **Bilingual:** role/bio Localised; name/contact shared.
- **SEO:** `Person` structured data when shown; profiles generally not individually indexed by default.
- **Workflow:** Lane A/B (About = care-adjacent → CCM approve recommended); config choice.
- **Permissions:** Editor drafts; CCM/Admin publish. **Media:** photo alt + **consent required**.
- **Accessibility:** meaningful alt (name + role), no text-in-image.
- **Future:** department filtering; "Greek-speaking" badge surfaced in enquiry routing.

---

## 11. Testimonial

- **Purpose:** client/family quotes — trust (with consent).
- **Relationships:** optional `relatedService`/`relatedFunding`.
- **Fields:** `quote` PlainText R Loc (≤400); `attribution` String R Loc (e.g.
  "Maria, daughter of a client"); `consentOnFile` Boolean R Sh (**must be true to
  publish**); `relatedService` Reference O; `photo` Media O (alt+consent); `order` Integer O; `dateGiven` Date O.
- **Validation:** `consentOnFile === true` is a **publish gate**.
- **Bilingual:** quote/attribution Localised (translate faithfully; original-language note optional).
- **Workflow:** **Lane B**; **Permissions:** Marketing/CCM/Admin.
- **Media/A11y/Revisions:** standard; no real full names/identifying detail without documented consent (privacy R9).
- **Future:** video testimonials (→ captions/transcript), rating, source verification.

---

## 12. Navigation _(singleton set)_

- **Purpose:** header (and utility) menus — structural.
- **Description:** ordered, possibly nested (max depth 2) link items pointing to
  internal References or URLs; includes utility items (language toggle, phone, "Start here" CTA are system-guaranteed, not editable away).
- **Fields:** `headerItems` Repeater{ `label` String R Loc; `target` Reference|URL R;
  `children[]` (same, depth ≤2) O; `highlight` Boolean O } ; `utility` (managed:
  language toggle, phone from Settings, primary CTA).
- **Validation:** targets must resolve; no cycles; the persistent phone + "Start here" CTA cannot be removed (Blueprint requirement).
- **Bilingual:** labels Localised; targets shared.
- **SEO:** n/a (emits accessible `<nav>` landmarks).
- **Workflow/Permissions:** **Lane C — Administrator only.**
- **Revisions:** standard (structural changes are high-impact → always versioned).
- **Accessibility:** keyboard-operable menus, ARIA current, skip-to-content present globally.
- **Future:** mega-menu, per-audience nav, RGHA site nav via shared model.

---

## 13. Footer _(singleton)_

- **Purpose:** global footer — quick links, contact, accreditations, legal,
  **Acknowledgement of Country**, social.
- **Fields:** `columns` Repeater{ `heading` String R Loc; `links[]`{label Loc, target} };
  `acknowledgement` RichText R Loc; `accreditations` Media[] O (alt Loc); `socialLinks`
  Repeater{platform Enum, url URL} O; `legalLinks` (Privacy, Accessibility, Terms)
  Reference[] R; `contactSummary` (pulled from Settings) auto.
- **Bilingual:** headings/link labels/acknowledgement Localised.
- **Workflow/Permissions:** **Lane C — Administrator.**
- **Revisions/A11y:** standard; footer is a `<footer>` landmark; accreditation logos need alt.
- **Future:** newsletter signup block; dynamic accreditation from Settings; RGHA footer variant.

---

## 14. Media Library (Media Asset) _(§0.7 governs usage)_

- **Purpose:** single store for all images/documents; reuse, governance, accessibility, consent.
- **Relationships:** referenced by every object via `Media`/`File`.
- **Fields:** `file` (image or document) R Sh; `title` String R Loc; `altText`
  PlainText **R (Loc)** for images (unless `isDecorative`); `isDecorative` Boolean O
  (false); `caption` PlainText O Loc; `credit` String O Sh; `consentOnFile` Boolean
  (**R=true if identifiable people**); `focalPoint` Geo(x,y) O; `tags` StringList O;
  `usageRefs` auto (where used); `width/height/format/size` auto Sh.
- **Validation:** image publish blocked without `altText` or `isDecorative`;
  person-photos blocked without `consentOnFile`.
- **Bilingual:** altText/caption Localised; file shared (EL-specific asset stored as its own entry if needed).
- **Workflow:** assets are usable immediately (not "published"); deletion blocked while `usageRefs` non-empty.
- **Permissions:** all content roles can add; Admin can delete unused.
- **Accessibility:** alt-text quality guidance; auto-generate responsive/modern formats.
- **Future:** AI alt-text _suggestions_ (human-approved), video assets + transcripts, DAM taxonomy, RGHA shared library.

---

## 15. Settings _(singleton)_

- **Purpose:** global site configuration — one source for contact, org, defaults.
- **Fields:** `siteName` String R Loc; `organisationLegalName` String R Sh
  ("Greek Orthodox Community of South Australia Incorporated"); `phonePrimary` Phone
  R Sh; `email` Email R Sh; `address` {street, suburb, state, postcode, geo} R Sh
  (262 Franklin St, Adelaide SA 5000 — confirm); `openingHours` Repeater O; `abn`
  String O Sh; `foundingYear` Integer R Sh (**confirm 1930 vs kit's 1936 — D7**);
  `careSince` Integer O (1985); `defaultOgImage` Media R; `socialLinks` Repeater O;
  `analyticsIds` (managed, Admin) O; `enquiryRouting` { defaultInbox Email, greekInbox
  Email } R Sh; `acknowledgementOfCountry` RichText R Loc.
- **Bilingual:** siteName, opening-hour labels, acknowledgement Localised; the rest shared.
- **SEO:** feeds `LocalBusiness`/`MedicalBusiness` structured data + NAP consistency (SEO/local).
- **Workflow/Permissions:** **Lane C — Administrator only.** **Revisions:** all retained.
- **Accessibility:** contact info in machine-readable + human formats.
- **Future:** multi-site settings (GOCSA + RGHA), maintenance-mode banner, feature flags.

---

## 16. Forms

- **Purpose:** define public forms (**Enquiry**, **Careers application**, future
  **Callback/RSVP/Newsletter**) and govern their submissions — privacy-safe.
- **Two parts:** **Form Definition** (content object, editor-managed) and **Form
  Submission** (captured data — _not_ public content, restricted).

**Form Definition fields:** `name` String R Sh; `key` Slug R Sh; `title` String R
Loc; `intro` PlainText O Loc; `fields` Repeater{ `label` String R Loc; `type` Enum
[text, email, phone, textarea, select, checkbox, date]; `required` Boolean;
`options[]` (for select) Loc; `helpText` Loc O }; `submitLabel` String R Loc;
`successMessage` RichText R Loc; `routing` { inbox Email, greekInbox Email } R Sh;
`consentText` RichText R Loc (privacy consent, **required checkbox**); `spamProtection`
Enum [honeypot, captcha-accessible] R.

- **Validation:** every form must include a privacy consent field; email/phone
  validated; accessible anti-spam only (no image-only CAPTCHA — a11y).
- **Submissions:** stored encrypted-at-rest, **PII minimised**, retention policy
  (e.g. 12 months then purge), **never public**, **never in URLs/logs** (R9);
  accessible only to authorised roles; language of submission captured to route to
  Greek-speaking staff (J4).
- **Bilingual:** all labels/messages/consent Localised.
- **Workflow/Permissions:** definitions **Lane C — Admin**; submission _access_
  restricted to CCM/Admin (and Marketing for marketing forms). Editors cannot export PII.
- **Accessibility:** labels tied to inputs, clear errors, keyboard-complete, no colour-only errors, focus management.
- **Future:** conditional logic, file uploads (careers CV) with scanning, CRM/email
  integration, callback scheduling, RSVP tied to Events.

---

## 17. Careers

- **Purpose:** recruitment — list roles and let candidates apply (real need in aged care).
- **Relationships:** `applicationForm` → Form (Careers); `department`/`location`.
- **Fields:** `title` String R Loc; `slug` Slug R Loc; `summary` PlainText R Loc;
  `description` RichText R Loc; `employmentType` Enum R Sh [full-time, part-time,
  casual, contract]; `location` String O Loc; `department` Enum O; `salaryInfo`
  String O Loc; `closingDate` Date O Sh; `applicationForm` Reference→Form O;
  `applyEmail` Email O Sh; `status` Enum R Sh [open, closed] (default open); `seo` SEO O.
- **Validation:** at least one apply method (`applicationForm` or `applyEmail`);
  auto-set `status=closed` after `closingDate`.
- **Bilingual:** all text Localised; dates/enums shared.
- **SEO:** `JobPosting` structured data; indexable while open; removed from index when closed.
- **Workflow:** **Lane C/A — Admin or CCM** (HR-owned); Scheduled close.
- **Permissions:** Admin/CCM manage; applications handled via Form submissions (restricted).
- **Accessibility/Revisions/Media:** standard; role descriptions plain-language.
- **Future:** applicant tracking, CV upload + scanning, saved searches, RGHA roles.

---

## 18. Redirect _(supporting — migration, from `07`/`08`)_

- **Purpose:** preserve SEO from **gocsacommunitycare.com.au** on switchover.
- **Fields:** `from` String R Sh (old path, unique); `to` URL|Reference R; `type`
  Enum R [301, 302] (default 301); `note` PlainText O; `active` Boolean R (true).
- **Validation:** `from` unique, starts with `/`; `to` must resolve; no redirect chains/loops (system checks).
- **Workflow/Permissions:** **Lane C — Administrator.** **Revisions:** standard.
- **Future:** auto-import from crawl of the old site; broken-link monitor; analytics on hit redirects.

---

## Cross-object rules & integrity

- **Referential integrity:** deleting an object referenced elsewhere is blocked
  (soft-delete → redirect instead). `Media`/`Download` show `usageRefs`.
- **Slug uniqueness** is per type **per locale**; global URL router resolves
  locale-prefixed paths (`/el/...`).
- **"Care content" flag** drives Lane A workflow consistently across Service,
  Funding, Policy, FAQ, Download, Resource.
- **Publish gates (hard):** image alt text (§0.7), person-photo consent, testimonial
  consent, form privacy-consent field. These block Publish, not Draft.
- **EL parity report:** global dashboard listing documents with missing localised fields.

---

## Definition of Done for this spec

An engineer can now: enumerate every content type and its fields; know each field's
type, requiredness, localisation, validation, and default; implement the four
publishing lanes and the role matrix; enforce accessibility and consent publish
gates; generate SEO/structured data/sitemaps/hreflang; and plan migration redirects
— **without further questions.** Open items D4–D9 (`06`) affect _values/config_
(domain, founding year, real service list, photography), **not** the model's shape.

## Recommended next step

Pair this with the **Design Token Specification** (formalise Brand Kit V1 into named,
brand-scoped tokens), then Phase 2 implementation begins: **tokens → component
library → CMS schema (this spec) → templates → migration**. I recommend the Design
Token Spec next.
