import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useI18n } from "@/i18n/LanguageContext";
import { IMG } from "@/data/products";

export default function FaqPage() {
  const { t } = useI18n();
  const items = t("faq.items");

  return (
    <div>
      <PageHero overline={t("faq.overline")} title={t("faq.title")} subtitle={t("faq.sub")} image={IMG.boxes} crumbs={[{ label: t("nav.faq") }]} />
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-3xl mx-auto px-5 lg:px-8">
          <Reveal>
            <Accordion type="single" collapsible className="w-full" data-testid="faq-accordion">
              {items.map((it, i) => (
                <AccordionItem key={i} value={`item-${i}`} className="border-b border-border">
                  <AccordionTrigger data-testid={`faq-trigger-${i}`} className="text-start font-display font-bold text-lg text-foreground hover:text-primary hover:no-underline py-6">
                    {it.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-6 text-base">{it.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Reveal>
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
