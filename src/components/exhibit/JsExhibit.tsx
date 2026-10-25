import { useEffect, useRef, useState } from 'react';
import { site } from '../../content/site';
import type { Viewer } from './viewer';
import { useInView } from '../../hooks/useInView';

const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`;

const RotateIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 12a9 9 0 1 1-3-6.7" />
    <path d="M21 4v5h-5" />
  </svg>
);

const Corner = ({ pos }: { pos: string }) => (
  <span aria-hidden="true" className={`absolute z-10 size-[18px] border-signal ${pos}`} />
);

/** Runs the callback once the browser is idle (or after a timeout where requestIdleCallback is missing) */
const whenIdle = (cb: () => void) => {
  if ('requestIdleCallback' in window) {
    const id = window.requestIdleCallback(cb, { timeout: 2500 });
    return () => { window.cancelIdleCallback(id); };
  }
  const id = setTimeout(cb, 1200);
  return () => { clearTimeout(id); };
};

/**
 * Fig. 0: the light (panel) viewport with the graphite <JS/> model. Shows the poster immediately;
 * once the page is idle and the figure is on screen it lazy-loads the three.js viewer and
 * crossfades to it. Without WebGL, or on any failure, the poster simply stays.
 *
 * The poster is a capture of this same stage at the resting pose, so it lines up with the canvas.
 */
const JsExhibit = () => {
  const { exhibit } = site;
  const [figRef, seen] = useInView<HTMLElement>('0px');
  const stageRef = useRef<HTMLDivElement>(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const stage = stageRef.current;
    if (!seen || !stage) return;

    let viewer: Viewer | undefined;
    let cancelled = false;
    let onScreen = true;
    const sync = () => viewer?.setActive(onScreen && document.visibilityState === 'visible');

    // Pause when scrolled away or when the tab is hidden
    const io = new IntersectionObserver((entries) => {
      onScreen = entries.some((e) => e.isIntersecting);
      sync();
    });
    io.observe(stage);
    document.addEventListener('visibilitychange', sync);

    const cancelIdle = whenIdle(() => {
      void import('./viewer')
        .then(({ createViewer }) => {
          if (cancelled) return;
          viewer = createViewer({
            container: stage,
            modelUrl: asset(exhibit.model),
            reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
            // ?force3d renders the model even without a GPU, for testing on such machines
            allowSoftware: new URLSearchParams(window.location.search).has('force3d'),
            onReady: () => { setLive(true); },
            onError: () => { viewer?.dispose(); viewer = undefined; },
          });
          sync();
        })
        // No WebGL, or the chunk failed: keep the poster, no error UI
        .catch(() => { viewer?.dispose(); viewer = undefined; });
    });

    return () => {
      cancelled = true;
      cancelIdle();
      io.disconnect();
      document.removeEventListener('visibilitychange', sync);
      viewer?.dispose();
    };
  }, [seen, exhibit.model]);

  return (
    <figure
      ref={figRef}
      aria-label={exhibit.ariaLabel}
      className="relative m-0 ml-[10%] flex aspect-[5/4] flex-col overflow-hidden border-[1.5px] border-ink bg-panel"
    >
      <Corner pos="top-3 left-3 border-t-2 border-l-2" />
      <Corner pos="top-3 right-3 border-t-2 border-r-2" />
      <Corner pos="bottom-3 left-3 border-b-2 border-l-2" />
      <Corner pos="bottom-3 right-3 border-b-2 border-r-2" />

      <figcaption className="label-sm relative z-10 flex items-center justify-between gap-3 px-10 pt-[18px] text-muted max-sm:px-8">
        <span>{exhibit.figure}</span>
        <span className="inline-flex items-center gap-2">
          <RotateIcon />
          {exhibit.hint}
        </span>
      </figcaption>

      <div className="relative flex flex-auto items-center justify-center px-[8%]">
        <span
          aria-hidden="true"
          className="absolute top-[66%] left-1/2 aspect-[4/1] w-[62%] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border border-dashed border-plate-rule"
        />
        <img
          src={asset(exhibit.poster.src)}
          alt=""
          width={exhibit.poster.width}
          height={exhibit.poster.height}
          decoding="async"
          fetchPriority="low"
          className={`absolute inset-0 block size-full object-contain transition-opacity duration-300 ${live ? 'opacity-0' : 'opacity-100'}`}
        />
        <div
          ref={stageRef}
          className={`absolute inset-0 transition-opacity duration-300 ${live ? 'opacity-100' : 'opacity-0'}`}
        />
      </div>

      <p className="relative z-10 m-0 self-end px-10 pb-[22px] text-right font-mono text-[11px] leading-[1.5] text-muted max-sm:px-8">
        {exhibit.credit[0]}<br />{exhibit.credit[1]}
      </p>
    </figure>
  );
};

export default JsExhibit;
