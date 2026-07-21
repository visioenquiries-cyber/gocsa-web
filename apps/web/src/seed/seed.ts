/**
 * Development seed (docs/08 §13). DEMONSTRATION CONTENT ONLY — never real client, resident,
 * family or staff information. Idempotent: skips records that already exist. Guarded by
 * `isSeedAllowed` in run.ts (development + ALLOW_SEED only). Covers roles, globals, and
 * representative bilingual content with draft + published examples.
 */
import type { Payload } from "payload";
import type { Role } from "@gocsa/cms";

/** Minimal Lexical rich-text value for a single paragraph. */
function rt(text: string) {
  return {
    root: {
      type: "root",
      format: "" as const,
      indent: 0,
      version: 1,
      direction: "ltr" as const,
      children: [
        {
          type: "paragraph",
          format: "",
          indent: 0,
          version: 1,
          direction: "ltr" as const,
          children: [
            { type: "text", detail: 0, format: 0, mode: "normal", style: "", text, version: 1 },
          ],
        },
      ],
    },
  };
}

const DEMO = "[DEMO]";

async function ensureUser(payload: Payload, email: string, name: string, role: Role) {
  const found = await payload.find({
    collection: "users",
    where: { email: { equals: email } },
    limit: 1,
  });
  if (found.totalDocs > 0) return;
  await payload.create({
    collection: "users",
    data: {
      name: `${DEMO} ${name}`,
      email,
      password: "changeme-dev-only",
      role,
      sites: ["gocsa-community-care"],
      status: "active",
    },
  });
}

export async function seed(payload: Payload): Promise<void> {
  // 1) One administrator + a representative user per role (for permission testing).
  const roleUsers: Array<[string, string, Role]> = [
    ["admin@example.dev", "Super Admin", "super-admin"],
    ["siteadmin@example.dev", "Site Admin", "site-admin"],
    ["care@example.dev", "Care Manager", "community-care-manager"],
    ["marketing@example.dev", "Marketing Manager", "marketing-manager"],
    ["editor@example.dev", "Editor", "editor"],
    ["translator@example.dev", "Translator", "translator"],
    ["reviewer@example.dev", "Reviewer", "reviewer"],
    ["readonly@example.dev", "Read Only", "read-only"],
  ];
  for (const [email, name, role] of roleUsers) await ensureUser(payload, email, name, role);

  // 2) Globals.
  await payload.updateGlobal({
    slug: "settings",
    locale: "en",
    data: {
      siteName: `${DEMO} GOCSA Community Care`,
      organisationLegalName: "Greek Orthodox Community of South Australia Incorporated",
      phonePrimary: "7088 0500",
      email: "enquiries@example.dev",
      foundingYear: 1930,
      careSince: 1985,
      acknowledgementOfCountry: rt("We acknowledge the Traditional Owners of this land."),
    },
  });
  await payload.updateGlobal({
    slug: "settings",
    locale: "el",
    data: { siteName: `${DEMO} GOCSA Φροντίδα Κοινότητας` },
  });

  // 3) A service group + services (English + Greek; one published, one draft).
  const group = await payload.create({
    collection: "service-groups",
    data: { name: `${DEMO} Personal care`, slug: "personal-care", order: 10 },
    locale: "en",
  });
  await payload.update({
    collection: "service-groups",
    id: group.id,
    locale: "el",
    data: { name: `${DEMO} Προσωπική φροντίδα`, slug: "prosopiki-frontida" },
  });

  await payload.create({
    collection: "services",
    // Published example.
    data: {
      name: `${DEMO} Help at home`,
      slug: "help-at-home",
      group: group.id,
      summary: "Support with daily living so you can stay safe at home.",
      body: rt("Our team helps with everyday tasks, tailored to your needs."),
      _status: "published",
    },
    locale: "en",
  });
  await payload.create({
    collection: "services",
    // Draft example.
    data: {
      name: `${DEMO} In-home nursing`,
      slug: "in-home-nursing",
      group: group.id,
      summary: "Clinical care delivered in your own home.",
      body: rt("Nursing and allied health support at home."),
      _status: "draft",
    },
    locale: "en",
  });

  // 4) An FAQ + a consented testimonial.
  await payload.create({
    collection: "faqs",
    data: {
      question: `${DEMO} What is Support at Home?`,
      answer: rt("The in-home aged care programme that replaced Home Care Packages."),
      category: "funding",
      isCareContent: true,
      _status: "published",
    },
    locale: "en",
  });
  await payload.create({
    collection: "testimonials",
    data: {
      quote: "The team treated my mother with such warmth.",
      attribution: `${DEMO} Maria, daughter of a client`,
      consentOnFile: true,
      _status: "published",
    },
    locale: "en",
  });

  // 5) A flexible page.
  await payload.create({
    collection: "pages",
    data: { title: `${DEMO} About us`, slug: "about", _status: "published" },
    locale: "en",
  });
}
