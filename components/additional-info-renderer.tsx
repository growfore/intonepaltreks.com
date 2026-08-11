"use client";

import { decodeHtmlEntities } from "@/lib/html-decoder";
import { slugify } from "@/lib/slugify";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
    <Accordion type="single" collapsible>
      <AccordionItem value={sectionId} className="border-border">
        <AccordionTrigger
          id={sectionId}
          className="text-left font-bold text-xl text-ink hover:no-underline py-3"
        >
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="text-muted-foreground leading-relaxed">
          <div
            className="prose prose-base max-w-none"
            dangerouslySetInnerHTML={{
              __html: decodeHtmlEntities(item.description),
            }}
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
