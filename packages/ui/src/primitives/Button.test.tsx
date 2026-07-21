/**
 * Button — reference test pattern (docs/21). Behaviour + accessibility, not shallow render.
 */
import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { axe } from "jest-axe";
import { Button } from "./Button";

const Glyph = (
  <svg viewBox="0 0 20 20" aria-hidden="true">
    <path d="M4 10h12" />
  </svg>
);

describe("Button", () => {
  it("renders its label", () => {
    render(<Button>Get started</Button>);
    expect(screen.getByRole("button", { name: "Get started" })).toBeInTheDocument();
  });

  it("calls onClick when activated by mouse and keyboard", async () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Go</Button>);
    const btn = screen.getByRole("button", { name: "Go" });
    await userEvent.click(btn);
    btn.focus();
    await userEvent.keyboard("{Enter}");
    await userEvent.keyboard(" ");
    expect(onClick).toHaveBeenCalledTimes(3);
  });

  it("is disabled and busy while loading", () => {
    render(<Button isLoading>Saving</Button>);
    const btn = screen.getByRole("button", { name: "Saving" });
    expect(btn).toBeDisabled();
    expect(btn).toHaveAttribute("aria-busy", "true");
  });

  it("does not fire onClick when disabled", async () => {
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        Nope
      </Button>,
    );
    await userEvent.click(screen.getByRole("button", { name: "Nope" }));
    expect(onClick).not.toHaveBeenCalled();
  });

  it.each(["primary", "accent", "secondary", "ghost"] as const)(
    "renders the %s variant",
    (variant) => {
      render(<Button variant={variant}>V</Button>);
      expect(screen.getByRole("button", { name: "V" })).toBeInTheDocument();
    },
  );

  it.each(["sm", "md", "lg"] as const)("renders the %s size", (size) => {
    render(<Button size={size}>S</Button>);
    expect(screen.getByRole("button", { name: "S" })).toBeInTheDocument();
  });

  it("renders left/right icons and full width", () => {
    const { container } = render(
      <Button fullWidth leftIcon={Glyph} rightIcon={Glyph}>
        Icons
      </Button>,
    );
    expect((container.firstChild as HTMLElement).className).toContain("w-full");
    expect(container.querySelectorAll("svg").length).toBe(2);
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Button>Accessible</Button>);
    expect(await axe(container)).toHaveNoViolations();
  });
});
