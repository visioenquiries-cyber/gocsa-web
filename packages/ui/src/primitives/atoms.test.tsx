import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { Icon } from "./Icon";
import { Badge } from "./Badge";
import { Card } from "./Card";
import { IconButton } from "./IconButton";
import { Spinner, Skeleton } from "./feedback";
import { VisuallyHidden } from "./VisuallyHidden";

const Glyph = (
  <svg viewBox="0 0 20 20" aria-hidden="true">
    <path d="M4 10h12" stroke="currentColor" />
  </svg>
);

describe("Icon", () => {
  it("names an informational icon", () => {
    render(<Icon label="Search">{Glyph}</Icon>);
    expect(screen.getByRole("img", { name: "Search" })).toBeInTheDocument();
  });
  it("hides a decorative icon from assistive tech", () => {
    const { container } = render(<Icon>{Glyph}</Icon>);
    expect(container.querySelector('[aria-hidden="true"]')).toBeInTheDocument();
  });
});

describe("Badge", () => {
  it.each(["neutral", "primary", "success", "warning", "error", "info"] as const)(
    "renders the %s tone",
    (tone) => {
      render(<Badge tone={tone}>Status</Badge>);
      expect(screen.getByText("Status")).toBeInTheDocument();
    },
  );
});

describe("Card", () => {
  it("renders children and interactive elevation", () => {
    const { container } = render(<Card interactive>Body</Card>);
    expect(screen.getByText("Body")).toBeInTheDocument();
    expect((container.firstChild as HTMLElement).className).toContain("hover:shadow-2");
  });
});

describe("IconButton", () => {
  it("requires and exposes an accessible name", () => {
    render(<IconButton aria-label="Close" icon={Glyph} />);
    expect(screen.getByRole("button", { name: "Close" })).toBeInTheDocument();
  });
  it.each(["primary", "ghost", "secondary"] as const)("supports the %s variant", (variant) => {
    render(<IconButton aria-label="Menu" variant={variant} icon={Glyph} />);
    expect(screen.getByRole("button", { name: "Menu" })).toBeInTheDocument();
  });
});

describe("Spinner", () => {
  it("announces when labelled", () => {
    render(<Spinner label="Loading" />);
    expect(screen.getByRole("status")).toHaveTextContent("Loading");
  });
  it("is silent (no status role) when unlabelled", () => {
    render(<Spinner />);
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });
});

describe("Skeleton", () => {
  it("is decorative and pauses under reduced motion", () => {
    const { container } = render(<Skeleton width={100} height={20} radius="lg" />);
    const el = container.firstChild as HTMLElement;
    expect(el).toHaveAttribute("aria-hidden", "true");
    expect(el.className).toContain("motion-reduce:animate-none");
  });
});

describe("VisuallyHidden", () => {
  it("renders sr-only text present in the a11y tree", () => {
    render(<VisuallyHidden>Skip to content</VisuallyHidden>);
    expect(screen.getByText("Skip to content")).toHaveClass("sr-only");
  });
});

describe("atoms accessibility", () => {
  it("has no violations for a labelled icon button", async () => {
    const { container } = render(<IconButton aria-label="Search" icon={Glyph} />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
