/**
 * @gocsa/tokens/tailwind — the authoritative Tailwind theme.
 * Every utility resolves to a design-token CSS variable, so no component can
 * hardcode a colour, size, or spacing value. Import as a Tailwind preset:
 *
 *   import gocsaPreset from "@gocsa/tokens/tailwind";
 *   export default { presets: [gocsaPreset], content: [...] };
 */
import type { Config } from "tailwindcss";

const preset: Partial<Config> = {
  darkMode: ["selector", '[data-theme="dark"]'],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        bg: "var(--color-bg)",
        surface: "var(--color-surface)",
        "surface-raised": "var(--color-surface-raised)",
        ink: "var(--color-text)",
        "ink-muted": "var(--color-text-muted)",
        "on-primary": "var(--color-text-on-primary)",
        "on-accent": "var(--color-text-on-accent)",
        primary: {
          DEFAULT: "var(--color-primary)",
          hover: "var(--color-primary-hover)",
          active: "var(--color-primary-active)",
        },
        secondary: "var(--color-secondary)",
        accent: "var(--color-accent)",
        "accent-ink": "var(--color-accent-ink)",
        gold: "var(--color-gold-400)",
        link: "var(--color-link)",
        border: "var(--color-border)",
        divider: "var(--color-divider)",
        focus: "var(--color-focus)",
        scrim: "var(--color-scrim)",
        success: { DEFAULT: "var(--color-success)", surface: "var(--color-success-surface)" },
        warning: { DEFAULT: "var(--color-warning)", surface: "var(--color-warning-surface)" },
        error: { DEFAULT: "var(--color-error)", surface: "var(--color-error-surface)" },
        info: { DEFAULT: "var(--color-info)", surface: "var(--color-info-surface)" },
      },
      fontFamily: {
        display: "var(--font-display)",
        body: "var(--font-body)",
      },
      fontSize: {
        xs: ["var(--text-xs)", { lineHeight: "var(--leading-ui)" }],
        sm: ["var(--text-sm)", { lineHeight: "var(--leading-ui)" }],
        base: ["var(--text-base)", { lineHeight: "var(--leading-body)" }],
        md: ["var(--text-md)", { lineHeight: "var(--leading-body)" }],
        lg: ["var(--text-lg)", { lineHeight: "var(--leading-heading)" }],
        xl: ["var(--text-xl)", { lineHeight: "var(--leading-heading)" }],
        "2xl": ["var(--text-2xl)", { lineHeight: "var(--leading-tight)" }],
        "3xl": ["var(--text-3xl)", { lineHeight: "var(--leading-tight)" }],
        display: ["var(--text-display)", { lineHeight: "var(--leading-tight)" }],
        hero: ["var(--text-hero)", { lineHeight: "1.05" }],
      },
      fontWeight: {
        regular: "var(--font-weight-regular)",
        medium: "var(--font-weight-medium)",
        semibold: "var(--font-weight-semibold)",
        bold: "var(--font-weight-bold)",
      },
      lineHeight: {
        tight: "var(--leading-tight)",
        heading: "var(--leading-heading)",
        body: "var(--leading-body)",
        ui: "var(--leading-ui)",
      },
      letterSpacing: {
        tight: "var(--tracking-tight)",
        normal: "var(--tracking-normal)",
        wide: "var(--tracking-wide)",
      },
      spacing: {
        0: "var(--space-0)",
        1: "var(--space-1)",
        2: "var(--space-2)",
        3: "var(--space-3)",
        4: "var(--space-4)",
        5: "var(--space-5)",
        6: "var(--space-6)",
        8: "var(--space-8)",
        10: "var(--space-10)",
        12: "var(--space-12)",
        16: "var(--space-16)",
        20: "var(--space-20)",
        24: "var(--space-24)",
        32: "var(--space-32)",
        section: "var(--space-section)",
        gutter: "var(--space-gutter)",
        "gutter-lg": "var(--space-gutter-lg)",
      },
      borderRadius: {
        none: "var(--radius-none)",
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        pill: "var(--radius-pill)",
      },
      borderWidth: {
        hair: "var(--border-width-hair)",
        base: "var(--border-width-base)",
        strong: "var(--border-width-strong)",
        focus: "var(--border-focus)",
      },
      boxShadow: {
        0: "var(--shadow-0)",
        1: "var(--shadow-1)",
        2: "var(--shadow-2)",
        3: "var(--shadow-3)",
        4: "var(--shadow-4)",
      },
      opacity: {
        disabled: "0.4",
        muted: "0.64",
      },
      transitionDuration: {
        instant: "var(--motion-instant)",
        fast: "var(--motion-fast)",
        base: "var(--motion-base)",
        slow: "var(--motion-slow)",
        slower: "var(--motion-slower)",
      },
      transitionTimingFunction: {
        standard: "var(--ease-standard)",
        decelerate: "var(--ease-decelerate)",
        accelerate: "var(--ease-accelerate)",
        emphasized: "var(--ease-emphasized)",
      },
      zIndex: {
        base: "0",
        raised: "10",
        sticky: "100",
        header: "200",
        dropdown: "300",
        overlay: "400",
        drawer: "500",
        modal: "600",
        popover: "700",
        toast: "800",
        tooltip: "900",
      },
      aspectRatio: {
        square: "1 / 1",
        "4-3": "4 / 3",
        "3-2": "3 / 2",
        "16-9": "16 / 9",
        og: "1200 / 630",
      },
      maxWidth: {
        prose: "var(--container-prose)",
        narrow: "var(--container-narrow)",
        base: "var(--container-base)",
        wide: "var(--container-wide)",
      },
      height: {
        "control-sm": "var(--control-height-sm)",
        "control-md": "var(--control-height-md)",
        "control-lg": "var(--control-height-lg)",
        field: "var(--field-height)",
        nav: "var(--nav-height)",
        "nav-scrolled": "var(--nav-height-scrolled)",
      },
      size: {
        "icon-sm": "var(--icon-sm)",
        "icon-md": "var(--icon-md)",
        "icon-lg": "var(--icon-lg)",
        "icon-xl": "var(--icon-xl)",
      },
    },
  },
};

export default preset;
