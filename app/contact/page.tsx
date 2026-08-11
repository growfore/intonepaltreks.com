import type { Metadata } from "next";
import { siteConfig } from "@/lib/siteConfig";
import { siteUrl } from "@/lib/seo";
import ContactForm from "@/components/contact-form";
import MapSection from "@/components/map-section";
import ContactInfo from "@/components/contact-info";
import PageHeader from "@/components/page-header";
import Section from "@/components/section";
import TrustStrap from "@/components/sections/trust-strap";

export const metadata: Metadata = {
  title: "Contact Us - Get in Touch",
  description:
    "Contact Into Nepal Treks for your trekking adventure. Reach us via phone, email, or WhatsApp. Located in Lakeside, Pokhara, Nepal.",
  keywords:
    "contact Into Nepal Treks, Nepal trekking contact, Pokhara trekking agency, book Nepal trek, trekking inquiry, Pokhara trekking company",
  openGraph: {
    type: "website",
    url: `${siteUrl}/contact`,
    title: "Contact Us | Into Nepal Treks",
    description:
      "Get in touch with Into Nepal Treks for your Himalayan adventure. We're here to help plan your perfect Nepal trekking experience.",
    images: [
      {
        url: `${siteUrl}/og.png`,
        width: 1200,
        height: 630,
        alt: "Contact Into Nepal Treks",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | Into Nepal Treks",
    description:
      "Get in touch with Into Nepal Treks for your Himalayan adventure.",
    images: [`${siteUrl}/og.png`],
  },
  alternates: {
    canonical: `${siteConfig.url}/contact`,
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
  },
};

const ContactPage = () => {
  return (
    <>
      <PageHeader
        title="Contact Us"
        subtitle="Fill out the form below and we'll receive your message directly on WhatsApp!"
      />
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-4 mx-auto">
          <ContactForm />
          <ContactInfo />
        </div>
        <MapSection />
        <TrustStrap/>
      </Section>
    </>
  );
};

export default ContactPage;
