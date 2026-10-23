import { site } from '../content/site';
import { HeroText } from './Hero';
import IdentPlate from './IdentPlate';
import JsExhibit from './exhibit/JsExhibit';

/** Branch B hero: the <JS/> exhibit with the ident plate hanging off its lower-left corner */
const HeroExhibit = () => (
  <section aria-labelledby="hero-title" className="dot-grid border-b-[1.5px] border-ink">
    <div className="wrap grid grid-cols-[repeat(auto-fit,minmax(min(460px,100%),1fr))] items-center gap-[clamp(48px,5vw,72px)] pt-[clamp(56px,8vw,112px)] pb-[clamp(64px,8vw,112px)]">
      <HeroText />
      <div className="flex min-w-0 flex-col items-stretch">
        <JsExhibit />
        <IdentPlate
          rows={site.exhibit.plateRows}
          variant="tag"
          className="plate-in relative z-10 -mt-[clamp(56px,8vw,120px)] w-[min(420px,92%)]"
        />
      </div>
    </div>
  </section>
);

export default HeroExhibit;
