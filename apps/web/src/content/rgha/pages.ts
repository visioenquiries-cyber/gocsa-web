/**
 * Ridleyton Greek Home for the Aged (RGHA) — interior page registry (PREVIEW). Fresh pages
 * for the Home's three departments plus respite/about/funding/careers, and the full
 * policy/procedure set reused (rebranded) from the GOCSA base content. All links under
 * `/rgha`. Original copy (facts from rgha.com.au); DRAFT / confirm-with-client.
 */
import type { InteriorPage, PageBlock, PageSource } from "../pages/types";
import { basePages } from "../pages/pages";
import { rghaGalleryImages, rghaShowroom } from "./homepage";

const enquire: PageBlock = {
  kind: "cta",
  title: "Enquire about a place.",
  body: "Talk to our admissions team about respite or permanent residential care at Ridleyton — there's no pressure, and no cost to ask.",
  primary: { label: "Enquire about a place", href: "/rgha/contact" },
  secondary: { label: "Fees & funding", href: "/rgha/funding" },
};

const faqs: PageBlock = {
  kind: "faqs",
  heading: "Your questions",
  items: [
    {
      question: "How do I enquire about a place?",
      answer:
        "Email admissions@rgha.com.au or give us a call. We'll talk through your needs — respite or permanent — and the next steps, in English or Greek.",
    },
    {
      question: "Do you offer respite as well as permanent care?",
      answer:
        "Yes. The Home is staffed for a variety of care levels and offers both short respite stays and permanent residential aged care.",
    },
    {
      question: "Is the Home Greek-speaking?",
      answer:
        "Our team is largely Greek-speaking and ingrained in the life of the Home — from care to the kitchen. Everyone is welcome, whatever their background.",
    },
    {
      question: "How is it funded?",
      answer:
        "Residential aged care is government-subsidised and accessed after a My Aged Care (ACAT) assessment. We explain any accommodation and care fees clearly and in writing before you decide.",
    },
  ],
};

