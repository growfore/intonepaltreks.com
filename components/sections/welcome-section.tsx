import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import Section from "@/components/section";

export default function WelcomeSection() {
  return (
    <Section className="bg-canvas">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center">
        <div className="md:col-span-7">
          <p className="text-[11px] uppercase tracking-[0.24em] text-link mb-4">
            Our story
          </p>
          <h2 className="text-display text-4xl md:text-6xl text-ink text-balance mb-8">
            Explore the Himalaya <br className="hidden md:block" /> with{" "}
            <em className="italic font-light">Into Nepal</em>.
          </h2>

          <div className="flex flex-col gap-6 text-body text-base md:text-lg leading-relaxed">
            <p>
              <span className="font-semibold text-xl text-ink">Namaste</span>,
              my friends,
            </p>
            <p>
              Ever since I was a kid playing on the slopes of the Great
              Himalaya, I had a dream of becoming a trekking guide one day so
              that I can bring travelers on the best adventures in Nepal and
              show them how charming Nepal is.
            </p>
            <p>
              Today, I have close to a decade of experience bringing
              travellers on the Nepal Himalayan treks and tours in our
              charming towns and cities. Our team is made up of a small group
              of experienced Nepalese guides who are committed to taking the
              utmost care for your comfort and safety on all treks and tours.
            </p>
            <p className="font-serif text-2xl text-ink mt-2">Arjun</p>
          </div>

          <Link href="/about-us" className="mt-10 inline-block">
            <Button>Read More <ChevronRight /></Button>
          </Link>
        </div>

        <div className="md:col-span-5">
          <div className="relative max-w-md mx-auto md:mx-0">
            <Image
              src="/images/arjun.png"
              alt="Arjun — founder of Into Nepal Treks"
              width={540}
              height={540}
              className="w-full h-auto object-cover rounded-md shadow-card"
            />
            <div className="absolute -bottom-5 left-4 md:left-8 bg-canvas rounded-md px-5 py-3 shadow-card">
              <p className="text-[11px] font-medium uppercase tracking-widest text-mute">
                Licensed &amp; Certified
              </p>
              <p className="text-sm font-semibold text-ink mt-0.5">
                Local Nepali Guide Team
              </p>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
