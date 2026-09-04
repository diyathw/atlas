type Variant = "primary" | "secondary";

const BASE =
  "rounded-full text-[14.5px] font-semibold transition-colors whitespace-nowrap px-[26px] py-[15px]";

const VARIANT_CLASSES: Record<Variant, string> = {
  primary:
    "bg-[#E3E14A] text-[#14170F] hover:bg-[#14170F] hover:text-[#E3E14A]",
  secondary: "border border-white/35 text-white hover:bg-white/10",
};

type ButtonProps = {
  variant?: Variant;
  fullWidth?: boolean;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
} & ({ href: string; type?: never } | { href?: undefined; type?: "button" | "submit" });

export default function Button({
  variant = "primary",
  fullWidth = false,
  disabled = false,
  className = "",
  children,
  onClick,
  href,
  type,
}: ButtonProps) {
  const classes = `${BASE} ${VARIANT_CLASSES[variant]} ${
    fullWidth ? "block w-full text-center" : "inline-block"
  } ${disabled ? "cursor-not-allowed opacity-70" : ""} ${className}`;

  if (href) {
    return (
      <a href={href} onClick={onClick} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button
      type={type ?? "button"}
      disabled={disabled}
      onClick={onClick}
      className={classes}
    >
      {children}
    </button>
  );
}
