import ContactForm from "./ContactForm";
import Eyebrow from "./ui/Eyebrow";

const CHECKLIST = [
  "Walkthrough within 3 business days",
  "Certificate of insurance sent with the bid",
  "Emergency and after-hours response, 24/7",
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="grid grid-cols-1 gap-12 bg-[#14170F] px-6 py-[76px] text-white sm:px-10 md:grid-cols-2 md:gap-16"
    >
      <div className="flex flex-col gap-[18px]">
        <Eyebrow tone="light">05 — GET A PRICE</Eyebrow>
        <h2 className="text-[28px] leading-[1.08] font-bold tracking-[-.025em] md:text-[38px]">
          Free on-site walkthrough. You keep the{" "}
          <span className="font-serif italic">scope sheet either way</span>.
        </h2>
        <p className="max-w-[34em] text-base leading-[1.55] text-white/70">
          We measure, photograph and price your building, then send a
          line-item scope you can compare against anyone. Most quotes land
          within 48 hours of the visit.
        </p>
        <div className="mt-3 flex flex-col gap-3 text-[15px]">
          {CHECKLIST.map((item) => (
            <div key={item} className="flex gap-[10px]">
              <span className="font-bold text-[#E3E14A]">✓</span>
              <span className="text-white/85">{item}</span>
            </div>
          ))}
        </div>
        <div className="mt-5 flex flex-wrap gap-9 border-t border-white/16 pt-5">
          <div>
            <div className="font-mono text-[10.5px] text-white/55">CALL</div>
            <div className="mt-[3px] text-lg font-semibold">
              (602) 555-0148
            </div>
          </div>
          <div>
            <div className="font-mono text-[10.5px] text-white/55">EMAIL</div>
            <div className="mt-[3px] text-lg font-semibold">
              bids@atlasmaint.com
            </div>
          </div>
          <div>
            <div className="font-mono text-[10.5px] text-white/55">
              WHATSAPP
            </div>
            <a
              href="https://wa.me/16025550148"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-[3px] block text-lg font-semibold text-white underline decoration-white/30 underline-offset-4 transition-colors hover:decoration-white"
            >
              Message us
            </a>
          </div>
        </div>
      </div>

      <ContactForm />
    </section>
  );
}
