import type { CSSProperties, ReactNode } from "react";
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
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

// PREVIEW: never indexed (docs/18 preview safety).
export const metadata: Metadata = {
  title: { default: "GOCSA Community Care", template: "%s · GOCSA Community Care" },
  description:
    "In-home aged care for older South Australians — helping people stay safe, connected and independent at home. Preview.",
  robots: { index: false, follow: false },
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
