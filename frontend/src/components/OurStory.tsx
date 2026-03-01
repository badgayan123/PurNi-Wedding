"use client";

import { motion } from "framer-motion";

const timeline = [
  {
    year: "2022",
    title: "First Meeting",
    desc: "Our paths crossed at a friend&apos;s gathering. A simple hello turned into hours of conversation.",
    image: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=2070",
  },
  {
    year: "2023",
    title: "The Proposal",
    desc: "Under the stars, with our favourite song playing, he asked. I said yes without a moment&apos;s hesitation.",
    image: "https://images.unsplash.com/photo-1529634810-b333c7ea4308?q=80&w=2070",
  },
  {
    year: "2024",
    title: "Engagement",
    desc: "Surrounded by family and love, we celebrated the first step toward forever.",
    image: "/images/engagement.png",
  },
  {
    year: "2025",
    title: "Journey Together",
    desc: "Every day has been an adventure. And our greatest chapter is about to begin.",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069",
  },
];

export default function OurStory() {
  return (
    <section id="our-story" className="py-20 sm:py-28 px-4 bg-cream-warm">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-gold text-sm tracking-[0.3em] uppercase mb-4">Our Story</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-charcoal mb-6">
            Every story begins somewhere<br />
            <span className="text-warm-brown">Ours became forever</span>
          </h2>
          <p className="font-handwritten text-2xl sm:text-3xl text-gold mt-8">
            &quot;You are mine · I am yours · We are forever · PurNi&quot;
          </p>
        </motion.div>

        <div className="space-y-16">
          {timeline.map((item, i) => (
            <motion.div
              key={item.title}
              className={`flex flex-col ${i % 2 === 1 ? "sm:flex-row-reverse" : "sm:flex-row"} gap-8 items-center`}
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="flex-1 w-full">
                <div
                  className="aspect-[4/3] rounded-lg overflow-hidden bg-cover bg-center"
                  style={{ backgroundImage: `url('${item.image}')` }}
                />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <span className="text-gold font-medium">{item.year}</span>
                <h3 className="text-2xl sm:text-3xl font-medium text-charcoal mt-2">{item.title}</h3>
                <p className="text-warm-brown mt-4 leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="font-handwritten text-2xl sm:text-3xl text-gold text-center mt-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          &quot;You are mine · I am yours · We are forever · PurNi&quot;
        </motion.p>
      </div>
    </section>
  );
}
