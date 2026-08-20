import type { MetadataRoute } from "next";
import { getEnv, shouldAllowIndexing } from "@gocsa/env";
import { pageSource } from "../content/pages/pages";

/**
 * Sitemap for the public GOCSA site. Deliberately excludes the RGHA preview under /rgha,
 * which belongs to a different organisation and is not published for search.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const env = getEnv();
  if (!shouldAllowIndexing(env)) return [];

  const base = env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  const now = new Date();

  const priorityFor = (slug: string): number => {
    if (slug === "services" || slug === "support-at-home" || slug === "funding") return 0.9;
    if (slug.startsWith("services/") || slug.startsWith("pathways")) return 0.8;
    if (slug.startsWith("policies/")) return 0.3;
    return 0.6;
  };

  return [
    { url: `${base}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    ...pageSource.allSlugs().map((slug) => ({
      url: `${base}/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: priorityFor(slug),
    })),
  ];
}
