import IndustriesPan from "./IndustriesPan";
import Eyebrow from "./ui/Eyebrow";

const INDUSTRIES = [
  "Class A office",
  "Medical & dental",
  "K–12 & charter schools",
  "Distribution & 3PL",
  "Municipal & civic",
  "Auto dealerships",
  "Multifamily common areas",
  "Places of worship",
];

export default function Industries() {
  return (
    <section id="industries" className="px-6 pt-[70px] pb-[74px] sm:px-10">
      <Eyebrow className="mb-[26px]">
        03 — INDUSTRIES WE HOLD CONTRACTS IN
      </Eyebrow>

      <div className="flex flex-wrap gap-[10px]">
        {INDUSTRIES.map((label) => (
          <span
            key={label}
            className="rounded-full border border-[#14170F]/20 px-[18px] py-[10px] text-sm font-medium text-[#14170F]/70"
          >
            {label}
          </span>
        ))}
      </div>

      <div className="mt-[34px] grid grid-cols-1 gap-px border border-[#14170F]/10 bg-[#14170F]/10 sm:grid-cols-5">
        {["client logo", "client logo", "client logo", "client logo", "client logo"].map(
          (label, i) => (
            <div
              key={i}
              className="flex h-20 items-center justify-center bg-[#F6F4EC] font-mono text-[10.5px] text-[#14170F]/40"
            >
              {label}
            </div>
          )
        )}
      </div>

      <div className="mt-14">
        <Eyebrow tone="ink" className="mb-4">
          RECENT SITE WORK
        </Eyebrow>
        <IndustriesPan />
      </div>
    </section>
  );
}
