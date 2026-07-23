import Link from "next/link";
import { Accordion, buttonVariants, Card, cn, Container, Grid, Heading, Paragraph } from "@gocsa/ui";
import type {
  ContactContent,
  FaqContent,
  PoliciesContent,
  TestimonialsContent,
} from "../../content/homepage/types";
import { Section } from "../site/Section";
import { Eyebrow } from "../site/Eyebrow";
import { Reveal } from "../site/Reveal";
import { ReviewBadge } from "../site/ReviewBadge";
import { BrandImage } from "../site/BrandImage";
import { ParallaxLayer } from "../site/ParallaxLayer";

export function Testimonials({ content }: { content: TestimonialsContent }) {
  return (
    <Section size="wide">
      <Reveal>
        <Eyebrow>{content.eyebrow}</Eyebrow>
        <Heading level={2} className="max-w-2xl text-xl md:text-2xl">
          {content.heading}
        </Heading>
      </Reveal>
      <Grid cols={2} gap={6} className="mt-10">
        {content.items.map((item, i) => (
          <Reveal as="div" key={i} delayMs={i * 80}>
            <Card padding="lg" className="h-full">
              <span aria-hidden className="font-display text-2xl leading-none text-accent">
                &ldquo;
              </span>
              <blockquote className="mt-2 font-display text-lg italic leading-heading text-ink">
                {item.quote}
              </blockquote>
              <figcaption className="mt-4 flex flex-wrap items-center gap-2 font-body text-sm text-ink-muted">
                <cite className="not-italic">{item.attribution}</cite>
                <ReviewBadge status={item.status} />
              </figcaption>
            </Card>
          </Reveal>
        ))}
      </Grid>
    </Section>
  );
}

export function Policies({ content }: { content: PoliciesContent }) {
  return (
    <Section bg="surface" size="wide">
      <Reveal>
        <Eyebrow>{content.eyebrow}</Eyebrow>
        <Heading level={2} className="max-w-2xl text-xl md:text-2xl">
          {content.heading}
        </Heading>
        <Paragraph className="mt-4 max-w-prose text-md text-ink-muted">{content.intro}</Paragraph>
      </Reveal>
      <Grid cols={4} gap={4} className="mt-10">
        {content.items.map((item, i) => (
          <Reveal as="div" key={item.href} delayMs={i * 40}>
            <Link
              href={item.href}
              className="flex h-full items-center justify-between gap-2 rounded-lg border-hair border-divider bg-surface-raised px-4 py-3 font-body font-medium text-ink transition-shadow duration-fast hover:shadow-1 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-focus"
            >
              <span className="flex flex-wrap items-center gap-2">
                {item.title} <ReviewBadge status={item.status} />
              </span>
              <span aria-hidden className="text-primary">
                →
              </span>
            </Link>
          </Reveal>
        ))}
      </Grid>
    </Section>
  );
}

export function Faqs({ content }: { content: FaqContent }) {
  return (
    <Section size="base" id="faqs">
      <Reveal>
        <Eyebrow>{content.eyebrow}</Eyebrow>
        <Heading level={2} className="max-w-2xl text-xl md:text-2xl">
          {content.heading}
        </Heading>
      </Reveal>
      <div className="mt-8">
        <Accordion
          type="single"
          collapsible
          headingLevel={3}
          items={content.items.map((faq, i) => ({
            value: String(i),
            header: faq.question,
            content: (
              <div className="flex flex-col gap-2">
                <Paragraph measure={false} className="text-ink-muted">
                  {faq.answer}
                </Paragraph>
                <ReviewBadge status={faq.status} />
              </div>
            ),
          }))}
        />
      </div>
    </Section>
  );
}

export function Contact({ content }: { content: ContactContent }) {
  return (
    <section
      id="contact"
      className="relative isolate overflow-hidden bg-primary text-on-primary"
    >
      <ParallaxLayer scale={1.12} amount={4}>
        <BrandImage
          ratio=""
          className="absolute inset-0 rounded-none"
          overlay
          showLabel={false}
          keyMotif={false}
          src={content.image?.src}
          alt={content.image?.alt}
          videoSrc={content.image?.video}
          objectPosition={content.image?.objectPosition}
        />
      </ParallaxLayer>
      <Container size="base" className="relative py-24 text-center md:py-32">
        <Reveal className="flex flex-col items-center">
          <Eyebrow tone="onPrimary">Get in touch</Eyebrow>
          <Heading
            level={2}
            className="mx-auto max-w-3xl text-balance font-display text-2xl text-on-primary md:text-display"
          >
            {content.heading}
          </Heading>
          <Paragraph className="mx-auto mt-5 max-w-prose text-md text-on-primary/90">
            {content.body}
          </Paragraph>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={`tel:${content.phone.number.replace(/\s/g, "")}`}
              className={buttonVariants({ variant: "accent", size: "lg" })}
            >
              {content.phone.label} · (08) {content.phone.number}
            </a>
            <Link
              href={content.enquiryCta.href}
              className={cn(
                buttonVariants({ variant: "secondary", size: "lg" }),
                "border-on-primary text-on-primary hover:bg-on-primary/10",
              )}
            >
              {content.enquiryCta.label}
            </Link>
          </div>
          <div className="mt-3 flex justify-center">
            <ReviewBadge status={content.phone.status} />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
