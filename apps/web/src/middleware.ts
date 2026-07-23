import { NextResponse, type NextRequest } from "next/server";

/**
 * Locale prefixing. Every public route lives under `/[locale]/…` (en/el). Internal links
 * are written locale-less (`/contact`, `/services/personal-care`) so content stays portable.
 * We REWRITE (not redirect) un-prefixed public paths to the default locale: the URL stays
 * clean (`/contact`) and, crucially, no 3xx hop breaks Next's RSC prefetch — so navigation
 * stays soft/client-side. Payload's routes (/admin, /api) and static assets are excluded.
 */
const LOCALES = ["en", "el"] as const;
const DEFAULT_LOCALE = "en";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const firstSegment = pathname.split("/")[1] ?? "";

  if ((LOCALES as readonly string[]).includes(firstSegment)) {
    return NextResponse.next();
  }

  const url = req.nextUrl.clone();
  url.pathname = pathname === "/" ? `/${DEFAULT_LOCALE}` : `/${DEFAULT_LOCALE}${pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Skip Payload (/admin, /api), Next internals, health check, and any file with an extension.
  matcher: ["/((?!api|admin|_next|health|.*\\.).*)"],
};
