import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { Dialog } from "./overlays";
import { Button } from "./Button";

describe("Dialog", () => {
  it("opens from the trigger and exposes an accessible dialog", async () => {
    render(
      <Dialog trigger={<Button>Open</Button>} title="Confirm" description="Are you sure?">
        <p>Body</p>
      </Dialog>,
    );
    await userEvent.click(screen.getByRole("button", { name: "Open" }));
    const dialog = await screen.findByRole("dialog", { name: "Confirm" });
    expect(dialog).toBeInTheDocument();
  });

  it("closes on Escape and restores focus to the trigger", async () => {
    render(
      <Dialog trigger={<Button>Open</Button>} title="Confirm">
        <p>Body</p>
      </Dialog>,
    );
    const trigger = screen.getByRole("button", { name: "Open" });
    await userEvent.click(trigger);
    await screen.findByRole("dialog", { name: "Confirm" });
    await userEvent.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it("has no accessibility violations when open", async () => {
    const { container } = render(
      <Dialog trigger={<Button>Open</Button>} title="Confirm" description="Details">
        <p>Body</p>
      </Dialog>,
    );
    await userEvent.click(screen.getByRole("button", { name: "Open" }));
    await screen.findByRole("dialog");
    expect(await axe(container)).toHaveNoViolations();
  });
});
