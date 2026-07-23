/**
 * Interior-page registry (DRAFT for client review). Original copy for GOCSA Community Care,
 * grounded in the public Australian aged-care framework — not copied from any third party.
 * Policies are scaffolds pending GOCSA + compliance sign-off (marked `draft`).
 */
import type { InteriorPage, PageBlock, PageSource } from "./types";

const enquire: PageBlock = {
  kind: "cta",
  title: "Not sure where to begin?",
  body: "Talk to a real person about care for yourself or someone you love. There's no pressure, and no cost to ask.",
  primary: { label: "Speak with our team", href: "/contact" },
  secondary: { label: "How to get started", href: "/how-to-get-started" },
};

const draftNotice: PageBlock = {
  kind: "callout",
  title: "Draft — pending GOCSA sign-off",
  body: "This page is a working draft prepared for review. Wording, policy detail and any figures must be confirmed by GOCSA and, where relevant, reviewed for compliance before publication.",
};

/** Consistent scaffold for a policy / your-rights page (draft). */
function policyPage(
  slug: string,
  title: string,
  lead: string,
  covers: { title: string; description: string }[],
  intro: string[],
): InteriorPage {
  return {
    slug,
    eyebrow: "Your safety & rights",
    title,
    lead,
    status: "draft",
    seo: { description: lead },
    blocks: [
      { kind: "prose", body: intro },
      { kind: "checklist", heading: "What this covers", items: covers },
      draftNotice,
      {
        kind: "prose",
        heading: "Questions or concerns?",
        body: [
          "You can ask for a copy of any of our policies at any time, in English or Greek. If something isn't clear, or you'd like to raise a concern, our team is here to help — and you can involve a family member, carer or advocate.",
        ],
      },
      {
        kind: "cta",
        title: "We're here to help",
        body: "Speak with our team about your rights, or how we handle your information and feedback.",
        primary: { label: "Contact us", href: "/contact" },
        secondary: { label: "All policies", href: "/resources" },
      },
    ],
  };
}

