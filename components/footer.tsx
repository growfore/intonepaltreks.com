import { siteConfig } from "@/lib/siteConfig";
import { LucideMail, LucideMap, LucidePhone } from "lucide-react";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
import Image from "next/image";
import { apiFetch, getFooterItems } from "@/lib/api";
import TrustStrap from "./sections/trust-strap";
import Logo from "./logo";

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

const resources = [
  { label: "Blog", url: "/blogs" },
  { label: "Contact", url: "/contact" },
  { label: "Trip Inquiry", url: "/booking" },
  { label: "Design Your Trip", url: "/design-your-trip" },
  { label: "Our Team", url: "/our-team" },
  { label: "Explore Trips", url: "/explore" },
];

type FooterItem = {
  url: string;
  label: string;
  children?: { url: string; label: string }[];
};

export default async function Footer() {
  const footerItems = await getFooterItems();
  const auto = footerItems?.data?.auto === true;

  let featuredTrips: { slug: string; title: string }[] = [];
  if (auto) {
    try {
      const res = await apiFetch("/featured?includeActivity=true", {
        next: { revalidate: 3600 },
      });
      const json = await res.json();
      const tags = json?.data?.featuredTags ?? [];
      const seen = new Set<string>();
      featuredTrips = tags
        .flatMap((t: { activity?: { slug: string; title: string; images?: string[] }[] }) => t.activity ?? [])
        .filter((a: { slug: string }) => {
          if (seen.has(a.slug)) return false;
          seen.add(a.slug);
          return true;
        })
        .slice(0, 2)
        .map((a: { slug: string; title: string }) => ({
          slug: a.slug,
          title: a.title,
        }));
    } catch {
      // ponytail: degrade to resources-only columns if featured fetch fails
    }
  }

  return (
    <footer className="bg-ink text-canvas/90">
      <div className="container mx-auto px-4 md:px-8 py-16 md:py-20 max-w-[1400px]">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2 space-y-5">
            <Link href="/" className="font-bold text-3xl text-canvas flex gap-2 items-center">
              <Logo/> Into Nepal
            </Link>
            <p className="text-canvas text-md leading-relaxed max-w-sm">
              Hand-crafted treks and tours across the Himalaya — designed by
              certified local guides who call the mountains home.
            </p>
            <ul className="space-y-2 text-sm text-white">
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

          {auto ? (
            <>
              <div>
                <p className="text-sm text-canvas font-medium mb-5">
                  Featured Trips
                </p>
                {featuredTrips.length > 0 ? (
                  <ul className="space-y-4 text-sm">
                    {featuredTrips.map((trip) => (
                      <li key={trip.slug}>
                        <Link
                          href={`/trip/${trip.slug}`}
                          className="group"
                        >
                          <span className="text-canvas/90 group-hover:text-canvas transition-colors">
                            {trip.title}
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-canvas/50">No trips available.</p>
                )}
              </div>

              <div>
                <p className="text-md font-medium  text-canvas mb-5">
                  Resources
                </p>
                <ul className="space-y-3 text-sm">
                  {resources.map((r) => (
                    <li key={r.url}>
                      <Link
                        href={r.url}
                        className="text-canvas/90 hover:text-canvas transition-colors"
                      >
                        {r.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          ) : (
            footerItems.data.items.map((item: FooterItem) => (
              <div key={item.url + item.label}>
                <Link href={item.url}>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-canvas/60 mb-5">
                    {item.label}
                  </p>
                </Link>
                {item.children && item.children.length > 0 && (
                  <ul className="space-y-3 text-sm">
                    {item.children.map((subItem) => (
                      <li key={subItem.url + subItem.label}>
                        <Link
                          href={subItem.url}
                          className="text-canvas/70 hover:text-canvas transition-colors"
                        >
                          {subItem.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))
          )}
        </div>

        <TrustStrap dark />


        <div className="mt-8 pt-6 border-t border-canvas/10 flex flex-col md:flex-row justify-between gap-3 text-xs text-canvas/60">
          <p>
            &copy; {siteConfig.name}. {siteConfig.established} &ndash;{" "}
            {new Date().getFullYear()}. All rights reserved.
          </p>
          <div className="flex gap-2 items-center">
            Designed and Developed by
            <Link  href={"https://growfore.com/"} target="_blank" className="flex gap-1 items-center underline">
              <Image src={"https://growfore.com/wp-content/uploads/2025/08/cropped-growfore-rounded-blue-on-white.png"} height={200} width={200} alt="Grofore Solution Logo" className="size-6" /> Growfore Solution.
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
