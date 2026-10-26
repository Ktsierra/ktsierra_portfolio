import type { PlateRow } from '../content/types';
import { site } from '../content/site';

interface Props {
  rows?: PlateRow[];
  /** "tag": the smaller variant that hangs off the 3D exhibit (no barcode footer) */
  variant?: 'full' | 'tag';
  className?: string;
}

const Screw = ({ pos, flip }: { pos: string; flip: boolean }) => (
  <span
    aria-hidden="true"
    className={`absolute size-2.5 rounded-full border border-muted ${pos}`}
    style={{
      background: `linear-gradient(${flip ? '-45deg' : '45deg'}, transparent 44%, var(--color-muted) 44%, var(--color-muted) 56%, transparent 56%)`,
    }}
  />
);

const IdentPlate = ({ rows = site.plate.rows, variant = 'full', className = '' }: Props) => {
  const { plate } = site;
  const tag = variant === 'tag';
  const inset = tag ? 'mx-[26px]' : 'mx-[30px]';
  return (
    <aside
      aria-label={plate.ariaLabel}
      className={`relative min-w-0 border-[1.5px] border-ink bg-panel shadow-plate-sm sm:shadow-plate ${className}`}
    >
      <Screw pos="top-2.5 left-2.5" flip={false} />
      <Screw pos="top-2.5 right-2.5" flip />
      <Screw pos="bottom-2.5 left-2.5" flip />
      <Screw pos="bottom-2.5 right-2.5" flip={false} />

      <div className={`${inset} ${tag ? 'mt-[26px] px-3 py-[9px]' : 'mt-[30px] px-3.5 py-2.5'} label-sm flex justify-between gap-3 bg-ink text-paper`}>
        <span>{plate.title}</span>
        <span className="text-signal">{plate.partNumber}</span>
      </div>

      <dl
        className={`m-0 grid ${tag ? 'grid-cols-[64px_minmax(0,1fr)] gap-x-3.5 px-[26px] pt-1 pb-[22px]' : 'grid-cols-[76px_minmax(0,1fr)] gap-x-4 px-[30px] pt-2 pb-1'}`}
      >
        {rows.map((row, i) => {
          const last = i === rows.length - 1;
          const rule = last ? '' : 'border-b border-dashed border-plate-rule';
          return (
            <div key={row.label} className="contents">
              <dt className={`${tag ? 'py-2.5' : 'py-3'} font-mono text-[11px] tracking-[0.08em] text-muted uppercase ${rule}`}>
                {row.label}
              </dt>
              <dd className={`m-0 min-w-0 ${tag ? 'py-2' : 'py-2.5'} ${row.strong ? 'text-base font-semibold' : 'text-[15px]'} ${rule}`}>
                {row.href ? (
                  <a href={row.href} className="link underline-offset-[3px]">{row.value}</a>
                ) : row.value}
                {row.suffix}
              </dd>
            </div>
          );
        })}
      </dl>

      {!tag && (
        <div className="mx-[30px] mb-[30px] flex items-center justify-between gap-4 border-t-[1.5px] border-ink pt-3.5">
          <span
            aria-hidden="true"
            className="h-[26px] max-w-[220px] flex-auto"
            style={{
              background:
                'repeating-linear-gradient(90deg, var(--color-ink) 0 2px, transparent 2px 5px, var(--color-ink) 5px 6px, transparent 6px 9px, var(--color-ink) 9px 12px, transparent 12px 14px)',
            }}
          />
          <span className="font-mono text-[11px] tracking-[0.08em] text-muted uppercase">{plate.serial}</span>
        </div>
      )}
    </aside>
  );
};

export default IdentPlate;
