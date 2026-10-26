import type { ProjectCardData } from '../content/types';
import LoopVideo from './LoopVideo';
import Pipeline from './Pipeline';
import { ArrowUpRight } from './icons';

const ProjectCard = ({ project }: { project: ProjectCardData }) => {
  const titleId = `${project.id}-title`;
  return (
    <article aria-labelledby={titleId} className="flex min-w-0 flex-col gap-[18px] border-[1.5px] border-ink p-[clamp(24px,3vw,40px)]">
      <div className="flex justify-between gap-3 font-mono text-[11px] tracking-[0.08em] text-muted uppercase">
        <span><span className="text-signal-ink">{project.number}</span> · {project.kicker}</span>
        <span className="text-right">{project.tech}</span>
      </div>
      {project.media && <LoopVideo media={project.media} />}
      <h3 id={titleId} className="m-0 text-[clamp(26px,2.6vw,34px)] leading-[1.08] font-extrabold tracking-[-0.015em] [font-stretch:115%]">
        {project.title}
      </h3>
      <p className="m-0 text-base leading-[1.6] text-pretty text-ink-2">{project.body}</p>
      <Pipeline data={project.pipeline} />
      {project.links && (
        <div className="mt-auto flex flex-wrap gap-x-5 gap-y-1 pt-1">
          {project.links.map((l) => (
            <a key={l.href} href={l.href} className="link inline-flex min-h-11 items-center gap-1.5 font-mono text-[13px]">
              {l.label}
              <ArrowUpRight />
            </a>
          ))}
        </div>
      )}
      {project.note && <p className="m-0 mt-auto pt-1 font-mono text-xs text-muted">{project.note}</p>}
    </article>
  );
};

export default ProjectCard;
