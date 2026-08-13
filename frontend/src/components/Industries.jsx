import React from "react";
import { motion } from "framer-motion";
import { industries } from "@/data/products";
import {
  Store,
  UtensilsCrossed,
  Warehouse,
  Factory,
  Pill,
  Megaphone,
} from "lucide-react";

const icons = [Store, UtensilsCrossed, Warehouse, Factory, Pill, Megaphone];

export const Industries = () => {
  return (
    <section id="industries" data-testid="industries-section" className="py-20 lg:py-28 bg-[#0A0A0A] text-white">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="max-w-2xl">
          <span className="overline text-primary">Industries We Serve</span>
          <h2 className="font-display font-black text-3xl lg:text-5xl tracking-tight mt-3">
            Solutions built for your sector
          </h2>
          <p className="mt-4 text-white/60">
            Tailored labelling, printing and packaging for the industries that
            power the UAE economy.
          </p>
        </div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10">
          {industries.map((ind, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={ind.name}
                data-testid={`industry-${i}`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="bg-[#0A0A0A] p-8 hover:bg-primary transition-colors duration-300 group"
              >
                <Icon size={30} className="text-primary group-hover:text-white transition-colors" />
                <h3 className="font-display font-bold text-xl mt-5">{ind.name}</h3>
                <p className="mt-2 text-sm text-white/55 group-hover:text-white/90 transition-colors">
                  {ind.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
