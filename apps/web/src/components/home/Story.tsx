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
import { BrandImage } from "../site/BrandImage";

/**
 * Heritage — an archival documentary frame with an overlapping Warm-White date plaque,
 * beside the heritage message and a set of confirmed facts. Editorial, on the light canvas.
 */
export function Heritage({ content }: { content: HeritageContent }) {
  return (
    <Section size="wide">
      <div className="grid items-center gap-12 md:grid-cols-12 md:gap-16">
        <Reveal className="md:col-span-7">
          <div className="relative pb-14 pr-6 sm:pb-10 sm:pr-14">
            <BrandImage
              ratio="aspect-3-2"
              className="shadow-3"
              label="Archival photography to be supplied"
              src={content.image?.src}
              alt={content.image?.alt}
              sizes="(min-width: 768px) 58vw, 100vw"
            />
            {/* Overlapping heritage plaque */}
            <div className="absolute bottom-0 right-0 max-w-[15rem] rounded-lg border-hair border-divider bg-surface-raised p-6 shadow-4">
              <p className="font-display text-2xl font-semibold leading-none text-primary md:text-display">
                {content.plaque.year}
              </p>
              <p className="mt-3 flex flex-wrap items-center gap-2 font-body text-sm text-ink-muted">
                {content.plaque.caption} <ReviewBadge status={content.plaque.status} />
              </p>
            </div>
          </div>
        </Reveal>

        <div className="md:col-span-5">
          <Reveal>
            <Eyebrow>Heritage</Eyebrow>
            <Heading level={2} className="text-balance text-xl md:text-2xl">
              {content.message}
            </Heading>
          </Reveal>
          <dl className="mt-8 flex flex-col gap-6">
            {content.facts.map((fact, i) => (
              <Reveal as="div" key={fact.label} delayMs={i * 80}>
                <div className="border-l-strong border-accent pl-5">
                  <dt className="font-display text-lg font-semibold text-ink md:text-xl">
                    {fact.value}
                  </dt>
                  <dd className="mt-1 flex flex-wrap items-center gap-2 font-body text-ink-muted">
                    {fact.label} <ReviewBadge status={fact.status} />
                  </dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </Section>
  );
}

/** A small gold check indicator (decorative — DEC-001). */
function CheckMark() {
  return (
    <span
      aria-hidden
      className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-pill bg-accent text-on-accent"
    >
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
        <path
          d="M5 12l4.5 4.5L19 7"
          stroke="currentColor"
          strokeWidth="2.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

/**
 * Who we are — large editorial statement with a value checklist, beside a tall documentary
 * frame. The heading uses the oversized serif from the benchmark.
 */
export function WhoWeAre({ content }: { content: WhoWeAreContent }) {
  return (
    <Section bg="surface" size="wide">
      <div className="grid items-center gap-12 md:grid-cols-2 md:gap-20">
        <Reveal className="order-2 md:order-1">
          <Eyebrow>{content.eyebrow}</Eyebrow>
          <Heading level={2} className="text-balance text-2xl md:text-3xl">
            {content.heading}
          </Heading>
          {content.body.map((para, i) => (
            <Paragraph key={i} className="mt-4 text-md text-ink-muted">
              {para}
            </Paragraph>
          ))}
          <ul className="mt-8 flex flex-col gap-5">
            {content.checklist.map((item) => (
              <li key={item.title} className="flex gap-4">
                <CheckMark />
                <div>
                  <p className="font-body font-semibold text-ink">{item.title}</p>
                  <p className="mt-0.5 font-body text-ink-muted">{item.description}</p>
                </div>
              </li>
            ))}
          </ul>
          <Link
            href={content.cta.href}
            className={cn(buttonVariants({ variant: "ghost" }), "mt-8 px-0")}
          >
            {content.cta.label} →
          </Link>
        </Reveal>
        <Reveal className="order-1 md:order-2" delayMs={120}>
          <BrandImage
            ratio="aspect-4-3"
            className="shadow-3 md:aspect-[4/5]"
            src={content.image?.src}
            alt={content.image?.alt}
            sizes="(min-width: 768px) 48vw, 100vw"
          />
        </Reveal>
      </div>
    </Section>
  );
}

export function Independence({ content }: { content: IndependenceContent }) {
  return (
    <Section size="base">
      <Reveal className="text-center">
        <span aria-hidden className="mx-auto mb-6 block h-px w-12 bg-accent" />
        <Heading
          level={2}
          className="mx-auto max-w-3xl text-balance font-display text-2xl text-ink md:text-3xl"
        >
          {content.statement}
        </Heading>
        <Paragraph className="mx-auto mt-6 max-w-prose text-md text-ink-muted">
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
        <Heading level={2} className="max-w-2xl text-balance text-xl md:text-2xl">
          {content.heading}
        </Heading>
      </Reveal>
      <Grid cols={3} gap={6} className="mt-12">
        {content.pillars.map((pillar, i) => (
          <Reveal as="div" key={pillar.title} delayMs={i * 60}>
            <Card padding="md" className="h-full">
              <span aria-hidden className="mb-4 inline-block h-1 w-10 rounded-pill bg-accent" />
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
