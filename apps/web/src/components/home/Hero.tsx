import Link from "next/link";
import { buttonVariants, cn, Container, Heading, Paragraph } from "@gocsa/ui";
import type { HeroContent } from "../../content/homepage/types";
import { Eyebrow } from "../site/Eyebrow";
import { Reveal } from "../site/Reveal";
import { BrandImage } from "../site/BrandImage";
import { EmphasisHeading } from "../site/EmphasisHeading";
import { ParallaxLayer } from "../site/ParallaxLayer";

/**
 * Cinematic opening chapter — a full-bleed documentary field with an editorial overlay:
 * eyebrow, oversized Playfair headline with an italic accent word, lead line and two
 * pill actions. Text sits over an automatic legibility scrim (WCAG-safe on the media).
 */
export function Hero({ content }: { content: HeroContent }) {
  return (
    <section className="relative isolate overflow-hidden bg-primary text-on-primary">
      <ParallaxLayer scale={1.12} amount={4}>
        <BrandImage
          ratio=""
          className="absolute inset-0 rounded-none"
          overlay
          showLabel={false}
          keyMotif={false}
          priority
          src={content.image?.src}
          alt={content.image?.alt}
          videoSrc={content.image?.video}
          objectPosition={content.image?.objectPosition}
        />
      </ParallaxLayer>
      <Container
        size="wide"
        className="relative flex min-h-[86svh] flex-col justify-end pb-16 pt-32 md:min-h-[92svh] md:pb-24"
      >
        <Reveal className="max-w-3xl">
          <Eyebrow tone="onPrimary">{content.eyebrow}</Eyebrow>
          <Heading
            level={1}
            className="font-display text-hero font-semibold tracking-tight text-on-primary"
          >
            <EmphasisHeading
              text={content.heading}
              emphasis={content.emphasis}
              accentClassName="text-gold"
            />
          </Heading>
          <Paragraph className="mt-6 max-w-xl text-md text-on-primary/85">
            {content.subheading}
          </Paragraph>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href={content.primaryCta.href}
              className={buttonVariants({ variant: "accent", size: "lg" })}
            >
              {content.primaryCta.label}
            </Link>
            <Link
              href={content.secondaryCta.href}
              className={cn(
                buttonVariants({ variant: "secondary", size: "lg" }),
                "border-on-primary text-on-primary hover:bg-on-primary/10",
              )}
            >
              {content.secondaryCta.label}
            </Link>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
