import type { CSSProperties } from "react";
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Link from "next/link";
import { buttonVariants, cn, Container, Heading, Paragraph } from "@gocsa/ui";
import "./globals.css";
import { getContentSource } from "../content/homepage/source";
import { Header } from "../components/site/Header";
import { Footer } from "../components/site/Footer";
import { SkipLink } from "../components/site/SkipLink";

/**
 * Global 404. The page set is closed at build time (see `dynamicParams = false` on the
 * interior catch-all), so Next answers unknown paths here — above the route groups, before
 * any of them render. There is no root layout in this app (each group owns its own `<html>`),
 * so this page renders the whole document itself, mirroring the frontend layout's chrome.
 */

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

const fontVars = {
  "--font-display": "var(--font-playfair)",
  "--font-body": "var(--font-inter)",
} as CSSProperties;

// A 404 must never be indexed, in any environment.
export const metadata: Metadata = {
  title: "Page not found · GOCSA Community Care",
  robots: { index: false, follow: false },
};

export default async function NotFound() {
  const chrome = await getContentSource().getSiteChrome("en");
  return (
    <html
      lang="en"
      data-brand="gocsa"
      data-theme="light"
      className={`${playfair.variable} ${inter.variable}`}
      style={fontVars}
    >
      <body>
        <SkipLink />
        <Header chrome={chrome} />
        <main id="main">
          <Container size="narrow">
            <div className="py-24 text-center md:py-32">
              <Heading level={1} className="text-2xl">
                We couldn’t find that page
              </Heading>
              <Paragraph className="mx-auto mt-4 text-ink-muted">
                The page you’re looking for may have moved. Let’s get you back on track — or
                call us on (08) 7088 0500 and we’ll point you the right way.
              </Paragraph>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Link href="/" className={cn(buttonVariants({ variant: "primary" }))}>
                  Back to home
                </Link>
                <Link href="/contact" className={cn(buttonVariants({ variant: "secondary" }))}>
                  Contact us
                </Link>
              </div>
            </div>
          </Container>
        </main>
        <Footer chrome={chrome} />
      </body>
    </html>
  );
}
