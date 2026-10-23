import type { CSSProperties } from 'react';
import type { ArchDiagramData, DiagramNode } from '../content/types';
import { useInView } from '../hooks/useInView';

interface Props {
  data: ArchDiagramData;
  /** "compact": Fig. 1 inside the featured card; "large": Fig. 2 on the case study */
  size?: 'compact' | 'large';
  className?: string;
}

const toneBorder = (tone: DiagramNode['tone']) =>
  tone === 'highlight' ? 'border-signal' : tone === 'primary' ? 'border-on-dark' : 'border-line-2';

const Node = ({ node, large, style, className = '' }: { node: DiagramNode; large: boolean; style?: CSSProperties; className?: string }) => (
  <div
    style={style}
    className={`flex min-w-0 flex-col border bg-node ${toneBorder(node.tone)} ${large ? 'gap-1.5 px-[18px] py-4' : 'gap-1 px-3.5 py-3'} ${className}`}
  >
    <span className={`text-[10px] tracking-[0.1em] uppercase ${node.tone === 'highlight' ? 'text-signal' : 'text-muted-dark'}`}>
      {node.kind}
    </span>
    <span className={`font-sans font-semibold leading-[1.35] ${large ? 'text-lg' : 'text-[15px] max-[399px]:text-sm'}`}>
      {node.title}
    </span>
    {node.note && <span className="text-[11px] leading-[1.5] text-muted-dark">{node.note}</span>}
  </div>
);

/** Dark architecture figure; nodes and connectors come from data so Fig. 1 and Fig. 2 share it */
const ArchDiagram = ({ data, size = 'compact', className = '' }: Props) => {
  const [ref, inView] = useInView<HTMLDivElement>();
  const large = size === 'large';

  return (
    <div
      ref={ref}
      role="img"
      aria-label={data.ariaLabel}
      className={`flex min-w-0 flex-col bg-ink font-mono text-on-dark ${inView ? 'is-in' : ''} ${
        large ? 'border-[1.5px] border-ink p-[clamp(20px,4vw,56px)]' : 'p-[clamp(24px,3vw,40px)]'
      } ${className}`}
    >
      <div className={`label-sm flex justify-between gap-3 text-muted-dark ${large ? 'pb-8' : 'pb-6'}`}>
        <span>{data.figure}</span>
        <span>{data.meta}</span>
      </div>

      {data.tiers.map((tier, i) => {
        const connector = i < data.connectors.length ? data.connectors[i] : undefined;
        const nodes = Array.isArray(tier) ? tier : [tier];
        const peers = !large && (data.peerTiers ?? []).includes(i);

        let row;
        if (nodes.length === 1) {
          row = <Node node={nodes[0]} large={large} />;
        } else if (peers) {
          row = (
            <div className="flex items-stretch">
              {nodes.map((n, j) => (
                <div key={n.title} className="contents">
                  {j > 0 && <div aria-hidden="true" className="flex-[0_0_28px] self-center border-t border-dashed border-line-3 max-[399px]:flex-[0_0_12px]" />}
                  <Node node={n} large={large} className="flex-[1_1_0]" />
                </div>
              ))}
            </div>
          );
        } else if (large && nodes.some((n) => n.tone)) {
          // Fig. 2's API row: wide API node, narrower auth node, wraps on phones
          row = (
            <div className="flex flex-wrap items-stretch gap-4">
              {nodes.map((n, j) => (
                <Node key={n.title} node={n} large className={j === 0 ? 'flex-[2_1_320px]' : 'flex-[1_1_260px]'} />
              ))}
            </div>
          );
        } else {
          row = (
            <div className={large ? 'grid grid-cols-[repeat(auto-fit,minmax(min(240px,100%),1fr))] gap-4' : 'grid grid-cols-2 gap-3'}>
              {nodes.map((n) => <Node key={n.title} node={n} large={large} />)}
            </div>
          );
        }

        const delay = { '--delay': `${String(i * 300)}ms` } as CSSProperties;
        return (
          <div key={i} className="contents">
            {row}
            {connector !== undefined && (
              <div
                className={`flex items-center gap-3 text-muted-dark ${large ? 'pl-7 text-[11px]' : 'pl-6 text-[10px] tracking-[0.06em]'} ${
                  connector === null ? (large ? 'h-10' : 'h-8') : large ? 'h-12' : 'h-10'
                }`}
              >
                <span aria-hidden="true" className="connector h-full w-px shrink-0 bg-line-3" style={delay} />
                {connector && <span>{connector}</span>}
              </div>
            )}
          </div>
        );
      })}

      <div
        className={`flex flex-wrap justify-between gap-x-4 gap-y-1.5 border border-dashed border-line-3 text-muted-dark ${
          large ? 'mt-7 px-[18px] py-3.5 text-xs' : 'mt-5 px-3.5 py-2.5 text-[11px]'
        }`}
      >
        <span className="tracking-[0.1em] uppercase">{data.footer.label}</span>
        <span className="text-on-dark">{data.footer.value}</span>
      </div>
    </div>
  );
};

export default ArchDiagram;
