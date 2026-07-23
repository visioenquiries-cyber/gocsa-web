import { cn } from "@gocsa/ui";

/**
 * Renders a heading string with one word (or phrase) set in an italic serif accent —
 * the editorial device from the approved benchmark ("caring", "comes"). The emphasis is
 * italic only (never gold-on-light — DEC-001); an optional `accentClassName` can tint it
 * with an accessible token colour for the given background.
 */
export function EmphasisHeading({
  text,
  emphasis,
  accentClassName,
  className,
}: {
  text: string;
  emphasis?: string;
  accentClassName?: string;
  className?: string;
}) {
  if (!emphasis || !text.includes(emphasis)) {
    return <span className={className}>{text}</span>;
  }
  const [before, ...rest] = text.split(emphasis);
  const after = rest.join(emphasis);
  return (
    <span className={className}>
      {before}
      <em className={cn("font-display italic", accentClassName)}>{emphasis}</em>
      {after}
    </span>
  );
}
