import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

export const PageHero = ({ overline, title, subtitle, image, crumbs = [] }) => (
  <section data-testid="page-hero" className="relative bg-[#0A0A0A] text-white overflow-hidden">
    {image && (
      <div className="absolute inset-0">
        <img src={image} alt="" className="w-full h-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/85 to-[#0A0A0A]/40" />
      </div>
    )}
    <div className="relative max-w-[1400px] mx-auto px-5 lg:px-8 py-20 lg:py-28">
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        {crumbs.length > 0 && (
          <div className="flex items-center gap-2 text-xs text-white/50 mb-5">
            <Link to="/" className="hover:text-primary">Home</Link>
            {crumbs.map((c, i) => (
              <span key={i} className="flex items-center gap-2">
                <ChevronRight size={12} />
                {c.to ? <Link to={c.to} className="hover:text-primary">{c.label}</Link> : <span className="text-white/80">{c.label}</span>}
              </span>
            ))}
          </div>
        )}
        {overline && <span className="overline text-primary">{overline}</span>}
        <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl tracking-tighter mt-3 max-w-4xl leading-[1]">{title}</h1>
        {subtitle && <p className="mt-5 text-base lg:text-lg text-white/60 max-w-2xl leading-relaxed">{subtitle}</p>}
      </motion.div>
    </div>
    <div className="absolute bottom-0 inset-x-0 h-1 bg-primary" />
  </section>
);
