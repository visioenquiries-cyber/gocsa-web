import { Container, Heading, Paragraph } from "@gocsa/ui";
import type { MediaChapterContent } from "../../content/homepage/types";
import { Eyebrow } from "./Eyebrow";
import { Reveal } from "./Reveal";
import { BrandImage } from "./BrandImage";
import { EmphasisHeading } from "./EmphasisHeading";

/**
 * A full-bleed cinematic chapter break — documentary field, legibility scrim and a large
 * serif statement centred within. Used to pace the homepage between light editorial bands.
 */
export function MediaChapter({ content }: { content: MediaChapterContent }) {
  return (
    <section className="relative isolate overflow-hidden bg-primary text-on-primary">
      <BrandImage
        ratio=""
        className="absolute inset-0 rounded-none"
        overlay
        showLabel={false}
        keyMotif={false}
        src={content.image?.src}
        alt={content.image?.alt}
      />
      <Container
        size="base"
        className="relative flex min-h-[58svh] flex-col items-center justify-center py-24 text-center md:min-h-[64svh]"
      >
        <Reveal className="flex flex-col items-center">
          <Eyebrow tone="onPrimary">{content.eyebrow}</Eyebrow>
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
          {content.sub && (
            <Paragraph className="mt-5 max-w-xl text-md text-on-primary/85">{content.sub}</Paragraph>
          )}
        </Reveal>
      </Container>
    </section>
  );
}
