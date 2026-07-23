import type { CSSProperties } from "react";

/**
 * Drifting golden-hour light motes for cinematic media chapters. Pure CSS animation
 * (compositor-only transform/opacity), deterministic layout so SSR and client match, and
 * automatically stilled under prefers-reduced-motion (see globals.css). Decorative only.
 */
function rand(n: number) {
  const x = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

export function LightMotes({ count = 18 }: { count?: number }) {
  const motes = Array.from({ length: count }, (_, i) => {
    const size = 3 + rand(i + 100) * 6;
    return {
      key: i,
      style: {
        left: `${(rand(i) * 100).toFixed(2)}%`,
        top: `${(rand(i + 50) * 100).toFixed(2)}%`,
        width: `${size.toFixed(1)}px`,
        height: `${size.toFixed(1)}px`,
        background: "radial-gradient(circle, var(--color-gold-400), transparent 70%)",
        "--mote-dur": `${(7 + rand(i + 150) * 7).toFixed(1)}s`,
        "--mote-delay": `${(rand(i + 200) * 9).toFixed(1)}s`,
      } as CSSProperties,
    };
  });

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {motes.map((m) => (
        <span key={m.key} className="motion-mote absolute rounded-pill blur-[0.5px]" style={m.style} />
      ))}
    </div>
  );
}
