/**
 * Storybook pattern (reference) — the template every primitive follows in Sprint 2 pass 2.
 * The Storybook harness (@storybook/react + a11y addon) is wired in pass 2; this file is
 * excluded from the base typecheck until then. Full catalogue: docs/21-ui-primitive-catalogue.md.
 */
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Primitives/Button",
  component: Button,
  parameters: { layout: "centered" },
  args: { children: "Get started" },
  argTypes: {
    variant: { control: "select", options: ["primary", "accent", "secondary", "ghost"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
  },
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = { args: { variant: "primary" } };
export const Accent: Story = { args: { variant: "accent", children: "Call us" } };
export const Secondary: Story = { args: { variant: "secondary" } };
export const Ghost: Story = { args: { variant: "ghost" } };
export const Loading: Story = { args: { isLoading: true } };
export const Disabled: Story = { args: { disabled: true } };
export const FullWidth: Story = { args: { fullWidth: true }, parameters: { layout: "padded" } };
