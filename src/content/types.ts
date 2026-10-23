export interface Link {
  label: string;
  href: string;
}

export interface PlateRow {
  label: string;
  value: string;
  /** Renders the value as a link */
  href?: string;
  /** Plain text after the link, e.g. " · merged" */
  suffix?: string;
  /** Larger, bolder value (the Name row) */
  strong?: boolean;
}

export interface Capability {
  id: string;
  title: string;
  body: string;
}

export interface DiagramNode {
  kind: string;
  title: string;
  note?: string;
  /** "primary" gets the light border (the API), "highlight" the signal border (the interesting bit) */
  tone?: 'primary' | 'highlight';
}

/** One tier of the diagram: a single node or a row of nodes */
export type DiagramTier = DiagramNode | DiagramNode[];

export interface ArchDiagramData {
  figure: string;
  meta: string;
  ariaLabel: string;
  tiers: DiagramTier[];
  /** Connector labels between tiers; tiers.length - 1 entries, null for an unlabeled line */
  connectors: (string | null)[];
  /** Tier indexes whose nodes are peers joined by a dashed line (compact size only) */
  peerTiers?: number[];
  footer: { label: string; value: string };
}

export interface PipelineData {
  ariaLabel: string;
  steps: string[];
}

export interface FeaturedProject {
  id: string;
  tags: { label: string; strong?: boolean }[];
  title: string;
  summary: string;
  points: { id: string; title: string; body: string; code?: string; bodyAfter?: string }[];
  stack: string[];
  cta: Link;
  note: string;
  diagram: ArchDiagramData;
}

export interface MediaLoop {
  /** Poster frame; also the only thing shown under prefers-reduced-motion */
  poster?: string;
  mp4?: string;
  webm?: string;
  width: number;
  height: number;
  placeholderTitle: string;
  placeholderBody: string;
}

export interface ProjectCardData {
  id: string;
  number: string;
  kicker: string;
  tech: string;
  title: string;
  body: string;
  media?: MediaLoop;
  pipeline: PipelineData;
  links?: Link[];
  note?: string;
}

export interface ProjectRowData {
  number: string;
  title: string;
  body: string;
  link?: Link;
  note?: string;
}

export interface SystemsCell {
  title: string;
  body: string;
}

export interface ExperienceItem {
  dates: string;
  role: string;
  org: string;
  points: string[];
}

export interface ToolkitGroup {
  title: string;
  items: string[];
}

export interface SectionMeta {
  id?: string;
  number: string;
  label: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  href?: string;
  title: string;
}

export interface CaseStudyDecision {
  area: string;
  title: string;
  why: string;
  cost: string;
}

export interface CaseStudy {
  slug: string;
  pageTitle: string;
  description: string;
  headerLabel: string;
  tags: { label: string; strong?: boolean }[];
  title: string;
  lead: string;
  meta: { label: string; value: string }[];
  screenshot?: { src: string; alt: string; width: number; height: number; phone?: { src: string; alt: string; width: number; height: number } };
  screenshotPlaceholder: { title: string; body: string };
  problem: string[];
  architecture: { intro: string; diagram: ArchDiagramData };
  decisions: { intro: string; items: CaseStudyDecision[] };
  running: { label: string; body: string }[];
  next: string[];
  navBand: { back: string; cta: string };
  footerLabel: string;
}
