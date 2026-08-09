import { TripData } from "@/app/types/trip-data";
import {
  LucideClock,
  LucideGauge,
  LucideUsers,
  LucideMapPin,
  LucideIcon,
  LucideMountain,
  LucideTentTree,
  LucideMap,
  LucideBus,
  LucideHandPlatter,
  LucideSunMoon,
} from "lucide-react";
import PricingCardSidebar from "@/components/card/pricing-card";

interface TripOverviewProps {
  trip: TripData;
}
export function TripOverview({ trip }: TripOverviewProps) {
  return (
    <div id="overview" className="space-y-8 mt-4">
      {/* AT A GLANCE Section */}
      <div>
        <div className="text-sm font-semibold uppercase tracking-widest text-mute mb-4">
          At a Glance
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-6 bg-canvas border border-hairline p-6 rounded-2xl">
          {/* Duration */}
          {trip.duration && (
            <GlanceItem
              text="Duration"
              icon={LucideClock}
              value={trip.duration}
            />
          )}
          {trip.difficultyLevel && (
            <GlanceItem
              text="Trip Grade"
              icon={LucideGauge}
              value={trip.difficultyLevel}
            />
          )}
          {trip.groupSize && (
            <GlanceItem
              text="Group Size"
              icon={LucideUsers}
              value={trip.groupSize ?? "-"}
            />
          )}
          {trip.meetingPoint && (
            <GlanceItem
              text="Start"
              icon={LucideMapPin}
              value={trip.meetingPoint ?? "-"}
            />
          )}
          {trip.dropOffPoint && (
            <GlanceItem
              text="End"
              icon={LucideMapPin}
              value={trip.dropOffPoint ?? "-"}
            />
          )}

          {trip.maxAltitude && (
            <GlanceItem
              text="Max Altitude"
              icon={LucideMountain}
              value={trip.maximumAltitude ?? "-"}
            />
          )}

          {trip.accommodations && (
            <GlanceItem
              text="Accommodations"
              icon={LucideTentTree}
              value={trip.accommodations.join(", ") ?? "-"}
            />
          )}

          {trip.transportation && (
            <GlanceItem
              text="Transportation"
              icon={LucideBus}
              value={trip?.transportation ?? "-"}
            />
          )}
          {trip.meals && (
            <GlanceItem
              text="Meals"
              icon={LucideHandPlatter}
              value={trip?.meals ?? "-"}
            />
          )}

          {trip.bestSeason && (
            <GlanceItem
              text="Best Seasons"
              icon={LucideSunMoon}
              value={trip?.bestSeason ?? "-"}
            />
          )}
          {trip.locations && trip.locations.length > 0 && (
            <GlanceItem
              text="Locations"
              icon={LucideMap}
              value={trip.locations.join(", ") ?? "-"}
            />
          )}
        </div>
      </div>

      <div className="md:hidden">
        <PricingCardSidebar
          slug={trip.slug}
          title={trip.title}
          price={trip.price}
          maxPrice={trip.maxPrice}
        />
      </div>
    </div>
  );
}

function GlanceItem({
  icon: Icon,
  text,
  value,
}: {
  icon: LucideIcon;
  text: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <Icon className="size-6 shrink-0 text-link" strokeWidth={2} />
      <div>
        <p className="text-mute text-xs font-medium uppercase tracking-wider">{text}</p>
        <p className="font-semibold text-ink">{value}</p>
      </div>
    </div>
  );
}
