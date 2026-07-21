# 08 — Product Blueprint (Master Specification)

_The master specification bridging the Brand System and Engineering. Design and
Engineering both follow this document. Grounded in: Brand Guidelines V1 (`01`),
the proposed IA (`07`), and confirmed decisions (`06`). Status: Phase 1, for GOCSA review._

> **Scope reminder.** GOCSA Community Care = in-home **aged care** (Support at
> Home, CHSP, private), modelled on the Yellow Door service menu **minus
> disability/NDIS**. Full **English + Greek**. Maintained by **non-technical GOCSA
> staff**. Replaces **gocsacommunitycare.com.au**. RGHA Retirement Living inherits
> this foundation later.

---

## 1. Product Vision

**What it is:** the trusted digital front door to Greek-Australian aged care in
South Australia — a bilingual platform that helps older people stay safe and well
at home, and helps their families make an anxious decision with confidence.

**Beyond a website.** Over five years this becomes:

- **A trust instrument.** For most families, this site is the first and most
  scrutinised proof that GOCSA can be trusted with someone they love. Its job is
  to convert quiet anxiety into a confident first phone call.
- **A cultural bridge.** The only aged-care platform in SA that treats Greek as a
  first-class language, not a translation — meeting the community where it is,
  across generations.
- **A navigation aid through a confusing system.** Australian aged care (My Aged
  Care, Support at Home, CHSP) is bewildering. GOCSA's platform explains the
  pathway in plain language and positions GOCSA as the calm guide through it.
- **An operational asset.** Editable by staff, it reduces dependence on
  developers, keeps price lists and policies current, and supports recruitment,
  events, and community engagement.
- **The foundation of an ecosystem.** The design system, content architecture,
  and infrastructure built here are inherited by **RGHA Retirement Living** and
  any future GOCSA digital property — one system, many front doors.

**Five-year success looks like:** a family finds the right service and starts an
enquiry within a minute, in English or Greek, on a phone; GOCSA staff keep the
site current without a developer; the platform ranks for local aged-care intent
and measurably grows qualified enquiries; and RGHA launches on the same rails at
a fraction of the cost.

**North-star metric:** _qualified enquiries started_ (calls + completed enquiry
forms from in-catchment users). Everything else is a supporting signal.

---

## 2. User Groups

### External (audiences we serve)

| User                                                  | Who they are                                                        | Primary goal                                              | What they need from us                                                                |
| ----------------------------------------------------- | ------------------------------------------------------------------- | --------------------------------------------------------- | ------------------------------------------------------------------------------------- |
| **Prospective client (older person)**                 | 70+, wants to stay home, may prefer Greek, lower digital confidence | Understand help available and feel safe asking            | Large legible text, plain language, a phone number always in reach, Greek             |
| **Adult child / family decision-maker**               | 40–60, time-poor, anxious, researching for a parent                 | Quickly judge if GOCSA is trustworthy and how to start    | Fast scannable answers, credibility signals, clear "how to get started", enquiry form |
| **Existing client & their family**                    | Already receiving care                                              | Manage relationship, find price lists, policies, contacts | Easy access to documents, contacts, news; reassurance                                 |
| **Carers / support workers (external)**               | Helping a client navigate options                                   | Compare and refer                                         | Clear service detail, funding explainers, referral info                               |
| **Referrers (GPs, hospital discharge, My Aged Care)** | Professionals sending clients                                       | Confirm GOCSA suits their patient/client                  | Credentials, coverage area, services, direct contact                                  |
| **Greek-speaking community member**                   | Prefers Greek across generations                                    | Everything above, in Greek                                | True EN/EL parity, culturally resonant tone                                           |
| **Job seeker**                                        | Looking for care/admin roles                                        | Find and apply for a role                                 | Careers list, role detail, simple apply/contact                                       |
| **Volunteer / donor / broader community**             | Engaged with GOCSA                                                  | Participate, attend, give                                 | Events, news, ways to help                                                            |

### Internal (people who run the platform)

| User                            | Role                                      | Goal                                           | Needs                                               |
| ------------------------------- | ----------------------------------------- | ---------------------------------------------- | --------------------------------------------------- |
| **Content Editor**              | Community Care admin staff, non-technical | Update services, prices, news, policies safely | Friendly CMS, guardrails, bilingual fields, preview |
| **Community Care Manager**      | Owns service accuracy                     | Ensure care content is correct & compliant     | Approval/publish control, review workflow           |
| **Marketing / Comms**           | Runs news, events, campaigns, social      | Publish timely content on-brand                | Media library, news/events tools, brand components  |
| **Administrator**               | GOCSA IT / senior admin                   | Manage users, integrity, continuity            | Roles & permissions, audit, backups                 |
| **Executive / Board**           | Governance                                | Confidence the platform reflects GOCSA well    | Reporting, analytics summaries                      |
| **Future RGHA team**            | Retirement Living                         | Launch RGHA on shared foundation               | Inherited CMS, design system, infra                 |
| **Developer / maintainer (us)** | Build & evolve                            | Ship and maintain safely                       | Docs, design tokens, component library, CI          |

