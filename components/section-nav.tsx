"use client";
import {
  LucideCheck,
  LucideCircleQuestionMark,
  LucideDollarSign,
  LucideFileText,
  LucideImages,
  LucideMap,
  LucideMapPin,
  LucideStar,
  LucideWallpaper,
  LucideX,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { slugify } from "@/lib/slugify";

type Section = { id: string; label: string; icon: React.ReactNode };

const faqsSection: Section = {
  id: "faqs",
  label: "Faqs",
  icon: <LucideCircleQuestionMark />,
};

const staticSections: Section[] = [
  { id: "overview", label: "Overview", icon: <LucideWallpaper /> },
  { id: "highlights", label: "Highlights", icon: <LucideStar /> },
  { id: "itinerary", label: "Itinerary", icon: <LucideMapPin /> },
  { id: "map", label: "Map", icon: <LucideMap /> },
  { id: "inclusions", label: "Includes", icon: <LucideCheck /> },
  { id: "exclusions", label: "Excludes", icon: <LucideX /> },
  { id: "gallery", label: "Trip Photos", icon: <LucideImages/>}
];

function buildSections(
  additionalInfo?: { title: string; slug?: string }[],
): Section[] {
  const extra: Section[] = [];
  let costAdded = false;
  if (additionalInfo) {
    for (const item of additionalInfo) {
      const lower = item.title.toLowerCase();
      if (lower.includes("cost") || lower.includes("price")) {
        if (costAdded) continue;
        costAdded = true;
        extra.push({
          id: item.slug || slugify(item.title),
          label: "Cost",
          icon: <LucideDollarSign />,
        });
      } else if (lower.includes("permit")) {
        extra.push({
          id: item.slug || slugify(item.title),
          label: "Permit",
          icon: <LucideFileText />,
        });
      }
    }
  }
  return [...staticSections, ...extra, faqsSection];
}

export function SectionNavigation({
  additionalInfo,
  slug,
}: {
  additionalInfo?: { title: string; slug?: string }[];
  slug?: string;
}) {
  const sections = buildSections(additionalInfo);

  const observedIds = useMemo(() => {
    const ids = [...staticSections.map((s) => s.id), faqsSection.id];
    if (additionalInfo) {
      for (const item of additionalInfo) {
        ids.push(item.slug || slugify(item.title));
      }
    }
    return ids;
  }, [additionalInfo]);

  const [activeSection, setActiveSection] = useState(sections[0]?.id ?? "");
  const [mainNavHidden, setMainNavHidden] = useState(true);
  const [overviewPast, setOverviewPast] = useState(false);
  const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const navScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;
      if (Math.abs(delta) < 10) return;
      if (delta > 0 && currentScrollY > 80) {
        setMainNavHidden(true);
      } else if (delta < 0) {
        setMainNavHidden(false);
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.replace("#", "");
      const timer = setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          const y = el.getBoundingClientRect().top + window.scrollY - 120;
          window.scrollTo({ top: y, behavior: "smooth" });
        }
      }, 300);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const el = document.getElementById("overview");
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setOverviewPast(!entry.isIntersecting),
      { threshold: 0 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) {
          const id = visible[0].target.id;
          setActiveSection(id);
          history.replaceState(null, "", `#${id}`);
        }
      },
      {
        root: null,
        rootMargin: "0px 0px -50% 0px",
        threshold: 0,
      },
    );

    observedIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [observedIds]);

  useEffect(() => {
    const btn = buttonRefs.current[activeSection];
    const container = navScrollRef.current;
    if (!btn || !container) return;

    const btnLeft = btn.offsetLeft;
    const btnWidth = btn.offsetWidth;
    const containerWidth = container.offsetWidth;

    const targetScroll = btnLeft - containerWidth / 2 + btnWidth / 2;
    container.scrollTo({ left: targetScroll, behavior: "smooth" });
  }, [activeSection]);

  const handleNavClick = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 120;
    window.scrollTo({ top: y, behavior: "smooth" });
    history.replaceState(null, "", `#${id}`);
  };

  const showNav = mainNavHidden && overviewPast;

  return (
    <nav
      className={`sticky top-0 z-40 bg-canvas border-b border-hairline transition-all duration-300 ease-in-out p-2 ${
        showNav
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-full pointer-events-none"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center gap-6">
        <div
          ref={navScrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide flex-1"
        >
          {sections.map((section) => (
            <button
              key={section.id}
              ref={(el) => {
                buttonRefs.current[section.id] = el;
              }}
              onClick={() => handleNavClick(section.id)}
              className={`relative whitespace-nowrap py-3.5 text-sm tracking-wide transition-colors ${
                activeSection === section.id
                  ? "text-ink font-semibold"
                  : "text-mute hover:text-ink"
              }`}
            >
                {section.label}
              {activeSection === section.id && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-link" />
              )}
            </button>
          ))}
        </div>
        {slug && (
          <Link
            href={`/booking?q=${slug}`}
            className="hidden md:inline-flex shrink-0 items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-link hover:bg-link-deep transition-colors rounded-full"
          >
            Book Now
          </Link>
        )}
      </div>
    </nav>
  );
}
