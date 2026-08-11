import Image from "next/image";
import Section from "@/components/section";
import SectionHeading from "@/components/section-heading";
import TrustStrap from "./trust-strap";

const reasons = [
  {
    title: "Safety, Comfort & Support",
    text: "From carefully selected tea houses and comfortable accommodation to first-aid-trained guides and high-altitude safety equipment, we prioritize your wellbeing throughout the journey. Our support team is also available whenever you need assistance.",
    icon: "/icons/protection.png",
  },
  {
    title: "Experienced Local Guides",
    text: "Travel with certified local guides who bring years of trekking experience and genuine knowledge of Nepalese culture, landscapes, and traditions. More than just guides, they help make your journey personal and memorable.",
    icon: "/icons/tour-guide.png",
  },
  {
    title: "Tailored Trips, Trusted Operator",
    text: "Choose from our proven itineraries or build a trip around your interests, budget, and schedule. As a fully licensed Pokhara-based operator with a strong track record, we handle everything from trekking and hiking to adventure activities and cultural experiences.",
    icon: "/icons/map.png",
  },
];

export default function WhySection() {
  return (
    <div>

    <Section className="bg-canvas">
      <SectionHeading
        eyebrow="Why us"
        title={
          <div className="font-bold">
            Why choose <span className="font-black text-primary">Into Nepal</span> Treks?
          </div>
        }
        subtitle="We filter out the noise, focus on what truly matters, and give you the kind of clarity that lets your journey shine."
      />

      <div className="grid gap-x-10 gap-y-14 md:grid-cols-3">
        {reasons.map((reason, i) => (
          <div key={reason.title} className="space-y-4 flex flex-col items-center text-center">
            <Image src={reason.icon} alt="" width={80} height={48} />
            <h3 className="text-2xl text-ink font-medium">{reason.title}</h3>
            <p className="text-md leading-relaxed text-body">{reason.text}</p>
          </div>
        ))}
      </div>
    </Section>
    <TrustStrap/>
    </div>
  );
}
