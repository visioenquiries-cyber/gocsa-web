import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../utils/cn";

const iconButton = cva(
  "inline-flex aspect-square select-none items-center justify-center rounded-md p-0 " +
    "transition-[background-color,color] duration-fast ease-standard " +
    "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-bg " +
    "disabled:pointer-events-none disabled:opacity-disabled",
  {
    variants: {
      variant: {
        primary: "bg-primary text-on-primary hover:bg-primary-hover active:bg-primary-active",
        ghost: "bg-transparent text-primary hover:bg-surface",
        secondary: "border-base border-primary bg-transparent text-primary hover:bg-surface",
      },
      size: { sm: "h-control-sm", md: "h-control-md", lg: "h-control-lg" },
    },
    defaultVariants: { variant: "ghost", size: "md" },
  },
);

export interface IconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof iconButton> {
  /** Required — an icon-only control MUST have an accessible name. */
  "aria-label": string;
  icon: ReactNode;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, variant, size, icon, type = "button", ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn(iconButton({ variant, size }), className)}
      {...props}
    >
      {icon}
    </button>
  ),
);
IconButton.displayName = "IconButton";
