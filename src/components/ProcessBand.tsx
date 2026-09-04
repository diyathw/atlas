import Reveal from "./Reveal";
import Eyebrow from "./ui/Eyebrow";

const STEPS = [
  {
    n: "01",
    title: "Request a walkthrough",
    body: "Free on-site visit within 3 business days. We measure, photograph and note site-specific requirements.",
  },
  {
    n: "02",
    title: "Get your scope & price",
    body: "Line-item pricing within 48 hours of the visit, plus a certificate of insurance with the bid.",
  },
  {
    n: "03",
    title: "Crew starts on schedule",
    body: "A trained W-2 crew begins on your calendar, with a supervisor who signs off on every visit.",
  },
];

export default function ProcessBand() {
  return (
    <section className="bg-[#454F30] px-6 py-[76px] text-white sm:px-10">
      <Reveal>
        <Eyebrow tone="light" className="mb-3">
          HOW IT WORKS
        </Eyebrow>
        <h2 className="max-w-2xl text-[28px] leading-[1.1] font-bold tracking-[-.02em] md:text-[35px]">
          From first call to{" "}
          <span className="font-serif italic">crew on site</span>, in three
          steps.
        </h2>
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
        {STEPS.map((step, i) => (
          <Reveal key={step.n} delayMs={i * 100}>
            <div className="border-t border-white/20 pt-5">
              <span className="font-mono text-[13px] text-[#E3E14A]">
                {step.n}
              </span>
              <h3 className="mt-3 text-[19px] font-semibold">{step.title}</h3>
              <p className="mt-2 text-[14.5px] leading-[1.5] text-white/65">
                {step.body}
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
