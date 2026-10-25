/*
 * All copy, links and data for the site live here (and in the case-study files).
 * Components never hard-code text.
 *
 * TODO: open items (numbers refer to QUESTIONS.md in the redesign handoff).
 *
 *   case study         Q10 to Q15  problem, decisions, "what's next": see src/content/skyvault.ts
 *   media              Q16         SkyVault screenshot (after the getskyvault.app landing page ships)
 *                      Q17         NovaEdge capture loop
 *   résumé             Q3          public/Jose-Sierra-Resume.pdf may need updating
 */

import type {
  Capability,
  ExperienceItem,
  FeaturedProject,
  Link,
  PlateRow,
  ProjectCardData,
  ProjectRowData,
  SectionMeta,
  SystemsCell,
  Testimonial,
  ToolkitGroup,
} from './types';

const EMAIL = 'jose.sierra@novaedgetechnology.com';
const LINKEDIN_URL = 'https://www.linkedin.com/in/jose-javier-sierra-delgado-5a8249246/';
const RESUME_PDF_URL = `${import.meta.env.BASE_URL}Jose-Sierra-Resume.pdf`;
const CREDLY_URL = 'https://www.credly.com/badges/88872f87-eb31-42ce-87cb-f0d46b991463';
const GITHUB_URL = 'https://github.com/Ktsierra';
const OSS_PR_URL = 'https://github.com/aws-amplify/amplify-data/pull/671';

