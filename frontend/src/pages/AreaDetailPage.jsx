import React from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { MapPin, ArrowRight, Phone, MessageCircle } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { ProductCard } from "@/components/ProductCard";
import { QuoteForm } from "@/components/QuoteForm";
import { findArea, slugifyArea, buildAreaCopy, products, CONTACT, IMG } from "@/data/products";
import { useI18n } from "@/i18n/LanguageContext";
import { usePageSeo } from "@/hooks/useSeoSettings";

const SERVICE_PHRASES = [
  ["custom labels & ribbons", "custom-labels-ribbons"],
  ["custom labels", "custom-labels-ribbons"],
  ["asset tags", "asset-tags"],
  ["large-format printing", "large-format-vinyl"],
  ["large format printing", "large-format-vinyl"],
  ["large-format", "large-format-vinyl"],
  ["large format", "large-format-vinyl"],
  ["offset printing", "offset-printing"],
  ["offset", "offset-printing"],
  ["DTF printing", "dtf-printing"],
  ["DTF", "dtf-printing"],
  ["screen printing", "screen-printing"],
  ["screen-printed", "screen-printing"],
  ["uniform & T-shirt printing", "uniform-tshirt-printing"],
  ["uniforms", "uniform-tshirt-printing"],
  ["uniform", "uniform-tshirt-printing"],
  ["promotional items", "promotional-items"],
  ["engraving", "engraving-services"],
  ["labels", "custom-labels-ribbons"],
];

const linkifyServices = (text) => {
  const nodes = [];
  const used = new Set();
  const lower = text.toLowerCase();
  const isBoundary = (ch) => ch === undefined || /[^a-z0-9]/i.test(ch);
  let i = 0;
  let buf = "";
  while (i < text.length) {
    let m = null;
    for (const [phrase, slug] of SERVICE_PHRASES) {
      if (used.has(slug)) continue;
      const p = phrase.toLowerCase();
      if (lower.startsWith(p, i) && isBoundary(text[i - 1]) && isBoundary(text[i + p.length])) {
        m = [p.length, slug];
        break;
      }
    }
    if (m) {
      if (buf) {
        nodes.push(buf);
        buf = "";
      }
      nodes.push(
        <Link key={`l${i}`} to={`/products/${m[1]}`} className="text-primary underline decoration-primary/30 underline-offset-2 hover:decoration-primary transition-colors">
          {text.substr(i, m[0])}
        </Link>
      );
      used.add(m[1]);
      i += m[0];
    } else {
      buf += text[i];
      i += 1;
    }
  }
  if (buf) nodes.push(buf);
  return nodes;
};

