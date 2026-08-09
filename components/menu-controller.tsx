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
import { Award, ChevronDown, Mail, LucidePlusCircle, Search, LucideHeadset } from "lucide-react";
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
};

const hasChildren = (item: MenuItem) =>
  Array.isArray(item.children) && item.children.length > 0;

const hasGrandchildren = (item: MenuItem) =>
  hasChildren(item) && item.children.some((c) => hasChildren(c));

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
          {items.map((item) => {
            const itemHasGrandchildren = hasGrandchildren(item);
            const isActive = activeMega === item.id;
            return (
              <div
                key={item.id}
                className="relative max-lg:hidden"
                onMouseEnter={() => {
                  if (itemHasGrandchildren) {
                    openMega(item.id);
                    setActiveSidebar(null);
                  }
                }}
              >
                {itemHasGrandchildren ? (
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
              </div>
            );
          })}
        </div>

        {pathname !== "/" && (
          <form
            onSubmit={onSearch}
            className="hidden xl:flex flex-1 max-w-sm mx-auto items-center gap-2 px-4 py-2 rounded-sm border border-hairline bg-canvas-soft focus-within:border-link transition-colors"
          >
            <Search className="w-4 h-4 text-mute shrink-0" />
            <input
              value={searchQ}
              onChange={(e) => setSearchQ(e.target.value)}
              placeholder="Search trips by name…"
              className="flex-1 bg-transparent outline-none text-sm text-ink placeholder:text-mute"
            />
          </form>
        )}

        <div className="flex items-center gap-2 md:gap-4">
          <Link href="/design-your-trip" className="hidden md:inline-flex">
            <Button variant="secondary" size="lg">
              <LucidePlusCircle /> Customize My Trip
            </Button>
          </Link>
          <Link href="/booking" className="hidden md:inline-flex">
            <Button>Book Now</Button>
          </Link>
          <MobileMenu
            items={items}
            isOpen={isMobileMenuOpen}
            setIsOpen={setIsMobileMenuOpen}
            onNavigate={() => setIsMobileMenuOpen(false)}
          />
        </div>

        <div
          onMouseEnter={cancelHide}
          className={`max-lg:hidden absolute inset-x-0 top-0 z-40 pointer-events-none ${
            activeMegaItem && hasActiveGrandchildren ? "block" : "hidden"
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
        </div>
      </div>
    </nav>
  );
}
