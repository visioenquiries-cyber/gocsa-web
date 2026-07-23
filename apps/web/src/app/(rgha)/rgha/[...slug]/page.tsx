import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { rghaPageSource } from "../../../../content/rgha/pages";
import { PageHero } from "../../../../components/page/PageHero";
import { PageBlocks } from "../../../../components/page/PageBlocks";
import { ReviewBadge } from "../../../../components/site/ReviewBadge";
import { isReviewMode } from "../../../../lib/review";

export function generateStaticParams() {
  return rghaPageSource.allSlugs().map((slug) => ({ slug: slug.split("/") }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = rghaPageSource.getPage(slug.join("/"));
  if (!page) return {};
  return { title: page.seo?.title ?? page.title, description: page.seo?.description ?? page.lead };
}

export default async function RghaInteriorPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const page = rghaPageSource.getPage(slug.join("/"));
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
      <PageHero page={page} homeHref="/rgha" />
      <PageBlocks blocks={page.blocks} />
    </>
  );
}
