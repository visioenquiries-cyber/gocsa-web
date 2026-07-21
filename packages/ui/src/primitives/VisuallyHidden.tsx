import { forwardRef, type HTMLAttributes } from "react";
import { cn } from "../utils/cn";

/** Visually hidden but available to screen readers (skip-links, icon labels, etc.). */
export const VisuallyHidden = forwardRef<HTMLSpanElement, HTMLAttributes<HTMLSpanElement>>(
  ({ className, ...props }, ref) => (
    <span ref={ref} className={cn("sr-only", className)} {...props} />
  ),
);
VisuallyHidden.displayName = "VisuallyHidden";
