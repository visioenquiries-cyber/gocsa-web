import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { Select } from "./Select";

const options = [
  { value: "en", label: "English" },
  { value: "el", label: "Greek" },
];

describe("Select", () => {
  it("renders a labelled combobox with a placeholder", () => {
    render(<Select label="Preferred language" options={options} placeholder="Choose…" />);
    expect(screen.getByText("Preferred language")).toBeInTheDocument();
    expect(screen.getByText("Choose…")).toBeInTheDocument();
  });

  it("marks the trigger invalid and wires the error message", () => {
    render(<Select label="Language" options={options} error="Please choose a language." />);
    const trigger = screen.getByRole("combobox");
    expect(trigger).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByRole("alert")).toHaveTextContent("Please choose a language.");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Select label="Language" options={options} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
