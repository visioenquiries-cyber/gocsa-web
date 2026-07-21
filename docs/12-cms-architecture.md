# 12 — CMS Architecture

_Complete CMS architecture generated from the approved Content Model Specification
(`09`), mapped throughout to the Product Blueprint (`08`). Expressed in the
**Payload CMS** model (Collections/Globals/Blocks) — see the platform note below.
Architecture-level (buildable configuration shape), not application code._

> **Platform decision (DEC-011, proposed — needs client sign-off).** Payload CMS is
> recommended because it natively provides every capability `09` requires — code-defined
> Collections/Globals/Blocks, field-level localization (EN/EL), drafts + versioning,
> function-based access control (our four lanes), an editor-friendly admin UI, media
> handling, live preview, and self-hosting so **GOCSA owns the whole stack**. This
> resolves D1→Option A to a concrete product. The architecture concepts (documents,
> singletons, relations, structured blocks, RBAC) port to Sanity/Strapi if GOCSA
> prefers; only the config syntax changes. **No assumption is silent — this is on the record.**

> **Open-decision dependencies flagged inline:** media storage adapter depends on
> **D4** (hosting); real service _content_ depends on the service-list confirmation.
> Neither changes the architecture's shape.

---

## 0. Overview — how `09` maps to Payload

| `09` construct                          | Payload construct                     | Notes                         |
| --------------------------------------- | ------------------------------------- | ----------------------------- |
| Content object (multi-instance)         | **Collection**                        | pages, services, news, … (§1) |
| Singleton (Settings/Nav/Footer)         | **Global**                            | §2                            |
| `Section[]` union                       | **Blocks** field                      | §4                            |
| Embedded objects (SEO/CTA/Link/Address) | Reusable **field groups**             | §5                            |
| Field-level EN/EL                       | `localized: true` fields              | §11                           |
| Publishing lanes A/B/C                  | **Access functions** + workflow field | §6–8                          |
| Revision history                        | **Versions + drafts**                 | §13                           |
| Media Library                           | **Upload collection**                 | §9                            |
| Redirects                               | Collection + plugin                   | §1                            |
| Form + submissions                      | Collections (+ Form Builder plugin)   | §1                            |

Recommended plugins: `@payloadcms/plugin-search` (§10),
`@payloadcms/plugin-form-builder` (forms), `@payloadcms/plugin-redirects`,
`@payloadcms/plugin-seo`, `@payloadcms/storage-*` (media, §9), plus a custom
**audit-log** module (§16) and **scheduling** job (§15).

---

## 1. Collections

_Each collection's full field contract lives in `09`; here we give the collection-level
config: auth, localization surface, drafts/versions, access lane, key hooks, admin
grouping. "Lane" = publishing lane from `09` §0.4._

| Collection           | slug              | Blueprint ref   | Lane                        | Drafts/Versions      | Localized fields                              | Admin group         |
| -------------------- | ----------------- | --------------- | --------------------------- | -------------------- | --------------------------------------------- | ------------------- |
| **Pages**            | `pages`           | §4 IA           | A/C                         | ✔ / all              | title, slug, intro, blocks text, seo          | Content             |
| **Services**         | `services`        | §4/§6           | **A**                       | ✔ / all              | name, slug, summary, body, whoFor, cta, seo   | Care                |
| **Service Groups**   | `serviceGroups`   | §4              | A                           | ✔                    | name, slug, description                       | Care                |
| **Funding Programs** | `fundingPrograms` | §4              | **A**                       | ✔ / all              | name, slug, summary, body, eligibility, steps | Care                |
| **FAQs**             | `faqs`            | §6              | A if `isCareContent` else B | ✔                    | question, answer                              | Care/Content        |
| **Policies**         | `policies`        | §6              | **A**                       | ✔ / **all retained** | title, summary, body                          | Compliance          |
| **Downloads**        | `downloads`       | §6              | A (price/policy) / B        | ✔ / all              | title, description                            | Content             |
| **Resources**        | `resources`       | §7 Future→built | A if care else B            | ✔                    | title, slug, excerpt, body                    | Content             |
| **News**             | `news`            | §8              | **B**                       | ✔                    | title, slug, excerpt, body, tags              | Marketing           |
| **Events**           | `events`          | §9              | **B**                       | ✔                    | title, slug, summary, body, location.name     | Marketing           |
| **Staff**            | `staff`           | §10             | A/B (config)                | ✔                    | role, bio                                     | People              |
| **Testimonials**     | `testimonials`    | §11             | **B**                       | ✔                    | quote, attribution                            | Marketing           |
| **Careers**          | `careers`         | §17             | C/A (HR)                    | ✔                    | title, slug, summary, description             | People              |
| **Media**            | `media` (upload)  | §9 CMS          | —                           | —                    | altText, caption                              | Library             |
| **Forms**            | `forms`           | §16             | **C**                       | ✔                    | title, intro, fields.label, messages, consent | System              |
| **Form Submissions** | `formSubmissions` | §16             | — (restricted)              | —                    | —                                             | System (restricted) |
| **Redirects**        | `redirects`       | §7/§8 migration | **C**                       | —                    | —                                             | System              |
| **Users**            | `users` (auth)    | §7 roles        | —                           | —                    | —                                             | System              |

