import Link from "next/link";
import { Container, Heading, Text } from "@gocsa/ui";
import type { SiteChrome } from "../../content/homepage/types";
import { Logo } from "./Logo";

export function Footer({ chrome }: { chrome: SiteChrome }) {
  return (
    <footer className="border-t-strong border-accent bg-surface text-ink">
      <Container size="wide">
        <div className="grid gap-10 py-16 md:grid-cols-[1.4fr_repeat(4,1fr)] md:py-20">
          <div className="flex flex-col gap-4">
            <Logo />
            <Text size="sm" className="max-w-xs text-ink-muted">
              {chrome.footer.acknowledgement}
            </Text>
            <Link
              href={chrome.footer.rghaCrossLink.href}
              className="font-body text-sm text-primary underline underline-offset-2 hover:opacity-80"
            >
              {chrome.footer.rghaCrossLink.label}
            </Link>
          </div>

          {chrome.footer.columns.map((col) => (
            <nav key={col.heading} aria-label={col.heading} className="flex flex-col gap-3">
              <Heading level={2} size={6} className="text-ink">
                {col.heading}
              </Heading>
              {col.links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="font-body text-base text-ink-muted underline-offset-2 transition-colors duration-fast hover:text-primary hover:underline focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-focus"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          ))}
        </div>
        <div className="border-t-hair border-divider py-6">
          <Text size="sm" className="text-ink-muted">
            {chrome.footer.org} · {chrome.brand.est}
          </Text>
        </div>
      </Container>
    </footer>
  );
}
