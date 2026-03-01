"use client";

import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Calendar, Clock, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

// Images uploaded via Admin → Photos
const events = [
  {
    name: "Haldi",
    date: "June 12, 2026",
    time: "10:00 AM",
    venue: "Bride's Residence",
    mapUrl: "https://maps.google.com/?q=Wedding+Venue",
    images: ["/images/haldi-1.png", "/images/haldi-2.png", "/images/haldi-3.png"],
  },
  {
    name: "Mehendi",
    date: "June 13, 2026",
    time: "4:00 PM",
    venue: "Bride's Residence",
    mapUrl: "https://maps.google.com/?q=Wedding+Venue",
    images: ["/images/mehendi-1.png", "/images/mehendi-2.png", "/images/mehendi-3.png"],
  },
  {
    name: "Sangeet",
    date: "June 14, 2026",
    time: "7:00 PM",
    venue: "Grand Ballroom, Hotel Taj",
    mapUrl: "https://maps.google.com/?q=Taj+Hotel",
    images: ["/images/sangeet-1.png", "/images/sangeet-2.png", "/images/sangeet-3.png"],
  },
  {
    name: "Wedding",
    date: "June 15, 2026",
    time: "10:00 AM",
    venue: "Temple of Eternal Love",
    mapUrl: "https://maps.google.com/?q=Temple",
    images: ["/images/wedding-1.png", "/images/wedding-2.png", "/images/wedding-3.png"],
  },
  {
    name: "Reception",
    date: "June 15, 2026",
    time: "7:00 PM",
    venue: "Royal Gardens Banquet",
    mapUrl: "https://maps.google.com/?q=Royal+Gardens",
    images: ["/images/reception-1.png", "/images/reception-2.png", "/images/reception-3.png"],
  },
];

function EventCarousel({ images }: { images: string[] }) {
  const [current, setCurrent] = useState(0);
  const len = images.length;

  if (!len) return null;

  return (
    <div className="relative aspect-[4/3] sm:aspect-video rounded-lg overflow-hidden bg-warm-brown/10 min-w-[200px] sm:min-w-[280px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${images[current]}')` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      </AnimatePresence>
      {len > 1 && (
        <>
          <button
            type="button"
            onClick={() => setCurrent((c) => (c - 1 + len) % len)}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-cream flex items-center justify-center transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            onClick={() => setCurrent((c) => (c + 1) % len)}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-cream flex items-center justify-center transition-colors"
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCurrent(i)}
                className={`w-2 h-2 rounded-full transition-colors ${i === current ? "bg-gold" : "bg-white/60"}`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function Events() {
  return (
    <section id="events" className="py-20 sm:py-28 px-4 bg-cream-warm">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-gold text-sm tracking-[0.3em] uppercase mb-4">Celebrate With Us</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-charcoal mb-6">
            As we begin our forever…
          </h2>
          <p className="font-handwritten text-2xl sm:text-3xl text-gold mt-6">
            &quot;You are mine · I am yours · We are forever · PurNi&quot;
          </p>
        </motion.div>

        <div className="space-y-6">
          {events.map((event, i) => (
            <motion.div
              key={event.name}
              className="flex flex-col lg:flex-row gap-6 p-6 sm:p-8 rounded-xl bg-cream border border-gold/20 hover:border-gold/40 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="lg:w-80 flex-shrink-0">
                <EventCarousel images={event.images} />
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 flex-1 min-w-0">
                <div className="sm:w-36 flex-shrink-0">
                  <h3 className="text-2xl font-medium text-gold">{event.name}</h3>
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2 text-warm-brown">
                    <Calendar className="w-4 h-4 flex-shrink-0" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-warm-brown">
                    <Clock className="w-4 h-4 flex-shrink-0" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-warm-brown">
                    <MapPin className="w-4 h-4 flex-shrink-0" />
                    <span>{event.venue}</span>
                  </div>
                </div>
                <a
                  href={event.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-gold text-gold hover:bg-gold hover:text-cream transition-colors text-sm font-medium self-start"
                >
                  <MapPin className="w-4 h-4" />
                  View Map
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
