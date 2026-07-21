import type { Meta, StoryObj } from "@storybook/react";
import { Tooltip, TooltipProvider } from "./Tooltip";
import { IconButton } from "./IconButton";

const Info = (
  <svg viewBox="0 0 20 20" fill="none" aria-hidden="true" style={{ width: "100%", height: "100%" }}>
    <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="2" />
    <path d="M10 9v5M10 6h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const meta: Meta = { title: "Primitives/Tooltip", parameters: { layout: "centered" } };
export default meta;
type Story = StoryObj;

export const OnFocusAndHover: Story = {
  render: () => (
    <TooltipProvider>
      <Tooltip content="Call us on 7088 0500">
        <IconButton aria-label="Contact information" icon={Info} variant="secondary" />
      </Tooltip>
    </TooltipProvider>
  ),
};