---

## 3. User Journeys

_Decision points marked ◇. Every journey must work one-handed on a mid-range
phone, in EN or EL, with the phone number always reachable._

**J1 — Worried adult child, from Google to enquiry (the primary journey).**
Search "home care Adelaide Greek" → lands on a **Service** or **Support at Home**
page (not necessarily the homepage) → ◇ _"Is this credible?"_ (trust signals,
values, real photos) → **How to Get Started** explains My Aged Care → Support at
Home in plain language → ◇ _"Am I eligible / what will it cost?"_ (funding
explainer + price list) → ◇ _"Call now or enquire?"_ → **Enquiry form** or **phone**.
_Failure risks:_ jargon walls, no clear next step, form too long.

**J2 — Older person, homepage to phone call.**
Homepage → ◇ _"Can they help me stay home?"_ → **Support at Home** overview →
reassurance + services → **phone** (dominant, persistent). Short path by design.

**J3 — Resource download to consultation.**
Any page → downloads a **price list / brochure / funding guide** → ◇ leaves, or
returns → nurtured by clarity → **enquiry**. (We capture nothing intrusive; a
download is not gated. Optional: offer a callback.)

**J4 — Greek-preferring user.**
Any entry → ◇ notices/needs Greek → **language toggle** (persistent, obvious) →
entire journey continues in Greek with equal quality → enquiry in Greek, routed
to a Greek-speaking staff member.

**J5 — Referrer (GP / hospital / assessor).**
Direct or search → **About / Services / coverage** → ◇ _"Do they cover my
patient's area & needs?"_ → **contact / referral** info. Values speed and credibility.

**J6 — Job seeker.**
**Careers** → role detail → ◇ _"Do I qualify / how to apply?"_ → apply or contact.

**J7 — Staff content editing (internal).**
Staff login → CMS dashboard → edit **Service** (e.g. update SAH price list) →
◇ edit EN, then EL → **Preview** → ◇ _submit for approval_ → Community Care
Manager reviews → **Publish** → live + cache updates. _Guardrails:_ can't break
layout, can't delete structural pages, changes are versioned/reversible.

**J8 — Marketing publishing news/event.**
Login → create **News Article / Event** → add media from library → set EN/EL →
preview → publish → appears in listings, homepage feed, and (future) social.

---

## 4. Information Architecture

Extends `07`. Reorganised around the visitor's question, not GOCSA's internal
programme names. Every page exists in EN + EL.

```
Home                          Trust + orient + fastest path to "start" and to phone
│
├─ Support at Home            The main in-home aged care offer (post-1 Jul 2025)
│   └─ (funding explainer)    What SAH is, who it's for, what's included
│
├─ Our Services              The à-la-carte menu, grouped by purpose
│   ├─ Personal care
│   ├─ In-home nursing & clinical
│   ├─ Household help
│   ├─ Social & wellbeing
│   └─ Specialised (dementia, restorative, end-of-life, home mods)
│        (each = one reusable Service template)
│
├─ How to Get Started        THE conversion journey: My Aged Care → assessment → GOCSA
│   ├─ Funding pathways       SAH · CHSP · Private (plain-language, with price lists)
│   └─ FAQs
│
├─ About                     Credibility engine
│   ├─ Our Story (since 1930 / care since 1985)
│   ├─ Mission & Values
│   ├─ Our People / Team
│   ├─ Quality & Rights       (advocacy/ARAS, complaints, standards)
│   └─ Policies & Brochures   (downloads)
│
├─ Community & Groups        Seniors groups, social support, events, news
│   ├─ News
│   └─ Events
│
├─ Careers                   Recruitment
│
└─ Contact                   Phone (prominent), enquiry form, address, map, hours

Utility (persistent): Language toggle EN/EL · Phone · "Start here" CTA · Search
Footer: quick links, acknowledgement of country, accreditations, privacy, contact
System pages: 404, search results, privacy policy, accessibility statement
```

**Why the grouping works:** _funding pathways_ (the confusing part) are explained
where families look for them but never become navigation labels; _services_ answer
"what help can I get"; _About_ carries trust; _How to Get Started_ is the single
spine that every persuasive page points to.

