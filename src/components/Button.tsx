import type { ReactNode } from 'react';
import SmartLink from './SmartLink';

interface Props {
  href: string;
  variant?: 'primary' | 'secondary';
  /** Height and type size; matches the design's three button sizes */
  size?: 'md' | 'lg' | 'xl';
  className?: string;
  children: ReactNode;
}

const sizes = {
  md: 'min-h-12 px-5 text-[15px]',
  lg: 'min-h-[52px] px-6 text-base',
  xl: 'min-h-14 px-6 text-[17px] gap-3',
};

const Button = ({ href, variant = 'primary', size = 'lg', className = '', children }: Props) => (
  <SmartLink href={href} className={`btn btn-${variant} ${sizes[size]} ${className}`}>
    {children}
  </SmartLink>
);

export default Button;
