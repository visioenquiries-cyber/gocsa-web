import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ToastProvider, useToast } from "./Toast";
import { Button } from "./Button";

function Trigger({ tone }: { tone?: "success" | "error" }) {
  const { toast } = useToast();
  return (
    <Button onClick={() => toast({ title: "Saved", description: "Your changes are live.", tone })}>
      Fire
    </Button>
  );
}

describe("Toast", () => {
  it("announces a toast when triggered", async () => {
    render(
      <ToastProvider>
        <Trigger tone="success" />
      </ToastProvider>,
    );
    await userEvent.click(screen.getByRole("button", { name: "Fire" }));
    expect(await screen.findByText("Saved")).toBeInTheDocument();
    expect(screen.getByText("Your changes are live.")).toBeInTheDocument();
  });

  it("throws when useToast is used outside its provider", () => {
    function Orphan() {
      useToast();
      return null;
    }
    expect(() => render(<Orphan />)).toThrow(/ToastProvider/);
  });
});
