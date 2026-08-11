"use client";

import {
  useState,
  useEffect,
  useRef,
  useCallback,
  startTransition,
  type FormEvent,
} from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Award, ArrowRight, ChevronDown, Mail, LucidePlusCircle, Search, LucideHeadset } from "lucide-react";
import { MobileMenu } from "./mobile-menu";
import { siteConfig } from "@/lib/siteConfig";
import Logo from "./logo";
import { BsWhatsapp } from "react-icons/bs";
import { Button } from "./ui/button";
import { socials } from "./footer";

type MenuItem = {
  id: string;
  label: string;
  url: string;
  children: MenuItem[];
  parentId?: string | null;
  depth?: number;
  viewAllUrl?: string;
};

const hasChildren = (item: MenuItem) =>
  Array.isArray(item.children) && item.children.length > 0;

const hasGrandchildren = (item: MenuItem) =>
  hasChildren(item) && item.children.some((c) => hasChildren(c));

const MEGA_ITEM_THRESHOLD = 20;

const resourcesNavItem: MenuItem = {
  id: "resources",
  label: "Resources",
  url: "#",
  children: [
    { id: "resources-blog", label: "Blog", url: "/blogs", children: [] },
    { id: "resources-contact", label: "Contact", url: "/contact", children: [] },
    { id: "resources-inquiry", label: "Trip Inquiry", url: "/booking", children: [] },
    { id: "resources-design", label: "Design Your Trip", url: "/design-your-trip", children: [] },
    { id: "resources-team", label: "Our Team", url: "/our-team", children: [] },
    { id: "resources-explore", label: "Explore Trips", url: "/explore", children: [] },
  ],
};

interface MenuControllerProps {
  items: MenuItem[];
}

