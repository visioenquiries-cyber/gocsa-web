import type { Meta, StoryObj } from "@storybook/react";
import { Dialog, Drawer } from "./overlays";
import { Button } from "./Button";
import { Inline, Stack } from "./layout";
import { Paragraph } from "./typography";

const meta: Meta = { title: "Primitives/Overlays", parameters: { layout: "centered" } };
export default meta;
type Story = StoryObj;

export const DialogStory: Story = {
  name: "Dialog",
  render: () => (
    <Dialog
      trigger={<Button>Open dialog</Button>}
      title="Confirm your enquiry"
      description="We'll call you back within one business day."
    >
      <Stack gap={4}>
        <Paragraph measure={false}>Body content goes here.</Paragraph>
        <Inline gap={2} justify="end">
          <Button variant="ghost">Cancel</Button>
          <Button>Confirm</Button>
        </Inline>
      </Stack>
    </Dialog>
  ),
};

export const DrawerStory: Story = {
  name: "Drawer",
  render: () => (
    <Drawer
      trigger={<Button variant="secondary">Open menu</Button>}
      title="Navigation"
      side="right"
    >
      <Stack gap={2}>
        <a href="#a">Support at Home</a>
        <a href="#b">Our Services</a>
        <a href="#c">How to Get Started</a>
      </Stack>
    </Drawer>
  ),
};
