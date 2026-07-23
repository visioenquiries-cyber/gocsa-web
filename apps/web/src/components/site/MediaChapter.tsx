import { Container, Heading, Paragraph } from "@gocsa/ui";
import type { MediaChapterContent } from "../../content/homepage/types";
import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";
import { BrandImage } from "./BrandImage";
import { EmphasisHeading } from "./EmphasisHeading";
import { LightMotes } from "./LightMotes";
import { ParallaxLayer } from "./ParallaxLayer";

/**
 * A full-bleed cinematic chapter break with motion: a slow Ken-Burns drift on the
 * documentary field, drifting golden-hour light motes, and a staggered reveal of the
 * eyebrow → serif statement → lead. All motion is reduced-motion safe.
 */
export function MediaChapter({ content }: { content: MediaChapterContent }) {
  return (
    <section className="relative isolate overflow-hidden bg-primary text-on-primary">
      <ParallaxLayer scale={1.16} amount={6}>
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
      <LightMotes count={20} />
      <Container
        size="base"
        className="relative flex min-h-[58svh] flex-col items-center justify-center py-24 text-center md:min-h-[64svh]"
      >
        <Reveal className="flex flex-col items-center">
          <Eyebrow tone="onPrimary">{content.eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delayMs={140} className="flex flex-col items-center">
          <Heading
            level={2}
            className="max-w-3xl text-balance font-display text-display font-semibold text-on-primary"
          >
            <EmphasisHeading
              text={content.heading}
              emphasis={content.emphasis}
              accentClassName="text-gold"
            />
          </Heading>
        </Reveal>
        {content.sub ? (
          <Reveal delayMs={280} className="flex flex-col items-center">
            <Paragraph className="mt-5 max-w-xl text-md text-on-primary/85">{content.sub}</Paragraph>
          </Reveal>
        ) : null}
      </Container>
    </section>
  );
}
