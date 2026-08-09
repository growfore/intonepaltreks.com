import TripCard from "./card/trip-card";

export default function PackagesBlock({ packages }: { packages: any[] }) {
  return (
    <div className="my-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        {packages?.map((pkg, index) => (
          <TripCard key={index} trip={pkg} />
        ))}
      </div>
    </div>
  );
}
