/*
 * SkyVault case study.
 *
 * TODO (QUESTIONS.md section B and C):
 *   problem        Q10, Q11  placeholder text below
 *   decisions      Q12       only owner-confirmed records go in `decisions.items`;
 *                            the section is hidden while the list is empty
 *   diagram        Q13       Fig. 2 needs the owner's check
 *   running        Q14       rows need the owner's OK to publish
 *   next           Q15       placeholder text below
 *   screenshot     Q16       set `screenshot` once the image is in public/
 *   timeline       Q7        "2025 → Now" is unconfirmed
 */

import type { CaseStudy } from './types';

export const skyvault: CaseStudy = {
  slug: 'skyvault',
  pageTitle: 'SkyVault case study | Jose Sierra',
  description:
    'A multi-tenant inventory and operations platform for aviation maintenance shops, designed, built and operated by one engineer.',
  headerLabel: 'Case study 01 / SkyVault',
  tags: [{ label: 'Case study', strong: true }, { label: 'SaaS · B2B' }, { label: 'Aviation MRO' }],
  title: 'SkyVault',
  lead: 'A multi-tenant inventory and operations platform for aviation maintenance shops. I’m designing, building and operating it alone: product, backend, web, mobile and infrastructure.',
  meta: [
    { label: 'Role', value: 'Founder & sole engineer' },
    { label: 'Timeline', value: '2025 → Now' },
    { label: 'Platforms', value: 'Web · iOS · Android' },
    { label: 'Status', value: 'Pre-launch · getskyvault.app' },
  ],
  screenshotPlaceholder: {
    title: '[SkyVault screenshot]',
    body: 'Web inventory view, 16:9, plus an optional phone shot overlapping the bottom-right corner',
  },
  problem: [
    '[Problem: two or three sentences on what MRO shops struggle with today and who feels it.]',
    '[One sentence on what SkyVault does about it, and for whom.]',
  ],
  architecture: {
    intro:
      'Serverless on AWS, defined in TypeScript with Amplify Gen 2. Every request carries a tenant-scoped token; every write goes through a Lambda that checks it.',
    diagram: {
      figure: 'Fig. 2 · System overview',
      meta: 'Rev 2026-10',
      ariaLabel:
        'SkyVault architecture: web and mobile clients call AppSync, authenticated by Cognito with a pre-token Lambda; Lambda resolvers check permissions and write to DynamoDB and S3; Sentry and PostHog observe every environment',
      tiers: [
        [
          { kind: 'Client · Web', title: 'TanStack Start', note: 'Per-tenant subdomains' },
          { kind: 'Client · Mobile', title: 'Expo / React Native', note: 'iOS + Android' },
        ],
        [
          {
            kind: 'API',
            title: 'AWS AppSync',
            note: 'Group-based @auth on reads · none data source for pushed updates',
            tone: 'primary',
          },
          { kind: 'Auth', title: 'Cognito · pre-token v2 λ', note: 'Injects permission IDs into access tokens', tone: 'highlight' },
        ],
        { kind: 'Compute', title: 'Lambda resolvers', note: 'Permission check on every mutation' },
        [
          { kind: 'Data', title: 'DynamoDB' },
          { kind: 'Files', title: 'S3', note: 'Bulk exports via presigned URLs' },
        ],
      ],
      connectors: ['GraphQL queries + mutations ↓ · subscriptions ↑', 'mutations + JWT claims', null],
      footer: { label: 'Observability', value: 'Sentry (web + backend errors) · PostHog (one project per environment)' },
    },
  },
  decisions: {
    intro: 'Short decision records: what I chose, and what it cost.',
    items: [],
  },
  running: [
    { label: 'Environments', body: 'Sandbox, dev, stage and prod, each with its own Sentry environment and PostHog project.' },
    { label: 'Testing', body: 'Integration tests cover one-time-password sign-in flows, with cached tokens to cut Cognito round-trips.' },
    { label: 'Compliance', body: 'In-app account deletion built to App Store and Google Play requirements.' },
    { label: 'Enterprise SSO', body: 'Microsoft Entra ID integration with separate API and SPA app registrations.' },
  ],
  next: ['[Launch milestone and date, first customers or pilot, the next technical problem you’re working on.]'],
  navBand: {
    back: 'Back to all work',
    cta: 'Want the deep dive? Let’s talk ↗',
  },
  footerLabel: 'Case study 01 / SkyVault',
};

