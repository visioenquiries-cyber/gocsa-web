import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./form";

const meta: Meta<typeof Input> = {
  title: "Primitives/Input",
  component: Input,
  parameters: { layout: "padded" },
  args: { label: "Full name", placeholder: "e.g. Maria Papadopoulos" },
  tags: ["autodocs"],
};
export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {};
export const WithDescription: Story = {
  args: { description: "As it appears on your Medicare card." },
};
export const Required: Story = { args: { required: true } };
export const WithError: Story = {
  args: { error: "Please enter your name.", defaultValue: "" },
};
export const Disabled: Story = { args: { disabled: true, defaultValue: "Locked" } };
