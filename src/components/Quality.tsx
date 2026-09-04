import Reveal from "./Reveal";
import QualityWipe from "./QualityWipe";
import Eyebrow from "./ui/Eyebrow";

const STEPS = [
  {
    n: "01",
    title: "Scope sheet per room type",
    sub: "Signed at onboarding, revised with you annually.",
  },
  {
    n: "02",
    title: "Supervisor sign-off nightly",
    sub: "Geo-stamped, with photo evidence on flagged areas.",
  },
  {
    n: "03",
    title: "Monthly scored inspection",
    sub: "Shared as a PDF and tracked as a trend line.",
  },
];

export default function Quality() {
  return (
    <section
      id="quality"
      className="grid grid-cols-1 items-start gap-10 bg-[#F6F4EC] px-6 py-[76px] sm:px-10 md:grid-cols-[1fr_1.15fr] md:gap-14"
    >
      <Reveal className="flex flex-col gap-5 md:sticky md:top-[74px] md:self-start">
        <Eyebrow>02 — QUALITY PROGRAM</Eyebrow>
        <h2 className="text-[26px] leading-[1.12] font-bold tracking-[-.02em] md:text-[35px]">
          You get the{" "}
          <span className="font-serif italic">inspection report</span>, not
          just the invoice.
        </h2>
        <p className="text-base leading-[1.55] text-[#14170F]/70 text-pretty">
          Every site is scored against its own scope sheet on a rotating
          schedule. Findings, photos and corrections land in your inbox
          within 24 hours — so building walkthroughs stop being a surprise.
        </p>
        <div className="flex flex-col border-t border-[#14170F]/14">
          {STEPS.map((step) => (
            <div
              key={step.n}
              className="flex gap-4 border-b border-[#14170F]/14 py-[15px]"
            >
              <span className="pt-[3px] font-mono text-[11px] text-[#14170F]/40">
                {step.n}
              </span>
              <div>
                <div className="text-[15px] font-semibold">{step.title}</div>
                <div className="text-[13.5px] text-[#14170F]/60">
                  {step.sub}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Reveal>

      <QualityWipe />
    </section>
  );
}
