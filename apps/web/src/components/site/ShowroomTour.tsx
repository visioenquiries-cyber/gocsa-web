"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Container, Heading, Paragraph, cn } from "@gocsa/ui";
import type { ShowroomSpace } from "../../content/homepage/types";
import { LightMotes } from "./LightMotes";

/**
 * Virtual showroom — a full-screen visual pinned while you scroll, cross-fading and slowly
 * zooming (Ken Burns) through each space as its title and description flow in. Scroll-driven
 * (rAF), vibrant, with drifting light. Reduced-motion: instant cross-fades, no zoom, no drift.
 */
export function ShowroomTour({
  eyebrow,
  heading,
  spaces,
}: {
  eyebrow?: string;
  heading?: string;
  spaces: ShowroomSpace[];
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);
  const n = spaces.length;

  useEffect(() => {
    const el = ref.current;
    if (!el || n === 0) return;
    let ticking = false;
    const update = () => {
      ticking = false;
      const vh = window.innerHeight || 1;
      const total = el.offsetHeight - vh;
      const scrolled = Math.min(Math.max(-el.getBoundingClientRect().top, 0), Math.max(total, 1));
      const p = total > 0 ? scrolled / total : 0;
      setActive(Math.min(n - 1, Math.max(0, Math.round(p * (n - 1)))));
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [n]);

  if (n === 0) return null;
  const current = spaces[active]!;

  return (
    <section
      ref={ref}
      aria-roledescription="scroll tour"
      aria-label={heading ?? "Virtual showroom"}
      className="relative isolate bg-primary text-on-primary"
      style={{ height: `${n * 85}vh` }}
    >
      <div className="sticky top-0 flex h-screen items-end overflow-hidden">
        {spaces.map((sp, i) => (
          <div
            key={i}
            aria-hidden={i !== active}
            className={cn(
              "absolute inset-0 transition-opacity duration-slow ease-standard motion-reduce:transition-none",
              i === active ? "opacity-100" : "opacity-0",
            )}
          >
            <Image
              src={sp.src}
              alt={sp.alt}
              fill
              sizes="100vw"
              className={cn("object-cover", i === active && "motion-kenburns")}
              priority={i === 0}
            />
          </div>
        ))}
        {/* legibility scrim + warm glow */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, var(--media-scrim-strong) 4%, var(--media-scrim-mid) 42%, transparent 78%)",
          }}
        />
        <LightMotes count={14} />

        <Container size="wide" className="relative w-full pb-14 md:pb-24">
          {eyebrow ? (
            <p className="mb-3 flex items-center gap-2 font-body text-sm font-semibold uppercase tracking-wide text-accent">
              <span aria-hidden className="inline-block h-px w-6 bg-accent" />
              {eyebrow}
            </p>
          ) : null}

          {/* re-keyed so the caption re-animates on each space */}
          <div key={active} className="motion-fadeup max-w-2xl">
            {current.tag ? (
              <p className="font-body text-sm font-semibold uppercase tracking-wide text-on-primary/80">
                {String(active + 1).padStart(2, "0")} · {current.tag}
              </p>
            ) : null}
            <Heading
              level={2}
              className="mt-2 font-display text-display font-semibold text-on-primary"
            >
              {current.title}
            </Heading>
            <Paragraph className="mt-4 max-w-xl text-md text-on-primary/85">
              {current.description}
            </Paragraph>
          </div>

          {/* progress rail */}
          <div className="mt-8 flex items-center gap-2">
            {spaces.map((_, i) => (
              <span
                key={i}
                aria-hidden
                className={cn(
                  "h-1 rounded-pill transition-all duration-base ease-standard",
                  i === active ? "w-10 bg-accent" : "w-4 bg-on-primary",
                )}
                style={i === active ? undefined : { opacity: 0.4 }}
              />
            ))}
          </div>
        </Container>
      </div>
    </section>
  );
}