const freshPages: InteriorPage[] = [
  {
    slug: "gallery",
    eyebrow: "Photo gallery",
    title: "Take a look inside — and out",
    lead: "A glimpse of Ridleyton Greek Home for the Aged: bright apartments and bedrooms, warm lounges and dining, and gardens to enjoy.",
    status: "requires-client-confirmation",
    seo: { description: "Photo gallery of Ridleyton Greek Home for the Aged — interiors, living areas and gardens." },
    blocks: [
      { kind: "showroom", eyebrow: "Virtual showroom", spaces: rghaShowroom },
      { kind: "gallery", heading: "Browse the gallery", images: rghaGalleryImages },
      {
        kind: "callout",
        title: "These are representative images",
        body: "The photos shown are representative placeholders in the home's style. Real photography of Ridleyton — inside and out — will replace them; please provide the home's images to feature here.",
      },
      enquire,
    ],
  },
  {
    slug: "residential-care",
    eyebrow: "Residential Care · Ιδρυματική Φροντίδα",
    title: "Residential care that feels like home",
    lead: "A 120-bed home in Adelaide, staffed for a variety of care levels — so care can adapt as needs change, without leaving the place you know.",
    heroImage: { src: "/photos/service-nursing.jpg", alt: "A nurse caring for a resident in a comfortable room" },
    status: "requires-client-confirmation",
    blocks: [
      {
        kind: "prose",
        body: [
          "Ridleyton Greek Home for the Aged provides skilled 24-hour nursing and personal care in a warm, homely community — so residents are safe, comfortable and truly cared for.",
          "With 120 beds across a range of care levels, we can support people whether they need a little help or full high-level care, and adjust as things change over time.",
        ],
      },
      {
        kind: "checklist",
        heading: "What's included",
        items: [
          { title: "24-hour nursing & personal care", description: "Skilled care whenever it's needed." },
          { title: "A variety of care levels", description: "From lower-level support to full high care." },
          { title: "Greek-speaking team", description: "Care delivered in English or Greek." },
          { title: "Fresh meals & hotel services", description: "Cooking, cleaning and laundry taken care of." },
          { title: "Lifestyle & activities", description: "A full program of things to enjoy every day." },
          { title: "Family welcome", description: "Loved ones involved and welcome any time." },
        ],
      },
      {
        kind: "steps",
        heading: "Coming to the Home",
        intro: "Residential aged care is accessed through My Aged Care. We guide you through each step.",
        items: [
          { title: "Get in touch", description: "Email admissions@rgha.com.au to start the conversation." },
          { title: "Assessment", description: "An ACAT assessment confirms eligibility for residential care." },
          { title: "Visit us", description: "Come and see the Home and meet the team." },
          { title: "Welcome home", description: "We help every new resident settle in and belong." },
        ],
      },
      faqs,
      enquire,
    ],
  },
  {
    slug: "leisure-lifestyle",
    eyebrow: "Leisure & Lifestyle · Ελεύθερος Χρόνος και Τρόπος Ζωής",
    title: "A full life, every day",
    lead: "Our mostly Greek-speaking Leisure and Lifestyle team fill each day with activities, culture and company — because a good life is about more than care.",
    heroImage: { src: "/photos/service-social-support.jpg", alt: "Residents enjoying an activity together" },
    status: "requires-client-confirmation",
    blocks: [
      {
        kind: "prose",
        body: [
          "Life at Ridleyton is warm and social. Our Leisure and Lifestyle team — largely Greek-speaking — know each resident, and shape activities around what people love.",
          "From music and dancing to craft, outings, faith and celebration, there's always something to look forward to.",
        ],
      },
      {
        kind: "checklist",
        heading: "What's on",
        items: [
          { title: "Culture & celebration", description: "Greek music, dancing, festivals and traditions." },
          { title: "Activities & craft", description: "A varied program to suit every interest." },
          { title: "Outings", description: "Trips out into the community." },
          { title: "Faith & connection", description: "Greek Orthodox faith and fellowship." },
        ],
      },
      enquire,
    ],
  },
  {
    slug: "hotel-services",
    eyebrow: "Hotel Services · Υπηρεσιών Ξενοδοχείου",
    title: "Wonderful food, and a home well kept",
    lead: "Our experienced, Greek-speaking Hotel Services team look after catering, cleaning and laundry — and, honestly, they make wonderful food.",
    heroImage: { src: "/photos/service-household-help.jpg", alt: "Fresh Greek food prepared in the Home's kitchen" },
    status: "requires-client-confirmation",
    blocks: [
      {
        kind: "prose",
        body: [
          "Good food is at the heart of Greek life, and it's at the heart of the Home. Our kitchen team prepare fresh, familiar meals that residents genuinely look forward to.",
          "Alongside the kitchen, our Hotel Services team keep the Home clean, comfortable and welcoming, so residents and families can simply enjoy being here.",
        ],
      },
      {
        kind: "checklist",
        heading: "Looking after everything",
        columns: 2,
        items: [
          { title: "Fresh Greek cooking", description: "Familiar, home-style meals every day." },
          { title: "Dietary needs met", description: "Meals tailored to health and preferences." },
          { title: "Housekeeping", description: "A clean, comfortable home, always." },
          { title: "Laundry", description: "Personal laundry taken care of with care." },
        ],
      },
      enquire,
    ],
  },
  {
    slug: "respite",
    eyebrow: "Respite care",
    title: "A comfortable short stay",
    lead: "Whether it's planned, after a hospital stay, or to give a carer a break, respite at Ridleyton offers a warm, supported stay for as long as you need.",
    heroImage: { src: "/photos/service-respite.jpg", alt: "A resident resting comfortably" },
    status: "requires-client-confirmation",
    blocks: [
      {
        kind: "prose",
        body: [
          "Respite gives peace of mind — a comfortable room, good food, company and expert Greek-speaking care for a short stay, and a real rest for family carers.",
          "It's also a lovely way to get to know the Home before considering a permanent place.",
        ],
      },
      {
        kind: "checklist",
        heading: "When respite helps",
        columns: 2,
        items: [
          { title: "A carer needs a break", description: "Rest, knowing your loved one is well cared for." },
          { title: "After hospital", description: "Extra support while regaining strength." },
          { title: "Getting to know us", description: "Experience the Home before deciding." },
          { title: "Planned or short-notice", description: "Flexible stays to suit your family." },
        ],
      },
      enquire,
    ],
  },
  {
    slug: "about",
    eyebrow: "Who we are",
    title: "About the Home",
    lead: "Ridleyton Greek Home for the Aged is a Greek residential aged-care home in Adelaide — a place of care, culture and community for older South Australians.",
    heroImage: { src: "/photos/heritage.jpg", alt: "Archival photograph of the Greek community in South Australia" },
    status: "requires-client-confirmation",
    blocks: [
      {
        kind: "prose",
        body: [
          "For the Greek community of South Australia, growing older should mean being cared for among your own — in your language, with your food, faith and traditions close at hand. That's what the Home is for.",
          "We welcome people of every background, and care for each resident with dignity, warmth and genuine understanding.",
        ],
      },
      {
        kind: "checklist",
        heading: "What guides us",
        items: [
          { title: "Dignity & respect", description: "Every resident treated with kindness." },
          { title: "Culture & language", description: "Greek language, faith and traditions, honoured daily." },
          { title: "Expert, caring team", description: "Skilled people, ingrained in the life of the Home." },
          { title: "Family & community", description: "Loved ones part of everyday life." },
        ],
      },
      enquire,
    ],
  },
  {
    slug: "funding",
    eyebrow: "Fees & funding",
    title: "Understanding how it's paid for",
    lead: "Residential aged care is government-subsidised and accessed through My Aged Care. We explain fees and funding in plain language — with no jargon, and no pressure.",
    status: "requires-client-confirmation",
    blocks: [
      {
        kind: "cards",
        heading: "Ways to a place at the Home",
        items: [
          { title: "Permanent care", description: "Government-subsidised care after a My Aged Care (ACAT) assessment.", href: "/rgha/residential-care" },
          { title: "Respite care", description: "Short stays, whether government-funded or privately arranged.", href: "/rgha/respite" },
          { title: "Fees explained", description: "Accommodation and care fees set out clearly before you decide.", href: "/rgha/contact" },
        ],
      },
      {
        kind: "prose",
        heading: "How we help",
        body: [
          "We walk you through the options that apply to your situation, explain any accommodation and care fees in plain language, and put everything in writing before anything begins.",
          "We never make eligibility or fee promises on the government's behalf — final arrangements depend on your assessment and current program rules.",
        ],
      },
      faqs,
      enquire,
    ],
  },
  {
    slug: "careers",
    eyebrow: "Join our team",
    title: "Careers at Ridleyton",
    lead: "If you're warm, reliable and want to make a real difference to older South Australians, we'd love to hear from you.",
    status: "draft",
    blocks: [
      {
        kind: "prose",
        body: [
          "We're always interested in meeting compassionate, dependable nurses, carers, lifestyle and kitchen staff who share our commitment to dignity and culture. Greek-speaking applicants are especially welcome.",
        ],
      },
      { kind: "cta", title: "Interested in working with us?", body: "Send us a message and tell us a little about yourself.", primary: { label: "Get in touch", href: "/rgha/contact" } },
    ],
  },
];

// ── Reuse the full policy/procedure set from the base content, rebranded to Ridleyton ──
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
    .join("Ridleyton Greek Home for the Aged")
    .split("Level 1/262 Franklin Street, Adelaide SA 5000")
    .join("the Home in Ridleyton, South Australia")
    .split("admin@gocsacc.org.au")
    .join("admissions@rgha.com.au")
    .split("enquire@gocsacommunitycare.com.au")
    .join("admissions@rgha.com.au")
    .split("gocsacommunitycare.com.au")
    .join("rgha.com.au")
    .split("GOCSA")
    .join("Ridleyton Greek Home for the Aged");
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
