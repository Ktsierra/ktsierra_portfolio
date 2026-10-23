import type { CaseStudy } from './types';
import { skyvault } from './skyvault';

/** Add a case study by dropping in a content file and listing it here */
export const caseStudies: Record<string, CaseStudy | undefined> = {
  [skyvault.slug]: skyvault,
};
