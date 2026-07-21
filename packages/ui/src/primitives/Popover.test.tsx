import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { Popover } from "./Popover";
import { Button } from "./Button";

describe("Popover", () => {
  it("opens from the trigger and closes on Escape, restoring focus", async () => {
    render(
      <Popover trigger={<Button>Info</Button>}>
        <p>Panel content</p>
      </Popover>,
    );
    const trigger = screen.getByRole("button", { name: "Info" });
    await userEvent.click(trigger);
    expect(await screen.findByText("Panel content")).toBeVisible();
    await userEvent.keyboard("{Escape}");
    expect(screen.queryByText("Panel content")).not.toBeInTheDocument();
    expect(trigger).toHaveFocus();
  });

  it("exposes expanded state on the trigger", async () => {
    render(
      <Popover trigger={<Button>Info</Button>}>
        <p>Body</p>
      </Popover>,
    );
    const trigger = screen.getByRole("button", { name: "Info" });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    await userEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <Popover trigger={<Button>Info</Button>}>
        <p>Body</p>
      </Popover>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
