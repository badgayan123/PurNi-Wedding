"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

// Images uploaded via Admin → Photos
const brideFamily = [
  { name: "Father", role: "Father of the Bride", image: "/images/bride-family-1.png" },
  { name: "Mother", role: "Mother of the Bride", image: "/images/bride-family-2.png" },
  { name: "Sister", role: "Sister", image: "/images/bride-family-3.png" },
  { name: "Brother", role: "Brother", image: "/images/bride-family-4.png" },
  { name: "Grandmother", role: "Grandmother", image: "/images/bride-family-5.png" },
];

const groomFamily = [
  { name: "Father", role: "Father of the Groom", image: "/images/groom-family-1.png" },
  { name: "Mother", role: "Mother of the Groom", image: "/images/groom-family-2.png" },
  { name: "Brother", role: "Brother", image: "/images/groom-family-3.png" },
  { name: "Sister", role: "Sister", image: "/images/groom-family-4.png" },
  { name: "Grandfather", role: "Grandfather", image: "/images/groom-family-5.png" },
];

function FamilyCarousel({
  members,
  title,
}: {
  members: { name: string; role: string; image: string }[];
  title: string;
}) {
  const [current, setCurrent] = useState(0);
  const len = members.length;

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <h3 className="text-center text-gold font-medium text-lg tracking-widest mb-6">{title}</h3>
      <div className="relative max-w-md mx-auto">
        <div className="aspect-[3/4] rounded-xl overflow-hidden bg-cream-warm border border-gold/20 shadow-lg">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              className="relative w-full h-full group"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url('${members[current].image}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-cream">
                <h4 className="text-xl font-medium">{members[current].name}</h4>
                <p className="text-gold-light/90 text-sm mt-1">{members[current].role}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {len > 1 && (
          <>
            <button
              type="button"
              onClick={() => setCurrent((c) => (c - 1 + len) % len)}
              className="absolute left-0 sm:-left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-gold/90 hover:bg-gold text-cream flex items-center justify-center transition-colors shadow-lg"
              aria-label="Previous"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              type="button"
              onClick={() => setCurrent((c) => (c + 1) % len)}
              className="absolute right-0 sm:-right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-gold/90 hover:bg-gold text-cream flex items-center justify-center transition-colors shadow-lg"
              aria-label="Next"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {members.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setCurrent(i)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${i === current ? "bg-gold scale-110" : "bg-white/60 hover:bg-white/80"}`}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
}

export default function Family() {
  return (
    <section id="family" className="py-20 sm:py-28 px-4 bg-cream">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <p className="text-gold text-sm tracking-[0.3em] uppercase mb-4">Our Families</p>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-charcoal">
          Two families, one love
        </h2>
      </motion.div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 lg:gap-12">
        <FamilyCarousel members={brideFamily} title="Bride's Family" />
        <FamilyCarousel members={groomFamily} title="Groom's Family" />
      </div>
    </section>
  );
}
