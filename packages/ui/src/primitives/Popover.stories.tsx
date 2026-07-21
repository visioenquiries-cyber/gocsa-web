import type { Meta, StoryObj } from "@storybook/react";
import { Popover } from "./Popover";
import { Button } from "./Button";
import { Stack } from "./layout";
import { Heading, Paragraph } from "./typography";

const meta: Meta = { title: "Primitives/Popover", parameters: { layout: "centered" } };
export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Popover trigger={<Button variant="secondary">More info</Button>}>
      <Stack gap={2}>
        <Heading level={3} size={5}>
          Support at Home
        </Heading>
        <Paragraph measure={false}>
          The in-home aged care programme that replaced Home Care Packages.
        </Paragraph>
      </Stack>
    </Popover>
  ),
};
