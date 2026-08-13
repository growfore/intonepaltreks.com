import {
  LucideArrowLeft,
  LucideInfo,
  LucidePlayCircle,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
export const dynamic = "force-dynamic";
export async function generateStaticParams() {
  const res = await apiFetch(`/activity?page=1&limit=1000`);
  const data = await res.json();
  const trips: { slug: string }[] = data.data || [];
  return trips.map((trip) => ({ slug: trip.slug }));
}
import ImageGallery from "@/components/image-gallery";
import { AdditionalInfoRenderer } from "@/components/additional-info-renderer";
import { TripItinerary } from "@/components/v0/trip-itinerary";
import { TripOverview } from "@/components/v0/trip-overview";
import { TripFaq } from "@/components/v0/trip-faq";
import { decodeHtmlEntities } from "@/lib/html-decoder";
import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import Script from "next/script";
import { SectionNavigation } from "@/components/section-nav";
import { TripHeaderDescription } from "@/components/trip-header-description";
import { IncludeExcludeCard } from "@/components/include-exclude-card";
import { BottomBookingBar } from "@/components/bottom-booking-bar";
import PricingCardSidebar from "@/components/card/pricing-card";
import { safeParseSchema } from "@/lib/safeParseSchema";
import { siteConfig } from "@/lib/siteConfig";
import { siteUrl, imageUrl } from "@/lib/seo";
import { getFullImageUrl } from "@/lib/getFullImageUrl";
import { apiFetch } from "@/lib/api";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const param = await params;

  const res = await apiFetch(
    `/activity/slug/${param.slug}`,
  );

  if (res.status === 404) {
    const redirectedSlug = res.url.split("/slug/")[1];

    if (redirectedSlug && redirectedSlug !== param.slug) {
      redirect(`/trip/${redirectedSlug}`);
    }

    return notFound();
  }

  if (!res.ok) {
    notFound();
  }

  const data = await res.json();

  const trip = data.data;

  const title = trip.seo?.metaTitle || trip.title;
  const description = trip.seo?.metaDescription || trip.overview;
  const seoImage = trip.seo?.featuredMedia || trip.images?.[0];

  return {
    title: title,
    description: description,
    alternates: {
      canonical: `${siteConfig.url}/trip/${trip.slug}`,
    },
    openGraph: {
      title: title,
      description: description,
      images: [
        {
          url: imageUrl(seoImage),
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: [imageUrl(seoImage)],
    },
    robots: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  };
}

export default async function TripPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const res = await apiFetch(
    `/activity/slug/${slug}`,
  );

  if (res.status === 404) {
    const redirectedSlug = res.url.split("/slug/")[1];

    if (redirectedSlug && redirectedSlug !== slug) {
      redirect(`/trip/${redirectedSlug}`);
    }

    return notFound();
  }

  if (!res.ok) {
    notFound();
  }

  if (res.status == 404) {
    return notFound();
  }

  if (!res.ok) {
    return (
      <main>
        <div className="container mx-auto p-8">
          <h1 className="text-2xl font-bold">Failed to fetch.</h1>
          <p className="mt-2 text-muted-foreground">
            The trip data could not be loaded.
          </p>
        </div>
      </main>
    );
  }

  const jsonres = await res.json();

  const trip = jsonres.data;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      {
        "@type": "ListItem",
        position: 2,
        name: "Package",
        item: `${siteUrl}/explore`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: trip.title,
      },
    ],
  };

  const offerSchema = trip.maxPrice
    ? {
        "@type": "AggregateOffer",
        priceCurrency: "USD",
        lowPrice: trip.price,
        highPrice: trip.maxPrice,
      }
    : {
        "@type": "Offer",
        price: trip.price,
        priceCurrency: "USD",
      };

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: trip.title,
    description: trip.overview,
    image: trip.images?.[0] ? imageUrl(trip.images[0]) : undefined,
    offers: offerSchema,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      reviewCount: "350",
    },
  };

  return (
    <main className="min-h-screen bg-canvas-soft">
      <Script
        id="schema-breadcrumb"
        type="application/ld+json"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="schema-product"
        type="application/ld+json"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      {/*Schema */}
      {trip.seo?.schema && (
        <Script
          id="schema"
          strategy="lazyOnload"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(safeParseSchema(trip.seo.schema)),
          }}
        ></Script>
      )}
      {/* Split header */}
      <section className="grid lg:grid-cols-2 bg-canvas">
        <div className="relative aspect-[4/3]">
          <Image
            src={trip.images[0]}
            alt={trip.title}
            fill
            priority
            sizes="50vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent lg:bg-none" />
        </div>
        <div className="flex items-center">
          <div className="w-full px-5 py-12 md:px-10 lg:px-14 xl:px-20">
            <h1 className="mt-3 text-4xl md:text-5xl xl:text-6xl font-bold text-ink leading-[1.05]">
              {trip.title}
            </h1>
            <TripHeaderDescription html={trip.overview} />
          </div>
        </div>
      </section>

      {/*Content starts */}
      <SectionNavigation additionalInfo={trip.additionalInfo} slug={slug} />
      <div className="container mx-auto px-4">
        <div className="grid gap-12 min-w-0 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="min-w-0!">
            <TripOverview trip={trip} />
            <div
              className="col-span-2
            content-body
             prose-base leading-loose
             prose-headings:text-ink prose-headings:font-bold
             prose-h1:text-xl md:prose-h1:text-3xl
             prose-h2:text-xl md:prose-h2:text-3xl  prose-h2:font-bold
             prose-h3:text-base md:prose-h3:text-xl
             prose-h4:text-sm md:prose-h4:text-lg
             prose-p:leading-relaxed  prose-p:text-base md:prose-p:text-xl
             prose-a:text-primary prose-a:underline
             prose-strong:text-ink prose-strong:font-bold
             prose-ul:my-2 prose-ol:my-2
             prose-li:text-ink prose-li:mb-1
             prose-blockquote:border-l-4 prose-blockquote:border-primary/70 prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-mute
             prose-img:rounded-2xl prose-img:my-6
             prose-code:bg-canvas-soft-2 prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm
             prose-pre:bg-ink prose-pre:text-canvas prose-pre:rounded-lg prose-pre:p-4
             prose-ul:list-none
             prose-li:relative prose-li:pl-8 prose-li:text-base md:prose-li:text-xl
             prose-li:before:absolute
             prose-li:before:left-0
             prose-li:before:top-[0.45em]
             prose-li:before:w-4 prose-li:before:h-4
             prose-li:before:mask-[url('data:image/svg+xml,%3Csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20viewBox=%270%200%2024%2024%27%20fill=%27none%27%20stroke=%27%23000%27%20stroke-width=%272.5%27%20stroke-linecap=%27round%27%20stroke-linejoin=%27round%27%3E%3Cpath%20d=%27M9%2018l6-6-6-6%27/%3E%3C/svg%3E')]
             prose-li:before:mask-contain
             prose-li:before:mask-no-repeat
             prose-li:before:bg-primary
             [&_ol_li]:before:content-none [&_ol_li]:pl-0
             prose max-w-none w-full
             wrap-break-word
             **:wrap-break-word
                   "
            >
              <div
                id="highlights"
                dangerouslySetInnerHTML={{
                  __html: decodeHtmlEntities(trip.highlights[0]),
                }}
              />
              <TripItinerary trip={trip} />

              {trip.videoIntro && (
                <>
                  <h2
                    id="video"
                    className="flex gap-1 items-center scroll-mt-28"
                  >
                    <LucidePlayCircle className="text-primary size-8" />{" "}
                    {trip.title}
                    &apos;s Video
                  </h2>
                  <div
                    id="video"
                    dangerouslySetInnerHTML={{
                      __html: decodeHtmlEntities(trip.videoIntro),
                    }}
                  />
                </>
              )}

              <div className="space-y-6 grid  md:grid-cols-2 mt-12 bg-canvas">
                <div className="border-r">
                  <IncludeExcludeCard
                    variant="include"
                    id="inclusions"
                    html={trip.inclusions[0]}
                  />
                </div>
                <IncludeExcludeCard
                  variant="exclude"
                  id="exclusions"
                  html={trip.exclusions[0]}
                />
              </div>

              {trip.additionalInfo.length > 0 && (
                <>
                  <h2
                    id="trip-info"
                    className="font-bold my-4 flex items-center gap-2 scroll-mt-28"
                  >
                     Good to Know
                  </h2>
                  {trip.additionalInfo.map((info: any, idx: any) => {
                    return (
                      <AdditionalInfoRenderer
                        key={idx}
                        index={idx}
                        item={info}
                      />
                    );
                  })}
                </>
              )}
              <TripFaq trip={trip} />
            </div>
          </div>
          <aside className="hidden lg:block">
            <div className="sticky top-16">
              <PricingCardSidebar
                price={trip.price}
                maxPrice={trip.maxPrice}
                slug={slug}
                title={trip.title}
              />
            </div>
          </aside>
        </div>
      </div>
      <section className="py-16 md:py-24" id="gallery">
        <div className="container mx-auto px-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-mute">
            Gallery
          </p>
          <h2 className="mt-2 font-bold text-3xl md:text-4xl text-ink">
            Photos from the trail
          </h2>
        </div>
        <div className="mt-8">
          <ImageGallery images={trip.images} keywords={[]} />
        </div>
      </section>
      <BottomBookingBar price={trip.price} slug={slug} title={trip.title} />
    </main>
  );
}
