import Reveal from "./Reveal";
import Eyebrow from "./ui/Eyebrow";

const SERVICES = [
  {
    code: "S-01",
    title: "Nightly janitorial",
    body: "Task-mapped scopes by room type, logged per visit. Day porters available.",
  },
  {
    code: "S-02",
    title: "Floor & carpet care",
    body: "Strip & refinish, burnishing, hot-water extraction on a published cycle.",
  },
  {
    code: "S-03",
    title: "Disinfection",
    body: "EPA List N protocols for clinics, dental suites and childcare rooms.",
  },
  {
    code: "S-04",
    title: "Window & glass",
    body: "Interior and low-rise exterior, quarterly or on request. Storefront weekly.",
  },
  {
    code: "S-05",
    title: "Warehouse & industrial",
    body: "Ride-on scrubbing, dock and mezzanine detail, high-dusting on lifts.",
  },
  {
    code: "S-06",
    title: "Post-construction",
    body: "Rough, final and touch-up cleans coordinated to your punch schedule.",
  },
];

export default function Services() {
  return (
    <section id="services" className="px-6 pt-[76px] pb-20 sm:px-10">
      <div className="mb-[34px] flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Eyebrow className="mb-3">01 — SERVICES</Eyebrow>
          <h2 className="max-w-[16em] text-[28px] leading-[1.1] font-bold tracking-[-.02em] md:text-[37px]">
            One contract, every{" "}
            <span className="font-serif italic">surface in the building</span>.
          </h2>
        </div>
        <a
          href="#contact"
          className="flex-none text-sm font-semibold text-[#14170F]"
        >
          Ask about a custom scope →
        </a>
      </div>

      <div className="grid grid-cols-1 gap-px border border-[#14170F]/10 bg-[#14170F]/10 sm:grid-cols-2 md:grid-cols-3">
        {SERVICES.map((service, i) => (
          <Reveal key={service.code} delayMs={i * 60} className="h-full">
            <div className="flex h-full flex-col gap-[10px] bg-white px-7 pt-[30px] pb-[34px] transition-colors hover:bg-[#EFECE0]">
              <span className="font-mono text-[11px] text-[#14170F]/40">
                {service.code}
              </span>
              <h3 className="text-[19px] font-semibold">{service.title}</h3>
              <p className="text-[14.5px] leading-[1.5] text-[#14170F]/65">
                {service.body}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