**Scalability:** the tree supports growth without restructure — new services are
new entries in one template; News/Events scale as collections; a future
**Resources hub** and **Media library** slot under existing branches; **RGHA**
becomes a sibling site sharing components, not a new section here.

---

## 5. Feature Inventory

**Core** (launch-blocking) · **Important** (launch or fast-follow) · **Future**
(post-launch roadmap) · **Enterprise** (ecosystem-scale, likely with RGHA).

| Feature                                      | Class          | Notes                                 |
| -------------------------------------------- | -------------- | ------------------------------------- |
| Services (structured, templated)             | **Core**       | The product's spine                   |
| Support at Home / funding explainers         | **Core**       | Plain-language, current               |
| How to Get Started journey                   | **Core**       | Primary conversion path               |
| Enquiry / contact forms                      | **Core**       | Privacy-safe, routed by language      |
| Downloads (price lists, policies, brochures) | **Core**       | Versioned in CMS                      |
| Multilingual EN/EL                           | **Core**       | First-class, not add-on (D2)          |
| Persistent phone / "Start here" CTA          | **Core**       | Always reachable                      |
| FAQs                                         | **Core**       | Reduces enquiry friction              |
| About / Team / Quality & Rights              | **Core**       | Trust                                 |
| News                                         | **Important**  | Freshness, SEO, community             |
| Events                                       | **Important**  | Community engagement                  |
| Search (on-site)                             | **Important**  | Findability as content grows          |
| Careers                                      | **Important**  | Recruitment need is real in aged care |
| Media library (images/docs)                  | **Important**  | Editor efficiency, reuse              |
| Testimonials                                 | **Important**  | Trust (with consent)                  |
| Analytics & enquiry tracking                 | **Important**  | Prove the north-star metric           |
| SEO system (metadata, schema.org, redirects) | **Important**  | Migration + growth                    |
| Accessibility statement & tooling            | **Important**  | Obligation + audience                 |
| Policies hub                                 | **Important**  | Compliance surface                    |
| Gallery / video                              | **Future**     | Community storytelling                |
| Resources hub                                | **Future**     | Consolidated guides/downloads         |
| Newsletter / email capture                   | **Future**     | Nurture                               |
| Callback request                             | **Future**     | Lower-friction conversion             |
| Page builder (flexible sections)             | **Future**     | Editor autonomy for new pages         |
| Staff portal / authenticated area            | **Future**     | Beyond editing — client/staff         |
| AI-assisted / semantic search                | **Enterprise** | When content volume justifies         |
| Client/family portal                         | **Enterprise** | Care plans, documents (big scope)     |
| Shared multi-site CMS (GOCSA + RGHA)         | **Enterprise** | Ecosystem                             |
| Shared authentication (SSO)                  | **Enterprise** | Ecosystem                             |
| Shared analytics across properties           | **Enterprise** | Ecosystem                             |
| Donations / payments                         | **Enterprise** | Only if GOCSA wants it                |

---

## 6. Content Model Planning

_Every content object the platform needs. Purpose + key relationships only — no
schema yet. All translatable objects carry EN + EL. "Singleton" = one instance._

| Content type                  | Purpose                                                 | Key relationships                                             |
| ----------------------------- | ------------------------------------------------------- | ------------------------------------------------------------- |
| **Page**                      | Flexible standard page (About subpages, static content) | Built from Sections; SEO fields                               |
| **Service**                   | One care service                                        | belongs to a Service Group; links Funding Pathways, FAQs, CTA |
| **Service Group**             | Purpose-based grouping (Personal care, Household…)      | has many Services                                             |
| **Funding Pathway**           | SAH / CHSP / Private explainer                          | links Downloads (price lists), FAQs                           |
| **FAQ**                       | Single Q&A                                              | tagged to Service / Funding / general                         |
| **Team Member**               | Staff/clergy profile                                    | optional link to Service/Group                                |
| **News Article**              | News post                                               | author (Team Member), media, tags                             |
| **Event**                     | Community event                                         | date/location, media, RSVP/contact                            |
| **Policy**                    | Governance/compliance document                          | Download file; category                                       |
| **Download / Document**       | Any downloadable asset (price list, brochure)           | referenced by Service/Funding/Policy; versioned               |
| **Testimonial**               | Client/family quote (with consent)                      | optional link to Service                                      |
| **Gallery**                   | Image collection                                        | media items                                                   |
| **Video**                     | Embedded/hosted video                                   | poster image, transcript (a11y)                               |
| **Funding Guide / Resource**  | Longer explainer/guide                                  | related Services, Downloads                                   |
| **Media Asset**               | Image/file in the library                               | alt text (EN/EL), consent flag, usage                         |
| **Navigation** (singleton)    | Menus (header/footer)                                   | ordered links                                                 |
| **Site Settings** (singleton) | Phone, address, hours, social, acknowledgement          | global                                                        |
| **Redirect**                  | Old→new URL map (migration)                             | —                                                             |
| **Enquiry submission**        | Captured form data                                      | routed by language; privacy-controlled, not public content    |

