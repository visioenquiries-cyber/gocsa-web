import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../utils/cn";
import { Spinner } from "./feedback";

const button = cva(
  "inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-md font-body font-semibold " +
    "transition-[background-color,color,box-shadow] duration-fast ease-standard " +
    "focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-focus focus-visible:ring-offset-2 focus-visible:ring-offset-bg " +
    "disabled:pointer-events-none disabled:opacity-disabled",
  {
    variants: {
      variant: {
        // Primary action — Greek Blue, white text (6.2:1+).
        primary: "bg-primary text-on-primary hover:bg-primary-hover active:bg-primary-active",
        // Accent — Heritage Gold with CHARCOAL text only (DEC-007). Never white on gold.
        accent: "bg-accent text-on-accent hover:brightness-95 active:brightness-90",
        // Secondary — outlined.
        secondary: "border-base border-primary bg-transparent text-primary hover:bg-surface",
        // Ghost/text.
        ghost: "bg-transparent text-primary hover:bg-surface",
      },
      size: {
        sm: "h-control-sm px-4 text-sm",
        md: "h-control-md px-5 text-base",
        lg: "h-control-lg px-6 text-base",
      },
      fullWidth: { true: "w-full" },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof button> {
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      fullWidth,
      isLoading = false,
      leftIcon,
      rightIcon,
      disabled,
      children,
      type = "button",
      ...props
    },
    ref,
  ) => (
    <button
      ref={ref}
      type={type}
      className={cn(button({ variant, size, fullWidth }), className)}
      disabled={disabled || isLoading}
      aria-busy={isLoading || undefined}
      {...props}
    >
      {isLoading ? <Spinner size="sm" /> : leftIcon}
      {children}
      {!isLoading && rightIcon}
    </button>
  ),
);
Button.displayName = "Button";

export { button as buttonVariants };
