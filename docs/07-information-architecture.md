# 07 — Information Architecture (Proposed)

_Status: Phase 1 draft for GOCSA review. Built from confirmed services, the
existing site (gocsacommunitycare.com.au), and the Yellow Door Care model minus
disability. Every page exists in **English and Greek** (Decision D2)._

## Design principle

The existing site is organised around GOCSA's internal structure (programme
names, price lists, downloads). We reorganise around the **visitor's question**:
_"Can you help me / my parent stay safe at home, and how do I start?"_ Programme
names (SAH, CHSP) are explained in plain language, not used as navigation labels
a stressed family won't recognise.

## Top-level navigation (proposed)

1. **Support at Home** — the main in-home aged care offer (the program that
   replaced Home Care Packages from 1 July 2025). What it is, who it's for, what's included.
2. **Our Services** — the à la carte menu (grouped by purpose, below).
3. **How to Get Started** — the single most important journey: My Aged Care →
   assessment → referral to GOCSA. Plain-language, step by step. Primary CTA.
4. **About** — history since 1930/care since 1985, mission, our people, quality & rights.
5. **Community & Groups** — seniors groups, social support, events/news.
6. **Contact** — phone (prominent), enquiry form, address (262 Franklin St, Adelaide).

Persistent: **language toggle EN/EL**, **phone number**, and a **"Start here"** CTA.

## Services, grouped by purpose (the menu)

- **Personal care** — help with daily living, showering, dressing, mobility.
- **In-home nursing & clinical** — nursing, medication support, allied health.
- **Household help** — domestic assistance, cleaning, meal preparation, gardening, home maintenance.
- **Social & wellbeing** — social support, seniors groups, accompanied transport, respite.
- **Specialised** — dementia support, restorative/short-term care, end-of-life pathway, home modifications & equipment.

_(Mirrors Yellow Door's functional grouping; final list confirmed with GOCSA. No disability/NDIS.)_

## Funding pathways (explained, not used as nav)

- **Support at Home (SAH)** — government-funded, post-1 July 2025.
- **CHSP** — entry-level support.
- **Privately funded** — for those not yet assessed or wanting more.
- Each links to **How to Get Started** and current **price lists** (kept in the CMS, downloadable).

## Key page templates to design (not every page)

1. Home
2. Support at Home (pillar/funding explainer)
3. Service detail (one reusable template for all services)
4. How to Get Started (the conversion journey)
5. Contact / enquiry

## Migration notes

- Crawl gocsacommunitycare.com.au; map old URLs → new; 301 redirects; preserve
  anything ranking. Carry over: price lists (SAH/CHSP 2025-26), brochures/policies,
  My Aged Care links, multilingual resource links, FAQs.
- Content requiring GOCSA sign-off before it ships: all service descriptions,
  eligibility, pricing, and My Aged Care guidance (see risk R1).

## Open before this locks

- Confirm the real service list (add/remove vs. above).
- Confirm SAH vs. any remaining Home Care Package messaging during transition.
- Confirm housing (the old site had a "Housing" item — is that in scope here or RGHA?).
