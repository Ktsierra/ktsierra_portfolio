import type { ReactNode } from 'react';
import { site } from '../content/site';
import ExperienceRow from '../components/ExperienceRow';
import Hero from '../components/Hero';
import ProjectCard from '../components/ProjectCard';
import ProjectFeatured from '../components/ProjectFeatured';
import ProjectRow from '../components/ProjectRow';
import ContactForm from '../components/ContactForm';
import { emailjsEnabled } from '../lib/emailjs';
import Reveal from '../components/Reveal';
import SectionHeader from '../components/SectionHeader';
import { ArrowRight } from '../components/icons';

interface Props {
  /** The hero is the only part that differs between the two variants */
  hero?: ReactNode;
}

const Capabilities = () => (
  <section aria-label={site.capabilities.ariaLabel} className="border-b-[1.5px] border-ink">
    <div className="wrap">
      <ul className="hairline-grid m-0 list-none grid-cols-[repeat(auto-fit,minmax(min(250px,100%),1fr))] border-y-0 p-0">
        {site.capabilities.items.map((c) => (
          <li key={c.id} className="flex flex-col gap-2 px-6 py-7">
            <span className="font-mono text-xs tracking-[0.06em] text-signal-ink">{c.id}</span>
            <span className="text-[19px] font-bold [font-stretch:110%]">{c.title}</span>
            <span className="text-[15px] leading-[1.5] text-muted">{c.body}</span>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

const Work = () => {
  const { work } = site;
  return (
    <section id={work.section.id} aria-labelledby="work-title" className="pt-[clamp(72px,9vw,128px)] pb-[clamp(72px,8vw,112px)]">
      <div className="wrap flex flex-col gap-12">
        <Reveal className="flex flex-col gap-5">
          <SectionHeader section={work.section} />
          <h2 id="work-title" className="h2 max-w-[16em]">{work.title}</h2>
        </Reveal>

        <Reveal><ProjectFeatured project={work.featured} /></Reveal>

        <Reveal className="grid grid-cols-[repeat(auto-fit,minmax(min(440px,100%),1fr))] gap-6">
          {work.cards.map((c) => <ProjectCard key={c.id} project={c} />)}
        </Reveal>

        <div className="flex flex-col">
          <h3 className="label m-0 mb-2 font-medium text-muted">{work.alsoTitle}</h3>
          <ul className="m-0 list-none border-t-[1.5px] border-ink p-0">
            {work.also.map((r) => <ProjectRow key={r.number} row={r} />)}
          </ul>
        </div>
      </div>
    </section>
  );
};

const Systems = () => {
  const { systems } = site;
  return (
    <section id={systems.section.id} aria-labelledby="sys-title" className="section-y bg-ink text-on-dark">
      <div className="wrap flex flex-col gap-12">
        <Reveal className="flex flex-col gap-5">
          <SectionHeader section={systems.section} dark />
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(440px,100%),1fr))] items-end gap-x-16 gap-y-6">
            <h2 id="sys-title" className="h2">{systems.title}</h2>
            <p className="m-0 text-[17px] leading-[1.6] text-pretty text-on-dark-2">{systems.intro}</p>
          </div>
        </Reveal>
        <ul className="m-0 grid list-none grid-cols-[repeat(auto-fit,minmax(min(320px,100%),1fr))] gap-px border border-line-1 bg-line-1 p-0">
          {systems.cells.map((c) => (
            <li key={c.title} className="flex flex-col gap-3.5 bg-ink p-7">
              <span className="label-sm text-signal">{c.title}</span>
              <span className="text-base leading-[1.7]">{c.body}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

const Experience = () => {
  const { experience } = site;
  const { education, certification } = experience;
  return (
    <section id={experience.section.id} aria-labelledby="exp-title" className="section-y">
      <div className="wrap flex flex-col gap-12">
        <Reveal className="flex flex-col gap-5">
          <SectionHeader section={experience.section} />
          <h2 id="exp-title" className="h2 max-w-[16em]">{experience.title}</h2>
        </Reveal>
        <ol className="m-0 list-none p-0">
          {experience.items.map((item, i) => (
            <ExperienceRow key={item.role} item={item} first={i === 0} last={i === experience.items.length - 1} />
          ))}
        </ol>
        <div className="hairline-grid grid-cols-[repeat(auto-fit,minmax(min(280px,100%),1fr))]">
          <div className="flex flex-col gap-1.5 p-6">
            <span className="label-sm text-muted">{education.label}</span>
            <span className="text-[17px] font-semibold">{education.title}</span>
            <span className="text-[15px] text-muted">{education.detail}</span>
          </div>
          <div className="flex flex-col gap-1.5 p-6">
            <span className="label-sm text-muted">{certification.label}</span>
            <span className="text-[17px] font-semibold">{certification.title}</span>
            <a href={certification.link.href} className="link inline-flex min-h-11 items-center self-start text-[15px] underline-offset-[3px]">
              {certification.link.label}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

const Toolkit = () => {
  const { toolkit } = site;
  return (
    <section aria-labelledby="tools-title" className="pb-[clamp(72px,9vw,128px)]">
      <div className="wrap flex flex-col gap-8">
        <SectionHeader section={toolkit.section} headingId="tools-title" />
        <div className="hairline-grid grid-cols-[repeat(auto-fit,minmax(min(220px,100%),1fr))]">
          {toolkit.groups.map((g) => (
            <div key={g.title} className="flex flex-col gap-3 p-6">
              <h3 className="label-sm m-0 font-medium text-signal-ink">{g.title}</h3>
              <ul className="m-0 list-none p-0 text-base leading-[1.75]">
                {g.items.map((it) => <li key={it}>{it}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const About = () => {
  const { about } = site;
  const t = about.testimonial;
  return (
    <section id={about.section.id} aria-labelledby="about-title" className="section-y border-t-[1.5px] border-ink bg-panel">
      <div className="wrap flex flex-col gap-12">
        <SectionHeader section={about.section} />
        <Reveal className="grid grid-cols-[repeat(auto-fit,minmax(min(440px,100%),1fr))] gap-x-[clamp(48px,6vw,96px)] gap-y-12">
          <div className="flex flex-col gap-[22px]">
            <h2 id="about-title" className="m-0 text-[clamp(32px,3.8vw,52px)] leading-[1.04] font-extrabold tracking-[-0.02em] text-balance [font-stretch:115%]">
              {about.title}
            </h2>
            {about.paragraphs.map((p) => (
              <p key={p} className="m-0 text-[17px] leading-[1.65] text-pretty text-ink-2">{p}</p>
            ))}
          </div>
          <figure className="m-0 flex flex-col gap-5 self-start border-[1.5px] border-ink bg-paper p-[clamp(24px,3vw,40px)]">
            <span aria-hidden="true" className="h-10 text-[88px] leading-[0.6] font-extrabold text-signal-ink">“</span>
            <blockquote className="m-0 text-[clamp(19px,1.8vw,23px)] leading-[1.45] font-medium text-pretty">{t.quote}</blockquote>
            <figcaption className="flex flex-col border-t border-rule pt-2">
              {t.href ? (
                <a href={t.href} className="inline-flex min-h-11 items-center self-start text-base font-bold no-underline hover:text-signal-ink">{t.name}</a>
              ) : <span className="text-base font-bold">{t.name}</span>}
              <span className="font-mono text-xs text-muted">{t.title}</span>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
};

const Contact = () => {
  const { contact, links } = site;
  return (
    <section
      id={contact.id}
      aria-labelledby="contact-title"
      className="border-t-[1.5px] border-ink bg-signal pt-[clamp(80px,10vw,144px)] pb-[clamp(56px,6vw,88px)] text-ink"
    >
      {/* Wide screens with the form: headline, email and links on the left, the form beside them.
          Otherwise (phones, or no EmailJS keys) everything stacks as one column. */}
      <Reveal
        className={`wrap grid items-center gap-x-16 gap-y-12 ${
          emailjsEnabled ? 'min-[1000px]:grid-cols-[minmax(0,1fr)_minmax(0,440px)]' : ''
        }`}
      >
        <div className="flex min-w-0 flex-col items-start gap-10">
          <span className="label">{contact.label}</span>
          <h2
            id="contact-title"
            className={`m-0 max-w-[11em] text-[clamp(44px,7.6vw,116px)] leading-[0.96] font-extrabold tracking-[-0.03em] text-balance [font-stretch:118%] ${
              emailjsEnabled ? 'min-[1000px]:text-[clamp(56px,6vw,92px)]' : ''
            }`}
          >
            {contact.title}
          </h2>
          <a
            href={links.mailto}
            className={`inline-flex min-h-16 max-w-full items-center gap-3.5 bg-ink px-7 py-3 text-[clamp(16px,4.2vw,24px)] font-semibold [overflow-wrap:anywhere] text-paper no-underline transition-colors duration-150 hover:bg-paper hover:text-ink max-sm:px-5 ${
              emailjsEnabled ? 'min-[1000px]:text-[clamp(18px,1.7vw,24px)]' : ''
            }`}
          >
            {/* A long address breaks after the @ on narrow phones, not mid-domain */}
            <span>
              {links.email.split('@')[0]}@<wbr />{links.email.split('@')[1]}
            </span>
            <ArrowRight size={22} />
          </a>
          <div className="flex flex-wrap gap-x-8 gap-y-1 font-mono text-sm">
            {contact.links.map((l) => (
              <a key={l.label} href={l.href} className="link link-on-signal inline-flex min-h-11 items-center">{l.label}</a>
            ))}
          </div>
        </div>
        {emailjsEnabled && <ContactForm />}
      </Reveal>
    </section>
  );
};

const Home = ({ hero = <Hero /> }: Props) => (
  <>
    <title>{site.title}</title>
    {hero}
    <Capabilities />
    <Work />
    <Systems />
    <Experience />
    <Toolkit />
    <About />
    <Contact />
  </>
);

export default Home;
