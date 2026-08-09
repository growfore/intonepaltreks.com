import { TripData } from "@/app/types/trip-data";
import { decodeHtmlEntities } from "@/lib/html-decoder";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  LucideBedDouble,
  LucideChefHat,
  LucideChevronDown,
  LucideChevronUp,
  LucideClock,
  LucideRuler,
} from "lucide-react";

const DAY_PREFIX = /^Day\s*\d+:\s*/i;

function splitDayTitle(title: string) {
  const match = title.match(/^(Day\s*\d+):\s*/i);
  if (!match) return { label: null, rest: title };
  return { label: match[1], rest: title.slice(match[0].length) };
}

interface TripItineraryProps {
  trip: TripData;
}

export function TripItinerary({ trip }: TripItineraryProps) {
  return (
    <div id="itinerary" className="scroll-mt-28">
      <h2 className="mb-6 text-xl font-semibold text-ink md:text-2xl">
        Day-by-Day Itinerary
      </h2>

      <Accordion type="multiple" className="divide-y divide-hairline">
        {trip.itinerary.map((day, index) => {
            const { label, rest } = splitDayTitle(day.title);
            return (
              <AccordionItem
                key={index}
                value={index.toString()}
                className="border-none"
              >
                <AccordionTrigger className="rounded-none py-5 text-left hover:no-underline [&>svg]:size-5 [&>svg]:text-mute">
                  <span className="flex flex-1 items-baseline gap-3 pr-2">
                    <span className="shrink-0 text-xs font-bold uppercase tracking-wider text-link">
                      {label ?? `Day ${day.day || index + 1}`}
                    </span>
                    <span className="flex-1 text-base font-semibold text-ink md:text-lg">
                      {rest}
                    </span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-6 text-base text-ink/80">
                  <div
                    className="space-y-4 leading-relaxed
                      prose-headings:font-bold prose-headings:text-ink
                      prose-h3:text-xl prose-h4:text-lg
                      prose-p:leading-relaxed prose-a:text-link prose-a:underline
                      prose-li:text-ink/80 prose-strong:text-ink
                      prose-img:rounded-2xl prose-img:my-6
                      prose max-w-none"
                    dangerouslySetInnerHTML={{
                      __html: decodeHtmlEntities(day.description),
                    }}
                  />

                  {(day?.duration ||
                    (day?.accommodations && day.accommodations?.length > 0) ||
                    day?.ascent ||
                    day?.descent ||
                    day?.distance ||
                    (day?.meals && day.meals?.length > 0)) && (
                    <div className="mt-6 grid gap-3 bg-canvas-soft p-4 sm:grid-cols-2">
                      {day?.duration && (
                        <InfoRow
                          icon={<LucideClock className="size-4" />}
                          text={day.duration}
                        />
                      )}
                      {day?.distance && (
                        <InfoRow
                          icon={<LucideRuler className="size-4" />}
                          text={`Distance: ${day.distance}`}
                        />
                      )}
                      {day?.ascent && (
                        <InfoRow
                          icon={<LucideChevronUp className="size-4 text-green-600" />}
                          text={`Ascent: ${day.ascent}`}
                        />
                      )}
                      {day?.descent && (
                        <InfoRow
                          icon={<LucideChevronDown className="size-4 text-red-600" />}
                          text={`Descent: ${day.descent}`}
                        />
                      )}
                      {day.accommodations && day.accommodations?.length > 0 && (
                        <InfoRow
                          icon={<LucideBedDouble className="size-4" />}
                          text={`Accommodation: ${day.accommodations.join(", ")}`}
                        />
                      )}
                      {day.meals && day.meals?.length > 0 && (
                        <InfoRow
                          icon={<LucideChefHat className="size-4" />}
                          text={`Meals: ${day.meals.join(", ")}`}
                        />
                      )}
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
            );
          })}
      </Accordion>
    </div>
  );
}

function InfoRow({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-2 text-sm text-ink">
      <span className="text-link">{icon}</span>
      <span>{text}</span>
    </div>
  );
}
