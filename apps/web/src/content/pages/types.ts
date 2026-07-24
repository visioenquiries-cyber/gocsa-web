/**
 * Interior-page content contract. Every non-homepage route renders from one of these,
 * so pages stay consistent and are added by data, not new React. Same separation as the
 * homepage (`HomepageContentSource`): fixtures now, Payload later.
 *
 * IMPORTANT: all copy here is ORIGINAL, written for GOCSA and grounded in the public
 * Australian aged-care framework (Support at Home, My Aged Care, ACAT, the Aged Care
 * Quality Standards, the Charter of Aged Care Rights). It is DRAFT for client review —
 * nothing is a binding GOCSA policy until GOCSA + compliance sign off. Not copied from any
 * third-party site.
 */
import type {
  Cta,
  ContentStatus,
  SectionImage,
  GalleryImage,
  ShowroomSpace,
} from "../homepage/types";

export type { Cta, ContentStatus, SectionImage, GalleryImage, ShowroomSpace };

export interface Feature {
  title: string;
  description: string;
  href?: string;
}

/** A renderable content block. The page renderer maps `kind` → a warm editorial component. */
export type PageBlock =
  | { kind: "prose"; heading?: string; body: string[] }
  | { kind: "features"; heading?: string; intro?: string; columns?: 2 | 3; items: Feature[] }
  | { kind: "steps"; heading?: string; intro?: string; items: Feature[] }
  | { kind: "checklist"; heading?: string; intro?: string; columns?: 2 | 3; items: Feature[] }
  | { kind: "callout"; title: string; body: string }
  | { kind: "cards"; heading?: string; intro?: string; columns?: 2 | 3; items: Feature[] }
  | { kind: "cta"; title: string; body?: string; primary: Cta; secondary?: Cta }
  | { kind: "media"; image?: SectionImage; caption?: string }
  | { kind: "faqs"; heading?: string; intro?: string; items: { question: string; answer: string }[] }
  | { kind: "gallery"; heading?: string; intro?: string; images: GalleryImage[] }
  | { kind: "showroom"; eyebrow?: string; heading?: string; spaces: ShowroomSpace[] };

export interface InteriorPage {
  slug: string; // e.g. "support-at-home", "services/personal-care"
  eyebrow?: string;
  title: string;
  lead?: string;
  heroImage?: SectionImage;
  /** Provenance chip shown only in review mode. */
  status?: ContentStatus;
  blocks: PageBlock[];
  seo?: { title?: string; description?: string };
}

export interface PageSource {
  getPage(slug: string): InteriorPage | undefined;
  allSlugs(): string[];
}
