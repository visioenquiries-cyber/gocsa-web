import Link from "next/link";
import { buttonVariants, cn, Container, Heading, Paragraph } from "@gocsa/ui";
import type { HeroContent } from "../../content/homepage/types";
import { Eyebrow } from "../site/Eyebrow";
import { Reveal } from "../site/Reveal";
import { BrandImage } from "../site/BrandImage";

export function Hero({ content }: { content: HeroContent }) {
  return (
    <section className="bg-bg pb-16 pt-10 md:pb-24 md:pt-16">
      <Container size="wide">
        <div className="grid items-center gap-10 md:grid-cols-2 md:gap-16">
          <Reveal>
            <Eyebrow>{content.eyebrow}</Eyebrow>
            <Heading level={1} className="text-2xl leading-tight md:text-display">
              {content.heading}
            </Heading>
            <Paragraph className="mt-5 text-md text-ink-muted">{content.subheading}</Paragraph>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href={content.primaryCta.href}
                className={buttonVariants({ variant: "primary", size: "lg" })}
              >
                {content.primaryCta.label}
              </Link>
              <Link
                href={content.secondaryCta.href}
                className={buttonVariants({ variant: "secondary", size: "lg" })}
              >
                {content.secondaryCta.label}
              </Link>
            </div>
          </Reveal>

          <Reveal delayMs={120}>
            <BrandImage ratio="aspect-4-3" className="shadow-3" />
          </Reveal>
        </div>

        {/* Calm scroll indicator (static — no bounce; honours reduced-motion by design) */}
        <div className="mt-12 hidden justify-center md:flex" aria-hidden>
          <span className={cn("text-ink-muted")}>
            <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
              <path
                d="M6 9l6 6 6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      </Container>
    </section>
  );
}
