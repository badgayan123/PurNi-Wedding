"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";

const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  numberOfMembers: z.coerce.number().min(1).max(20, "Enter 1–20 members"),
  foodPreference: z.enum(["vegetarian", "non-vegetarian", "vegan"]),
  attendance: z.enum(["attending", "not-attending"]),
  message: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function RSVPForm() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      numberOfMembers: 1,
      foodPreference: "vegetarian",
      attendance: "attending",
    },
  });

  const onSubmit = async (data: FormData) => {
    setError("");
    try {
      const res = await fetch(`${API_URL}/api/rsvp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Failed to submit");
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try again.");
    }
  };

  if (submitted) {
    return (
      <motion.div
        id="rsvp"
        className="py-20 sm:py-28 px-4 bg-cream-warm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-3xl font-medium text-charcoal mb-4">Thank you!</h2>
          <p className="text-warm-brown text-lg">
            We&apos;ve received your RSVP and can&apos;t wait to celebrate with you.
          </p>
          <p className="font-handwritten text-2xl text-gold mt-8">
            &quot;You are mine · I am yours · We are forever&quot;
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <section id="rsvp" className="py-20 sm:py-28 px-4 bg-cream-warm">
      <div className="max-w-xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-gold text-sm tracking-[0.3em] uppercase mb-4">RSVP</p>
          <h2 className="text-3xl sm:text-4xl font-medium text-charcoal">
            Will you celebrate with us?
          </h2>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div>
            <label className="block text-sm font-medium text-warm-brown mb-2">Your Name</label>
            <input
              {...register("name")}
              className="w-full px-4 py-3 rounded-lg border border-gold/30 bg-cream focus:border-gold focus:ring-1 focus:ring-gold outline-none"
              placeholder="Enter your full name"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-warm-brown mb-2">Number of Members</label>
            <input
              type="number"
              {...register("numberOfMembers")}
              className="w-full px-4 py-3 rounded-lg border border-gold/30 bg-cream focus:border-gold focus:ring-1 focus:ring-gold outline-none"
              min={1}
              max={20}
            />
            {errors.numberOfMembers && (
              <p className="text-red-500 text-sm mt-1">{errors.numberOfMembers.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-warm-brown mb-2">Food Preference</label>
            <select
              {...register("foodPreference")}
              className="w-full px-4 py-3 rounded-lg border border-gold/30 bg-cream focus:border-gold focus:ring-1 focus:ring-gold outline-none"
            >
              <option value="vegetarian">Vegetarian</option>
              <option value="non-vegetarian">Non-Vegetarian</option>
              <option value="vegan">Vegan</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-warm-brown mb-2">Attendance</label>
            <select
              {...register("attendance")}
              className="w-full px-4 py-3 rounded-lg border border-gold/30 bg-cream focus:border-gold focus:ring-1 focus:ring-gold outline-none"
            >
              <option value="attending">I will attend</option>
              <option value="not-attending">I cannot attend</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-warm-brown mb-2">Message (optional)</label>
            <textarea
              {...register("message")}
              className="w-full px-4 py-3 rounded-lg border border-gold/30 bg-cream focus:border-gold focus:ring-1 focus:ring-gold outline-none resize-none"
              rows={3}
              placeholder="A note for the couple..."
            />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 rounded-lg bg-gold text-cream font-medium hover:bg-gold-soft transition-colors disabled:opacity-50"
          >
            {isSubmitting ? "Sending..." : "Submit RSVP"}
          </button>
        </motion.form>
      </div>
    </section>
  );
}
