import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { icon as iconToken } from "@gocsa/tokens";
import { cn } from "../utils/cn";

export type IconSize = "sm" | "md" | "lg" | "xl";

export interface IconProps extends Omit<HTMLAttributes<HTMLSpanElement>, "children"> {
  /** The SVG (using `currentColor`, 2px stroke — docs/10 §14). */
  children: ReactNode;
  size?: IconSize;
  /** Accessible label. Omit for decorative icons (then `aria-hidden`). */
  label?: string;
}

/**
 * Icon — sizes and labels an inline SVG. Informational icons get a label;
 * decorative icons are hidden from assistive tech. Colour inherits `currentColor`.
 */
export const Icon = forwardRef<HTMLSpanElement, IconProps>(
  ({ children, size = "md", label, className, ...props }, ref) => (
    <span
      ref={ref}
      className={cn("inline-flex shrink-0 items-center justify-center", className)}
      style={{ width: iconToken[size], height: iconToken[size] }}
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      {...props}
    >
      {children}
    </span>
  ),
);
Icon.displayName = "Icon";
