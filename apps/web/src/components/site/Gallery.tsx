"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@gocsa/ui";
import type { GalleryImage } from "../../content/homepage/types";

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden className="h-6 w-6">
      <path
        d={dir === "left" ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Aesthetic photo carousel with slide animations — a main viewport that slides between
 * photos, plus a thumbnail strip. Autoplays (pausing on hover/focus) and is reduced-motion
 * safe (no autoplay, no slide transition). Prev/next and thumbnails are fully keyboard-operable.
 */
export function Gallery({ images, autoPlayMs = 5000 }: { images: GalleryImage[]; autoPlayMs?: number }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = images.length;

  const go = (i: number) => setIndex(((i % count) + count) % count);

  useEffect(() => {
    if (paused || count < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setIndex((x) => (x + 1) % count), autoPlayMs);
    return () => clearInterval(t);
  }, [paused, count, autoPlayMs]);

  if (count === 0) return null;

  return (
    <div
      className="flex flex-col gap-4"
      role="group"
      aria-roledescription="carousel"
      aria-label="Photo gallery"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div className="relative aspect-16-9 overflow-hidden rounded-xl bg-surface shadow-3">
        <div
          className="flex h-full transition-transform duration-slower ease-standard motion-reduce:transition-none"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {images.map((img, i) => (
            <div key={i} className="relative h-full w-full shrink-0" aria-hidden={i !== index}>
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(min-width: 1024px) 960px, 100vw"
                className="object-cover"
                priority={i === 0}
              />
              {img.caption ? (
                <div
                  className="absolute inset-x-0 bottom-0 p-4 md:p-6"
                  style={{ background: "linear-gradient(to top, var(--media-scrim-strong), transparent)" }}
                >
                  <p className="font-body text-sm font-medium text-on-primary md:text-base">
                    {img.caption}
                  </p>
                </div>
              ) : null}
            </div>
          ))}
        </div>

        {count > 1 ? (
          <>
            <button
              type="button"
              aria-label="Previous photo"
              onClick={() => go(index - 1)}
              className="absolute left-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-pill border-hair border-divider bg-surface-raised text-ink shadow-2 transition-colors duration-fast hover:text-primary focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-focus"
            >
              <Chevron dir="left" />
            </button>
            <button
              type="button"
              aria-label="Next photo"
              onClick={() => go(index + 1)}
              className="absolute right-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-pill border-hair border-divider bg-surface-raised text-ink shadow-2 transition-colors duration-fast hover:text-primary focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-focus"
            >
              <Chevron dir="right" />
            </button>
            <div className="absolute right-3 top-3 rounded-pill bg-surface-raised px-3 py-1 font-body text-sm font-medium text-ink shadow-1">
              {index + 1} / {count}
            </div>
          </>
        ) : null}
      </div>

      {count > 1 ? (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to photo ${i + 1}`}
              aria-current={i === index}
              onClick={() => go(i)}
              className={cn(
                "relative aspect-4-3 h-16 w-24 shrink-0 overflow-hidden rounded-md transition-opacity duration-fast focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-focus",
                i === index ? "ring-2 ring-accent" : "opacity-70 hover:opacity-100",
              )}
            >
              <Image src={img.src} alt="" fill sizes="96px" className="object-cover" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
