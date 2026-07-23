import Link from "next/link";
import { buttonVariants, Card, Heading, Paragraph } from "@gocsa/ui";
import type {
  CareJourneyContent,
  FundingContent,
  ServiceItem,
  ServicesContent,
} from "../../content/homepage/types";
import { Section } from "../site/Section";
import { Eyebrow } from "../site/Eyebrow";
import { Reveal } from "../site/Reveal";
import { ReviewBadge } from "../site/ReviewBadge";
import { BrandImage } from "../site/BrandImage";
import { MotionSpine } from "../site/MotionSpine";

const CARD_LINK =
  "text-on-primary after:absolute after:inset-0 focus-visible:outline-none " +
  "focus-visible:ring-[3px] focus-visible:ring-focus focus-visible:ring-offset-2 " +
  "focus-visible:ring-offset-primary rounded-sm";

/** A cinematic service card — documentary media with the title set over a legibility scrim. */
function ServiceCard({
  service,
  featured = false,
}: {
  service: ServiceItem;
  featured?: boolean;
}) {
  return (
    <article className="group relative h-full">
      <BrandImage
        ratio={featured ? "aspect-4-3 md:aspect-16-9" : "aspect-4-3"}
        overlay
        showLabel={false}
        showBadge={false}
        src={service.image?.src}
        alt={service.image?.alt}
        sizes={featured ? "(min-width: 768px) 75vw, 100vw" : "(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 100vw"}
        className="h-full shadow-2 transition-transform duration-base ease-standard group-hover:-translate-y-1 group-hover:shadow-3"
      >
        {featured && (
          <p className="mb-2 font-body text-sm font-semibold uppercase tracking-wide text-on-primary/85">
            Featured service
          </p>
        )}
        <Heading
          level={3}
          className={featured ? "font-display text-2xl text-on-primary" : "font-display text-lg text-on-primary"}
        >
          <Link href={service.href} className={CARD_LINK}>
            {service.title}
          </Link>
        </Heading>
        <Paragraph
          measure={false}
          className={featured ? "mt-2 max-w-lg text-on-primary/85" : "mt-1 text-sm text-on-primary/80"}
        >
          {service.description}
        </Paragraph>
      </BrandImage>
      <div className="absolute right-3 top-3 z-raised">
        <ReviewBadge status={service.status} />
      </div>
    </article>
  );
}

export function Services({ content }: { content: ServicesContent }) {
  const [featured, ...rest] = content.items;
  return (
    <Section size="wide" id="services">
      <Reveal>
        <Eyebrow>{content.eyebrow}</Eyebrow>
        <Heading level={2} className="max-w-2xl text-balance text-xl md:text-2xl">
          {content.heading}
        </Heading>
        <Paragraph className="mt-4 max-w-prose text-md text-ink-muted">{content.intro}</Paragraph>
      </Reveal>

      {featured && (
        <Reveal className="mt-12">
          <ServiceCard service={featured} featured />
        </Reveal>
      )}

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((service, i) => (
          <Reveal as="div" key={service.href} delayMs={i * 60}>
            <ServiceCard service={service} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

/**
 * Care journey — a premium vertical timeline: a fine accent spine, milestone markers and
 * progressive reveal as each step scrolls into view.
 */
export function CareJourney({ content }: { content: CareJourneyContent }) {
  return (
    <Section size="base">
      <Reveal>
        <Eyebrow>{content.eyebrow}</Eyebrow>
        <Heading level={2} className="max-w-2xl text-balance text-xl md:text-2xl">
          {content.heading}
        </Heading>
      </Reveal>
      <ol className="relative mt-12">
        {/* Gold spine that draws itself as the timeline scrolls into view */}
        <MotionSpine className="absolute bottom-6 left-[15px] top-2 w-px bg-accent" />
        {content.steps.map((step, i) => (
          <Reveal as="li" key={step.title} delayMs={i * 70} className="relative flex gap-6 pb-10 last:pb-0">
            <div className="relative z-raised flex flex-col items-center">
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-pill border-strong border-accent bg-bg font-body text-sm font-semibold text-primary">
                {i + 1}
              </span>
            </div>
            <div className="pt-0.5">
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
        <Heading level={2} className="max-w-2xl text-balance text-xl md:text-2xl">
          {content.heading}
        </Heading>
        <Paragraph className="mt-4 max-w-prose text-md text-ink-muted">{content.intro}</Paragraph>
      </Reveal>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {content.options.map((option, i) => (
          <Reveal as="div" key={option.title} delayMs={i * 60}>
            <Card padding="md" className="h-full">
              <span aria-hidden className="mb-4 inline-block h-1 w-10 rounded-pill bg-accent" />
              <Heading level={3} size={5} className="flex flex-wrap items-center gap-2">
                {option.title} <ReviewBadge status={option.status} />
              </Heading>
              <Paragraph measure={false} className="mt-2 text-ink-muted">
                {option.description}
              </Paragraph>
            </Card>
          </Reveal>
        ))}
      </div>
      <div className="mt-10">
        <Link href={content.cta.href} className={buttonVariants({ variant: "accent", size: "lg" })}>
          {content.cta.label}
        </Link>
      </div>
    </Section>
  );
}
