import CountUp from "./CountUp";

const STATS = [
  { to: 1140, decimals: 0, suffix: "", label: "SITES SERVICED WEEKLY" },
  { to: 340, decimals: 0, suffix: "", label: "W-2 CREW MEMBERS" },
  { to: 98.4, decimals: 1, suffix: "%", label: "QA INSPECTION PASS RATE" },
  { to: 22, decimals: 0, suffix: " min", label: "AVG. EMERGENCY RESPONSE" },
];

export default function StatBand() {
  return (
    <section className="grid grid-cols-2 bg-[#454F30] text-white md:grid-cols-4">
      {STATS.map((stat, i) => (
        <div
          key={stat.label}
          className={`border-white/15 px-6 py-[34px] sm:px-10 ${
            i % 2 === 0 ? "border-r" : ""
          } ${i < 2 ? "border-b md:border-b-0" : ""} ${
            i < 3 ? "md:border-r" : ""
          }`}
        >
          <div className="text-[28px] font-bold tracking-[-.02em] text-[#E3E14A] md:text-[38px]">
            <CountUp to={stat.to} decimals={stat.decimals} suffix={stat.suffix} />
          </div>
          <div className="mt-1 font-mono text-[11px] text-white/60">
            {stat.label}
          </div>
        </div>
      ))}
    </section>
  );
}
