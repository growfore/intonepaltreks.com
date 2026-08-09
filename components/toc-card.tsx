"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function TocCard() {
  const [headings, setHeadings] = useState<{ [id: string]: string }>({});

  useEffect(() => {
    const timer = setTimeout(() => {
      const h2Elements = Array.from(document.querySelectorAll("h2"));

      const map: { [id: string]: string } = {};

      for (const h of h2Elements) {
        if (!h.id) {
          h.id =
            h.textContent
              ?.toLowerCase()
              .replaceAll(/[^\w]+/g, "-") // replace spaces/symbols
              .replaceAll(/^-|-$/g, "") || "";
        }

        map[h.id] = h.textContent?.trim() || "";
      }

      setHeadings(map);
    }, 100); // Small delay to ensure content is rendered

    return () => clearTimeout(timer);
  }, []);

  if (Object.keys(headings).length === 0) {
    return null;
  }

  return (
    <Accordion
      type="single"
      collapsible
      className="m-4 w-full! rounded-sm border p-4 bg-accent/60 backdrop-blur-md col-span-2 sticky top-24 self-start hidden md:block"
      defaultValue="item-1"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <h3 className="font-semibold text-base md:text-xl">In this page:</h3>
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance text-sm md:text-lg">
          <ScrollArea className="h-72">
            <ul className="space-y-1">
              {Object.entries(headings).map(([id, text]) => (
                <li
                  key={id}
                  className="flex items-start border-b border-dashed"
                >
                  <span className="mx-2">-</span>
                  <a
                    href={`#${id}`}
                    className="hover:underline  hover:text-primary transition-colors"
                  >
                    {text}
                  </a>
                </li>
              ))}
            </ul>
          </ScrollArea>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