**Cross-cutting fields (most types):** title, slug, SEO (title/description/OG),
language variant, status (draft/in-review/published), publish/updated dates,
author, and — for care content — a "requires manager approval" flag.

---

## 7. CMS Strategy

**Principle:** the CMS is a product for a non-technical, possibly bilingual staff
member under time pressure. If they can't confidently update a price list in two
minutes, we've failed — regardless of how the public site looks.

**Editor experience:**

- **Structured, not a blank canvas.** Editors fill labelled fields (name, price,
  description) — they cannot break layout, spacing, or brand. The brand system
  enforces itself.
- **Bilingual side-by-side.** Each translatable field shows EN and EL together,
  with a clear "EL missing" indicator so parity gaps are visible.
- **Live preview** before publishing, on desktop and mobile.
- **Plain-language labels & help text.** No developer jargon; inline guidance
  ("This appears on the Support at Home page").
- **Reusable references, not copy-paste.** A price list lives once as a Download
  and is referenced everywhere; update once, updates everywhere.
- **Media library** with required alt text (accessibility) and consent flags
  (photography rule from Brand Kit).
- **Versioning & undo.** Every change is reversible; nothing is truly deleted
  without an admin.

**Roles & permissions (proposed):**

| Role                       | Can do                                                                              | Cannot do                                                   |
| -------------------------- | ----------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| **Editor** (admin staff)   | Create/edit content, submit for approval, upload media                              | Publish care content, delete structural pages, manage users |
| **Community Care Manager** | All Editor + approve/publish **care** content (services, funding, prices, policies) | Manage users/system settings                                |
| **Marketing**              | Create/publish News, Events, Gallery, Testimonials                                  | Edit/publish care/funding content without manager approval  |
| **Administrator**          | Manage users, roles, settings, redirects, restore/delete                            | —                                                           |
| **(Future) RGHA roles**    | Same model scoped to the RGHA site                                                  | Cross-site edits unless granted                             |

**Workflow:** Draft → In review → Approved/Published. **Care and funding content
always passes through a Community Care Manager** (risk R1: accuracy/compliance).
News/Events can be a lighter lane for Marketing.

**Guardrails that protect non-technical staff:** required fields, validation
(e.g. a price must be a number, a link must resolve), no raw HTML, no ability to
alter global styles, and clear draft-vs-live states so nothing is published by accident.

---

## 8. Design System Mapping

Connects Brand Kit V1 (`01`) to the future component library. **Not designed
here** — this is the inventory and the rules each component inherits.

**Foundations (tokens, from `01`):** colour (Greek Blue primary / Aegean Sky /
Heritage Gold accent / Charcoal ink / Warm White / Soft Grey), type (Playfair
Display + Inter, base 16–18px), spacing scale, radius, elevation, motion
(purposeful, honours `prefers-reduced-motion`), the Greek-key meander as a fine accent.

