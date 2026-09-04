export default function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-[#1C1F16] text-white">
      <div className="flex flex-wrap items-center justify-between gap-6 px-6 py-[34px] font-mono text-[11px] text-white/50 sm:px-10">
        <span>ATLAS MAINTENANCE SOLUTIONS INC · PHOENIX, AZ · © 2026</span>
        <div className="flex gap-5">
          <a href="#">Careers</a>
          <a href="#">Safety data sheets</a>
          <a href="#">Privacy</a>
        </div>
      </div>
      <div
        aria-hidden
        className="pointer-events-none -mb-[0.14em] text-center text-[18vw] leading-none font-bold tracking-tight text-white/5 select-none"
      >
        ATLAS
      </div>
    </footer>
  );
}
