/**
 * RGHA Retirement Living — homepage content (PREVIEW). Same 18-section flow as GOCSA
 * Community Care, re-worded for retirement living + residential aged care, on the brighter
 * RGHA theme. All links under `/rgha`. Copy is DRAFT / confirm-with-client; imagery and the
 * hero video are AI representative placeholders shared with the GOCSA preview.
 */
import type { HomepageContent } from "../homepage/types";

export const rghaHomepage: HomepageContent = {
  hero: {
    eyebrow: "RGHA Retirement Living · part of the GOCSA family",
    heading: "A brighter chapter, in good company.",
    emphasis: "brighter",
    subheading:
      "Retirement living and residential aged care where older South Australians feel at home — supported, connected and free to live well.",
    primaryCta: { label: "Book a tour", href: "/rgha/contact" },
    secondaryCta: { label: "Explore living options", href: "/rgha/retirement-living" },
    image: {
      src: "/photos/hero.jpg",
      video: "/photos/hero.mp4",
      alt: "Older residents and family sharing a warm meal together outdoors at golden hour",
      objectPosition: "center 42%",
    },
  },
  heritage: {
    message: "Backed by a community caring since 1930",
    facts: [
      { value: "1930", label: "GOCSA — caring for our community", status: "confirmed" },
      { value: "Living + care", label: "Retirement living & aged care", status: "requires-client-confirmation" },
      { value: "EN · EL", label: "At home in English & Greek", status: "confirmed" },
    ],
    plaque: {
      year: "1930",
      caption: "The Greek Orthodox Community of South Australia is founded.",
      status: "confirmed",
    },
    image: {
      src: "/photos/heritage.jpg",
      alt: "Archival photograph of an early Greek Orthodox community gathering in South Australia",
    },
  },
  whoWeAre: {
    eyebrow: "Who we are",
    heading: "A home that feels like home.",
    body: [
      "RGHA Retirement Living brings together comfortable homes, genuine community and expert care — so people can enjoy life while knowing support is close at hand.",
      "Backed by the Greek Orthodox Community of South Australia and its long tradition of caring, we welcome people of every background, in English or Greek.",
    ],
    checklist: [
      { title: "Independence & choice", description: "Live your way, with support only when you want it." },
      { title: "Genuine community", description: "Friendship, culture and connection every day." },
      { title: "Care when you need it", description: "From a little help to full residential care." },
    ],
    cta: { label: "About RGHA", href: "/rgha/about" },
    image: {
      src: "/photos/who-we-are.jpg",
      alt: "A staff member sharing tea and conversation with an older resident",
    },
  },
  careChooser: {
    eyebrow: "How we can help",
    heading: "Two ways to make a home with us.",
    intro:
      "Whether you're looking for independence with support close by, or the reassurance of full residential care, there's a place for you at RGHA.",
    options: [
      {
        title: "Retirement Living",
        description: "Your own home in a warm, connected community — with lifestyle, wellbeing and support on hand.",
        href: "/rgha/retirement-living",
        cta: "Explore retirement living",
        image: {
          src: "/photos/service-social-support.jpg",
          alt: "Older residents laughing together outdoors",
        },
      },
      {
        title: "Residential Aged Care",
        description: "Around-the-clock nursing and personal care in a comfortable home, with dignity at the centre.",
        href: "/rgha/residential-aged-care",
        cta: "Explore aged care",
        image: {
          src: "/photos/service-nursing.jpg",
          alt: "A nurse caring for an older resident in a comfortable room",
        },
      },
    ],
  },
  careInMotion: {
    eyebrow: "Life at RGHA",
    heading: "Life, well lived.",
    emphasis: "well",
    sub: "Good food, good friends and gardens to enjoy — with care that quietly makes it all possible.",
    image: {
      src: "/photos/care-in-motion.jpg",
      alt: "A carer warmly greeting an older resident at the door",
    },
  },
  services: {
    eyebrow: "Living & care",
    heading: "Everything for a good life.",
    intro: "From independent living to full residential care, arranged around what matters to you.",
    items: [
      {
        title: "Residential aged care",
        description: "24-hour nursing and personal care in a comfortable, homely setting.",
        href: "/rgha/residential-aged-care",
        status: "requires-client-confirmation",
        image: { src: "/photos/service-nursing.jpg", alt: "A nurse caring for an older resident" },
      },
      {
        title: "Retirement living",
        description: "Your own home in a friendly community, with support close by.",
        href: "/rgha/retirement-living",
        status: "requires-client-confirmation",
        image: { src: "/photos/service-social-support.jpg", alt: "Older residents socialising outdoors" },
      },
      {
        title: "Respite & short-term",
        description: "A comfortable short stay — planned or after hospital.",
        href: "/rgha/respite",
        status: "requires-client-confirmation",
        image: { src: "/photos/service-respite.jpg", alt: "An older resident resting comfortably" },
      },
      {
        title: "Allied health & nursing",
        description: "On-site clinical care, physiotherapy and wellbeing support.",
        href: "/rgha/allied-health",
        status: "requires-client-confirmation",
        image: { src: "/photos/service-personal-care.jpg", alt: "A carer supporting an older resident to walk" },
      },
      {
        title: "Lifestyle & wellbeing",
        description: "Activities, outings, culture and connection every day.",
        href: "/rgha/lifestyle",
        status: "requires-client-confirmation",
        image: { src: "/photos/service-transport.jpg", alt: "An older resident enjoying an outing" },
      },
      {
        title: "Household & meals",
        description: "Fresh meals, cleaning and laundry taken care of.",
        href: "/rgha/residential-aged-care",
        status: "requires-client-confirmation",
        image: { src: "/photos/service-household-help.jpg", alt: "A fresh meal prepared in a bright kitchen" },
      },
    ],
  },
  independence: {
    statement: "A new home should mean more life, not less.",
    body: "The right community and the right care let people keep doing what they love — with company, comfort and confidence.",
  },
  careJourney: {
    eyebrow: "How it works",
    heading: "Finding your place, step by step.",
    steps: [
      { title: "Let's talk", description: "A friendly conversation about what you're looking for — no pressure." },
      { title: "Visit us", description: "Book a tour, meet the team and get a feel for the community." },
      { title: "Understand your options", description: "We explain living options, care levels and funding in plain language." },
      { title: "Plan your move", description: "We help make the move smooth and stress-free." },
      { title: "Settle in & belong", description: "Welcome home — with support that adapts as your needs change." },
    ],
  },
  funding: {
    eyebrow: "Funding & access",
    heading: "Understanding how it's paid for.",
    intro:
      "Retirement living and residential aged care are funded differently. We explain the options clearly — with no jargon and no pressure.",
    options: [
      {
        title: "Residential aged care",
        description: "Government-subsidised care accessed after a My Aged Care assessment.",
        status: "requires-client-confirmation",
      },
      {
        title: "Retirement living",
        description: "Independent living arrangements, explained in plain language.",
        status: "requires-client-confirmation",
      },
      {
        title: "Respite & short-term",
        description: "Short stays, whether funded or privately arranged.",
        status: "requires-client-confirmation",
      },
    ],
    cta: { label: "Help me understand my options", href: "/rgha/funding" },
  },
  whyChoose: {
    eyebrow: "Why families choose RGHA",
    heading: "Care that feels like family.",
    pillars: [
      { title: "Community heritage", description: "Backed by a community that has cared for its people since 1930." },
      { title: "Cultural understanding", description: "At home in English and Greek, with genuine cultural respect." },
      { title: "Dignity & choice", description: "Your preferences, your routine, your independence — always." },
      { title: "Expert care", description: "Skilled nurses and carers, on hand when you need them." },
      { title: "A vibrant community", description: "Friendship, activities and culture every day." },
      { title: "Peace of mind", description: "For residents and families alike." },
    ],
  },
  testimonials: {
    eyebrow: "In their words",
    heading: "A community families trust.",
    items: [
      {
        quote:
          "Mum settled in so quickly. She has friends, she's cared for, and she's happy — that's everything to us.",
        attribution: "Family member (illustrative)",
        status: "demonstration-only",
      },
      {
        quote:
          "Being able to speak Greek with the staff and other residents made it feel like home straight away.",
        attribution: "Resident (illustrative)",
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
        question: "What's the difference between retirement living and residential aged care?",
        answer:
          "Retirement living is independent living in your own home within a supportive community. Residential aged care provides 24-hour nursing and personal care. We can help you work out what suits you now, and how needs can change over time.",
        status: "draft",
      },
      {
        question: "Can I book a tour?",
        answer:
          "Yes — we'd love to show you around. Book a tour and meet the team, in English or Greek, with no obligation.",
        status: "draft",
      },
      {
        question: "How is it funded?",
        answer:
          "Residential aged care is government-subsidised and accessed after a My Aged Care assessment; retirement living is arranged differently. We explain everything in plain language, in writing, before anything begins.",
        status: "draft",
      },
      {
        question: "Can my family be involved?",
        answer: "Absolutely. With your consent, we welcome family in decisions, visits and everyday life.",
        status: "draft",
      },
    ],
  },
  contact: {
    heading: "Come and see for yourself.",
    body: "Book a tour or talk to a real person about living and care at RGHA — for yourself or someone you love.",
    phone: { label: "Call our team", number: "7088 0500", status: "requires-client-confirmation" },
    enquiryCta: { label: "Book a tour", href: "/rgha/contact" },
    image: {
      src: "/photos/contact.jpg",
      alt: "A warm, reassuring moment between a carer and an older resident",
    },
  },
};
