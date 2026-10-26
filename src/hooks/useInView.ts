import { useEffect, useRef, useState } from 'react';

/** Flips to true once the element scrolls into view, then stops observing */
export const useInView = <T extends Element>(rootMargin = '0px 0px -10% 0px') => {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;
    if (!('IntersectionObserver' in window)) {
      setInView(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );
    observer.observe(el);
    return () => { observer.disconnect(); };
  }, [inView, rootMargin]);

  return [ref, inView] as const;
};
