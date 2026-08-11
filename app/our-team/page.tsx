import type { Metadata } from "next";
import { siteConfig } from "@/lib/siteConfig";
import { siteUrl } from "@/lib/seo";
import { apiFetch } from "@/lib/api";
import TeamCard from "@/components/card/member-card";
import PageHeader from "@/components/page-header";
import SectionHeading from "@/components/section-heading";

export const metadata: Metadata = {
  title: "Our Team",
  description:
    "Meet the experienced team behind Into Nepal Treks. Professional trekking guides, travel planners, and adventure experts dedicated to your Himalayan experience.",
  keywords:
    "Into Nepal Treks team, Nepal trekking guides, Himalayan guides, Pokhara trekking team, Nepal adventure experts, trekking guides Nepal",
  openGraph: {
    title: "Our Team | Into Nepal Treks",
    description:
      "Meet the experienced guides and travel experts behind Into Nepal Treks.",
    url: `${siteUrl}/our-team`,
    images: [
      {
        url: `${siteUrl}/og.png`,
        width: 1200,
        height: 630,
        alt: "Our Team - Into Nepal Treks",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Team | Into Nepal Treks",
    description:
      "Meet the experienced guides and travel experts behind Into Nepal Treks.",
    images: [`${siteUrl}/og.png`],
  },
  alternates: {
    canonical: `${siteConfig.url}/our-team`,
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
  },
};

export default async function OurTeam() {
  const res = await apiFetch(`/team`);

  const json = await res.json();
  const data = json.data;

  const departments = data;

  return (
    <>
      <PageHeader
        title="Our Team."
        subtitle="Meet the people behind every journey we create. Our team is made up of experienced guides, travel planners, and dedicated professionals who work together to deliver safe, memorable, and well-crafted adventures. From the mountains to your screen, every detail is handled with care."
      />
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24 space-y-16">
        {Object.entries(departments).map(([deptId, members]) => (
          <div key={deptId}>
            <SectionHeading
              align="left"
              className="mb-8"
              title={
                <div className="font-bold">
                  {/*@ts-expect-error no type mentioned*/}
                  {members[0]?.department?.name}
                </div>
              }
            />

            {/* Members */}
            <div className="grid gap-4">
              {/*@ts-expect-error no type mentioned*/}
              {members.map((member) => (
                <TeamCard
                  key={member.id}
                  name={member.name}
                  designation={member.designation}
                  description={member.about}
                  image={member.image}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
