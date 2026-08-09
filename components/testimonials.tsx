import {
  StaggerTestimonials,
  type StaggerTestimonial,
} from "@/components/testimonial-stagger";
import Section from "@/components/section";
import SectionHeading from "@/components/section-heading";

export default async function Testimonials() {
  const res = await fetch(`${process.env.API_BASE_URL}/testimonial`, {
    cache: "force-cache",
  });
  const allTestimonials = await res.json();
  const testimonials: StaggerTestimonial[] = Array.isArray(allTestimonials)
    ? allTestimonials.slice(0, 12)
    : [];

  return (
    <Section className="bg-canvas-soft relative overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 10% 30%, #0f77be 0%, transparent 60%), radial-gradient(ellipse 70% 50% at 90% 70%, #1b77bc 0%, transparent 60%)",
        }}
      />
      <div className="relative">
        <SectionHeading
          title="The Feeling of True Achievement"
        />
        <StaggerTestimonials testimonials={testimonials} />
      </div>
    </Section>
  );
}
