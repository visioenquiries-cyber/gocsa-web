"use client";
import { useEffect, useRef, useState } from "react";

/**
 * Subtle count-up for a leading integer (e.g. "1930"). Non-numeric values render as-is.
 * Reduced-motion shows the final value immediately.
 */
export function CountUp({ value }: { value: string }) {
  const match = value.match(/^(\d[\d,]*)(.*)$/);
  const target = match ? Number(match[1]!.replace(/,/g, "")) : null;
  const suffix = match ? match[2] : "";
  const [display, setDisplay] = useState<string>(target === null ? value : "0");
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (target === null) return;
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(`${target}${suffix}`);
      return;
    }
    let raf = 0;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry?.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const duration = 900;
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        setDisplay(`${Math.round(target * eased)}${suffix}`);
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [target, suffix]);

  return <span ref={ref}>{display}</span>;
}
