/**
 * Ridleyton Greek Home for the Aged (RGHA) — homepage content (PREVIEW). A 120-bed Greek
 * residential aged-care home in Adelaide, organised around its three departments: Residential
 * Care, Leisure & Lifestyle, and Hotel Services. Editorial flow shared with GOCSA; copy is
 * ORIGINAL (facts drawn from rgha.com.au, prose written fresh). Whiter RGHA theme. Draft /
 * confirm-with-client; imagery is shared AI representative placeholder.
 */
import type { HomepageContent } from "../homepage/types";

export const rghaHomepage: HomepageContent = {
  hero: {
    eyebrow: "Ridleyton Greek Home for the Aged · Adelaide",
    heading: "A Greek home, where you're family.",
    emphasis: "family",
    subheading:
      "A 120-bed residential aged-care home in Adelaide — Greek-speaking, warm and welcoming, for respite or permanent care.",
    primaryCta: { label: "Enquire about a place", href: "/rgha/contact" },
    secondaryCta: { label: "Take a look inside", href: "/rgha/residential-care" },
    image: {
      src: "/photos/hero.jpg",
      video: "/photos/hero.mp4",
      alt: "Residents and family sharing a warm Greek meal together",
      objectPosition: "center 42%",
    },
  },
  heritage: {
    message: "A Greek home, rooted in community",
    facts: [
      { value: "120", label: "beds — respite & permanent care", status: "confirmed" },
      { value: "Greek-speaking", label: "care, culture and cuisine", status: "confirmed" },
      { value: "EN · EL", label: "at home in English & Greek", status: "confirmed" },
    ],
    plaque: {
      year: "120",
      caption: "beds, staffed for a variety of care levels.",
      status: "confirmed",
    },
    image: {
      src: "/photos/heritage.jpg",
      alt: "Archival photograph of the Greek community in South Australia",
    },
  },
  whoWeAre: {
    eyebrow: "Who we are",
    heading: "More than care — a home.",
    body: [
      "Ridleyton Greek Home for the Aged is a warm, welcoming home where older people are cared for with dignity, in their own language and culture.",
      "Our team is largely Greek-speaking and ingrained in the life of the Home — from nursing and personal care to the kitchen and the activities room. Everyone is welcome, whatever their background.",
    ],
    checklist: [
      { title: "Greek-speaking care", description: "Feel understood, in English or Greek." },
      { title: "Culture, faith & food", description: "The traditions and flavours that feel like home." },
      { title: "Respite or permanent", description: "A short stay or a forever home — whatever you need." },
    ],
    cta: { label: "About the Home", href: "/rgha/about" },
    image: {
      src: "/photos/who-we-are.jpg",
      alt: "A Greek-speaking carer sharing a warm moment with a resident",
    },
  },
  careChooser: {
    eyebrow: "Life at the Home",
    heading: "Three departments, one family.",
    intro:
      "Everything at Ridleyton works together to make life good — expert care, a full lifestyle, and a kitchen and hotel team that treat every day like a gathering.",
    options: [
      {
        title: "Residential Care / Ιδρυματική Φροντίδα",
        description: "24-hour nursing and personal care across a variety of care levels, in a homely setting.",
        href: "/rgha/residential-care",
        cta: "Residential care",
        image: { src: "/photos/service-nursing.jpg", alt: "A nurse caring for a resident" },
      },
      {
        title: "Leisure & Lifestyle / Ελεύθερος Χρόνος",
        description: "A mostly Greek-speaking lifestyle team who fill each day with activities, culture and company.",
        href: "/rgha/leisure-lifestyle",
        cta: "Leisure & lifestyle",
        image: { src: "/photos/service-social-support.jpg", alt: "Residents enjoying an activity together" },
      },
      {
        title: "Hotel Services / Υπηρεσιών Ξενοδοχείου",
        description: "Experienced, Greek-speaking catering, cleaning and laundry — and, honestly, wonderful food.",
        href: "/rgha/hotel-services",
        cta: "Hotel services",
        image: { src: "/photos/service-household-help.jpg", alt: "Fresh Greek food prepared in the kitchen" },
      },
    ],
  },
  careInMotion: {
    eyebrow: "Life at Ridleyton",
    heading: "A home full of life.",
    emphasis: "life",
    sub: "Good food, familiar faces and a shared culture — with expert care that quietly makes it all possible.",
    image: {
      src: "/photos/care-in-motion.jpg",
      alt: "A carer warmly greeting a resident at the Home",
    },
  },
  services: {
    eyebrow: "Care at the Home",
    heading: "Expert care, delivered with warmth.",
    intro: "A variety of care levels under one roof, so care can adapt as needs change.",
    items: [
      {
        title: "24-hour nursing",
        description: "Round-the-clock clinical care and medication management.",
        href: "/rgha/residential-care",
        status: "requires-client-confirmation",
        image: { src: "/photos/service-nursing.jpg", alt: "A nurse caring for a resident" },
      },
      {
        title: "Personal care",
        description: "Respectful help with daily living, mobility and wellbeing.",
        href: "/rgha/residential-care",
        status: "requires-client-confirmation",
        image: { src: "/photos/service-personal-care.jpg", alt: "A carer supporting a resident" },
      },
      {
        title: "Respite care",
        description: "A comfortable short stay — planned or after hospital.",
        href: "/rgha/respite",
        status: "requires-client-confirmation",
        image: { src: "/photos/service-respite.jpg", alt: "A resident resting comfortably" },
      },
      {
        title: "Leisure & lifestyle",
        description: "Activities, outings, culture and company every day.",
        href: "/rgha/leisure-lifestyle",
        status: "requires-client-confirmation",
        image: { src: "/photos/service-transport.jpg", alt: "A resident enjoying an outing" },
      },
      {
        title: "Hotel services & meals",
        description: "Fresh Greek cooking, cleaning and laundry, done with care.",
        href: "/rgha/hotel-services",
        status: "requires-client-confirmation",
        image: { src: "/photos/service-household-help.jpg", alt: "Fresh food prepared in the kitchen" },
      },
      {
        title: "Culture & faith",
        description: "Greek Orthodox faith, language and traditions, honoured every day.",
        href: "/rgha/about",
        status: "requires-client-confirmation",
        image: { src: "/photos/heritage.jpg", alt: "Greek community heritage" },
      },
    ],
  },
  independence: {
    statement: "A home should feel like home — familiar, warm and yours.",
    body: "With care in your own language and the comforts of Greek culture, Ridleyton is a place to feel settled, safe and among family.",
  },
  careJourney: {
    eyebrow: "How it works",
    heading: "Coming to the Home, step by step.",
    steps: [
      { title: "Get in touch", description: "Email admissions@rgha.com.au or call — we're happy to talk it through." },
      { title: "Assessment", description: "An ACAT assessment through My Aged Care confirms eligibility for residential care." },
      { title: "Visit us", description: "Come and see the Home, meet the team and share a coffee." },
      { title: "Plan the move", description: "We explain care levels, fees and funding in plain language." },
      { title: "Welcome home", description: "We help every new resident settle in and feel part of the family." },
    ],
  },
  funding: {
    eyebrow: "Fees & funding",
    heading: "Understanding how it's paid for.",
    intro:
      "Residential aged care is government-subsidised and accessed through My Aged Care. We explain fees and funding clearly — with no jargon, and no pressure.",
    options: [
      {
        title: "Permanent residential care",
        description: "Government-subsidised care, accessed after a My Aged Care (ACAT) assessment.",
        status: "requires-client-confirmation",
      },
      {
        title: "Respite care",
        description: "Short stays, whether government-funded or privately arranged.",
        status: "requires-client-confirmation",
      },
      {
        title: "Fees explained",
        description: "Any accommodation and care fees set out clearly and in writing before you decide.",
        status: "requires-client-confirmation",
      },
    ],
    cta: { label: "Talk to admissions", href: "/rgha/contact" },
  },
  whyChoose: {
    eyebrow: "Why families choose Ridleyton",
    heading: "A home that feels like family.",
    pillars: [
      { title: "Greek-speaking throughout", description: "Care, lifestyle and kitchen teams who speak your language." },
      { title: "Culture & faith", description: "Greek Orthodox traditions, honoured every day." },
      { title: "A variety of care levels", description: "Care that adapts as needs change, under one roof." },
      { title: "Wonderful food", description: "Fresh, familiar Greek cooking that residents love." },
      { title: "Respite or permanent", description: "A short stay or a forever home — you choose." },
      { title: "Family always welcome", description: "Loved ones are part of everyday life here." },
    ],
  },
  testimonials: {
    eyebrow: "In their words",
    heading: "A home families trust.",
    items: [
      {
        quote:
          "Being able to speak Greek with the staff and other residents made Mum feel at home from day one.",
        attribution: "Family member (illustrative)",
        status: "demonstration-only",
      },
      {
        quote: "The food, the culture, the care — it's like a little piece of home. We couldn't ask for more.",
        attribution: "Family member (illustrative)",
        status: "demonstration-only",
      },
    ],
  },
  policies: {
    eyebrow: "Your safety & rights",
    heading: "Care you can trust.",
    intro: "Transparency and safety matter. These pages explain your rights and how we uphold them.",
    items: [
      { title: "Privacy", href: "/rgha/policies/privacy", status: "draft" },
      { title: "Complaints & Feedback", href: "/rgha/policies/complaints", status: "draft" },
      { title: "Client rights & responsibilities", href: "/rgha/policies/client-rights", status: "draft" },
      { title: "Safeguarding", href: "/rgha/policies/safeguarding", status: "draft" },
      { title: "Quality & governance", href: "/rgha/policies/quality", status: "draft" },
      { title: "Accessibility", href: "/rgha/accessibility", status: "draft" },
      { title: "Advocacy & consent", href: "/rgha/policies/advocacy", status: "draft" },
      { title: "Code of conduct", href: "/rgha/policies/code-of-conduct", status: "draft" },
    ],
  },
  faqs: {
    eyebrow: "Questions",
    heading: "Frequently asked questions.",
    items: [
      {
        question: "How do I enquire about a place?",
        answer:
          "Email admissions@rgha.com.au or give us a call. We'll talk through your needs, whether you're after respite or a permanent place, and the next steps.",
        status: "draft",
      },
      {
        question: "Do you offer respite as well as permanent care?",
        answer:
          "Yes. Ridleyton is staffed for a variety of care levels and offers both short respite stays and permanent residential aged care.",
        status: "draft",
      },
      {
        question: "Is the Home Greek-speaking?",
        answer:
          "Our team is largely Greek-speaking and ingrained in the life of the Home — from care to the kitchen — so residents feel understood and at home. Everyone is welcome, whatever their background.",
        status: "draft",
      },
      {
        question: "How is residential aged care funded?",
        answer:
          "Residential aged care is government-subsidised and accessed after a My Aged Care (ACAT) assessment. We explain any accommodation and care fees clearly and in writing before you decide.",
        status: "draft",
      },
    ],
  },
  contact: {
    heading: "Enquire about a place.",
    body: "Talk to our admissions team about respite or permanent residential care at Ridleyton — for yourself or someone you love.",
    phone: { label: "Call the Home", number: "7088 0500", status: "requires-client-confirmation" },
    enquiryCta: { label: "Email admissions", href: "/rgha/contact" },
    image: {
      src: "/photos/contact.jpg",
      alt: "A warm, reassuring moment between a carer and a resident",
    },
  },
};
