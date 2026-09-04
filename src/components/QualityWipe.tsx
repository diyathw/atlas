"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function QualityWipe() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(() =>
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? 1
      : 0
  );

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    if (
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = wrap.getBoundingClientRect();
        const scrollable = rect.height - window.innerHeight;
        const p =
          scrollable > 0
            ? Math.min(Math.max(-rect.top / scrollable, 0), 1)
            : 1;
        setProgress(p);
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={wrapRef} className="relative h-[220vh]">
      <div className="sticky top-[74px] flex h-[calc(100vh-74px)] items-center overflow-hidden">
        <div className="relative aspect-4/5 w-full max-w-[560px] overflow-hidden">
          <Image
            src="/atlas-media/atlas-photo-01-hd.png"
            alt="Before — a client site mid-service, stations wrapped and staged"
            fill
            className="object-cover"
            sizes="560px"
          />
          <div
            className="absolute inset-y-0 left-0 overflow-hidden"
            style={{ width: `${progress * 100}%` }}
          >
            <div className="relative h-full w-[560px] max-w-[80vw]">
              <Image
                src="/atlas-media/atlas-photo-06.webp"
                alt="After — the same class of site, finished and detailed"
                fill
                className="object-cover"
                sizes="560px"
              />
            </div>
          </div>
          <div
            className="absolute inset-y-0 w-[2px] bg-white"
            style={{ left: `${progress * 100}%` }}
          />
          <span className="absolute bottom-0 left-0 bg-white/75 px-2 py-[5px] font-mono text-[10.5px] text-[#14170F]/55">
            {progress > 0.5 ? "after — completed service" : "before — service call"}
          </span>
        </div>
      </div>
    </div>
  );
}
