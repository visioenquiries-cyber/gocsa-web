import Link from "next/link";
import { buttonVariants, Card, cn, Grid, Heading, Paragraph } from "@gocsa/ui";
import type {
  HeritageContent,
  IndependenceContent,
  WhoWeAreContent,
  WhyChooseContent,
} from "../../content/homepage/types";
import { Section } from "../site/Section";
import { Eyebrow } from "../site/Eyebrow";
import { Reveal } from "../site/Reveal";
import { ReviewBadge } from "../site/ReviewBadge";
import { CountUp } from "../site/CountUp";
import { BrandImage } from "../site/BrandImage";

export function Heritage({ content }: { content: HeritageContent }) {
  return (
    <Section bg="primary" size="wide">
      <Reveal>
        <Eyebrow tone="onPrimary">Heritage</Eyebrow>
        <Heading level={2} className="max-w-3xl text-xl text-on-primary md:text-2xl">
          {content.message}
        </Heading>
      </Reveal>
      <div className="mt-10 grid gap-8 sm:grid-cols-3">
        {content.facts.map((fact, i) => (
          <Reveal key={fact.label} delayMs={i * 80}>
            <div className="border-l-strong border-accent pl-4">
              <p className="font-display text-2xl font-semibold text-on-primary md:text-display">
                <CountUp value={fact.value} />
              </p>
              <p className="mt-1 flex flex-wrap items-center gap-2 font-body text-on-primary/85">
                {fact.label} <ReviewBadge status={fact.status} />
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export function WhoWeAre({ content }: { content: WhoWeAreContent }) {
  return (
    <Section size="wide">
      <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
        <Reveal className="order-2 md:order-1">
          <Eyebrow>{content.eyebrow}</Eyebrow>
          <Heading level={2} className="text-xl md:text-2xl">
            {content.heading}
          </Heading>
          {content.body.map((para, i) => (
            <Paragraph key={i} className="mt-4 text-md text-ink-muted">
              {para}
            </Paragraph>
          ))}
          <Link
            href={content.cta.href}
            className={cn(buttonVariants({ variant: "ghost" }), "mt-6 px-0")}
          >
            {content.cta.label} →
          </Link>
        </Reveal>
        <Reveal className="order-1 md:order-2" delayMs={120}>
          <BrandImage ratio="aspect-square" className="shadow-2" />
        </Reveal>
      </div>
    </Section>
  );
}

export function Independence({ content }: { content: IndependenceContent }) {
  return (
    <Section bg="surface" size="base">
      <Reveal className="text-center">
        <Heading level={2} className="mx-auto max-w-3xl text-balance text-xl text-ink md:text-2xl">
          {content.statement}
        </Heading>
        <Paragraph className="mx-auto mt-5 max-w-prose text-md text-ink-muted">
          {content.body}
        </Paragraph>
      </Reveal>
    </Section>
  );
}

export function WhyChoose({ content }: { content: WhyChooseContent }) {
  return (
    <Section size="wide">
      <Reveal>
        <Eyebrow>{content.eyebrow}</Eyebrow>
        <Heading level={2} className="max-w-2xl text-xl md:text-2xl">
          {content.heading}
        </Heading>
      </Reveal>
      <Grid cols={3} gap={6} className="mt-10">
        {content.pillars.map((pillar, i) => (
          <Reveal as="div" key={pillar.title} delayMs={i * 60}>
            <Card padding="md" className="h-full">
              <span aria-hidden className="mb-3 inline-block h-1 w-8 rounded-pill bg-accent" />
              <Heading level={3} size={5}>
                {pillar.title}
              </Heading>
              <Paragraph measure={false} className="mt-2 text-ink-muted">
                {pillar.description}
              </Paragraph>
            </Card>
          </Reveal>
        ))}
      </Grid>
    </Section>
  );
}
