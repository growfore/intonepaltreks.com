import type { Metadata } from "next";
import Link from "next/link";
import { Home, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description:
    "The page you are looking for does not exist or has been moved. Explore Into Nepal Treks for amazing Himalayan trekking adventures.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-16">
      <div className="text-center max-w-2xl">
        <h1 className="text-[12rem] md:text-[16rem] font-black text-primary leading-none">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-bold text-ink mb-4">
          Page Not Found
        </h2>
        <p className="text-base md:text-lg text-mute mb-8 max-w-md mx-auto">
          Looks like this trek got lost in the mountains! The page you&apos;re
          looking for doesn&apos;t exist or has been moved.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button size="lg" className="gap-2">
              <Home className="size-5" />
              Back to Home
            </Button>
          </Link>
          <Link href="/explore">
            <Button size="lg" variant="outline" className="gap-2">
              <Search className="size-5" />
              Explore Treks
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
