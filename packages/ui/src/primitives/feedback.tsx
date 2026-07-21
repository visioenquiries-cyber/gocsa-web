import { forwardRef, type HTMLAttributes } from "react";
import { icon as iconToken } from "@gocsa/tokens";
import { cn } from "../utils/cn";
import { VisuallyHidden } from "./VisuallyHidden";

/* ── Spinner — indeterminate loading indicator ───────────────────────────────── */
export interface SpinnerProps extends Omit<HTMLAttributes<HTMLSpanElement>, "children"> {
  size?: "sm" | "md" | "lg";
  /** Announced to screen readers. Omit when the spinner is inside an aria-busy control. */
  label?: string;
}
export const Spinner = forwardRef<HTMLSpanElement, SpinnerProps>(
  ({ size = "md", label, className, ...props }, ref) => {
    const dimension = size === "sm" ? iconToken.sm : size === "lg" ? iconToken.lg : iconToken.md;
    return (
      <span
        ref={ref}
        className={cn("inline-flex", className)}
        role={label ? "status" : undefined}
        {...props}
      >
        <svg
          className="animate-spin text-current"
          style={{ width: dimension, height: dimension }}
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeOpacity="0.25"
            strokeWidth="3"
          />
          <path
            d="M22 12a10 10 0 0 1-10 10"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
        {label ? <VisuallyHidden>{label}</VisuallyHidden> : null}
      </span>
    );
  },
);
Spinner.displayName = "Spinner";

/* ── Skeleton — content placeholder (decorative) ─────────────────────────────── */
const SKELETON_RADIUS = {
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  pill: "rounded-pill",
} as const;

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  width?: string | number;
  height?: string | number;
  radius?: keyof typeof SKELETON_RADIUS;
}
export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, width, height, radius = "md", style, ...props }, ref) => (
    <div
      ref={ref}
      aria-hidden="true"
      className={cn(
        "animate-pulse bg-surface motion-reduce:animate-none",
        SKELETON_RADIUS[radius],
        className,
      )}
      style={{ width, height, ...style }}
      {...props}
    />
  ),
);
Skeleton.displayName = "Skeleton";
