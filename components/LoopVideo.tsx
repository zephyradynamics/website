'use client';

import { useEffect, useRef, useSyncExternalStore } from 'react';
import { MEDIA_VERSION } from '@/lib/media-version';

interface LoopVideoProps {
  name: string;
  /** Plain-language description of what the clip shows, for screen readers. */
  label: string;
  className?: string;
  /** Hero clips load immediately; everything else waits until it is near the viewport. */
  eager?: boolean;
  /** Smaller file for narrow screens, if one exists in /public/video. */
  mobileName?: string;
}

const MOTION_QUERY = '(prefers-reduced-motion: reduce)';
const prefersReducedMotion = () => window.matchMedia(MOTION_QUERY).matches;
function subscribeReducedMotion(onChange: () => void) {
  const query = window.matchMedia(MOTION_QUERY);
  query.addEventListener('change', onChange);
  return () => query.removeEventListener('change', onChange);
}

/**
 * Muted, looping clip cut from the Zephyra films. It plays only while it's on
 * screen, and shows the still poster to anyone who prefers reduced motion.
 */
export default function LoopVideo({ name, label, className = '', eager = false, mobileName }: LoopVideoProps) {
  const ref = useRef<HTMLVideoElement | null>(null);
  const reduced = useSyncExternalStore(subscribeReducedMotion, prefersReducedMotion, () => false);

  useEffect(() => {
    const video = ref.current;
    if (!video || reduced) return;
    // two thresholds: start loading a little before the clip arrives, but only play it while it's
    // properly on screen, so the page never decodes several videos at once
    const loader = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && video.preload === 'none') {
          video.preload = 'auto';
          video.load();
        }
      },
      { rootMargin: '600px 0px' }
    );
    const player = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio >= 0.25) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: [0, 0.25] }
    );
    loader.observe(video);
    player.observe(video);
    return () => {
      loader.disconnect();
      player.disconnect();
    };
  }, [reduced]);

  const poster = `/poster/${name}.jpg?v=${MEDIA_VERSION}`;

  if (reduced) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={poster} alt={label} className={`h-full w-full object-cover ${className}`} />;
  }

  return (
    <video
      ref={ref}
      className={`h-full w-full object-cover ${className}`}
      poster={poster}
      muted
      loop
      playsInline
      disablePictureInPicture
      disableRemotePlayback
      autoPlay={eager}
      preload={eager ? 'auto' : 'none'}
      aria-label={label}
    >
      {mobileName && <source src={`/video/${mobileName}.mp4?v=${MEDIA_VERSION}`} type="video/mp4" media="(max-width: 767px)" />}
      <source src={`/video/${name}.mp4?v=${MEDIA_VERSION}`} type="video/mp4" />
    </video>
  );
}
