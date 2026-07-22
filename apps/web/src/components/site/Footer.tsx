import Link from "next/link";
import { Container, Heading, Text } from "@gocsa/ui";
import type { SiteChrome } from "../../content/homepage/types";
import { Logo } from "./Logo";

export function Footer({ chrome }: { chrome: SiteChrome }) {
  return (
    <footer className="bg-primary text-on-primary">
      <Container size="wide">
        <div className="grid gap-10 py-16 md:grid-cols-[1.4fr_repeat(4,1fr)] md:py-20">
          <div className="flex flex-col gap-4">
            <div className="w-fit rounded-md bg-surface-raised p-3">
              <Logo />
            </div>
            <Text tone="onPrimary" size="sm" className="max-w-xs opacity-90">
              {chrome.footer.acknowledgement}
            </Text>
            <Link
              href={chrome.footer.rghaCrossLink.href}
              className="font-body text-sm underline underline-offset-2 opacity-90 hover:opacity-100"
            >
              {chrome.footer.rghaCrossLink.label}
            </Link>
          </div>

          {chrome.footer.columns.map((col) => (
            <nav key={col.heading} aria-label={col.heading} className="flex flex-col gap-3">
              <Heading level={2} size={6} className="text-on-primary">
                {col.heading}
              </Heading>
              {col.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-body text-base text-on-primary/90 underline-offset-2 hover:underline focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-focus"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          ))}
        </div>
        <div className="border-t-hair border-white/20 py-6">
          <Text tone="onPrimary" size="sm" className="opacity-80">
            {chrome.footer.org} · {chrome.brand.est}
          </Text>
        </div>
      </Container>
    </footer>
  );
}
