import type { CSSProperties, ReactNode } from "react";
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "../globals.css";
import { rghaChrome } from "../../content/rgha/chrome";
import { Header } from "../../components/site/Header";
import { Footer } from "../../components/site/Footer";
import { SkipLink } from "../../components/site/SkipLink";
import { ScrollProgress } from "../../components/site/ScrollProgress";
import { RghaWordmark } from "../../components/site/RghaWordmark";
import { isReviewMode } from "../../lib/review";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

// PREVIEW: never indexed.
export const metadata: Metadata = {
  title: {
    default: "Ridleyton Greek Home for the Aged",
    template: "%s · Ridleyton Greek Home for the Aged",
  },
  description:
    "A 120-bed Greek residential aged-care home in Adelaide — Greek-speaking care, culture and cuisine, for respite or permanent care. Preview.",
  robots: { index: false, follow: false },
};

const fontVars = {
  "--font-display": "var(--font-playfair)",
  "--font-body": "var(--font-inter)",
} as CSSProperties;

export default function RghaLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      data-brand="rgha"
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
        <Header chrome={rghaChrome} homeHref="/rgha" logo={<RghaWordmark />} />
        <main id="main">{children}</main>
        <Footer chrome={rghaChrome} />
      </body>
    </html>
  );
}
