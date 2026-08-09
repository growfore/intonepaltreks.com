import { siteConfig } from "@/lib/siteConfig";
import Image from "next/image";
import Link from "next/link";
import { LucideCircle } from "lucide-react";

export default function TripAdvisorRatingBadge({
  light,
  inverse,
}: {
  light?: boolean;
  inverse?: boolean;
}) {
  return (
    <Link
      href={siteConfig.reviews.tripadvisor.link}
      target="_blank"
    >
      <div className="flex gap-2 md:gap-4">
        <Image
          src={"/assets/tripadvisoricon.png"}
          width={32}
          height={100}
          alt=""
          className={`object-contain h-auto w-auto size-5 md:size-8 ${light ? "brightness-0" : ""}`}
        />
        <div>
          <p
            className={`font-semibold text-xs md:text-base ${inverse ? "text-white" : "text-ink"}`}
          >
            Tripadvisor
          </p>
          <div
            className={`flex gap-0.5 md:gap-1 items-center font-semibold text-[10px] md:text-xs ${inverse ? "text-white" : "text-ink"}`}
          >
            {Array.from({ length: 5 }).map((_, l) => (
              <LucideCircle
                key={l}
                fill="green"
                className="size-2.5 md:size-3"
                stroke="green"
              />
            ))}
            Reviews {siteConfig.reviews.tripadvisor.rating}/5
          </div>
        </div>
      </div>
    </Link>
  );
}
