import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, ArrowRight, Info } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { marketAreas, IMG, slugifyArea } from "@/data/products";
import { useI18n } from "@/i18n/LanguageContext";
import { usePageSeo } from "@/hooks/useSeoSettings";

const MotionLink = motion(Link);

export default function MarketAreasPage() {
  const { t, lang } = useI18n();

  usePageSeo({
    site_title: "Market Areas We Serve — Printing in Dubai, Al Ain, Fujairah & RAK | My Labels UAE",
    meta_description: "My Labels UAE provides printing, labels, signage, apparel and promotional products across Dubai, Al Ain, Fujairah and Ras Al Khaimah. Explore the areas we serve.",
    meta_keywords: "printing services UAE, printing Dubai, printing Al Ain, printing Fujairah, printing Ras Al Khaimah, market areas, service areas",
    og_title: "Market Areas We Serve — My Labels UAE",
    og_description: "Printing, labels, apparel and promotional products across Dubai, Al Ain, Fujairah and Ras Al Khaimah.",
    canonical_url: `${window.location.origin}/market-areas`,
  });

  return (
    <div>
      <PageHero
        overline={t("market.overline")}
        title={t("market.title")}
        subtitle={t("market.sub")}
        image={IMG.largeFormat}
        crumbs={[{ label: t("nav.marketAreas") }]}
      />

      <section className="py-16 lg:py-24 bg-white" data-testid="market-areas-page">
        <div className="max-w-[1400px] mx-auto px-5 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {marketAreas.map((region, ri) => (
              <Reveal key={region.emirate} delay={(ri % 2) * 0.08}>
                <div data-testid={`market-region-${ri}`} className="border border-border bg-white h-full flex flex-col hover:border-primary transition-colors duration-300">
                  <Link to={`/market-areas/${region.slug}`} data-testid={`market-region-link-${region.slug}`} className="flex items-center gap-3 px-6 lg:px-8 py-5 border-b border-border bg-secondary hover:bg-primary/5 transition-colors group/head">
                    <span className="w-10 h-10 bg-primary flex items-center justify-center shrink-0">
                      <MapPin size={20} className="text-white" />
                    </span>
                    <div className="flex-1">
                      <h2 className="font-display font-black text-xl lg:text-2xl text-foreground leading-tight group-hover/head:text-primary transition-colors">
                        {lang === "ar" ? region.emirate_ar : region.emirate}
                      </h2>
                      <p className="text-xs text-muted-foreground mt-0.5">{region.areas.length} {lang === "ar" ? "منطقة خدمة" : "service areas"}</p>
                    </div>
                    <ArrowRight size={18} className="text-primary rtl:rotate-180" />
                  </Link>

                  <div className="p-6 lg:p-8 flex-1">
                    <div className="flex flex-wrap gap-2">
                      {region.areas.map((area, ai) => (
                        <MotionLink
                          key={area}
                          to={`/market-areas/${region.slug}/${slugifyArea(area)}`}
                          data-testid={`area-chip-${region.slug}-${slugifyArea(area)}`}
                          initial={{ opacity: 0, y: 8 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.3, delay: Math.min(ai * 0.02, 0.3) }}
                          className="text-sm font-medium border border-border px-3 py-1.5 text-foreground/80 hover:border-primary hover:text-primary hover:bg-primary/5 transition-colors"
                        >
                          {area}
                        </MotionLink>
                      ))}
                    </div>
                  </div>

                  <div className="px-6 lg:px-8 py-5 border-t border-border flex flex-wrap items-center justify-between gap-3">
                    <p className="text-sm text-foreground/70">{t("market.cta")}</p>
                    <Link to="/contact" data-testid={`market-cta-${ri}`} className="inline-flex items-center gap-2 bg-primary text-white text-sm font-semibold px-5 py-2.5 rounded-sm hover:bg-[#CC0000] hover:-translate-y-0.5 transition-all duration-200">
                      {t("market.ctaBtn")} <ArrowRight size={16} className="rtl:rotate-180" />
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
