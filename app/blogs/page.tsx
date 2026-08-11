import type { Metadata } from "next";
import { siteConfig } from "@/lib/siteConfig";
import { siteUrl } from "@/lib/seo";
import { apiFetch } from "@/lib/api";
import { BlogCard } from "@/components/card/blog-card";
import PageHeader from "@/components/page-header";
import Section from "@/components/section";

export const metadata: Metadata = {
  title: "Travel Guides & Trekking Tips",
  description:
    "Read expert travel guides, trekking tips, and adventure stories from Into Nepal Treks. Plan your Himalayan trek with insights from experienced guides.",
  keywords:
    "Nepal travel guide, trekking tips, Himalayan trek blog, Nepal adventure guide, Everest trek guide, Annapurna trek tips",
  openGraph: {
    title: "Travel Guides & Trekking Tips | Into Nepal Treks",
    description:
      "Expert travel guides, trekking tips, and adventure stories to help you plan your perfect Nepal trekking experience.",
    url: `${siteUrl}/blogs`,
    images: [
      {
        url: `${siteUrl}/og.png`,
        width: 1200,
        height: 630,
        alt: "Travel Guides - Into Nepal Treks",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Travel Guides & Trekking Tips | Into Nepal Treks",
    description:
      "Expert travel guides and trekking tips for your Nepal adventure.",
    images: [`${siteUrl}/og.png`],
  },
  alternates: {
    canonical: `${siteConfig.url}/blogs`,
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
  },
};

export default async function BlogPage() {
  const res = await apiFetch(`/blogs/published`);

  const resJSON = await res.json();

  const blogs = resJSON.blogs;
  const total = resJSON.pagination?.total;

  return (
    <>
      <PageHeader
        title="Blogs"
        subtitle={`${total} article${total !== 1 ? "s" : ""} to inspire your next adventure`}
      />

      <Section className="container mx-auto">
        {blogs?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs?.map((blog: any) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-muted-foreground">
            <p className="text-base md:text-lg">No articles found.</p>
          </div>
        )}
      </Section>
    </>
  );
}
