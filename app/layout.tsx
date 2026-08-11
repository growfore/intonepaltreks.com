import type { Metadata } from "next";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Navigation } from "@/components/navigation";
import { Analytics } from "@vercel/analytics/next";
import { livvic, montserrat, satisfy } from "@/lib/font";
import { siteConfig } from "@/lib/siteConfig";
import { siteUrl } from "@/lib/seo";
import Footer from "@/components/footer";
import Cta from "@/components/cta";
import BackToTop from "@/components/back-to-top";
import FloatingWhatsAppIcon from "@/components/floating-whatsapp";
import { TooltipProvider } from "@/components/ui/tooltip";
import Script from "next/script";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    siteName: siteConfig.name,
    type: "website",
    locale: "en_US",
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
    images: [`${siteUrl}/og.png`],
  },
  robots: {
    index: true,
    follow: true,
    "max-video-preview": -1,
    "max-image-preview": "large",
    "max-snippet": -1,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteConfig.name,
  url: siteUrl,
  logo: `${siteUrl}${siteConfig.logo}`,
  image: `${siteUrl}/og.png`,
  description: siteConfig.description,
  foundingDate: siteConfig.established,
  address: {
    "@type": "PostalAddress",
    streetAddress: siteConfig.address.street,
    addressLocality: siteConfig.address.city,
    addressRegion: siteConfig.address.district,
    postalCode: siteConfig.address.postalCode,
    addressCountry: siteConfig.address.country,
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: siteConfig.phoneNumbers[0].phone,
      email: siteConfig.email,
      contactType: "customer service",
      availableLanguage: ["English", "Nepali"],
    },
  ],
  sameAs: [
    siteConfig.socials.facebook,
    siteConfig.socials.instagram,
  ].filter(Boolean),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${satisfy.variable} ${montserrat.variable} ${livvic.variable}`}>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id="
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-KP704N0WV3');
        `}
      </Script>
      <body className="antialiased">
        <TooltipProvider>
          <Navigation />
          <div className="pt-16 md:pt-[88px]">{children}</div>
          <ToastContainer position="top-right" theme="light" />
          <Analytics />
          <Cta />
          <BackToTop />
          <Footer />
          <FloatingWhatsAppIcon />
        </TooltipProvider>
        <Script
          id="schema-organization"
          type="application/ld+json"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </body>
    </html>
  );
}
