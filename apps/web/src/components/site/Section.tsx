import type { ReactNode } from "react";
import { Container, cn } from "@gocsa/ui";

type Bg = "page" | "surface" | "primary";
const BG: Record<Bg, string> = {
  page: "",
  surface: "bg-surface",
  primary: "bg-primary text-on-primary",
};

/** Full-width section band + centred container. Backgrounds are approved token pairs only. */
export function Section({
  children,
  bg = "page",
  id,
  className,
  size = "base",
}: {
  children: ReactNode;
  bg?: Bg;
  id?: string;
  className?: string;
  size?: "prose" | "narrow" | "base" | "wide";
}) {
  return (
    <section id={id} className={cn("py-16 md:py-24", BG[bg], className)}>
      <Container size={size}>{children}</Container>
    </section>
  );
}
