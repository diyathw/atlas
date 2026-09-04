"use client";

import { useState } from "react";
import Button from "./ui/Button";

const FACILITY_TYPES = [
  "Office",
  "Medical",
  "School",
  "Warehouse",
  "Retail",
  "Other",
] as const;

type FacilityType = (typeof FACILITY_TYPES)[number];

type FormState = {
  name: string;
  company: string;
  email: string;
  phone: string;
  notes: string;
};

type Errors = Partial<Record<keyof FormState, string>>;

type SubmitState = "idle" | "submitting" | "success" | "error";

const SQFT_MIN = 2000;
const SQFT_MAX = 150000;
const SQFT_STEP = 1000;

const LEAD_ENDPOINT =
  process.env.NEXT_PUBLIC_LEAD_FORM_ENDPOINT || null;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ContactForm() {
  const [form, setForm] = useState<FormState>({
    name: "",
    company: "",
    email: "",
    phone: "",
    notes: "",
  });
  const [facilityType, setFacilityType] = useState<FacilityType>("Office");
  const [sqft, setSqft] = useState(58000);
  const [errors, setErrors] = useState<Errors>({});
  const [submitState, setSubmitState] = useState<SubmitState>("idle");

  const sqftPercent = ((sqft - SQFT_MIN) / (SQFT_MAX - SQFT_MIN)) * 100;

  function updateField(field: keyof FormState, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function validate(): Errors {
    const next: Errors = {};
    if (!form.name.trim()) next.name = "Name is required.";
    if (!form.email.trim() && !form.phone.trim()) {
      next.email = "Enter an email or phone number.";
      next.phone = "Enter an email or phone number.";
    } else if (form.email.trim() && !EMAIL_RE.test(form.email.trim())) {
      next.email = "That email doesn't look right.";
    }
    return next;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validation = validate();
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;

    setSubmitState("submitting");
    try {
      if (LEAD_ENDPOINT) {
        const res = await fetch(LEAD_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...form, facilityType, sqft }),
        });
        if (!res.ok) throw new Error("Request failed");
      } else {
        await new Promise((resolve) => setTimeout(resolve, 900));
      }
      setSubmitState("success");
    } catch {
      setSubmitState("error");
    }
  }

  if (submitState === "success") {
    return (
      <div className="flex flex-col gap-3 rounded-[6px] bg-white px-[30px] py-[32px] text-[#14170F]">
        <h3 className="text-xl font-semibold">Request received</h3>
        <p className="text-[15px] leading-[1.55] text-[#14170F]/70">
          We&apos;ll call within one business day to schedule.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col gap-[18px] rounded-[6px] bg-white px-[30px] py-[32px] text-[#14170F]"
    >
      <h3 className="text-xl font-semibold">Request a walkthrough</h3>

      <div className="grid grid-cols-1 gap-[14px] sm:grid-cols-2">
        <Field label="YOUR NAME" error={errors.name}>
          <input
            value={form.name}
            onChange={(e) => updateField("name", e.target.value)}
            placeholder="Jordan Ellery"
            className={inputClass(!!errors.name)}
          />
        </Field>
        <Field label="COMPANY">
          <input
            value={form.company}
            onChange={(e) => updateField("company", e.target.value)}
            placeholder="Kierland Commons"
            className={inputClass(false)}
          />
        </Field>
        <Field label="EMAIL" error={errors.email}>
          <input
            type="email"
            value={form.email}
            onChange={(e) => updateField("email", e.target.value)}
            placeholder="jordan@…"
            className={inputClass(!!errors.email)}
          />
        </Field>
        <Field label="PHONE" error={errors.phone}>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => updateField("phone", e.target.value)}
            placeholder="(480) …"
            className={inputClass(!!errors.phone)}
          />
        </Field>
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-mono text-[10.5px] tracking-[.04em] text-[#14170F]/55">
          FACILITY TYPE
        </label>
        <div className="flex flex-wrap gap-2">
          {FACILITY_TYPES.map((type) => {
            const selected = facilityType === type;
            return (
              <button
                key={type}
                type="button"
                onClick={() => setFacilityType(type)}
                className={
                  selected
                    ? "rounded-full border-[1.5px] border-[#14170F] bg-[#E3E14A]/25 px-[15px] py-2 text-[13px] font-semibold text-[#14170F]"
                    : "rounded-full border border-[#14170F]/20 px-[15px] py-2 text-[13px] font-medium text-[#14170F]/70"
                }
              >
                {type}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-[9px]">
        <div className="flex items-baseline justify-between">
          <label
            htmlFor="sqft"
            className="font-mono text-[10.5px] tracking-[.04em] text-[#14170F]/55"
          >
            CLEANABLE SQUARE FEET
          </label>
          <span className="text-[14.5px] font-semibold">
            {sqft.toLocaleString()} sq ft
          </span>
        </div>
        <div className="relative flex h-[17px] items-center">
          <div className="h-[5px] w-full rounded-full bg-[#14170F]/14">
            <div
              className="h-[5px] rounded-full bg-[#E3E14A]"
              style={{ width: `${sqftPercent}%` }}
            />
          </div>
          <div
            className="pointer-events-none absolute h-[17px] w-[17px] rounded-full border-2 border-[#14170F] bg-white"
            style={{ left: `calc(${sqftPercent}% - 8px)` }}
          />
          <input
            id="sqft"
            type="range"
            min={SQFT_MIN}
            max={SQFT_MAX}
            step={SQFT_STEP}
            value={sqft}
            onChange={(e) => setSqft(Number(e.target.value))}
            aria-label="Cleanable square feet"
            className="absolute inset-0 h-[17px] w-full cursor-pointer opacity-0"
          />
        </div>
      </div>

      <Field label="ANYTHING WE SHOULD KNOW?">
        <textarea
          value={form.notes}
          onChange={(e) => updateField("notes", e.target.value)}
          placeholder="Dock stays open until 9pm; two labs need badge escort…"
          className={`${inputClass(false)} min-h-[66px] resize-y`}
        />
      </Field>

      {submitState === "error" && (
        <p className="text-[13.5px] text-[#a35a12]">
          Something went wrong sending your request. Please try again, or
          call us directly at (602) 555-0148.
        </p>
      )}

      <Button
        type="submit"
        disabled={submitState === "submitting"}
        fullWidth
        className="!text-[15px]"
      >
        {submitState === "submitting" ? "Sending…" : "Send request"}
      </Button>

      <p className="text-center font-mono text-[10.5px] text-[#14170F]/45">
        NO OBLIGATION · WE DO NOT SELL YOUR INFORMATION
      </p>
    </form>
  );
}

function inputClass(hasError: boolean) {
  return `w-full rounded-[3px] border px-[13px] py-3 text-sm placeholder:text-[#14170F]/35 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E3E14A] ${
    hasError ? "border-[#a35a12]" : "border-[#14170F]/20"
  }`;
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-mono text-[10.5px] tracking-[.04em] text-[#14170F]/55">
        {label}
      </label>
      {children}
      {error && <span className="text-xs text-[#a35a12]">{error}</span>}
    </div>
  );
}
