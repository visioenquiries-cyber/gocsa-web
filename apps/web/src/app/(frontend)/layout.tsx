import type { CSSProperties, ReactNode } from "react";
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { getEnv, shouldAllowIndexing } from "@gocsa/env";
import "../globals.css";
import { getContentSource } from "../../content/homepage/source";
import { Header } from "../../components/site/Header";
import { Footer } from "../../components/site/Footer";
import { SkipLink } from "../../components/site/SkipLink";
import { ScrollProgress } from "../../components/site/ScrollProgress";
import { isReviewMode } from "../../lib/review";

// Approved Brand Kit V1 typefaces, mapped onto the design tokens.
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

// Indexing is allowed ONLY in production (docs/18 preview safety): every non-production
// environment — local, preview, staging — still returns noindex automatically.
const env = getEnv();
const indexable = shouldAllowIndexing(env);

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_SITE_URL),
  title: { default: "GOCSA Community Care", template: "%s · GOCSA Community Care" },
  description:
    "In-home aged care for older South Australians — helping people stay safe, connected and independent at home, in English or Greek.",
  alternates: { canonical: "/" },
  robots: indexable
    ? { index: true, follow: true }
    : { index: false, follow: false },
  openGraph: {
    title: "GOCSA Community Care",
    description: "Community care, centred on dignity.",
    siteName: "GOCSA Community Care",
    type: "website",
  },
};

const fontVars = {
  "--font-display": "var(--font-playfair)",
  "--font-body": "var(--font-inter)",
} as CSSProperties;

export default async function FrontendLayout({ children }: { children: ReactNode }) {
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
        <ScrollProgress />
        {isReviewMode() ? (
          <div className="bg-accent text-center font-body text-sm font-semibold text-on-accent">
            Internal preview · review mode — not for public distribution
          </div>
        ) : null}
        <Header chrome={chrome} />
        <main id="main">{children}</main>
        <Footer chrome={chrome} />
      </body>
    </html>
  );
}
