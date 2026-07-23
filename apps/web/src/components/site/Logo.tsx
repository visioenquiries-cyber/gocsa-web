import Image from "next/image";
import { cn } from "@gocsa/ui";

/**
 * Official GOCSA lockup (emblem + wordmark). The supplied raster has a white background;
 * `mix-blend-multiply` drops that white into whatever light surface it sits on (cream/sand),
 * so it reads as transparent while the dark wordmark and gold emblem stay intact.
 * NOTE: raster only — a true transparent vector (SVG/EPS) is still required before launch (D6).
 */
export function Logo({ className, priority }: { className?: string; priority?: boolean }) {
  return (
    <Image
      src="/brand/gocsa-logo-lockup.png"
      alt="Greek Orthodox Community of South Australia — Community Care"
      width={640}
      height={160}
      priority={priority}
      className={cn(
        "h-auto w-auto max-h-11 object-contain mix-blend-multiply md:max-h-14",
        className,
      )}
    />
  );
}
