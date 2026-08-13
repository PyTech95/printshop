import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const ABOUT_IMG =
  "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?crop=entropy&cs=srgb&fm=jpg&ixid=M3w4NjA1ODR8MHwxfHNlYXJjaHwxfHxkdWJhaSUyMGJ1c2luZXNzJTIwc2t5bGluZSUyMHN1bnNldHxlbnwwfHx8fDE3ODYzNTg2OTZ8MA&ixlib=rb-4.1.0&q=85";

const points = [
  "Offset, digital & thermal label printing under one roof",
  "In-house manufacturing for faster turnaround",
  "Eco-friendly materials and secure packaging",
  "Dedicated support from enquiry to delivery",
];

export const About = () => {
  return (
    <section id="about" data-testid="about-section" className="py-20 lg:py-28 bg-secondary">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative order-2 lg:order-1"
          >
            <img
              src={ABOUT_IMG}
              alt="Dubai business skyline"
              className="w-full h-[420px] object-cover border border-border"
            />
            <div className="absolute -top-4 -right-4 bg-white border border-border px-5 py-4 shadow-sm hidden sm:block">
              <p className="overline text-primary">Based in</p>
              <p className="font-display font-bold text-foreground">Dubai, UAE</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-1 lg:order-2"
          >
            <span className="overline text-primary">About My Labels</span>
            <h2 className="font-display font-black text-3xl lg:text-4xl tracking-tight text-foreground mt-3">
              A trusted printing & packaging partner
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              My Labels Packaging Materials Manufacturing L.L.C. is a Dubai-based
              manufacturer specialising in label, offset and digital printing. We
              combine precision technology with a commitment to quality, competitive
              pricing and on-time delivery — helping businesses across the UAE brand,
              label and package their products with confidence.
            </p>
            <div className="mt-8 grid sm:grid-cols-2 gap-4">
              {points.map((p) => (
                <div key={p} className="flex items-start gap-3">
                  <CheckCircle2 size={20} className="text-primary shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground/85">{p}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
