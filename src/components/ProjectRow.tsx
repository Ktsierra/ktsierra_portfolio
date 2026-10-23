import type { ProjectRowData } from '../content/types';
import { ArrowUpRight } from './icons';

/** "Also" list row */
const ProjectRow = ({ row }: { row: ProjectRowData }) => (
  <li className="flex flex-wrap items-baseline gap-x-6 gap-y-2 border-b border-rule py-[22px]">
    <span className="flex-[0_0_40px] font-mono text-xs text-signal-ink">{row.number}</span>
    <span className="flex-[1_1_240px] text-[19px] font-bold [font-stretch:110%]">{row.title}</span>
    <span className="flex-[2_1_340px] text-[15px] leading-[1.55] text-ink-2">{row.body}</span>
    {row.link ? (
      <a href={row.link.href} className="link inline-flex min-h-11 flex-none items-center gap-1.5 font-mono text-[13px]">
        {row.link.label}
        <ArrowUpRight />
      </a>
    ) : (
      <span className="inline-flex min-h-11 flex-none items-center font-mono text-[13px] text-muted">{row.note}</span>
    )}
  </li>
);

export default ProjectRow;