**Cross-cutting collection config (all content collections):**

- `versions: { drafts: { autosave: { interval: 800 } }, maxPerDoc: <see §13> }`.
- `access`: read/create/update/delete functions implementing the role×lane matrix (§6).
- Hooks: `beforeValidate` (slug gen, validation), `beforeChange` (workflow/scheduling
  guards), `afterChange`/`afterDelete` (audit log §16, search index §10, cache revalidate/preview §14).
- `admin.useAsTitle`, `admin.defaultColumns`, `admin.group`, `admin.description` (plain-language help for editors — Blueprint §7 usability).

**Restricted collections:** `formSubmissions` — no public read; `read` limited to
CCM/Admin (+ Marketing for marketing forms); **no update**; PII fields
`admin.readOnly`; export gated (Editors cannot export PII — `09` §16). `users` —
Admin-managed; self can edit own profile.

---

## 2. Globals

| Global         | slug         | Blueprint     | Access (edit)  | Localized                                      | Notes                                                                                      |
| -------------- | ------------ | ------------- | -------------- | ---------------------------------------------- | ------------------------------------------------------------------------------------------ |
| **Settings**   | `settings`   | §? / `09` §15 | **Admin only** | siteName, opening-hour labels, acknowledgement | phone, email, address, foundingYear (**D7**), enquiryRouting, defaultOgImage, analyticsIds |
| **Navigation** | `navigation` | `09` §12      | **Admin only** | item labels                                    | header items (nested ≤2), utility guaranteed (phone/CTA/lang cannot be removed)            |
| **Footer**     | `footer`     | `09` §13      | **Admin only** | headings, link labels, acknowledgement         | columns, accreditations, social, legal links                                               |

Globals use `versions: { drafts: true, max: all }` (structural = always versioned)
and feed the front-end layout. `afterChange` triggers full-site cache revalidation.

---

## 3. Relationships

_Payload `relationship` (to-one / hasMany) + `join` fields (reverse). On-delete:
soft — deletion blocked while referenced (`09` cross-object rules)._

