// @gocsa/config — shared ESLint flat config (base).
// Consumed by every package/app; app packages may extend (e.g. add React rules).
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import jsxA11y from "eslint-plugin-jsx-a11y";
import prettier from "eslint-config-prettier";

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: { "jsx-a11y": jsxA11y },
    rules: {
      // Accessibility is a build requirement, not a QA afterthought (docs/11, docs/19).
      ...jsxA11y.configs.recommended.rules,

      // DEC-020: no hardcoded URLs/domains in application code — read from env config.
      // `warn` in the shared base; app packages escalate to `error`.
      "no-restricted-syntax": [
        "warn",
        {
          selector: "Literal[value=/^https?:\\/\\/(?!localhost)/]",
          message: "No hardcoded URLs/domains (DEC-020). Read from the typed env config instead.",
        },
      ],

      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
    },
  },
  // Prettier last — turns off stylistic rules it owns.
  prettier,
  {
    // Example URLs are legitimate in stories/tests — the no-hardcoded-URL rule (DEC-020)
    // only guards application/runtime code.
    files: ["**/*.stories.tsx", "**/*.test.tsx", "**/*.test.ts"],
    rules: { "no-restricted-syntax": "off" },
  },
  {
    ignores: [
      "**/dist/**",
      "**/.next/**",
      "**/storybook-static/**",
      "**/coverage/**",
      "**/*.config.*",
    ],
  },
);
