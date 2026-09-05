"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import InViewVideo from "./InViewVideo";
import { mediaPath } from "@/lib/media";

const ITEMS = [
  {
    kind: "image" as const,
    src: mediaPath("/atlas-media/atlas-photo-03-hd.png"),
    alt: "Chairs stacked for a full floor clean at an office site",
    caption: "office floor clean",
  },
  {
    kind: "image" as const,
    src: mediaPath("/atlas-media/atlas-photo-04-hd.png"),
    alt: "Crew mopping a large tiled hall",
    caption: "crew servicing a large hall",
  },
  {
    kind: "image" as const,
    src: mediaPath("/atlas-media/atlas-photo-05-hd.png"),
    alt: "A cleaned kitchen appliance detail",
    caption: "appliance detail",
  },
  {
    kind: "video" as const,
    src: mediaPath("/atlas-media/atlas-video-02.mp4"),
    caption: "site walkthrough",
  },
  {
    kind: "video" as const,
    src: mediaPath("/atlas-media/atlas-video-03.mp4"),
    caption: "crew in service",
  },
];

function StaticGrid() {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      {ITEMS.map((item) =>
        item.kind === "video" ? (
          <InViewVideo key={item.src} src={item.src} caption={item.caption} />
        ) : (
          <div key={item.src} className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={item.src}
              alt={item.alt}
              fill
              className="object-cover"
              sizes="(min-width: 768px) 25vw, 45vw"
            />
            <span className="absolute bottom-0 left-0 bg-white/75 px-2 py-[5px] font-mono text-[10.5px] text-[#14170F]/55">
              {item.caption}
            </span>
          </div>
        )
      )}
    </div>
  );
}

export default function IndustriesPan() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const [translate, setTranslate] = useState(0);
  const [reducedMotion] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );

  useEffect(() => {
    if (reducedMotion) return;

    const wrap = wrapRef.current;
    const frame = frameRef.current;
    const row = rowRef.current;
    if (!wrap || !frame || !row) return;

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = wrap.getBoundingClientRect();
        const scrollable = rect.height - window.innerHeight;
        const progress =
          scrollable > 0
            ? Math.min(Math.max(-rect.top / scrollable, 0), 1)
            : 0;

        const maxTranslate = Math.max(
          row.scrollWidth - frame.clientWidth,
          0
        );
        setTranslate(-maxTranslate * progress);
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [reducedMotion]);

  if (reducedMotion) return <StaticGrid />;

  return (
    <div ref={wrapRef} className="relative h-[220vh]">
      <div
        ref={frameRef}
        className="sticky top-[74px] flex h-[calc(100vh-74px)] items-center overflow-hidden"
      >
        <div
          ref={rowRef}
          className="flex gap-4 will-change-transform"
          style={{ transform: `translateX(${translate}px)` }}
        >
          {ITEMS.map((item) =>
            item.kind === "video" ? (
              <div
                key={item.src}
                className="w-[85vw] flex-none sm:w-[60vw] md:w-[420px]"
              >
                <InViewVideo src={item.src} caption={item.caption} />
              </div>
            ) : (
              <div
                key={item.src}
                className="relative aspect-[4/3] w-[85vw] flex-none overflow-hidden sm:w-[60vw] md:w-[420px]"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 420px, 85vw"
                />
                <span className="absolute bottom-0 left-0 bg-white/75 px-2 py-[5px] font-mono text-[10.5px] text-[#14170F]/55">
                  {item.caption}
                </span>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