| From            | Field                               | Type          | To                    | Reverse (join)               | On referenced-delete             |
| --------------- | ----------------------------------- | ------------- | --------------------- | ---------------------------- | -------------------------------- |
| Service         | `group`                             | to-one        | Service Group         | `serviceGroup.services`      | block delete of group in use     |
| Service         | `relatedFunding`                    | hasMany       | Funding Program       | —                            | allow (nullify link)             |
| Service         | `faqs`                              | hasMany       | FAQ                   | —                            | allow                            |
| Service         | `downloads`                         | hasMany       | Download              | —                            | allow                            |
| Service         | `relatedServices`                   | hasMany       | Service (≠self)       | —                            | allow                            |
| Funding Program | `priceLists`                        | hasMany       | Download              | —                            | warn if in use                   |
| Funding Program | `relatedServices`                   | hasMany       | Service               | —                            | allow                            |
| Policy          | `document`                          | to-one        | Download              | —                            | block                            |
| Download        | `supersedes`                        | to-one        | Download              | `download.supersededBy`      | allow                            |
| Resource        | `relatedServices/Funding/downloads` | hasMany       | resp.                 | —                            | allow                            |
| News            | `author`                            | to-one        | Staff                 | `staff.articles`             | nullify                          |
| News            | `gallery`                           | to-one        | (gallery block/media) | —                            | allow                            |
| Event           | `relatedNews`                       | hasMany       | News                  | —                            | allow                            |
| Testimonial     | `relatedService`                    | to-one        | Service               | —                            | allow                            |
| Careers         | `applicationForm`                   | to-one        | Form                  | —                            | block                            |
| Any (blocks)    | media/CTA references                | to-one        | Media / internal doc  | `media.usageRefs` (computed) | block delete while `usageRefs>0` |
| Redirect        | `to`                                | to-one \| URL | any doc / external    | —                            | —                                |

**Referential integrity:** enforced in `beforeDelete` hooks + `join`-derived
`usageRefs` surfaced in the admin so editors see "used in 4 places" before acting
(`09` §14). Slug uniqueness is **per collection per locale** (§11).

---

## 4. Blocks (the `Section` union → Payload `blocks` field)

`pages.sections` (and rich areas on Service/Resource/Funding bodies where allowed)
use a `blocks` field. Each block = one design component (`08` §8 / `11`). Blocks
carry only their own fields + shared groups; **they cannot override brand** (no
colour/spacing free-fields — theme comes from tokens `10`).

| Block slug         | → Component (`11`) | Key fields (all text localized)                                                   |
| ------------------ | ------------------ | --------------------------------------------------------------------------------- |
| `hero`             | Hero §1            | eyebrow, heading, subheading, media(rel→Media), primaryCta, secondaryCta, variant |
| `splitLayout`      | Split Section §6   | heading, body(richText), media, reverse(bool), cta, background(enum)              |
| `featureCards`     | Cards §2           | heading, cards[](title, summary, media/icon, link), columns                       |
| `statistics`       | Statistics §7      | stats[](value, label, prefix, suffix), animateCountUp(bool)                       |
| `timeline`         | Timeline §3        | items[](year/step, title, body, media), variant, ordered(bool)                    |
| `accordion`        | Accordion §4       | items[](header, content), type(single/multiple)                                   |
| `ctaBand`          | CTA §11            | heading, body, primaryCta, secondaryCta, variant(primary/accent/soft)             |
| `downloadsBlock`   | Downloads §16      | heading, items(rel→Download hasMany), variant                                     |
| `video`            | Video §13          | video(rel→Media/embed), poster, captions, transcript, title                       |
| `gallery`          | Gallery §12        | images(rel→Media hasMany), variant, lightbox(bool)                                |
| `testimonialBlock` | Testimonials §18   | items(rel→Testimonial hasMany), variant                                           |
| `richTextBlock`    | (RichText)         | content(richText, H2–H4, no raw HTML)                                             |
| `contactBlock`     | Contact §?         | pulls Settings; optional override heading/body                                    |
| `logoStrip`        | (accreditations)   | logos(rel→Media hasMany, alt required)                                            |
| `faqBlock`         | FAQ §4             | faqs(rel→FAQ hasMany) or category filter; emits FAQPage schema                    |

**Block governance:** an allowlist per collection controls which blocks are
available where (e.g. `hero` once, at top). Validation enforces "≥1 block on a Page"
(`09` §1). Each block maps 1:1 to a tested component — no orphan blocks.

---

## 5. Reusable components (shared field groups)

Defined once, imported into many collections/blocks (Payload field arrays / group configs):

