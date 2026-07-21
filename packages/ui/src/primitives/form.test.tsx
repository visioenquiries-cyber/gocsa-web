import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { Input, Textarea } from "./form";

describe("Input", () => {
  it("associates a visible label (not placeholder-as-label)", () => {
    render(<Input label="Full name" placeholder="e.g. Maria" />);
    expect(screen.getByLabelText("Full name")).toBeInTheDocument();
  });

  it("wires description via aria-describedby", () => {
    render(<Input label="Email" description="We never share it." />);
    const input = screen.getByLabelText("Email");
    const describedby = input.getAttribute("aria-describedby");
    expect(describedby).toBeTruthy();
    expect(document.getElementById(describedby!)).toHaveTextContent("We never share it.");
  });

  it("announces errors and marks the field invalid", () => {
    render(<Input label="Phone" error="Enter a valid number." />);
    const input = screen.getByLabelText("Phone");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByRole("alert")).toHaveTextContent("Enter a valid number.");
  });

  it("marks required fields", () => {
    render(<Input label="Name" required />);
    const input = screen.getByLabelText(/Name/);
    expect(input).toBeRequired();
    expect(input).toHaveAttribute("aria-required", "true");
  });

  it("accepts typed input (uncontrolled)", async () => {
    render(<Input label="City" />);
    const input = screen.getByLabelText("City");
    await userEvent.type(input, "Adelaide");
    expect(input).toHaveValue("Adelaide");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Input label="Full name" description="As on your ID." />);
    expect(await axe(container)).toHaveNoViolations();
  });
});

describe("Textarea", () => {
  it("associates a label and wires error state", () => {
    render(<Textarea label="Message" error="Please add a message." />);
    const area = screen.getByLabelText("Message");
    expect(area.tagName).toBe("TEXTAREA");
    expect(area).toHaveAttribute("aria-invalid", "true");
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });
});
