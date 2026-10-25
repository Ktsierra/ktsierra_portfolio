/*
 * SkyVault case study.
 *
 * TODO (QUESTIONS.md section B and C):
 *   problem        Q10, Q11  drafted from the owner's answers; needs his OK on the wording
 *   decisions      Q12       only owner-confirmed records go in `decisions.items`;
 *                            the section is hidden while the list is empty
 *   running        Q14       the Testing row is drafted from the repo; needs his OK
 *   next           Q15       placeholder text below
 *   screenshot     Q16       set `screenshot` once the getskyvault.app landing page ships
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
    { label: 'Timeline', value: '2026 → Now' },
    { label: 'Platforms', value: 'Web · iOS · Android' },
    { label: 'Status', value: 'Pre-launch · getskyvault.app' },
  ],
  screenshotPlaceholder: {
    title: '[SkyVault screenshot]',
    body: 'Web inventory view, 16:9, plus an optional phone shot overlapping the bottom-right corner',
  },
  problem: [
    'An MRO shop has to account for every unit it touches: where it is in its lifecycle, what work was performed and by whom, and which assets and consumables went into it. That traceability is what customers and auditors ask for, and the established MRO systems are built around documents rather than the evidence captured on the shop floor.',
    'SkyVault gives the shop floor a production view for work orders, assets and consumables, with photos and video as evidence of the work, and gives customer service a client view where reps share notes and media so customers can follow their unit’s progress.',
  ],
  architecture: {
    intro:
      'Serverless on AWS, defined in TypeScript with Amplify Gen 2. Every request carries a tenant-scoped token; every write goes through a Lambda that checks it.',
    diagram: {
      figure: 'Fig. 2 · System overview',
      meta: 'Rev 2026-10',
      ariaLabel:
        'SkyVault architecture: web, mobile and public share-page clients call AppSync, authenticated by Cognito with four Lambda triggers; Lambda resolvers check permissions and write to DynamoDB and S3; an EventBridge cleanup job and an SES to PostHog email telemetry chain run in the background; Sentry and PostHog observe every environment',
      tiers: [
        [
          { kind: 'Client · Web', title: 'TanStack Start', note: 'Per-tenant subdomains' },
          { kind: 'Client · Mobile', title: 'Expo / React Native', note: 'iOS + Android' },
          { kind: 'Client · Public', title: 'Share pages', note: 'Restricted media links unlocked by email OTP' },
        ],
        [
          {
            kind: 'API',
            title: 'AWS AppSync',
            note: 'Group-based @auth on reads · none data source for pushed updates · API key for share pages',
            tone: 'primary',
          },
          {
            kind: 'Auth',
            title: 'Cognito · 4 Lambda triggers',
            note: 'Pre-sign-up, post-confirmation and pre-auth gate tenant and subdomain · pre-token v2 injects permission IDs',
            tone: 'highlight',
          },
        ],
        { kind: 'Compute', title: 'Lambda resolvers', note: 'Permission check on every mutation' },
        [
          { kind: 'Data', title: 'DynamoDB' },
          { kind: 'Files', title: 'S3', note: 'Bulk exports via presigned URLs' },
        ],
        [
          { kind: 'Scheduled', title: 'EventBridge → cleanup λ', note: 'Daily retention and soft-delete purge' },
          { kind: 'Email telemetry', title: 'SES → SNS → λ', note: 'Delivery events into PostHog' },
        ],
      ],
      connectors: ['GraphQL queries + mutations ↓ · subscriptions ↑', 'mutations + JWT claims', null, 'background jobs'],
      footer: { label: 'Observability', value: 'Sentry (web + backend errors) · PostHog (one project per environment)' },
    },
  },
  decisions: {
    intro: 'Short decision records: what I chose, and what it cost.',
    items: [],
  },
  running: [
    {
      label: 'Environments',
      body: 'Sandbox, dev, stage and prod. Sentry picks up every branch on deploy; PostHog has a project per environment, with dev collecting every feature branch.',
    },
    { label: 'Testing', body: 'CI runs unit and integration stages; integration tests sign in through a dedicated Cognito app client and exercise the deployed API.' },
    { label: 'Sharing', body: 'Restricted media share links, unlocked with a one-time password sent by email.' },
    { label: 'Compliance', body: 'In-app account deletion built to App Store and Google Play requirements.' },
  ],
  next: ['[Launch milestone and date, first customers or pilot, the next technical problem you’re working on.]'],
  navBand: {
    back: 'Back to all work',
    cta: 'Want the deep dive? Let’s talk ↗',
  },
  footerLabel: 'Case study 01 / SkyVault',
};

