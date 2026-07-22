/** Accessible skip-to-content link — first in tab order, visible on focus. */
export function SkipLink() {
  return (
    <a
      href="#main"
      className="sr-only rounded-md focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-tooltip focus:bg-primary focus:px-4 focus:py-2 focus:font-body focus:text-on-primary focus:shadow-3"
    >
      Skip to content
    </a>
  );
}
