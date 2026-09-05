import Image from "next/image";
import { mediaPath } from "@/lib/media";

const ITEMS = [
  {
    src: mediaPath("/atlas-media/atlas-photo-03-hd.png"),
    alt: "Chairs stacked for a full floor clean at an office site",
    caption: "office floor clean",
  },
  {
    src: mediaPath("/atlas-media/atlas-photo-05-hd.png"),
    alt: "A cleaned kitchen appliance detail",
    caption: "appliance detail",
  },
];

export default function IndustriesPan() {
  return (
    <div className="grid grid-cols-2 gap-3">
      {ITEMS.map((item) => (
        <div
          key={item.src}
          className="relative aspect-[4/3] overflow-hidden"
        >
          <Image
            src={item.src}
            alt={item.alt}
            fill
            className="object-cover"
            sizes="(min-width: 768px) 25vw, 45vw"
          />
          <span className="absolute bottom-0 left-0 bg-white/75 px-2 py-[5px] font-mono text-[10.5px] text-[#14170F]/55">
            {item.caption}
          </span>
        </div>
      ))}
    </div>
  );
}
