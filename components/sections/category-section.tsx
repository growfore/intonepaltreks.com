import Link from "next/link";
import Section from "@/components/section";
import SectionHeading from "@/components/section-heading";

const CATEGORIES = [
  {
    handle: "treks-in-nepal",
    name: "Treks in Nepal",
    image: "/images/annapurna.jpg",
  },
  {
    handle: "tours-in-nepal",
    name: "Tours in Nepal",
    image: "/images/local-experience.jpg",
  },
  {
    handle: "hikes",
    name: "Hikes",
    image: "/images/guide.jpg",
  },
  {
    handle: "adventure-sports",
    name: "Adventure Sports",
    image: "/images/adventure-sports.jpg",
  },
  {
    handle: "homestays",
    name: "Homestays",
    image: "/images/teahouse.jpg",
  },
];

export default function CategorySection() {
  return (
    <Section className="bg-canvas">
      <SectionHeading
        align="left"
        eyebrow="Ways to travel"
        title={
          <>
            Find your path in the Himalayas.
          </>
        }
        subtitle="Selected experiences curated for the soul of the adventurer."
      />

      <div className="flex overflow-x-auto scrollbar-hide gap-5 -mx-4 px-4 pb-4 md:gap-6 md:px-8">

        {CATEGORIES.map((category) => (
          <Link
            key={category.handle}
            href={`/explore?category=${category.handle}`}
            className="group relative flex flex-col w-[calc(100vw-48px)] max-w-[calc(100vw-48px)] shrink-0 md:w-72 md:max-w-72"
          >
            <div className="relative aspect-4/3 w-full shrink-0 overflow-hidden rounded-2xl">
              <div
                className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url(${category.image})` }}
              />
              <span className="absolute inset-0 bg-ink/10 opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
            <div className="mt-3.5 px-1">
              <h3 className="text-base font-semibold text-ink line-clamp-1">
                {category.name}
              </h3>
            </div>
          </Link>
        ))}


        <Link
          href="/design-your-trip"
          className="group relative flex flex-col w-[calc(100vw-48px)] max-w-[calc(100vw-48px)] shrink-0 md:w-72 md:max-w-72"
        >
          <div className="relative aspect-4/3 w-full shrink-0 overflow-hidden rounded-2xl bg-primary/10 flex items-center justify-center">
            <span className="text-5xl text-primary/40 group-hover:rotate-3 group-hover:scale-110 transition-transform duration-500">
              +
            </span>
            <span className="absolute inset-0 bg-ink/10 opacity-0 transition-opacity group-hover:opacity-100" />
          </div>
          <div className="mt-3.5 px-1">
            <h3 className="text-base font-semibold text-ink line-clamp-1">
              Custom Treks
            </h3>
          </div>
        </Link>
      </div>
    </Section>
  );
}
