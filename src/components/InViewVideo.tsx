"use client";

import { useEffect, useRef } from "react";

export default function InViewVideo({
  src,
  caption,
}: {
  src: string;
  caption: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative aspect-[4/3] overflow-hidden bg-[#14170F]/5">
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        src={src}
        muted
        loop
        playsInline
        preload="metadata"
      />
      <span className="absolute bottom-0 left-0 bg-white/75 px-2 py-[5px] font-mono text-[10.5px] text-[#14170F]/55">
        {caption}
      </span>
    </div>
  );
}
