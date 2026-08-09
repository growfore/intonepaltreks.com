import FeaturedScroll from "../featured-scroll";
import { decodeHtmlEntities } from "@/lib/html-decoder";

export default async function FeaturedSections({
  featuredTags,
}: {
  featuredTags: any;
}) {
  return (
    <section className="bg-canvas-soft py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-8 max-w-[1400px]">
        {featuredTags.map((tag: any, index: number) => {
          const name = tag.name.split("::")[0] || tag.name;
          return (
            <div key={index} className={index > 0 ? "mt-20" : ""}>
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div className="max-w-2xl">
                  <h2 className="text-display text-4xl md:text-6xl text-ink text-balance">
                    {name}
                  </h2>
                </div>
                {tag.description && (
                  <div
                    className="text-mute text-base max-w-sm leading-relaxed"
                    dangerouslySetInnerHTML={{
                      __html: decodeHtmlEntities(tag.description),
                    }}
                  />
                )}
              </div>
              <FeaturedScroll activities={tag.activity} />
            </div>
          );
        })}
      </div>
    </section>
  );
}
