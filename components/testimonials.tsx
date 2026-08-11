import {
  StaggerTestimonials,
  type StaggerTestimonial,
} from "@/components/testimonial-stagger";
import Section from "@/components/section";
import SectionHeading from "@/components/section-heading";
import TripAdvisorRatingBadge from "@/components/tripadvisor-rating-badge";
import GoogleRatingBadge from "@/components/google-rating-badge";
import { apiFetch } from "@/lib/api";

export default async function Testimonials() {
  let testimonials: StaggerTestimonial[] = [];
  try {
    const res = await apiFetch(`/testimonial`, { cache: "force-cache" });
    if (!res.ok) throw new Error(`/testimonial failed: ${res.status}`);
    const json = await res.json();
    const list: StaggerTestimonial[] = Array.isArray(json)
      ? json
      : ((json as { data?: StaggerTestimonial[] })?.data ?? []);
    testimonials = list.slice(0, 12);
  } catch {
    console.error("Failed to fetch testimonials");
  }

  if (testimonials.length === 0) return null;

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
        eyebrow={"Testimonials"}
          title={<div className="font-bold">The Feeling of True Achievement</div>}
          subtitle="Real stories from travelers who pushed their limits, discovered Nepal, and returned home with memories that last long after the journey ends."
        />
        <StaggerTestimonials testimonials={testimonials} />
        <div className="mt-10 flex flex-wrap items-center justify-center gap-8">
          <TripAdvisorRatingBadge light />
          <GoogleRatingBadge />
        </div>
      </div>
    </Section>
  );
}
