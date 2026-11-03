"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { withBasePath } from "@/lib/basePath";

type Props = { src: string; poster: string; title: string; className?: string };

const REDUCED = "(prefers-reduced-motion: reduce)";
const subscribe = (cb: () => void) => {
  const mql = window.matchMedia(REDUCED);
  mql.addEventListener("change", cb);
  return () => mql.removeEventListener("change", cb);
};
const getReduced = () => window.matchMedia(REDUCED).matches;
// Server render assumes reduced motion, so nothing autoplays before hydration.
const getServerReduced = () => true;

// Silent screen recording that plays while on screen. With reduced motion it
// waits for a click instead of playing by itself.
export default function LoopVideo({ src, poster, title, className = "" }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduced = useSyncExternalStore(subscribe, getReduced, getServerReduced);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video || reduced) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.4 },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [reduced]);

  const toggle = () => {
    const video = ref.current;
    if (!video) return;
    if (video.paused) video.play().catch(() => {});
    else video.pause();
  };

  return (
    <div className={`relative overflow-hidden border border-border bg-black ${className}`}>
      <video
        ref={ref}
        src={withBasePath(src)}
        poster={withBasePath(poster)}
        muted
        playsInline
        loop
        preload="none"
        aria-label={title}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onClick={toggle}
        className="block h-auto w-full cursor-pointer"
      />
      {!playing && (
        <button
          type="button"
          onClick={toggle}
          aria-label={`Play: ${title}`}
          className="label absolute bottom-3 right-3 border border-accent/50 bg-background/80 px-3 py-1.5 text-[10px] text-accent backdrop-blur-sm transition-colors hover:bg-accent/20"
        >
          ▶ Play
        </button>
      )}
    </div>
  );
}
