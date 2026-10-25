import { useState } from 'react';
import { site } from '../content/site';
import { HeroText } from './Hero';
import IdentPlate from './IdentPlate';
import JsExhibit from './exhibit/JsExhibit';
import type { ExhibitMaterial } from './exhibit/viewer';

const { exhibit } = site;
const ids = exhibit.materialPicker.options.map((o) => o.id) as readonly string[];

/** ?material=graphite (or signal) preselects a look, so a preview link can show one */
const initialMaterial = (): ExhibitMaterial => {
  const fromUrl = new URLSearchParams(window.location.search).get('material');
  return fromUrl && ids.includes(fromUrl) ? (fromUrl as ExhibitMaterial) : exhibit.material;
};

/** Temporary: toggles the live model's material until one is chosen */
const MaterialPicker = ({ value, onChange }: { value: ExhibitMaterial; onChange: (m: ExhibitMaterial) => void }) => (
  <div role="group" aria-label={exhibit.materialPicker.label} className="mt-6 flex flex-wrap items-center justify-end gap-2">
    <span className="label-sm mr-1 text-muted">{exhibit.materialPicker.label}</span>
    {exhibit.materialPicker.options.map((o) => (
      <button
        key={o.id}
        type="button"
        aria-pressed={value === o.id}
        onClick={() => {
          onChange(o.id);
          const url = new URL(window.location.href);
          url.searchParams.set('material', o.id);
          window.history.replaceState(window.history.state, '', url);
        }}
        className={`btn min-h-11 border-[1.5px] border-ink px-3 font-mono text-xs tracking-[0.06em] uppercase ${
          value === o.id ? 'bg-ink text-paper' : 'bg-paper text-ink hover:bg-panel'
        }`}
      >
        {o.label}
      </button>
    ))}
  </div>
);

/** Branch B hero: the <JS/> exhibit with the ident plate hanging off its lower-left corner */
const HeroExhibit = () => {
  const [material, setMaterial] = useState(initialMaterial);
  const [live, setLive] = useState(false);
  return (
    <section aria-labelledby="hero-title" className="dot-grid border-b-[1.5px] border-ink">
      <div className="wrap grid grid-cols-[repeat(auto-fit,minmax(min(460px,100%),1fr))] items-center gap-[clamp(48px,5vw,72px)] pt-[clamp(56px,8vw,112px)] pb-[clamp(64px,8vw,112px)]">
        <HeroText />
        <div className="flex min-w-0 flex-col items-stretch">
          <JsExhibit material={material} onLive={() => { setLive(true); }} />
          <IdentPlate
            rows={exhibit.plateRows}
            variant="tag"
            className="plate-in relative z-10 -mt-[clamp(56px,8vw,120px)] w-[min(420px,92%)]"
          />
          {exhibit.materialPicker.visible && live && <MaterialPicker value={material} onChange={setMaterial} />}
        </div>
      </div>
    </section>
  );
};

export default HeroExhibit;
