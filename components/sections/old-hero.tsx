"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { Search } from "lucide-react";

const HeroSection = () => {
  const router = useRouter();
  const [q, setQ] = useState("");

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const term = q.trim();
    router.push(term ? `/explore?q=${encodeURIComponent(term)}` : "/explore");
  };

  return (
    <section className="relative h-[92vh] min-h-[640px] w-full overflow-hidden">
      <Image
        src="/images/tilicho.jpg"
        alt="Himalayan adventure"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 gradient-hero" />

      <div className="relative z-10 h-full container mx-auto max-w-[1400px] px-4 flex flex-col items-center justify-center text-center pt-16">
        <p className="text-white/90 text-[11px] uppercase tracking-[0.32em] mb-6">
          Private &amp; customised Nepal journeys since 2012
        </p>
        <h1 className="text-display text-white text-5xl sm:text-5xl  md:text-8xl max-w-5xl text-balance">
          Explore the <br />
          Himalaya with Into Nepal
        </h1>
        <p className="text-white/85 text-base md:text-lg max-w-xl mt-6 md:mt-8 mb-10 text-balance px-4">
          Hand-crafted treks and tours across Nepal — designed by certified
          local guides who call the mountains home.
        </p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 z-20 container mx-auto max-w-[1400px] px-4 pb-10 md:pb-14 translate-y-1/2">
        <form
          onSubmit={submitSearch}
          className="bg-canvas/95 backdrop-blur-md shadow-float rounded-sm border border-hairline p-2 flex items-stretch gap-2 w-full max-w-2xl mx-auto"
        >
          <div className="flex-1 flex items-center gap-3 px-4 py-3">
            <Search className="w-4 h-4 text-link" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search by trip name, e.g. 'Everest Base Camp'"
              className="flex-1 bg-transparent outline-none text-ink placeholder:text-mute text-sm"
            />
          </div>
          <button
            type="submit"
            className="bg-link text-white hover:bg-link-deep transition-colors rounded-sm px-6 py-3 flex items-center justify-center gap-2 text-sm font-medium tracking-wide"
          >
            <Search className="w-4 h-4" />
            <span className="hidden sm:inline">Search</span>
          </button>
        </form>
      </div>
    </section>
  );
};

export default HeroSection;
