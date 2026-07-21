import type { Meta, StoryObj } from "@storybook/react";
import { Tabs } from "./Tabs";
import { Paragraph } from "./typography";

const meta: Meta<typeof Tabs> = {
  title: "Primitives/Tabs",
  component: Tabs,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  args: {
    label: "Care information",
    items: [
      { value: "sah", label: "Support at Home", content: <Paragraph>What SAH covers…</Paragraph> },
      { value: "chsp", label: "CHSP", content: <Paragraph>Entry-level support…</Paragraph> },
      {
        value: "private",
        label: "Private",
        content: <Paragraph>Privately funded care…</Paragraph>,
      },
    ],
  },
};
