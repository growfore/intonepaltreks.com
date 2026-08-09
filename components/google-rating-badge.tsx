import { siteConfig } from "@/lib/siteConfig";
import Image from "next/image";
import Link from "next/link";
import { LucideStar } from "lucide-react";

export default function GoogleRatingBadge({
  inverse,
}: {
  inverse?: boolean;
}) {
  return (
    <Link
      href="https://www.google.com/maps/search/?api=1&query=Into+Nepal+Treks+Pokhara"
      target="_blank"
    >
      <div className="flex gap-2 md:gap-4">
        <Image
          src={"/assets/googleicon.png"}
          width={32}
          height={100}
          alt=""
          className="object-contain h-auto w-auto size-5 md:size-8"
        />
        <div>
          <p className={`font-semibold text-xs md:text-base ${inverse ? "text-white" : "text-ink"}`}>Google</p>
          <div className={`flex gap-0.5 md:gap-1 items-center font-semibold text-[10px] md:text-xs ${inverse ? "text-white" : "text-ink"}`}>
            {Array.from({ length: 5 }).map((_, l) => (
              <LucideStar key={l} fill={inverse ? "white" : "orange"} className="size-2.5 md:size-3" stroke={inverse ? "white" : "orange"} />
            ))}
            Reviews {siteConfig.reviews.googleReview.rating}/5
          </div>
        </div>
      </div>
    </Link>
  );
}
