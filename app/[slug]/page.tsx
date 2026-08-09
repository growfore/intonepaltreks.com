import { MyBreadCrumb } from "@/components/etbreadcrumb";
import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import Image from "next/image";
import Script from "next/script";
import { parseHTMLContent } from "@/lib/parse-html-content";
import PackagesBlock from "@/components/packages-block";
import { decodeHtmlEntities } from "@/lib/html-decoder";
import { getFullImageUrl } from "@/lib/getFullImageUrl";
import { siteConfig } from "@/lib/siteConfig";
import { siteUrl, imageUrl } from "@/lib/seo";
import InfoSidebar from "@/components/info-sidebar";

export const dynamic = "force-static";
export const revalidate = 3600;

export async function generateStaticParams() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/info-page`,
  );
  const data = await res.json();
  const pages: { slug: string }[] = data.infoPages || [];
  return pages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const param = await params;
  const slug = param.slug;

  const URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/info-page/slug/${slug}`;

  const response = await fetch(URL);

  if (response.status === 404) {
    const redirectedSlug =
      response.url.split("/")[response.url.split("/").length - 1];

    if (redirectedSlug && redirectedSlug !== slug) {
      redirect(`/${redirectedSlug}`);
    }
    return notFound();
  }

  if (!response.ok) {
    return {
      title: "Page Not Found",
      description: "This page does not exist.",
    };
  }

  const resJSON = await response.json();
  const blog = resJSON.infoPage;

  const ogImage = blog.coverImage
    ? { url: imageUrl(blog.coverImage), width: 1200, height: 630, alt: blog.metaTitle || blog.title }
    : { url: `${siteUrl}/og.png`, width: 1200, height: 630, alt: siteConfig.name };

  return {
    title: blog.metaTitle || blog.title,
    description: blog.metaDescription || undefined,
    keywords: blog.keywords?.join(", ") || undefined,
    alternates: {
      canonical: `${siteConfig.url}/${blog.slug}`,
    },
    openGraph: {
      title: blog.metaTitle || blog.title,
      description: blog.metaDescription || undefined,
      images: ogImage,
      type: "article",
      publishedTime: blog.createdAt || undefined,
      modifiedTime: blog.updatedAt || undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: blog.metaTitle || blog.title,
      description: blog.metaDescription || undefined,
      images: [imageUrl(blog.coverImage)],
    },
    robots: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  };
}

export default async function BlogSingle({
  params,
}: {
  params: { slug: string } | Promise<{ slug: string }>;
}) {
  const param = await params;
  const slug = param.slug;

  const URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/info-page/slug/${slug}`;
  const response = await fetch(URL);

  if (response.status === 404) {
    const redirectedSlug =
      response.url.split("/")[response.url.split("/").length - 1];

    if (redirectedSlug && redirectedSlug !== slug) {
      redirect(`/${redirectedSlug}`);
    }
    return notFound();
  }

  if (!response.ok) {
    return notFound();
  }

  const resJSON = await response.json();
  const blog = resJSON.infoPage;

  const blocks = parseHTMLContent(decodeHtmlEntities(blog.content));

  const packagesMap = new Map<number, any[]>();
  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];
    if (block.type === "packages") {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/activity?category=${block.config.category}&limit=${block.config.count}`,
          { cache: "no-store" },
        );
        const json = await res.json();
        packagesMap.set(i, json.data);
      } catch {
        packagesMap.set(i, []);
      }
    }
  }

  const breadcrumbItems = [{ label: "Home", href: "/" }];
  breadcrumbItems.push({ label: blog.title, href: "#" });

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: blog.metaTitle || blog.title,
    description: blog.metaDescription || undefined,
    image: blog.coverImage ? imageUrl(blog.coverImage) : undefined,
    datePublished: blog.createdAt || undefined,
    dateModified: blog.updatedAt || undefined,
    author: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}${siteConfig.logo}`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/${blog.slug}`,
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      {
        "@type": "ListItem",
        position: 2,
        name: blog.title,
      },
    ],
  };

  return (
    <div className="max-w-6xl mx-auto">
      <Script
        id="schema-article"
        type="application/ld+json"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Script
        id="schema-breadcrumb"
        type="application/ld+json"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <MyBreadCrumb items={breadcrumbItems} />
      <section
        className="pt-8 md:pt-4 p-2
        prose-base leading leading-relaxed
        prose-headings:text-ink prose-headings:font-bold
        prose-h1:text-xl md:prose-h1:text-3xl
        prose-h2:text-xl md:prose-h2:text-3xl   prose-h2:font-bold
        prose-h3:text-base md:prose-h3:text-xl
        prose-h4:text-sm md:prose-h4:text-lg
        prose-p:leading-relaxed prose-p:mb-4 prose-p:mt-0 prose-p:text-base md:prose-p:text-xl
        prose-a:text-primary prose-a:underline
        prose-strong:text-ink prose-strong:font-bold
        prose-ul:my-2 prose-ol:my-2
        prose-li:text-ink prose-li:mb-1
        prose-blockquote:border-l-4 prose-blockquote:border-primary/70 prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-mute
        prose-img:rounded-lg prose-img:my-6
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
        <header className="border-b border-accent p-2">
          <h1 className="text-3xl md:text-5xl font-bold  leading-tight max-w-4xl">
            {blog?.title}
          </h1>
          <div className="flex justify-between gap-4 text-sm text-foreground w-full mt-4 items-center">
            <div className="flex items-center gap-8">
              <time className="flex items-center">
                Last Updated:{" "}
                {new Date(blog.updatedAt).toLocaleString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                })}
              </time>
            </div>
          </div>
        </header>

        <div className="grid md:grid-cols-4 gap-8 py-4">
          <div className="md:col-span-3 px-2">
            <div>
              {/* Featured Image */}
              {blog.coverImage && (
                <Image
                  src={getFullImageUrl(blog?.coverImage)}
                  alt={blog?.imageAlt || blog?.title}
                  height={1280}
                  width={1920}
                  unoptimized
                  className="w-full h-auto object-cover mb-8 rounded-lg p-2"
                />
              )}
              {blocks.map((block, i) => {
                if (block.type === "html") {
                  return (
                    <div
                      key={i}
                      dangerouslySetInnerHTML={{ __html: block.content }}
                    />
                  );
                }

                if (block.type === "packages") {
                  return (
                    <PackagesBlock
                      key={i}
                      packages={packagesMap.get(i) || []}
                    />
                  );
                }

                return null;
              })}
            </div>
          </div>
          <InfoSidebar />
        </div>
      </section>
    </div>
  );
}
