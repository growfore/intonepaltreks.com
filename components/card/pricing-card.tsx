import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";

import { MessageCircle, Phone, ChevronRight, LucideSend } from "lucide-react";
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
    <Card>
      <CardContent className="space-y-6">
        <h3 className="text-lg font-semibold text-ink">{title}</h3>
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-mute mb-2">
            Price per person
          </p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-semibold text-ink">
              ${price}{maxPrice ? ` - $${maxPrice}` : ""}
            </span>
          </div>
          <p className="text-xs text-mute mt-2">(Price varies by group size)</p>
        </div>

        <Separator />

        <div className="space-y-3">
          <p className="text-sm text-body">
            For questions or booking inquiries
          </p>
          <Link href={"/booking?q=" + slug}>
            <Button className="w-full">
              <LucideSend className="size-4" />
              Send an Inquiry
            </Button>
          </Link>
        </div>

        <Separator />

        <div>
          <p className="text-sm font-medium text-ink mb-3 flex items-center gap-2">
            <MessageCircle className="size-4" />
            Speak to an Expert
          </p>
          <Link
            href={`https://wa.me/${siteConfig.whatsAppNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 bg-canvas-soft hover:bg-canvas-soft-2 rounded-xl transition-colors group"
          >
            <div className="size-10 rounded-full bg-ink flex items-center justify-center shrink-0">
              <Phone className="size-5 text-on-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-ink">WhatsApp</p>
              <p className="text-xs text-body truncate">
                {siteConfig.whatsAppNumber}
              </p>
            </div>
            <ChevronRight className="size-5 text-body shrink-0" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
