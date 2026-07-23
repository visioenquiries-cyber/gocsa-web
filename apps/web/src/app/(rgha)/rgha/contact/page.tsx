import type { Metadata } from "next";
import { Container, Heading, Paragraph } from "@gocsa/ui";
import { Eyebrow } from "../../../../components/site/Eyebrow";
import { ContactForm } from "../../../(frontend)/[locale]/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Book a tour or talk to the RGHA team about retirement living and residential aged care.",
};

const CONTACT = {
  phone: "(08) 7088 0500",
  phoneHref: "tel:+61870880500",
  email: "enquire@rgha.com.au",
  address: ["Adelaide", "South Australia"],
};

function DetailRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-t-hair border-divider py-5">
      <p className="font-body text-sm font-semibold uppercase tracking-wide text-accent-ink">{label}</p>
      <div className="mt-1 font-body text-md text-ink">{children}</div>
    </div>
  );
}

export default function RghaContactPage() {
  return (
    <>
      <section className="bg-bg pb-8 pt-12 md:pt-16">
        <Container size="base">
          <Eyebrow>Get in touch</Eyebrow>
          <Heading level={1} className="max-w-3xl text-balance font-display text-2xl md:text-3xl">
            Book a tour, or talk to our team
          </Heading>
          <Paragraph className="mt-5 max-w-prose text-md text-ink-muted">
            Come and see RGHA for yourself — in English or Greek. There's no pressure, and no cost to ask.
          </Paragraph>
        </Container>
      </section>

      <section className="bg-bg pb-section">
        <Container size="base">
          <div className="grid gap-12 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
            <div>
              <DetailRow label="Call us">
                <a href={CONTACT.phoneHref} className="font-semibold text-primary hover:underline">
                  {CONTACT.phone}
                </a>
              </DetailRow>
              <DetailRow label="Email us">
                <a href={`mailto:${CONTACT.email}`} className="font-semibold text-primary hover:underline">
                  {CONTACT.email}
                </a>
              </DetailRow>
              <DetailRow label="Visit us">
                <address className="not-italic">
                  {CONTACT.address.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                  <span className="mt-1 block text-sm text-ink-muted">Address to be confirmed.</span>
                </address>
              </DetailRow>
              <div className="border-t-hair border-divider" />
            </div>

            <div>
              <Heading level={2} size={4} className="mb-1">
                Fill in your details
              </Heading>
              <Paragraph measure={false} className="mb-6 text-ink-muted">
                Add your details and your enquiry below, and our team will be in touch.
              </Paragraph>
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
