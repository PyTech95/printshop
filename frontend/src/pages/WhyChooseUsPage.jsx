import React from "react";
import { Link } from "react-router-dom";
import Marquee from "react-fast-marquee";
import { Award, BadgeDollarSign, Clock, HeadphonesIcon, Sparkles, Users, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { useI18n } from "@/i18n/LanguageContext";
import { IMG } from "@/data/products";

export default function WhyChooseUsPage() {
  const { t, lang } = useI18n();
  const reasons = [
    { icon: Award, t: t("why.r1t"), d: t("why.r1d") },
    { icon: BadgeDollarSign, t: t("why.r2t"), d: t("why.r2d") },
    { icon: Clock, t: t("why.r3t"), d: t("why.r3d") },
    { icon: Users, t: t("why.r4t"), d: t("why.r4d") },
    { icon: Sparkles, t: t("why.r5t"), d: t("why.r5d") },
    { icon: HeadphonesIcon, t: t("why.r6t"), d: t("why.r6d") },
  ];
  const stats = [
    { n: "10+", l: t("hero.years") },
    { n: "9", l: t("nav.products") },
    { n: "24/7", l: t("common.whatsapp") },
    { n: "100%", l: t("why.r1t") },
  ];

  return (
    <div>
      <PageHero overline={t("why.overline")} title={t("why.title")} subtitle={t("why.sub")} image={IMG.whyHero} crumbs={[{ label: t("nav.why") }]} />

      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1400px] mx-auto px-5 lg:px-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((r, i) => (
            <Reveal key={r.t} delay={(i % 3) * 0.08}>
              <div className="bg-white border border-border p-8 h-full hover:-translate-y-1 hover:border-primary transition-all duration-300">
                <div className="w-12 h-12 bg-primary/10 flex items-center justify-center"><r.icon size={24} className="text-primary" /></div>
                <h3 className="font-display font-bold text-lg text-foreground mt-5">{r.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{r.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="py-16 bg-[#0A0A0A] text-white">
        <div className="max-w-[1400px] mx-auto px-5 lg:px-8 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((s) => (
            <Reveal key={s.l} className="text-center">
              <p className="font-display font-black text-5xl lg:text-6xl text-primary">{s.n}</p>
              <p className="mt-2 text-sm uppercase tracking-widest text-white/50">{s.l}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <div className="border-y border-border bg-secondary py-5">
        <Marquee speed={36} gradient={false} autoFill direction={lang === "ar" ? "right" : "left"}>
          {[t("why.r1t"), t("why.r2t"), t("why.r3t"), t("why.r4t"), t("why.r5t"), t("why.r6t")].map((item, i) => (
            <span key={i} className="mx-8 font-display font-bold text-xl text-foreground/20 uppercase tracking-tight flex items-center gap-8">{item}<span className="w-1.5 h-1.5 bg-primary rounded-full" /></span>
          ))}
        </Marquee>
      </div>

      <section className="py-16 bg-primary text-white">
        <div className="max-w-[1400px] mx-auto px-5 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <h3 className="font-display font-black text-2xl lg:text-3xl tracking-tight text-center sm:text-start">{t("home.ctaTitle")}</h3>
          <Link to="/contact" className="inline-flex items-center gap-2 bg-white text-primary font-bold px-7 py-3.5 rounded-sm hover:bg-[#0A0A0A] hover:text-white transition-colors shrink-0">
            {t("nav.quote")} <ArrowRight size={18} className="rtl:rotate-180" />
          </Link>
        </div>
      </section>
    </div>
  );
}
