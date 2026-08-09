"use client";

import { Menu, X } from "lucide-react";
import { MobileMenuItem } from "./mobile-menu-item";
import { Button } from "./ui/button";
import { Dispatch, SetStateAction, useEffect } from "react";

type MenuItem = {
  id: string;
  label: string;
  url: string;
  children: MenuItem[];
};

interface MobileMenuProps {
  items: MenuItem[];
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  onNavigate: () => void;
}

export function MobileMenu({
  items,
  isOpen,
  setIsOpen,
  onNavigate,
}: MobileMenuProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        className="md:hidden"
      >
        {isOpen ? <X className="size-[24px] text-ink" /> : <Menu className="size-[24px] text-ink" />}
      </Button>

      {isOpen && (
        <div
          className="md:hidden fixed inset-x-0 top-16 bottom-0 bg-black/30 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {isOpen && (
        <div className="md:hidden fixed inset-x-0 top-16 bg-canvas border-b border-hairline z-50 overflow-y-auto max-h-[calc(100vh-64px)]">
          {items.map((item) => (
            <MobileMenuItem key={item.id} item={item} onNavigate={onNavigate} />
          ))}
        </div>
      )}
    </>
  );
}
