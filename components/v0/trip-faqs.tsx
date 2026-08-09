import { TripData } from "@/app/types/trip-data";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { decodeHtmlEntities } from "@/lib/html-decoder";
import { LucideCircleQuestionMark } from "lucide-react";

interface TripFaqsProps {
  trip: TripData;
}

export function TripFaqs({ trip }: TripFaqsProps) {
  const groups = trip.faqs ?? [];
  if (groups.length === 0) return null;

  return (
    <div className="max-w-4xl py-12">
      <h2 className="not-prose font-bold -mt-1 flex gap-2 items-center text-2xl md:text-3xl text-ink">
        <LucideCircleQuestionMark className="size-8 text-primary" /> Frequently
        Asked Questions
      </h2>

      {groups.map((group, gi) => (
        <div key={gi} className="mt-8">
          <h3 className="font-display text-xl md:text-2xl text-ink mb-4">
            {group.category}
          </h3>
          <Accordion type="single" collapsible className="w-full">
            {group.faqs.map((faq, i) => (
              <AccordionItem key={i} value={`${gi}-${i}`}>
                <AccordionTrigger className="hover:no-underline font-bold text-base md:text-xl p-0 not-prose">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-lg not-prose">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: decodeHtmlEntities(faq.answer),
                    }}
                  />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      ))}
    </div>
  );
}
