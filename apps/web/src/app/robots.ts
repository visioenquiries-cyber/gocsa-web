import type { MetadataRoute } from "next";
import { getEnv, shouldAllowIndexing } from "@gocsa/env";

/**
 * robots.txt. Only the production GOCSA site is crawlable. The Ridleyton (RGHA) preview
 * lives at /rgha and belongs to a different organisation — it is never offered to search
 * engines, even in production, until that site is signed off and given its own domain.
 */
export default function robots(): MetadataRoute.Robots {
  const env = getEnv();
  const base = env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");

  if (!shouldAllowIndexing(env)) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/rgha", "/rgha/", "/admin", "/api"],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
