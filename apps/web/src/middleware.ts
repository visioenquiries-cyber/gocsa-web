import { NextResponse, type NextRequest } from "next/server";

/**
 * Locale prefixing. Every public route lives under `/[locale]/…` (en/el). Internal links
 * are written locale-less (`/contact`, `/services/personal-care`) so content stays portable;
 * this redirects any un-prefixed public path to the default locale so those links resolve.
 * Payload's own routes (/admin, /api) and static assets are excluded via the matcher.
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
  return NextResponse.redirect(url);
}

export const config = {
  // Skip Payload (/admin, /api), Next internals, health check, and any file with an extension.
  matcher: ["/((?!api|admin|_next|health|.*\\.).*)"],
};
