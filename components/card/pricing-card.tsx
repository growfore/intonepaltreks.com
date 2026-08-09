import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Phone, ChevronRight, LucideTag } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";

export default function PricingCardSidebar({
  price,
  maxPrice,
  slug,
  title,
}: {
  price: number;
  maxPrice?: number;
  slug?: string;
  title: string;
}) {
  return (
    <div className="border-l border-link bg-canvas rounded-r-sm overflow-hidden w-full">
      <div className="flex items-center gap-2 bg-link-bg-soft px-5 py-3">
        <LucideTag className="size-4 text-link" />
        <h3 className="font-display font-bold text-lg text-ink">
          Trip Price
        </h3>
      </div>
      <div className="space-y-6 p-5 md:p-6">
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-mute mb-1">
            Price per person
          </p>
          <div className="flex items-baseline gap-2">
            <span className="font-display text-3xl md:text-4xl font-bold text-ink">
              ${price}
              {maxPrice ? ` - $${maxPrice}` : ""}
            </span>
          </div>
          <p className="text-xs text-mute mt-1">
            Price varies by group size
          </p>
        </div>

        <div className="space-y-3">
          {/*<p className="text-sm text-ink">{title}</p>*/}
          <Link href={"/booking?q=" + slug} className="block">
            <Button className="w-full">
              Send an Inquiry
            </Button>
          </Link>
        </div>

        <div>
          <p className="text-sm font-semibold text-ink mb-3 flex items-center gap-2">
            <Phone className="size-4 text-link" />
            Speak to an Expert
          </p>
          <Link
            href={`https://wa.me/${siteConfig.whatsAppNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 bg-canvas-soft hover:bg-canvas-soft-2 rounded-sm transition-colors group"
          >
            <div className="size-10 rounded-full bg-link flex items-center justify-center shrink-0">
              <Phone className="size-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-ink">WhatsApp</p>
              <p className="text-xs text-mute truncate">
                {siteConfig.whatsAppNumber}
              </p>
            </div>
            <ChevronRight className="size-5 text-mute shrink-0" />
          </Link>
        </div>
      </div>
    </div>
  );
}
