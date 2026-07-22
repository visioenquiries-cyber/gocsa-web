import { Badge } from "@gocsa/ui";
import type { ContentStatus } from "../../content/homepage/types";
import { isReviewMode } from "../../lib/review";

const TONE: Record<ContentStatus, React.ComponentProps<typeof Badge>["tone"]> = {
  confirmed: "success",
  draft: "warning",
  "requires-client-confirmation": "error",
  "demonstration-only": "neutral",
};

const LABEL: Record<ContentStatus, string> = {
  confirmed: "Confirmed",
  draft: "Draft",
  "requires-client-confirmation": "Confirm with client",
  "demonstration-only": "Demo only",
};

/** Shows a content-status chip — only in review mode. Renders nothing publicly. */
export function ReviewBadge({ status }: { status: ContentStatus }) {
  if (!isReviewMode() || status === "confirmed") return null;
  return (
    <Badge tone={TONE[status]} className="align-middle text-xs">
      {LABEL[status]}
    </Badge>
  );
}
