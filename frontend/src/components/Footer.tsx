"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="py-12 px-4 bg-charcoal text-cream">
      <motion.div
        className="max-w-2xl mx-auto text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <p className="font-handwritten text-2xl text-gold-light mb-4">
          &quot;You are mine · I am yours · We are forever&quot;
        </p>
        <p className="text-cream/70 text-sm">
          With love, Priya & Raj
        </p>
        <a
          href="/admin"
          className="inline-block mt-6 text-cream/50 hover:text-gold-light text-xs"
        >
          Admin
        </a>
      </motion.div>
    </footer>
  );
}
