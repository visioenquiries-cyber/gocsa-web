import { NextResponse, type NextRequest } from "next/server";

/**
 * Locale prefixing. Every public route lives under `/[locale]/…` (en/el). Internal links
 * are written locale-less (`/contact`, `/services/personal-care`) so content stays portable.
 * We REWRITE (not redirect) un-prefixed public paths to the default locale: the URL stays
 * clean (`/contact`) and, crucially, no 3xx hop breaks Next's RSC prefetch — so navigation
 * stays soft/client-side. Payload's routes (/admin, /api) and static assets are excluded.
 */
const DEFAULT_LOCALE = "en";
/** First segments that already have their own route tree (locales + the RGHA brand). */
const PASS_THROUGH = ["en", "el", "rgha"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const firstSegment = pathname.split("/")[1] ?? "";

  if (PASS_THROUGH.includes(firstSegment)) {
    return NextResponse.next();
  }

  const url = req.nextUrl.clone();
  url.pathname = pathname === "/" ? `/${DEFAULT_LOCALE}` : `/${DEFAULT_LOCALE}${pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  /**
   * Skip Payload (/admin, /api), Next internals, the health check, the two real asset
   * directories in public/, and the generated robots/sitemap/favicon routes.
   *
   * Everything else is rewritten — including paths that carry a file extension. Those used to
   * be skipped wholesale, which let a single-segment path like /nope.txt match [locale] and
   * serve a duplicate of the homepage at HTTP 200. Routing them through the locale rewrite
   * lands them in the interior catch-all, whose closed param set answers a true 404.
   */
  matcher: [
    "/((?!api|admin|_next|health|brand/|photos/|robots\\.txt|sitemap\\.xml|favicon\\.ico).*)",
  ],
};
