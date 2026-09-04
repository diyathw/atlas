import Image from "next/image";
import Reveal from "./Reveal";
import Eyebrow from "./ui/Eyebrow";

const COMMITMENTS = [
  {
    title: "Supervisor per 6 crew",
    sub: "Not per region. Someone answerable is on site.",
  },
  {
    title: "30-day out clause",
    sub: "No auto-renew traps. We keep accounts by performing.",
  },
  {
    title: "Own equipment fleet",
    sub: "Ride-on scrubbers, extractors, HEPA vacs.",
  },
  {
    title: "Bilingual crews",
    sub: "Site instructions posted in English and Spanish.",
  },
];

export default function About() {
  return (
    <section
      id="about"
      className="grid grid-cols-1 gap-14 border-t border-[#14170F]/10 bg-[#F6F4EC] px-6 py-[76px] sm:px-10 md:grid-cols-2"
    >
      <Reveal className="flex flex-col gap-5">
        <Eyebrow>04 — ABOUT ATLAS</Eyebrow>
        <h2 className="text-[26px] leading-[1.12] font-bold tracking-[-.02em] md:text-[35px]">
          Twenty-two years, one market,{" "}
          <span className="font-serif italic">no franchising</span>.
        </h2>
        <p className="text-base leading-[1.55] text-[#14170F]/70">
          Atlas has cleaned Valley buildings since 2004. Every crew member is
          a W-2 employee we train, background-check and equip ourselves — no
          subcontracted labor, no rotating faces in your building.
        </p>
        <div className="mt-1.5 grid grid-cols-1 gap-[22px] sm:grid-cols-2">
          {COMMITMENTS.map((c) => (
            <div key={c.title}>
              <div className="text-[15px] font-semibold">{c.title}</div>
              <div className="mt-1 text-[13.5px] leading-[1.45] text-[#14170F]/60">
                {c.sub}
              </div>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal delayMs={150} className="flex flex-col gap-[14px]">
        <div className="rounded-[5px] border border-[#14170F]/12 bg-white px-7 py-[30px]">
          <p className="text-[19px] leading-[1.45] font-medium text-pretty">
            “We went from three complaint emails a week to none. The monthly
            score sheet is the reason I stopped shopping the contract.”
          </p>
          <div className="mt-5 flex items-center gap-3">
            <div className="stripe-warm h-[38px] w-[38px] flex-none rounded-full" />
            <div>
              <div className="text-sm font-semibold">M. Reyes-Whitfield</div>
              <div className="font-mono text-[11px] text-[#14170F]/55">
                FACILITIES DIRECTOR · 3-BUILDING CAMPUS
              </div>
            </div>
          </div>
        </div>

        <div className="relative min-h-[180px] flex-1 overflow-hidden">
          <Image
            src="/atlas-media/atlas-photo-02-hd.png"
            alt="Inside a recently serviced client facility"
            fill
            className="object-cover"
            sizes="(min-width: 768px) 45vw, 90vw"
          />
          <span className="absolute bottom-0 left-0 bg-white/75 px-2 py-[5px] font-mono text-[10.5px] text-[#14170F]/55">
            photo — a recently serviced facility
          </span>
        </div>
      </Reveal>
    </section>
  );
}
