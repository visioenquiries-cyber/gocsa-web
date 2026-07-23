import Link from "next/link";
import { Card, Heading, Paragraph } from "@gocsa/ui";
import type { CareChooserContent } from "../../content/homepage/types";
import { Section } from "../site/Section";
import { Eyebrow } from "../site/Eyebrow";
import { Reveal } from "../site/Reveal";
import { BrandImage } from "../site/BrandImage";

/**
 * Homepage "choose your path" — two large, fully-clickable cards (Aged Care / Private Care)
 * that route straight to the dedicated pages. Whole-card link, hover lift, warm palette.
 */
export function CareChooser({ content }: { content: CareChooserContent }) {
  return (
    <Section size="wide">
      <Reveal>
        <Eyebrow>{content.eyebrow}</Eyebrow>
        <Heading level={2} className="max-w-2xl text-balance text-xl md:text-2xl">
          {content.heading}
        </Heading>
        {content.intro ? (
          <Paragraph className="mt-4 max-w-prose text-md text-ink-muted">{content.intro}</Paragraph>
        ) : null}
      </Reveal>

      <div className="mt-10 grid gap-8 md:grid-cols-2">
        {content.options.map((option, i) => (
          <Reveal as="div" key={option.href} delayMs={i * 90} className="group relative">
            <Card
              interactive
              padding="none"
              className="h-full overflow-hidden transition-transform duration-base ease-standard group-hover:-translate-y-1"
            >
              <BrandImage
                ratio="aspect-16-9"
                src={option.image?.src}
                alt={option.image?.alt}
                sizes="(min-width: 768px) 50vw, 100vw"
                showLabel={false}
                showBadge={false}
              />
              <div className="flex flex-col gap-3 p-6 md:p-8">
                <Heading level={3} className="font-display text-lg md:text-xl">
                  <Link
                    href={option.href}
                    className="text-ink after:absolute after:inset-0 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-focus"
                  >
                    {option.title}
                  </Link>
                </Heading>
                <Paragraph measure={false} className="text-ink-muted">
                  {option.description}
                </Paragraph>
                <span className="mt-1 inline-flex items-center gap-1 font-body font-semibold text-primary">
                  {option.cta}
                  <span aria-hidden className="transition-transform duration-fast group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </div>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
