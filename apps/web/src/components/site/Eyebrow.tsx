import { cn } from "@gocsa/ui";

/**
 * Section eyebrow — uppercase label in Greek Blue with a restrained Heritage Gold rule.
 * Gold is decorative (the rule), never the text (DEC-001: gold fails as a text colour).
 */
export function Eyebrow({
  children,
  tone = "primary",
  className,
}: {
  children: React.ReactNode;
  tone?: "primary" | "onPrimary";
  className?: string;
}) {
  return (
    <p
      className={cn(
        "mb-3 flex items-center gap-2 font-body text-sm font-semibold uppercase tracking-wide",
        tone === "onPrimary" ? "text-on-primary/90" : "text-primary",
        className,
      )}
    >
      <span aria-hidden className="inline-block h-px w-6 bg-accent" />
      {children}
    </p>
  );
}
