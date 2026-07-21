// @gocsa/config — Tailwind preset mapped to design tokens (packages/tokens, docs/10).
// Colours/type/radius resolve to CSS custom properties so the theme is brand-scoped
// (`[data-brand="gocsa"|"rgha"]`) and dark-mode-ready without touching components.
/** @type {import("tailwindcss").Config} */
export default {
  darkMode: ["selector", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        "primary-hover": "var(--color-primary-hover)",
        "primary-active": "var(--color-primary-active)",
        secondary: "var(--color-secondary)",
        accent: "var(--color-accent)",
        bg: "var(--color-bg)",
        surface: "var(--color-surface)",
        "surface-raised": "var(--color-surface-raised)",
        ink: "var(--color-text)",
        "ink-muted": "var(--color-text-muted)",
        "on-primary": "var(--color-text-on-primary)",
        "on-accent": "var(--color-text-on-accent)",
        border: "var(--color-border)",
        divider: "var(--color-divider)",
        focus: "var(--color-focus)",
      },
      fontFamily: {
        display: "var(--font-display)",
        body: "var(--font-body)",
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        pill: "var(--radius-pill)",
      },
    },
  },
  plugins: [],
};
