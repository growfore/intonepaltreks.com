"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ChevronLeft, ChevronRight, Clock, Gauge } from "lucide-react";
import { motion } from "framer-motion";
import { getFullImageUrl } from "@/lib/getFullImageUrl";

type Trip = {
  title: string;
  slug: string;
  canonicalPath?: string;
  duration: string;
  price: number;
  difficultyLevel: string;
  images: string[];
  keywords: string[];
};

export default function TripCard({ trip }: { trip: Trip }) {
  const title = trip.title.split(":")[0];
  const images = trip.images ?? [];
  const [imageIndex, setImageIndex] = useState(0);

  const step = (dir: "prev" | "next") => {
    if (images.length < 2) return;
    setImageIndex(
      (dir === "next"
        ? imageIndex + 1
        : imageIndex - 1 + images.length) % images.length,
    );
  };

  const href = `/package/${trip.canonicalPath || trip.slug}`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      className="min-w-56 md:min-w-72  h-full"
    >
      <div className="group flex h-full flex-col gap-y-3">
        <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl bg-canvas-soft-2">
          <Link href={href} aria-label={title} className="block h-full w-full">
            <Image
              key={imageIndex}
              src={images[imageIndex] ? getFullImageUrl(images[imageIndex]) : ""}
              alt={trip.keywords[0] || title}
              width={600}
              height={450}
              unoptimized
              className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105 animate-in fade-in-0 duration-300"
            />
          </Link>
          <span className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-2.5 py-0.5 text-xs font-medium text-ink backdrop-blur">
            <Gauge className="size-3" />
            {trip.difficultyLevel}
          </span>

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={() => step("prev")}
                className="absolute left-2 top-1/2 -translate-y-1/2 flex size-8 items-center justify-center rounded-full bg-white/90 text-ink shadow-sm transition-all hover:bg-white opacity-0 group-hover:opacity-100"
                aria-label="Previous image"
              >
                <ChevronLeft className="size-4" />
              </button>
              <button
                type="button"
                onClick={() => step("next")}
                className="absolute right-2 top-1/2 -translate-y-1/2 flex size-8 items-center justify-center rounded-full bg-white/90 text-ink shadow-sm transition-all hover:bg-white opacity-0 group-hover:opacity-100"
                aria-label="Next image"
              >
                <ChevronRight className="size-4" />
              </button>
              <span className="absolute bottom-3 right-3 rounded-full bg-black/60 px-2 py-0.5 text-xs font-medium text-white">
                {imageIndex + 1} / {images.length}
              </span>
            </>
          )}
        </div>

        <Link href={href} className="flex flex-col gap-y-1 px-1">
          <h3 className="text-sm sm:text-base font-semibold text-ink leading-snug line-clamp-2">
            {title}
          </h3>
          <p className="flex items-center gap-1.5 text-xs sm:text-sm text-mute">
            <Clock className="size-3.5" />
            {trip.duration}
          </p>
        </Link>

        <div className="mt-auto flex items-center justify-between px-1 pt-1.5">
          <p className="text-base sm:text-lg font-semibold text-ink">
            ${trip.price}
            <span className="text-xs sm:text-sm font-normal text-mute"> /person</span>
          </p>
          <Link
            href={href}
            className="inline-flex items-center gap-1 rounded-full border border-hairline-strong px-3.5 py-1.5 text-xs sm:text-sm font-medium text-ink transition-colors hover:border-ink hover:bg-ink hover:text-canvas"
          >
            Details
            <ChevronRight className="size-3" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
