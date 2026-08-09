"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LucideSend } from "lucide-react";

interface BottomBookingBarProps {
  price: number;
  slug: string;
  title: string;
}

export function BottomBookingBar({ price, slug }: BottomBookingBarProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 bg-canvas border-t border-hairline z-50 md:hidden transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex flex-col">
          <span className="text-xs text-mute line-clamp-1 max-w-[200px]">
            Start from <span className="font-semibold text-ink">US ${price}</span> /person
          </span>
        </div>
        <Link href={"/booking?q=" + slug}>
          <Button>
            <LucideSend className="size-4" />
            Book Now
          </Button>
        </Link>
      </div>
    </div>
  );
}
