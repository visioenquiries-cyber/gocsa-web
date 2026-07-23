/**
 * RGHA Retirement Living — site chrome (PREVIEW). Mirrors the GOCSA structure, re-worded
 * for retirement living / residential aged care, with all links under `/rgha`. Brand
 * name, contact details and service list are confirm-with-client.
 */
import type { SiteChrome } from "../homepage/types";

export const rghaChrome: SiteChrome = {
  brand: {
    name: "RGHA Retirement Living",
    est: "Part of the GOCSA family",
    logoSrc: "/brand/gocsa-logo-lockup.png",
    logoNeedsVector: true,
  },
  nav: [
    { label: "Retirement Living", href: "/rgha/retirement-living" },
    {
      label: "Aged Care",
      href: "/rgha/residential-aged-care",
      children: [
        { label: "Residential aged care", href: "/rgha/residential-aged-care" },
        { label: "Respite & short-term", href: "/rgha/respite" },
        { label: "Allied health & nursing", href: "/rgha/allied-health" },
        { label: "Lifestyle & wellbeing", href: "/rgha/lifestyle" },
      ],
    },
    { label: "Funding & Access", href: "/rgha/funding" },
    { label: "About", href: "/rgha/about" },
    { label: "Resources & Policies", href: "/rgha/resources" },
    { label: "Contact", href: "/rgha/contact" },
  ],
  headerCta: { label: "Book a tour", href: "/rgha/contact" },
  secondaryCta: { label: "Explore living options", href: "/rgha/retirement-living" },
  contact: { phone: "(08) 7088 0500", email: "enquire@rgha.com.au" },
  footer: {
    columns: [
      {
        heading: "Living & care",
        links: [
          { label: "Retirement living", href: "/rgha/retirement-living" },
          { label: "Residential aged care", href: "/rgha/residential-aged-care" },
          { label: "Respite & short-term", href: "/rgha/respite" },
          { label: "Funding & Access", href: "/rgha/funding" },
        ],
      },
      {
        heading: "About",
        links: [
          { label: "Our story", href: "/rgha/about" },
          { label: "Lifestyle & wellbeing", href: "/rgha/lifestyle" },
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
    org: "Greek Orthodox Community of South Australia Incorporated",
    acknowledgement:
      "We acknowledge the Traditional Owners of the land on which we live and work, and pay our respects to Elders past and present.",
    rghaCrossLink: { label: "GOCSA Community Care", href: "/", kind: "internal" },
  },
};
