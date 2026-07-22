import type { Config } from "tailwindcss";
import preset from "@gocsa/tokens/tailwind";

// The public app consumes the APPROVED token preset (Brand Kit V1) — no second brand
// system, no palette invention. All colour/type/spacing comes from @gocsa/tokens.
export default {
  presets: [preset as Config],
  content: ["./src/**/*.{ts,tsx}", "../../packages/ui/src/**/*.{ts,tsx}"],
} satisfies Config;
