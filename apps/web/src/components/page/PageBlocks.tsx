import Link from "next/link";
import { buttonVariants, Card, cn, Heading, Paragraph } from "@gocsa/ui";
import type { Feature, PageBlock } from "../../content/pages/types";
import { Section } from "../site/Section";
import { Reveal } from "../site/Reveal";
import { BrandImage } from "../site/BrandImage";

function GoldCheck() {
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

function Heading2({ children }: { children: string }) {
  return (
    <Heading level={2} className="max-w-2xl text-balance text-xl md:text-2xl">
      {children}
    </Heading>
  );
}

function FeatureCard({ item }: { item: Feature }) {
  const inner = (
    <>
      <span aria-hidden className="mb-4 inline-block h-1 w-10 rounded-pill bg-accent" />
      <Heading level={3} size={5}>
        {item.title}
      </Heading>
      <Paragraph measure={false} className="mt-2 text-ink-muted">
        {item.description}
      </Paragraph>
      {item.href ? (
        <span className="mt-4 inline-flex font-body font-semibold text-primary">Learn more →</span>
      ) : null}
    </>
  );
  return item.href ? (
    <Card interactive padding="md" className="h-full">
      <Link
        href={item.href}
        className="block h-full rounded-md focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-focus"
      >
        {inner}
      </Link>
    </Card>
  ) : (
    <Card padding="md" className="h-full">
      {inner}
    </Card>
  );
}

/** Renders one content block in the warm editorial style. */
export function Block({ block, index }: { block: PageBlock; index: number }) {
  const alt = index % 2 === 1; // alternate page/surface bands for rhythm
  switch (block.kind) {
    case "prose":
      return (
        <Section bg={alt ? "surface" : "page"} size="base">
          <Reveal>
            {block.heading ? <Heading2>{block.heading}</Heading2> : null}
            <div className={block.heading ? "mt-5" : ""}>
              {block.body.map((p, i) => (
                <Paragraph key={i} className="mt-4 max-w-prose text-md text-ink-muted first:mt-0">
                  {p}
                </Paragraph>
              ))}
            </div>
          </Reveal>
        </Section>
      );

    case "features":
    case "cards": {
      const cols = block.columns ?? 3;
      return (
        <Section bg={alt ? "surface" : "page"} size="wide">
          <Reveal>
            {block.heading ? <Heading2>{block.heading}</Heading2> : null}
            {block.intro ? (
              <Paragraph className="mt-4 max-w-prose text-md text-ink-muted">{block.intro}</Paragraph>
            ) : null}
          </Reveal>
          <div
            className={cn(
              "mt-10 grid gap-6",
              cols === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3",
            )}
          >
            {block.items.map((item, i) => (
              <Reveal as="div" key={item.title} delayMs={i * 60}>
                <FeatureCard item={item} />
              </Reveal>
            ))}
          </div>
        </Section>
      );
    }

    case "steps":
      return (
        <Section bg={alt ? "surface" : "page"} size="base">
          <Reveal>
            {block.heading ? <Heading2>{block.heading}</Heading2> : null}
            {block.intro ? (
              <Paragraph className="mt-4 max-w-prose text-md text-ink-muted">{block.intro}</Paragraph>
            ) : null}
          </Reveal>
          <ol className="relative mt-10">
            <span aria-hidden className="absolute bottom-6 left-[15px] top-2 w-px bg-divider" />
            {block.items.map((item, i) => (
              <Reveal
                as="li"
                key={item.title}
                delayMs={i * 70}
                className="relative flex gap-6 pb-10 last:pb-0"
              >
                <span className="relative z-raised grid h-8 w-8 shrink-0 place-items-center rounded-pill border-strong border-accent bg-bg font-body text-sm font-semibold text-primary">
                  {i + 1}
                </span>
                <div className="pt-0.5">
                  <Heading level={3} size={4} className="text-primary">
                    {item.title}
                  </Heading>
                  <Paragraph measure={false} className="mt-1 text-ink-muted">
                    {item.description}
                  </Paragraph>
                </div>
              </Reveal>
            ))}
          </ol>
        </Section>
      );

    case "checklist":
      return (
        <Section bg={alt ? "surface" : "page"} size="base">
          <Reveal>
            {block.heading ? <Heading2>{block.heading}</Heading2> : null}
            {block.intro ? (
              <Paragraph className="mt-4 max-w-prose text-md text-ink-muted">{block.intro}</Paragraph>
            ) : null}
          </Reveal>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2">
            {block.items.map((item) => (
              <li key={item.title} className="flex gap-4">
                <GoldCheck />
                <div>
                  <p className="font-body font-semibold text-ink">{item.title}</p>
                  {item.description ? (
                    <p className="mt-0.5 font-body text-ink-muted">{item.description}</p>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        </Section>
      );

    case "callout":
      return (
        <Section bg={alt ? "surface" : "page"} size="base">
          <Reveal>
            <div className="rounded-xl border-l-strong border-accent bg-surface-raised p-6 shadow-1 md:p-8">
              <Heading level={2} size={4} className="text-ink">
                {block.title}
              </Heading>
              <Paragraph measure={false} className="mt-2 text-ink-muted">
                {block.body}
              </Paragraph>
            </div>
          </Reveal>
        </Section>
      );

    case "media":
      return (
        <Section bg={alt ? "surface" : "page"} size="wide">
          <Reveal>
            <BrandImage
              ratio="aspect-16-9 md:aspect-[21/9]"
              className="shadow-3"
              src={block.image?.src}
              alt={block.image?.alt}
              showLabel={false}
            />
            {block.caption ? (
              <Paragraph className="mt-3 text-center text-sm text-ink-muted">
                {block.caption}
              </Paragraph>
            ) : null}
          </Reveal>
        </Section>
      );

    case "cta":
      return (
        <Section bg="surface" size="base">
          <Reveal className="text-center">
            <span aria-hidden className="mx-auto mb-6 block h-px w-12 bg-accent" />
            <Heading level={2} className="mx-auto max-w-2xl text-balance text-xl md:text-2xl">
              {block.title}
            </Heading>
            {block.body ? (
              <Paragraph className="mx-auto mt-4 max-w-prose text-md text-ink-muted">
                {block.body}
              </Paragraph>
            ) : null}
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href={block.primary.href}
                className={buttonVariants({ variant: "accent", size: "lg" })}
              >
                {block.primary.label}
              </Link>
              {block.secondary ? (
                <Link
                  href={block.secondary.href}
                  className={buttonVariants({ variant: "secondary", size: "lg" })}
                >
                  {block.secondary.label}
                </Link>
              ) : null}
            </div>
          </Reveal>
        </Section>
      );

    default:
      return null;
  }
}

export function PageBlocks({ blocks }: { blocks: PageBlock[] }) {
  return (
    <>
      {blocks.map((block, i) => (
        <Block key={i} block={block} index={i} />
      ))}
    </>
  );
}
