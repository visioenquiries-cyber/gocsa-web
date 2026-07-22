"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Accordion, buttonVariants, cn, Drawer } from "@gocsa/ui";
import type { SiteChrome } from "../../content/homepage/types";
import { Logo } from "./Logo";

export function Header({ chrome }: { chrome: SiteChrome }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const menuButton = (
    <button
      type="button"
      aria-label="Open menu"
      className="inline-flex h-control-md items-center gap-2 rounded-md px-3 font-body font-medium text-ink focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-focus lg:hidden"
    >
      <svg viewBox="0 0 24 24" fill="none" aria-hidden className="h-6 w-6">
        <path
          d="M4 7h16M4 12h16M4 17h16"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
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
          href="/en"
          aria-label="GOCSA Community Care — home"
          className="rounded-md focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-focus"
        >
          <Logo priority />
        </Link>

        {/* Desktop navigation */}
        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {chrome.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 font-body text-base font-medium text-ink transition-colors duration-fast hover:text-primary focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-focus"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href={chrome.headerCta.href}
            className={cn(buttonVariants({ variant: "primary" }), "hidden sm:inline-flex")}
          >
            {chrome.headerCta.label}
          </Link>

          {/* Mobile drawer */}
          <Drawer
            trigger={menuButton}
            title="Menu"
            side="right"
            open={menuOpen}
            onOpenChange={setMenuOpen}
          >
            <nav aria-label="Mobile" className="flex flex-col gap-2">
              <Accordion
                type="multiple"
                headingLevel={2}
                items={chrome.nav
                  .filter((i) => i.children?.length)
                  .map((i) => ({
                    value: i.href,
                    header: i.label,
                    content: (
                      <div className="flex flex-col gap-2 pl-1">
                        {(i.children ?? []).map((c) => (
                          <Link
                            key={c.href}
                            href={c.href}
                            onClick={() => setMenuOpen(false)}
                            className="py-2 font-body text-base text-ink hover:text-primary"
                          >
                            {c.label}
                          </Link>
                        ))}
                      </div>
                    ),
                  }))}
              />
              {chrome.nav
                .filter((i) => !i.children?.length)
                .map((i) => (
                  <Link
                    key={i.href}
                    href={i.href}
                    onClick={() => setMenuOpen(false)}
                    className="border-b-hair border-divider py-3 font-body text-lg text-ink hover:text-primary"
                  >
                    {i.label}
                  </Link>
                ))}
              <Link
                href={chrome.headerCta.href}
                onClick={() => setMenuOpen(false)}
                className={cn(buttonVariants({ variant: "primary", fullWidth: true }), "mt-4")}
              >
                {chrome.headerCta.label}
              </Link>
            </nav>
          </Drawer>
        </div>
      </div>
    </header>
  );
}
