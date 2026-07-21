import { forwardRef, type HTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../utils/cn";

const badge = cva(
  "inline-flex items-center gap-1 rounded-pill px-3 py-1 font-body text-sm font-medium",
  {
    variants: {
      // All tones use dark text on a light tint → accessible contrast (docs/10 §17).
      tone: {
        neutral: "bg-surface text-ink-muted",
        primary: "bg-surface text-primary",
        success: "bg-success-surface text-success",
        warning: "bg-warning-surface text-warning",
        error: "bg-error-surface text-error",
        info: "bg-info-surface text-info",
      },
    },
    defaultVariants: { tone: "neutral" },
  },
);

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badge> {}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, tone, ...props }, ref) => (
    <span ref={ref} className={cn(badge({ tone }), className)} {...props} />
  ),
);
Badge.displayName = "Badge";
