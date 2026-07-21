/**
 * Editorial publishing workflow (docs/09 §0.4, docs/12 §8). A pure state machine:
 * transitions are explicit and each requires a capability, so illegal transitions and
 * unauthorised ones are both rejected server-side.
 */
import { can, type AccessContext } from "../access/policy";
import type { CmsUser, Operation } from "../access/roles";

export const WORKFLOW_STATES = [
  "draft",
  "in-review",
  "changes-requested",
  "approved",
  "published",
  "archived",
] as const;
export type WorkflowState = (typeof WORKFLOW_STATES)[number];

interface Transition {
  from: WorkflowState;
  to: WorkflowState;
  /** Capability required to perform the transition. */
  op: Operation;
  label: string;
}

/** The complete, legal transition set. Anything not listed is illegal. */
export const TRANSITIONS: Transition[] = [
  { from: "draft", to: "in-review", op: "update", label: "Submit for review" },
  { from: "changes-requested", to: "in-review", op: "update", label: "Resubmit" },
  { from: "in-review", to: "changes-requested", op: "review", label: "Request changes" },
  { from: "in-review", to: "approved", op: "approve", label: "Approve" },
  { from: "in-review", to: "draft", op: "update", label: "Withdraw from review" },
  { from: "approved", to: "published", op: "publish", label: "Publish" },
  { from: "approved", to: "draft", op: "update", label: "Return to draft" },
  { from: "published", to: "archived", op: "publish", label: "Archive" },
  { from: "published", to: "draft", op: "publish", label: "Unpublish" },
  { from: "archived", to: "draft", op: "restore", label: "Restore" },
];

/** States reachable from `state`, regardless of who may perform them. */
export function allowedNextStates(state: WorkflowState): WorkflowState[] {
  return TRANSITIONS.filter((t) => t.from === state).map((t) => t.to);
}

/** Is `from → to` a legal transition at all (independent of permissions)? */
export function isLegalTransition(from: WorkflowState, to: WorkflowState): boolean {
  return TRANSITIONS.some((t) => t.from === from && t.to === to);
}

export interface TransitionRequest {
  from: WorkflowState;
  to: WorkflowState;
  lane: AccessContext["lane"];
  site?: AccessContext["site"];
}

/**
 * May `user` move content from → to? Requires both a legal transition AND the capability
 * it demands, within the user's site scope. Read-only and under-privileged roles are denied.
 */
export function canTransition(user: CmsUser | null | undefined, req: TransitionRequest): boolean {
  const transition = TRANSITIONS.find((t) => t.from === req.from && t.to === req.to);
  if (!transition) return false; // illegal transition
  return can(user, transition.op, { lane: req.lane, site: req.site });
}

/**
 * Scheduled publishing is only valid from an already-approved state → published
 * (docs/09/§0.4). Guards against scheduling unapproved content.
 */
export function canSchedulePublish(
  user: CmsUser | null | undefined,
  req: Omit<TransitionRequest, "from" | "to">,
): boolean {
  return canTransition(user, { ...req, from: "approved", to: "published" });
}
