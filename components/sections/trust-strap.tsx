import TripAdvisorRatingBadge from "@/components/tripadvisor-rating-badge";
import GoogleRatingBadge from "@/components/google-rating-badge";
import Section from "@/components/section";
import Image from "next/image";
import { cn } from "@/lib/utils";

const associations = [
  "/associations/taan.avif",
  "/associations/nepal-government.avif",
  "/associations/nma.avif",
  "/associations/ntb.avif",
];

export default function TrustStrap({dark}: {dark?: boolean}) {
  return (
    <Section className={cn(dark ? "bg-ink text-canvas" : "bg-canvas-soft-2 text-ink", "py-8 md:py-10")}>
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start gap-3">
          <span className="text-md font-medium">Reviews</span>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-6">
            {dark ?
              <TripAdvisorRatingBadge inverse/>
              :
                <TripAdvisorRatingBadge light />
            }
            {dark ?
              <GoogleRatingBadge inverse />
              :
              <GoogleRatingBadge/>
            }

          </div>
        </div>

        <div className="flex flex-col items-center gap-3">
          <span className="text-md font-medium">Associated With</span>
          <div className="flex gap-5">
            {associations.map((image, index) => (
              <Image
                alt={`Association ${index + 1}`}
                src={image}
                height={800}
                width={800}
                key={index}
                className="object-contain size-12"
              />
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
