import FeaturedScroll from "../featured-scroll";
import { decodeHtmlEntities } from "@/lib/html-decoder";
import Link from "next/link";
import { LucideArrowUpRight } from "lucide-react";
import SectionHeading from "../section-heading";

export default async function FeaturedSections({
  featuredTags,
}: {
  featuredTags: any;
}) {
  return (
    <section className="bg-primary/10 py-12">
      <div className="container mx-auto px-4 md:px-8 max-w-[1400px]">
        {featuredTags.map((tag: any, index: number) => {
          const name = tag.name.split("::")[0] || tag.name;
          return (
            <div key={index}  className="border-b">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 py-4">
                <div className="max-w-2xl">
                  <SectionHeading
                  align="left"
                  className="mb-0"
                  title={
                    <div className="font-bold">
                      {name}
                    </div>
                  }
                  subtitle={
                        <div
                          className="text-mute text-base leading-relaxed max-w-md"
                          dangerouslySetInnerHTML={{
                            __html: decodeHtmlEntities(tag.description),
                          }}
                        />
                  }
                  />
                </div>
                <Link
                  href={`/explore?category=${tag.slug}`}
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-semibold text-on-primary shadow-lg transition-colors hover:bg-primary/90 self-start md:self-auto"
                >
                  Explore
                  <LucideArrowUpRight className="size-4" />
                </Link>
              </div>
              <FeaturedScroll activities={tag.activity} />
            </div>
          );
        })}
      </div>
    </section>
  );
}