| Group               | Fields                                                                                         | Used by                                                                          |
| ------------------- | ---------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------- |
| **seo**             | metaTitle, metaDescription, ogImage(rel→Media), canonicalUrl, noindex, structuredDataType      | Pages, Services, Funding, Resources, News, Events, Policies, Careers (`09` §0.3) |
| **cta**             | label(loc), type(reference\|url), reference(rel) \| url, style(enum: primary/accent/secondary) | Hero, ctaBand, Service, Funding                                                  |
| **link**            | label(loc), type(internal\|external), reference(rel) \| url, newTab(bool)                      | Navigation, Footer, cards                                                        |
| **address**         | street, suburb, state, postcode, geo(point)                                                    | Settings, Event.location                                                         |
| **openingHours**    | day(enum), open, close, closed(bool)                                                           | Settings                                                                         |
| **consentMeta**     | consentOnFile(bool), consentNote                                                               | Media, Testimonial                                                               |
| **publishSchedule** | publishAt, unpublishAt                                                                         | schedulable collections (§15)                                                    |

Centralising these guarantees consistency and one-place updates (Blueprint DRY).

---

## 6. Permissions (access control matrix)

Implemented as Payload **access functions** per collection operation, reading
`user.role`. Maps directly to `09` §0.6 and the lanes.

