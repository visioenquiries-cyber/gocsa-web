/**
 * RGHA Retirement Living wordmark (PREVIEW). A clean typographic mark standing in for the
 * final RGHA logo (confirm-with-client). Token-driven so it re-themes with the brand.
 */
export function RghaWordmark() {
  return (
    <span className="flex flex-col leading-none">
      <span className="font-display text-xl font-bold tracking-tight text-primary md:text-2xl">
        RGHA
      </span>
      <span className="mt-0.5 font-body text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-accent-ink">
        Retirement Living
      </span>
    </span>
  );
}
