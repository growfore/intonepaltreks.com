import TripCard from "./card/trip-card";
import { Button } from "./ui/button";
import Link from "next/link";

export default function FeaturedScroll({ activities }: { activities: any[] }) {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {activities.map((activity: any) => (
          <TripCard key={activity.id} trip={activity} />
        ))}
      </div>

      <div className="flex items-center justify-center gap-3 mt-8">
        <Link href="/explore">
          <Button variant="outline">Explore all</Button>
        </Link>
      </div>
    </>
  );
}
