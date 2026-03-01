"use client";

import { useParams } from "next/navigation";
import Link from "next/link";

export default function InviteCard() {
  const params = useParams();
  const family = (params?.family as string) || "Family";

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-6 bg-gradient-to-b from-cream-warm to-cream">
      <div
        className="relative w-full max-w-md rounded-2xl overflow-hidden border border-gold/30 shadow-xl"
        style={{
          background: "linear-gradient(135deg, rgba(201,162,39,0.08) 0%, rgba(255,253,248,0.98) 50%)",
        }}
      >
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(4px)",
          }}
        />
        <div className="relative p-8 sm:p-12 text-center">
          <h1 className="text-2xl sm:text-3xl font-serif text-warm-brown mb-2">
            Welcome {decodeURIComponent(family)} Family
          </h1>
          <p className="text-gold text-sm tracking-widest uppercase mt-4">You&apos;re Invited</p>
          <p className="font-handwritten text-xl sm:text-2xl text-gold mt-8">
            &quot;You are mine<br />I am yours<br />We are forever<br />PurNi&quot;
          </p>
          <Link
            href="/#rsvp"
            className="inline-block mt-10 px-8 py-3 bg-gold text-cream rounded-lg font-medium hover:bg-gold-soft transition-colors"
          >
            RSVP Now
          </Link>
        </div>
      </div>
    </div>
  );
}
