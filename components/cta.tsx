import Link from "next/link";
import Image from "next/image";
import { Check } from "lucide-react";
import { apiFetch } from "@/lib/api";
import { getFullImageUrl } from "@/lib/getFullImageUrl";

const features = [
  "Expert local guides",
  "Fully customisable itinerary",
  "Plan what you include yourself",
];

export default async function Cta() {
  let members: { name: string; image?: string }[] = [];
  try {
    const res = await apiFetch("/team", { next: { revalidate: 3600 } });
    const json = await res.json();
    members = Object.values(json.data as Record<string, { name: string; image?: string }[]>)
      .flat()
      .filter((m) => m.image)
      .slice(0, 3);
  } catch {
    // ponytail: degrade to text-only CTA if team fetch fails
  }

  return (
    <section className=" text-white py-20 md:py-28 bg-link">
      <div className="container mx-auto max-w-6xl px-4 md:px-8 ">
        <div className="grid items-center gap-12 md:grid-cols-2">
          {members.length > 0 ? (
            members.length === 3 ? (
              <div className="grid grid-cols-2 gap-4">
                <Image
                  src={getFullImageUrl(members[0].image!)}
                  alt={members[0].name}
                  width={600}
                  height={900}
                  unoptimized
                  className="aspect-[2/3] w-full object-cover rounded-md"
                />
                <div className="flex flex-col gap-4 -mt-10">
                  {members.slice(1).map((member) => (
                    <Image
                      key={member.name}
                      src={getFullImageUrl(member.image!)}
                      alt={member.name}
                      width={600}
                      height={600}
                      unoptimized
                      className="aspect-square w-full object-cover rounded-md"
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div
                className={
                  members.length === 1
                    ? "flex items-center justify-center"
                    : "grid grid-cols-2 gap-4"
                }
              >
                {members.map((member) => (
                  <Image
                    key={member.name}
                    src={getFullImageUrl(member.image!)}
                    alt={member.name}
                    width={600}
                    height={800}
                    unoptimized
                    className={
                      members.length === 1
                        ? "w-full h-auto max-h-[480px] object-cover rounded-md shadow-card"
                        : "aspect-[3/4] w-full object-cover rounded-md"
                    }
                  />
                ))}
              </div>
            )
          ) : (
            <Image
              src="/images/guide.jpg"
              alt="Into Nepal Treks guide"
              width={600}
              height={400}
              unoptimized
              className="w-full h-auto max-h-[480px] object-cover rounded-md shadow-card"
            />
          )}

          <div className="text-center md:text-left">
            <h2 className="text-4xl md:text-6xl text-balance font-bold">
              Tailor your trip <span className="font-script text-tomato">with experts.</span>
            </h2>
            <p className="mt-5 text-lg text-white font-medium">
              Tell us what you dream of and our local guides will craft the
              perfect adventure — your dates, your budget, your pace.
            </p>

            <ul className="mt-8 space-y-3">
              {features.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-white/15">
                    <Check className="size-3.5" />
                  </span>
                  <span className="text-md text-white/90 font-medium">{feature}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-wrap items-center justify-center md:justify-start gap-4">
              <Link
                href="/contact"
                className="rounded-sm bg-canvas px-8 py-4 text-sm font-semibold tracking-wide text-ink shadow-float transition-colors hover:bg-canvas/90"
              >
                Contact Us
              </Link>
              <Link
                href="/design-your-trip"
                className="rounded-sm border border-white/40 px-8 py-4 text-sm font-semibold tracking-wide text-white transition-colors hover:bg-white/10"
              >
                Design Your Trip
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
