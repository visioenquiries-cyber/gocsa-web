import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { Tabs } from "./Tabs";

const items = [
  { value: "one", label: "Services", content: "Service content" },
  { value: "two", label: "Funding", content: "Funding content" },
];

describe("Tabs", () => {
  it("renders a labelled tablist with selectable tabs", () => {
    render(<Tabs label="Sections" items={items} />);
    expect(screen.getByRole("tablist", { name: "Sections" })).toBeInTheDocument();
    expect(screen.getAllByRole("tab")).toHaveLength(2);
    expect(screen.getByText("Service content")).toBeVisible();
  });

  it("switches panel via keyboard arrow keys", async () => {
    render(<Tabs label="Sections" items={items} />);
    const first = screen.getByRole("tab", { name: "Services" });
    first.focus();
    await userEvent.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", { name: "Funding" })).toHaveAttribute("aria-selected", "true");
    expect(screen.getByText("Funding content")).toBeVisible();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Tabs label="Sections" items={items} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
