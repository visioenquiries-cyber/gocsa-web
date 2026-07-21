import { forwardRef } from "react";
import { Surface, type SurfaceProps } from "./layout";
import { cn } from "../utils/cn";

/**
 * Card — a raised, padded content surface. A thin, opinionated preset over Surface
 * (docs/10 §13). For an interactive card, wrap a single real link/heading as the
 * accessible name — never nest multiple interactive elements (docs/11 §2).
 */
export interface CardProps extends SurfaceProps {
  interactive?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      interactive,
      bg = "raised",
      border = "hair",
      radius = "lg",
      elevation = 1,
      padding = "md",
      ...props
    },
    ref,
  ) => (
    <Surface
      ref={ref}
      bg={bg}
      border={border}
      radius={radius}
      elevation={elevation}
      padding={padding}
      className={cn(
        interactive &&
          "transition-shadow duration-fast ease-standard hover:shadow-2 focus-within:shadow-2",
        className,
      )}
      {...props}
    />
  ),
);
Card.displayName = "Card";
