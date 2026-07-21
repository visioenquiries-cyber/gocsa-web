import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { Checkbox, RadioGroup, Switch } from "./choice";

describe("Checkbox", () => {
  it("associates the label and toggles with keyboard", async () => {
    const onCheckedChange = vi.fn();
    render(<Checkbox label="I agree" onCheckedChange={onCheckedChange} />);
    const box = screen.getByRole("checkbox", { name: "I agree" });
    box.focus();
    await userEvent.keyboard(" ");
    expect(onCheckedChange).toHaveBeenCalled();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Checkbox label="Subscribe" description="Weekly updates" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});

describe("Switch", () => {
  it("exposes role switch with an accessible name", () => {
    render(<Switch label="Email notifications" />);
    expect(screen.getByRole("switch", { name: "Email notifications" })).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Switch label="Email notifications" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});

/**
 * Regression (R13): a `<label for>` does NOT name a role=checkbox/switch button per axe's
 * `button-name` rule. Both controls must carry `aria-labelledby`. These tests lock that in.
 */
describe("accessible-name regression (Checkbox & Switch)", () => {
  it("Checkbox derives its name via aria-labelledby", () => {
    render(<Checkbox label="I consent" />);
    const box = screen.getByRole("checkbox", { name: "I consent" });
    expect(box).toHaveAttribute("aria-labelledby");
  });

  it("Switch derives its name via aria-labelledby", () => {
    render(<Switch label="Reduce motion" />);
    const sw = screen.getByRole("switch", { name: "Reduce motion" });
    expect(sw).toHaveAttribute("aria-labelledby");
  });
});

describe("RadioGroup", () => {
  it("renders grouped options with a legend", () => {
    render(
      <RadioGroup
        legend="Preferred language"
        name="lang"
        options={[
          { value: "en", label: "English" },
          { value: "el", label: "Greek" },
        ]}
      />,
    );
    expect(screen.getByRole("radiogroup", { name: "Preferred language" })).toBeInTheDocument();
    expect(screen.getAllByRole("radio")).toHaveLength(2);
  });
});
