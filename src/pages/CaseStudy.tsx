import type { ReactNode } from 'react';
import { useParams } from 'react-router-dom';
import { caseStudies } from '../content/caseStudies';
import { site } from '../content/site';
import ArchDiagram from '../components/ArchDiagram';
import Button from '../components/Button';
import Chip from '../components/Chip';
import Reveal from '../components/Reveal';
import { ArrowLeft } from '../components/icons';
import NotFound from './NotFound';

const SectionTitle = ({ number, id, children }: { number: string; id: string; children: ReactNode }) => (
  <div className="flex flex-col gap-3 border-t-[1.5px] border-ink pt-3.5">
    <span className="label text-signal-ink">{number}</span>
    <h2 id={id} className="m-0 text-[clamp(28px,3vw,40px)] leading-[1.05] font-extrabold tracking-[-0.02em] [font-stretch:115%]">
      {children}
    </h2>
  </div>
);

// Title in the first third, body in the other two; stacks below 900px
const twoCol = 'grid grid-cols-1 gap-x-16 gap-y-6 min-[900px]:grid-cols-3';
const body = 'min-w-0 min-[900px]:col-span-2';
const prose = 'm-0 text-lg leading-[1.65] text-pretty text-ink-2';

const CaseStudy = () => {
  const { slug = '' } = useParams();
  const cs = caseStudies[slug];
  if (!cs) return <NotFound />;

  const n = (i: number) => String(i).padStart(2, '0');
  let section = 0;
  const showDecisions = cs.decisions.items.length > 0;

  return (
    <>
      <title>{cs.pageTitle}</title>
      <meta name="description" content={cs.description} />

      <section aria-labelledby="cs-title" className="dot-grid border-b-[1.5px] border-ink">
        <div className="wrap flex flex-col gap-7 pt-[clamp(56px,8vw,112px)] pb-[clamp(48px,6vw,80px)]">
          <div className="flex flex-wrap gap-2 font-mono text-[11px] tracking-[0.08em] uppercase">
            {cs.tags.map((t) => <Chip key={t.label} variant={t.strong ? 'strong' : 'tag'} onGrid>{t.label}</Chip>)}
          </div>
          <h1 id="cs-title" className="m-0 text-[clamp(56px,11vw,168px)] leading-[0.9] font-extrabold tracking-[-0.035em] [font-stretch:122%]">
            {cs.title}
          </h1>
          <p className="m-0 max-w-[36em] text-[clamp(18px,1.7vw,22px)] leading-[1.5] text-pretty text-ink-2">{cs.lead}</p>
          <dl className="mt-2 mb-0 grid grid-cols-[repeat(auto-fit,minmax(min(220px,100%),1fr))] gap-px border-[1.5px] border-ink bg-ink">
            {cs.meta.map((m) => (
              <div key={m.label} className="flex flex-col gap-1 bg-paper px-5 py-[18px]">
                <dt className="label-sm text-muted">{m.label}</dt>
                <dd className="m-0 text-base font-semibold">{m.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section aria-label="Product screenshot" className="border-b-[1.5px] border-ink bg-panel">
        <div className="wrap py-[clamp(32px,4vw,56px)]">
          {cs.screenshot ? (
            // The bottom margin (a share of the width, like the phone) leaves room for the phone's overhang
            <div className={cs.screenshot.phone ? 'relative mb-[6%]' : 'relative'}>
              <img
                src={cs.screenshot.src}
                alt={cs.screenshot.alt}
                width={cs.screenshot.width}
                height={cs.screenshot.height}
                className="block h-auto w-full"
              />
              {cs.screenshot.phone && (
                <img
                  src={cs.screenshot.phone.src}
                  alt={cs.screenshot.phone.alt}
                  width={cs.screenshot.phone.width}
                  height={cs.screenshot.phone.height}
                  loading="lazy"
                  className="absolute right-[3%] -bottom-[12%] h-auto w-[18%] drop-shadow-[0_8px_16px_rgb(16_19_23/0.28)]"
                />
              )}
            </div>
          ) : (
            <div className="flex aspect-video flex-col items-center justify-center gap-2 border-[1.5px] border-dashed border-muted bg-paper p-6 text-center font-mono text-muted">
              <span className="text-[13px] tracking-[0.08em] uppercase">{cs.screenshotPlaceholder.title}</span>
              <span className="text-xs">{cs.screenshotPlaceholder.body}</span>
            </div>
          )}
        </div>
      </section>

      <div className="wrap flex flex-col gap-[clamp(64px,8vw,112px)] py-[clamp(64px,8vw,112px)]">
        <Reveal as="section" aria-labelledby="p-title" className={twoCol}>
          <SectionTitle number={n(++section)} id="p-title">The problem</SectionTitle>
          <div className={`${body} flex flex-col gap-4`}>
            {cs.problem.map((p) => <p key={p} className={prose}>{p}</p>)}
          </div>
        </Reveal>

        <section aria-labelledby="a-title" className="flex flex-col gap-8">
          <Reveal className={twoCol}>
            <SectionTitle number={n(++section)} id="a-title">Architecture</SectionTitle>
            <p className={`${body} ${prose}`}>{cs.architecture.intro}</p>
          </Reveal>
          <ArchDiagram data={cs.architecture.diagram} size="large" />
        </section>

        {showDecisions && (
          <section aria-labelledby="d-title" className="flex flex-col gap-8">
            <Reveal className={twoCol}>
              <SectionTitle number={n(++section)} id="d-title">Key decisions</SectionTitle>
              <p className={`${body} ${prose}`}>{cs.decisions.intro}</p>
            </Reveal>
            <ol className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(min(360px,100%),1fr))] gap-px border-[1.5px] border-ink bg-ink p-0">
              {cs.decisions.items.map((d, i) => (
                <li key={d.area} className="flex flex-col gap-3 bg-paper p-7">
                  <span className="label-sm text-signal-ink">DR-{n(i + 1)} · {d.area}</span>
                  <h3 className="m-0 text-[20px] leading-[1.3] font-bold text-pretty [font-stretch:110%]">{d.statement}</h3>
                </li>
              ))}
            </ol>
          </section>
        )}

        <Reveal as="section" aria-labelledby="o-title" className={twoCol}>
          <SectionTitle number={n(++section)} id="o-title">Running it</SectionTitle>
          <ul className={`${body} m-0 list-none border-t-[1.5px] border-ink p-0`}>
            {cs.running.map((r) => (
              <li key={r.label} className="flex flex-wrap gap-x-6 gap-y-1 border-b border-rule py-[18px]">
                <span className="flex-[0_0_160px] pt-[3px] font-mono text-xs tracking-[0.06em] text-muted uppercase">{r.label}</span>
                <span className="flex-[1_1_300px] text-base leading-[1.6]">{r.body}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal as="section" aria-labelledby="n-title" className={twoCol}>
          <SectionTitle number={n(++section)} id="n-title">What’s next</SectionTitle>
          <div className={`${body} flex flex-col gap-4`}>
            {cs.next.map((p) => <p key={p} className={prose}>{p}</p>)}
          </div>
        </Reveal>
      </div>

      <nav aria-label="Case study navigation" className="border-t-[1.5px] border-ink bg-signal">
        <div className="wrap flex flex-wrap items-center justify-between gap-6 py-[clamp(40px,5vw,72px)]">
          <Button href="/" size="xl" className="hover:!bg-paper hover:!text-ink">
            <ArrowLeft size={18} />
            {cs.navBand.back}
          </Button>
          <a
            href={site.links.mailto}
            className="link link-on-signal inline-flex min-h-14 items-center text-[clamp(20px,2.4vw,30px)] font-extrabold [font-stretch:115%] hover:underline-offset-8"
          >
            {cs.navBand.cta}
          </a>
        </div>
      </nav>
    </>
  );
};

export default CaseStudy;