export const site = {
  owner: 'Jose Sierra',
  base: 'South Florida',
  url: 'https://ktsierra.github.io/ktsierra_portfolio/',
  title: 'Jose Sierra | Software Engineer (Full-stack, Cloud, Network, DevOps)',
  description:
    'Full-stack and cloud engineer in South Florida. I design multi-tenant AWS backends, ship React and React Native front ends, and run the network and production infrastructure of a 100-person aviation maintenance company.',

  links: {
    email: EMAIL,
    mailto: `mailto:${EMAIL}`,
    linkedin: LINKEDIN_URL,
    github: GITHUB_URL,
    githubLabel: 'github.com/Ktsierra',
    resume: RESUME_PDF_URL,
    credly: CREDLY_URL,
  },

  status: {
    visible: true,
    label: 'Open to software, cloud, network & DevOps roles',
  },

  header: {
    mark: 'JS',
    tagline: 'Software · Cloud · Network',
    nav: [
      { label: 'Work', href: '#work' },
      { label: 'Systems', href: '#systems' },
      { label: 'Experience', href: '#experience' },
      { label: 'About', href: '#about' },
    ] satisfies Link[],
    resumeLabel: 'Résumé',
    menuLabel: 'Menu',
    closeLabel: 'Close',
    skipLink: 'Skip to content',
  },

  hero: {
    titleBefore: 'I build software, and the ',
    titleHighlight: 'systems',
    titleAfter: ' it runs on.',
    primaryCta: { label: 'See selected work', href: '#work' } satisfies Link,
    secondaryCta: { label: 'Email me', href: `mailto:${EMAIL}` } satisfies Link,
    socials: [
      { label: 'github.com/Ktsierra', href: GITHUB_URL },
      { label: 'LinkedIn', href: LINKEDIN_URL },
    ] satisfies Link[],
  },

  plate: {
    ariaLabel: 'At a glance',
    title: 'Ident plate',
    partNumber: 'P/N JS-SWE-01',
    serial: 'S/N KTSIERRA · Rev 2026',
    rows: [
      { label: 'Name', value: 'Jose Sierra', strong: true },
      { label: 'Role', value: 'Full-stack, cloud, network & DevOps engineer' },
      { label: 'Stack', value: 'TypeScript · React / React Native · AWS serverless' },
      { label: 'Base', value: 'South Florida · remote, on-site or relocation' },
      { label: 'Cert', value: 'AWS Certified Cloud Practitioner' },
      { label: 'Edu', value: 'B.S. Telecommunications & Electronics Eng.' },
      { label: 'OSS', value: 'aws-amplify/amplify-data #671', href: OSS_PR_URL, suffix: ' · merged' },
    ] satisfies PlateRow[],
  },

  capabilities: {
    ariaLabel: 'What I do',
    items: [
      { id: 'A', title: 'Product engineering', body: 'Multi-tenant SaaS, from schema design to the app stores.' },
      { id: 'B', title: 'Cloud & serverless', body: 'AppSync, Lambda, DynamoDB, Cognito and S3: designed, secured, observed.' },
      { id: 'C', title: 'Operations', body: 'Identity, devices, network and monitoring for ~100 people.' },
      { id: 'D', title: 'Close to the metal', body: 'Telecom networks, avionics test programs, signal processing.' },
    ] satisfies Capability[],
  },

  sectionCount: 5,

  work: {
    section: { id: 'work', number: '01', label: 'Selected work' } satisfies SectionMeta,
    title: 'Things I designed, built and still operate.',
    featured: {
      id: 'skyvault',
      tags: [{ label: '01 · Featured', strong: true }, { label: 'SaaS · pre-launch' }, { label: 'Solo build' }],
      title: 'SkyVault',
      summary:
        'Multi-tenant inventory and operations platform for aviation MRO shops. Web, iOS and Android, end-to-end TypeScript on AWS.',
      points: [
        {
          id: '1.1',
          title: 'Permissions in the token.',
          body: 'A Cognito pre-token-generation (v2) Lambda injects permission IDs into access tokens; Lambda resolvers enforce them on every mutation.',
        },
        {
          id: '1.2',
          title: 'Realtime from anywhere.',
          body: 'Lambda-driven DynamoDB writes reach clients as AppSync subscriptions through a ',
          code: 'none',
          bodyAfter: ' data source.',
        },
        {
          id: '1.3',
          title: 'Exports that don’t time out.',
          body: 'Presigned S3 URLs stream tenant data straight to disk via the File System Access API.',
        },
      ],
      stack: ['Amplify Gen 2', 'AppSync', 'Cognito', 'Lambda', 'DynamoDB', 'TanStack Start', 'Expo', 'Sentry', 'PostHog'],
      cta: { label: 'Read the case study', href: '/work/skyvault' },
      note: 'getskyvault.app · pre-launch',
      diagram: {
        figure: 'Fig. 1 · Architecture',
        meta: 'Simplified',
        ariaLabel:
          'SkyVault architecture diagram: web, mobile and public share-link clients call AWS AppSync, authenticated by Cognito with four Lambda triggers; Lambda resolvers check permissions and write to DynamoDB and S3; a scheduled cleanup job and email telemetry run in the background; Sentry and PostHog observe every environment',
        tiers: [
          [
            { kind: 'Client', title: 'Web · TanStack Start' },
            { kind: 'Client', title: 'iOS + Android · Expo' },
            { kind: 'Public', title: 'Share links · email OTP' },
          ],
          [
            { kind: 'API', title: 'AWS AppSync', tone: 'primary' },
            { kind: 'Auth', title: 'Cognito + 4 λ triggers', tone: 'highlight' },
          ],
          { kind: 'Compute', title: 'Lambda resolvers · permission checks' },
          [
            { kind: 'Data', title: 'DynamoDB' },
            { kind: 'Files', title: 'S3 · presigned exports' },
          ],
          [
            { kind: 'Scheduled', title: 'EventBridge · daily cleanup' },
            { kind: 'Telemetry', title: 'SES → SNS → PostHog' },
          ],
        ],
        connectors: ['GraphQL ↓ · subscriptions ↑', 'mutations + JWT claims', null, 'background jobs'],
        peerTiers: [1],
        footer: { label: 'Observability', value: 'Sentry · PostHog · per environment' },
      },
    } satisfies FeaturedProject,
    cards: [
      {
        id: 'novaedge',
        number: '02',
        kicker: 'Company site · NovaEdge',
        tech: 'Three.js · R3F',
        title: 'NovaEdge Technology site',
        body: 'A galaxy that flies down to wherever the visitor is. The globe shows real day and night, the moon sits where it actually is, and the sky over the city follows the visitor’s local time. Adaptive resolution and a weak-GPU fallback keep it smooth on phones.',
        media: {
          width: 1280,
          height: 720,
          placeholderTitle: '[NovaEdge capture]',
          placeholderBody: '6 to 8s muted loop, galaxy to globe to city (poster frame as fallback)',
        },
        pipeline: {
          ariaLabel: 'Scene flow: galaxy, then globe with real day and night, then the visitor’s location, then a local sky over a night city',
          steps: ['Galaxy', 'Globe · day/night', 'Your location', 'Local sky + city'],
        },
        links: [
          { label: 'novaedgetechnology.com', href: 'https://novaedgetechnology.com' },
          { label: 'Source', href: 'https://github.com/Ktsierra/novaedgetech_web' },
        ],
      },
      {
        id: 'avionics',
        number: '03',
        kicker: 'Avionics · JJA Aviation',
        tech: 'C · LabWindows/CVI',
        title: 'Automated avionics test programs',
        body: 'Test procedure sets that drive automated testing of aircraft units on IRIS 2000 test equipment: LabWindows/CVI programs on the Thor test executive, speaking ARINC 429 to each unit through a test adapter.',
        pipeline: {
          ariaLabel: 'Signal path: Thor test executive to test program to ARINC 429 bus to test unit adapter to unit under test',
          steps: ['Thor executive', 'TPS', 'ARINC 429', 'Test adapter', 'Unit under test'],
        },
        note: 'Proprietary · details on request',
      },
    ] satisfies ProjectCardData[],
    alsoTitle: 'Also',
    also: [
      {
        number: '04',
        title: 'Open source · amplify-data',
        body: 'Merged contribution to the library behind Amplify Gen 2’s typed data layer.',
        link: { label: 'PR #671', href: OSS_PR_URL },
      },
      {
        number: '05',
        title: 'Document archive & search',
        body: 'JJA’s file server, searchable from anywhere. NAS to S3, a Lambda indexer into DynamoDB, React behind Entra ID sign-in.',
        note: 'Internal',
      },
      {
        number: '06',
        title: 'Infrastructure docs',
        body: 'Authenticated runbook site for JJA’s network, systems and security. Docusaurus on Firebase.',
        note: 'Internal',
      },
    ] satisfies ProjectRowData[],
  },

  systems: {
    section: { id: 'systems', number: '02', label: 'Systems I run' } satisfies SectionMeta,
    title: 'Production, used by real people every morning.',
    intro:
      'Since 2023 I’ve owned the infrastructure of JJA Aviation, a ~100-person aircraft maintenance company. If it has an IP address or a login, it’s mine, including the Information Security Manual our airline customers audit against.',
    cells: [
      { title: 'Identity & devices', body: 'Microsoft Entra ID, Intune MDM, Defender. Locked-down Windows and Android kiosks.' },
      { title: 'Network', body: 'UniFi and Ubiquiti EdgeRouter / EdgeSwitch, site VPN, Tailscale for remote access.' },
      { title: 'Observability', body: 'Grafana, Prometheus, Telegraf, InfluxDB. ELK over Squid proxy logs for security analysis.' },
      { title: 'Self-hosted services', body: 'Dockerized osTicket, MeshCentral and CUPS, plus the internal apps in Selected work.' },
      { title: 'Voice', body: 'Cloud 3CX phone system with Microsoft single sign-on.' },
      { title: 'Mail & storage', body: 'SPF, DKIM and DMARC with Defender anti-phishing. Synology NAS with offsite cloud backup.' },
    ] satisfies SystemsCell[],
  },

  experience: {
    section: { id: 'experience', number: '03', label: 'Experience' } satisfies SectionMeta,
    title: 'From fiber in the ground to code in the cloud.',
    items: [
      {
        dates: '2023 → Now',
        role: 'IT Manager',
        org: 'JJA Aviation · South Florida',
        points: [
          'Own identity, endpoints, network, voice and monitoring for ~100 staff across shop floor and office.',
          'Build internal software: an AWS serverless document archive, a React Native shop-floor records and photo app, and an infrastructure docs site.',
          'Write automated avionics test programs for IRIS 2000 test equipment.',
        ],
      },
      {
        dates: '2025 → Now',
        role: 'Founder & Engineer',
        org: 'NovaEdge Tech Corp · Florida',
        points: ['One-person software company. Building SkyVault, a multi-tenant SaaS for aviation MRO, end to end.'],
      },
      {
        dates: '2022 → 2023',
        role: 'Telecom Engineer',
        org: 'ETECSA · Matanzas, Cuba',
        points: [
          'Led a 10-person team on optical fiber distribution and installation.',
          'Deployed Nokia and Huawei mobile infrastructure and GPON across the province; installed VSAT terminals at hard-to-reach sites.',
        ],
      },
      {
        dates: '2021 → 2023',
        role: 'Software Developer',
        org: 'Cuban Neuroscience Center (CNEURO) · Havana',
        points: [
          'Python applications analyzing mobility and balance in senior populations.',
          'Machine learning models forecasting gait speed for health-outcome research.',
        ],
      },
    ] satisfies ExperienceItem[],
    education: {
      label: 'Education',
      title: 'B.S. Telecommunications & Electronics Engineering',
      detail: 'Technological University of Havana (CUJAE) · 2022',
    },
    certification: {
      label: 'Certification',
      title: 'AWS Certified Cloud Practitioner',
      link: { label: 'Verify credential', href: CREDLY_URL } satisfies Link,
    },
  },

  toolkit: {
    section: { number: '04', label: 'Toolkit' } satisfies SectionMeta,
    groups: [
      { title: 'Languages', items: ['TypeScript', 'JavaScript', 'Python', 'C (LabWindows/CVI)', 'SQL'] },
      { title: 'Front end', items: ['React', 'React Native · Expo', 'TanStack Start', 'Tailwind CSS', 'Three.js'] },
      { title: 'Cloud', items: ['AWS Amplify Gen 2 · CDK', 'AppSync · API Gateway', 'Lambda · DynamoDB · S3', 'Cognito', 'Firebase · Vercel'] },
      { title: 'Ops & tooling', items: ['Docker · Kubernetes', 'Grafana · Prometheus', 'ELK · Sentry · PostHog', 'Linux · Git', 'Microsoft 365 · Intune'] },
    ] satisfies ToolkitGroup[],
  },

  about: {
    section: { id: 'about', number: '05', label: 'About' } satisfies SectionMeta,
    title: 'Engineer by training, builder by habit.',
    paragraphs: [
      'I started in telecom, pulling fiber and lighting up cell sites, and in research, writing Python for gait-analysis models. Today I write TypeScript across the stack and run the infrastructure of an aviation maintenance company, so the code I ship gets used on a shop floor the next morning.',
      'I’m looking for a software team (product, cloud, network or DevOps engineering) where owning both the code and how it runs is the job, not a side quest.',
    ],
    testimonial: {
      quote:
        'He demonstrated mastery of Python programming while implementing and validating an artificial neural network, and successfully developed a wireless system for human gait analysis incorporating signal processing techniques.',
      name: 'Fidel Montero',
      href: 'https://www.linkedin.com/in/fidel-hernandez-25b7b370/',
      title: 'Vice Dean, Faculty of Telecommunications · CUJAE',
    } satisfies Testimonial,
  },

  contact: {
    id: 'contact',
    label: 'Contact',
    title: 'Let’s build something that stays up.',
    links: [
      { label: 'LinkedIn ↗', href: LINKEDIN_URL },
      { label: 'GitHub ↗', href: GITHUB_URL },
      { label: 'Résumé (PDF) ↓', href: RESUME_PDF_URL },
    ] satisfies Link[],
  },

  footer: {
    place: 'South Florida',
    colophon: 'Set in Archivo & JetBrains Mono',
    backToTop: 'Back to top ↑',
  },

  notFound: {
    pageTitle: 'Not found | Jose Sierra',
    label: 'Error 404',
    title: 'This page isn’t on the plate.',
    body: 'The link may be old, or the page moved.',
    cta: 'Back to the home page',
  },
};

export type Site = typeof site;
