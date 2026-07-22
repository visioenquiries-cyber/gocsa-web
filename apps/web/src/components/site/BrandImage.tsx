import { cn } from "@gocsa/ui";
import { ReviewBadge } from "./ReviewBadge";

/**
 * Branded image placeholder for the preview — a warm Greek-Blue → Aegean field with a
 * restrained Greek-key motif in Heritage Gold. DEMONSTRATION ONLY: real documentary
 * photography (older South Australians at home) replaces this before launch. Uses tokens
 * only (no literal colours).
 */
export function BrandImage({
  className,
  ratio = "aspect-4-3",
  label = "Documentary photography to be supplied",
}: {
  className?: string;
  ratio?: string;
  label?: string;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl bg-primary text-on-primary",
        ratio,
        className,
      )}
      role="img"
      aria-label="Placeholder — GOCSA community care photography to be supplied"
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-90"
        style={{
          background:
            "linear-gradient(135deg, var(--color-blue-700), var(--color-blue-600) 55%, var(--color-aegean-400))",
        }}
      />
      {/* Restrained Greek-key motif in Heritage Gold. */}
      <svg
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-8 w-full opacity-40"
        viewBox="0 0 120 12"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
        stroke="var(--color-gold-400)"
        strokeWidth="1.5"
      >
        <path d="M0 10 H8 V2 H16 V10 H24 V4 H20 M24 10 H32 V2 H40 V10 H48 V4 H44 M48 10 H56 V2 H64 V10 H72 V4 H68 M72 10 H80 V2 H88 V10 H96 V4 H92 M96 10 H104 V2 H112 V10 H120" />
      </svg>
      <div className="absolute inset-0 flex items-end p-4">
        <span className="font-body text-sm text-on-primary/90">{label}</span>
      </div>
      <div className="absolute right-3 top-3">
        <ReviewBadge status="demonstration-only" />
      </div>
    </div>
  );
}
