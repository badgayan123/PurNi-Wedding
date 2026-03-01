"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { WEDDING_CONFIG } from "@/lib/wedding-config";

const WEDDING_DATE = WEDDING_CONFIG.weddingDate;

function Countdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  useEffect(() => {
    const tick = () => {
      const now = new Date().getTime();
      const diff = WEDDING_DATE.getTime() - now;
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, mins: 0, secs: 0 });
        return;
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        mins: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        secs: Math.floor((diff % (1000 * 60)) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex gap-3 sm:gap-6 justify-center mt-8">
      {[
        { value: timeLeft.days, label: "Days" },
        { value: timeLeft.hours, label: "Hours" },
        { value: timeLeft.mins, label: "Mins" },
        { value: timeLeft.secs, label: "Secs" },
      ].map(({ value, label }) => (
        <div key={label} className="text-center">
          <div className="w-14 h-14 sm:w-20 sm:h-20 flex items-center justify-center border border-gold/50 rounded-lg bg-cream-warm/80 backdrop-blur">
            <span className="text-xl sm:text-2xl font-medium text-warm-brown">{String(value).padStart(2, "0")}</span>
          </div>
          <span className="text-xs sm:text-sm text-warm-brown/80 mt-1 block">{label}</span>
        </div>
      ))}
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60" />
      <div className="absolute inset-0 bg-charcoal/20" />

      <motion.div
        className="relative z-10 text-center px-4 max-w-2xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
      >
        <p className="text-gold-light/90 text-sm sm:text-base tracking-[0.4em] uppercase mb-2">
          PurNi · We&apos;re getting married
        </p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-cream tracking-tight">
          {WEDDING_CONFIG.coupleNames.groom} & {WEDDING_CONFIG.coupleNames.bride}
        </h1>
        <p className="text-cream/90 text-lg sm:text-xl mt-4 font-light">
          June 15, 2026
        </p>
        <Countdown />
        <motion.p
          className="font-handwritten text-2xl sm:text-3xl md:text-4xl text-gold-light mt-12 sm:mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          &quot;You are mine<br />
          I am yours<br />
          We are forever<br />
          PurNi&quot;
        </motion.p>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <a
          href="#our-story"
          className="inline-flex flex-col items-center text-cream/80 hover:text-gold-light transition-colors"
        >
          <span className="text-xs tracking-widest uppercase">Discover</span>
          <svg className="w-6 h-6 mt-2 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </motion.div>
    </section>
  );
}
