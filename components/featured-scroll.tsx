import TripCard from "./card/trip-card";

export default function FeaturedScroll({ activities }: { activities: any[] }) {
  return (
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 pb-24">
        {activities.map((activity: any) => (
          <TripCard key={activity.id} trip={activity} />
        ))}
      </div>
  );
}
