import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import { products } from "@/data/products";

export const Products = ({ onEnquire }) => {
  return (
    <section id="products" data-testid="products-section" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="max-w-2xl">
          <span className="overline text-primary">Products & Services</span>
          <h2 className="font-display font-black text-3xl lg:text-5xl tracking-tight text-foreground mt-3">
            Everything you need to label, brand & pack
          </h2>
          <p className="mt-4 text-muted-foreground">
            A complete range of printing and packaging solutions, manufactured
            in-house and customised to your exact requirements.
          </p>
        </div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p, i) => (
            <motion.div
              key={p.id}
              data-testid={`product-card-${p.id}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              className="group border border-border bg-white flex flex-col hover:border-primary transition-colors duration-300"
            >
              <div className="relative overflow-hidden h-52">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-white/95 text-foreground text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1">
                  {p.tagline}
                </span>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-display font-bold text-xl text-foreground">{p.name}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {p.description}
                </p>
                <ul className="mt-4 space-y-1.5">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-xs text-foreground/75">
                      <Check size={14} className="text-primary shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  data-testid={`product-enquire-${p.id}`}
                  onClick={() => onEnquire(p.name)}
                  className="mt-6 inline-flex items-center justify-between gap-2 border-t border-border pt-4 text-sm font-semibold text-foreground group-hover:text-primary transition-colors"
                >
                  Enquire about {p.name.split(" ")[0]}
                  <ArrowUpRight size={18} className="text-primary" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