const list: InteriorPage[] = [
  // ── Care overview / pathways ────────────────────────────────────────────────
  {
    slug: "support-at-home",
    eyebrow: "Government-funded in-home care",
    title: "Support at Home",
    lead: "Support at Home is the Australian Government's in-home aged care program. It helps older people stay living safely and independently at home, with support arranged around their goals.",
    heroImage: {
      src: "/photos/care-in-motion.jpg",
      alt: "A home care worker warmly greeting an elderly man at his front door",
    },
    status: "requires-client-confirmation",
    seo: {
      description:
        "Understand the Australian Government's Support at Home program and how GOCSA can help you access in-home aged care.",
    },
    blocks: [
      {
        kind: "prose",
        heading: "What Support at Home helps with",
        body: [
          "Support at Home brings together everyday help, personal care, allied health and clinical support under one program, so the right support can be arranged as needs change over time.",
          "GOCSA can help you understand the program in plain language — in English or Greek — and support you through assessment and getting started.",
        ],
      },
      {
        kind: "features",
        heading: "Support that can be arranged",
        intro: "The support you receive is shaped around an assessment of your needs and goals.",
        items: [
          { title: "Everyday living", description: "Help around the home — cleaning, laundry, meals and shopping.", href: "/services/household-help" },
          { title: "Personal care", description: "Respectful help with showering, dressing and mobility.", href: "/services/personal-care" },
          { title: "Social & wellbeing", description: "Companionship, connection and accompanied outings.", href: "/services/social-wellbeing" },
          { title: "In-home nursing", description: "Clinical care and medication support at home.", href: "/services/in-home-nursing" },
          { title: "Assistive technology & home modifications", description: "Equipment and small home changes that keep you safe.", href: "/assistive-technology-home-modifications" },
          { title: "Respite", description: "A break for family carers, so they can rest and recharge.", href: "/services/respite" },
        ],
      },
      {
        kind: "steps",
        heading: "How access works",
        intro: "Support at Home is accessed through My Aged Care. We can guide you through each step.",
        items: [
          { title: "Contact My Aged Care", description: "Registration and a first conversation about your needs." },
          { title: "Assessment", description: "An assessor visits to understand your situation and goals." },
          { title: "Your support plan", description: "Approved support is set out in a plan built around you." },
          { title: "Choose your provider", description: "You choose who delivers your support — this is where GOCSA can help." },
        ],
      },
      {
        kind: "callout",
        title: "Program details are confirmed with you",
        body: "Program rules, eligibility and any contributions depend on your individual assessment and current government arrangements. We'll always explain what applies to you before anything begins — and never make eligibility or fee promises on your behalf.",
      },
      enquire,
    ],
  },
  {
    slug: "aged-care",
    eyebrow: "Aged care",
    title: "In-home aged care",
    lead: "GOCSA provides in-home aged care to older South Australians — either through government-funded programs such as Support at Home, or privately arranged.",
    heroImage: {
      src: "/photos/who-we-are.jpg",
      alt: "A home carer sharing tea and conversation with an elderly Greek woman at her kitchen table",
    },
    status: "requires-client-confirmation",
    blocks: [
      {
        kind: "prose",
        body: [
          "Growing older shouldn't mean losing your independence. With the right support at the right time, older people can keep living well at home — safe, connected and in control.",
          "Our care is culturally attuned and delivered in English or Greek, so people feel understood as well as supported.",
        ],
      },
      {
        kind: "cards",
        heading: "Two ways to arrange aged care",
        items: [
          { title: "Government-funded", description: "Access in-home support through the Support at Home program after a My Aged Care assessment.", href: "/support-at-home" },
          { title: "Privately funded", description: "Arrange support directly with us — flexible, and available whether or not you're assessed.", href: "/private-care" },
        ],
        columns: 2,
      },
      { kind: "features", heading: "Our services", items: serviceSummaries() },
      enquire,
    ],
  },
  {
    slug: "private-care",
    eyebrow: "Private care",
    title: "Privately funded care",
    lead: "Private care gives you support on your terms — flexible, responsive, and available whether or not you're part of a government-funded program.",
    status: "requires-client-confirmation",
    blocks: [
      {
        kind: "prose",
        body: [
          "Some people want to arrange support directly, without waiting for an assessment; others want more than their funded plan provides. Private care makes that possible, with the same trusted team.",
          "You choose the support you want, how often, and when — and you can change it as your needs change.",
        ],
      },
      {
        kind: "checklist",
        heading: "Why choose private care",
        items: [
          { title: "Start when you're ready", description: "No assessment required to begin." },
          { title: "Flexible arrangements", description: "Scale support up or down as life changes." },
          { title: "Same trusted carers", description: "Consistent, familiar faces who know you." },
          { title: "Clear, honest pricing", description: "Transparent fees explained before anything begins." },
        ],
      },
      { kind: "features", heading: "Support you can arrange", items: serviceSummaries() },
      enquire,
    ],
  },

  // ── Services index + details ───────────────────────────────────────────────
  {
    slug: "services",
    eyebrow: "Community Care services",
    title: "Our services",
    lead: "In-home aged care, arranged around what matters to you and your family. Explore each type of support below.",
    status: "requires-client-confirmation",
    blocks: [
      { kind: "cards", items: serviceSummaries() },
      enquire,
    ],
  },
  serviceDetail(
    "services/personal-care",
    "Personal care",
    "Respectful help with the personal parts of daily living — supporting dignity and independence at home.",
    "/photos/service-personal-care.jpg",
    "A support worker gently helping an elderly woman walk along a sunlit hallway at home",
    ["Showering, bathing and grooming", "Dressing and undressing", "Help with mobility and moving safely", "Toileting and continence support", "Medication prompting", "Support with eating and drinking"],
  ),
  serviceDetail(
    "services/household-help",
    "Household help",
    "Everyday help around the home, so it stays comfortable, clean and safe.",
    "/photos/service-household-help.jpg",
    "A home helper preparing a fresh meal in a sunlit kitchen while an elderly man chats nearby",
    ["Cleaning and tidying", "Laundry and linen", "Meal planning and preparation", "Grocery shopping", "Light home maintenance", "Help staying organised"],
  ),
  serviceDetail(
    "services/social-wellbeing",
    "Social support & companionship",
    "Connection, conversation and accompanied outings — in English or Greek — to help people stay part of their community.",
    "/photos/service-social-support.jpg",
    "An elderly woman and a companion carer laughing together on a park bench in the afternoon sun",
    ["Friendly companionship and conversation", "Accompanied outings and appointments", "Support to attend community and cultural events", "Help staying connected with family", "Shared activities and interests", "Reducing isolation and loneliness"],
  ),
  serviceDetail(
    "services/in-home-nursing",
    "In-home nursing",
    "Clinical care delivered at home by qualified nurses, coordinated with your GP and care team.",
    "/photos/service-nursing.jpg",
    "A gentle home nurse checking on an elderly man in a comfortable sunlit living room",
    ["Medication management", "Wound care", "Health monitoring and observations", "Continence support", "Care coordination with your GP", "Post-hospital support at home"],
  ),
  serviceDetail(
    "services/respite",
    "Respite care",
    "A helping hand so family carers can rest and recharge, knowing their loved one is in good hands.",
    "/photos/service-respite.jpg",
    "A daughter sharing a tender quiet moment with her elderly mother on a sofa at home",
    ["Planned or short-notice respite", "In-home support while carers take a break", "Companionship and supervision", "Continuity with familiar carers", "Flexible hours to suit your family", "Peace of mind for carers"],
  ),
  serviceDetail(
    "services/transport",
    "Transport & errands",
    "Getting to appointments, shops and community — safely and on time.",
    "/photos/service-transport.jpg",
    "A support worker helping an elderly woman out of a car on a bright suburban street",
    ["Transport to medical appointments", "Shopping and errands", "Attending community and cultural events", "Door-to-door assistance", "Help carrying and settling in", "A friendly, familiar driver"],
  ),
  {
    slug: "assistive-technology-home-modifications",
    eyebrow: "Staying safe at home",
    title: "Assistive technology & home modifications",
    lead: "Sometimes the right piece of equipment or a small change to the home is what keeps someone safe and independent. We can help you understand the options.",
    heroImage: {
      src: "/photos/service-personal-care.jpg",
      alt: "A support worker gently helping an elderly woman along a sunlit hallway at home",
    },
    status: "requires-client-confirmation",
    blocks: [
      {
        kind: "prose",
        body: [
          "Assistive technology means equipment that helps with daily tasks and mobility — from grab rails and shower stools to walking aids and personal alarms. Home modifications are small, practical changes to make a home safer to move around.",
          "Where these are part of a funded support plan, we can help you understand what may be available and how it's arranged.",
        ],
      },
      {
        kind: "features",
        heading: "Common examples",
        columns: 2,
        items: [
          { title: "Mobility & transfers", description: "Walking aids, rails and equipment that make moving around safer." },
          { title: "Bathroom safety", description: "Shower stools, non-slip surfaces and grab rails." },
          { title: "Personal alarms", description: "Ways to call for help quickly if something goes wrong." },
          { title: "Small home modifications", description: "Ramps, rails and minor changes to reduce trips and falls." },
        ],
      },
      {
        kind: "callout",
        title: "Independent, needs-first advice",
        body: "We recommend equipment and changes based on what keeps you safe and independent — not on selling products. Occupational therapy assessment may be recommended for some items.",
      },
      enquire,
    ],
  },

  // ── Funding & getting started ──────────────────────────────────────────────
  {
    slug: "funding",
    eyebrow: "Funding & access",
    title: "Understanding how care is paid for",
    lead: "Aged care funding can feel confusing. We help you understand the pathways in plain language — with no jargon, and no pressure.",
    status: "requires-client-confirmation",
    blocks: [
      {
        kind: "cards",
        heading: "Pathways to support",
        items: [
          { title: "Support at Home", description: "The government's in-home aged care program, accessed through My Aged Care.", href: "/support-at-home" },
          { title: "Government-funded pathways", description: "How assessment through My Aged Care leads to funded support.", href: "/support-at-home" },
          { title: "Privately funded care", description: "Flexible support arranged directly with us, whether or not you're assessed.", href: "/private-care" },
        ],
      },
      {
        kind: "prose",
        heading: "How we help",
        body: [
          "We'll walk you through the options that apply to your situation, explain any contributions in plain language, and put everything in writing before support begins.",
          "We never make eligibility or fee promises on the government's behalf — final arrangements depend on your assessment and current program rules.",
        ],
      },
      draftNotice,
      enquire,
    ],
  },
  {
    slug: "how-to-get-started",
    eyebrow: "How it works",
    title: "How to get started",
    lead: "Starting care is simpler than most people expect. Here's how it works, step by step.",
    status: "requires-client-confirmation",
    blocks: [
      {
        kind: "steps",
        items: [
          { title: "Let's talk", description: "A friendly conversation about what you need — no pressure and no cost to ask." },
          { title: "Understand your needs", description: "We listen, and help you understand your options and any funding pathways." },
          { title: "Create your care plan", description: "A plan built around your life, your home and your goals." },
          { title: "Meet your care team", description: "Consistent, familiar faces who take the time to get to know you." },
          { title: "Begin support at home", description: "Support starts — and adapts as your needs change over time." },
        ],
      },
      enquire,
    ],
  },

  // ── About ──────────────────────────────────────────────────────────────────
  {
    slug: "about",
    eyebrow: "Who we are",
    title: "Our story",
    lead: "The Greek Orthodox Community of South Australia has been a home away from home since 1930. Community Care brings that same warmth into people's homes.",
    heroImage: {
      src: "/photos/heritage.jpg",
      alt: "Archival photograph of an early Greek Orthodox community gathering in South Australia",
    },
    status: "requires-client-confirmation",
    blocks: [
      {
        kind: "prose",
        body: [
          "For generations, the Greek Orthodox Community of South Australia has been a place of language, faith, culture and belonging — a not-for-profit founded in 1930 to serve its community.",
          "Our Community Care carries that heritage into aged care: practical, respectful support that helps older South Australians live well, on their own terms.",
        ],
      },
      {
        kind: "checklist",
        heading: "What guides us",
        items: [
          { title: "Dignity & independence", description: "Support that keeps people safe at home, on their own terms." },
          { title: "Language & culture", description: "Care in English or Greek, with genuine cultural understanding." },
          { title: "Care for our elders", description: "A community that has looked after its people for generations." },
          { title: "Honest communication", description: "Plain-language conversations with you and your family." },
        ],
      },
      enquire,
    ],
  },
  {
    slug: "news",
    eyebrow: "News",
    title: "News & updates",
    lead: "News, updates and stories from GOCSA Community Care.",
    status: "draft",
    blocks: [
      { kind: "prose", body: ["We'll share news, service updates and community stories here. Check back soon."] },
      enquire,
    ],
  },
  {
    slug: "careers",
    eyebrow: "Join our team",
    title: "Careers",
    lead: "Care work is about people. If you're warm, reliable and want to make a real difference to older South Australians, we'd love to hear from you.",
    status: "draft",
    blocks: [
      {
        kind: "prose",
        body: [
          "We're always interested in meeting compassionate, dependable people — support workers, carers and nurses — who share our commitment to dignity and cultural respect.",
          "Bilingual English/Greek speakers are especially welcome.",
        ],
      },
      {
        kind: "cta",
        title: "Interested in working with us?",
        body: "Send us a message and tell us a little about yourself. We'll be in touch.",
        primary: { label: "Get in touch", href: "/contact" },
      },
    ],
  },

  // ── Resources & policies ───────────────────────────────────────────────────
  {
    slug: "resources",
    eyebrow: "Your safety & rights",
    title: "Resources & policies",
    lead: "Transparency and safety matter. These pages explain your rights and how we uphold them. All are drafts, provided for review.",
    status: "draft",
    blocks: [
      {
        kind: "cards",
        heading: "Policies & your rights",
        items: [
          { title: "Privacy", description: "How we collect, use and protect your personal information.", href: "/policies/privacy" },
          { title: "Complaints & feedback", description: "How to raise a concern and how we respond.", href: "/policies/complaints" },
          { title: "Client rights & responsibilities", description: "Your rights under the Charter of Aged Care Rights.", href: "/policies/client-rights" },
          { title: "Safeguarding", description: "How we keep clients safe from harm, abuse and neglect.", href: "/policies/safeguarding" },
          { title: "Quality & governance", description: "How we uphold the Aged Care Quality Standards.", href: "/policies/quality" },
          { title: "Advocacy & consent", description: "Your right to an advocate and to make informed choices.", href: "/policies/advocacy" },
          { title: "Code of conduct", description: "The standard of behaviour you can expect from our people.", href: "/policies/code-of-conduct" },
          { title: "Accessibility", description: "Our commitment to an accessible, inclusive service.", href: "/accessibility" },
        ],
      },
      draftNotice,
    ],
  },
  policyPage(
    "policies/privacy",
    "Privacy",
    "How we collect, use, store and protect your personal information.",
    [
      { title: "What we collect", description: "The personal and health information we need to provide your care." },
      { title: "How we use it", description: "To deliver, coordinate and improve your support." },
      { title: "Who we share it with", description: "Only with your consent, or where required by law." },
      { title: "How we protect it", description: "The steps we take to keep your information secure." },
      { title: "Your choices", description: "How to access, correct or ask questions about your information." },
    ],
    [
      "We treat your personal and health information with care and respect, and handle it in line with Australian privacy law.",
      "This draft sets out how we collect, use, store, share and protect your information, and your rights in relation to it.",
    ],
  ),
  policyPage(
    "policies/complaints",
    "Complaints & feedback",
    "How to raise a concern or give feedback, and how we respond — fairly, promptly and without disadvantage.",
    [
      { title: "How to tell us", description: "The ways you can raise a concern or share feedback." },
      { title: "What happens next", description: "How we acknowledge, look into and respond to concerns." },
      { title: "No disadvantage", description: "Raising a concern will never affect your care." },
      { title: "External options", description: "Independent bodies you can contact if you're not satisfied." },
    ],
    [
      "Your feedback helps us improve, and you have every right to raise a concern. We welcome it, take it seriously, and respond fairly.",
      "You can involve a family member, carer or advocate at any time.",
    ],
  ),
  policyPage(
    "policies/client-rights",
    "Client rights & responsibilities",
    "Your rights as a person receiving care, aligned with the Charter of Aged Care Rights.",
    [
      { title: "Your rights", description: "To safe, quality care that respects your dignity and choices." },
      { title: "Respect & identity", description: "To have your culture, language and identity respected." },
      { title: "Have a say", description: "To be involved in decisions and to have an advocate." },
      { title: "Responsibilities", description: "How we work together respectfully and safely." },
    ],
    [
      "You have the right to safe and respectful care that supports your independence, identity and choices.",
      "This draft reflects the principles of the Charter of Aged Care Rights.",
    ],
  ),
  policyPage(
    "policies/safeguarding",
    "Safeguarding",
    "How we keep the people we support safe from harm, abuse and neglect.",
    [
      { title: "Our commitment", description: "A zero-tolerance approach to abuse and neglect." },
      { title: "Safer people", description: "Screening, training and supervision of our team." },
      { title: "Recognising & reporting", description: "How concerns are identified, raised and acted on." },
      { title: "Support after a concern", description: "How we support anyone affected." },
    ],
    [
      "The safety and wellbeing of the people we support comes first, always.",
      "This draft sets out how we prevent, recognise and respond to harm, abuse and neglect.",
    ],
  ),
  policyPage(
    "policies/quality",
    "Quality & governance",
    "How we uphold quality and safety, aligned with the Aged Care Quality Standards.",
    [
      { title: "Quality Standards", description: "How our service works to meet the Aged Care Quality Standards." },
      { title: "Continuous improvement", description: "How we listen, learn and improve over time." },
      { title: "Governance", description: "How care quality and safety are overseen." },
      { title: "Your voice", description: "How feedback shapes the way we work." },
    ],
    [
      "We're committed to safe, high-quality care and to continuously improving.",
      "This draft describes how we work towards the Aged Care Quality Standards and govern the quality of our service.",
    ],
  ),
  policyPage(
    "policies/advocacy",
    "Advocacy & consent",
    "Your right to an advocate, and to make informed choices about your care.",
    [
      { title: "Your right to an advocate", description: "Anyone can support you to have your say — a family member, friend or independent advocate." },
      { title: "Informed consent", description: "Care proceeds with your understanding and agreement." },
      { title: "Supported decisions", description: "How we help you make choices that are right for you." },
      { title: "Independent advocacy", description: "How to access free, independent advocacy services." },
    ],
    [
      "You have the right to make your own choices, and to have someone support you to do so.",
      "This draft explains how we support informed consent and access to advocacy.",
    ],
  ),
  policyPage(
    "policies/code-of-conduct",
    "Code of conduct",
    "The standard of behaviour you can expect from everyone who represents GOCSA Community Care.",
    [
      { title: "Respect & dignity", description: "Treating every person with kindness and respect." },
      { title: "Safe & competent care", description: "Acting with skill, care and integrity." },
      { title: "Honesty", description: "Being open, and acting in your best interests." },
      { title: "Accountability", description: "Speaking up and taking responsibility." },
    ],
    [
      "Everyone who works with us is expected to act with respect, honesty and care.",
      "This draft reflects the principles of the Aged Care Code of Conduct.",
    ],
  ),
  policyPage(
    "accessibility",
    "Accessibility",
    "Our commitment to an accessible, inclusive service — online and in person.",
    [
      { title: "An inclusive service", description: "Support that works for people of all abilities." },
      { title: "This website", description: "How we work towards an accessible, easy-to-use website." },
      { title: "Language support", description: "Information and care available in English and Greek." },
      { title: "Tell us what you need", description: "How to request information in another format." },
    ],
    [
      "We want everyone to be able to access our service and information easily.",
      "This draft sets out our commitment to accessibility and how to ask for support.",
    ],
  ),
];

