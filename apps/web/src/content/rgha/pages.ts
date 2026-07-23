/**
 * RGHA Retirement Living — interior page registry (PREVIEW). Fresh living/care pages plus
 * the full policy/procedure set reused (rebranded) from the GOCSA base content, so RGHA
 * carries every policy for the aged-care sector. All links under `/rgha`. DRAFT / confirm-
 * with-client; policies pending RGHA + compliance sign-off.
 */
import type { InteriorPage, PageBlock, PageSource } from "../pages/types";
import { basePages } from "../pages/pages";

const enquire: PageBlock = {
  kind: "cta",
  title: "Come and see for yourself.",
  body: "Book a tour or talk to a real person about living and care at RGHA — there's no pressure, and no cost to ask.",
  primary: { label: "Book a tour", href: "/rgha/contact" },
  secondary: { label: "How it works", href: "/rgha/funding" },
};

const draftNotice: PageBlock = {
  kind: "callout",
  title: "Draft — pending RGHA sign-off",
  body: "This page is a working preview prepared for review. Wording, care detail and any figures must be confirmed by RGHA and, where relevant, reviewed for compliance before publication.",
};

const faqs: PageBlock = {
  kind: "faqs",
  heading: "Your questions",
  items: [
    {
      question: "Can I book a tour before deciding?",
      answer:
        "Yes — we'd love to show you around, in English or Greek, with no obligation. Seeing the community and meeting the team is the best way to know if it's right for you.",
    },
    {
      question: "How do you screen and train your care team?",
      answer:
        "Every member of our team is carefully recruited, reference-checked and police-checked, and completes aged care worker screening, with ongoing training so you receive safe, respectful, quality care.",
    },
    {
      question: "Can my family stay involved?",
      answer:
        "Absolutely. With your consent, we welcome family in decisions, visits and everyday life — many families find this reassuring.",
    },
    {
      question: "How is it funded?",
      answer:
        "Residential aged care is government-subsidised and accessed after a My Aged Care assessment; retirement living is arranged differently. We explain everything in plain language and in writing before anything begins.",
    },
  ],
};

