import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isLocale } from "@gocsa/cms";
import { pageSource } from "../../../../content/pages/pages";
import { PageHero } from "../../../../components/page/PageHero";
import { PageBlocks } from "../../../../components/page/PageBlocks";
import { ReviewBadge } from "../../../../components/site/ReviewBadge";
import { isReviewMode } from "../../../../lib/review";

const LOCALES = ["en", "el"] as const;

export function generateStaticParams() {
  return LOCALES.flatMap((locale) =>
    pageSource.allSlugs().map((slug) => ({ locale, slug: slug.split("/") })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = pageSource.getPage(slug.join("/"));
  if (!page) return {};
  return {
    title: page.seo?.title ?? page.title,
    description: page.seo?.description ?? page.lead,
  };
}

export default async function InteriorPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string[] }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const page = pageSource.getPage(slug.join("/"));
  if (!page) notFound();

  return (
    <>
      {isReviewMode() && page.status ? (
        <div className="bg-surface">
          <div className="mx-auto flex max-w-base items-center gap-2 px-gutter py-2 md:px-gutter-lg">
            <span className="font-body text-sm text-ink-muted">Content status:</span>
            <ReviewBadge status={page.status} />
          </div>
        </div>
      ) : null}
      <PageHero page={page} />
      <PageBlocks blocks={page.blocks} />
    </>
  );
}
