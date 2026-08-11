import type { Metadata } from "next";
import { siteConfig } from "@/lib/siteConfig";
import { siteUrl } from "@/lib/seo";
import { apiFetch } from "@/lib/api";
import ExploreClient from "./explore-client";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Trekking Trips in Nepal",
  description:
    "Explore the best trekking adventures in Nepal with Into Nepal Treks. From Annapurna Base Camp to Everest Base Camp, enjoy expertly guided Himalayan treks with comfortable stays.",
  keywords:
    "Nepal trekking trips, Annapurna trek, Everest trek, Himalayan trekking, Nepal adventure tours, guided trek Nepal, best treks Nepal",
  openGraph: {
    title: "Trekking Trips in Nepal | Into Nepal Treks",
    description:
      "Browse our complete collection of Nepal trekking adventures. Find the perfect Himalayan trek for your skill level and schedule.",
    url: `${siteUrl}/explore`,
    images: [
      {
        url: `${siteUrl}/og.png`,
        width: 1200,
        height: 630,
        alt: "Explore Trekking Trips - Into Nepal Treks",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Trekking Trips in Nepal | Into Nepal Treks",
    description:
      "Browse our complete collection of Nepal trekking adventures and find your perfect Himalayan trek.",
    images: [`${siteUrl}/og.png`],
  },
  alternates: {
    canonical: `${siteConfig.url}/explore`,
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
  },
};

export default async function ExplorePage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string; country?: string }>;
}) {
  const params = await searchParams;
  const [tripsRes, categoriesRes, countriesRes] = await Promise.all([
    apiFetch(`/activity?page=1&limit=50`, { cache: "no-store" }),
    apiFetch(`/trip-category`),
    apiFetch(`/country`),
  ]);

  const tripsJSON = await tripsRes.json();
  const categoriesJSON = await categoriesRes.json();
  const countriesJSON = await countriesRes.json();
  const trips = tripsJSON.data ?? [];
  const categories = categoriesJSON.data?.tripCategories ?? [];
  const countries = countriesJSON.data?.countries ?? [];

  return (
    <ExploreClient
      trips={trips}
      categories={categories}
      countries={countries}
      initialCategory={params.category ?? ""}
      initialCountry={params.country ?? ""}
      initialSearch={params.q ?? ""}
    />
  );
}
