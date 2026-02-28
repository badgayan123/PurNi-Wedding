"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const gallery = [
  { url: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800", caption: "Ring Exchange" },
  { url: "https://images.unsplash.com/photo-1511285560929-80b456fea0e9?q=80&w=800", caption: "Portrait" },
  { url: "https://images.unsplash.com/photo-1529634810-b333c7ea4308?q=80&w=800", caption: "Candid" },
  { url: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=800", caption: "Family Blessing" },
  { url: "https://images.unsplash.com/photo-1525268323446-0505b6fe7778?q=80&w=800", caption: "Engagement" },
  { url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=800", caption: "Together" },
  { url: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=800", caption: "Joy" },
  { url: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=800", caption: "Moment" },
  { url: "https://images.unsplash.com/photo-1529634810-b333c7ea4308?q=80&w=800", caption: "Celebration" },
  { url: "https://images.unsplash.com/photo-1478146896981-b80eb4564a2e?q=80&w=800", caption: "Forever" },
];

function GalleryImage({ item, index }: { item: { url: string; caption: string }; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="relative aspect-square rounded-lg overflow-hidden cursor-pointer"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500"
        style={{
          backgroundImage: `url('${item.url}')`,
          transform: hovered ? "scale(1.08)" : "scale(1)",
        }}
      />
      <div
        className={`absolute inset-0 bg-charcoal/60 flex items-end justify-center p-4 transition-opacity duration-300 ${hovered ? "opacity-100" : "opacity-0"}`}
      >
        <span className="text-cream font-medium">{item.caption}</span>
      </div>
    </motion.div>
  );
}

export default function Gallery() {
  return (
    <section id="gallery" className="py-20 sm:py-28 px-4 bg-cream">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-gold text-sm tracking-[0.3em] uppercase mb-4">Our Moments</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-charcoal">
            A glimpse of our journey
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {gallery.slice(0, 20).map((item, i) => (
            <GalleryImage key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
