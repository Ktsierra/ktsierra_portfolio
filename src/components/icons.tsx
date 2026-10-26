import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

const Icon = ({ size = 16, children, ...rest }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
    {...rest}
  >
    {children}
  </svg>
);

export const ArrowDown = (props: IconProps) => (
  <Icon {...props}><path d="M12 5v14" /><path d="M6 13l6 6 6-6" /></Icon>
);

export const ArrowRight = (props: IconProps) => (
  <Icon {...props}><path d="M5 12h14" /><path d="M13 6l6 6-6 6" /></Icon>
);

export const ArrowLeft = (props: IconProps) => (
  <Icon {...props}><path d="M19 12H5" /><path d="M11 6l-6 6 6 6" /></Icon>
);

export const ArrowUpRight = (props: IconProps) => (
  <Icon size={13} {...props}><path d="M7 17L17 7" /><path d="M8 7h9v9" /></Icon>
);

export const Download = (props: IconProps) => (
  <Icon {...props}><path d="M12 4v11" /><path d="M7 10l5 5 5-5" /><path d="M5 20h14" /></Icon>
);

export const MenuIcon = (props: IconProps) => (
  <Icon {...props}><path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" /></Icon>
);

export const CloseIcon = (props: IconProps) => (
  <Icon {...props}><path d="M6 6l12 12" /><path d="M18 6L6 18" /></Icon>
);
