import { TripData } from "@/app/types/trip-data";
import { decodeHtmlEntities } from "@/lib/html-decoder";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function TripFaq({ trip }: { trip: TripData }) {
  const groups = trip.faq?.filter((g) => g.items?.length);
  if (!groups?.length) return null;

  return (
    <section id="faqs" className="container mx-auto  scroll-mt-24">
        <h2 className="font-bold text-3xl md:text-4xl text-ink">
          Frequently asked Questions.
        </h2>
      <div className="">
        <div className="md:col-span-2 space-y-10">
          {groups.map((group, gi) => (
            <div key={gi}>
              {groups.length > 1 && (
                <h3 className="font-bold text-xl text-ink mb-2">
                  {group.title}
                </h3>
              )}
              <Accordion type="single" collapsible className="w-full">
                {group.items.map((item, i) => (
                  <AccordionItem
                    key={i}
                    value={`${gi}-${i}`}
                    className="border-border"
                  >
                    <AccordionTrigger className="text-left font-semibold text-lg md:text-xl text-ink hover:no-underline py-3">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">
                      <div
                        className="prose prose-base max-w-none"
                        dangerouslySetInnerHTML={{
                          __html: decodeHtmlEntities(item.a),
                        }}
                      />
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
