import type { ReactNode } from 'react';

interface Props {
  /** "tag": uppercase label; "strong": inverted tag; "stack": plain mono chip */
  variant?: 'tag' | 'strong' | 'stack';
  /** Tags sitting on the dot grid get an ink border and paper fill */
  onGrid?: boolean;
  children: ReactNode;
}

const Chip = ({ variant = 'tag', onGrid = false, children }: Props) => {
  if (variant === 'stack') {
    return <li className="border border-rule px-2 py-1">{children}</li>;
  }
  if (variant === 'strong') {
    return <span className="bg-ink px-[9px] py-[5px] text-paper">{children}</span>;
  }
  return (
    <span className={`border px-[9px] py-[5px] ${onGrid ? 'border-ink bg-paper' : 'border-rule'}`}>
      {children}
    </span>
  );
};

export default Chip;