**Primitives:** Button (primary = Greek Blue/white; accent = Gold/**Charcoal**
text per DEC-007; secondary), Link, Input/Textarea/Select, Checkbox/Radio, Tag/Chip,
Badge, Icon (2px outline), Breadcrumb, Language toggle, Pagination.

**Page sections / patterns (map to the blueprint):**

| Component                      | Used by                          | Brand/accessibility note                                   |
| ------------------------------ | -------------------------------- | ---------------------------------------------------------- |
| **Hero**                       | Home, pillar pages               | Real photography + scrim; headline Playfair; one clear CTA |
| **Split Layout**               | Service/About content            | Text + image; readable measure                             |
| **Feature Cards**              | Services menu, funding options   | Consistent card system on Soft Grey                        |
| **Statistics**                 | About, trust moments             | Gold for key numbers (accent, not text-critical)           |
| **Timeline**                   | Our Story (since 1930)           | Heritage storytelling                                      |
| **Accordion**                  | FAQs, service details            | Keyboard-accessible, ARIA                                  |
| **CTA band**                   | Every page → "Get Started"/phone | Greek Blue; persistent intent                              |
| **Downloads**                  | Price lists, policies, brochures | Clear file type/size; versioned                            |
| **Video**                      | Community/story                  | Poster + captions/transcript                               |
| **Gallery**                    | Community & events               | Alt text required                                          |
| **Testimonials**               | Trust                            | With consent; attributed                                   |
| **Policy Layout**              | Policies hub                     | Long-form legibility, ToC                                  |
| **Forms**                      | Enquiry, careers, callback       | Privacy-safe, short, error-clear, EN/EL                    |
| **Contact block**              | Contact, footer                  | Phone dominant, map, hours                                 |
| **News/Event list & detail**   | Community                        | Filterable, dated                                          |
| **Navigation (header/footer)** | Global                           | Language toggle, phone, Start CTA                          |

Every component ships **accessible and bilingual by construction** — that is the
component contract, not a later QA pass.

---

## 9. Engineering Strategy

**Approach:** build the **design system first**, then compose pages from it. Server-
rendered for SEO and speed; a friendly headless/structured CMS (Option A, DEC-001/
D1) feeding it; i18n wired from the first component (D2).

**Dependencies (order matters):**

1. Confirmed IA + content model (this doc) → 2. Design tokens (from Brand Kit) →
2. Component library → 4. CMS schema mirroring the content model → 5. Page
   templates composed from components + CMS → 6. Content migration + SEO/redirects →
3. Forms + analytics → 8. QA (a11y/perf/compliance) → launch.

**Reusable systems to build once (and hand to RGHA):**

- Design tokens + component library (the biggest reuse lever).
- Content model + CMS configuration.
- i18n framework (EN/EL) and language routing.
- Forms + privacy-safe submission handling.
- SEO system (metadata, schema.org for LocalBusiness/aged care, sitemaps, redirects).
- Analytics + enquiry event tracking (north-star metric).

**Risks (see `03` for the full register; engineering-specific here):**

- Retrofitting i18n or accessibility later → build both in from component #1.
- CMS modelled before content model is agreed → this doc must be approved first.
- Migration losing SEO → crawl + redirect map before switchover.
- Over-heavy media/motion hurting slow-phone users → performance budget as a CI gate.
- Building pages before the system → enforce "component first."

**Recommended implementation order (maps to `04` phases):** tokens → primitives →
key page sections → 5 key templates (Home, Support at Home, Service, How to Get
Started, Contact) → CMS integration → migrate → forms/analytics → QA → launch.
Ship the 5 templates before the long tail of pages.

---

## 10. Future Ecosystem

The architecture is deliberately built so **RGHA Retirement Living** and future
GOCSA properties launch on shared rails, not rebuilds.

- **Shared design system & component library.** One token set + one component
  library, themeable per brand. RGHA gets its own identity by swapping tokens, not
  rebuilding components. _(Design for this now: keep tokens brand-scoped.)_
- **Shared CMS (multi-site).** One CMS instance hosting multiple sites/spaces with
  a shared content model; RGHA reuses Service/News/Event/Team types with its own content.
- **Shared authentication (SSO).** One identity layer for staff across GOCSA
  properties; role model already designed to scope by site (§7). Enterprise-tier.
- **Shared analytics.** One analytics account/schema so GOCSA sees performance
  across properties with a consistent north-star definition.
- **Shared branding, distinct identities.** GOCSA and RGHA share structure, quality
  bar, and accessibility contract; each keeps its own palette/voice via tokens.
- **Shared infrastructure & CI.** Same hosting pattern, same accessibility/perf
  gates, same deployment runbook — RGHA inherits operational maturity.

**Design implications to honour now (so the future is cheap):** brand-scoped
tokens (not hardcoded colours), a content model general enough for RGHA, i18n as a
platform capability, and permissions modelled per-site from day one.

---

## Recommended next phase (before any implementation)

With this Blueprint approved, the next logical step is **not** to build the CMS or
components — it is to **finalise the two specifications this Blueprint points at**:

1. **Content Model Specification** — turn §6 into exact field-level definitions
   (field names, types, required/optional, EN/EL, relationships, validation) for
   every content type. This is the contract the CMS schema and the components both
   implement.
2. **Design Token Specification** — turn Brand Kit V1 + §8 foundations into a
   formal token set (named values for colour, type scale, spacing, radius, motion),
   brand-scoped so RGHA can later re-theme.

Do these two together (they're complementary and both derive from approved
foundations), get GOCSA sign-off, **and resolve D4–D9**. _Only then_ does Phase 2
implementation (tokens → components → CMS schema) begin.

**My recommendation:** approve/adjust this Blueprint, then let me draft the
**Content Model Specification** first — it's the piece everything else (CMS,
components, migration) depends on.
