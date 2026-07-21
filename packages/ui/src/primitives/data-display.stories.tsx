import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Avatar, Chip, Progress } from "./data-display";
import { Inline, Stack } from "./layout";

const meta: Meta = { title: "Primitives/DataDisplay", parameters: { layout: "padded" } };
export default meta;
type Story = StoryObj;

export const Progresses: Story = {
  render: () => (
    <Stack gap={4}>
      <Progress label="Upload" value={30} />
      <Progress label="Upload" value={70} />
      <Progress label="Working" value={null} />
    </Stack>
  ),
};

export const Avatars: Story = {
  render: () => (
    <Inline gap={3}>
      <Avatar name="Maria Papadopoulos" size="sm" />
      <Avatar name="Nikos Georgiou" size="md" />
      <Avatar name="Eleni K" size="lg" shape="square" />
    </Inline>
  ),
};

export const Chips: Story = {
  render: function ChipStory() {
    const [sel, setSel] = useState<string | null>("en");
    return (
      <Inline gap={2}>
        <Chip selected={sel === "en"} onSelect={() => setSel("en")}>
          English
        </Chip>
        <Chip selected={sel === "el"} onSelect={() => setSel("el")}>
          Greek
        </Chip>
        <Chip onRemove={() => {}}>Removable</Chip>
      </Inline>
    );
  },
};
