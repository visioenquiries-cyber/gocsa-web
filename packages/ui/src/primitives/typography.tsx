import { createElement, forwardRef, type AnchorHTMLAttributes, type HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../utils/cn";
import { VisuallyHidden } from "./VisuallyHidden";

/* ── Text — inline/body text primitive (polymorphic) ─────────────────────────── */
const text = cva("font-body", {
  variants: {
    size: {
      xs: "text-xs",
      sm: "text-sm",
      base: "text-base",
      md: "text-md",
      lg: "text-lg",
      xl: "text-xl",
      "2xl": "text-2xl",
    },
    weight: {
      regular: "font-regular",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },
    // Gold/accent is intentionally NOT a text tone (fails contrast — docs/10 / DEC-001).
    tone: {
      default: "text-ink",
      muted: "text-ink-muted",
      primary: "text-primary",
      success: "text-success",
      warning: "text-warning",
      error: "text-error",
      onPrimary: "text-on-primary",
    },
    align: { start: "text-left", center: "text-center", end: "text-right" },
  },
  defaultVariants: { size: "base", weight: "regular", tone: "default" },
});

type TextElement = "span" | "p" | "div" | "label" | "strong" | "em" | "small";
export interface TextProps extends HTMLAttributes<HTMLElement>, VariantProps<typeof text> {
  as?: TextElement;
  htmlFor?: string;
}
export const Text = forwardRef<HTMLElement, TextProps>(
  ({ as = "span", className, size, weight, tone, align, ...props }, ref) =>
    createElement(as, {
      ref,
      className: cn(text({ size, weight, tone, align }), className),
      ...props,
    }),
);
Text.displayName = "Text";

/* ── Heading — semantic level, display type ──────────────────────────────────── */
const HEADING_SIZE: Record<number, string> = {
  1: "text-2xl",
  2: "text-xl",
  3: "text-lg",
  4: "text-md",
  5: "text-base",
  6: "text-sm",
};
export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  /** Semantic heading level (1–6). Sets the tag; visual size follows unless `size` overrides. */
  level: 1 | 2 | 3 | 4 | 5 | 6;
  size?: keyof typeof HEADING_SIZE;
}
export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ level, size, className, ...props }, ref) =>
    createElement(`h${level}`, {
      ref,
      className: cn(
        "font-display font-semibold leading-heading text-ink text-balance",
        HEADING_SIZE[size ?? level],
        className,
      ),
      ...props,
    }),
);
Heading.displayName = "Heading";

/* ── Paragraph — readable body copy ──────────────────────────────────────────── */
export interface ParagraphProps extends HTMLAttributes<HTMLParagraphElement> {
  /** Constrain to an optimal reading measure (default true). */
  measure?: boolean;
}
export const Paragraph = forwardRef<HTMLParagraphElement, ParagraphProps>(
  ({ className, measure = true, ...props }, ref) => (
    <p
      ref={ref}
      className={cn(
        "font-body text-base leading-body text-ink",
        measure && "max-w-prose",
        className,
      )}
      {...props}
    />
  ),
);
Paragraph.displayName = "Paragraph";

/* ── Link — accessible anchor ────────────────────────────────────────────────── */
const link = cva(
  "rounded-sm underline-offset-2 transition-colors duration-fast ease-standard " +
    "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
  {
    variants: {
      variant: {
        default: "text-link underline hover:text-primary-hover",
        subtle: "text-ink no-underline hover:text-primary hover:underline",
        inverse: "text-on-primary underline hover:opacity-90",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export interface LinkProps
  extends AnchorHTMLAttributes<HTMLAnchorElement>, VariantProps<typeof link> {
  /** External link — adds safe rel/target and an SR "(opens in a new tab)" note. */
  external?: boolean;
}
export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, variant, external, children, ...props }, ref) => (
    <a
      ref={ref}
      className={cn(link({ variant }), className)}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...props}
    >
      {children}
      {external ? <VisuallyHidden> (opens in a new tab)</VisuallyHidden> : null}
    </a>
  ),
);
Link.displayName = "Link";
