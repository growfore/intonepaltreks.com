import { siteConfig } from "@/lib/siteConfig";
import { LucideMail, LucideMap, LucidePhone } from "lucide-react";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
import Image from "next/image";
import { getFooterItems } from "@/lib/api";

export const socials = [
  {
    name: "Facebook",
    url: siteConfig.socials.facebook,
    icon: <FaFacebook className="size-4" />,
  },
  {
    name: "Instagram",
    url: siteConfig.socials.instagram,
    icon: <FaInstagram className="size-4" />,
  },
  {
    name: "WhatsApp",
    url: `https://wa.me/${siteConfig.whatsAppNumber}`,
    icon: <FaWhatsapp className="size-4" />,
  },
];
export default async function Footer() {
  const footerItems = await getFooterItems();


  return (
    <footer className="bg-ink text-canvas/90">
      <div className="container mx-auto px-4 md:px-8 py-16 md:py-20 max-w-[1400px]">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-5">
            <Link href="/" className="font-serif text-3xl text-canvas block">
              Into Nepal<span className="text-link-bg-soft">.</span>
            </Link>
            <p className="text-canvas/70 text-sm leading-relaxed max-w-sm">
              Hand-crafted treks and tours across the Himalaya — designed by
              certified local guides who call the mountains home.
            </p>
            <ul className="space-y-2 text-sm text-canvas/80">
              <li className="flex items-center gap-3">
                <LucideMap className="w-4 h-4 text-link-bg-soft" />{" "}
                {siteConfig.fullAddress}
              </li>
              <li className="flex items-center gap-3">
                <LucidePhone className="w-4 h-4 text-link-bg-soft" />{" "}
                {siteConfig.phoneNumbers[0].phone}
              </li>
              <li className="flex items-center gap-3">
                <LucideMail className="w-4 h-4 text-link-bg-soft" />{" "}
                {siteConfig.email}
              </li>
            </ul>
            <div className="flex items-center gap-3 pt-2">
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
          </div>

          {footerItems.data.items.map(
            (item: {
              url: string;
              label: string;
              children?: { url: string; label: string }[];
            }) => (
              <div key={item.url + item.label}>
                <Link href={item.url}>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-canvas/60 mb-5">
                    {item.label}
                  </p>
                </Link>
                {item.children && item.children.length > 0 && (
                  <ul className="space-y-3 text-sm">
                    {item.children.map(
                      (subItem: { url: string; label: string }) => (
                        <li key={subItem.url + subItem.label}>
                          <Link
                            href={subItem.url}
                            className="text-canvas/70 hover:text-canvas transition-colors"
                          >
                            {subItem.label}
                          </Link>
                        </li>
                      ),
                    )}
                  </ul>
                )}
              </div>
            ),
          )}
        </div>

        {/* Associations */}
        <div className="mt-14 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-canvas/10 pt-8">
          <span className="text-xs text-canvas/60">Associated With</span>
          <div className="flex gap-5">
            {[
              "/associations/taan.avif",
              "/associations/nepal-government.avif",
              "/associations/nma.avif",
              "/associations/ntb.avif",
              "/associations/keep.avif",
            ].map((image, index) => (
              <Image
                alt={`Association ${index + 1}`}
                src={image}
                height={28}
                width={28}
                key={index}
                className="object-contain opacity-60 hover:opacity-100 transition-opacity"
              />
            ))}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-canvas/10 flex flex-col md:flex-row justify-between gap-3 text-xs text-canvas/60">
          <p>
            &copy; {siteConfig.name}. {siteConfig.established} &ndash;{" "}
            {new Date().getFullYear()}. All rights reserved.
          </p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-canvas">
              Privacy
            </a>
            <a href="#" className="hover:text-canvas">
              Terms
            </a>
            <a href="#" className="hover:text-canvas">
              Cookie policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
