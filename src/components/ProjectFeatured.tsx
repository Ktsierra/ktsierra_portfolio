import type { FeaturedProject } from '../content/types';
import ArchDiagram from './ArchDiagram';
import Button from './Button';
import Chip from './Chip';
import { ArrowRight } from './icons';

const ProjectFeatured = ({ project }: { project: FeaturedProject }) => {
  const titleId = `${project.id}-title`;
  return (
    <article
      aria-labelledby={titleId}
      className="grid grid-cols-[repeat(auto-fit,minmax(min(500px,100%),1fr))] border-[1.5px] border-ink bg-paper"
    >
      <div className="flex min-w-0 flex-col gap-[22px] p-[clamp(24px,3.4vw,48px)]">
        <div className="flex flex-wrap gap-2 font-mono text-[11px] tracking-[0.08em] uppercase">
          {project.tags.map((t) => <Chip key={t.label} variant={t.strong ? 'strong' : 'tag'}>{t.label}</Chip>)}
        </div>
        <h3 id={titleId} className="m-0 text-[clamp(36px,4vw,56px)] leading-none font-extrabold tracking-[-0.02em] [font-stretch:118%]">
          {project.title}
        </h3>
        <p className="m-0 text-lg leading-[1.55] text-pretty text-ink-2">{project.summary}</p>
        <ol className="m-0 flex list-none flex-col gap-3.5 p-0">
          {project.points.map((p) => (
            <li key={p.id} className="flex gap-3.5 text-[15px] leading-[1.55]">
              <span className="flex-none pt-0.5 font-mono text-xs text-signal-ink">{p.id}</span>
              <span>
                <strong>{p.title}</strong> {p.body}
                {p.code && <code className="bg-panel px-[5px] py-px font-mono text-[13px]">{p.code}</code>}
                {p.bodyAfter}
              </span>
            </li>
          ))}
        </ol>
        <ul aria-label="Stack" className="m-0 flex list-none flex-wrap gap-1.5 p-0 font-mono text-xs text-ink-2">
          {project.stack.map((s) => <Chip key={s} variant="stack">{s}</Chip>)}
        </ul>
        <div className="mt-auto flex flex-wrap items-center gap-3 pt-2">
          <Button href={project.cta.href} size="md">
            {project.cta.label}
            <ArrowRight />
          </Button>
          <span className="font-mono text-xs text-muted">{project.note}</span>
        </div>
      </div>
      <ArchDiagram data={project.diagram} />
    </article>
  );
};

export default ProjectFeatured;
