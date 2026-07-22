/**
 * PREVIEW FIXTURES — demonstration content for the client preview. Copy marked with a
 * `status` is surfaced in review mode. Nothing here is a confirmed GOCSA fact unless marked
 * `confirmed`. No fabricated statistics; the only confirmed heritage claim is "since 1930".
 */
import type { HomepageContent, SiteChrome } from "./types";

export const siteChrome: SiteChrome = {
  brand: {
    name: "GOCSA Community Care",
    est: "EST. 1930",
    logoSrc: "/brand/gocsa-logo-lockup.png",
    logoNeedsVector: true, // raster only — final SVG/EPS required before launch (D6)
  },
  nav: [
    { label: "Support at Home", href: "/support-at-home" },
    {
      label: "Our Services",
      href: "/services",
      children: [
        { label: "Personal care", href: "/services/personal-care" },
        { label: "Household help", href: "/services/household-help" },
        { label: "Social & wellbeing", href: "/services/social-wellbeing" },
        { label: "In-home nursing", href: "/services/in-home-nursing" },
      ],
    },
    { label: "Funding & Access", href: "/funding" },
    { label: "About", href: "/about" },
    { label: "Resources & Policies", href: "/resources" },
    { label: "Contact", href: "/contact" },
  ],
  headerCta: { label: "Speak with our team", href: "/contact" },
  footer: {
    columns: [
      {
        heading: "Community Care",
        links: [
          { label: "Support at Home", href: "/support-at-home" },
          { label: "Our Services", href: "/services" },
          { label: "Funding & Access", href: "/funding" },
          { label: "How to get started", href: "/how-to-get-started" },
        ],
      },
      {
        heading: "About",
        links: [
          { label: "Our story", href: "/about" },
          { label: "News", href: "/news" },
          { label: "Careers", href: "/careers" },
          { label: "Contact", href: "/contact" },
        ],
      },
      {
        heading: "Resources",
        links: [
          { label: "Resources", href: "/resources" },
          { label: "Policies", href: "/policies" },
          { label: "Complaints & Feedback", href: "/policies/complaints" },
          { label: "Accessibility", href: "/accessibility" },
        ],
      },
      {
        heading: "Your rights",
        links: [
          { label: "Privacy", href: "/policies/privacy" },
          { label: "Client rights", href: "/policies/client-rights" },
          { label: "Safeguarding", href: "/policies/safeguarding" },
          { label: "Advocacy & consent", href: "/policies/advocacy" },
        ],
      },
    ],
    org: "Greek Orthodox Community of South Australia Incorporated",
    acknowledgement:
      "We acknowledge the Traditional Owners of the land on which we live and work, and pay our respects to Elders past and present.",
    rghaCrossLink: { label: "RGHA Retirement Living (coming soon)", href: "#", kind: "internal" },
  },
};

