import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { Box, Container, Divider, Grid, Inline, Stack, Surface } from "./layout";

describe("Box", () => {
  it("renders children and forwards className", () => {
    render(<Box className="custom">content</Box>);
    expect(screen.getByText("content")).toHaveClass("custom");
  });
});

describe("Surface", () => {
  it("applies the primary background with on-primary text mapping", () => {
    const { container } = render(
      <Surface bg="primary" border="base" radius="xl" elevation={2} padding="lg">
        hi
      </Surface>,
    );
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain("bg-primary");
    expect(el.className).toContain("text-on-primary");
  });

  it.each(["page", "surface", "raised"] as const)("renders %s background", (bg) => {
    const { container } = render(<Surface bg={bg}>x</Surface>);
    expect((container.firstChild as HTMLElement).className).toContain("bg-");
  });
});

describe("Container", () => {
  it.each(["prose", "narrow", "base", "wide", "full"] as const)("supports %s size", (size) => {
    const { container } = render(<Container size={size}>x</Container>);
    expect((container.firstChild as HTMLElement).className).toContain("mx-auto");
  });
});

describe("Stack / Inline", () => {
  it("Stack applies token gap, align, justify", () => {
    const { container } = render(
      <Stack gap={6} align="center" justify="between">
        x
      </Stack>,
    );
    const el = container.firstChild as HTMLElement;
    expect(el.className).toContain("flex-col");
    expect(el.className).toContain("gap-6");
    expect(el.className).toContain("items-center");
    expect(el.className).toContain("justify-between");
  });

  it("Inline wraps by default and can disable wrap", () => {
    const { container, rerender } = render(<Inline>x</Inline>);
    expect((container.firstChild as HTMLElement).className).toContain("flex-wrap");
    rerender(<Inline wrap={false}>x</Inline>);
    expect((container.firstChild as HTMLElement).className).not.toContain("flex-wrap");
  });
});

describe("Grid", () => {
  it.each([1, 2, 3, 4] as const)("renders %s responsive columns", (cols) => {
    const { container } = render(
      <Grid cols={cols} gap={4}>
        x
      </Grid>,
    );
    expect((container.firstChild as HTMLElement).className).toContain("grid");
  });
});

describe("Divider", () => {
  it("renders an hr for horizontal", () => {
    const { container } = render(<Divider />);
    expect(container.querySelector("hr")).toBeInTheDocument();
  });
  it("renders a vertical separator with role and orientation", () => {
    render(<Divider orientation="vertical" />);
    const sep = screen.getByRole("separator");
    expect(sep).toHaveAttribute("aria-orientation", "vertical");
  });
  it("has no accessibility violations", async () => {
    const { container } = render(<Divider />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
