import Section from "@/components/section";
import SectionHeading from "@/components/section-heading";

const reasons = [
  {
    title: "Your Comfort Is Always on Our Minds",
    text: "Trekking in Nepal can be daunting, especially for beginners, so our guides always look out for quality tea houses offering the best Nepalese food and bed for your comfort.",
  },
  {
    title: "Responsive Support Team",
    text: "Ask us any questions any time of the day and we will respond within 24 hours via email or WhatsApp. Our team is knowledgeable in all trekking related inquiries.",
  },
  {
    title: "Your Safety Is Our Priority",
    text: "100% of our clients return home safely from our treks. On high intensity treks, our guides are equipped with pulse oximeters and are first aid trained.",
  },
  {
    title: "Enrich Your Experience With Local Guides",
    text: "Our fully certified guides share snippets of Nepali culture and insights wherever you go, with more than 8 years of trekking experience on average and a good command of English. At the end of the journey, you gain a new Nepalese friend!",
  },
  {
    title: "Varied and Customised Tours and Treks",
    text: "Our itineraries serve as a guide — we tailor tours to your interest, budget and time. From hiking, yoga and rafting to paragliding and bungee jumping, we'll work out a customised itinerary at the best price just for you.",
  },
  {
    title: "Fully Licensed and Great Track Record",
    text: "We are a fully licensed travel operator based in Pokhara, registered with many tourism associations under the government of Nepal, with customers who keep coming back with their friends.",
  },
];

export default function WhySection() {
  return (
    <Section className="bg-canvas">
      <SectionHeading
        eyebrow="Why us"
        title={
          <>
            Why choose <em className="italic font-light">Into Nepal</em> Treks?
          </>
        }
        subtitle="We filter out the noise, focus on what truly matters, and give you the kind of clarity that lets your journey shine."
      />

      <div className="grid gap-x-10 gap-y-14 md:grid-cols-3">
        {reasons.map((reason, i) => (
          <div key={reason.title} className="space-y-4">
            <p className="font-serif text-5xl text-link">
              {String(i + 1).padStart(2, "0")}
            </p>
            <h3 className="font-serif text-2xl text-ink">{reason.title}</h3>
            <p className="text-sm leading-relaxed text-body">{reason.text}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
