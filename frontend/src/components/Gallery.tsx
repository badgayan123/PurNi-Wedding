"use client";

import { motion } from "framer-motion";
import { useState } from "react";

// Images uploaded via Admin → Photos (up to 20)
const GALLERY_CAPTIONS = ["Ring Exchange", "Portrait", "Candid", "Family Blessing", "Engagement", "Together", "Joy", "Moment", "Celebration", "Forever", "Love", "Smile", "Blessing", "Ceremony", "Dance", "Tradition", "Promise", "Together", "Happiness", "PurNi"];
const gallery = Array.from({ length: 20 }, (_, i) => ({
  url: `/images/gallery-${i + 1}.png`,
  caption: GALLERY_CAPTIONS[i] || `Photo ${i + 1}`,
}));

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
