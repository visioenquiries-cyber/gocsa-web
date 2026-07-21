import type { Preview } from "@storybook/react";
// Load the design-token theme so stories render with real tokens (light/dark/print).
import "@gocsa/tokens/variables.css";

const preview: Preview = {
  parameters: {
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    a11y: { config: { rules: [{ id: "color-contrast", enabled: true }] } },
    backgrounds: { default: "page" },
  },
  globalTypes: {
    theme: {
      description: "Colour theme",
      defaultValue: "light",
      toolbar: { title: "Theme", icon: "sun", items: ["light", "dark"], dynamicTitle: true },
    },
    brand: {
      description: "Brand scope",
      defaultValue: "gocsa",
      toolbar: { title: "Brand", icon: "paintbrush", items: ["gocsa", "rgha"], dynamicTitle: true },
    },
  },
  decorators: [
    (Story, context) => {
      const root = document.documentElement;
      root.setAttribute("data-theme", context.globals.theme as string);
      root.setAttribute("data-brand", context.globals.brand as string);
      return Story();
    },
  ],
};

export default preview;
