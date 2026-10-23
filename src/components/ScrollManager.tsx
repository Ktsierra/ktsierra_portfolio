import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Scrolls to the hash target (or the top) on every navigation, including "/#work" from another page.
 * Same-page jumps keep the CSS smooth scroll; route changes jump instantly.
 */
const ScrollManager = () => {
  const { pathname, hash, key } = useLocation();
  const lastPath = useRef<string | null>(null);

  useEffect(() => {
    const routeChanged = lastPath.current !== null && lastPath.current !== pathname;
    lastPath.current = pathname;
    const behavior: ScrollBehavior = routeChanged ? 'instant' : 'auto';

    if (!hash || hash === '#top') {
      window.scrollTo({ top: 0, behavior });
      return;
    }
    // The target may not be mounted yet when arriving from another route
    let tries = 0;
    let frame = 0;
    const seek = () => {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (el) {
        el.scrollIntoView({ behavior });
        return;
      }
      if (tries++ < 30) frame = requestAnimationFrame(seek);
    };
    seek();
    return () => { cancelAnimationFrame(frame); };
  }, [pathname, hash, key]);

  return null;
};

export default ScrollManager;
