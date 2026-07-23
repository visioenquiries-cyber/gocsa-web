/**
 * Homepage content contract. The visual components render THIS — no long-form copy lives
 * inside React. `LocalHomepageContentSource` supplies it now (fixtures); the identical
 * shape will later come from Payload (`PayloadHomepageContentSource`) with no component rebuild.
 */
import type { Locale } from "@gocsa/cms";

/** Provenance of a piece of content — surfaced only in review mode (never publicly). */
export type ContentStatus =
  "confirmed" | "draft" | "requires-client-confirmation" | "demonstration-only";

export interface Cta {
  label: string;
  href: string;
  /** external tel:/mailto: etc. */
  kind?: "internal" | "tel" | "external";
}

/** A real documentary photograph. When absent, a warm branded placeholder is shown.
 *  Drop files into `apps/web/public/photos/` and set `src` to e.g. "/photos/hero.jpg". */
export interface SectionImage {
  src: string;
  alt: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface HeroContent {
  eyebrow: string;
  heading: string;
  /** Word within the heading rendered in italic accent (like the reference). */
  emphasis?: string;
  subheading: string;
  primaryCta: Cta;
  secondaryCta: Cta;
  image?: SectionImage;
}

export interface HeritageFact {
  value: string;
  label: string;
  status: ContentStatus;
}
export interface HeritageContent {
  message: string;
  facts: HeritageFact[];
  /** Overlapping heritage plaque on the archival image. */
  plaque: { year: string; caption: string; status: ContentStatus };
  image?: SectionImage;
}

/** A full-bleed cinematic media chapter with editorial overlay text. */
export interface MediaChapterContent {
  eyebrow: string;
  heading: string;
  /** Word emphasised in italic accent within the heading. */
  emphasis?: string;
  sub?: string;
  image?: SectionImage;
}

export interface ValueItem {
  title: string;
  description: string;
}
export interface WhoWeAreContent {
  eyebrow: string;
  heading: string;
  body: string[];
  checklist: ValueItem[];
  cta: Cta;
  image?: SectionImage;
}

export interface ServiceItem {
  title: string;
  description: string;
  href: string;
  status: ContentStatus;
  image?: SectionImage;
}
export interface ServicesContent {
  eyebrow: string;
  heading: string;
  intro: string;
  items: ServiceItem[];
}

export interface IndependenceContent {
  statement: string;
  body: string;
}

export interface JourneyStep {
  title: string;
  description: string;
}
export interface CareJourneyContent {
  eyebrow: string;
  heading: string;
  steps: JourneyStep[];
}

export interface FundingOption {
  title: string;
  description: string;
  status: ContentStatus;
}
export interface FundingContent {
  eyebrow: string;
  heading: string;
  intro: string;
  options: FundingOption[];
  cta: Cta;
}

export interface ValuePillar {
  title: string;
  description: string;
}
export interface WhyChooseContent {
  eyebrow: string;
  heading: string;
  pillars: ValuePillar[];
}

export interface TestimonialItem {
  quote: string;
  attribution: string;
  status: ContentStatus;
}
export interface TestimonialsContent {
  eyebrow: string;
  heading: string;
  items: TestimonialItem[];
}

export interface PolicyLink {
  title: string;
  href: string;
  status: ContentStatus;
}
export interface PoliciesContent {
  eyebrow: string;
  heading: string;
  intro: string;
  items: PolicyLink[];
}

export interface FaqItem {
  question: string;
  answer: string;
  status: ContentStatus;
}
export interface FaqContent {
  eyebrow: string;
  heading: string;
  items: FaqItem[];
}

export interface ContactContent {
  heading: string;
  body: string;
  phone: { label: string; number: string; status: ContentStatus };
  enquiryCta: Cta;
  image?: SectionImage;
}

export interface FooterColumn {
  heading: string;
  links: NavItem[];
}
export interface SiteChrome {
  brand: { name: string; est: string; logoSrc: string; logoNeedsVector: boolean };
  nav: NavItem[];
  headerCta: Cta;
  secondaryCta?: Cta;
  contact?: { phone?: string; email?: string };
  footer: {
    columns: FooterColumn[];
    org: string;
    acknowledgement: string;
    rghaCrossLink: Cta;
  };
}

export interface HomepageContent {
  hero: HeroContent;
  heritage: HeritageContent;
  whoWeAre: WhoWeAreContent;
  careInMotion: MediaChapterContent;
  services: ServicesContent;
  independence: IndependenceContent;
  careJourney: CareJourneyContent;
  funding: FundingContent;
  whyChoose: WhyChooseContent;
  testimonials: TestimonialsContent;
  policies: PoliciesContent;
  faqs: FaqContent;
  contact: ContactContent;
}

/** The adapter the site uses to fetch content — swappable Local ⇄ Payload. */
export interface HomepageContentSource {
  getSiteChrome(locale: Locale): Promise<SiteChrome>;
  getHomepage(locale: Locale): Promise<HomepageContent>;
}
