import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { Avatar, Chip, Progress } from "./data-display";

describe("Progress", () => {
  it("exposes a labelled progressbar with a value", () => {
    render(<Progress label="Upload" value={60} />);
    const bar = screen.getByRole("progressbar", { name: "Upload" });
    expect(bar).toHaveAttribute("aria-valuenow", "60");
  });
  it("supports an indeterminate state", () => {
    render(<Progress label="Working" value={null} />);
    const bar = screen.getByRole("progressbar", { name: "Working" });
    expect(bar).not.toHaveAttribute("aria-valuenow");
  });
});

describe("Avatar", () => {
  it("shows initials as a fallback", async () => {
    render(<Avatar name="Maria Papadopoulos" />);
    expect(await screen.findByText("MP")).toBeInTheDocument();
  });
  it.each(["sm", "md", "lg"] as const)("renders the %s size", (size) => {
    const { container } = render(<Avatar name="Test User" size={size} />);
    expect(container.firstChild).toBeInTheDocument();
  });
});

describe("Chip", () => {
  it("renders static content", () => {
    render(<Chip>Greek</Chip>);
    expect(screen.getByText("Greek")).toBeInTheDocument();
  });

  it("is a toggle button when selectable and reports pressed state", async () => {
    const onSelect = vi.fn();
    render(
      <Chip selected onSelect={onSelect}>
        Filter
      </Chip>,
    );
    const btn = screen.getByRole("button", { name: "Filter" });
    expect(btn).toHaveAttribute("aria-pressed", "true");
    await userEvent.click(btn);
    expect(onSelect).toHaveBeenCalled();
  });

  it("exposes a labelled remove control", async () => {
    const onRemove = vi.fn();
    render(<Chip onRemove={onRemove}>English</Chip>);
    await userEvent.click(screen.getByRole("button", { name: "Remove English" }));
    expect(onRemove).toHaveBeenCalled();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <Chip selected onSelect={() => {}}>
        Tag
      </Chip>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