/** Compact service summaries reused across pages. */
function serviceSummaries() {
  return [
    { title: "Personal care", description: "Respectful help with showering, dressing and mobility.", href: "/services/personal-care" },
    { title: "Household help", description: "Cleaning, laundry, meal preparation and everyday home tasks.", href: "/services/household-help" },
    { title: "Social support & companionship", description: "Connection, conversation and accompanied outings.", href: "/services/social-wellbeing" },
    { title: "In-home nursing", description: "Clinical care and medication support at home.", href: "/services/in-home-nursing" },
    { title: "Respite care", description: "A break for family carers, so they can rest and recharge.", href: "/services/respite" },
    { title: "Transport & errands", description: "Getting to appointments, shops and community — safely.", href: "/services/transport" },
  ];
}

/** Consistent scaffold for a service detail page. */
function serviceDetail(
  slug: string,
  title: string,
  lead: string,
  src: string,
  alt: string,
  includes: string[],
): InteriorPage {
  return {
    slug,
    eyebrow: "Community Care service",
    title,
    lead,
    heroImage: { src, alt },
    status: "requires-client-confirmation",
    seo: { description: lead },
    blocks: [
      {
        kind: "prose",
        body: [
          "Support is shaped around you — your routine, your preferences and your goals — and delivered by consistent, familiar carers in English or Greek.",
        ],
      },
      {
        kind: "checklist",
        heading: "What this can include",
        items: includes.map((t) => ({ title: t, description: "" })),
      },
      { kind: "features", heading: "Our services", items: serviceSummaries().filter((s) => s.href !== `/${slug}`) },
      enquire,
    ],
  };
}

const bySlug = new Map(list.map((p) => [p.slug, p]));

export const pageSource: PageSource = {
  getPage: (slug) => bySlug.get(slug),
  allSlugs: () => list.map((p) => p.slug),
};
