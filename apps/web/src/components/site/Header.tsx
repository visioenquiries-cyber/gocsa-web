"use client";
import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { buttonVariants, cn, Drawer } from "@gocsa/ui";
import type { SiteChrome } from "../../content/homepage/types";
import { Logo } from "./Logo";

/** Six-point Greek-star / asterisk mark echoing the reference menu button. */
function StarMark() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round">
      <path d="M12 3v18M4.5 7.5l15 9M19.5 7.5l-15 9" />
    </svg>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("h-6 w-6 shrink-0 transition-transform duration-base ease-standard", open && "rotate-180")}
      fill="none"
      aria-hidden
    >
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Header({
  chrome,
  homeHref = "/",
  logo,
}: {
  chrome: SiteChrome;
  homeHref?: string;
  logo?: ReactNode;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openKey, setOpenKey] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) setOpenKey(null);
  }, [menuOpen]);

  const close = () => setMenuOpen(false);

  const menuButton = (
    <button
      type="button"
      aria-label="Open menu"
      className="inline-flex h-control-md items-center gap-2 rounded-pill border-hair border-border px-5 font-body font-semibold uppercase tracking-wide text-ink transition-colors duration-fast hover:border-accent hover:text-accent-ink focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-focus"
    >
      <StarMark />
      Menu
    </button>
  );

  return (
    <header
      className={cn(
        "sticky top-0 z-header bg-bg transition-shadow duration-base ease-standard",
        scrolled ? "shadow-1 border-b-hair border-divider" : "border-b-hair border-transparent",
      )}
    >
      <div className="mx-auto flex h-nav w-full max-w-wide items-center justify-between gap-4 px-gutter md:px-gutter-lg">
        <Link
          href={homeHref}
          aria-label={`${chrome.brand.name} — home`}
          className="rounded-md focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-focus"
        >
          {logo ?? <Logo priority />}
        </Link>

        <Drawer
          trigger={menuButton}
          title="Menu"
          hideTitle
          side="right"
          open={menuOpen}
          onOpenChange={setMenuOpen}
          className="left-0 right-0 w-screen max-w-none overflow-y-auto bg-bg"
        >
          <div className="mx-auto flex w-full max-w-2xl flex-col px-2 pb-10 pt-2 sm:px-4">
            <div className="mb-8">{logo ?? <Logo />}</div>

            {/* Every nav item as a single stacked tab. */}
            <nav aria-label="Primary" className="flex flex-col border-t-hair border-divider">
              {chrome.nav.map((item) => {
                const hasChildren = Boolean(item.children?.length);
                const isOpen = openKey === item.href;
                return (
                  <div
                    key={item.href}
                    className={cn(
                      "border-b-hair border-divider transition-colors",
                      isOpen && "border-l-strong border-l-accent bg-surface",
                    )}
                  >
                    {hasChildren ? (
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        onClick={() => setOpenKey(isOpen ? null : item.href)}
                        className="flex w-full items-center justify-between gap-4 py-5 pl-4 pr-3 text-left font-display text-xl text-ink transition-colors duration-fast hover:text-primary focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-focus md:text-2xl"
                      >
                        {item.label}
                        <Chevron open={isOpen} />
                      </button>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={close}
                        className="flex w-full items-center justify-between gap-4 py-5 pl-4 pr-3 font-display text-xl text-ink transition-colors duration-fast hover:text-primary focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-focus md:text-2xl"
                      >
                        {item.label}
                        <span aria-hidden className="text-accent-ink">
                          →
                        </span>
                      </Link>
                    )}
                    {hasChildren && isOpen ? (
                      <div className="flex flex-col pb-4 pl-4">
                        {(item.children ?? []).map((child, i) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={close}
                            className={cn(
                              "py-2.5 font-body text-base transition-colors duration-fast hover:text-primary focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-focus",
                              i === 0 ? "font-semibold text-primary" : "text-ink-muted",
                            )}
                          >
                            {child.label}
                            {i === 0 ? " →" : ""}
                          </Link>
                        ))}
                      </div>
                    ) : null}
                  </div>
                );
              })}
            </nav>

            {/* Buttons */}
            <div className="mt-8 flex flex-col gap-3">
              <Link
                href={chrome.headerCta.href}
                onClick={close}
                className={buttonVariants({ variant: "accent", size: "lg", fullWidth: true })}
              >
                {chrome.headerCta.label}
              </Link>
              {chrome.secondaryCta ? (
                <Link
                  href={chrome.secondaryCta.href}
                  onClick={close}
                  className={buttonVariants({ variant: "secondary", size: "lg", fullWidth: true })}
                >
                  {chrome.secondaryCta.label}
                </Link>
              ) : null}
            </div>

            {/* Contact */}
            {chrome.contact?.phone ? (
              <div className="mt-8 flex flex-col items-center gap-1 text-center">
                <a
                  href={`tel:${chrome.contact.phone.replace(/[^\d+]/g, "")}`}
                  className="font-body text-lg font-medium text-ink hover:text-primary focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-focus"
                >
                  {chrome.contact.phone}
                </a>
                {chrome.contact.email ? (
                  <a
                    href={`mailto:${chrome.contact.email}`}
                    className="font-body text-ink-muted hover:text-primary"
                  >
                    {chrome.contact.email}
                  </a>
                ) : null}
              </div>
            ) : null}
          </div>
        </Drawer>
      </div>
    </header>
  );
}
