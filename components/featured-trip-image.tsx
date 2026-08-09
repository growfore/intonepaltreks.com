"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { getFullImageUrl } from "@/lib/getFullImageUrl";

export function FeaturedTripImage({ images, title }: { images: string[]; title: string }) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  if (images.length === 0) {
    return <div className="aspect-[4/3] w-full bg-ink/5" />;
  }

  const rotations = images.map((_, i) => {
    const base = [-6, 4, -3, 7, -5];
    return base[i % base.length];
  });

  return (
    <div className="relative aspect-[4/3] w-full">
      <div className="absolute -inset-4 border border-hairline -z-10 translate-x-2 translate-y-2" />
      <div className="relative h-full w-full">
        {images.map((src, i) => {
          const isHovered = hoveredIdx === i;
          const isDimmed = hoveredIdx !== null && !isHovered;
          const offsetX = (i - (images.length - 1) / 2) * 12;

          return (
            <motion.div
              key={i}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              className="absolute cursor-pointer"
              style={{
                width: "90%",
                height: "90%",
                top: "5%",
                zIndex: isHovered ? images.length : i,
              }}
              animate={{
                rotate: isHovered ? 0 : rotations[i],
                scale: isHovered ? 1.05 : isDimmed ? 0.9 : 1,
                opacity: isDimmed ? 0.35 : 1,
                x: isHovered ? 0 : offsetX,
                y: isHovered ? -8 : 0,
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <div className="h-full w-full overflow-hidden shadow-lg rounded-2xl border border-hairline bg-canvas">
                <Image
                  src={getFullImageUrl(src)}
                  fill
                  alt={`${title} ${i + 1}`}
                  unoptimized
                  className="object-cover"
                  sizes="(max-width: 768px) 40vw, 30vw"
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
