"use client";

import { useEffect, useRef } from "react";
import Button from "./ui/Button";
import Eyebrow from "./ui/Eyebrow";

export default function Hero() {
  const frameRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const frame = frameRef.current;
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!frame || !section || !video) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduceMotion) return;

    let duration = 0;
    const onLoadedMetadata = () => {
      duration = video.duration || 0;
    };
    video.addEventListener("loadedmetadata", onLoadedMetadata);

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        const span = window.innerHeight + rect.height;
        const scrollProgress = Math.min(
          Math.max((window.innerHeight - rect.top) / span, 0),
          1
        );
        frame.style.transform = `translateY(${
          (rect.top / window.innerHeight) * -40
        }px) scale(1.08)`;

        if (duration > 0) {
          video.currentTime = scrollProgress * duration;
        }
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[92vh] overflow-hidden bg-[#14170F]"
    >
      <div ref={frameRef} className="absolute inset-0 will-change-transform">
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          src="/atlas-media/atlas-video-01.mp4"
          poster="/atlas-media/atlas-photo-04-hd.png"
          muted
          playsInline
          preload="auto"
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-[#14170F]/95 via-[#14170F]/55 to-[#454F30]/15" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#14170F]/70 via-transparent to-transparent" />

      <div className="relative flex min-h-[92vh] flex-col justify-end gap-[26px] px-6 pb-16 sm:px-10 md:px-12 md:pb-20">
        <Eyebrow tone="accent">
          COMMERCIAL JANITORIAL — PHOENIX, AZ — SINCE 2004
        </Eyebrow>
        <h1 className="max-w-3xl text-[38px] leading-[1.05] font-bold tracking-[-.025em] text-balance text-white md:text-[64px] md:leading-[1.02]">
          Facilities that stay{" "}
          <span className="font-serif italic">inspection-ready.</span>
        </h1>
        <p className="max-w-[520px] text-[17px] leading-[1.55] text-white/80 text-pretty">
          Contract cleaning for offices, clinics, schools and light
          industrial sites across the Valley. Documented scopes, trained
          W&#8209;2 crews, and a supervisor who signs off on every visit.
        </p>
        <div className="mt-0.5 flex flex-wrap gap-3">
          <Button href="#contact" variant="primary">
            Get a scope &amp; price in 48 hrs
          </Button>
          <Button href="#quality" variant="secondary">
            See our quality program
          </Button>
        </div>
        <div className="mt-[10px] flex flex-wrap gap-[22px] font-mono text-[11px] text-white/60">
          <span>INSURED &amp; BONDED · $5M</span>
          <span>OSHA-TRAINED CREWS</span>
          <span>E-VERIFY</span>
          <span>GREEN SEAL SUPPLIES</span>
        </div>
      </div>

      <span className="absolute right-6 bottom-4 font-mono text-[11px] text-white/50 sm:right-10">
        crew servicing a place-of-worship main hall
      </span>
    </section>
  );
}
