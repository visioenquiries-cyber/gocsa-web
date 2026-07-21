/**
 * @gocsa/tokens — TypeScript surface of the design-token system.
 *
 * The runtime theme lives in `variables.css`; the Tailwind theme in `tailwind.ts`.
 * This module gives type-safe programmatic access (inline styles, tests, tooling)
 * WITHOUT hardcoding: reference tokens by name via `cssVar()` / the `token` maps.
 *
 * `rawPalette` holds literal hex values for ONE purpose only — automated contrast
 * tests (docs/19). Application/component code must never import raw hex.
 */

/** Build a CSS `var(--name)` reference (optionally with a fallback). */
export function cssVar(name: string, fallback?: string): string {
  return fallback ? `var(--${name}, ${fallback})` : `var(--${name})`;
}

/** Semantic colour tokens (components use these — never raw hex). */
export const color = {
  bg: cssVar("color-bg"),
  surface: cssVar("color-surface"),
  surfaceRaised: cssVar("color-surface-raised"),
  text: cssVar("color-text"),
  textMuted: cssVar("color-text-muted"),
  textOnPrimary: cssVar("color-text-on-primary"),
  textOnAccent: cssVar("color-text-on-accent"),
  primary: cssVar("color-primary"),
  primaryHover: cssVar("color-primary-hover"),
  primaryActive: cssVar("color-primary-active"),
  secondary: cssVar("color-secondary"),
  accent: cssVar("color-accent"),
  link: cssVar("color-link"),
  border: cssVar("color-border"),
  divider: cssVar("color-divider"),
  focus: cssVar("color-focus"),
  scrim: cssVar("color-scrim"),
  success: cssVar("color-success"),
  warning: cssVar("color-warning"),
  error: cssVar("color-error"),
  info: cssVar("color-info"),
} as const;

export const space = Object.fromEntries(
  [0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32].map((n) => [n, cssVar(`space-${n}`)]),
) as Record<number, string>;

export const radius = {
  none: cssVar("radius-none"),
  sm: cssVar("radius-sm"),
  md: cssVar("radius-md"),
  lg: cssVar("radius-lg"),
  xl: cssVar("radius-xl"),
  pill: cssVar("radius-pill"),
} as const;

export const shadow = {
  0: cssVar("shadow-0"),
  1: cssVar("shadow-1"),
  2: cssVar("shadow-2"),
  3: cssVar("shadow-3"),
  4: cssVar("shadow-4"),
} as const;

export const motion = {
  instant: cssVar("motion-instant"),
  fast: cssVar("motion-fast"),
  base: cssVar("motion-base"),
  slow: cssVar("motion-slow"),
  slower: cssVar("motion-slower"),
  easeStandard: cssVar("ease-standard"),
  easeDecelerate: cssVar("ease-decelerate"),
  easeAccelerate: cssVar("ease-accelerate"),
  easeEmphasized: cssVar("ease-emphasized"),
} as const;

export const zIndex = {
  base: 0,
  raised: 10,
  sticky: 100,
  header: 200,
  dropdown: 300,
  overlay: 400,
  drawer: 500,
  modal: 600,
  popover: 700,
  toast: 800,
  tooltip: 900,
} as const;

export const breakpoints = {
  sm: 480,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

export const container = {
  prose: cssVar("container-prose"),
  narrow: cssVar("container-narrow"),
  base: cssVar("container-base"),
  wide: cssVar("container-wide"),
} as const;

export const icon = {
  sm: cssVar("icon-sm"),
  md: cssVar("icon-md"),
  lg: cssVar("icon-lg"),
  xl: cssVar("icon-xl"),
} as const;

export const ratio = {
  square: "1 / 1",
  "4-3": "4 / 3",
  "3-2": "3 / 2",
  "16-9": "16 / 9",
  og: "1200 / 630",
} as const;

/**
 * Raw hex — TEST/TOOLING ONLY (docs/19 contrast verification).
 * `contrastPairs` documents the foreground/background combinations the design
 * system guarantees; the a11y test suite asserts each meets its WCAG target.
 */
export const rawPalette = {
  blue600: "#0d5eaf",
  blue700: "#0a4b8c",
  blue800: "#083d72",
  aegean400: "#5cb8e6",
  gold400: "#d4af37",
  neutral900: "#24323f",
  neutral700: "#5a646d",
  neutral500: "#848c92",
  warmWhite: "#fafaf8",
  white: "#ffffff",
  success600: "#1e7a46",
  warning700: "#8a5a00",
  error600: "#b3261e",
} as const;

export interface ContrastPair {
  fg: string;
  bg: string;
  /** minimum ratio this pairing must meet */
  min: number;
  note: string;
}

export const contrastPairs: ContrastPair[] = [
  { fg: rawPalette.neutral900, bg: rawPalette.warmWhite, min: 4.5, note: "body text" },
  { fg: rawPalette.neutral700, bg: rawPalette.warmWhite, min: 4.5, note: "muted text" },
  { fg: rawPalette.white, bg: rawPalette.blue600, min: 4.5, note: "text on primary" },
  { fg: rawPalette.neutral900, bg: rawPalette.gold400, min: 4.5, note: "text on accent (DEC-007)" },
  { fg: rawPalette.neutral900, bg: rawPalette.aegean400, min: 4.5, note: "text on secondary" },
  { fg: rawPalette.blue600, bg: rawPalette.warmWhite, min: 4.5, note: "link/primary as text" },
  { fg: rawPalette.success600, bg: rawPalette.warmWhite, min: 4.5, note: "success text" },
  { fg: rawPalette.warning700, bg: rawPalette.warmWhite, min: 4.5, note: "warning text" },
  { fg: rawPalette.error600, bg: rawPalette.warmWhite, min: 4.5, note: "error text" },
  {
    fg: rawPalette.neutral500,
    bg: rawPalette.warmWhite,
    min: 3.0,
    note: "functional border (UI 3:1)",
  },
];

export type SemanticColor = keyof typeof color;
export type SpaceToken = keyof typeof space;
export type RadiusToken = keyof typeof radius;
export type ShadowToken = keyof typeof shadow;
