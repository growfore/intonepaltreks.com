import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/siteConfig";

const baseUrl = siteConfig.url;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/explore`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/booking`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/our-team`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${baseUrl}/design-your-trip`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  let trips: MetadataRoute.Sitemap = [];
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/activity?page=1&limit=1000`,
      { next: { revalidate: 3600 } },
    );
    const data = await res.json();
    const items: Record<string, unknown>[] = data.data || [];
    trips = items.map((trip) => ({
      url: `${baseUrl}/package/${trip.slug}`,
      lastModified: new Date((trip.updatedAt as string) || Date.now()),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    }));
  } catch {
    // silently fail
  }

  let infoPages: MetadataRoute.Sitemap = [];
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/info-page`,
      { next: { revalidate: 3600 } },
    );
    const data = await res.json();
    const items: Record<string, unknown>[] = data.infoPages || [];
    infoPages = items.map((page) => ({
      url: `${baseUrl}/${page.slug}`,
      lastModified: new Date((page.updatedAt as string) || Date.now()),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));
  } catch {
    // silently fail
  }

  return [...staticRoutes, ...trips, ...infoPages];
}
