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

/** Rate-card column headers, shared across the Support at Home fee schedule. */
const WEEKEND_COLUMNS = [
  "Weekday\n7am–8pm",
  "Weekday\n8pm–12am",
  "Saturday",
  "Sunday",
  "Public\nholiday",
];
const SESSION_COLUMNS = ["Initial", "Standard", "Extended"];
const STANDARD_HOURS_COLUMNS = ["Standard hours\nMon–Fri"];
const QUOTE_COLUMNS = ["Cost"];

/** Reusable, original FAQ items (aged-care framework, GOCSA wording). */
const FAQ = {
  getStarted: {
    question: "How do I get started?",
    answer:
      "Reach out for a friendly, no-pressure chat — in English or Greek. We'll help you understand your options and the next steps, including how assessment through My Aged Care works if you're seeking government-funded support.",
  },
  needFunding: {
    question: "Do I need to be assessed or have government funding?",
    answer:
      "Not necessarily. Some people access government-funded support through the Support at Home program after a My Aged Care assessment; others arrange care privately with us straight away. We can explain both, and help you choose what suits you.",
  },
  screening: {
    question: "How do you screen and train your care team?",
    answer:
      "Every member of our team is carefully recruited, reference-checked and police-checked, and completes aged care worker screening. They receive ongoing training so you receive safe, respectful, quality care. You're welcome to ask us how we screen and train our people at any time.",
  },
  ownStaff: {
    question: "Do you use your own carers, or agencies and sub-contractors?",
    answer:
      "We'll always be clear about who is providing your care. Our aim is consistency — familiar faces who get to know you — rather than a rotating roster of strangers.",
  },
  sameWorker: {
    question: "Can I request the same carer, on the days and times that suit me?",
    answer:
      "Yes, wherever possible. Consistency matters, so we do our best to match you with carers you trust and to schedule support around your routine. If your regular carer is ever unavailable, we'll let you know.",
  },
  changeVisit: {
    question: "Can I change, reschedule or cancel a visit?",
    answer:
      "Yes. Just let us know as early as you can and we'll do our best to accommodate changes. We'll explain any notice periods clearly before your support begins.",
  },
  cost: {
    question: "How much does support cost?",
    answer:
      "It depends on the support you choose and, for government-funded care, your assessment and any contributions set under the program. We'll always explain costs in plain language and put them in writing before anything begins — and we never make eligibility or fee promises on the government's behalf.",
  },
  family: {
    question: "Can my family be involved?",
    answer:
      "Absolutely. With your consent, we welcome family in planning and communication — many families find this reassuring.",
  },
  privateStart: {
    question: "Can I start privately without waiting for an assessment?",
    answer:
      "Yes. Private care can begin without a My Aged Care assessment, so you can put support in place exactly when you need it.",
  },
  privateFlex: {
    question: "Can I change how much support I receive?",
    answer:
      "Yes — private care is flexible. You can increase or reduce support as your needs change, and we'll adjust your plan together with you.",
  },
  language: {
    question: "Can I receive care and information in Greek?",
    answer:
      "Yes. We provide care and information in English or Greek, with free interpreting in other languages available if you prefer.",
  },
};

/** Free, independent help lines (public Australian services — not GOCSA-specific). */
const helplines: PageBlock = {
  kind: "features",
  heading: "Independent help and advocacy",
  intro:
    "These free, independent services can support you or your family — and interpreting is available in Greek.",
  columns: 3,
  items: [
    {
      title: "Aged Care Quality & Safety Commission",
      description: "The independent regulator for aged care. Raise a concern on 1800 951 822.",
    },
    {
      title: "Older Persons Advocacy Network (OPAN)",
      description: "Free, confidential aged care advocacy. Call 1800 700 600.",
    },
    {
      title: "Translating & Interpreting Service",
      description: "Free interpreting, including Greek — TIS National on 131 450.",
    },
  ],
};

/**
 * Scaffold for a policy / your-rights page. `body` carries the substantive,
 * framework-grounded content; the factory appends a help CTA.
 */
