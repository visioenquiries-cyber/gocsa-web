import { forwardRef, type HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../utils/cn";

/* Static gap/align maps — kept as literal class strings so Tailwind's scanner sees them. */
const GAP: Record<number, string> = {
  0: "gap-0",
  1: "gap-1",
  2: "gap-2",
  3: "gap-3",
  4: "gap-4",
  5: "gap-5",
  6: "gap-6",
  8: "gap-8",
  10: "gap-10",
  12: "gap-12",
  16: "gap-16",
};
type GapToken = keyof typeof GAP;

const ALIGN: Record<string, string> = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
  baseline: "items-baseline",
};
const JUSTIFY: Record<string, string> = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
};

/* ── Box — unstyled layout atom ─────────────────────────────────────────────── */
export type BoxProps = HTMLAttributes<HTMLDivElement>;
export const Box = forwardRef<HTMLDivElement, BoxProps>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn(className)} {...props} />
));
Box.displayName = "Box";

/* ── Surface — themed background + elevation ─────────────────────────────────── */
const surface = cva("", {
  variants: {
    bg: {
      page: "bg-bg",
      surface: "bg-surface",
      raised: "bg-surface-raised",
      primary: "bg-primary text-on-primary",
    },
    border: {
      none: "",
      hair: "border-hair border-divider",
      base: "border-base border-border",
    },
    radius: {
      none: "rounded-none",
      sm: "rounded-sm",
      md: "rounded-md",
      lg: "rounded-lg",
      xl: "rounded-xl",
    },
    elevation: { 0: "shadow-0", 1: "shadow-1", 2: "shadow-2", 3: "shadow-3", 4: "shadow-4" },
    padding: { none: "p-0", sm: "p-4", md: "p-6", lg: "p-8" },
  },
  defaultVariants: { bg: "raised", border: "none", radius: "lg", elevation: 0, padding: "none" },
});

export interface SurfaceProps
  extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof surface> {}

export const Surface = forwardRef<HTMLDivElement, SurfaceProps>(
  ({ className, bg, border, radius, elevation, padding, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(surface({ bg, border, radius, elevation, padding }), className)}
      {...props}
    />
  ),
);
Surface.displayName = "Surface";

/* ── Container — centered max-width with page gutters ────────────────────────── */
const container = cva("mx-auto w-full px-gutter md:px-gutter-lg", {
  variants: {
    size: {
      prose: "max-w-prose",
      narrow: "max-w-narrow",
      base: "max-w-base",
      wide: "max-w-wide",
      full: "max-w-none",
    },
  },
  defaultVariants: { size: "base" },
});

export interface ContainerProps
  extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof container> {}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size, ...props }, ref) => (
    <div ref={ref} className={cn(container({ size }), className)} {...props} />
  ),
);
Container.displayName = "Container";

/* ── Stack — vertical flow with token gap ────────────────────────────────────── */
export interface StackProps extends HTMLAttributes<HTMLDivElement> {
  gap?: GapToken;
  align?: keyof typeof ALIGN;
  justify?: keyof typeof JUSTIFY;
}
export const Stack = forwardRef<HTMLDivElement, StackProps>(
  ({ className, gap = 4, align, justify, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex flex-col",
        GAP[gap],
        align && ALIGN[align],
        justify && JUSTIFY[justify],
        className,
      )}
      {...props}
    />
  ),
);
Stack.displayName = "Stack";

/* ── Inline — horizontal, wrapping row ───────────────────────────────────────── */
export interface InlineProps extends HTMLAttributes<HTMLDivElement> {
  gap?: GapToken;
  align?: keyof typeof ALIGN;
  justify?: keyof typeof JUSTIFY;
  wrap?: boolean;
}
export const Inline = forwardRef<HTMLDivElement, InlineProps>(
  ({ className, gap = 2, align = "center", justify, wrap = true, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex flex-row",
        wrap && "flex-wrap",
        GAP[gap],
        ALIGN[align],
        justify && JUSTIFY[justify],
        className,
      )}
      {...props}
    />
  ),
);
Inline.displayName = "Inline";

/* ── Grid — responsive columns ───────────────────────────────────────────────── */
const COLS: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
};
export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  cols?: keyof typeof COLS;
  gap?: GapToken;
}
export const Grid = forwardRef<HTMLDivElement, GridProps>(
  ({ className, cols = 3, gap = 6, ...props }, ref) => (
    <div ref={ref} className={cn("grid", COLS[cols], GAP[gap], className)} {...props} />
  ),
);
Grid.displayName = "Grid";

/* ── Divider — decorative or semantic separator ──────────────────────────────── */
export interface DividerProps extends HTMLAttributes<HTMLElement> {
  orientation?: "horizontal" | "vertical";
}
export const Divider = forwardRef<HTMLHRElement, DividerProps>(
  ({ className, orientation = "horizontal", ...props }, ref) => {
    if (orientation === "vertical") {
      return (
        <span
          role="separator"
          aria-orientation="vertical"
          className={cn("inline-block w-px self-stretch bg-divider", className)}
          {...props}
        />
      );
    }
    return (
      <hr
        ref={ref}
        className={cn("h-px w-full border-0 bg-divider", className)}
        {...(props as HTMLAttributes<HTMLHRElement>)}
      />
    );
  },
);
Divider.displayName = "Divider";
