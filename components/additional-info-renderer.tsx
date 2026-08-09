import { decodeHtmlEntities } from "@/lib/html-decoder";
import { slugify } from "@/lib/slugify";

export type AdditionalInfoItem = {
  title: string;
  description: string;
  slug?: string;
};

export const AdditionalInfoRenderer = ({
  item,
}: {
  item: AdditionalInfoItem;
  index: number;
}) => {
  const sectionId = item.slug || slugify(item.title);
  return (
    <>
      <h2 id={sectionId}>{item.title}</h2>
      <div
        dangerouslySetInnerHTML={{
          __html: decodeHtmlEntities(item.description),
        }}
      />
    </>
  );
};
