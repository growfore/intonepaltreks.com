import type { Metadata } from "next";
import { siteConfig } from "@/lib/siteConfig";
import { siteUrl } from "@/lib/seo";
import { FeaturedTrip } from "@/components/featured-trip";
import CategorySection from "@/components/sections/category-section";
import FeaturedSections from "@/components/sections/featuered-sections";
import HeroSection from "@/components/sections/old-hero";
import WelcomeSection from "@/components/sections/welcome-section";
import WhySection from "@/components/sections/why-section";
import Testimonials from "@/components/testimonials";

export const metadata: Metadata = {
  title: "Into Nepal Treks - Private & Customised Nepal Tours and Treks",
  description:
    "Get expert travel advice for your Nepal treks and tours. Customise your dream trip with our friendly and professional local guides at competitive prices. Explore the Himalaya with us.",
  keywords:
    "Nepal trekking, Everest Base Camp trek, Annapurna trek, Himalayan adventure, trekking agency Nepal, Pokhara trekking, guided trek Nepal, Nepal travel",
  openGraph: {
    title: "Into Nepal Treks - Private & Customised Nepal Tours and Treks",
    description:
      "Customise your dream Nepal trip with our friendly and professional local guides at competitive prices. Explore the Himalaya with us.",
    url: siteUrl,
    images: [
      {
        url: `${siteUrl}/og.png`,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Into Nepal Treks - Private & Customised Nepal Tours and Treks",
    description:
      "Customise your dream Nepal trip with our professional local guides. Explore the Himalaya with us.",
    images: [`${siteUrl}/og.png`],
  },
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
  },
};

export default async function Homepage() {
  let data;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/featured?includeActivity=true`,
    );

    data = await res.json();
  } catch (error) {
    console.error("Error loading homepage:", error);
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold text-ink mb-4">
            Something went wrong
          </h1>
          <p className="text-mute">
            Failed to load content. Please try again later.
          </p>
        </div>
      </main>
    );
  }

  const featured = data?.data;
  const featuredWithoutTOM = featured.featuredTags.filter(
    (tag: { slug: string }) => tag.slug !== "trip-of-the-month",
  );
  const firstFeatured = featuredWithoutTOM.slice(0, 1);
  const secondFeatured = featuredWithoutTOM.slice(1, 3);

  return (
    <>
      <HeroSection />
      <div className="h-32 md:h-24 bg-canvas"  />
      <CategorySection />
      <FeaturedSections featuredTags={firstFeatured} />
      <WelcomeSection />
      {/*<FeaturedTrip />*/}
      <Testimonials />
      <FeaturedSections featuredTags={secondFeatured} />
      <WhySection />
    </>
  );
}
