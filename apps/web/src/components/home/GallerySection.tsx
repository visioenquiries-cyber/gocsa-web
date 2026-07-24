import Link from "next/link";
import { buttonVariants, Heading, Paragraph } from "@gocsa/ui";
import type { GalleryContent } from "../../content/homepage/types";
import { Section } from "../site/Section";
import { Eyebrow } from "../site/Eyebrow";
import { Reveal } from "../site/Reveal";
import { Gallery } from "../site/Gallery";

/** Homepage photo-gallery section — an animated carousel showcasing the home, inside and out. */
export function GallerySection({ content }: { content: GalleryContent }) {
  return (
    <Section size="wide">
      <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <Reveal>
          <Eyebrow>{content.eyebrow}</Eyebrow>
          <Heading level={2} className="max-w-2xl text-balance text-xl md:text-2xl">
            {content.heading}
          </Heading>
          {content.intro ? (
            <Paragraph className="mt-4 max-w-prose text-md text-ink-muted">{content.intro}</Paragraph>
          ) : null}
        </Reveal>
        {content.cta ? (
          <Reveal delayMs={80}>
            <Link
              href={content.cta.href}
              className={buttonVariants({ variant: "secondary", size: "lg" })}
            >
              {content.cta.label}
            </Link>
          </Reveal>
        ) : null}
      </div>
      <Reveal>
        <Gallery images={content.images} />
      </Reveal>
    </Section>
  );
}
