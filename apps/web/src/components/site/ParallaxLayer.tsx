"use client";
import { useEffect, useRef, type ReactNode } from "react";
import { cn } from "@gocsa/ui";

/**
 * Scroll-driven parallax for full-bleed banner media. As the section moves through the
 * viewport, the media drifts at a slower rate — a cinematic depth effect. The layer is
 * pre-scaled so the drift never reveals an edge. Reduced-motion holds it still.
 */
export function ParallaxLayer({
  children,
  className,
  scale = 1.18,
  amount = 5,
}: {
  children: ReactNode;
  className?: string;
  /** Base zoom that provides headroom for the drift. */
  scale?: number;
  /** Max vertical drift, in % of the layer height. */
  amount?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    const parent = el?.parentElement;
    if (!el || !parent) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.transform = `scale(${scale})`;
      return;
    }
    let ticking = false;
    const update = () => {
      ticking = false;
      const rect = parent.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const p = (rect.top + rect.height / 2 - vh / 2) / (vh / 2 + rect.height / 2);
      const clamped = Math.max(-1, Math.min(1, p));
      const shift = (-clamped * amount).toFixed(2);
      el.style.transform = `scale(${scale}) translate3d(0, ${shift}%, 0)`;
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
  }, [scale, amount]);

  return (
    <div
      ref={ref}
      aria-hidden
      className={cn("absolute inset-0 will-change-transform", className)}
      style={{ transform: `scale(${scale})` }}
    >
      {children}
    </div>
  );
}
