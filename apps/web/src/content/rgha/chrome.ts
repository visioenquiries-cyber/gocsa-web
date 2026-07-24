/**
 * Ridleyton Greek Home for the Aged (RGHA) — site chrome (PREVIEW). A 120-bed Greek
 * residential aged-care home in Adelaide. Structure mirrors the editorial flow; content is
 * original (not copied from rgha.com.au). Brand marks, phone and address confirm-with-client;
 * admissions email from the home's site.
 */
import type { SiteChrome } from "../homepage/types";

export const rghaChrome: SiteChrome = {
  brand: {
    name: "Ridleyton Greek Home for the Aged",
    est: "A Greek aged-care home · Adelaide",
    logoSrc: "/brand/gocsa-logo-lockup.png",
    logoNeedsVector: true,
  },
  nav: [
    { label: "Residential Care", href: "/rgha/residential-care" },
    { label: "Leisure & Lifestyle", href: "/rgha/leisure-lifestyle" },
    { label: "Hotel Services", href: "/rgha/hotel-services" },
    { label: "Respite Care", href: "/rgha/respite" },
    { label: "About", href: "/rgha/about" },
    { label: "Resources & Policies", href: "/rgha/resources" },
    { label: "Contact", href: "/rgha/contact" },
  ],
  headerCta: { label: "Enquire about a place", href: "/rgha/contact" },
  secondaryCta: { label: "Residential care", href: "/rgha/residential-care" },
  contact: { phone: "(08) 7088 0500", email: "admissions@rgha.com.au" },
  footer: {
    columns: [
      {
        heading: "The Home",
        links: [
          { label: "Residential care", href: "/rgha/residential-care" },
          { label: "Respite care", href: "/rgha/respite" },
          { label: "Leisure & Lifestyle", href: "/rgha/leisure-lifestyle" },
          { label: "Hotel Services", href: "/rgha/hotel-services" },
        ],
      },
      {
        heading: "About",
        links: [
          { label: "Our story", href: "/rgha/about" },
          { label: "Fees & funding", href: "/rgha/funding" },
          { label: "Careers", href: "/rgha/careers" },
          { label: "Contact", href: "/rgha/contact" },
        ],
      },
      {
        heading: "Resources",
        links: [
          { label: "Resources", href: "/rgha/resources" },
          { label: "Quality & governance", href: "/rgha/policies/quality" },
          { label: "Complaints & Feedback", href: "/rgha/policies/complaints" },
          { label: "Accessibility", href: "/rgha/accessibility" },
        ],
      },
      {
        heading: "Your rights",
        links: [
          { label: "Privacy", href: "/rgha/policies/privacy" },
          { label: "Client rights", href: "/rgha/policies/client-rights" },
          { label: "Safeguarding", href: "/rgha/policies/safeguarding" },
          { label: "Advocacy & consent", href: "/rgha/policies/advocacy" },
        ],
      },
    ],
    org: "Ridleyton Greek Home for the Aged",
    acknowledgement:
      "We acknowledge the Traditional Owners of the land on which we live and work, and pay our respects to Elders past and present.",
    rghaCrossLink: { label: "GOCSA Community Care", href: "/", kind: "internal" },
  },
};
