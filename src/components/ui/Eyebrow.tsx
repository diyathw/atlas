const TONE_CLASSES = {
  olive: "text-[#454F30]",
  light: "text-white/55",
  accent: "text-[#E3E14A]",
  ink: "text-[#14170F]/55",
} as const;

export type EyebrowTone = keyof typeof TONE_CLASSES;

export default function Eyebrow({
  tone = "olive",
  className = "",
  children,
}: {
  tone?: EyebrowTone;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <p
      className={`font-mono text-[11px] tracking-[.12em] ${TONE_CLASSES[tone]} ${className}`}
    >
      {children}
    </p>
  );
}
