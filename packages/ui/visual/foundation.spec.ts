import { test, expect } from "@playwright/test";

/**
 * Representative visual baselines across the states required by docs/19 §4 / the Sprint 2
 * brief: buttons, form controls, dialogs, drawers, accordions, tabs, cards, typography,
 * loading + error states, light/dark themes, GOCSA brand scope, mobile + desktop widths.
 *
 * Theme + brand are applied via Storybook globals in the story URL. Baselines are
 * generated per project (viewport). Run `pnpm --filter @gocsa/ui test:visual -u` to create.
 */
const stories: Array<{ id: string; name: string }> = [
  { id: "primitives-button--primary", name: "button-primary" },
  { id: "primitives-button--accent", name: "button-accent" },
  { id: "primitives-button--loading", name: "button-loading" },
  { id: "primitives-input--with-error", name: "input-error" },
  { id: "primitives-choice--checkboxes", name: "checkboxes" },
  { id: "primitives-choice--switches", name: "switches" },
  { id: "primitives-tabs--default", name: "tabs" },
  { id: "primitives-accordion--single", name: "accordion" },
  { id: "primitives-atoms--loading", name: "loading-and-cards" },
  { id: "primitives-typography--headings", name: "typography" },
];

const themes = ["light", "dark"] as const;

for (const theme of themes) {
  for (const story of stories) {
    test(`${story.name} @ ${theme}`, async ({ page }) => {
      await page.goto(
        `/iframe.html?globals=theme:${theme};brand:gocsa&id=${story.id}&viewMode=story`,
      );
      await page.waitForSelector("#storybook-root");
      await expect(page).toHaveScreenshot(`${story.name}-${theme}.png`, { fullPage: true });
    });
  }
}
