import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { Accordion } from "./Accordion";

const items = [
  { value: "a", header: "What is Support at Home?", content: "Explanation A" },
  { value: "b", header: "How do I start?", content: "Explanation B" },
];

describe("Accordion", () => {
  it("renders collapsed headers as buttons with aria-expanded", () => {
    render(<Accordion type="single" collapsible items={items} />);
    const trigger = screen.getByRole("button", { name: "What is Support at Home?" });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("expands a panel on activation", async () => {
    render(<Accordion type="single" collapsible items={items} />);
    const trigger = screen.getByRole("button", { name: "What is Support at Home?" });
    await userEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("Explanation A")).toBeVisible();
  });

  it("uses correct heading levels for the document outline", () => {
    render(<Accordion type="single" collapsible items={items} headingLevel={2} />);
    expect(screen.getAllByRole("heading", { level: 2 })).toHaveLength(2);
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Accordion type="multiple" items={items} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
