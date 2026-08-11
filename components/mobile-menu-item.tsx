"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, ArrowRight } from "lucide-react";

type MenuItem = {
  id: string;
  label: string;
  url: string;
  children: MenuItem[];
  viewAllUrl?: string;
};

interface MobileMenuItemProps {
  item: MenuItem;
  level?: number;
  onNavigate?: () => void;
}

export function MobileMenuItem({
  item,
  level = 0,
  onNavigate,
}: MobileMenuItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasChildren = Array.isArray(item.children) && item.children.length > 0;

  const indent = level > 0 ? `pl-${8 + level * 4}` : "px-4";

  const handleLinkClick = () => {
    if (onNavigate) onNavigate();
  };

  return (
    <div className="border-b border-hairline">
      <div className="flex items-center">
        {hasChildren ? (
          <button
            onClick={() => setIsExpanded((prev) => !prev)}
            aria-expanded={isExpanded}
            className={`flex-1 text-left ${indent} py-3 text-sm text-body hover:text-ink transition-colors`}
          >
            <div className="flex items-center justify-between pr-4">
              <span>{item.label}</span>
              <Plus
                size={16}
                className={`transition-transform duration-200 ${
                  isExpanded ? "rotate-45" : ""
                }`}
              />
            </div>
          </button>
        ) : (
          <Link
            href={item.url || "#"}
            onClick={handleLinkClick}
            className={`flex-1 block ${indent} py-3 text-sm text-body hover:text-ink transition-colors`}
          >
            {item.label}
          </Link>
        )}
      </div>

      {isExpanded && hasChildren && (
        <div className="bg-canvas-soft pl-4">
          {item.children.map((child) => (
            <MobileMenuItem
              key={child.id}
              item={child}
              level={level + 1}
              onNavigate={onNavigate}
            />
          ))}
          {item.viewAllUrl && (
            <Link
              href={item.viewAllUrl}
              onClick={handleLinkClick}
              className="flex items-center gap-1.5 px-4 py-3 text-sm font-medium text-link hover:text-link-deep transition-colors"
            >
              View all {item.label} trips
              <ArrowRight size={14} />
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
