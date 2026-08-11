"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { getFullImageUrl } from "@/lib/getFullImageUrl";

let rotateSeq = 0;

const TEXT_LIMIT = 150;

export interface StaggerTestimonial {
  id: string;
  author: string;
  rating: number;
  content: string;
  media?: string;
  _k?: number;
}

interface TestimonialCardProps {
  position: number;
  testimonial: StaggerTestimonial;
  handleMove: (steps: number) => void;
  cardSize: number;
}

function Initials({ name, isCenter }: { name: string; isCenter: boolean }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);
  return (
    <div
      className={cn(
        "mb-4 h-14 w-12 flex items-center justify-center font-bold text-sm",
        isCenter ? "bg-primary-foreground/15 text-primary-foreground" : "bg-muted text-ink"
      )}
      style={{ boxShadow: "3px 3px 0px var(--color-canvas)" }}
    >
      {initials}
    </div>
  );
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  position,
  testimonial,
  handleMove,
  cardSize,
}) => {
  const isCenter = position === 0;
  const [expanded, setExpanded] = useState(false);
  const longText = testimonial.content.length > TEXT_LIMIT;
  const shownText = longText && !expanded
    ? `${testimonial.content.slice(0, TEXT_LIMIT)}…`
    : testimonial.content;

  return (
    <div
      onClick={() => handleMove(position)}
      className={cn(
        "absolute left-1/2 top-1/2 cursor-pointer border-2 p-8 rounded-2xl transition-all duration-500 ease-in-out overflow-hidden flex flex-col",
        isCenter
          ? "z-10 bg-primary text-primary-foreground border-primary"
          : "z-0 bg-card text-card-foreground border-border hover:border-primary/50"
      )}
      style={{
        width: cardSize,
        height: cardSize,
        transform: `
          translate(-50%, -50%)
          translateX(${(cardSize / 1.5) * position}px)
          translateY(${isCenter ? -65 : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
        `,
        boxShadow: isCenter
          ? "0px 8px 0px 4px var(--color-hairline)"
          : "0px 0px 0px 0px transparent",
      }}
    >
      {testimonial.media ? (
        <Image
          src={getFullImageUrl(testimonial.media)}
          alt=""
          width={56}
          height={56}
          unoptimized
          className="mb-4 size-14 object-cover rounded-xl"
        />
      ) : (
        <Initials name={testimonial.author} isCenter={isCenter} />
      )}
      <div className="scrollbar-visible flex-1 min-h-0 overflow-y-scroll">
        <h3
          className={cn(
            "text-base sm:text-xl font-medium",
            isCenter ? "text-primary-foreground" : "text-ink"
          )}
        >
          &ldquo;{shownText}&rdquo;
        </h3>
        {longText && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setExpanded((v) => !v);
            }}
            className={cn(
              "mt-2 text-xs font-semibold underline underline-offset-2",
              isCenter ? "text-primary-foreground/80" : "text-link"
            )}
          >
            {expanded ? "Read less" : "Read more"}
          </button>
        )}
      </div>
      <p
        className={cn(
          "mt-2 text-sm italic line-clamp-1",
          isCenter ? "text-primary-foreground/80" : "text-mute"
        )}
      >
        - {testimonial.author}
      </p>
    </div>
  );
};

export const StaggerTestimonials: React.FC<{
  testimonials: StaggerTestimonial[];
}> = ({ testimonials }) => {
  const [cardSize, setCardSize] = useState(365);
  const [testimonialsList, setTestimonialsList] =
    useState<StaggerTestimonial[]>(testimonials);

  const handleMove = (steps: number) => {
    setTestimonialsList((prev) => {
      const newList = [...prev];
      if (steps > 0) {
        for (let i = steps; i > 0; i--) {
          const item = newList.shift();
          if (!item) return prev;
          newList.push({ ...item, _k: ++rotateSeq });
        }
      } else {
        for (let i = steps; i < 0; i++) {
          const item = newList.pop();
          if (!item) return prev;
          newList.unshift({ ...item, _k: ++rotateSeq });
        }
      }
      return newList;
    });
  };

  useEffect(() => {
    const updateSize = () => {
      const { matches } = window.matchMedia("(min-width: 640px)");
      setCardSize(matches ? 365 : 290);
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div className="relative w-full overflow-hidden bg-canvas-soft" style={{ height: 600 }}>
      {testimonialsList.map((testimonial, index) => {
        const position = index - (testimonialsList.length - 1) / 2;
        return (
          <TestimonialCard
            key={testimonial._k ?? testimonial.id}
            testimonial={testimonial}
            handleMove={handleMove}
            position={position}
            cardSize={cardSize}
          />
        );
      })}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        <button
          onClick={() => handleMove(-1)}
          className={cn(
            "flex h-14 w-14 items-center justify-center text-2xl transition-colors rounded-full",
            "bg-background border-2 border-border hover:bg-primary hover:text-primary-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          )}
          aria-label="Previous testimonial"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={() => handleMove(1)}
          className={cn(
            "flex h-14 w-14 items-center justify-center text-2xl transition-colors rounded-full",
            "bg-background border-2 border-border hover:bg-primary hover:text-primary-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          )}
          aria-label="Next testimonial"
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};
