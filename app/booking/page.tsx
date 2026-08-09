import type { Metadata } from "next";
import { siteConfig } from "@/lib/siteConfig";
import { siteUrl } from "@/lib/seo";
import ContactForm from "@/components/booking-form";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Plan Your Adventure",
  description:
    "Plan your Himalayan adventure with Into Nepal Treks. Book trekking, tours, and adventure sports in Nepal through our easy online inquiry form.",
  keywords:
    "book Nepal trek, trekking inquiry, Nepal adventure booking, Himalayan trek booking, plan Nepal trip, trekking reservation",
  openGraph: {
    title: "Plan Your Adventure | Into Nepal Treks",
    description:
      "Start planning your Nepal trekking adventure. Submit an inquiry and our team will help create the perfect itinerary for you.",
    url: `${siteUrl}/booking`,
    images: [
      {
        url: `${siteUrl}/og.png`,
        width: 1200,
        height: 630,
        alt: "Plan Your Adventure - Into Nepal Treks",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Plan Your Adventure | Into Nepal Treks",
    description:
      "Start planning your Nepal trekking adventure with Into Nepal Treks.",
    images: [`${siteUrl}/og.png`],
  },
  alternates: {
    canonical: `${siteConfig.url}/booking`,
  },
  robots: {
    index: true,
    follow: true,
    "max-video-preview": -1,
    "max-image-preview": "large",
    "max-snippet": -1,
  },
};

export default async function BookingPage() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/activity?page=1&limit=100`,
    { cache: "force-cache" },
  );

  const json = await res.json();

  const packages = json.data;

  const sortedPackages = [...packages].sort(
    (a: { title: string }, b: { title: string }) =>
      a.title.toLowerCase().localeCompare(b.title.toLowerCase()),
  );

  return <ContactForm packages={sortedPackages} />;
}
