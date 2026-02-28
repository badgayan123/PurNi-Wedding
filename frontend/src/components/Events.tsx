"use client";

import { motion } from "framer-motion";
import { MapPin, Calendar, Clock } from "lucide-react";

const events = [
  {
    name: "Haldi",
    date: "June 12, 2026",
    time: "10:00 AM",
    venue: "Bride's Residence",
    mapUrl: "https://maps.google.com/?q=Wedding+Venue",
  },
  {
    name: "Mehendi",
    date: "June 13, 2026",
    time: "4:00 PM",
    venue: "Bride's Residence",
    mapUrl: "https://maps.google.com/?q=Wedding+Venue",
  },
  {
    name: "Sangeet",
    date: "June 14, 2026",
    time: "7:00 PM",
    venue: "Grand Ballroom, Hotel Taj",
    mapUrl: "https://maps.google.com/?q=Taj+Hotel",
  },
  {
    name: "Wedding",
    date: "June 15, 2026",
    time: "10:00 AM",
    venue: "Temple of Eternal Love",
    mapUrl: "https://maps.google.com/?q=Temple",
  },
  {
    name: "Reception",
    date: "June 15, 2026",
    time: "7:00 PM",
    venue: "Royal Gardens Banquet",
    mapUrl: "https://maps.google.com/?q=Royal+Gardens",
  },
];

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
            &quot;You are mine · I am yours · We are forever&quot;
          </p>
        </motion.div>

        <div className="space-y-6">
          {events.map((event, i) => (
            <motion.div
              key={event.name}
              className="flex flex-col sm:flex-row sm:items-center gap-6 p-6 sm:p-8 rounded-xl bg-cream border border-gold/20 hover:border-gold/40 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="sm:w-48 flex-shrink-0">
                <h3 className="text-2xl font-medium text-gold">{event.name}</h3>
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2 text-warm-brown">
                  <Calendar className="w-4 h-4" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-2 text-warm-brown">
                  <Clock className="w-4 h-4" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center gap-2 text-warm-brown">
                  <MapPin className="w-4 h-4" />
                  <span>{event.venue}</span>
                </div>
              </div>
              <a
                href={event.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gold text-gold hover:bg-gold hover:text-cream transition-colors text-sm font-medium"
              >
                <MapPin className="w-4 h-4" />
                View Map
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
