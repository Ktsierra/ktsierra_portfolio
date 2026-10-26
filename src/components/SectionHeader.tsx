import type { ReactNode } from 'react';
import type { SectionMeta } from '../content/types';
import { site } from '../content/site';

interface Props {
  section: SectionMeta;
  dark?: boolean;
  /** Render the label itself as the section heading (Toolkit does this) */
  headingId?: string;
}

const pad = (n: number) => String(n).padStart(2, '0');

/** "01 · Selected work" + "Sec. 01 / 05" mono rule row */
const SectionHeader = ({ section, dark = false, headingId }: Props) => {
  const label: ReactNode = `${section.number} · ${section.label}`;
  return (
    <div className={`label flex items-baseline justify-between gap-4 border-t-[1.5px] pt-3.5 ${dark ? 'border-on-dark' : 'border-ink'}`}>
      {headingId ? <h2 id={headingId} className="m-0 [font:inherit]">{label}</h2> : <span>{label}</span>}
      <span className={dark ? 'text-muted-dark' : 'text-muted'}>
        Sec. {section.number} / {pad(site.sectionCount)}
      </span>
    </div>
  );
};

export default SectionHeader;
