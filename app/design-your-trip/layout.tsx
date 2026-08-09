import type { Metadata } from "next";
import { siteConfig } from "@/lib/siteConfig";
import { siteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Design Your Custom Trek",
  description:
    "Create your perfect Nepal trekking adventure with Into Nepal Treks. Customize your itinerary, choose your dates, and build a trek that matches your preferences.",
  openGraph: {
    title: "Design Your Custom Trek | Into Nepal Treks",
    description:
      "Build your own Nepal trekking adventure. Custom itinerary, flexible dates, and expert guidance from Into Nepal Treks.",
    images: [
      {
        url: `${siteUrl}/og.png`,
        width: 1200,
        height: 630,
        alt: "Design Your Custom Trek - Into Nepal Treks",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Design Your Custom Trek | Into Nepal Treks",
    description:
      "Build your own Nepal trekking adventure with a custom itinerary and expert guidance.",
    images: [`${siteUrl}/og.png`],
  },
  alternates: {
    canonical: `${siteConfig.url}/design-your-trip`,
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
  },
};

export default function DesignYourTripLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
