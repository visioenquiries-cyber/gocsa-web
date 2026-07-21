import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "jest-axe";
import { Heading, Link, Paragraph, Text } from "./typography";

describe("Text", () => {
  it("renders as the requested element and associates a label", () => {
    render(
      <>
        <Text as="label" htmlFor="name" tone="muted" size="sm">
          Name
        </Text>
        <input id="name" aria-label="Name" />
      </>,
    );
    expect(screen.getByText("Name").tagName).toBe("LABEL");
  });

  it.each(["default", "muted", "primary", "success", "warning", "error", "onPrimary"] as const)(
    "supports the %s tone",
    (tone) => {
      const { container } = render(<Text tone={tone}>x</Text>);
      expect((container.firstChild as HTMLElement).className).toContain("text-");
    },
  );
});

describe("Heading", () => {
  it.each([1, 2, 3, 4, 5, 6] as const)("renders semantic level %s", (level) => {
    render(<Heading level={level}>Title {level}</Heading>);
    expect(screen.getByRole("heading", { level, name: `Title ${level}` })).toBeInTheDocument();
  });

  it("decouples visual size from semantic level", () => {
    render(
      <Heading level={2} size={1}>
        Big H2
      </Heading>,
    );
    const h = screen.getByRole("heading", { level: 2 });
    expect(h.className).toContain("text-2xl");
  });
});

describe("Paragraph", () => {
  it("applies a reading measure by default and can disable it", () => {
    const { rerender, container } = render(<Paragraph>Body</Paragraph>);
    expect((container.firstChild as HTMLElement).className).toContain("max-w-prose");
    rerender(<Paragraph measure={false}>Body</Paragraph>);
    expect((container.firstChild as HTMLElement).className).not.toContain("max-w-prose");
  });
});

describe("Link", () => {
  it("adds safe rel/target and an SR note for external links", () => {
    render(
      <Link href="https://example.org" external>
        Docs
      </Link>,
    );
    const link = screen.getByRole("link", { name: /Docs/ });
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
    expect(link).toHaveTextContent("opens in a new tab");
  });

  it("is a plain internal link by default", () => {
    render(<Link href="/services">Services</Link>);
    const link = screen.getByRole("link", { name: "Services" });
    expect(link).not.toHaveAttribute("target");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <Paragraph>
        Read our <Link href="/services">services</Link>.
      </Paragraph>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
