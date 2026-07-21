import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { Drawer } from "./overlays";
import { Button } from "./Button";

describe("Drawer", () => {
  it("opens an accessible dialog and closes on Escape restoring focus", async () => {
    render(
      <Drawer trigger={<Button>Menu</Button>} title="Navigation" side="right">
        <p>Links</p>
      </Drawer>,
    );
    const trigger = screen.getByRole("button", { name: "Menu" });
    await userEvent.click(trigger);
    expect(await screen.findByRole("dialog", { name: "Navigation" })).toBeInTheDocument();
    await userEvent.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it("has no accessibility violations when open", async () => {
    const { container } = render(
      <Drawer trigger={<Button>Menu</Button>} title="Navigation">
        <p>Links</p>
      </Drawer>,
    );
    await userEvent.click(screen.getByRole("button", { name: "Menu" }));
    await screen.findByRole("dialog");
    expect(await axe(container)).toHaveNoViolations();
  });
});
