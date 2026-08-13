import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import { useI18n } from "@/i18n/LanguageContext";

export const ProductCard = ({ product, index = 0 }) => {
  const { lang } = useI18n();
  const name = lang === "ar" ? product.name_ar : product.name;
  const tagline = lang === "ar" ? product.tagline_ar : product.tagline;
  const short = lang === "ar" ? product.short_ar : product.short;

  return (
    <motion.div
      data-testid={`product-card-${product.slug}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group border border-border bg-white flex flex-col hover:border-primary transition-colors duration-300"
    >
      <Link to={`/products/${product.slug}`} className="relative overflow-hidden h-56 block">
        <img src={product.image} alt={name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[600ms]" loading="lazy" />
        <span className="absolute top-3 left-3 rtl:left-auto rtl:right-3 bg-white/95 text-foreground text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1">{tagline}</span>
        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-300" />
      </Link>
      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-display font-bold text-xl text-foreground">{name}</h3>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed flex-1">{short}</p>
        <div className="mt-4 space-y-1.5">
          {(product.features || []).slice(0, 3).map((ft) => (
            <div key={ft} className="flex items-center gap-2 text-xs text-foreground/70">
              <Check size={13} className="text-primary shrink-0" /> {ft}
            </div>
          ))}
        </div>
        <Link to={`/products/${product.slug}`} data-testid={`product-link-${product.slug}`} className="mt-6 inline-flex items-center justify-between gap-2 border-t border-border pt-4 text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
          {name}
          <ArrowUpRight size={18} className="text-primary" />
        </Link>
      </div>
    </motion.div>
  );
};
