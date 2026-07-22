import Link from "next/link";
import { buttonVariants, Card, Grid, Heading, Paragraph } from "@gocsa/ui";
import type {
  CareJourneyContent,
  FundingContent,
  ServicesContent,
} from "../../content/homepage/types";
import { Section } from "../site/Section";
import { Eyebrow } from "../site/Eyebrow";
import { Reveal } from "../site/Reveal";
import { ReviewBadge } from "../site/ReviewBadge";
import { BrandImage } from "../site/BrandImage";

export function Services({ content }: { content: ServicesContent }) {
  return (
    <Section size="wide" id="services">
      <Reveal>
        <Eyebrow>{content.eyebrow}</Eyebrow>
        <Heading level={2} className="max-w-2xl text-xl md:text-2xl">
          {content.heading}
        </Heading>
        <Paragraph className="mt-4 max-w-prose text-md text-ink-muted">{content.intro}</Paragraph>
      </Reveal>
      <Grid cols={3} gap={6} className="mt-10">
        {content.items.map((service, i) => (
          <Reveal as="div" key={service.href} delayMs={i * 60}>
            <Card interactive padding="none" className="h-full overflow-hidden">
              <BrandImage ratio="aspect-16-9" label="Service photography to be supplied" />
              <div className="flex flex-col gap-2 p-6">
                <Heading level={3} size={5} className="flex flex-wrap items-center gap-2">
                  <Link
                    href={service.href}
                    className="text-ink underline-offset-2 hover:text-primary hover:underline focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-focus"
                  >
                    {service.title}
                  </Link>
                  <ReviewBadge status={service.status} />
                </Heading>
                <Paragraph measure={false} className="text-ink-muted">
                  {service.description}
                </Paragraph>
              </div>
            </Card>
          </Reveal>
        ))}
      </Grid>
    </Section>
  );
}

export function CareJourney({ content }: { content: CareJourneyContent }) {
  return (
    <Section size="base">
      <Reveal>
        <Eyebrow>{content.eyebrow}</Eyebrow>
        <Heading level={2} className="max-w-2xl text-xl md:text-2xl">
          {content.heading}
        </Heading>
      </Reveal>
      <ol className="mt-10 flex flex-col">
        {content.steps.map((step, i) => (
          <Reveal as="li" key={step.title} delayMs={i * 70} className="flex gap-4 md:gap-6">
            <div className="flex flex-col items-center">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-pill bg-accent font-body text-sm font-semibold text-on-accent">
                {i + 1}
              </span>
              {i < content.steps.length - 1 ? (
                <span aria-hidden className="my-1 w-0.5 flex-1 bg-accent/50" />
              ) : null}
            </div>
            <div className="pb-8">
              <Heading level={3} size={4} className="text-primary">
                {step.title}
              </Heading>
              <Paragraph measure={false} className="mt-1 text-ink-muted">
                {step.description}
              </Paragraph>
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}

export function Funding({ content }: { content: FundingContent }) {
  return (
    <Section bg="surface" size="wide" id="funding">
      <Reveal>
        <Eyebrow>{content.eyebrow}</Eyebrow>
        <Heading level={2} className="max-w-2xl text-xl md:text-2xl">
          {content.heading}
        </Heading>
        <Paragraph className="mt-4 max-w-prose text-md text-ink-muted">{content.intro}</Paragraph>
      </Reveal>
      <Grid cols={3} gap={6} className="mt-10">
        {content.options.map((option, i) => (
          <Reveal as="div" key={option.title} delayMs={i * 60}>
            <Card padding="md" className="h-full">
              <Heading level={3} size={5} className="flex flex-wrap items-center gap-2">
                {option.title} <ReviewBadge status={option.status} />
              </Heading>
              <Paragraph measure={false} className="mt-2 text-ink-muted">
                {option.description}
              </Paragraph>
            </Card>
          </Reveal>
        ))}
      </Grid>
      <div className="mt-10">
        <Link
          href={content.cta.href}
          className={buttonVariants({ variant: "primary", size: "lg" })}
        >
          {content.cta.label}
        </Link>
      </div>
    </Section>
  );
}
