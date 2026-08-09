"use client";

import { useState } from "react";
import { TripData } from "@/app/types/trip-data";
import { decodeHtmlEntities } from "@/lib/html-decoder";
import { cn } from "@/lib/utils";
import {
  LucideBedDouble,
  LucideChefHat,
  LucideChevronDown,
  LucideChevronUp,
  LucideClock,
  LucideMapPin,
} from "lucide-react";

function splitDayTitle(title: string) {
  const match = title.match(/^Day\s*(\d+)[:\s-]*/i);
  if (!match) return { dayNumber: null, rest: title };
  return { dayNumber: match[1], rest: title.slice(match[0].length) };
}

interface TripItineraryProps {
  trip: TripData;
}

export function TripItinerary({ trip }: TripItineraryProps) {
  const variants = trip.itinerary ?? [];
  const defaultIdx = variants.findIndex((v) => v.isDefault);
  const [activeIdx, setActiveIdx] = useState(defaultIdx >= 0 ? defaultIdx : 0);
  const active = variants[activeIdx];
  const days = active?.days ?? [];

  return (
    <div id="itinerary" className="scroll-mt-28">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="mt-2 text-3xl md:text-4xl font-display text-ink">
            Day by Day Itinerary
          </h2>
        </div>
        {variants.length > 1 && (
          <div className="flex flex-wrap gap-2">
            {variants.map((v, i) => (
              <button
                key={v.id}
                onClick={() => setActiveIdx(i)}
                className={cn(
                  "rounded-sm px-4 py-2 text-sm font-semibold transition-colors",
                  i === activeIdx
                    ? "bg-link text-white"
                    : "border border-hairline text-ink hover:bg-canvas-soft",
                )}
              >
                {v.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {days.map((day, index) => {
        const { dayNumber, rest } = splitDayTitle(day.title);
        return (
          <DayRow
            key={`${active.id}-${index}`}
            day={day}
            dayNo={dayNumber ?? String(day.day || index + 1)}
            title={rest}
            isLast={index === days.length - 1}
            defaultOpen={index === 0}
          />
        );
      })}
    </div>
  );
}

function DayRow({
  day,
  dayNo,
  title,
  isLast,
  defaultOpen,
}: {
  day: TripData["itinerary"][number]["days"][number];
  dayNo: string;
  title: string;
  isLast: boolean;
  defaultOpen: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  const stats = [
    day.duration && {
      icon: <LucideClock className="size-3.5" />,
      label: "Duration",
      value: day.duration,
    },
    day.distance && {
      icon: <LucideMapPin className="size-3.5" />,
      label: "Distance",
      value: day.distance,
    },
    day.ascent && {
      icon: <LucideChevronUp className="size-3.5 text-green-600" />,
      label: "Ascent",
      value: day.ascent,
    },
    day.descent && {
      icon: <LucideChevronDown className="size-3.5 text-red-600" />,
      label: "Descent",
      value: day.descent,
    },
    (day.meals?.length ?? 0) > 0 && {
      icon: <LucideChefHat className="size-3.5" />,
      label: "Meals",
      value: day.meals!.join(", "),
    },
    (day.accommodations?.length ?? 0) > 0 && {
      icon: <LucideBedDouble className="size-3.5" />,
      label: "Stay",
      value: day.accommodations!.join(", "),
    },
  ].filter(Boolean) as { icon: React.ReactNode; label: string; value: string }[];

  return (
    <div className="relative grid grid-cols-[auto_1fr] gap-4 md:gap-6">
      <div className="relative flex flex-col items-center pt-1.5">
        <div className="size-2.5 rounded-full bg-link shrink-0" />
        {!isLast && (
          <div className="flex-1 w-px bg-hairline mt-2 mb-2 min-h-10" />
        )}
      </div>

      <div className={isLast ? "pb-1" : "pb-8"}>
        <p className="text-[11px] uppercase tracking-[0.24em] text-mute mb-1">
          Day {dayNo}
        </p>
        <h3 className="font-display text-xl md:text-2xl text-ink mb-3">
          {title}
        </h3>

        {stats.length > 0 && (
          <div className="flex flex-wrap gap-x-6 gap-y-2 mb-4">
            {stats.map((s) => (
              <span
                key={s.label}
                className="inline-flex items-center gap-1.5 text-sm md:text-md font-medium text-mute"
              >
                <span className="text-link">{s.icon}</span>
                <span className="uppercase tracking-[0.14em]">{s.label}:</span>
                <span className="text-ink">{s.value}</span>
              </span>
            ))}
          </div>
        )}

        <button
          onClick={() => setOpen((v) => !v)}
          className="inline-flex items-center gap-2 text-sm text-link hover:text-link-deep transition-colors border-b border-link/30 hover:border-link pb-0.5"
        >
          {open ? "Hide details" : "View full day"}
          <LucideChevronDown
            className={`size-4 transition-transform duration-300 ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>

        <div
          className={`grid transition-all duration-500 ease-smooth ${
            open ? "grid-rows-[1fr] opacity-100 " : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <div className="bg-canvas-soft  space-y-4">
              <div
                className="prose max-w-none prose-p:leading-relaxed prose-p:text-ink prose-a:text-link prose-a:underline prose-strong:text-ink prose-headings:text-ink prose-headings:font-bold prose-img:rounded-md prose-img:my-5 prose-li:text-ink"
                dangerouslySetInnerHTML={{
                  __html: decodeHtmlEntities(day.description),
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
