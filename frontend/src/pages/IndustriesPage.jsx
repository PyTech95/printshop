import React from "react";
import { Link } from "react-router-dom";
import { Store, UtensilsCrossed, Warehouse, Factory, Pill, Megaphone, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { industries, IMG } from "@/data/products";
import { useI18n } from "@/i18n/LanguageContext";

const iconMap = { retail: Store, food: UtensilsCrossed, logistics: Warehouse, manufacturing: Factory, pharma: Pill, events: Megaphone };

export default function IndustriesPage() {
  const { t, lang } = useI18n();
  return (
    <div>
      <PageHero overline={t("industriesPage.overline")} title={t("industriesPage.title")} subtitle={t("industriesPage.sub")} image={IMG.rackLabels} crumbs={[{ label: t("nav.industries") }]} />
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1400px] mx-auto px-5 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
            {industries.map((ind, i) => {
              const Icon = iconMap[ind.key];
              return (
                <Reveal key={ind.key} delay={(i % 3) * 0.07} className="bg-white">
                  <div className="p-8 lg:p-10 h-full hover:bg-primary transition-colors duration-300 group">
                    <Icon size={34} className="text-primary group-hover:text-white transition-colors" />
                    <h3 className="font-display font-bold text-2xl text-foreground group-hover:text-white mt-5 transition-colors">{lang === "ar" ? ind.name_ar : ind.name}</h3>
                    <p className="mt-3 text-muted-foreground group-hover:text-white/90 leading-relaxed transition-colors">{lang === "ar" ? ind.desc_ar : ind.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>
      <section className="py-16 bg-secondary">
        <div className="max-w-[1400px] mx-auto px-5 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <h3 className="font-display font-black text-2xl lg:text-3xl tracking-tight text-foreground text-center sm:text-start">{t("home.ctaTitle")}</h3>
          <Link to="/contact" className="inline-flex items-center gap-2 bg-primary text-white font-bold px-7 py-3.5 rounded-sm hover:bg-[#CC0000] transition-colors shrink-0">
            {t("nav.quote")} <ArrowRight size={18} className="rtl:rotate-180" />
          </Link>
        </div>
      </section>
    </div>
  );
}
