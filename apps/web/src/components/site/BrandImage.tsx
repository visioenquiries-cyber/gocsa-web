import type { ReactNode } from "react";
import Image from "next/image";
import { cn } from "@gocsa/ui";
import { ReviewBadge } from "./ReviewBadge";

/**
 * Editorial media surface.
 *
 * • With `src` — renders real documentary photography (object-cover), the intended state.
 * • Without `src` — a WARM golden-hour placeholder (gold → terracotta → deep olive) that
 *   reads as Mediterranean warmth rather than a cold dark block, marked demo in review mode.
 *
 * Pass `children` to overlay editorial content; a legibility scrim is applied automatically.
 * All colour comes from design tokens (no literal colours in the public app).
 */
export function BrandImage({
  className,
  ratio = "aspect-4-3",
  src,
  alt,
  sizes = "100vw",
  priority = false,
  label = "Documentary photography to be supplied",
  showLabel = true,
  showBadge = true,
  overlay = false,
  align = "end",
  children,
  keyMotif = true,
}: {
  className?: string;
  /** Tailwind aspect utility, or "" to fill a sized parent. */
  ratio?: string;
  /** Real photo path (e.g. /photos/hero.jpg). When set, the placeholder is replaced. */
  src?: string;
  alt?: string;
  sizes?: string;
  priority?: boolean;
  label?: string;
  showLabel?: boolean;
  showBadge?: boolean;
  /** Apply a bottom-up legibility scrim for overlaid content. */
  overlay?: boolean;
  align?: "start" | "center" | "end";
  children?: ReactNode;
  keyMotif?: boolean;
}) {
  const alignClass =
    align === "center" ? "items-center" : align === "start" ? "items-start" : "items-end";
  const hasPhoto = Boolean(src);

  return (
    <div
      className={cn(
        "relative isolate overflow-hidden rounded-xl bg-surface text-on-primary",
        ratio,
        className,
      )}
      role={hasPhoto ? undefined : "img"}
      aria-label={hasPhoto ? undefined : "Placeholder — GOCSA community care photography to be supplied"}
    >
      {hasPhoto ? (
        <Image
          src={src as string}
          alt={alt ?? ""}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      ) : (
        <>
          {/* Warm golden-hour field: gold light → terracotta → deep olive. */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(120% 120% at 78% 12%, var(--media-glow), transparent 48%)," +
                "linear-gradient(168deg, var(--color-gold-400) 0%, var(--color-gold-500) 40%, var(--color-clay-600) 72%, var(--color-olive-800) 118%)",
            }}
          />
          {/* Soft vignette for photographic depth. */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background: "radial-gradient(120% 90% at 50% 32%, transparent 42%, var(--media-vignette) 100%)",
            }}
          />
          {/* Fine film grain. */}
          <svg aria-hidden className="absolute inset-0 h-full w-full opacity-[0.1] mix-blend-overlay">
            <filter id="brandimg-grain">
              <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
              <feColorMatrix type="saturate" values="0" />
            </filter>
            <rect width="100%" height="100%" filter="url(#brandimg-grain)" />
          </svg>
          {keyMotif && (
            <svg
              aria-hidden
              className="absolute inset-x-0 bottom-0 h-7 w-full opacity-30"
              viewBox="0 0 120 12"
              preserveAspectRatio="xMidYMid slice"
              fill="none"
              stroke="var(--color-parchment)"
              strokeWidth="1.25"
            >
              <path d="M0 10 H8 V2 H16 V10 H24 V4 H20 M24 10 H32 V2 H40 V10 H48 V4 H44 M48 10 H56 V2 H64 V10 H72 V4 H68 M72 10 H80 V2 H88 V10 H96 V4 H92 M96 10 H104 V2 H112 V10 H120" />
            </svg>
          )}
        </>
      )}

      {/* Legibility scrim for overlaid editorial content. */}
      {(overlay || children) && (
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, var(--media-scrim-strong) 0%, var(--media-scrim-mid) 46%, transparent 78%)",
          }}
        />
      )}

      {children && (
        <div className={cn("absolute inset-0 flex p-6 md:p-10", alignClass)}>
          <div className="w-full">{children}</div>
        </div>
      )}

      {showLabel && !children && !hasPhoto && (
        <div className="absolute inset-0 flex items-end p-4">
          <span className="font-body text-sm text-on-primary/90">{label}</span>
        </div>
      )}
      {showBadge && !hasPhoto && (
        <div className="absolute right-3 top-3">
          <ReviewBadge status="demonstration-only" />
        </div>
      )}
    </div>
  );
}
