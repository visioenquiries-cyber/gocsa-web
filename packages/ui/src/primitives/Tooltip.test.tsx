import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Tooltip, TooltipProvider } from "./Tooltip";
import { Button } from "./Button";

describe("Tooltip", () => {
  it("reveals content on keyboard focus (not hover-only)", async () => {
    render(
      <TooltipProvider>
        <Tooltip content="Call us on 7088 0500">
          <Button>Contact</Button>
        </Tooltip>
      </TooltipProvider>,
    );
    await userEvent.tab();
    expect(screen.getByRole("button", { name: "Contact" })).toHaveFocus();
    const matches = await screen.findAllByText("Call us on 7088 0500");
    expect(matches.length).toBeGreaterThanOrEqual(1);
  });
});
