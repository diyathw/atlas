import Reveal from "./Reveal";

const ITEMS = [
  {
    label: "Consistent crews",
    icon: (
      <path d="M9 12a3 3 0 100-6 3 3 0 000 6zm7-1a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM2 20c0-3.31 3.13-6 7-6s7 2.69 7 6M16 14c3.31 0 6 2.24 6 5" />
    ),
  },
  {
    label: "Insured & vetted staff",
    icon: <path d="M12 2l8 3v6c0 5-3.4 8.7-8 11-4.6-2.3-8-6-8-11V5l8-3z" />,
  },
  {
    label: "Flexible scheduling",
    icon: (
      <>
        <rect x="3" y="4" width="18" height="17" rx="2" />
        <path d="M3 9h18M8 2v4M16 2v4" />
      </>
    ),
  },
  {
    label: "Quality control every visit",
    icon: <path d="M20 6L9 17l-5-5" />,
  },
];

export default function TrustRow() {
  return (
    <div className="border-b border-[#14170F]/10 bg-white px-6 py-8 sm:px-10">
      <Reveal>
        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {ITEMS.map((item) => (
            <div key={item.label} className="flex items-center gap-3">
              <span className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-[#E3E14A]/25 text-[#454F30]">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-[18px] w-[18px]"
                >
                  {item.icon}
                </svg>
              </span>
              <span className="text-[14px] font-medium text-[#14170F]">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </Reveal>
    </div>
  );
}
