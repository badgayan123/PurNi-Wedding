"use client";

import { motion } from "framer-motion";

const brideFamily = [
  { name: "Father", role: "Father of the Bride", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=500" },
  { name: "Mother", role: "Mother of the Bride", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=500" },
  { name: "Sister", role: "Sister", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=500" },
];

const groomFamily = [
  { name: "Father", role: "Father of the Groom", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=500" },
  { name: "Mother", role: "Mother of the Groom", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=500" },
  { name: "Brother", role: "Brother", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=500" },
];

function FamilyCard({ person }: { person: { name: string; role: string; image: string } }) {
  return (
    <motion.div
      className="group relative overflow-hidden rounded-xl bg-cream-warm border border-gold/20"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.4 }}
    >
      <div
        className="aspect-[3/4] bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
        style={{ backgroundImage: `url('${person.image}')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-6 text-cream">
        <h4 className="text-xl font-medium">{person.name}</h4>
        <p className="text-gold-light/90 text-sm mt-1">{person.role}</p>
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

      <div className="max-w-6xl mx-auto space-y-20">
        <div>
          <h3 className="text-center text-gold font-medium text-lg tracking-widest mb-10">Bride&apos;s Family</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            {brideFamily.map((person) => (
              <FamilyCard key={person.name + person.role} person={person} />
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-center text-gold font-medium text-lg tracking-widest mb-10">Groom&apos;s Family</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            {groomFamily.map((person) => (
              <FamilyCard key={person.name + person.role} person={person} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
