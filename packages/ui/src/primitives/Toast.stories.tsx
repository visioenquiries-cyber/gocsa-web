import type { Meta, StoryObj } from "@storybook/react";
import { ToastProvider, useToast } from "./Toast";
import { Button } from "./Button";
import { Inline } from "./layout";

const meta: Meta = { title: "Primitives/Toast", parameters: { layout: "centered" } };
export default meta;
type Story = StoryObj;

function Demo() {
  const { toast } = useToast();
  return (
    <Inline gap={2}>
      <Button
        onClick={() =>
          toast({ title: "Saved", description: "Your changes are live.", tone: "success" })
        }
      >
        Success
      </Button>
      <Button
        variant="secondary"
        onClick={() => toast({ title: "Something went wrong", tone: "error" })}
      >
        Error
      </Button>
    </Inline>
  );
}

export const Default: Story = {
  render: () => (
    <ToastProvider>
      <Demo />
    </ToastProvider>
  ),
};
