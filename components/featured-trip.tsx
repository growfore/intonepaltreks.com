import { FeaturedTripImage } from "./featured-trip-image";
import Link from "next/link";
import { LucideChevronRight } from "lucide-react";

export async function FeaturedTrip() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/featured/trip-of-the-month?includeActivity=true`,
    { next: { revalidate: 60 } },
  );
  const json = await res.json();

  const feature = json.data;
  const activity = feature.featuredTag.activity[0];

  const title = activity.title.split(":")[0];
  const images = activity.images ?? [];
  const duration = activity.duration;
  const price = activity.price;
  const description =
    activity.shortDescription ||
    activity.excerpt ||
    `Experience the majesty of the Himalayas with our expertly guided ${title.toLowerCase()} tour.`;

  return (
    <section className="relative overflow-hidden bg-canvas">
      <div className="mx-auto flex flex-col md:flex-row max-w-[1400px]">
        <div className="flex w-full md:w-1/2 items-center px-8 py-12 md:px-14 md:py-20">
          <div>
            <h2 className="mt-3 text-3xl md:text-4xl font-bold -tracking-[1.44px] leading-tight text-ink">
              {title}
            </h2>

            {description && (
              <p className="mt-4 text-base leading-relaxed text-mute md:text-lg max-w-md">
                {description}
              </p>
            )}

            <div className="mt-6 flex items-center gap-4">
              <div>
                <span className="text-xs font-medium uppercase tracking-wider text-mute">
                  Duration
                </span>
                <p className="text-sm font-bold text-ink">{duration}</p>
              </div>
              <div className="h-6 w-px bg-hairline" />
              <div>
                <span className="text-xs font-medium uppercase tracking-wider text-mute">
                  Price
                </span>
                <p className="text-sm font-bold text-ink">US ${price}</p>
              </div>
            </div>

            <div className="mt-8">
              <Link
                href={`/package/${activity.slug}`}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-on-primary shadow-lg transition-colors hover:bg-primary/90"
              >
                Explore Trip
                <LucideChevronRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>

        <div className="flex w-full md:w-1/2 items-center justify-center py-12 px-8 md:py-20 md:px-14">
          {images.length > 0 ? (
            <div className="w-full max-w-lg">
              <FeaturedTripImage images={images} title={title} />
            </div>
          ) : (
            <div className="aspect-[4/3] w-full bg-ink/5" />
          )}
        </div>
      </div>
    </section>
  );
}
