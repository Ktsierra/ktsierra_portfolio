import type { ElementType, ReactNode } from 'react';
import { useInView } from '../hooks/useInView';

interface Props {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}

/** Rises and fades its direct children in, staggered, the first time it enters the viewport */
const Reveal = ({ as: Tag = 'div', className = '', children }: Props) => {
  const [ref, inView] = useInView<HTMLElement>();
  return (
    <Tag ref={ref} className={`reveal ${inView ? 'is-in' : ''} ${className}`}>
      {children}
    </Tag>
  );
};

export default Reveal;
