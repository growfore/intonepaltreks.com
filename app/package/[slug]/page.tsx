import {
  LucideCheckCircle2,
  LucideInfo,
  LucidePlayCircle,
  LucideXCircle,
} from "lucide-react";
export const dynamic = "force-static";
export const revalidate = 3600;
export async function generateStaticParams() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/activity?page=1&limit=1000`,
  );
  const data = await res.json();
  const trips: { slug: string }[] = data.data || [];
  return trips.map((trip) => ({ slug: trip.slug }));
}
import ImageGallery from "@/components/image-gallery";
import PricingCardSidebar from "@/components/card/pricing-card";
import { AdditionalInfoRenderer } from "@/components/additional-info-renderer";
import { TripFaqs } from "@/components/v0/trip-faqs";
import { TripItinerary } from "@/components/v0/trip-itinerary";
import { TripOverview } from "@/components/v0/trip-overview";
import { decodeHtmlEntities } from "@/lib/html-decoder";
import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import Script from "next/script";
import TripAdvisorRatingBadge from "@/components/tripadvisor-rating-badge";
import GoogleRatingBadge from "@/components/google-rating-badge";
import { Separator } from "@/components/ui/separator";
import { SectionNavigation } from "@/components/section-nav";
import { BottomBookingBar } from "@/components/bottom-booking-bar";
import { safeParseSchema } from "@/lib/safeParseSchema";
import { siteConfig } from "@/lib/siteConfig";
import { siteUrl, imageUrl } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const param = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/activity/slug/${param.slug}`,
  );

  if (res.status === 404) {
    const redirectedSlug = res.url.split("/slug/")[1];

    if (redirectedSlug && redirectedSlug !== param.slug) {
      redirect(`/package/${redirectedSlug}`);
    }

    return notFound();
  }

  if (!res.ok) {
    notFound();
  }

  const data = await res.json();

  const trip = data.data;

  const title = trip.seo?.metaTitle || trip.title;
  const description = trip.seo?.metaDescription || trip.shortDescription;
  const seoImage = trip.seo?.featuredMedia || trip.images?.[0];

  return {
    title: title,
    description: description,
    keywords: trip.keywords?.join(", ") || undefined,
    alternates: {
      canonical: `${siteConfig.url}/package/${trip.slug}`,
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
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/activity/slug/${slug}`,
  );

  if (res.status === 404) {
    const redirectedSlug = res.url.split("/slug/")[1];

    if (redirectedSlug && redirectedSlug !== slug) {
      redirect(`/package/${redirectedSlug}`);
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
    description: trip.shortDescription,
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
      <ImageGallery images={trip.images} keywords={trip.keywords || []} />

      <div className="container mx-auto py-6 md:py-10 px-4 md:px-0">
        <h1 className="text-3xl md:text-4xl font-bold -tracking-[1.44px] text-ink mb-4">
          {trip.title}
        </h1>
        <div className="flex items-center gap-2">
          {/*Rated {siteConfig.reviews.tripadvisor.rating}/5 in Tripadvisor*/}
          <div className="flex flex-row flex-wrap items-center gap-2 md:gap-4">
            <GoogleRatingBadge />
            <Separator orientation="vertical" className="h-4 md:h-6" />
            <TripAdvisorRatingBadge light />
          </div>
        </div>
      </div>

      {/*Content starts */}
      <SectionNavigation additionalInfo={trip.additionalInfo} />
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 min-w-0">
          <div className="col-span-3 min-w-0!">
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
             prose-li:text-ink/70 prose-li:mb-1
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
                className="mt-4"
                dangerouslySetInnerHTML={{
                  __html: decodeHtmlEntities(trip.shortDescription),
                }}
              />
              <div
                id="highlights"
                dangerouslySetInnerHTML={{
                  __html: decodeHtmlEntities(trip.highlights[0]),
                }}
              />
              <div
                id="intro"
                dangerouslySetInnerHTML={{
                  __html: decodeHtmlEntities(trip.fullDescription),
                }}
              />
              <TripItinerary trip={trip} />
              {trip.map && (
                <div
                  id="map"
                  dangerouslySetInnerHTML={{
                    __html: decodeHtmlEntities(trip.map),
                  }}
                />
              )}

              {trip.videoUrl && (
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
                      __html: decodeHtmlEntities(trip.videoUrl),
                    }}
                  />
                </>
              )}

              <div>
                <h2
                  id="inclusions"
                  className="flex gap-4 items-center scroll-mt-28"
                >
                  <LucideCheckCircle2 /> Inclusions
                </h2>
                <div
                  id="inclusions"
                  dangerouslySetInnerHTML={{
                    __html: decodeHtmlEntities(trip.inclusions[0]),
                  }}
                  className="bg-canvas border border-hairline w-full mt-4 rounded-2xl p-6
                    prose-li:before:mask-[url('/icons/greentick.png')]
                    prose-li:before:rotate-360
                    [&_ol_li]:before:content-none [&_ol_li]:pl-0
                     "
                />
              </div>

              <div>
                <h2
                  id="exclusions"
                  className="flex gap-4 items-center text-error-deep! scroll-mt-28"
                >
                  <LucideXCircle className="text-error-deep" /> Exclusions{" "}
                </h2>
                <div
                  id="exclusions"
                  dangerouslySetInnerHTML={{
                    __html: decodeHtmlEntities(trip.exclusions[0]),
                  }}
                  className="w-full bg-error-soft/60 border border-error/20 rounded-2xl p-6 mt-4 prose-li:before:mask-[url('/icons/cross.png')] [&_ol_li]:before:content-none [&_ol_li]:pl-0"
                />
              </div>

              {trip.additionalInfo.length > 0 && (
                <>
                  <h2
                    id="trip-info"
                    className="font-bold my-4 flex items-center gap-2 scroll-mt-28"
                  >
                    <LucideInfo className="size-8" /> Trip Information
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
              <div id="faqs">
                {trip.faqs && trip.faqs.length > 1 && <TripFaqs trip={trip} />}
              </div>
            </div>
          </div>
          <div className="col-span-1 hidden md:block">
            <div className="sticky top-32">
              <PricingCardSidebar
                slug={slug}
                title={trip.title}
                price={trip.price}
                maxPrice={trip.maxPrice}
              />
            </div>
          </div>
        </div>
      </div>
      <BottomBookingBar price={trip.price} slug={slug} title={trip.title} />
    </main>
  );
}