export const homepage: HomepageContent = {
  hero: {
    eyebrow: "Greek Orthodox Community of South Australia · Community Care",
    heading: "Community care, centred on dignity.",
    subheading:
      "Helping older South Australians remain safe, connected and independent in the home they love.",
    primaryCta: { label: "Speak with our team", href: "/contact" },
    secondaryCta: { label: "Explore our services", href: "/services" },
  },
  heritage: {
    message: "Serving South Australia since 1930",
    facts: [
      { value: "1930", label: "Est. — serving South Australia", status: "confirmed" },
      { value: "Since 1985", label: "Community Care", status: "requires-client-confirmation" },
      { value: "EN · EL", label: "Care in English & Greek", status: "confirmed" },
    ],
  },
  whoWeAre: {
    eyebrow: "Who we are",
    heading: "Care grounded in community.",
    body: [
      "For generations, the Greek Orthodox Community of South Australia has been a home away from home — a place of language, faith, culture and belonging.",
      "Our Community Care brings that same warmth into people’s homes: practical, respectful support that helps older South Australians live well, on their own terms.",
    ],
    cta: { label: "About GOCSA", href: "/about" },
  },
  services: {
    eyebrow: "Community Care services",
    heading: "Support shaped around you.",
    intro: "In-home aged care, arranged around what matters to you and your family.",
    items: [
      {
        title: "Personal care",
        description: "Respectful help with daily living — showering, dressing and mobility.",
        href: "/services/personal-care",
        status: "requires-client-confirmation",
      },
      {
        title: "Household help",
        description: "Cleaning, laundry, meal preparation and everyday home tasks.",
        href: "/services/household-help",
        status: "requires-client-confirmation",
      },
      {
        title: "Social support & companionship",
        description: "Connection, conversation and accompanied outings — in English or Greek.",
        href: "/services/social-wellbeing",
        status: "requires-client-confirmation",
      },
      {
        title: "In-home nursing",
        description: "Clinical care and medication support delivered at home.",
        href: "/services/in-home-nursing",
        status: "requires-client-confirmation",
      },
      {
        title: "Respite care",
        description: "A helping hand so family carers can rest and recharge.",
        href: "/services/respite",
        status: "requires-client-confirmation",
      },
      {
        title: "Transport & errands",
        description: "Getting to appointments, shops and community — safely.",
        href: "/services/transport",
        status: "requires-client-confirmation",
      },
    ],
  },
  independence: {
    statement: "Growing older should never mean losing your independence.",
    body: "The right support at the right time helps people stay safe, connected and in control — at home, where they’re most themselves.",
  },
  careJourney: {
    eyebrow: "How it works",
    heading: "Your care journey, step by step.",
    steps: [
      {
        title: "Let’s talk",
        description: "A friendly conversation about what you need — no pressure.",
      },
      {
        title: "Understand your needs",
        description: "We listen, and help you understand your options.",
      },
      {
        title: "Create your care plan",
        description: "A plan built around your life, your home and your goals.",
      },
      {
        title: "Meet your care team",
        description: "Consistent, familiar faces who get to know you.",
      },
      {
        title: "Begin support at home",
        description: "Support starts — and adapts as your needs change.",
      },
    ],
  },
  funding: {
    eyebrow: "Funding & access",
    heading: "Understanding how care is paid for.",
    intro:
      "Aged care funding can feel confusing. We help you understand the pathways in plain language — no jargon.",
    options: [
      {
        title: "Support at Home",
        description: "The government’s in-home aged care programme. We can help you understand it.",
        status: "requires-client-confirmation",
      },
      {
        title: "Government-funded pathways",
        description: "How assessment through My Aged Care leads to funded support.",
        status: "requires-client-confirmation",
      },
      {
        title: "Privately funded care",
        description: "Flexible support if you’re not yet assessed, or want more.",
        status: "requires-client-confirmation",
      },
    ],
    cta: { label: "Help me understand my options", href: "/funding" },
  },
  whyChoose: {
    eyebrow: "Why families choose GOCSA",
    heading: "Care that feels like family.",
    pillars: [
      {
        title: "Local South Australian support",
        description: "A trusted part of the community, here for the long term.",
      },
      {
        title: "Cultural understanding",
        description: "Care in English and Greek, with genuine cultural respect.",
      },
      {
        title: "Respect & dignity",
        description: "Your choices, your preferences, your independence — always.",
      },
      {
        title: "Community heritage",
        description: "Grounded in a community that has cared for its people since 1930.",
      },
      { title: "Flexible arrangements", description: "Support that changes as your needs change." },
      {
        title: "Clear communication",
        description: "Honest, plain-language conversations with you and your family.",
      },
    ],
  },
  testimonials: {
    eyebrow: "In their words",
    heading: "Trusted by families across South Australia.",
    items: [
      {
        quote:
          "The team treated my mother with such warmth and respect. For the first time, I felt she was truly cared for.",
        attribution: "Family member (illustrative)",
        status: "demonstration-only",
      },
      {
        quote:
          "Having carers who speak Greek made all the difference to my father. He finally felt understood.",
        attribution: "Family member (illustrative)",
        status: "demonstration-only",
      },
    ],
  },
  policies: {
    eyebrow: "Your safety & rights",
    heading: "Care you can trust.",
    intro:
      "Transparency and safety matter. These pathways explain your rights and how we uphold them.",
    items: [
      { title: "Privacy", href: "/policies/privacy", status: "draft" },
      { title: "Complaints & Feedback", href: "/policies/complaints", status: "draft" },
      {
        title: "Client rights & responsibilities",
        href: "/policies/client-rights",
        status: "draft",
      },
      { title: "Safeguarding", href: "/policies/safeguarding", status: "draft" },
      { title: "Quality & governance", href: "/policies/quality", status: "draft" },
      { title: "Accessibility", href: "/accessibility", status: "draft" },
      { title: "Advocacy & consent", href: "/policies/advocacy", status: "draft" },
      { title: "Code of conduct", href: "/policies/code-of-conduct", status: "draft" },
    ],
  },
  faqs: {
    eyebrow: "Questions",
    heading: "Frequently asked questions.",
    items: [
      {
        question: "How do I get started?",
        answer:
          "Reach out for a friendly chat. We’ll help you understand your options and the next steps — there’s no pressure.",
        status: "draft",
      },
      {
        question: "What support can I receive at home?",
        answer:
          "Support ranges from help around the house to personal care, social support and in-home nursing — shaped around you.",
        status: "draft",
      },
      {
        question: "Do I need government funding?",
        answer:
          "Not necessarily. Some people access government-funded support; others arrange care privately. We can explain both.",
        status: "draft",
      },
      {
        question: "Can my family be involved?",
        answer: "Absolutely. We welcome families in planning and communication, with your consent.",
        status: "draft",
      },
      {
        question: "Can my support change as my needs change?",
        answer: "Yes. Your care plan is reviewed and adapts over time as your needs change.",
        status: "draft",
      },
    ],
  },
  contact: {
    heading: "Let’s help you remain independent at home.",
    body: "Talk to a real person about care for yourself or someone you love. We’re here to help.",
    phone: { label: "Call our team", number: "7088 0500", status: "requires-client-confirmation" },
    enquiryCta: { label: "Make an enquiry", href: "/contact" },
  },
};
