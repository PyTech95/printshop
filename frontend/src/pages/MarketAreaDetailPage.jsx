import React from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { MapPin, ArrowRight, Phone, MessageCircle } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { ProductCard } from "@/components/ProductCard";
import { QuoteForm } from "@/components/QuoteForm";
import { marketAreas, products, CONTACT, IMG, slugifyArea } from "@/data/products";
import { useI18n } from "@/i18n/LanguageContext";
import { usePageSeo } from "@/hooks/useSeoSettings";

export default function MarketAreaDetailPage() {
  const { region } = useParams();
  const { t, lang } = useI18n();
  const data = marketAreas.find((m) => m.slug === region);

  usePageSeo(
    data
      ? {
          site_title: `Printing Services in ${data.emirate} | Labels, Signage & Apparel — My Labels UAE`,
          meta_description: data.metaDesc,
          meta_keywords: `printing services ${data.emirate}, custom labels ${data.emirate}, asset tags ${data.emirate}, offset printing, large format printing, vinyl pasting, DTF printing, screen printing, uniform printing, t-shirt printing, promotional items, engraving ${data.emirate}`,
          og_title: `Printing Services in ${data.emirate} — My Labels UAE`,
          og_description: data.metaDesc,
          canonical_url: `${window.location.origin}/market-areas/${data.slug}`,
        }
      : null
  );

  if (!data) return <Navigate to="/market-areas" replace />;

  const name = lang === "ar" ? data.emirate_ar : data.emirate;
  const others = marketAreas.filter((m) => m.slug !== region);
  const waHref = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(`Hi My Labels UAE, I need printing services in ${data.emirate}.`)}`;

  return (
    <div>
      <PageHero
        overline={t("market.overline")}
        title={`Printing Services in ${name}`}
        subtitle={data.blurb}
        image={data.hero || IMG.largeFormat}
        crumbs={[{ label: t("nav.marketAreas"), to: "/market-areas" }, { label: name }]}
      />

      <section className="py-16 lg:py-24 bg-white" data-testid="market-detail-page">
        <div className="max-w-[1400px] mx-auto px-5 lg:px-8">
          <Reveal className="max-w-3xl">
            <span className="overline text-primary">Products & Services</span>
            <h2 className="font-display font-black text-3xl lg:text-4xl tracking-tight text-foreground mt-3">Our printing services in {name}</h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">{data.blurb}</p>
          </Reveal>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p, i) => <ProductCard key={p.slug} product={p} index={i} />)}
          </div>
        </div>
      </section>

      <section className="py-14 lg:py-16 bg-white border-t border-border">
        <div className="max-w-[1400px] mx-auto px-5 lg:px-8 grid lg:grid-cols-3 gap-8 items-start">
          <Reveal className="lg:col-span-2">
            <span className="overline text-primary">Local Expertise</span>
            <h2 className="font-display font-black text-2xl lg:text-3xl tracking-tight text-foreground mt-3">Printing for businesses in {name}</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">{data.localCopy}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="border border-border p-6 bg-secondary">
              <p className="overline text-primary">Areas covered</p>
              <p className="font-display font-black text-4xl text-foreground mt-2">{data.areas.length}</p>
              <p className="text-sm text-muted-foreground mt-1">service areas in {name}</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-secondary">
        <div className="max-w-[1400px] mx-auto px-5 lg:px-8">
          <Reveal>
            <span className="overline text-primary">{t("market.overline")}</span>
            <h2 className="font-display font-black text-2xl lg:text-3xl tracking-tight text-foreground mt-3">Areas we serve in {name}</h2>
            <p className="mt-3 text-muted-foreground max-w-2xl">We provide printing, labels, apparel and promotional products across the following areas in {name} and nearby.</p>
          </Reveal>
          <div className="mt-8 flex flex-wrap gap-2">
            {data.areas.map((a) => (
              <Link key={a} to={`/market-areas/${data.slug}/${slugifyArea(a)}`} data-testid={`detail-area-${slugifyArea(a)}`} className="text-sm font-medium border border-border bg-white px-3 py-1.5 text-foreground/80 hover:border-primary hover:text-primary hover:bg-primary/5 transition-colors">{a}</Link>
            ))}
          </div>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link to="/contact" data-testid="detail-region-quote" className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-7 py-3.5 rounded-full hover:bg-[#CC0000] hover:-translate-y-0.5 transition-all duration-200">
              {t("market.ctaBtn")} <ArrowRight size={18} className="rtl:rotate-180" />
            </Link>
            <a href={waHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 border border-foreground/15 text-foreground font-semibold px-7 py-3.5 rounded-full hover:border-primary hover:text-primary transition-colors">
              <MessageCircle size={18} className="text-primary" /> {t("common.whatsapp")}
            </a>
            <a href={`tel:${CONTACT.phones[0].replace(/\s/g, "")}`} className="inline-flex items-center gap-2 border border-foreground/15 text-foreground font-semibold px-7 py-3.5 rounded-full hover:border-primary hover:text-primary transition-colors">
              <Phone size={18} className="text-primary" /> {t("common.callUs")}
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-[1400px] mx-auto px-5 lg:px-8 grid lg:grid-cols-5 gap-10 items-start">
          <div className="lg:col-span-2">
            <span className="overline text-primary">{t("contact.overline")}</span>
            <h2 className="font-display font-black text-3xl tracking-tight text-foreground mt-3">Get a quote for {name}</h2>
            <p className="mt-4 text-muted-foreground">{t("contact.sub")}</p>
          </div>
          <div className="lg:col-span-3">
            <QuoteForm selectedProduct="" />
          </div>
        </div>
      </section>

      <section className="py-16 bg-secondary">
        <div className="max-w-[1400px] mx-auto px-5 lg:px-8">
          <h2 className="font-display font-black text-2xl tracking-tight text-foreground mb-8">Other areas we serve</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {others.map((o) => (
              <Link key={o.slug} to={`/market-areas/${o.slug}`} data-testid={`other-region-${o.slug}`} className="flex items-center gap-3 bg-white border border-border p-5 hover:-translate-y-1 hover:border-primary transition-all duration-300">
                <span className="w-9 h-9 bg-primary/10 flex items-center justify-center shrink-0"><MapPin size={18} className="text-primary" /></span>
                <span className="font-display font-bold text-foreground">{lang === "ar" ? o.emirate_ar : o.emirate}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