function policyPage(cfg: {
  slug: string;
  title: string;
  lead: string;
  body: PageBlock[];
  help?: PageBlock[];
}): InteriorPage {
  return {
    slug: cfg.slug,
    eyebrow: "Your safety & rights",
    title: cfg.title,
    lead: cfg.lead,
    status: "draft",
    seo: { description: cfg.lead },
    blocks: [
      ...cfg.body,
      ...(cfg.help ?? []),
      {
        kind: "cta",
        title: "We're here to help",
        body: "Ask for any of our policies in English or Greek, or raise a question or concern — you can involve a family member, carer or advocate at any time.",
        primary: { label: "Contact us", href: "/contact" },
        secondary: { label: "All policies & resources", href: "/resources" },
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
          { title: "Everyday living", description: "Help around the home — cleaning, laundry, meals and shopping.", href: "/services/domestic-assistance" },
          { title: "Personal care", description: "Respectful help with showering, dressing and mobility.", href: "/services/personal-care" },
          { title: "Social & wellbeing", description: "Companionship, connection and accompanied outings.", href: "/services/social-wellbeing" },
          { title: "In-home nursing", description: "Clinical care and medication support at home.", href: "/services/in-home-nursing" },
          { title: "Assistive technology & home modifications", description: "Equipment and small home changes that keep you safe.", href: "/assistive-technology-home-modifications" },
          { title: "Respite", description: "A break for family carers, so they can rest and recharge.", href: "/services/respite" },
        ],
      },
      {
        kind: "cards",
        heading: "Short-term pathways",
        intro:
          "Alongside ongoing supports, Support at Home funds two dedicated pathways with their own budgets — for regaining independence after a setback, and for care at the end of life.",
        columns: 2,
        items: [
          {
            title: "Restorative Care Pathway",
            description: "Up to 16 weeks of goal-focused, allied health-led support to rebuild independence.",
            href: "/pathways/restorative-care",
          },
          {
            title: "End-of-Life Pathway",
            description: "Intensive support so someone in the final months of life can stay comfortable at home.",
            href: "/pathways/end-of-life",
          },
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
      {
        kind: "faqs",
        heading: "Support at Home — your questions",
        intro: "If you've still got questions, we may be able to help here — and you're always welcome to ask us directly.",
        items: [FAQ.getStarted, FAQ.needFunding, FAQ.cost, FAQ.screening, FAQ.changeVisit],
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
      {
        kind: "faqs",
        heading: "Aged care — your questions",
        items: [FAQ.screening, FAQ.ownStaff, FAQ.sameWorker, FAQ.family, FAQ.language, FAQ.cost],
      },
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
      {
        kind: "faqs",
        heading: "Private care — your questions",
        items: [FAQ.privateStart, FAQ.privateFlex, FAQ.sameWorker, FAQ.changeVisit, FAQ.cost],
      },
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
    "services/domestic-assistance",
    "Domestic assistance",
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
          "Sometimes the difference between struggling and staying independent is a simple piece of equipment or a small change to the home. Assistive technology is equipment that helps with everyday tasks, mobility and safety. Home modifications are practical changes to the home itself — like a rail or a ramp — that make it easier and safer to move around.",
          "The right solution is always the one that keeps you safe and independent in the home you love, and it's chosen around your needs — not a product to be sold.",
        ],
      },
      {
        kind: "features",
        heading: "Assistive technology",
        intro: "Equipment that supports daily living, mobility and safety.",
        items: [
          { title: "Mobility & transfers", description: "Walking sticks, frames, wheelchairs and transfer aids for moving around safely." },
          { title: "Bathroom & toileting", description: "Shower stools, over-toilet frames, grab rails and non-slip surfaces." },
          { title: "Bedroom & seating", description: "Adjustable beds, pressure-care mattresses and supportive chairs." },
          { title: "Daily living aids", description: "Reachers, jar openers, dressing aids and easy-grip utensils." },
          { title: "Personal alarms & sensors", description: "Ways to call for help quickly, and sensors that add peace of mind." },
          { title: "Vision, hearing & communication", description: "Aids that help you stay connected and aware." },
        ],
      },
      {
        kind: "features",
        heading: "Home modifications",
        intro: "Small, practical changes that reduce trips, falls and daily strain.",
        columns: 3,
        items: [
          { title: "Rails & supports", description: "Grab rails and handrails at steps, hallways and bathrooms." },
          { title: "Ramps & access", description: "Ramps and threshold changes for safer entry and exit." },
          { title: "Bathroom changes", description: "Step-free showers and other minor bathroom modifications." },
          { title: "Lighting & flooring", description: "Better lighting and non-slip flooring to prevent falls." },
          { title: "Kitchen & storage", description: "Changes that bring everyday items within easy reach." },
          { title: "Doorways & handles", description: "Easier handles and wider access where needed." },
        ],
      },
      {
        kind: "callout",
        title: "Assessed by the right person",
        body: "For many items — especially home modifications — an occupational therapist assessment is recommended, so the solution genuinely fits your home, your body and your goals. We can help arrange this.",
      },
      {
        kind: "steps",
        heading: "How it works",
        items: [
          { title: "Talk it through", description: "We listen to what's getting harder and where you feel unsafe." },
          { title: "Assessment", description: "Where helpful, an occupational therapist assesses your needs and home." },
          { title: "Recommendations", description: "We explain the options and what may be funded, in plain language." },
          { title: "Arrange & install", description: "Equipment is supplied or modifications made by trusted providers." },
          { title: "Review", description: "We check it's working for you, and adjust as your needs change." },
        ],
      },
      {
        kind: "prose",
        heading: "How it's funded",
        body: [
          "Assistive technology and home modifications may be available as part of a funded aged care plan, such as Support at Home, or arranged privately. What applies depends on your assessment and current program rules — we'll always explain your options clearly before anything is arranged.",
        ],
      },
      enquire,
    ],
  },

  // ── Allied health ──────────────────────────────────────────────────────────
  {
    slug: "services/allied-health",
    eyebrow: "Community Care service",
    title: "Allied health",
    lead: "Qualified health professionals who help you move more easily, eat well, stay steady on your feet and keep doing the things that matter — in your own home, or in clinic.",
    heroImage: {
      src: "/photos/service-allied-health.jpg",
      alt: "A physiotherapist gently supporting an older woman through a balance exercise in her kitchen",
    },
    status: "requires-client-confirmation",
    seo: {
      description:
        "Allied health at home with GOCSA Community Care — physiotherapy, occupational therapy, podiatry, dietetics, speech pathology, psychology, exercise physiology, social work and remedial massage.",
    },
    blocks: [
      {
        kind: "prose",
        body: [
          "Allied health is the practical, hands-on side of staying well. It's the physiotherapist who helps you walk further without pain, the occupational therapist who makes your bathroom safe, the podiatrist who keeps you on your feet, the dietitian who helps you regain the weight you lost after an illness.",
          "The aim is never simply to treat a problem — it's to help you keep your independence. Under Support at Home, allied health sits within clinical supports, which the government funds in full, so there is no contribution for you to pay for these services.",
        ],
      },
      {
        kind: "features",
        heading: "Who you can see",
        intro:
          "Care is delivered by qualified, registered professionals, coordinated with your GP and your Care Partner.",
        columns: 3,
        items: [
          {
            title: "Physiotherapy",
            description:
              "Strength, balance, mobility and pain — including falls prevention and getting moving again after a hospital stay.",
          },
          {
            title: "Occupational therapy",
            description:
              "Practical assessment of how you manage day to day, and the equipment or home changes that make tasks safer and easier.",
          },
          {
            title: "Podiatry",
            description:
              "Foot and nail care, footwear advice, diabetes foot checks and treatment of pain that stops you walking comfortably.",
          },
          {
            title: "Exercise physiology",
            description:
              "Safe, tailored exercise programs for chronic conditions, reconditioning and building strength at your own pace.",
          },
          {
            title: "Speech pathology",
            description:
              "Support with swallowing difficulties and with speech, language and communication after a stroke or with a progressive condition.",
          },
          {
            title: "Dietitian or nutritionist",
            description:
              "Eating well for your health and your appetite — including unplanned weight loss, diabetes and texture-modified diets.",
          },
          {
            title: "Psychology",
            description:
              "A confidential space to talk about anxiety, low mood, grief or the adjustment that comes with changing health.",
          },
          {
            title: "Social work",
            description:
              "Help navigating services, family decisions, advocacy and the practical and emotional load that care can bring.",
          },
          {
            title: "Remedial massage",
            description:
              "Hands-on therapy for muscular pain, stiffness and circulation, working alongside your other therapies.",
          },
        ],
      },
      {
        kind: "checklist",
        heading: "When allied health helps most",
        items: [
          {
            title: "After a hospital stay",
            description: "Rebuilding strength and confidence so you can get back to normal life.",
          },
          {
            title: "After a fall — or a near miss",
            description: "Assessing why it happened and reducing the risk of it happening again.",
          },
          {
            title: "When walking gets harder",
            description: "Pain, stiffness, balance or breathlessness that's changing what you can do.",
          },
          {
            title: "When eating or swallowing changes",
            description: "Weight loss, poor appetite, coughing at meals or difficulty swallowing.",
          },
          {
            title: "When the home stops fitting you",
            description: "Steps, the shower or the kitchen becoming daily obstacles.",
          },
          {
            title: "When mood or memory changes",
            description: "Low mood, anxiety, grief, or worry about how you're managing.",
          },
        ],
      },
      {
        kind: "steps",
        heading: "How it works",
        items: [
          {
            title: "Talk with your Care Partner",
            description: "We discuss what's getting harder and which professional is the right fit.",
          },
          {
            title: "Initial assessment",
            description:
              "A longer first appointment to understand your history, your goals and what you want to get back to.",
          },
          {
            title: "Your plan",
            description: "Clear goals and a realistic program, explained in plain language.",
          },
          {
            title: "Sessions at home or in clinic",
            description: "Wherever works best for you — many people prefer their own home.",
          },
          {
            title: "Review and adjust",
            description: "We measure progress against your goals and change the plan as you improve.",
          },
        ],
      },
      {
        kind: "callout",
        title: "What it costs",
        body: "Under Support at Home, clinical supports — including allied health — are fully funded by the government, so no contribution applies. Standard and extended appointment rates, and the indirect-service rate for documentation and referrals, are published in full on our fees page.",
      },
      {
        kind: "faqs",
        heading: "Allied health — your questions",
        items: [
          {
            question: "Do I need a GP referral?",
            answer:
              "Not always. If your allied health is arranged through your Support at Home plan, your Care Partner can organise it directly. We do coordinate with your GP so everyone is working from the same picture, and some specific programs do require a referral — we'll tell you if that applies.",
          },
          {
            question: "Can I be seen at home rather than a clinic?",
            answer:
              "Yes. Most allied health can be delivered in your own home, which is often more useful — a physiotherapist or occupational therapist can see the actual steps, doorways and bathroom you use every day.",
          },
          {
            question: "How many sessions will I need?",
            answer:
              "It depends entirely on your goals. Some people need one assessment and a home program; others benefit from a course of regular sessions. Your therapist will set out what they recommend and review it with you as you progress.",
          },
          {
            question: "Can I see a Greek-speaking therapist?",
            answer:
              "We'll always do our best to match you with someone who speaks your language, or arrange interpreting support so nothing is lost in translation. Just tell us what you'd prefer.",
          },
        ],
      },
      enquire,
    ],
  },

  // ── Home maintenance & repairs ─────────────────────────────────────────────
  {
    slug: "services/home-maintenance",
    eyebrow: "Community Care service",
    title: "Home maintenance & repairs",
    lead: "Practical help keeping your home safe, sound and easy to live in — from a loose rail or a blown light to essential repairs and light gardening.",
    heroImage: {
      src: "/photos/service-home-maintenance.jpg",
      alt: "A handyman fitting a safety grab rail beside a back doorstep while an older man watches from the doorway",
    },
    status: "requires-client-confirmation",
    seo: {
      description:
        "Home maintenance and repairs with GOCSA Community Care — minor repairs, safety jobs, light gardening and essential upkeep that keep older South Australians safe at home.",
    },
    blocks: [
      {
        kind: "prose",
        body: [
          "Most people don't leave their home because of one big thing. It's an accumulation of small ones — the step that's come loose, the tap that won't turn off, the garden that's got away, the light globe nobody can safely reach.",
          "Home maintenance is the unglamorous work that keeps a house liveable and safe. Getting it done promptly, by someone trustworthy who's been properly checked, is often what allows someone to keep living independently in the home they love.",
        ],
      },
      {
        kind: "features",
        heading: "What we can help with",
        intro: "Practical jobs around the house and yard, sized to what you actually need.",
        items: [
          {
            title: "Minor repairs",
            description:
              "Dripping taps, sticking doors, loose handles, damaged flyscreens and the small fixes that never get done.",
          },
          {
            title: "Safety jobs",
            description:
              "Smoke alarm batteries, hard-to-reach light globes, loose steps, trip hazards and unstable railings.",
          },
          {
            title: "Light gardening",
            description:
              "Essential garden upkeep — mowing, pruning and clearing — to keep paths clear and the yard manageable.",
          },
          {
            title: "Outdoor upkeep",
            description:
              "Gutter clearing, cleaning slippery paths and other seasonal jobs that reduce the risk of a fall.",
          },
          {
            title: "Access & mobility fixes",
            description:
              "Small practical changes that make getting in, out and around your home easier day to day.",
          },
          {
            title: "Larger repairs",
            description:
              "Where a job needs a licensed trade, we source a quote and manage the work for you.",
          },
        ],
      },
      {
        kind: "callout",
        title: "Maintenance, or a home modification?",
        body: "Maintenance keeps what you already have working safely. A home modification changes the home itself — a grab rail, a ramp, a step-free shower — and is usually recommended by an occupational therapist. Many people need a bit of both, and we can arrange either.",
      },
      {
        kind: "steps",
        heading: "How it works",
        items: [
          {
            title: "Tell us what needs doing",
            description: "A conversation, or a walk around the house with your Care Partner.",
          },
          {
            title: "We look at it properly",
            description: "So the job is scoped correctly and nothing unsafe is missed.",
          },
          {
            title: "A clear quote",
            description: "For anything beyond a straightforward hourly job, you get the cost in writing first.",
          },
          {
            title: "The work gets done",
            description: "By our own team, or a police-checked contractor who meets our quality standards.",
          },
          {
            title: "We check it's right",
            description: "You should be safer and more comfortable than before — that's the test.",
          },
        ],
      },
      {
        kind: "prose",
        heading: "How it's funded",
        body: [
          "Home maintenance and gardening sit within the Everyday living category of Support at Home, which attracts a higher contribution than other categories — the government covers less of the cost for these services than for personal care or clinical care.",
          "Labour is charged at an hourly rate, and materials or a specialist trade are quoted separately at the actual cost plus a service fee for arranging and managing the work. Every rate is published on our fees page, and you'll always have the price in writing before anything starts.",
        ],
      },
      {
        kind: "faqs",
        heading: "Home maintenance — your questions",
        items: [
          {
            question: "Are your tradespeople checked?",
            answer:
              "Yes. Whether the work is done by our own team or a contractor we engage, they hold a relevant police clearance and meet our quality standards. You should never feel uneasy about who is in your home.",
          },
          {
            question: "Can you do major renovations?",
            answer:
              "No — this service covers maintenance, repairs and essential upkeep. Larger structural work or significant bathroom changes fall under home modifications, which usually need an occupational therapist assessment and a separate quote.",
          },
          {
            question: "Do I pay for materials as well as labour?",
            answer:
              "Yes. Labour is charged at the hourly rate, and any materials or specialist trade work are charged at the actual cost plus a fee that covers sourcing and managing the job. It's all set out in your quote before work begins.",
          },
          {
            question: "How quickly can something urgent be done?",
            answer:
              "If something is unsafe — a broken step, a fallen rail, no working smoke alarm — tell us and we'll prioritise it. Safety jobs don't wait in an ordinary queue.",
          },
        ],
      },
      enquire,
    ],
  },

  // ── Nutrition ──────────────────────────────────────────────────────────────
  {
    slug: "services/nutrition",
    eyebrow: "Community Care service",
    title: "Nutrition",
    lead: "Eating well is one of the simplest and most powerful ways to stay strong, steady and independent — and it should still taste like your own food.",
    heroImage: {
      src: "/photos/service-nutrition.jpg",
      alt: "A dietitian and an older Greek woman talking warmly over fresh simple food at a kitchen table",
    },
    status: "requires-client-confirmation",
    seo: {
      description:
        "Nutrition support with GOCSA Community Care — dietitian assessment, appetite and weight loss, texture-modified diets, and culturally familiar Greek food.",
    },
    blocks: [
      {
        kind: "prose",
        body: [
          "Appetite quietly changes as we get older. Taste dulls, cooking for one loses its appeal, shopping gets harder, and medications or illness can take the pleasure out of eating. The result is often unplanned weight loss and a slow loss of strength — which shows up as falls, fatigue, and a longer recovery from every setback.",
          "Good nutrition support isn't a diet sheet. It starts with what you actually like to eat, and works out how to make that easier, safer and more nourishing.",
        ],
      },
      {
        kind: "features",
        heading: "What nutrition support covers",
        items: [
          {
            title: "Dietitian assessment",
            description:
              "A proper look at what you're eating, your weight history, your medications and what's getting in the way.",
          },
          {
            title: "Appetite & weight loss",
            description:
              "Practical ways to add nourishment when you simply don't feel like eating much.",
          },
          {
            title: "Texture-modified diets",
            description:
              "Where swallowing is difficult, food and drinks modified to be safe — and still worth eating.",
          },
          {
            title: "Eating with a condition",
            description:
              "Diabetes, heart health, kidney disease or bowel problems, managed without stripping the joy from food.",
          },
          {
            title: "Meals & shopping support",
            description:
              "Joining up the advice with real life — meal preparation, shopping assistance or delivered meals.",
          },
          {
            title: "Nutrition supplements",
            description:
              "Where food alone isn't enough, supplements sourced and explained, and reviewed as you improve.",
          },
        ],
      },
      {
        kind: "callout",
        title: "Food that tastes like home",
        body: "For many of the people we support, food is memory, faith and family — a Greek Orthodox fasting period, a dish someone has cooked their whole life. Nutrition advice that ignores that doesn't get followed. Ours works with your food, your culture and your traditions, not against them.",
      },
      {
        kind: "checklist",
        heading: "Signs it's worth a conversation",
        items: [
          { title: "Clothes or rings getting looser", description: "Often the first sign of unplanned weight loss." },
          { title: "Skipping meals", description: "Or eating the same very limited things every day." },
          { title: "Coughing or choking at meals", description: "A sign swallowing should be assessed promptly." },
          { title: "Cooking feels like too much", description: "Especially for people who now eat alone." },
          { title: "Slow healing or frequent infections", description: "Recovery is much harder when nutrition is poor." },
          { title: "Feeling weak or unsteady", description: "Muscle loss from poor intake raises the risk of falls." },
        ],
      },
      {
        kind: "steps",
        heading: "How it works",
        items: [
          { title: "A conversation", description: "About what you're eating now, and what you'd genuinely like to eat." },
          { title: "Assessment", description: "A dietitian reviews your nutrition, weight, swallowing and medications." },
          { title: "A realistic plan", description: "Small, achievable changes built around your own food and routine." },
          { title: "Support to follow it", description: "Joined up with meal preparation, shopping or delivered meals if needed." },
          { title: "Review", description: "We track weight and strength, and adjust as things improve." },
        ],
      },
      {
        kind: "prose",
        heading: "How it's funded",
        body: [
          "Seeing a dietitian is an allied health service, which sits within clinical supports under Support at Home — fully funded by the government, with no contribution from you.",
          "Nutrition products and supplements are quoted separately, at the actual cost plus a fee covering our support in sourcing and managing them. Meal preparation and delivered meals sit under Everyday living and do attract a contribution. All of it is published on our fees page.",
        ],
      },
      {
        kind: "faqs",
        heading: "Nutrition — your questions",
        items: [
          {
            question: "Will I be put on a restrictive diet?",
            answer:
              "Almost never. For most older people the goal is the opposite — eating more, and getting more nourishment from what you do eat. Where a condition needs particular care, we manage it with the smallest change that works.",
          },
          {
            question: "Can you help if swallowing has become difficult?",
            answer:
              "Yes. A speech pathologist assesses swallowing and a dietitian makes sure the modified food and drinks are still nourishing and appealing. The two work together — one without the other rarely goes well.",
          },
          {
            question: "Can you cook Greek food?",
            answer:
              "Yes, and we'd encourage it. Familiar food gets eaten. Our team can prepare meals you actually recognise, and work around fasting periods and family traditions.",
          },
          {
            question: "What if I live alone and don't want to cook?",
            answer:
              "That's very common and there's no shame in it. Options range from someone preparing meals with you at home, through to pre-prepared meals delivered — we'll help you find the mix that works.",
          },
        ],
      },
      enquire,
    ],
  },

  // ── Support at Home pathways ───────────────────────────────────────────────
  {
    slug: "pathways",
    eyebrow: "Support at Home pathways",
    title: "Short-term pathways",
    lead: "Alongside your ongoing supports, Support at Home includes dedicated short-term pathways for particular moments in life — regaining independence after a setback, and care at the end of life.",
    status: "requires-client-confirmation",
    blocks: [
      {
        kind: "prose",
        body: [
          "Most in-home support is steady and ongoing. But there are two moments where more intensive, time-limited care makes a real difference: when someone is trying to recover their independence after an illness, a fall or a hospital stay — and when someone is nearing the end of their life and wants to be at home.",
          "Support at Home funds both of these as separate pathways, with their own budgets and their own focus. Your eligibility for either is determined through assessment.",
        ],
      },
      {
        kind: "cards",
        heading: "The two pathways",
        columns: 2,
        items: [
          {
            title: "Restorative Care Pathway",
            description:
              "Up to 16 weeks of goal-focused, allied health-led support to rebuild strength, confidence and independence.",
            href: "/pathways/restorative-care",
          },
          {
            title: "End-of-Life Pathway",
            description:
              "Intensive support so someone in the final months of life can stay comfortable, dignified and at home.",
            href: "/pathways/end-of-life",
          },
        ],
      },
      enquire,
    ],
  },
  {
    slug: "pathways/restorative-care",
    eyebrow: "Support at Home pathway",
    title: "Restorative Care Pathway",
    lead: "A short, goal-focused program — up to 16 weeks — built to help you regain strength, confidence and independence after an illness, a fall or a stay in hospital.",
    heroImage: {
      src: "/photos/service-allied-health.jpg",
      alt: "A physiotherapist supporting an older woman through a balance exercise at home",
    },
    status: "requires-client-confirmation",
    seo: {
      description:
        "The Support at Home Restorative Care Pathway with GOCSA — up to 16 weeks of allied health-led support to regain independence after illness, a fall or hospital.",
    },
    blocks: [
      {
        kind: "prose",
        heading: "What it is",
        body: [
          "The Restorative Care Pathway is short-term, intensive and deliberately optimistic. Rather than simply putting services in place around a decline, it asks a better question: what have you lost that we could help you get back?",
          "It runs for up to 16 weeks, is led by allied health professionals, and is organised entirely around goals you set — walking to the letterbox again, showering without help, getting back to church, cooking your own meals. It has its own funding, separate from your ongoing Support at Home budget, so taking it up doesn't cost you your regular services.",
        ],
      },
      {
        kind: "checklist",
        heading: "Who it's for",
        intro: "It's usually most valuable at a turning point, when things have recently changed.",
        items: [
          { title: "After a hospital stay", description: "When you've come home weaker than you went in." },
          { title: "After a fall", description: "Or after a near miss that's knocked your confidence." },
          { title: "When mobility has changed", description: "Walking, balance or stairs have become harder recently." },
          { title: "When strength has dropped", description: "Everyday tasks now take more out of you than they used to." },
          { title: "When you'd benefit from therapy", description: "And there's a realistic prospect of real improvement." },
          { title: "When you want to try", description: "Motivation matters — this pathway rewards effort." },
        ],
      },
      {
        kind: "features",
        heading: "What support you can receive",
        items: [
          {
            title: "Allied health",
            description:
              "Physiotherapy, occupational therapy, exercise physiology, podiatry, dietetics and speech pathology, coordinated as one team.",
          },
          {
            title: "Strength & mobility programs",
            description: "A progressive program you can genuinely do at home, reviewed as you get stronger.",
          },
          {
            title: "Clinical nursing",
            description: "Medication review, wound care and monitoring of any condition affecting your recovery.",
          },
          {
            title: "Daily living support",
            description: "Practical help while you're rebuilding — tapering off as you regain the ability yourself.",
          },
          {
            title: "Equipment & home changes",
            description: "Assistive technology or small modifications where they'll speed up your independence.",
          },
          {
            title: "Confidence & connection",
            description: "Support to get back out — because fear of falling can be as limiting as the injury itself.",
          },
        ],
      },
      {
        kind: "steps",
        heading: "How we deliver it",
        items: [
          {
            title: "Set goals that matter to you",
            description: "Not clinical targets — the specific things you want to be able to do again.",
          },
          {
            title: "Bring the right team together",
            description: "Your Restorative Care Partner coordinates the allied health professionals you need.",
          },
          {
            title: "Work at home, in real life",
            description: "Programs practised in your actual home, on your actual steps, with your actual kettle.",
          },
          {
            title: "Review progress properly",
            description: "Regular check-ins against your goals, with the plan adjusted as you improve.",
          },
          {
            title: "Plan the transition",
            description: "Before the 16 weeks end, we agree what ongoing support — if any — you still need.",
          },
        ],
      },
      {
        kind: "callout",
        title: "It doesn't reduce your other supports",
        body: "The Restorative Care Pathway has its own dedicated budget under Support at Home. Taking it up doesn't come out of your ongoing services budget — and because clinical supports and care management carry no contribution, the allied health at the heart of this pathway is fully funded.",
      },
      {
        kind: "faqs",
        heading: "Restorative care — your questions",
        items: [
          {
            question: "How long does it last?",
            answer:
              "Up to 16 weeks. Some people reach their goals sooner and step back to ordinary supports; others use the full period. The length is set around your goals and reviewed as you go.",
          },
          {
            question: "What happens when it finishes?",
            answer:
              "We plan for that from the start. Many people finish needing less ongoing support than before, because they've genuinely regained ability. Whatever you still need moves into your ongoing Support at Home plan, without a gap.",
          },
          {
            question: "Do I need an assessment?",
            answer:
              "Yes. Eligibility for the pathway is determined through My Aged Care assessment. We can explain the process and support you through it, but the decision sits with the assessor, not with us.",
          },
          {
            question: "What if I don't improve as much as we hoped?",
            answer:
              "That's not a failure, and it happens. Even where full recovery isn't realistic, this period usually clarifies exactly what support you need long term — and often prevents further decline.",
          },
        ],
      },
      enquire,
    ],
  },
  {
    slug: "pathways/end-of-life",
    eyebrow: "Support at Home pathway",
    title: "End-of-Life Pathway",
    lead: "When time is short, care should be calm, close and centred on comfort and dignity — for the person, and for everyone who loves them.",
    heroImage: {
      src: "/photos/service-respite.jpg",
      alt: "A daughter sitting quietly holding her elderly mother's hand at home",
    },
    status: "requires-client-confirmation",
    seo: {
      description:
        "The Support at Home End-of-Life Pathway with GOCSA — intensive, dignified support so someone in the final months of life can remain comfortable and at home.",
    },
    blocks: [
      {
        kind: "prose",
        heading: "What it is",
        body: [
          "Most people, asked where they would want to be at the end of their life, say home. Making that possible takes more support than usual, arranged quickly, and it takes people who are steady and unhurried when a family is anything but.",
          "The End-of-Life Pathway provides a higher level of support under Support at Home for people who are in the final months of life. It runs for up to 12 weeks, with the possibility of extension to 16 weeks, and is designed to be put in place fast — because at this stage, waiting is not neutral.",
        ],
      },
      {
        kind: "features",
        heading: "What support can be arranged",
        items: [
          {
            title: "Clinical care",
            description:
              "Nursing, medication support, pain and symptom management, and close monitoring — coordinated with your GP and palliative team.",
          },
          {
            title: "Personal care",
            description:
              "Gentle, unhurried help with bathing, dressing, mouth care, positioning and comfort.",
          },
          {
            title: "Family & carer support",
            description:
              "Practical guidance, someone to ask, and respite so those closest can rest without leaving anyone alone.",
          },
          {
            title: "Comfort at home",
            description:
              "Equipment, assistive technology and small changes that make the home workable — a bed in the right room, the right chair, the right rails.",
          },
          {
            title: "Emotional & spiritual support",
            description:
              "Companionship, and space for faith, prayer and the traditions that matter to your family.",
          },
          {
            title: "Cultural and language care",
            description:
              "Greek-speaking staff where you want them, and care that respects Orthodox practice at the end of life.",
          },
        ],
      },
      {
        kind: "checklist",
        heading: "Who it's for",
        items: [
          {
            title: "People in the final months of life",
            description: "Where a clinical assessment indicates a limited prognosis.",
          },
          {
            title: "People who want to be at home",
            description: "Where remaining at home is the person's wish and can be safely supported.",
          },
          {
            title: "Families needing more support",
            description: "Where the care required has outgrown what loved ones can manage alone.",
          },
          {
            title: "Determined through assessment",
            description: "Eligibility for the pathway is confirmed by a My Aged Care assessor.",
          },
        ],
      },
      {
        kind: "steps",
        heading: "How we work with you",
        items: [
          {
            title: "We move quickly",
            description: "At this stage responsiveness matters more than process, and we treat it that way.",
          },
          {
            title: "We work with your medical team",
            description: "Alongside the GP, palliative care service and any specialists already involved.",
          },
          {
            title: "We plan around the person",
            description: "Their wishes, their room, their routines, their faith — written down and respected.",
          },
          {
            title: "We support the family too",
            description: "Explaining what to expect, and making sure carers are not carrying this alone.",
          },
          {
            title: "We stay steady",
            description: "Consistent, familiar faces, so nobody has to explain the situation twice.",
          },
        ],
      },
      {
        kind: "callout",
        title: "This works alongside palliative care",
        body: "The End-of-Life Pathway is not a replacement for specialist palliative care. Palliative services lead symptom and medical management; this pathway funds the intensive in-home care, personal support and practical help that make staying at home possible. The two are designed to work together, and we coordinate with your palliative team.",
      },
      {
        kind: "faqs",
        heading: "End-of-life care — your questions",
        items: [
          {
            question: "How long does the pathway run?",
            answer:
              "Up to 12 weeks, with the possibility of extension to 16 weeks where it's still needed. Support is reviewed continually, because needs at this stage can change quickly.",
          },
          {
            question: "How is this different from palliative care?",
            answer:
              "Specialist palliative care manages medical symptoms and pain. This pathway funds the in-home care around that — nursing hours, personal care, equipment and family support — so home remains a realistic place to be. Most people have both.",
          },
          {
            question: "How quickly can support start?",
            answer:
              "As fast as we can arrange it. We know that a delay of a fortnight can mean the whole thing was pointless, so this is prioritised over routine work.",
          },
          {
            question: "What support is there for the family?",
            answer:
              "Respite so carers can sleep, practical guidance about what to expect, help with the day-to-day, and someone to call. Caring for someone at the end of their life is exhausting, and support for the family is part of the pathway, not an extra.",
          },
          {
            question: "Can care be delivered in Greek?",
            answer:
              "Yes, wherever possible. At this stage in particular, many people return to their first language. We'll do everything we can to make sure the people around them speak it.",
          },
        ],
      },
      {
        kind: "cta",
        title: "If you're facing this now",
        body: "Please just call us. You don't need to have the paperwork sorted, or know the right words for what you need — that's our job. We'll talk it through gently and move quickly.",
        primary: { label: "Speak with our team", href: "/contact" },
        secondary: { label: "Understand the pathways", href: "/pathways" },
      },
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
      {
        kind: "rates",
        heading: "Support at Home — standard services and fees",
        intro:
          "Our Support at Home (SaH) price list, in full. What you actually pay is your contribution towards these prices — that percentage is set by Services Australia based on your situation, and is explained below.",
        meta: ["Effective 1 July 2026", "All rates exclude GST", "Prices reviewed regularly"],
        groups: [
          {
            title: "Everyday living",
            intro:
              "Support to help you keep your home in a liveable state, so you can stay independent at home. A higher contribution may be required.",
            columns: WEEKEND_COLUMNS,
            rows: [
              {
                label: "Domestic assistance",
                bullets: ["General house cleaning — essential light cleaning", "Laundry services"],
                unit: "Hourly rate",
                values: ["$120", "$145", "$175", "$200", "$250"],
              },
              {
                label: "Shopping assistance",
                bullets: ["Includes 20 km of travel"],
                unit: "Hourly rate",
                values: ["$145", "$175", "$205", "$240", "$285"],
              },
              {
                label: "Meal preparation",
                unit: "Hourly rate",
                values: ["$120", "$145", "$175", "$200", "$250"],
              },
              {
                label: "Meal delivery (pre-prepared)",
                bullets: [
                  "Self-managed via an Associate or third-party provider, excluding the groceries component",
                ],
                unit: "Per meal",
                values: ["$25", "—", "—", "—", "—"],
              },
              {
                label: "Gardening — essential light gardening",
                unit: "Hourly rate",
                values: ["$140", "—", "—", "—", "—"],
              },
              {
                label: "Assistance with home maintenance and repairs",
                unit: "Hourly rate",
                values: ["$150", "—", "—", "—", "—"],
              },
              {
                label: "Expenses for home maintenance and repairs",
                unit: "As per quote",
                note: "Cost varies based on the third-party expense — the actual cost plus 10% to cover our support in managing the service.",
              },
            ],
            footnotes: [
              "Meal delivery pricing depends on third-party service delivery costs and may vary.",
            ],
          },
          {
            title: "Independence",
            intro:
              "Support to help you manage daily activities and maintain the skills you need to live independently. A moderate contribution may be required.",
            columns: WEEKEND_COLUMNS,
            rows: [
              {
                label: "Personal care",
                bullets: [
                  "Assistance with self-care and activities of daily living",
                  "Assistance with the self-administration of medication",
                  "Continence management (non-clinical)",
                ],
                unit: "Hourly rate",
                values: ["$120", "$145", "$175", "$200", "$250"],
              },
              {
                label: "Home or community general respite",
                bullets: ["Flexible respite"],
                unit: "Hourly rate",
                values: ["$120", "$145", "$175", "$200", "$250"],
              },
              {
                label: "Social support and community engagement",
                bullets: [
                  "Individual social support",
                  "Cultural support",
                  "Digital education and support",
                  "Assistance to maintain personal affairs",
                ],
                unit: "Hourly rate",
                values: ["$120", "$145", "$175", "$200", "$250"],
              },
              {
                label: "Accompanied activities",
                bullets: ["Includes 20 km of travel"],
                unit: "Hourly rate",
                values: ["$145", "$175", "$205", "$240", "$285"],
              },
              {
                label: "Group social support",
                unit: "Per session",
                values: ["$135", "—", "—", "—", "—"],
              },
            ],
          },
          {
            title: "Therapeutic services for independent living",
            intro: "Charged at an initial, standard or extended rate depending on the appointment.",
            columns: SESSION_COLUMNS,
            rows: [
              {
                label: "Remedial massage",
                unit: "Hourly rate",
                values: ["$270", "$195", "$230"],
              },
            ],
          },
          {
            title: "Transport",
            intro:
              "Group and individual transport assistance. Transport is charged per one-way trip.",
            columns: STANDARD_HOURS_COLUMNS,
            rows: [
              { label: "Direct transport — 0–10 km", unit: "Per trip", values: ["$60"] },
              { label: "Direct transport — 11–20 km", unit: "Per trip", values: ["$90"] },
              { label: "Direct transport — 21–30 km", unit: "Per trip", values: ["$120"] },
              { label: "Direct transport — 30–60 km", unit: "Per trip", values: ["$200"] },
              { label: "Direct transport — over 60 km", unit: "Per trip", values: ["Negotiable"] },
              {
                label: "Indirect transport (taxi and ride share)",
                unit: "Per trip",
                note: "Self-managed via an Associate or third-party provider. Pricing depends on third-party service delivery costs and may vary — the actual fare plus 10% to cover our support in managing the service.",
              },
            ],
            footnotes: ["Direct transport services include a staff member and vehicle time."],
          },
          {
            title: "Clinical supports",
            intro:
              "Specialised services to maintain or regain functional and cognitive capability, delivered or supervised by qualified health professionals. No contribution is required for these services.",
            columns: WEEKEND_COLUMNS,
            rows: [
              {
                label: "Registered nurse clinical care",
                unit: "Hourly rate",
                values: ["$190", "$215", "$250", "$310", "$370"],
              },
              {
                label: "Enrolled nurse clinical care",
                unit: "Hourly rate",
                values: ["$150", "$175", "$210", "$270", "$330"],
              },
              {
                label: "Nursing care consumables",
                unit: "As per quote",
                note: "Cost varies based on the cost of specialised nursing products — the actual cost plus 10% to cover our support in managing the service.",
              },
            ],
            footnotes: [
              "Indirect nursing services incur an additional charge of $190 per hour. Indirect services include completing documentation, report writing, organising referrals and updating care plans.",
              "Nursing care consumables include a 10% administrative fee, up to a maximum of $500.",
            ],
          },
          {
            title: "Care management",
            intro:
              "Your Care Partner coordinates your supports and stays in touch as your needs change.",
            columns: STANDARD_HOURS_COLUMNS,
            rows: [
              {
                label: "Home Support Care Management (Care Partner)",
                unit: "Hourly rate",
                values: ["$150"],
              },
              {
                label: "Home Support Restorative Care Management (Restorative Care Partner)",
                unit: "Hourly rate",
                values: ["$175"],
              },
            ],
            footnotes: [
              "Charged on actual time spent, with a 15-minute minimum. This includes both direct contact and indirect activities such as planning your services, calling you to make sure everything is working well, coordinating services, documenting our interactions, and adjusting your services if your needs change.",
            ],
          },
          {
            title: "Allied health and other therapeutic services",
            intro: "Charged at an initial, standard or extended rate depending on the appointment.",
            columns: SESSION_COLUMNS,
            rows: [
              {
                label: "Allied health and other therapeutic services",
                bullets: [
                  "Physiotherapist",
                  "Exercise Physiologist",
                  "Dietitian or Nutritionist",
                  "Social Worker",
                  "Podiatrist",
                  "Occupational Therapist",
                  "Speech Pathologist",
                  "Psychologist",
                ],
                unit: "Hourly rate",
                values: ["$340", "$260", "$300"],
              },
              {
                label: "Nutrition supports",
                unit: "As per quote",
                note: "Cost varies based on the cost of specialised nutrition support products — the actual cost plus 10% to cover our support in managing the service.",
              },
            ],
            footnotes: [
              "In-home and some in-clinic services incur an additional charge for indirect services at $260 per hour. Indirect services include completing documentation, report writing, organising referrals and updating care plans.",
            ],
          },
          {
            title: "Assistive technology and home modifications",
            intro:
              "Through the AT–HM Scheme you can access tailored equipment and make changes to your home that support your wellbeing.",
            columns: QUOTE_COLUMNS,
            rows: [
              {
                label: "Assistive technology (equipment and products)",
                bullets: [
                  "Assistive technology prescription and clinical support",
                  "Communication and information management products",
                  "Domestic life products",
                  "Managing body functions",
                  "Mobility products",
                  "Self-care products",
                ],
                unit: "As per quote",
                note: "Cost varies based on the third-party expense. Assistive technology includes a 10% administrative fee, up to a maximum of $500.",
              },
              {
                label: "Home modifications (home adjustments)",
                bullets: [
                  "Home modification prescription and clinical support",
                  "Home modification products",
                ],
                unit: "As per quote",
                note: "Cost varies based on the third-party expense. Home modifications include a 15% coordination fee, up to a maximum of $1,500.",
              },
            ],
            footnotes: [
              "Prescription and wrap-around services are charged at the relevant allied health or other therapeutic services price. We'll give you a quote based on your circumstances and, once agreed with your Care Partner, it's added to your budget.",
            ],
          },
        ],
        footnotes: [
          "All prices exclude GST unless otherwise stated.",
          "This information is correct at the time of publishing and valid from 1 July 2026. Prices are reviewed regularly and are subject to change.",
        ],
      },
      {
        kind: "tables",
        heading: "What you'll contribute",
        intro:
          "Your individual contribution rate is set and communicated to you by Services Australia, based on your financial situation. Your contribution is a percentage of the price of the service — not the full price.",
        tables: [
          {
            caption: "If the 'no worse off' principle applies to you",
            columns: ["Clinical supports", "Independence supports", "Everyday living supports"],
            rows: [
              { header: "Full pensioner", cells: ["0%", "0%", "0%"] },
              {
                header: "Part pensioner",
                cells: [
                  "0%",
                  "0–25%, based on an assessment of your income and assets (your Age Pension means assessment)",
                  "0–25%, based on an assessment of your income and assets (your Age Pension means assessment)",
                ],
              },
              {
                header:
                  "Self-funded retiree holding or eligible for a Commonwealth Seniors Health Card (CSHC)",
                cells: [
                  "0%",
                  "0–25%, based on an assessment of your income and assets. CSHC holders undergo a separate Support at Home assessment",
                  "0–25%, based on an assessment of your income and assets. CSHC holders undergo a separate Support at Home assessment",
                ],
              },
              {
                header: "Self-funded retiree not eligible for a CSHC",
                cells: ["0%", "25%", "25%"],
              },
            ],
          },
          {
            caption: "If the 'no worse off' principle does not apply to you",
            columns: ["Clinical supports", "Independence supports", "Everyday living supports"],
            rows: [
              { header: "Full pensioner", cells: ["0%", "5%", "17.5%"] },
              {
                header: "Part pensioner",
                cells: [
                  "0%",
                  "5–50%, based on an assessment of your income and assets (your Age Pension means assessment)",
                  "17.5–80%, based on an assessment of your income and assets (your Age Pension means assessment)",
                ],
              },
              {
                header:
                  "Self-funded retiree holding or eligible for a Commonwealth Seniors Health Card (CSHC)",
                cells: [
                  "0%",
                  "5–50%, based on an assessment of your income and assets. CSHC holders undergo a separate Support at Home assessment",
                  "17.5–80%, based on an assessment of your income and assets. CSHC holders undergo a separate Support at Home assessment",
                ],
              },
              {
                header: "Self-funded retiree not eligible for a CSHC",
                cells: ["0%", "50%", "80%"],
              },
            ],
          },
        ],
        footnotes: [
          "The government covers the entire cost of clinical care services such as nursing, allied health and care management — you pay no contribution for these.",
          "The government covers most of the cost of Independence services such as personal care, social support and community engagement, respite, transport, and assistive technology or home modifications. A moderate contribution applies.",
          "The government covers less of the cost of Everyday living services such as domestic assistance, gardening, home maintenance and meals. A higher contribution applies.",
          "Some people who were already receiving a home care package before 12 September 2024 pay no contribution, or a reduced rate, under the government's 'no worse off' principle. If you're not sure which applies to you, just ask us.",
          "We'll send you an invoice each month showing the contribution amount you need to pay.",
        ],
      },
      {
        kind: "checklist",
        heading: "Other things worth knowing",
        items: [
          {
            title: "Nursing care consumables",
            description:
              "Items associated with clinical care — continence aids, bandages, wound dressings, skin emollients and similar — are charged separately, with a 10% administrative fee up to a maximum of $500. These are supplied by an approved supplier; talk to your Care Partner.",
          },
          {
            title: "Assistive technology and home modifications",
            description:
              "Equipment and home adjustments prescribed by allied health professionals can be hired or purchased to help you live independently. Assistive technology includes a 10% administrative fee (max $500); home modifications include a 15% coordination fee (max $1,500).",
          },
          {
            title: "Third-party providers",
            description:
              "Where we can't provide our own staff for a shift, or you ask us to source a contractor, we engage a third-party provider — always checked against our quality standards with a relevant police clearance. If you choose your own provider, a 10% administration fee applies on top of their prices.",
          },
          {
            title: "A service that isn't listed",
            description:
              "If you'd like something that isn't on our price list, talk to us. We may be able to arrange it. Depending on your needs the price may differ from this list — if so, we'll discuss it with you and agree the price in writing first.",
          },
          {
            title: "Cancelling a visit",
            description:
              "The notice period for cancellations is 24 hours. If a service is cancelled with less than 24 hours' notice, or nobody is home at the scheduled time, the full cost of that service is billed.",
          },
          {
            title: "Pausing your services",
            description:
              "In most cases we can put your services on hold — for a hospital stay, a holiday or respite care. Let your Care Partner know as early as you can so we can reorganise things and avoid late-notice cancellation charges.",
          },
        ],
      },
      {
        kind: "faqs",
        heading: "Funding — your questions",
        items: [FAQ.cost, FAQ.needFunding, FAQ.getStarted],
      },
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
      {
        kind: "cta",
        title: "Ninety-five years of community.",
        body: "Discover the faith, culture and heritage that shape the way we care.",
        primary: { label: "Our heritage & community", href: "/heritage" },
        secondary: { label: "Speak with our team", href: "/contact" },
      },
    ],
  },
  {
    slug: "heritage",
    eyebrow: "Our heritage",
    title: "Ninety-five years of community",
    lead: "Since 1930, the Greek Orthodox Community of South Australia has been a home away from home — a place of faith, language, culture and belonging. That same spirit of care now reaches into people's homes.",
    heroImage: {
      src: "/photos/heritage.jpg",
      alt: "Archival photograph of an early Greek Orthodox community gathering in South Australia",
    },
    status: "requires-client-confirmation",
    seo: {
      description:
        "The heritage of the Greek Orthodox Community of South Australia — faith, culture and caring for our community since 1930 — and how it shapes our care.",
    },
    blocks: [
      {
        kind: "prose",
        body: [
          "The Greek Orthodox Community of South Australia was founded in 1930 by families who wanted to keep their faith, language and culture alive in a new home — and to look after one another.",
          "Across the generations since, that community has built places of worship, schools, cultural life and lasting friendships. Caring for our own has always been at the heart of it.",
        ],
      },
      {
        kind: "steps",
        heading: "Chapters of our story",
        intro: "A community built on faith, learning, culture and care.",
        items: [
          { title: "1930 — A community founded", description: "Greek families come together to build a home away from home in South Australia." },
          { title: "Faith at the centre", description: "Places of worship become the spiritual and social heart of the community." },
          { title: "Language & learning", description: "The Greek language and culture are passed on to each new generation." },
          { title: "Culture & celebration", description: "Festivals, dance, music and food keep traditions alive and shared." },
          { title: "Caring for our elders", description: "The community's care for its people grows into dedicated support for older South Australians." },
        ],
      },
      {
        kind: "checklist",
        heading: "The values we carry",
        items: [
          { title: "Faith", description: "The Orthodox faith that has anchored our community for generations." },
          { title: "Language", description: "The Greek language, kept alive and spoken with pride." },
          { title: "Culture", description: "The traditions, celebrations and food that bring us together." },
          { title: "Community", description: "Looking after one another — the reason we began." },
        ],
      },
      {
        kind: "media",
        image: {
          src: "/photos/heritage.jpg",
          alt: "Archival photograph of the Greek Orthodox community in South Australia",
        },
        caption: "Archival photography to be supplied by GOCSA.",
      },
      {
        kind: "callout",
        title: "Bring our history to life",
        body: "This page is ready to feature GOCSA's real heritage — historic photographs, monuments, places and milestones from the community's own archives and records. Please provide these images and dates so we can showcase them here, with the correct detail confirmed.",
      },
      {
        kind: "prose",
        heading: "Heritage that shapes our care",
        body: [
          "The same community that built churches, schools and a cultural home now extends that care into people's homes — and, in time, into dedicated care centres.",
          "When we care for an older South Australian, we do it as a community that has looked after its people for ninety-five years — with respect, in language, and with love.",
        ],
      },
      {
        kind: "cards",
        heading: "Care grounded in community",
        items: [
          { title: "In-home aged care", description: "Support that helps older people live well at home.", href: "/aged-care" },
          { title: "In-home nursing", description: "Clinical care delivered at home by qualified nurses.", href: "/services/in-home-nursing" },
          { title: "Our services", description: "Every way we can support you or someone you love.", href: "/services" },
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
    lead: "Transparency and safety matter. These pages explain your rights and how we uphold them.",
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
    ],
  },
  policyPage({
    slug: "policies/privacy",
    title: "Privacy",
    lead: "How we collect, use, store and protect your personal and health information — and the rights you have over it.",
    body: [
      {
        kind: "prose",
        body: [
          "We treat your personal and health information with care and respect, and handle it in line with the Privacy Act 1988 (Cth) and the Australian Privacy Principles. This page explains what we collect, why we collect it, how we keep it safe, and the rights you have.",
          "Your information is only ever collected and used to provide safe, high-quality care and to meet our legal and funding obligations.",
        ],
      },
      {
        kind: "checklist",
        heading: "Information we collect",
        intro: "We only collect what we genuinely need to care for you.",
        items: [
          { title: "Personal details", description: "Your name, date of birth, contact details, next of kin and emergency contacts." },
          { title: "Health & care information", description: "Your health history, medications, care needs, risks and goals." },
          { title: "Cultural & language preferences", description: "Your language, cultural and religious preferences, so care feels right for you." },
          { title: "Funding & assessment details", description: "Your My Aged Care details, assessment outcomes and any fee arrangements." },
          { title: "Records of your care", description: "Notes about the support provided, and any feedback you give us." },
        ],
      },
      {
        kind: "prose",
        heading: "How we collect and use it",
        body: [
          "Wherever possible we collect information directly from you. With your consent we may also collect it from people involved in your care — such as a family member, your GP, My Aged Care or an assessor.",
          "We use your information to plan, deliver and coordinate your care, to keep you safe, to meet our legal and funding obligations, and to improve our service. We do not sell your information.",
        ],
      },
      {
        kind: "checklist",
        heading: "How we protect your information",
        items: [
          { title: "Stored securely", description: "Held in secure systems with access controls." },
          { title: "Need-to-know access", description: "Seen only by the people involved in your care." },
          { title: "Trained, bound staff", description: "Handled by staff trained in privacy and bound by confidentiality." },
          { title: "Kept only as needed", description: "Retained as required, then securely destroyed." },
          { title: "Breach response", description: "A clear process to act quickly if information is ever at risk." },
        ],
      },
      {
        kind: "prose",
        heading: "Sharing your information",
        body: [
          "We share your information only with your consent, or where permitted or required by law — for example, with your GP or care team to coordinate your care, or in a genuine emergency to protect your health and safety. We do not routinely disclose your information overseas.",
        ],
      },
      {
        kind: "checklist",
        heading: "Your privacy rights",
        items: [
          { title: "Access", description: "Ask for a copy of the information we hold about you." },
          { title: "Correction", description: "Ask us to correct anything that is wrong or out of date." },
          { title: "Transparency", description: "Ask how your information is used and who it is shared with." },
          { title: "Withdraw consent", description: "Change your mind about a consent you have given." },
          { title: "Complain", description: "Raise a privacy concern with us at any time." },
        ],
      },
      {
        kind: "callout",
        title: "Making a privacy complaint",
        body: "Please contact us first so we can put things right. If you're not satisfied, you can contact the Office of the Australian Information Commissioner (OAIC) on 1300 363 992.",
      },
    ],
  }),
  policyPage({
    slug: "policies/complaints",
    title: "Complaints & feedback",
    lead: "How to raise a concern or give feedback, and how we respond — fairly, promptly, and without any disadvantage to your care.",
    body: [
      {
        kind: "prose",
        body: [
          "Your feedback helps us improve, and you have every right to raise a concern. We welcome it, take it seriously, and respond fairly — in English or Greek. You can involve a family member, carer or advocate at any time.",
        ],
      },
      {
        kind: "checklist",
        heading: "How to raise a concern or give feedback",
        items: [
          { title: "In person", description: "Speak with any member of our team." },
          { title: "By phone", description: "Call us on (08) 7088 0500." },
          { title: "By email", description: "Email admin@gocsacc.org.au." },
          { title: "In writing", description: "Write to Level 1/262 Franklin Street, Adelaide SA 5000." },
          { title: "Through someone else", description: "Ask a family member, carer or advocate to raise it for you." },
        ],
      },
      {
        kind: "steps",
        heading: "What happens after you tell us",
        items: [
          { title: "We acknowledge", description: "We confirm we've received your feedback, promptly." },
          { title: "We listen", description: "We make sure we understand your concern and what matters to you." },
          { title: "We look into it", description: "We review what happened, fairly and thoroughly." },
          { title: "We resolve and respond", description: "We explain the outcome and what we'll do." },
          { title: "We follow up and improve", description: "We check you're satisfied and use what we learn." },
        ],
      },
      {
        kind: "checklist",
        heading: "Our commitments to you",
        columns: 2,
        items: [
          { title: "Taken seriously", description: "Every concern matters and is treated with respect." },
          { title: "No disadvantage", description: "Raising a concern will never affect your care." },
          { title: "Support to speak up", description: "You can have a family member, carer or advocate involved." },
          { title: "We improve", description: "We use feedback to make our service better." },
        ],
      },
      {
        kind: "callout",
        title: "If you're not satisfied",
        body: "You can contact the independent Aged Care Quality and Safety Commission at any time on 1800 951 822 — you do not have to raise your concern with us first.",
      },
    ],
    help: [helplines],
  }),
  policyPage({
    slug: "policies/client-rights",
    title: "Client rights & responsibilities",
    lead: "Your rights as a person receiving care — reflecting the Charter of Aged Care Rights — and how we work together.",
    body: [
      {
        kind: "prose",
        body: [
          "You have the right to safe, respectful, high-quality care that supports your independence, identity and choices. We support these rights in everyday practice — and explain them in English or Greek.",
        ],
      },
      {
        kind: "checklist",
        heading: "Your rights",
        intro: "Reflecting the Charter of Aged Care Rights, you have the right to:",
        items: [
          { title: "Safe, quality care", description: "Care and services that are safe and right for you." },
          { title: "Dignity & respect", description: "To be treated with dignity, respect and kindness." },
          { title: "Identity & culture", description: "To have your identity, culture, language and diversity valued." },
          { title: "Freedom from harm", description: "To live without abuse, neglect or exploitation." },
          { title: "Information you understand", description: "To be told about your care in a way that makes sense to you." },
          { title: "Choice & control", description: "To make decisions about your own care and to take personal risks." },
          { title: "Privacy", description: "To have your personal information respected and kept confidential." },
          { title: "An advocate & supports", description: "To have people of your choice, including an advocate, involved." },
          { title: "To complain freely", description: "To raise concerns without fear, and be listened to and understood." },
          { title: "To stay connected", description: "To have visitors and remain part of your community." },
        ],
      },
      {
        kind: "checklist",
        heading: "Working together — your part",
        columns: 2,
        items: [
          { title: "Mutual respect", description: "Treat our team with courtesy and respect." },
          { title: "Share information", description: "Tell us what we need to know to care for you safely." },
          { title: "Keep us updated", description: "Let us know when your needs or circumstances change." },
          { title: "A safe environment", description: "Help provide a safe place for our team to work." },
        ],
      },
      {
        kind: "prose",
        heading: "Your rights, in your language",
        body: [
          "All of this is available and explained in English or Greek, with free interpreting in other languages if you prefer.",
        ],
      },
    ],
    help: [helplines],
  }),
  policyPage({
    slug: "policies/safeguarding",
    title: "Safeguarding",
    lead: "How we keep the people we support safe from harm, abuse, neglect and exploitation.",
    body: [
      {
        kind: "prose",
        body: [
          "The safety and wellbeing of the people we support comes first, always. We have a zero-tolerance approach to abuse, neglect and exploitation, and clear ways to prevent, recognise and respond to harm.",
        ],
      },
      {
        kind: "checklist",
        heading: "How we keep you safe",
        items: [
          { title: "Careful recruitment", description: "Reference and identity checks, and police checks for our team." },
          { title: "Worker screening", description: "Aged care worker screening in line with requirements." },
          { title: "Ongoing training", description: "Regular training in recognising and preventing abuse and neglect." },
          { title: "Supervision & culture", description: "Support, supervision and a strong culture of speaking up." },
          { title: "Clear procedures", description: "Defined steps for reporting and responding to concerns." },
        ],
      },
      {
        kind: "features",
        heading: "Recognising harm",
        intro: "Harm can take many forms. We help our team and families recognise the signs.",
        items: [
          { title: "Physical", description: "Any physical harm, rough handling or unlawful restraint." },
          { title: "Emotional", description: "Intimidation, humiliation, isolation or controlling behaviour." },
          { title: "Financial", description: "Misuse of a person's money, assets or property." },
          { title: "Sexual", description: "Any non-consensual or inappropriate sexual behaviour." },
          { title: "Neglect", description: "Failing to provide the care and support a person needs." },
          { title: "Restrictive practices", description: "Restrictions used other than as a genuine, lawful last resort." },
        ],
      },
      {
        kind: "steps",
        heading: "If a concern is raised",
        items: [
          { title: "Ensure immediate safety", description: "We act first to protect the person from harm." },
          { title: "Report", description: "We report through the right channels without delay." },
          { title: "Investigate and act", description: "We look into it thoroughly and take action." },
          { title: "Support those affected", description: "We support anyone affected with care and respect." },
          { title: "Learn and prevent", description: "We review what happened to prevent it recurring." },
        ],
      },
      {
        kind: "callout",
        title: "Our reporting obligations",
        body: "We take our obligations seriously, including under the Serious Incident Response Scheme (SIRS), and work with the Aged Care Quality and Safety Commission and, where relevant, the police.",
      },
    ],
    help: [helplines],
  }),
  policyPage({
    slug: "policies/quality",
    title: "Quality & governance",
    lead: "How we deliver safe, high-quality care and keep improving — working to the Aged Care Quality Standards.",
    body: [
      {
        kind: "prose",
        body: [
          "We are committed to safe, high-quality care and to continuously improving. Our service works to meet the Aged Care Quality Standards, with clear accountability for the quality and safety of your care.",
        ],
      },
      {
        kind: "checklist",
        heading: "How we work to the Quality Standards",
        items: [
          { title: "You at the centre", description: "Care built on your dignity, respect and choices." },
          { title: "Assessment & planning", description: "Ongoing planning done together with you." },
          { title: "Safe personal & clinical care", description: "Care that's right for you and delivered safely." },
          { title: "Skilled, supported team", description: "A workforce that's screened, trained and cared for." },
          { title: "A safe environment", description: "Support delivered safely in your home." },
          { title: "Feedback & complaints", description: "Open channels that drive improvement." },
          { title: "Strong governance", description: "Clear oversight of quality and safety." },
        ],
      },
      {
        kind: "checklist",
        heading: "How we keep improving",
        columns: 2,
        items: [
          { title: "We ask", description: "We seek your feedback and really listen." },
          { title: "We review", description: "We measure and review the care we provide." },
          { title: "We act", description: "We make changes based on what we learn." },
          { title: "We're open", description: "We practise open disclosure when things go wrong." },
        ],
      },
      {
        kind: "prose",
        heading: "Governance",
        body: [
          "Responsibility for care quality and safety is clear, with oversight, clinical governance where relevant, and a workforce that is screened, trained and supported to do their best work.",
        ],
      },
    ],
    help: [helplines],
  }),
  policyPage({
    slug: "policies/advocacy",
    title: "Advocacy & consent",
    lead: "Your right to make your own choices — and to have someone support you to do so.",
    body: [
      {
        kind: "prose",
        body: [
          "You have the right to make decisions about your own care, and to have support to do so. This page explains how we support informed consent, supported decision-making, and your access to advocacy.",
        ],
      },
      {
        kind: "checklist",
        heading: "Informed consent",
        items: [
          { title: "Explained clearly", description: "We explain your options in plain language, in English or Greek." },
          { title: "Understanding first", description: "We make sure you understand before care begins." },
          { title: "Your questions", description: "You can ask questions and take the time you need." },
          { title: "You can change your mind", description: "You can withdraw a consent at any time." },
          { title: "Recorded with you", description: "We record your decisions together with you." },
        ],
      },
      {
        kind: "checklist",
        heading: "Supported decisions & dignity of risk",
        columns: 2,
        items: [
          { title: "Your goals first", description: "We start from what matters to you." },
          { title: "Weighing choices", description: "We help you consider the options and trade-offs." },
          { title: "Dignity of risk", description: "We respect your right to take reasonable risks." },
          { title: "Your people involved", description: "We involve the people you choose, and any substitute decision-maker appropriately." },
        ],
      },
      {
        kind: "callout",
        title: "Your right to an advocate",
        body: "Anyone can support you to have your say — a family member, friend, or a free independent advocate. Free, confidential aged care advocacy is available through the Older Persons Advocacy Network (OPAN) on 1800 700 600.",
      },
    ],
    help: [helplines],
  }),
  policyPage({
    slug: "policies/code-of-conduct",
    title: "Code of conduct",
    lead: "The standard of behaviour you can expect from everyone who represents GOCSA Community Care.",
    body: [
      {
        kind: "prose",
        body: [
          "Everyone who works with us — staff and volunteers — is expected to act with respect, honesty and care. This reflects the principles of the Aged Care Code of Conduct.",
        ],
      },
      {
        kind: "checklist",
        heading: "What you can expect from our people",
        items: [
          { title: "Respect & diversity", description: "To treat you with respect and value your identity, culture and diversity." },
          { title: "Skilled, careful care", description: "To act with care, skill and competence." },
          { title: "Honesty & integrity", description: "To be honest and act in your best interests." },
          { title: "Freedom from harm", description: "To never engage in any form of abuse, neglect or exploitation." },
          { title: "Least restrictive", description: "To use restrictive practices only as a genuine, lawful last resort." },
          { title: "Your privacy", description: "To protect your personal information." },
          { title: "Speak up", description: "To take action and speak up if care ever falls short." },
          { title: "No discrimination", description: "To provide care free from discrimination, harassment and bullying." },
        ],
      },
      {
        kind: "prose",
        heading: "Holding ourselves to it",
        body: [
          "We support this standard through training, supervision and clear accountability. You can raise a concern about anyone's conduct at any time — see Complaints & feedback.",
        ],
      },
    ],
    help: [helplines],
  }),
  policyPage({
    slug: "accessibility",
    title: "Accessibility",
    lead: "Our commitment to an accessible, inclusive service — online, on the phone and in person.",
    body: [
      {
        kind: "prose",
        body: [
          "We want everyone to be able to access our service and information easily — regardless of ability, language or background.",
        ],
      },
      {
        kind: "checklist",
        heading: "An inclusive service",
        items: [
          { title: "English or Greek", description: "Care and information available in English and Greek." },
          { title: "Free interpreting", description: "Interpreting in other languages via TIS National on 131 450." },
          { title: "Plain language", description: "Information written to be clear and easy to understand." },
          { title: "Other formats", description: "Large print or read-aloud options on request." },
          { title: "Individual needs", description: "Support for sensory, mobility or cognitive needs." },
        ],
      },
      {
        kind: "checklist",
        heading: "This website",
        columns: 2,
        items: [
          { title: "WCAG-guided", description: "We're working towards the Web Content Accessibility Guidelines." },
          { title: "Readable design", description: "Clear structure, readable type and strong colour contrast." },
          { title: "Keyboard & screen-reader friendly", description: "Built to work without a mouse and with assistive tech." },
          { title: "Descriptive links & images", description: "Meaningful link text and image descriptions." },
        ],
      },
      {
        kind: "prose",
        heading: "Tell us what you need",
        body: [
          "Ask us for information in another format or language, or tell us how we can make things easier — by phone, email or in person. Your feedback helps us improve.",
        ],
      },
    ],
    help: [helplines],
  }),
];

/** Compact service summaries reused across pages. */
function serviceSummaries() {
  return [
    { title: "Personal care", description: "Respectful help with showering, dressing and mobility.", href: "/services/personal-care" },
    { title: "Domestic assistance", description: "Cleaning, laundry, meal preparation and everyday home tasks.", href: "/services/domestic-assistance" },
    { title: "Social support & companionship", description: "Connection, conversation and accompanied outings.", href: "/services/social-wellbeing" },
    { title: "In-home nursing", description: "Clinical care and medication support at home.", href: "/services/in-home-nursing" },
    { title: "Allied health", description: "Physiotherapy, occupational therapy, podiatry, dietetics and more.", href: "/services/allied-health" },
    { title: "Respite care", description: "A break for family carers, so they can rest and recharge.", href: "/services/respite" },
    { title: "Transport & errands", description: "Getting to appointments, shops and community — safely.", href: "/services/transport" },
    { title: "Home maintenance & repairs", description: "Keeping your home safe, sound and easy to live in.", href: "/services/home-maintenance" },
    { title: "Nutrition", description: "Eating well for strength, recovery and independence.", href: "/services/nutrition" },
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

/** Raw base pages — reused (rebranded) by the RGHA preview site. */
export const basePages = list;

export const pageSource: PageSource = {
  getPage: (slug) => bySlug.get(slug),
  allSlugs: () => list.map((p) => p.slug),
};
