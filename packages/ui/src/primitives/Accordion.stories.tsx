import type { Meta, StoryObj } from "@storybook/react";
import { Accordion } from "./Accordion";

const meta: Meta<typeof Accordion> = {
  title: "Primitives/Accordion",
  component: Accordion,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof Accordion>;

const items = [
  { value: "a", header: "What is Support at Home?", content: "The in-home aged care programme…" },
  {
    value: "b",
    header: "How do I get started?",
    content: "Contact My Aged Care for an assessment…",
  },
  {
    value: "c",
    header: "What does it cost?",
    content: "Costs depend on your assessment and funding…",
  },
];

export const Single: Story = { args: { type: "single", collapsible: true, items } };
export const Multiple: Story = { args: { type: "multiple", items } };
