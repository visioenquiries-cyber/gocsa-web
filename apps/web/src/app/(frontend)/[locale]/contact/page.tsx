import type { Metadata } from "next";
import { Container, Heading, Paragraph } from "@gocsa/ui";
import { Eyebrow } from "../../../../components/site/Eyebrow";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Speak with a GOCSA Community Care coordinator about in-home aged care for yourself or someone you love.",
};

const CONTACT = {
  phone: "(08) 7088 0500",
  phoneHref: "tel:+61870880500",
  fax: "(08) 7088 0514",
  email: "admin@gocsacommunitycare.com.au",
  address: ["262 Franklin Street", "Adelaide", "South Australia 5000"],
};

function DetailRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-t-hair border-divider py-5">
      <p className="font-body text-sm font-semibold uppercase tracking-wide text-accent-ink">{label}</p>
      <div className="mt-1 font-body text-md text-ink">{children}</div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <>
      <section className="bg-bg pb-8 pt-12 md:pt-16">
        <Container size="base">
          <Eyebrow>Get in touch</Eyebrow>
          <Heading level={1} className="max-w-3xl text-balance font-display text-2xl md:text-3xl">
            Speak to one of our Care Coordinators
          </Heading>
          <Paragraph className="mt-5 max-w-prose text-md text-ink-muted">
            Talk to a real person about care for yourself or someone you love — in English or Greek.
            There's no pressure, and no cost to ask.
          </Paragraph>
        </Container>
      </section>

      <section className="bg-bg pb-section">
        <Container size="base">
          <div className="grid gap-12 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
            {/* Contact details */}
            <div>
              <DetailRow label="Call us">
                <a href={CONTACT.phoneHref} className="font-semibold text-primary hover:underline">
                  {CONTACT.phone}
                </a>
                <p className="mt-1 text-sm text-ink-muted">Fax {CONTACT.fax}</p>
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
                </address>
              </DetailRow>
              <div className="border-t-hair border-divider" />
            </div>

            {/* Enquiry form */}
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