export function MenuController({ items }: MenuControllerProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [activeMega, setActiveMega] = useState<string | null>(null);
  const [searchQ, setSearchQ] = useState("");
  const pathname = usePathname();
  const router = useRouter();
  const hideTimer = useRef<NodeJS.Timeout | null>(null);

  const onSearch = (e: FormEvent) => {
    e.preventDefault();
    const term = searchQ.trim();
    router.push(term ? `/explore?q=${encodeURIComponent(term)}` : "/explore");
  };

  const cancelHide = useCallback(() => {
    if (hideTimer.current) {
      clearTimeout(hideTimer.current);
      hideTimer.current = null;
    }
  }, []);

  const queueHide = useCallback(() => {
    cancelHide();
    hideTimer.current = setTimeout(() => setActiveMega(null), 200);
  }, [cancelHide]);

  const openMega = useCallback(
    (id: string) => {
      cancelHide();
      setActiveMega(id);
    },
    [cancelHide],
  );

  useEffect(() => {
    cancelHide();
    return cancelHide;
  }, [cancelHide]);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY <= 80);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    startTransition(() => {
      setActiveMega(null);
      setIsMobileMenuOpen(false);
    });
  }, [pathname]);

  const [activeSidebar, setActiveSidebar] = useState<string | null>(null);

  const activeMegaItem = activeMega
    ? items.find((i) => i.id === activeMega)
    : null;
  const activeMegaChildren = activeMegaItem?.children ?? [];
  const activeMegaHasChildren = activeMegaItem
    ? hasChildren(activeMegaItem)
    : false;
  const hasActiveGrandchildren = activeMegaItem
    ? hasGrandchildren(activeMegaItem)
    : false;

  const activeSidebarItem = activeSidebar
    ? activeMegaChildren.find((c) => c.id === activeSidebar)
    : (activeMegaChildren[0] ?? null);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 bg-canvas border-b border-hairline transition-transform duration-300 ${
        !isVisible ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="hidden md:block bg-canvas-soft border-b border-hairline">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8">
          <div className="py-2.5 flex items-center justify-between text-sm text-body">
            <div className="flex items-center gap-2">
              <LucideHeadset/>
              <span className="text-mute font-medium">
                Contact us {siteConfig.phoneNumbers[0].phone} (24 Hours Support)
              </span>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3 ">
                {socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="w-9 h-9 rounded-full border border-canvas/20 flex items-center justify-center hover:bg-link hover:border-link transition-colors"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
              <span className="text-hairline-strong">|</span>
              <Link
                href={`mailto:${siteConfig.email}`}
                className="flex items-center gap-2 hover:text-ink transition-colors"
              >
                <Mail className="size-4 text-ink" />
                <span className="font-medium">{siteConfig?.email}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div
        className="relative flex items-center justify-between h-16 mx-auto max-w-[1400px] px-4 md:px-8"
        onMouseLeave={queueHide}
      >
        <div className="flex items-center gap-2">
          <Logo />
        </div>
        <div className="flex gap-4 items-center">
          {[...items, resourcesNavItem].map((item) => {
            const itemHasChildren = hasChildren(item);
            const isActive = activeMega === item.id;
            return (
              <div
                key={item.id}
                className="relative max-lg:hidden"
                onMouseEnter={() => {
                  if (itemHasChildren) {
                    openMega(item.id);
                    setActiveSidebar(null);
                  }
                }}
              >
                {itemHasChildren ? (
                  <button
                    className={`inline-flex items-center gap-1 px-3 py-1.5 text-sm  font-bold uppercase tracking-wider transition-colors ${
                      isActive
                        ? "text-ink bg-canvas-soft"
                        : "text-ink hover:text-ink hover:bg-canvas-soft"
                    }`}
                  >
                    {item.label}
                    <ChevronDown size={16} className="text-mute" />
                  </button>
                ) : (
                  <Link
                    href={item.url || "#"}
                    className="inline-flex items-center px-3 py-1.5 text-sm font-bold uppercase tracking-wider text-ink hover:text-ink transition-colors"
                  >
                    {item.label}
                  </Link>
                )}
                {itemHasChildren &&
                  isActive &&
                  !hasGrandchildren(item) &&
                  item.children.length <= MEGA_ITEM_THRESHOLD && (
                    <div className="absolute left-0 top-full z-50 pt-2">
                      <div className="bg-canvas border border-hairline rounded-sm shadow-[0px_2px_2px_#0000000a,0px_8px_16px_-4px_#0000000a]">
                        <ul className="py-2 min-w-[240px] max-h-[70vh] overflow-y-auto">
                          {item.children.map((child) => (
                            <li key={child.id}>
                              <Link
                                href={child.url || "#"}
                                className="block px-4 py-2 text-sm text-body hover:text-ink hover:bg-canvas-soft transition-colors"
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                        {item.viewAllUrl && (
                          <Link
                            href={item.viewAllUrl}
                            className="flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium text-link hover:text-link-deep border-t border-hairline transition-colors"
                          >
                            View all {item.label} trips
                            <ArrowRight size={14} />
                          </Link>
                        )}
                      </div>
                    </div>
                  )}
              </div>
            );
          })}
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          {/*<Link href="/design-your-trip" className="hidden md:inline-flex">
            <Button variant="secondary" size="lg">
              <LucidePlusCircle /> Customize My Trip
            </Button>
          </Link>*/}
          <Link href="/booking" className="hidden md:inline-flex">
            <Button>Book Now</Button>
          </Link>
          <MobileMenu
            items={[...items, resourcesNavItem]}
            isOpen={isMobileMenuOpen}
            setIsOpen={setIsMobileMenuOpen}
            onNavigate={() => setIsMobileMenuOpen(false)}
          />
        </div>

        <div
          onMouseEnter={cancelHide}
          className={`max-lg:hidden absolute inset-x-0 top-0 z-40 pointer-events-none ${
            activeMegaItem && activeMegaHasChildren ? "block" : "hidden"
          }`}
        >
          <div className="h-16" aria-hidden="true" />
          {activeMegaItem && hasActiveGrandchildren && (
            <div className="bg-canvas border border-hairline rounded-sm pointer-events-auto shadow-[0px_2px_2px_#0000000a,0px_8px_16px_-4px_#0000000a]">
              <div className="max-w-[1400px] mx-auto px-4 md:px-8">
                <div className="flex">
                  <div className="w-[240px] shrink-0 py-6 pr-6 border-r border-hairline">
                    <ul className="space-y-1">
                      {activeMegaChildren.map((child) => {
                        const isActive = child.id === activeSidebarItem?.id;
                        return (
                          <li key={child.id}>
                            <button
                              onMouseEnter={() => setActiveSidebar(child.id)}
                              className={`w-full text-left px-4 py-3 text-sm font-medium rounded transition-colors ${
                                isActive
                                  ? "text-link bg-canvas-soft border-l-2 border-link"
                                  : "text-body hover:text-ink hover:bg-canvas-soft border-l-2 border-transparent"
                              }`}
                            >
                              {child.label}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  <div className="flex-1 min-w-0 py-6 pl-8">
                    {activeSidebarItem && hasChildren(activeSidebarItem) ? (
                      <>
                        <div className="grid grid-cols-2 gap-x-12 gap-y-1">
                          {activeSidebarItem.children.map((subChild) => (
                            <Link
                              key={subChild.id}
                              href={subChild.url || "#"}
                              className="block py-2 text-sm text-body hover:text-ink transition-colors"
                            >
                              {subChild.label}
                            </Link>
                          ))}
                        </div>
                        {activeSidebarItem.viewAllUrl && (
                          <Link
                            href={activeSidebarItem.viewAllUrl}
                            className="inline-flex items-center gap-1.5 mt-4 text-sm font-medium text-link hover:text-link-deep transition-colors"
                          >
                            View all {activeSidebarItem.label} trips
                            <ArrowRight size={14} />
                          </Link>
                        )}
                      </>
                    ) : activeSidebarItem ? (
                      <Link
                        href={activeSidebarItem.url || "#"}
                        className="text-body hover:text-ink transition-colors"
                      >
                        {activeSidebarItem.label}
                      </Link>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          )}
          {activeMegaItem &&
            activeMegaHasChildren &&
            !hasActiveGrandchildren &&
            activeMegaChildren.length > MEGA_ITEM_THRESHOLD && (
              <div className="bg-canvas border border-hairline rounded-sm pointer-events-auto shadow-[0px_2px_2px_#0000000a,0px_8px_16px_-4px_#0000000a]">
                <div className="max-w-[1400px] mx-auto px-4 md:px-8">
                  <div className="py-6">
                    <div className="grid grid-cols-2 gap-x-12 gap-y-1">
                      {activeMegaChildren.map((child) => (
                        <Link
                          key={child.id}
                          href={child.url || "#"}
                          className="block py-2 text-sm text-body hover:text-ink transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                    {activeMegaItem.viewAllUrl && (
                      <Link
                        href={activeMegaItem.viewAllUrl}
                        className="inline-flex items-center gap-1.5 mt-4 text-sm font-medium text-link hover:text-link-deep transition-colors"
                      >
                        View all {activeMegaItem.label} trips
                        <ArrowRight size={14} />
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            )}
        </div>
      </div>
    </nav>
  );
}
