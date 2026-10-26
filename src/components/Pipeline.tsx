import type { PipelineData } from '../content/types';

/** Inline chip → chip flow; the last step is inverted */
const Pipeline = ({ data }: { data: PipelineData }) => (
  <div role="img" aria-label={data.ariaLabel} className="flex flex-wrap items-center gap-2 bg-panel p-4 font-mono text-xs">
    {data.steps.map((step, i) => {
      const last = i === data.steps.length - 1;
      return (
        <span key={step} className="contents">
          <span className={`border border-ink px-[9px] py-[5px] ${last ? 'bg-ink text-paper' : 'bg-paper'}`}>{step}</span>
          {!last && <span aria-hidden="true" className="text-muted">→</span>}
        </span>
      );
    })}
  </div>
);

export default Pipeline;
