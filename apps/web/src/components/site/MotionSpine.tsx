"use client";
import { useEffect, useRef, useState } from "react";
import { cn } from "@gocsa/ui";

/**
 * A vertical line that "draws" itself (top → bottom) when it scrolls into view — used for
 * the care-journey timeline spine. Reduced-motion shows it fully immediately (see globals.css).
 */
export function MotionSpine({ className }: { className?: string }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDrawn(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setDrawn(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return <span ref={ref} aria-hidden data-drawn={drawn} className={cn("motion-draw", className)} />;
}
