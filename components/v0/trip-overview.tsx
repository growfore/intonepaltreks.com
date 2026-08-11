import { TripData } from "@/app/types/trip-data";
import {
  LucideClock,
  LucideGauge,
  LucideUsers,
  LucideMapPin,
  LucideIcon,
  LucideMountain,
  LucideHotel,
  LucideHamburger,
  LucideLanguages,
} from "lucide-react";

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
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-6 bg-tomato/5 p-6 rounded-sm">
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

          {trip.maximumAltitude && (
            <GlanceItem
              text="Max Altitude"
              icon={LucideMountain}
              value={`${trip.maximumAltitude} m`}
            />
          )}

          {trip.accommodations && (
            <GlanceItem
              text="Accommodations"
              icon={LucideHotel}
              value={trip.accommodations.join(", ") ?? "-"}
            />
          )}

          {trip.meals && trip.meals.length > 0 && (
            <GlanceItem
              text="Meals"
              icon={LucideHamburger}
              value={trip.meals.join(", ")}
            />
          )}

          {trip.languages && trip.languages.length > 0 && (
            <GlanceItem
              text="Languages"
              icon={LucideLanguages}
              value={trip.languages.join(", ")}
            />
          )}
        </div>
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
