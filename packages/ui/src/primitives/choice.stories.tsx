import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox, RadioGroup, Switch } from "./choice";
import { Stack } from "./layout";

const meta: Meta = { title: "Primitives/Choice", parameters: { layout: "padded" } };
export default meta;
type Story = StoryObj;

export const Checkboxes: Story = {
  render: () => (
    <Stack gap={4}>
      <Checkbox
        label="I agree to the privacy policy"
        description="Required to submit an enquiry."
      />
      <Checkbox label="Send me community updates" defaultChecked />
      <Checkbox label="Disabled option" disabled />
    </Stack>
  ),
};

export const Radios: Story = {
  render: () => (
    <RadioGroup
      legend="Preferred language"
      name="lang"
      defaultValue="en"
      options={[
        { value: "en", label: "English" },
        { value: "el", label: "Greek" },
        { value: "other", label: "Another language", disabled: true },
      ]}
    />
  ),
};

export const Switches: Story = {
  render: () => (
    <Stack gap={3}>
      <Switch label="Email notifications" defaultChecked />
      <Switch label="SMS notifications" />
      <Switch label="Disabled" disabled />
    </Stack>
  ),
};
