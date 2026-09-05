"use client";

import { useState } from "react";
import Button from "./ui/Button";

const NAV = [
  { label: "Services", href: "#services" },
  { label: "Quality program", href: "#quality" },
  { label: "Industries", href: "#industries" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-20 border-b border-[#14170F]/10 bg-[#F6F4EC]/96 backdrop-blur-[8px]">
      <div className="flex h-[74px] items-center justify-between gap-4 px-5 sm:px-10">
        <div className="flex min-w-0 items-center gap-8">
          <div className="flex flex-none flex-col gap-[1px]">
            <span className="whitespace-nowrap text-[20px] font-bold tracking-[.22em] text-[#14170F] sm:text-[23px]">
              ATLAS
            </span>
            <span className="hidden whitespace-nowrap font-mono text-[11px] tracking-[.04em] text-[#14170F]/50 sm:block">
              MAINTENANCE SOLUTIONS INC
            </span>
          </div>
          <nav className="hidden gap-[22px] overflow-hidden lg:flex">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="whitespace-nowrap text-sm font-medium text-[#14170F] no-underline"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex flex-none items-center gap-3 sm:gap-[18px]">
          <div className="flex-none text-right">
            <div className="hidden font-mono text-[10px] text-[#14170F]/50 sm:block">
              24/7 DISPATCH
            </div>
            <a
              href="tel:16025550148"
              className="whitespace-nowrap text-[13px] font-semibold text-[#14170F] sm:text-[15px]"
            >
              (602) 555-0148
            </a>
          </div>
          <Button
            href="#contact"
            className="!hidden !px-6 !py-3 !text-[13.5px] lg:!inline-block"
          >
            Request a walkthrough
          </Button>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label="Toggle menu"
            className="relative flex h-9 w-9 flex-none items-center justify-center rounded-full border border-[#14170F]/20 lg:hidden"
          >
            <span className="relative flex h-[13px] w-[16px] flex-col justify-between">
              <span
                className={`h-[1.5px] w-full origin-center rounded-full bg-[#14170F] transition-transform duration-300 ease-out ${
                  open ? "translate-y-[5.5px] rotate-45" : ""
                }`}
              />
              <span
                className={`h-[1.5px] w-full rounded-full bg-[#14170F] transition-opacity duration-200 ease-out ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`h-[1.5px] w-full origin-center rounded-full bg-[#14170F] transition-transform duration-300 ease-out ${
                  open ? "-translate-y-[5.5px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      <div
        className={`grid overflow-hidden border-[#14170F]/10 bg-[#F6F4EC] transition-[grid-template-rows,opacity] duration-300 ease-out lg:hidden ${
          open
            ? "grid-rows-[1fr] border-t opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="min-h-0 px-5 py-4">
          <nav className="flex flex-col gap-1">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-[6px] px-2 py-2.5 text-[15px] font-medium text-[#14170F] no-underline"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <Button
            href="#contact"
            onClick={() => setOpen(false)}
            fullWidth
            className="mt-3 !px-6 !py-3 !text-[13.5px]"
          >
            Request a walkthrough
          </Button>
        </div>
      </div>
    </header>
  );
}