| Operation ↓ / Role →                                             | Editor  | Marketing            | Care Manager (CCM) | Admin             |
| ---------------------------------------------------------------- | ------- | -------------------- | ------------------ | ----------------- |
| Read (admin)                                                     | content | content              | all                | all               |
| Create/Update **draft** care content                             | ✔       | ✖                    | ✔                  | ✔                 |
| **Publish** care content (Lane A)                                | ✖       | ✖                    | ✔                  | ✔                 |
| Create/**Publish** marketing (Lane B)                            | ✖       | ✔                    | ✔                  | ✔                 |
| Edit **structural** (Globals/Forms/Redirects/Nav/Footer, Lane C) | ✖       | ✖                    | ✖                  | ✔                 |
| Read **Form Submissions**                                        | ✖       | marketing-forms only | ✔                  | ✔                 |
| Export submissions (PII)                                         | ✖       | ✖                    | ✔                  | ✔                 |
| Manage **Media**                                                 | ✔       | ✔                    | ✔                  | ✔                 |
| Delete (soft) / restore version                                  | restore | restore              | restore            | all + hard delete |
| Manage **Users/Roles**                                           | ✖       | ✖                    | ✖                  | ✔                 |

**Field-level access:** PII fields on `formSubmissions` are read-only and
role-gated; `Settings.analyticsIds` Admin-only. **Publish gate** is enforced in
access (`update` where `_status:'published'` requires CCM/Admin for Lane-A
collections) — an Editor literally cannot publish a Service.

---

## 7. Roles

Single source: a `role` field on `users` (extensible to an array for multi-hat staff).

| Role                   | Value          | Scope                                      | Notes                                       |
| ---------------------- | -------------- | ------------------------------------------ | ------------------------------------------- |
| Editor                 | `editor`       | Draft content, media                       | non-technical default (`08` §2)             |
| Marketing              | `marketing`    | Publish News/Events/Testimonials/Gallery   | Lane B                                      |
| Care Manager           | `care-manager` | Approve/publish care & funding & policy    | Lane A gatekeeper (risk R1)                 |
| Administrator          | `admin`        | Everything incl. structural, users, system | Lane C                                      |
| _(future)_ RGHA-scoped | `rgha-*`       | Same model scoped to RGHA site             | `08` §10 — per-site scoping designed in now |

Roles are enum-validated; new staff default to `editor`. Future multi-site adds a
`sites[]` scope field so an RGHA editor can't edit GOCSA content (`10` §19 / `08` §10).

---

## 8. Publishing workflow

Two mechanisms combined:

1. **Payload drafts** (`_status: draft | published`) — the live/draft split.
2. **A `workflowStatus` field** (enum: `draft → in-review → approved → published →
archived`) for the review lane, with `admin.position: sidebar`.

**Flow:**

- Editor works in **draft**; sets `in-review` when ready.
- **Lane A (care):** only **CCM/Admin** can move `approved`→publish (access §6). The
  publish action sets `_status: published`. Editors submitting are blocked from publishing.
- **Lane B (marketing):** Marketing may publish directly (`in-review` optional).
- **Lane C (structural):** Admin only.
- **Archive** = unpublish + create a Redirect stub (`09` §0.5) rather than delete.
- Every transition writes an audit entry (§16) with actor + timestamp.
- `beforeChange` guards illegal transitions (e.g. editor→published on Lane A).

Optional: an admin **dashboard view** listing "In review" items per lane for CCMs
(usability, `08` §7).

---

## 9. Media

`media` **upload collection** with:

- **Storage adapter** — S3-compatible or local, **depends on D4/hosting**; abstracted
  so switching is config-only. GOCSA owns the bucket.
- **Image sizes** generated on upload (thumbnail, card, hero, og 1200×630) +
  **AVIF/WebP**; `focalPoint: true` for responsive cropping (`10`/`11`).
- **`altText` (localized) required** to publish images unless `isDecorative: true` —
  enforced by validation (`09` §0.7, hard gate).
- **`consentOnFile` required** when the asset depicts identifiable people (Brand Kit
  photography rule; conditional field).
- **`usageRefs`** (computed via joins) shown in admin; **delete blocked while in use**.
- Fields: file, title(loc), altText(loc), isDecorative, caption(loc), credit,
  consentMeta, tags. Documents (PDF price lists/policies) live here too, surfaced via
  the `downloads` collection which references them.
- **Accessibility:** admin prompts for good alt text; auto-format/responsive output.
- **Future:** AI alt-text _suggestions_ (human-approved), video assets + transcripts,
  shared RGHA library (`09` §14).

---

## 10. Search

- **Plugin:** `@payloadcms/plugin-search` builds a dedicated `search` collection
  indexing selected fields (title, summary/excerpt, body text, category) across
  Services, Funding, Resources, News, Events, FAQs, Pages, Downloads.
- **Localized index:** separate index entries per locale so EN and EL search return
  locale-correct results; searching in EL never leaks EN-only matches unless intended fallback.
- **Sync:** `afterChange`/`afterDelete` hooks keep the index current; only
  **published, indexable** docs are included (respects `_status`, `noindex`, `showInSearch`).
- **Front-end:** query the search collection with locale + type filters; results
  link to canonical URLs. On-site search is an **Important** feature (`08` §5).
- **Future (Enterprise):** semantic/AI search — the index abstraction allows swapping
  to a vector store later without changing the content model (`08` §5).

---

## 11. Localization

- **Config:** `localization: { locales: ['en','el'], defaultLocale: 'en', fallback: true }`.
- **Field-level:** `localized: true` on the fields marked "Loc" in `09` (per-collection
  list in §1). Shared fields (references, dates, numbers, flags, files) are **not** localized;
  **media alt text/caption are localized**.
- **Slugs localized** → locale-prefixed routing (`/el/...`), unique per collection per locale.
- **Parity tooling:** an admin **"Translation parity" report/view** lists documents
  with missing EL localized fields; each doc shows an **"EL incomplete"** indicator
  (`09` §0.2). Publish allowed with EL gaps but visibly flagged.
- **Front-end fallback:** missing EL value renders EN wrapped in `lang="en"` (SR-correct),
  never an empty region — a safety net, not the goal (parity is).
- **hreflang + localized sitemaps** generated automatically (`09` §0.3).

---

## 12. Versioning

- **Enabled on all content collections + globals** via `versions` with **drafts**.
- **Autosave** (interval ~800ms) so editors never lose work; draft edits don't touch live.
- **Retention (`09` §0.5):** default `maxPerDoc` = greater of 90 days / 50 versions;
  **care & policy collections retain ALL versions** (compliance) — Policies especially.
- **Restore** any version (creates a new version; non-destructive). **Diff view** per
  field. **Draft vs published** are distinct versions.
- **Soft delete only:** delete → archive + redirect stub; **hard delete Admin-only + audited**.

---

## 13. Preview

- **Draft preview:** front-end **draft mode** reads unpublished versions via Payload's
  authenticated draft API; a **"Preview"** button per document opens the draft URL
  (desktop + mobile viewport toggle — `11` acceptance).
- **Live Preview:** `admin.livePreview` configured with URL resolvers per collection
  (e.g. `services/{slug}` → `/{locale}/services/{slug}?draft=1`) for real-time editing.
- **Access:** preview tokens are short-lived and role-checked; drafts never public.
- **Per-locale preview** so editors verify EN and EL renders before publish.

---

## 14. Scheduling

- **Fields:** `publishSchedule` group (`publishAt`, `unpublishAt`) on schedulable
  collections (News, Events, Careers, Pages, Downloads price lists).
- **Mechanism:** a **Payload jobs/queue task** (cron) runs periodically, flipping
  `_status` to `published` at `publishAt` and to unpublished/archived at `unpublishAt`
  (e.g. Careers auto-close after `closingDate`, price lists warn after `effectiveFrom`).
- **Guardrails:** scheduled publish still respects the role/lane that owns the
  collection (a scheduled Service publish requires it was CCM-approved). Timezone
  Australia/Adelaide. Each scheduled action is audit-logged (§16).

---

## 15. Audit logs

- **Content history** is covered by versions (who/when/what per field).
- **Dedicated `auditLogs` collection** (append-only, Admin-read) capturing
  **security- and governance-relevant events** beyond content diffs:
  logins/failures, role/permission changes, publish/unpublish/approve transitions,
  hard deletes, submission exports, settings/global changes, media consent changes.
- **Implementation:** `afterChange`/`afterDelete`/`afterLogin` hooks + access hooks
  write entries `{ actor, action, collection, docId, before/after summary, ip, at }`.
  PII never stored in audit payloads (privacy R9).
- **Retention:** long-lived (compliance); immutable to non-Admins.
- **Why:** governance/continuity (risk R1/R8/R9) and Blueprint §7 accountability value.

---

## Traceability — everything maps back

| Architecture element   | `09` source        | `08` Blueprint                  |
| ---------------------- | ------------------ | ------------------------------- |
| Collections/Globals    | §1–§18 objects     | §6 content types, §4 IA         |
| Blocks                 | §0.9 Section union | §8 design-system mapping        |
| Access/Roles/Lanes     | §0.4, §0.6         | §7 CMS strategy, §2 users       |
| Localization           | §0.2               | §1 vision (cultural bridge), D2 |
| Versioning/Audit       | §0.5               | §7, risk R1                     |
| Media/consent          | §0.7               | Brand Kit photography, R9       |
| Search                 | §?                 | §5 features                     |
| Scheduling/Preview     | §0.4               | §7 usability, §3 journeys J7/J8 |
| Restricted submissions | §16                | R9 privacy                      |

No element exists without a source; no `09` object is unmapped.

---

## Open items this architecture surfaces (config values, not shape)

- **D4/hosting** → media storage adapter + deploy target (S3 bucket ownership).
- **DEC-011** → confirm Payload as the platform (or nominate alternative; concepts port).
- Real **service list** → _content_ to enter, not schema to change.
- **D7** → `Settings.foundingYear` value (1930 vs kit's 1936).

## Definition of Done

An engineer can scaffold the CMS from this: every Collection, Global, Block, shared
field group, relationship (with on-delete behaviour), the role×lane access matrix,
the draft+review publishing workflow, media pipeline with consent/alt gates,
localized search, EN/EL localization with parity tooling, versioning + retention,
preview/live-preview, scheduling jobs, and audit logging — all traceable to `09`
and `08`.

## Recommended next step

Confirm **DEC-011 (Payload)** and **D4 (hosting/storage)**. Then Phase 2
implementation begins with the dependency chain already defined (`11` close):
**compile tokens (`10`) → primitives + component library (`11`) → scaffold this CMS
(`09`/`12`) → 5 key templates → migrate content + redirects.** I recommend we start
by compiling tokens and standing up the CMS collections in parallel, since they're
independent tracks that converge at the templates.
