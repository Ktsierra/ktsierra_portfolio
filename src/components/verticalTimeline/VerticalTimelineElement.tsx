import React from 'react';
import classNames from 'classnames';
import { InView, IntersectionObserverProps } from 'react-intersection-observer';
import './VerticalTimelineElement.css';

type ShadowSize = 'small' | 'medium' | 'large';

interface VerticalTimelineElementProps {
  children?: React.ReactNode;
  className?: string;
  contentArrowStyle?: React.CSSProperties;
  contentStyle?: React.CSSProperties;
  date?: React.ReactNode;
  dateClassName?: string;
  icon?: React.ReactElement;
  iconClassName?: string;
  iconOnClick?: () => void;
  onTimelineElementClick?: () => void;
  iconStyle?: React.CSSProperties;
  id?: string;
  position?: string;
  style?: React.CSSProperties;
  textClassName?: string;
  intersectionObserverProps?: IntersectionObserverProps;
  visible?: boolean;
  shadowSize?: ShadowSize;
}

const VerticalTimelineElement: React.FC<VerticalTimelineElementProps> = ({
  children = '',
  className = '',
  contentArrowStyle = undefined,
  contentStyle = undefined,
  date = '',
  dateClassName = '',
  icon = null,
  iconClassName = '',
  iconOnClick = undefined,
  onTimelineElementClick = undefined,
  iconStyle = undefined,
  id = '',
  position = '',
  style = undefined,
  textClassName = '',
  intersectionObserverProps = {
    rootMargin: '0px 0px -40px 0px',
    triggerOnce: true,
  },
  visible = false,
  shadowSize = 'small',
}) => (
  <InView {...intersectionObserverProps}>
    {({ inView, ref }: { inView: boolean; ref: React.Ref<HTMLDivElement> }) => (
      <div
        ref={ref}
        id={id}
        className={classNames(className, 'vertical-timeline-element', {
          'vertical-timeline-element--left': position === 'left',
          'vertical-timeline-element--right': position === 'right',
          'vertical-timeline-element--no-children': children === '',
        })}
        style={style}
      >
        <>
          <span
            style={iconStyle}
            onClick={iconOnClick}
            className={classNames(
              iconClassName,
              'vertical-timeline-element-icon',
              `shadow-size-${shadowSize}`,
              {
                'bounce-in': inView || visible,
                'is-hidden': !(inView || visible),
              }
            )}
          >
            {icon}
          </span>
          <div
            style={contentStyle}
            onClick={onTimelineElementClick}
            className={classNames(
              textClassName,
              'vertical-timeline-element-content',
              {
                'bounce-in': inView || visible,
                'is-hidden': !(inView || visible),
              }
            )}
          >
            <div
              style={contentArrowStyle}
              className="vertical-timeline-element-content-arrow"
            />
            {children}
            <span
              className={classNames(
                dateClassName,
                'vertical-timeline-element-date'
              )}
            >
              {date}
            </span>
          </div>
        </>
      </div>
    )}
  </InView>
);

export default VerticalTimelineElement;