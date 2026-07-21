/**
 * The CMS schema registry — the single list the Payload config composes into a build
 * (docs/12). Collections carry their publishing `lane`; the Payload adapter attaches
 * `collectionAccess(lane)` to each so authorization is enforced server-side, uniformly.
 */
import type { CollectionConfig } from "./types";
import { users } from "./collections/users";
import { media } from "./collections/media";
import {
  downloads,
  faqs,
  fundingPrograms,
  pages,
  serviceGroups,
  services,
  testimonials,
} from "./collections/content";
import { globals } from "./globals";

/** Collections implemented this sprint (foundation + reference + primary examples). */
export const collections: CollectionConfig[] = [
  users,
  media,
  serviceGroups,
  services,
  fundingPrograms,
  faqs,
  testimonials,
  downloads,
  pages,
];

export { globals };

/**
 * Remaining collections to add on the identical pattern before Sprint 3 fully closes
 * (docs/09): resources, news, events, staff, policies, careers, forms, form-submissions
 * (restricted), redirects.
 */
export const pendingCollections = [
  "resources",
  "news",
  "events",
  "staff",
  "policies",
  "careers",
  "forms",
  "form-submissions",
  "redirects",
] as const;
