import type { ExperienceItem } from '../content/types';

interface Props {
  item: ExperienceItem;
  first: boolean;
  last: boolean;
}

const ExperienceRow = ({ item, first, last }: Props) => (
  <li
    className={`flex flex-wrap gap-x-10 gap-y-3 py-8 ${first ? 'border-t-[1.5px] border-ink' : 'border-t border-rule'} ${last ? 'border-b border-b-rule' : ''}`}
  >
    <span className="flex-[0_0_150px] pt-1 font-mono text-[13px] text-ink-2">{item.dates}</span>
    <div className="flex flex-[1_1_260px] flex-col gap-1">
      <h3 className="m-0 text-[22px] leading-[1.2] font-bold [font-stretch:110%]">{item.role}</h3>
      <span className="text-[15px] text-muted">{item.org}</span>
    </div>
    <ul className="m-0 flex flex-[2_1_420px] list-[circle] flex-col gap-2 pl-[18px] text-base leading-[1.55] text-ink-2">
      {item.points.map((p) => <li key={p}>{p}</li>)}
    </ul>
  </li>
);

export default ExperienceRow;
