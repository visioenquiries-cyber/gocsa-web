/**
 * Client review mode — internal only, NEVER shown publicly. Enabled with
 * `NEXT_PUBLIC_REVIEW_MODE=true` and only outside production builds.
 */
export function isReviewMode(): boolean {
  if (process.env.NODE_ENV === "production") return false;
  return process.env.NEXT_PUBLIC_REVIEW_MODE === "true";
}
