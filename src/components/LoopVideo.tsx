import { useEffect, useRef, useState } from 'react';
import type { MediaLoop } from '../content/types';
import { useInView } from '../hooks/useInView';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * 16:9 dark media box. Plays a muted loop once it scrolls into view,
 * shows only the poster under reduced motion, and a labelled placeholder until media exists.
 */
const LoopVideo = ({ media }: { media: MediaLoop }) => {
  const [boxRef, inView] = useInView<HTMLDivElement>('200px 0px');
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reduced] = useState(prefersReducedMotion);
  const hasVideo = Boolean(media.mp4 ?? media.webm);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !inView) return;
    video.load();
    video.play().catch(() => { /* autoplay refused: the poster stays */ });
  }, [inView]);

  const box = 'aspect-video border border-ink bg-ink';

  if (!media.poster && !hasVideo) {
    return (
      <div ref={boxRef} className={`${box} flex flex-col items-center justify-center gap-1.5 p-4 text-center font-mono text-muted-dark`}>
        <span className="text-xs tracking-[0.08em] text-on-dark uppercase">{media.placeholderTitle}</span>
        <span className="text-[11px]">{media.placeholderBody}</span>
      </div>
    );
  }

  if (reduced || !hasVideo) {
    return (
      <div ref={boxRef} className={box}>
        <img src={media.poster} alt="" width={media.width} height={media.height} loading="lazy" decoding="async" className="block size-full object-cover" />
      </div>
    );
  }

  return (
    <div ref={boxRef} className={box}>
      <video
        ref={videoRef}
        className="block size-full object-cover"
        muted
        loop
        playsInline
        preload="none"
        // The poster is a full frame; hold it back until the card is near so it doesn't load with the page
        poster={inView ? media.poster : undefined}
        width={media.width}
        height={media.height}
        aria-hidden="true"
      >
        {media.webm && <source src={media.webm} type="video/webm" />}
        {media.mp4 && <source src={media.mp4} type="video/mp4" />}
      </video>
    </div>
  );
};

export default LoopVideo;
