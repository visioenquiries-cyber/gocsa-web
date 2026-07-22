import Image from "next/image";
import { cn } from "@gocsa/ui";

/**
 * Official GOCSA lockup (emblem + wordmark). Uses the supplied artwork unaltered.
 * NOTE: raster only — final vector (SVG/EPS) required before launch (D6). Alt text conveys
 * the organisation name; proportions preserved via object-contain.
 */
export function Logo({ className, priority }: { className?: string; priority?: boolean }) {
  return (
    <Image
      src="/brand/gocsa-logo-lockup.png"
      alt="Greek Orthodox Community of South Australia — Community Care"
      width={640}
      height={160}
      priority={priority}
      className={cn("h-auto w-auto max-h-11 object-contain md:max-h-14", className)}
    />
  );
}
