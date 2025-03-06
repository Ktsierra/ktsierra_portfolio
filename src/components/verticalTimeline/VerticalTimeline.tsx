import { useEffect } from 'react';
import classNames from 'classnames';
import './VerticalTimeline.css';

type LayoutType = '1-column-left' | '1-column' | '2-columns' | '1-column-right';

interface VerticalTimelineProps {
  animate?: boolean;
  className?: string;
  layout?: LayoutType;
  lineColor?: string;
  children?: React.ReactNode;
}

const VerticalTimeline: React.FC<VerticalTimelineProps> = ({
  animate = true,
  className = '',
  layout = '2-columns',
  lineColor = '#FFF',
  children,
} : VerticalTimelineProps) => {

  useEffect(() => {
    document.documentElement.style.setProperty('--line-color', lineColor);
  }, [lineColor]);

  return (
    <div
      className={classNames(className, 'vertical-timeline', {
        'vertical-timeline--animate': animate,
        'vertical-timeline--two-columns': layout === '2-columns',
        'vertical-timeline--one-column-left':
          layout === '1-column' || layout === '1-column-left',
        'vertical-timeline--one-column-right': layout === '1-column-right',
      })}
    >
      {children}
    </div>
  );
};

export default VerticalTimeline;