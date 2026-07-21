import type { Meta, StoryObj } from "@storybook/react";
import { Select } from "./Select";

const options = [
  { value: "sah", label: "Support at Home" },
  { value: "chsp", label: "CHSP" },
  { value: "private", label: "Privately funded" },
];

const meta: Meta<typeof Select> = {
  title: "Primitives/Select",
  component: Select,
  parameters: { layout: "padded" },
  args: { label: "Funding pathway", options },
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {};
export const WithDescription: Story = {
  args: { description: "Not sure? We can help you work it out." },
};
export const WithError: Story = { args: { error: "Please choose a funding pathway." } };
export const Disabled: Story = { args: { disabled: true } };
