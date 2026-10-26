import type { ElementType, HTMLAttributes, ReactNode } from 'react';
import { useInView } from '../hooks/useInView';

interface Props extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}

/** Rises and fades its direct children in, staggered, the first time it enters the viewport */
const Reveal = ({ as: Tag = 'div', className = '', children, ...rest }: Props) => {
  const [ref, inView] = useInView<HTMLElement>();
  return (
    <Tag ref={ref} {...rest} className={`reveal ${inView ? 'is-in' : ''} ${className}`}>
      {children}
    </Tag>
  );
};

export default Reveal;
