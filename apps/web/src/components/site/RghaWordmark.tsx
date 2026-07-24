/**
 * Ridleyton Greek Home for the Aged (RGHA) wordmark (PREVIEW). A gold laurel wreath with
 * the Southern Cross stars — echoing the community's emblem — beside the home's name.
 * Built as an inline SVG (token-driven gold) standing in for the final RGHA logo artwork
 * (confirm-with-client).
 */
function Laurel() {
  // Two mirrored laurel branches (open at the top), drawn as leaves along an arc.
  const leaves: { x: number; y: number; r: number; side: number }[] = [];
  const N = 11;
  for (const side of [-1, 1]) {
    for (let i = 0; i <= N; i++) {
      // sweep from bottom (~110°) up the side to near the top (~15°)
      const deg = 110 - (95 * i) / N;
      const a = (side === 1 ? deg : 180 - deg) * (Math.PI / 180);
      const R = 40;
      leaves.push({ x: 50 + R * Math.cos(a), y: 52 + R * Math.sin(a), r: deg, side });
    }
  }
  // Southern Cross (5 stars)
  const stars = [
    { x: 50, y: 22, s: 3.4 },
    { x: 38, y: 40, s: 3.1 },
    { x: 62, y: 42, s: 3.1 },
    { x: 53, y: 60, s: 3.6 },
    { x: 45, y: 48, s: 2 },
  ];
  const starPath = (cx: number, cy: number, s: number) => {
    let d = "";
    for (let k = 0; k < 10; k++) {
      const rad = k % 2 === 0 ? s : s * 0.42;
      const ang = (Math.PI / 5) * k - Math.PI / 2;
      d += `${k === 0 ? "M" : "L"}${(cx + rad * Math.cos(ang)).toFixed(2)},${(cy + rad * Math.sin(ang)).toFixed(2)}`;
    }
    return d + "Z";
  };
  return (
    <svg viewBox="0 0 100 100" aria-hidden className="h-11 w-11 shrink-0 md:h-12 md:w-12">
      <g fill="var(--color-gold-400)">
        {leaves.map((l, i) => (
          <ellipse
            key={i}
            cx={l.x}
            cy={l.y}
            rx={4.6}
            ry={1.9}
            transform={`rotate(${l.side === 1 ? l.r - 90 : 90 - l.r} ${l.x} ${l.y})`}
          />
        ))}
        {stars.map((st, i) => (
          <path key={i} d={starPath(st.x, st.y, st.s)} />
        ))}
      </g>
    </svg>
  );
}

export function RghaWordmark() {
  return (
    <span className="flex items-center gap-3">
      <Laurel />
      <span className="flex flex-col leading-tight">
        <span className="font-display text-base font-semibold text-primary md:text-lg">
          Ridleyton Greek Home
        </span>
        <span className="font-display text-sm text-ink-muted md:text-base">for the Aged</span>
      </span>
    </span>
  );
}