const freshPages: InteriorPage[] = [
  {
    slug: "retirement-living",
    eyebrow: "Retirement living",
    title: "Your own home, in good company",
    lead: "Independent living in a warm, connected community — with lifestyle, wellbeing and support close at hand for whenever you need it.",
    heroImage: { src: "/photos/service-social-support.jpg", alt: "Older residents socialising together outdoors" },
    status: "requires-client-confirmation",
    blocks: [
      {
        kind: "prose",
        body: [
          "Retirement living at RGHA means keeping your independence while shedding the worries — no more home maintenance, and friendly faces and support just around the corner.",
          "It's a genuine community, grounded in culture and care, and open to people of every background — at home in English or Greek.",
        ],
      },
      {
        kind: "checklist",
        heading: "What life here looks like",
        items: [
          { title: "Your own home", description: "Private, comfortable and yours." },
          { title: "Community & friendship", description: "Shared meals, activities and culture." },
          { title: "Support on hand", description: "Help available whenever you want it." },
          { title: "Less to worry about", description: "Maintenance, security and services taken care of." },
        ],
      },
      { kind: "features", heading: "Care that can grow with you", items: [
        { title: "Allied health & nursing", description: "On-site clinical care and wellbeing support.", href: "/rgha/allied-health" },
        { title: "Respite & short-term", description: "A comfortable short stay when you need one.", href: "/rgha/respite" },
        { title: "Residential aged care", description: "Full care, close by, if your needs change.", href: "/rgha/residential-aged-care" },
      ] },
      faqs,
      enquire,
    ],
  },
  {
    slug: "residential-aged-care",
    eyebrow: "Residential aged care",
    title: "Full care, in a place that feels like home",
    lead: "Around-the-clock nursing and personal care in a comfortable, homely setting — with dignity, culture and independence at the centre.",
    heroImage: { src: "/photos/service-nursing.jpg", alt: "A nurse caring for an older resident in a comfortable room" },
    status: "requires-client-confirmation",
    blocks: [
      {
        kind: "prose",
        body: [
          "When more help is needed, residential aged care provides skilled 24-hour nursing and personal care in a warm, homely community — so residents are safe, comfortable and truly cared for.",
          "Care is delivered with respect and cultural understanding, in English or Greek, and shaped around each person's routine and wishes.",
        ],
      },
      {
        kind: "checklist",
        heading: "What's included",
        items: [
          { title: "24-hour nursing & personal care", description: "Skilled care whenever it's needed." },
          { title: "Fresh meals", description: "Nutritious food, including familiar favourites." },
          { title: "Household & laundry", description: "Cleaning and everyday tasks taken care of." },
          { title: "Allied health", description: "Physiotherapy and wellbeing support on site." },
          { title: "Lifestyle & culture", description: "Activities, outings and connection every day." },
          { title: "Family welcome", description: "Loved ones involved and welcome any time." },
        ],
      },
      {
        kind: "steps",
        heading: "Moving in",
        intro: "Residential aged care is accessed through My Aged Care. We guide you through each step.",
        items: [
          { title: "Assessment", description: "An ACAT assessment confirms eligibility for residential care." },
          { title: "Book a tour", description: "Visit us, meet the team and see if it feels right." },
          { title: "Plan the move", description: "We explain costs in plain language and help you prepare." },
          { title: "Welcome home", description: "We help every new resident settle in and belong." },
        ],
      },
      faqs,
      enquire,
    ],
  },
  {
    slug: "respite",
    eyebrow: "Respite & short-term",
    title: "A comfortable short stay",
    lead: "Whether it's planned, after a hospital stay, or to give a carer a break, respite offers a warm, supported stay for as long as you need.",
    heroImage: { src: "/photos/service-respite.jpg", alt: "An older resident resting comfortably" },
    status: "requires-client-confirmation",
    blocks: [
      {
        kind: "prose",
        body: [
          "Respite gives peace of mind — a comfortable room, good food, company and expert care for a short stay, and a real rest for family carers.",
          "It's also a lovely way to experience the community before making any longer-term decisions.",
        ],
      },
      {
        kind: "checklist",
        heading: "When respite helps",
        columns: 2,
        items: [
          { title: "A carer needs a break", description: "Rest and recharge, knowing your loved one is well cared for." },
          { title: "After hospital", description: "Extra support while regaining strength." },
          { title: "Trying us out", description: "Experience the community before deciding." },
          { title: "Planned or short-notice", description: "Flexible stays to suit your family." },
        ],
      },
      enquire,
    ],
  },
  {
    slug: "allied-health",
    eyebrow: "Allied health & nursing",
    title: "Wellbeing, expertly supported",
    lead: "On-site clinical care, physiotherapy and wellbeing support that help residents stay as strong, mobile and independent as possible.",
    heroImage: { src: "/photos/service-personal-care.jpg", alt: "A carer supporting an older resident to walk" },
    status: "requires-client-confirmation",
    blocks: [
      {
        kind: "features",
        heading: "Support on site",
        items: [
          { title: "Nursing care", description: "Skilled clinical care and medication management." },
          { title: "Physiotherapy", description: "Mobility, strength and falls prevention." },
          { title: "Wellbeing", description: "Emotional and social wellbeing support." },
          { title: "Care coordination", description: "Working with your GP and specialists." },
        ],
      },
      enquire,
    ],
  },
  {
    slug: "lifestyle",
    eyebrow: "Lifestyle & wellbeing",
    title: "Every day, something to enjoy",
    lead: "Activities, outings, culture and connection — because a good life is about more than care.",
    heroImage: { src: "/photos/service-transport.jpg", alt: "An older resident enjoying an outing" },
    status: "requires-client-confirmation",
    blocks: [
      {
        kind: "checklist",
        heading: "Life at RGHA",
        items: [
          { title: "Shared meals", description: "Good food and good company." },
          { title: "Activities & outings", description: "Something to look forward to every day." },
          { title: "Culture & faith", description: "Greek culture and traditions, celebrated." },
          { title: "Gardens & spaces", description: "Comfortable places to relax and connect." },
        ],
      },
      enquire,
    ],
  },
  {
    slug: "funding",
    eyebrow: "Funding & access",
    title: "Understanding how it's paid for",
    lead: "Retirement living and residential aged care are funded differently. We explain the pathways in plain language — with no jargon, and no pressure.",
    status: "requires-client-confirmation",
    blocks: [
      {
        kind: "cards",
        heading: "Pathways to a home with us",
        items: [
          { title: "Residential aged care", description: "Government-subsidised care after a My Aged Care assessment.", href: "/rgha/residential-aged-care" },
          { title: "Retirement living", description: "Independent living arrangements, explained clearly.", href: "/rgha/retirement-living" },
          { title: "Respite & short-term", description: "Short stays, whether funded or privately arranged.", href: "/rgha/respite" },
        ],
      },
      {
        kind: "prose",
        heading: "How we help",
        body: [
          "We walk you through the options that apply to your situation, explain any costs and contributions in plain language, and put everything in writing before anything begins.",
          "We never make eligibility or fee promises on the government's behalf — final arrangements depend on your assessment and current program rules.",
        ],
      },
      draftNotice,
      faqs,
      enquire,
    ],
  },
  {
    slug: "about",
    eyebrow: "Who we are",
    title: "Our story",
    lead: "RGHA Retirement Living is backed by the Greek Orthodox Community of South Australia — a community caring for its people since 1930.",
    heroImage: { src: "/photos/heritage.jpg", alt: "Archival photograph of an early Greek Orthodox community gathering" },
    status: "requires-client-confirmation",
    blocks: [
      {
        kind: "prose",
        body: [
          "For generations, the Greek Orthodox Community of South Australia has been a home away from home — a place of faith, language, culture and belonging. RGHA carries that spirit into retirement living and aged care.",
          "We welcome people of every background, and care for each person with dignity, warmth and genuine understanding — in English or Greek.",
        ],
      },
      {
        kind: "checklist",
        heading: "What guides us",
        items: [
          { title: "Dignity & choice", description: "Support that respects independence and preferences." },
          { title: "Community & culture", description: "Friendship, faith and belonging every day." },
          { title: "Expert, kind care", description: "Skilled people who genuinely care." },
          { title: "Honest communication", description: "Plain-language conversations with you and your family." },
        ],
      },
      enquire,
    ],
  },
  {
    slug: "careers",
    eyebrow: "Join our team",
    title: "Careers at RGHA",
    lead: "If you're warm, reliable and want to make a real difference to older South Australians, we'd love to hear from you.",
    status: "draft",
    blocks: [
      {
        kind: "prose",
        body: [
          "We're always interested in meeting compassionate, dependable nurses, carers and lifestyle staff who share our commitment to dignity and cultural respect. Bilingual English/Greek speakers are especially welcome.",
        ],
      },
      { kind: "cta", title: "Interested in working with us?", body: "Send us a message and tell us a little about yourself.", primary: { label: "Get in touch", href: "/rgha/contact" } },
    ],
  },
];

