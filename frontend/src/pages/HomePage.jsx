import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import Marquee from "react-fast-marquee";
import { ArrowRight, Clock, Truck, ArrowUpRight, MapPin } from "lucide-react";
import { products, industries, IMG, popularAreas, slugifyArea, findRegion } from "@/data/products";
import { RatingBadge } from "@/components/RatingBadge";
import { useI18n } from "@/i18n/LanguageContext";
import { ProductCard } from "@/components/ProductCard";
import { Reveal, MaskLine } from "@/components/Reveal";
import { WorkShowreel } from "@/components/WorkShowreel";

const marqueeItems = [
  "Custom Labels & Ribbons", "Asset Tags", "Offset Printing", "Large Format & Vinyl",
  "Rack & Shelf Labels", "DTF Printing", "Screen Printing", "Uniform & T-Shirt Printing", "Promotional Items",
];

export default function HomePage() {
  const { t, lang } = useI18n();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);

  const stats = [
    { icon: Clock, label: t("hero.stat1"), sub: t("hero.stat1s") },
    { icon: Truck, label: t("hero.stat3"), sub: t("hero.stat3s") },
  ];

  const chapters = [
    { n: "01", t: t("home.ch1t"), d: t("home.ch1d") },
    { n: "02", t: t("home.ch2t"), d: t("home.ch2d") },
    { n: "03", t: t("home.ch3t"), d: t("home.ch3d") },
    { n: "04", t: t("home.ch4t"), d: t("home.ch4d") },
  ];

  return (
    <div>
      <section id="home" ref={heroRef} data-testid="hero-section" className="relative bg-white overflow-hidden">
        <motion.div aria-hidden className="pointer-events-none absolute -top-24 -right-16 w-[420px] h-[420px] rounded-full bg-primary/10 blur-3xl z-0" animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }} transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }} />
        <motion.div aria-hidden className="pointer-events-none absolute top-40 -left-24 w-[360px] h-[360px] rounded-full bg-foreground/5 blur-3xl z-0" animate={{ scale: [1.1, 1, 1.1], opacity: [0.5, 0.3, 0.5] }} transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }} />
        <div className="relative z-10 max-w-[1400px] mx-auto px-5 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center py-14 lg:py-20">
            <div>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="inline-flex items-center gap-2 border border-primary/20 bg-primary/5 px-3 py-1.5 mb-7">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span className="overline text-primary">{t("hero.badge")}</span>
              </motion.div>

              <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-[4.2rem] leading-[0.95] tracking-tighter text-foreground">
                <MaskLine delay={0.15}>{t("hero.l1")}</MaskLine>
                <MaskLine delay={0.3} className="text-primary">{t("hero.l2")}</MaskLine>
                <MaskLine delay={0.45} className="text-primary">{t("hero.l3")}</MaskLine>
              </h1>

              <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.6 }} className="mt-6 text-base lg:text-lg text-muted-foreground max-w-xl leading-relaxed">
                {t("hero.sub")} <span className="font-semibold text-foreground">{t("common.alwaysOnTime")}.</span>
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85, duration: 0.6 }} className="mt-8 flex flex-wrap gap-4">
                <Link to="/contact" data-testid="hero-quote-btn" className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-7 py-3.5 rounded-sm hover:bg-[#CC0000] hover:-translate-y-0.5 transition-all duration-200">
                  {t("common.getQuote")} <ArrowRight size={18} className="rtl:rotate-180" />
                </Link>
                <Link to="/products" data-testid="hero-products-btn" className="inline-flex items-center gap-2 border border-foreground/15 text-foreground font-semibold px-7 py-3.5 rounded-sm hover:border-primary hover:text-primary transition-colors duration-200">
                  {t("common.exploreProducts")}
                </Link>
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.95, duration: 0.6 }} className="mt-7">
                <RatingBadge />
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 0.6 }} className="mt-12 grid grid-cols-2 gap-4 max-w-md">
                {stats.map((s) => (
                  <div key={s.label} className="border-l-2 rtl:border-l-0 rtl:border-r-2 border-primary pl-3 rtl:pl-0 rtl:pr-3">
                    <s.icon size={20} className="text-primary mb-2" />
                    <p className="font-display font-bold text-sm text-foreground leading-tight">{s.label}</p>
                    <p className="text-xs text-muted-foreground">{s.sub}</p>
                  </div>
                ))}
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative">
              <div className="relative overflow-hidden border border-border">
                <motion.img style={{ y: imgY, scale: imgScale }} src={IMG.hero} alt="Industrial printing press" className="w-full h-[400px] lg:h-[560px] object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              <div className="absolute -bottom-5 -left-5 rtl:left-auto rtl:-right-5 bg-primary text-white p-5 hidden sm:block">
                <p className="font-display font-black text-3xl leading-none">10+</p>
                <p className="text-xs uppercase tracking-widest mt-1">{t("hero.years")}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="border-y border-border bg-[#0A0A0A] py-5">
        <Marquee speed={38} gradient={false} autoFill direction={lang === "ar" ? "right" : "left"}>
          {marqueeItems.map((item) => (
            <span key={item} className="mx-8 font-display font-bold text-xl text-white/25 uppercase tracking-tight flex items-center gap-8">
              {item}<span className="w-1.5 h-1.5 bg-primary rounded-full" />
            </span>
          ))}
        </Marquee>
      </div>

      <WorkShowreel />

      <section id="products" data-testid="products-section" className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1400px] mx-auto px-5 lg:px-8">
          <Reveal className="max-w-2xl">
            <span className="overline text-primary">{t("home.productsOverline")}</span>
            <h2 className="font-display font-black text-3xl lg:text-5xl tracking-tight text-foreground mt-3">{t("home.productsTitle")}</h2>
            <p className="mt-4 text-muted-foreground">{t("home.productsSub")}</p>
          </Reveal>
          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p, i) => <ProductCard key={p.slug} product={p} index={i} />)}
          </div>
        </div>
      </section>

      <section data-testid="popular-areas" className="py-20 lg:py-28 bg-white border-t border-border">
        <div className="max-w-[1400px] mx-auto px-5 lg:px-8">
          <Reveal className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="overline text-primary">Where We Work</span>
              <h2 className="font-display font-black text-3xl lg:text-5xl tracking-tight text-foreground mt-3">Popular areas we serve</h2>
              <p className="mt-4 text-muted-foreground max-w-2xl">Fast printing, labels and signage delivered across the UAE's busiest business districts.</p>
            </div>
            <Link to="/market-areas" className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:gap-2 transition-all">View all areas <ArrowUpRight size={16} /></Link>
          </Reveal>
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {popularAreas.map((pa, i) => {
              const r = findRegion(pa.region);
              return (
                <Reveal key={`${pa.region}-${pa.area}`} delay={(i % 4) * 0.05}>
                  <Link to={`/market-areas/${pa.region}/${slugifyArea(pa.area)}`} data-testid={`popular-area-${slugifyArea(pa.area)}`} className="group flex items-center gap-3 bg-secondary border border-border p-4 lg:p-5 h-full hover:-translate-y-1 hover:border-primary hover:bg-white transition-all duration-300">
                    <span className="w-9 h-9 bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors"><MapPin size={16} className="text-primary group-hover:text-white transition-colors" /></span>
                    <span className="min-w-0">
                      <span className="block font-display font-bold text-foreground leading-tight truncate">{pa.area}</span>
                      <span className="block text-xs text-muted-foreground">{r ? r.emirate : ""}</span>
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section data-testid="manifesto-section" className="py-20 lg:py-28 bg-[#0A0A0A] text-white relative">
        <div className="absolute inset-0 grain-overlay opacity-[0.15] pointer-events-none" />
        <div className="relative max-w-[1400px] mx-auto px-5 lg:px-8">
          <Reveal className="max-w-2xl">
            <span className="overline text-primary">{t("home.manifestoOverline")}</span>
            <h2 className="font-display font-black text-3xl lg:text-5xl tracking-tight mt-3">{t("home.manifestoTitle")}</h2>
          </Reveal>
          <div className="mt-14 grid md:grid-cols-2 gap-px bg-white/10 border border-white/10">
            {chapters.map((c, i) => (
              <Reveal key={c.n} delay={i * 0.08} className="bg-[#0A0A0A]">
                <div className="p-8 lg:p-10 h-full hover:bg-primary transition-colors duration-300 group">
                  <span className="font-display font-black text-5xl text-primary group-hover:text-white transition-colors">{c.n}</span>
                  <h3 className="font-display font-bold text-2xl mt-4">{c.t}</h3>
                  <p className="mt-3 text-white/55 group-hover:text-white/90 transition-colors leading-relaxed">{c.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section data-testid="industries-preview" className="py-20 lg:py-28 bg-secondary">
        <div className="max-w-[1400px] mx-auto px-5 lg:px-8">
          <Reveal className="flex flex-wrap items-end justify-between gap-4 max-w-4xl">
            <div>
              <span className="overline text-primary">{t("home.industriesOverline")}</span>
              <h2 className="font-display font-black text-3xl lg:text-5xl tracking-tight text-foreground mt-3">{t("home.industriesTitle")}</h2>
            </div>
            <Link to="/industries" className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:gap-2 transition-all">{t("common.viewAll")} <ArrowUpRight size={16} /></Link>
          </Reveal>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((ind, i) => (
              <Reveal key={ind.key} delay={(i % 3) * 0.07}>
                <Link to="/industries" className="block bg-white border border-border p-7 h-full hover:-translate-y-1 hover:border-primary transition-all duration-300">
                  <h3 className="font-display font-bold text-xl text-foreground">{lang === "ar" ? ind.name_ar : ind.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{lang === "ar" ? ind.desc_ar : ind.desc}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section data-testid="home-cta" className="py-20 lg:py-28 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 grain-overlay opacity-20 pointer-events-none" />
        <div className="relative max-w-[1400px] mx-auto px-5 lg:px-8 text-center">
          <Reveal>
            <h2 className="font-display font-black text-3xl lg:text-6xl tracking-tighter max-w-4xl mx-auto leading-[1]">{t("home.ctaTitle")}</h2>
            <p className="mt-5 text-white/80 max-w-2xl mx-auto text-lg">{t("home.ctaSub")}</p>
            <Link to="/contact" data-testid="cta-quote-btn" className="mt-9 inline-flex items-center gap-2 bg-white text-primary font-bold px-8 py-4 rounded-sm hover:bg-[#0A0A0A] hover:text-white transition-colors duration-200">
              {t("nav.quote")} <ArrowRight size={18} className="rtl:rotate-180" />
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
