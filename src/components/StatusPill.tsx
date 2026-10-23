interface Props {
  label: string;
}

const StatusPill = ({ label }: Props) => (
  <p className="m-0 inline-flex items-center gap-2.5 self-start rounded-pill border border-ink bg-paper px-3.5 py-2 font-mono text-xs tracking-[0.06em] uppercase">
    <span
      aria-hidden="true"
      className="size-2 shrink-0 rounded-full bg-signal shadow-[0_0_0_3px_var(--color-paper),0_0_0_4px_var(--color-signal)]"
    />
    {label}
  </p>
);

export default StatusPill;
