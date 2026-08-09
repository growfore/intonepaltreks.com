"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import TripCard from "@/components/card/trip-card";
import { Input } from "@/components/ui/input";
import { LucideSearch, LucideSlidersHorizontal, LucideX } from "lucide-react";

const DIFFICULTIES = [
  { value: "EASY", label: "Easy" },
  { value: "MODERATE", label: "Moderate" },
  { value: "CHALLENGING", label: "Challenging" },
  { value: "STRENUOUS", label: "Strenuous" },
];

function extractNumber(val: string) {
  const n = parseInt(val);
  return isNaN(n) ? null : n;
}

function parseDuration(duration: string): number | null {
  const match = duration.match(/(\d+)/);
  return match ? parseInt(match[1]) : null;
}

type TripItem = { id: string; title: string; slug: string; canonicalPath?: string; duration: string; price: number; difficultyLevel: string; images: string[]; keywords: string[] };
type CategoryItem = { id: string; categoryHandle: string; categoryName: string; categoryImage: string | null };

export default function ExploreClient({ trips: initialTrips, categories, initialCategory, initialSearch }: { trips: TripItem[]; categories: CategoryItem[]; initialCategory?: string; initialSearch?: string }) {
  const router = useRouter();
  const [categoryTrips, setCategoryTrips] = useState<TripItem[] | null>(null);
  const [search, setSearch] = useState(initialSearch ?? "");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>(
    [],
  );
  const [durationMin, setDurationMin] = useState("");
  const [durationMax, setDurationMax] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory ?? "");

  const syncedCategoryRef = useRef(initialCategory ?? "");
  useEffect(() => {
    if (syncedCategoryRef.current === selectedCategory) return;
    syncedCategoryRef.current = selectedCategory;
    const params = new URLSearchParams();
    if (selectedCategory) params.set("category", selectedCategory);
    const qs = params.toString();
    router.replace(`/explore${qs ? `?${qs}` : ""}`, { scroll: false });
  }, [selectedCategory, router]);

  useEffect(() => {
    if (!selectedCategory) return;
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/activity?category=${selectedCategory}&limit=50`,
        );
        const json = await res.json();
        if (!cancelled) setCategoryTrips(json.data ?? []);
      } catch {
        if (!cancelled) setCategoryTrips([]);
      }
    })();
    return () => { cancelled = true; };
  }, [selectedCategory]);

  const trips = categoryTrips === null ? initialTrips : categoryTrips;

  const filtered = useMemo(() => {
    return trips.filter((trip: TripItem) => {
      const q = search.toLowerCase();
      if (
        q &&
        !trip.title.toLowerCase().includes(q) &&
        !(trip.keywords || []).some((k: string) => k.toLowerCase().includes(q))
      ) {
        return false;
      }

      const pMin = extractNumber(priceMin);
      const pMax = extractNumber(priceMax);
      const price = trip.price;
      if (pMin !== null && price < pMin) return false;
      if (pMax !== null && price > pMax) return false;

      if (
        selectedDifficulties.length > 0 &&
        !selectedDifficulties.includes(trip.difficultyLevel)
      )
        return false;

      const days = parseDuration(trip.duration);
      const dMin = extractNumber(durationMin);
      const dMax = extractNumber(durationMax);
      if (days !== null) {
        if (dMin !== null && days < dMin) return false;
        if (dMax !== null && days > dMax) return false;
      }

      return true;
    });
  }, [trips, search, priceMin, priceMax, selectedDifficulties, durationMin, durationMax]);

  const toggleDifficulty = (d: string) => {
    setSelectedDifficulties((prev) =>
      prev.includes(d) ? prev.filter((x) => x !== d) : [...prev, d],
    );
  };

  const clearFilters = () => {
    setPriceMin("");
    setPriceMax("");
    setSelectedDifficulties([]);
    setDurationMin("");
    setDurationMax("");
    setSelectedCategory("");
  };

  const hasFilters =
    priceMin || priceMax || selectedDifficulties.length > 0 || durationMin || durationMax || selectedCategory;

  return (
    <div className="min-h-screen bg-canvas-soft">
      <div className="bg-canvas border-b border-hairline">
        <div className="max-w-[1400px] mx-auto px-4 md:px-8 pt-14 md:pt-20 pb-10">
          <h1 className="mt-3 font-display text-4xl md:text-6xl text-ink leading-[1.05]">
            Find Your Next Adventure
          </h1>
          <p className="mt-4 max-w-xl text-base md:text-lg text-mute">
            Browse our complete collection of Nepal trekking adventures — from
            Annapurna to Everest, find the perfect Himalayan trek for your
            skill level and schedule.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className="relative mt-8 max-w-xl"
          >
            <LucideSearch className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-mute" />
            <Input
              placeholder="Search trips by name or keyword..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-12 h-12 text-base border-hairline bg-canvas shadow-card rounded-sm"
            />
          </form>
        </div>
      </div>

        <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-8">
        <div className="flex gap-8 relative">
          {/* Sidebar */}
          <aside
            className={`md:w-64 shrink-0 md:block md:sticky md:top-24 md:self-start ${
              sidebarOpen
                ? "fixed inset-0 z-50 bg-canvas p-6 overflow-y-auto"
                : "hidden"
            }`}
          >
            <div className="flex items-center justify-between mb-6 md:hidden">
              <span className="font-semibold text-ink">Filters</span>
              <button onClick={() => setSidebarOpen(false)}>
                <LucideX className="size-5" />
              </button>
            </div>

            <div className="space-y-8">
              {/* Category */}
              <div>
                <h4 className="text-xs font-medium uppercase tracking-widest text-mute mb-3">
                  Category
                </h4>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 text-sm text-body cursor-pointer hover:text-ink transition-colors">
                    <input
                      type="radio"
                      name="category"
                      checked={selectedCategory === ""}
                      onChange={() => setSelectedCategory("")}
                      className="size-4 accent-link border-hairline"
                    />
                    All Categories
                  </label>
                  {categories
                    .filter((cat: CategoryItem) => cat.categoryHandle !== "default")
                    .map((cat: CategoryItem) => (
                      <label
                        key={cat.id}
                        className="flex items-center gap-3 text-sm text-body cursor-pointer hover:text-ink transition-colors"
                      >
                        <input
                          type="radio"
                          name="category"
                          checked={selectedCategory === cat.categoryHandle}
                          onChange={() => setSelectedCategory(cat.categoryHandle)}
                          className="size-4 accent-link border-hairline"
                        />
                        {cat.categoryName}
                      </label>
                    ))}
                </div>
              </div>

              {/* Price */}
              <div>
                <h4 className="text-xs font-medium uppercase tracking-widest text-mute mb-3">
                  Price Range
                </h4>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    placeholder="Min"
                    value={priceMin}
                    onChange={(e) => setPriceMin(e.target.value)}
                    className="h-9 text-sm"
                  />
                  <span className="text-mute text-xs">&ndash;</span>
                  <Input
                    type="number"
                    placeholder="Max"
                    value={priceMax}
                    onChange={(e) => setPriceMax(e.target.value)}
                    className="h-9 text-sm"
                  />
                </div>
              </div>

              {/* Difficulty */}
              <div>
                <h4 className="text-xs font-medium uppercase tracking-widest text-mute mb-3">
                  Difficulty
                </h4>
                <div className="space-y-2">
                  {DIFFICULTIES.map((d) => (
                    <label
                      key={d.value}
                      className="flex items-center gap-3 text-sm text-body cursor-pointer hover:text-ink transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={selectedDifficulties.includes(d.value)}
                        onChange={() => toggleDifficulty(d.value)}
                        className="size-4 accent-link border-hairline"
                      />
                      {d.label}
                    </label>
                  ))}
                </div>
              </div>

              {/* Duration */}
              <div>
                <h4 className="text-xs font-medium uppercase tracking-widest text-mute mb-3">
                  Duration (Days)
                </h4>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    placeholder="Min"
                    value={durationMin}
                    onChange={(e) => setDurationMin(e.target.value)}
                    className="h-9 text-sm"
                  />
                  <span className="text-mute text-xs">&ndash;</span>
                  <Input
                    type="number"
                    placeholder="Max"
                    value={durationMax}
                    onChange={(e) => setDurationMax(e.target.value)}
                    className="h-9 text-sm"
                  />
                </div>
              </div>

              {hasFilters && (
                <button
                  onClick={clearFilters}
                  className="text-xs font-medium uppercase tracking-widest text-link hover:text-link-deep transition-colors"
                >
                  Clear all filters
                </button>
              )}
            </div>
          </aside>

          {/* Overlay for mobile sidebar */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-ink/30 z-40 md:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          {/* Main content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-body">
                {filtered.length}{" "}
                {filtered.length === 1 ? "trip" : "trips"} found
              </p>
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="flex items-center gap-2 text-sm text-body hover:text-ink transition-colors md:hidden"
              >
                <LucideSlidersHorizontal className="size-4" />
                Filters
              </button>
            </div>

            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 justify-items-center">
                {filtered.map((trip: TripItem) => (
                  <TripCard trip={trip} key={trip.id} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center w-full py-16 gap-2 text-center">
                <LucideSearch className="size-10 text-mute" />
                <p className="text-base font-medium text-ink">No trips found</p>
                <p className="text-sm text-body">
                  Try adjusting your filters or search terms.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
