import { site } from '../content/site';
import Button from './Button';
import IdentPlate from './IdentPlate';
import StatusPill from './StatusPill';
import { ArrowDown, ArrowUpRight } from './icons';

/** Left column of the hero; shared by both hero variants */
export const HeroText = () => {
  const { hero, status, description } = site;
  return (
    <div className="flex min-w-0 flex-col gap-7">
      {status.visible && <StatusPill label={status.label} />}
      <h1
        id="hero-title"
        className="m-0 text-[clamp(42px,7vw,104px)] leading-[0.98] font-extrabold tracking-[-0.025em] text-balance [font-stretch:118%]"
      >
        {hero.titleBefore}
        <span className="hero-highlight">{hero.titleHighlight}</span>
        {hero.titleAfter}
      </h1>
      <p className="m-0 max-w-[34em] text-[clamp(17px,1.5vw,20px)] leading-[1.55] text-pretty text-ink-2">{description}</p>
      <div className="flex flex-wrap gap-3">
        <Button href={hero.primaryCta.href}>
          {hero.primaryCta.label}
          <ArrowDown />
        </Button>
        <Button href={hero.secondaryCta.href} variant="secondary">{hero.secondaryCta.label}</Button>
      </div>
      <div className="flex flex-wrap gap-x-6 gap-y-1 font-mono text-[13px]">
        {hero.socials.map((l) => (
          <a key={l.label} href={l.href} className="link link-soft inline-flex min-h-11 items-center gap-1.5">
            {l.label}
            <ArrowUpRight />
          </a>
        ))}
      </div>
    </div>
  );
};

const Hero = () => (
  <section aria-labelledby="hero-title" className="dot-grid border-b-[1.5px] border-ink">
    <div className="wrap grid grid-cols-[repeat(auto-fit,minmax(min(460px,100%),1fr))] items-center gap-[clamp(40px,5vw,72px)] pt-[clamp(56px,8vw,120px)] pb-[clamp(56px,7vw,104px)]">
      <HeroText />
      <IdentPlate className="plate-in" />
    </div>
  </section>
);

export default Hero;
