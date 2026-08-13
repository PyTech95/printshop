import React from "react";
import { motion } from "framer-motion";
import Marquee from "react-fast-marquee";
import { Award, BadgeDollarSign, Clock, HeadphonesIcon, Sparkles, Users } from "lucide-react";

const reasons = [
  { icon: Award, title: "Quality Assurance", desc: "Rigorous checks on every batch for crisp, consistent output." },
  { icon: BadgeDollarSign, title: "Competitive Prices", desc: "Direct-from-manufacturer pricing with no hidden costs." },
  { icon: Clock, title: "Always On Time", desc: "Reliable turnaround with same-day options available." },
  { icon: Users, title: "Satisfied Customers", desc: "Trusted by businesses across the UAE for repeat orders." },
  { icon: Sparkles, title: "Precision & Innovation", desc: "Latest offset & digital technology for fine detail." },
  { icon: HeadphonesIcon, title: "Dedicated Support", desc: "Expert guidance from your first enquiry to delivery." },
];

const marqueeItems = [
  "Custom Labels & Ribbons", "Asset Tags", "Rack & Shelf Labels", "Offset Printing",
  "Large Format & Vinyl", "Screen Printing", "DTF Printing", "Uniform & T-Shirt Printing",
  "Promotional Items", "Engraving Services",
];

export const WhyChooseUs = () => {
  return (
    <section id="why-us" data-testid="why-us-section" className="py-20 lg:py-28 bg-secondary">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="max-w-2xl">
          <span className="overline text-primary">Why Choose Us</span>
          <h2 className="font-display font-black text-3xl lg:text-5xl tracking-tight text-foreground mt-3">
            Precision you can trust, delivery you can rely on
          </h2>
        </div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((r, i) => (
            <motion.div
              key={r.title}
              data-testid={`reason-${i}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: (i % 3) * 0.08 }}
              className="bg-white border border-border p-7 hover:-translate-y-1 hover:border-primary transition-all duration-300"
            >
              <div className="w-12 h-12 bg-primary/10 flex items-center justify-center">
                <r.icon size={24} className="text-primary" />
              </div>
              <h3 className="font-display font-bold text-lg text-foreground mt-5">{r.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{r.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="mt-16 border-y border-border bg-white py-5">
        <Marquee speed={40} gradient={false} autoFill>
          {marqueeItems.map((item) => (
            <span
              key={item}
              className="mx-8 font-display font-bold text-xl text-foreground/25 uppercase tracking-tight flex items-center gap-8"
            >
              {item}
              <span className="w-1.5 h-1.5 bg-primary rounded-full" />
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
};