// ── Reuse the full policy/procedure set from the base content, rebranded to RGHA ───────
const REUSE = new Set([
  "resources",
  "policies/privacy",
  "policies/complaints",
  "policies/client-rights",
  "policies/safeguarding",
  "policies/quality",
  "policies/advocacy",
  "policies/code-of-conduct",
  "accessibility",
]);

function rebrandText(s: string): string {
  return s
    .split("GOCSA Community Care")
    .join("RGHA Retirement Living")
    .split("enquire@gocsacommunitycare.com.au")
    .join("enquire@rgha.com.au")
    .split("gocsacommunitycare.com.au")
    .join("rgha.com.au")
    .split("GOCSA")
    .join("RGHA");
}

function prefixHref(href: string): string {
  if (!href.startsWith("/") || href.startsWith("/rgha")) return href;
  return `/rgha${href}`;
}

function deepRebrand<T>(value: T): T {
  if (typeof value === "string") return rebrandText(value) as unknown as T;
  if (Array.isArray(value)) return value.map((v) => deepRebrand(v)) as unknown as T;
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      out[k] = k === "href" && typeof v === "string" ? prefixHref(v) : deepRebrand(v);
    }
    return out as unknown as T;
  }
  return value;
}

const reusedPolicies: InteriorPage[] = basePages
  .filter((p) => REUSE.has(p.slug))
  .map((p) => deepRebrand(p));

const list: InteriorPage[] = [...freshPages, ...reusedPolicies];
const bySlug = new Map(list.map((p) => [p.slug, p]));

export const rghaPageSource: PageSource = {
  getPage: (slug) => bySlug.get(slug),
  allSlugs: () => list.map((p) => p.slug),
};
