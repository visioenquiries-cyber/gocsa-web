import Link from "next/link";
import { Container, Heading, Paragraph } from "@gocsa/ui";
import type { InteriorPage } from "../../content/pages/types";
import { Eyebrow } from "../site/Eyebrow";
import { Reveal } from "../site/Reveal";
import { BrandImage } from "../site/BrandImage";

/**
 * Interior-page header — a warm cream band with a breadcrumb, gold eyebrow, oversized
 * serif title and lead. Optionally carries a documentary banner image below.
 */
export function PageHero({ page }: { page: InteriorPage }) {
  return (
    <>
      <section className="bg-bg pb-10 pt-12 md:pb-14 md:pt-16">
        <Container size="base">
          <Reveal>
            <nav aria-label="Breadcrumb" className="mb-6 font-body text-sm text-ink-muted">
              <Link href="/" className="hover:text-primary">
                Home
              </Link>
              <span aria-hidden className="px-2 text-divider">
                /
              </span>
              <span className="text-ink">{page.title}</span>
            </nav>
            {page.eyebrow ? <Eyebrow>{page.eyebrow}</Eyebrow> : null}
            <Heading level={1} className="max-w-3xl text-balance font-display text-2xl md:text-3xl">
              {page.title}
            </Heading>
            {page.lead ? (
              <Paragraph className="mt-5 max-w-prose text-md text-ink-muted">{page.lead}</Paragraph>
            ) : null}
          </Reveal>
        </Container>
      </section>

      {page.heroImage ? (
        <Container size="wide" className="pb-4">
          <Reveal>
            <BrandImage
              ratio="aspect-16-9 md:aspect-[21/9]"
              className="shadow-3"
              src={page.heroImage.src}
              alt={page.heroImage.alt}
              sizes="(min-width: 1280px) 1200px, 100vw"
              showLabel={false}
            />
          </Reveal>
        </Container>
      ) : null}
    </>
  );
}