export default function AreaDetailPage() {
  const { region, area } = useParams();
  const { t, lang } = useI18n();
  const match = findArea(region, area);

  const faqs = match
    ? [
        { q: `Do you offer printing services in ${match.area}?`, a: `Yes — My Labels UAE provides custom labels, asset tags, offset and large-format printing, DTF and screen printing, uniforms, promotional items and engraving to businesses across ${match.area}, ${match.region.emirate}.` },
        { q: `How fast can you deliver in ${match.area}?`, a: `We offer quick turnarounds with same-day options on many products and reliable delivery across ${match.area} and the wider ${match.region.emirate} area.` },
        { q: `Do you handle both small and bulk orders in ${match.area}?`, a: `Yes — from one-off jobs to large bulk runs, we produce everything in-house for ${match.area} businesses.` },
        { q: `How do I get a quote for ${match.area}?`, a: `Share your artwork or requirements via our quote form, WhatsApp or phone and we'll send a fast, no-obligation quote for your ${match.area} order.` },
      ]
    : [];

  usePageSeo(
    match
      ? {
          site_title: `Printing Services in ${match.area}, ${match.region.emirate} | My Labels UAE`,
          meta_description: `Printing services in ${match.area}, ${match.region.emirate} — custom labels, asset tags, offset & large-format printing, DTF, screen printing, uniforms, promotional items and engraving. Fast quotes and reliable delivery in ${match.area}.`,
          meta_keywords: `printing ${match.area}, printing services ${match.area}, custom labels ${match.area}, signage ${match.area}, t-shirt printing ${match.area}, promotional items ${match.area}, ${match.region.emirate} printing`,
          og_title: `Printing Services in ${match.area}, ${match.region.emirate} — My Labels UAE`,
          og_description: `Custom labels, signage, apparel and promotional printing in ${match.area}, ${match.region.emirate}.`,
          canonical_url: `${window.location.origin}/market-areas/${region}/${area}`,
          jsonLd: [
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: `${window.location.origin}/` },
                { "@type": "ListItem", position: 2, name: "Market Areas", item: `${window.location.origin}/market-areas` },
                { "@type": "ListItem", position: 3, name: match.region.emirate, item: `${window.location.origin}/market-areas/${region}` },
                { "@type": "ListItem", position: 4, name: match.area, item: `${window.location.origin}/market-areas/${region}/${area}` },
              ],
            },
            {
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "My Labels UAE",
              description: `Printing services in ${match.area}, ${match.region.emirate} — labels, signage, apparel and promotional products.`,
              url: `${window.location.origin}/market-areas/${region}/${area}`,
              telephone: "+971561159894",
              email: "sales@mylabelsuae.com",
              areaServed: { "@type": "Place", name: `${match.area}, ${match.region.emirate}` },
              address: { "@type": "PostalAddress", addressLocality: match.region.emirate, addressCountry: "AE" },
              priceRange: "$$",
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
            },
          ],
        }
      : null
  );

  if (!match) return <Navigate to={`/market-areas/${region}`} replace />;

  const { region: reg, area: areaName } = match;
  const emirate = lang === "ar" ? reg.emirate_ar : reg.emirate;
  const nearby = reg.areas.filter((a) => a !== areaName);
  const waHref = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(`Hi My Labels UAE, I need printing services in ${areaName}, ${reg.emirate}.`)}`;

  return (
    <div>
      <PageHero
        overline={`${reg.emirate} · ${t("market.overline")}`}
        title={`Printing Services in ${areaName}`}
        subtitle={`Custom labels, signage, apparel and promotional printing delivered across ${areaName}, ${reg.emirate}.`}
        image={reg.hero || IMG.largeFormat}
        crumbs={[
          { label: t("nav.marketAreas"), to: "/market-areas" },
          { label: emirate, to: `/market-areas/${reg.slug}` },
          { label: areaName },
        ]}
      />

      <section className="py-16 lg:py-24 bg-white" data-testid="area-detail-page">
        <div className="max-w-[1400px] mx-auto px-5 lg:px-8">
          <Reveal className="max-w-3xl">
            <span className="overline text-primary">Products & Services</span>
            <h2 className="font-display font-black text-3xl lg:text-4xl tracking-tight text-foreground mt-3">Printing services in {areaName}</h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">{linkifyServices(buildAreaCopy(reg.slug, areaName))}</p>
            <p className="mt-4 text-muted-foreground leading-relaxed">{linkifyServices(`Our ${areaName} services include custom labels & ribbons, asset tags, offset and large-format printing, DTF and screen printing, uniform & T-shirt printing, promotional items and engraving — produced in-house and delivered on time.`)}</p>
          </Reveal>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p, i) => <ProductCard key={p.slug} product={p} index={i} />)}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-secondary">
        <div className="max-w-[1400px] mx-auto px-5 lg:px-8 grid lg:grid-cols-5 gap-10 items-start">
          <div className="lg:col-span-2">
            <span className="overline text-primary">{t("contact.overline")}</span>
            <h2 className="font-display font-black text-3xl tracking-tight text-foreground mt-3">Get a quote for {areaName}</h2>
            <p className="mt-4 text-muted-foreground">{t("contact.sub")}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a href={waHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-6 py-3 rounded-full hover:bg-[#CC0000] transition-colors">
                <MessageCircle size={18} /> {t("common.whatsapp")}
              </a>
              <a href={`tel:${CONTACT.phones[0].replace(/\s/g, "")}`} className="inline-flex items-center gap-2 border border-foreground/15 text-foreground font-semibold px-6 py-3 rounded-full hover:border-primary hover:text-primary transition-colors">
                <Phone size={18} className="text-primary" /> {t("common.callUs")}
              </a>
            </div>
          </div>
          <div className="lg:col-span-3">
            <QuoteForm selectedProduct="" />
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-white border-t border-border">
        <div className="max-w-[1400px] mx-auto px-5 lg:px-8 grid lg:grid-cols-2 gap-10 items-start">
          <Reveal>
            <span className="overline text-primary">On The Map</span>
            <h2 className="font-display font-black text-2xl lg:text-3xl tracking-tight text-foreground mt-3">Serving {areaName} &amp; nearby</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">We deliver printing, labels, signage and apparel across {areaName} and the surrounding {reg.emirate} area, with fast collection and drop-off options for local businesses.</p>
            <div className="mt-6">
              <Link to="/contact" className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-6 py-3 rounded-full hover:bg-[#CC0000] transition-colors">{t("market.ctaBtn")} <ArrowRight size={18} className="rtl:rotate-180" /></Link>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="relative overflow-hidden border border-border" data-testid="area-map">
              <iframe title={`Map of ${areaName}, ${reg.emirate}`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" src={`https://www.google.com/maps?q=${encodeURIComponent(`${areaName}, ${reg.emirate}, UAE`)}&output=embed`} className="w-full h-[320px] lg:h-[360px] border-0" />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-secondary">
        <div className="max-w-[1400px] mx-auto px-5 lg:px-8">
          <Reveal className="max-w-2xl">
            <span className="overline text-primary">FAQ</span>
            <h2 className="font-display font-black text-2xl lg:text-3xl tracking-tight text-foreground mt-3">Printing in {areaName} — common questions</h2>
          </Reveal>
          <Accordion type="single" collapsible className="mt-8 max-w-3xl">
            {faqs.map((f, i) => (
              <AccordionItem key={f.q} value={`faq-${i}`} data-testid={`area-faq-${i}`} className="border border-border bg-white mb-3 px-5 rounded-sm">
                <AccordionTrigger className="text-left font-display font-bold text-base text-foreground hover:no-underline py-4">{f.q}</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {nearby.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-[1400px] mx-auto px-5 lg:px-8">
            <h2 className="font-display font-black text-2xl tracking-tight text-foreground mb-3">Other areas we serve in {reg.emirate}</h2>
            <p className="text-muted-foreground mb-8">We also provide printing services across nearby areas in {reg.emirate}.</p>
            <div className="flex flex-wrap gap-2">
              {nearby.map((a) => (
                <Link key={a} to={`/market-areas/${reg.slug}/${slugifyArea(a)}`} data-testid={`nearby-area-${slugifyArea(a)}`} className="inline-flex items-center gap-1.5 text-sm font-medium border border-border px-3 py-1.5 text-foreground/80 hover:border-primary hover:text-primary hover:bg-primary/5 transition-colors">
                  <MapPin size={13} className="text-primary" /> {a}
                </Link>
              ))}
            </div>
            <div className="mt-8">
              <Link to={`/market-areas/${reg.slug}`} className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
                View all of {reg.emirate} <ArrowRight size={18} className="rtl:rotate-180" />
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
