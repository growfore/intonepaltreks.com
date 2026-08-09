"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";

const FADE_IN_ANIMATION_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 20 },
  },
};

export default function Cta() {
  return (
    <section className="bg-link text-white py-20 md:py-28">
      <div className="container mx-auto max-w-4xl px-4 md:px-8 text-center">
        <motion.h1
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.08 } },
          }}
          className="text-display text-5xl md:text-7xl text-balance"
        >
          {"Let's plan your Nepal adventure".split(" ").map((word, i) => (
            <motion.span
              key={i}
              variants={FADE_IN_ANIMATION_VARIANTS}
              className="inline-block"
            >
              {word}&nbsp;
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          initial="hidden"
          animate="show"
          variants={FADE_IN_ANIMATION_VARIANTS}
          transition={{ delay: 0.4 }}
          className="mt-6 max-w-xl mx-auto text-lg text-white/80"
        >
          Tell us what you dream of — Annapurna, Everest, or a fully custom
          itinerary — and our local guides will craft the perfect adventure.
        </motion.p>

        <motion.div
          initial="hidden"
          animate="show"
          variants={FADE_IN_ANIMATION_VARIANTS}
          transition={{ delay: 0.5 }}
        >
          <Link href="/booking">
            <button className="mt-10 rounded-sm bg-canvas px-10 py-4 text-sm font-semibold tracking-wide text-ink shadow-float transition-colors hover:bg-canvas/90">
              Book Your Trip
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
