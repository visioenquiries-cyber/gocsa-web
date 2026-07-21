"use client";
import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import * as RxProgress from "@radix-ui/react-progress";
import * as RxAvatar from "@radix-ui/react-avatar";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../utils/cn";
import { icon as iconToken } from "@gocsa/tokens";

/* ── Progress ─────────────────────────────────────────────────────────────────── */
export interface ProgressProps extends Omit<RxProgress.ProgressProps, "children"> {
  /** 0–100, or omit/undefined for indeterminate. */
  value?: number | null;
  label: string;
}
export const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  ({ value, label, className, ...props }, ref) => (
    <RxProgress.Root
      ref={ref}
      value={value ?? undefined}
      aria-label={label}
      className={cn("relative h-2 w-full overflow-hidden rounded-pill bg-surface", className)}
      {...props}
    >
      <RxProgress.Indicator
        className="h-full rounded-pill bg-primary transition-[width] duration-base ease-standard"
        style={{ width: value == null ? "40%" : `${value}%` }}
      />
    </RxProgress.Root>
  ),
);
Progress.displayName = "Progress";

/* ── Avatar ───────────────────────────────────────────────────────────────────── */
const avatar = cva(
  "inline-flex shrink-0 select-none items-center justify-center overflow-hidden bg-surface",
  {
    variants: {
      size: { sm: "", md: "", lg: "" },
      shape: { circle: "rounded-pill", square: "rounded-md" },
    },
    defaultVariants: { size: "md", shape: "circle" },
  },
);
export interface AvatarProps extends HTMLAttributes<HTMLSpanElement>, VariantProps<typeof avatar> {
  src?: string;
  /** Person's name — used as alt and to derive initials fallback. */
  name: string;
}
export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(
  ({ src, name, size = "md", shape, className, ...props }, ref) => {
    const dimension = size === "sm" ? iconToken.lg : size === "lg" ? iconToken.xl : "40px";
    const initials = name
      .split(" ")
      .map((p) => p[0])
      .filter(Boolean)
      .slice(0, 2)
      .join("")
      .toUpperCase();
    return (
      <RxAvatar.Root
        ref={ref}
        className={cn(avatar({ size, shape }), className)}
        style={{ width: dimension, height: dimension }}
        {...props}
      >
        {src ? (
          <RxAvatar.Image src={src} alt={name} className="h-full w-full object-cover" />
        ) : null}
        <RxAvatar.Fallback
          delayMs={src ? 300 : 0}
          className="font-body text-sm font-semibold text-ink-muted"
        >
          {initials}
        </RxAvatar.Fallback>
      </RxAvatar.Root>
    );
  },
);
Avatar.displayName = "Avatar";

/* ── Chip ─────────────────────────────────────────────────────────────────────── */
const chip = cva(
  "inline-flex items-center gap-1 rounded-pill border-hair px-3 py-1 font-body text-sm transition-colors duration-fast",
  {
    variants: {
      selected: {
        true: "border-primary bg-surface text-primary",
        false: "border-divider bg-surface-raised text-ink",
      },
    },
    defaultVariants: { selected: false },
  },
);
export interface ChipProps {
  children: ReactNode;
  selected?: boolean;
  onSelect?: () => void;
  onRemove?: () => void;
  removeLabel?: string;
  disabled?: boolean;
  className?: string;
}
export const Chip = forwardRef<HTMLDivElement, ChipProps>(
  ({ children, selected = false, onSelect, onRemove, removeLabel, disabled, className }, ref) => {
    const interactive = !!onSelect;
    const content = (
      <>
        <span>{children}</span>
        {onRemove ? (
          <button
            type="button"
            aria-label={removeLabel ?? `Remove ${typeof children === "string" ? children : "item"}`}
            onClick={onRemove}
            disabled={disabled}
            className="ml-1 grid h-4 w-4 place-items-center rounded-pill text-ink-muted hover:text-ink focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-focus"
          >
            <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className="h-3 w-3">
              <path
                d="M4 4l8 8M12 4l-8 8"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        ) : null}
      </>
    );
    if (interactive) {
      return (
        <button
          type="button"
          aria-pressed={selected}
          disabled={disabled}
          onClick={onSelect}
          className={cn(
            chip({ selected }),
            "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-focus disabled:opacity-disabled",
            className,
          )}
        >
          {content}
        </button>
      );
    }
    return (
      <div ref={ref} className={cn(chip({ selected }), className)}>
        {content}
      </div>
    );
  },
);
Chip.displayName = "Chip";
