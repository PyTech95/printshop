import React, { useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { Check, ArrowRight, Phone, ChevronLeft, ChevronRight, MessageCircle, Maximize2 } from "lucide-react";
import { ImageLightbox } from "@/components/ImageLightbox";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { QuoteForm } from "@/components/QuoteForm";
import { ProductCard } from "@/components/ProductCard";
import { productBySlug, products, CONTACT } from "@/data/products";
import { useI18n } from "@/i18n/LanguageContext";
import { usePageSeo } from "@/hooks/useSeoSettings";
import { ProductReviews } from "@/components/ProductReviews";

const ProductGallery = ({ images, name }) => {
  const [active, setActive] = useState(0);
  const [zoomOpen, setZoomOpen] = useState(false);
  const total = images.length;
  const go = (d) => setActive((a) => (a + d + total) % total);

  return (
    <div data-testid="product-gallery" className="w-full min-w-0">
      <div className="relative overflow-hidden border border-border bg-secondary group/main">
        <img
          key={active}
          src={images[active]}
          alt={`${name} — image ${active + 1}`}
          data-testid="gallery-main-image"
          onClick={() => setZoomOpen(true)}
          className="w-full h-[300px] sm:h-[400px] lg:h-[460px] object-cover cursor-zoom-in"
        />
        <button
          data-testid="gallery-zoom-btn"
          onClick={() => setZoomOpen(true)}
          aria-label="Zoom image"
          className="absolute top-3 right-3 rtl:right-auto rtl:left-3 flex items-center gap-1.5 bg-black/65 text-white text-xs font-semibold px-3 py-2 hover:bg-primary transition-colors"
        >
          <Maximize2 size={14} /> Zoom
        </button>
        {total > 1 && (
          <>
            <button
              data-testid="gallery-prev"
              aria-label="Previous image"
              onClick={() => go(-1)}
              className="absolute top-1/2 -translate-y-1/2 left-3 rtl:left-auto rtl:right-3 w-10 h-10 bg-white/90 text-foreground hover:bg-primary hover:text-white flex items-center justify-center shadow-md transition-colors"
            >
              <ChevronLeft size={20} className="rtl:hidden" />
              <ChevronRight size={20} className="hidden rtl:block" />
            </button>
            <button
              data-testid="gallery-next"
              aria-label="Next image"
              onClick={() => go(1)}
              className="absolute top-1/2 -translate-y-1/2 right-3 rtl:right-auto rtl:left-3 w-10 h-10 bg-white/90 text-foreground hover:bg-primary hover:text-white flex items-center justify-center shadow-md transition-colors"
            >
              <ChevronRight size={20} className="rtl:hidden" />
              <ChevronLeft size={20} className="hidden rtl:block" />
            </button>
            <span className="absolute bottom-3 right-3 rtl:right-auto rtl:left-3 bg-black/70 text-white text-xs font-medium px-2.5 py-1">
              {active + 1} / {total}
            </span>
          </>
        )}
      </div>

      {total > 1 && (
        <div className="mt-3 flex gap-3 overflow-x-auto pb-1 snap-x w-full max-w-full">
          {images.map((img, i) => (
            <button
              key={i}
              data-testid={`gallery-thumb-${i}`}
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1}`}
              className={`relative shrink-0 w-20 h-20 sm:w-24 sm:h-24 border-2 snap-start overflow-hidden transition-colors ${i === active ? "border-primary" : "border-border hover:border-primary/50"}`}
            >
              <img src={img} alt={`${name} thumbnail ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
            </button>
          ))}
        </div>
      )}

      {zoomOpen && (
        <ImageLightbox
          images={images}
          index={active}
          alt={name}
          onIndexChange={setActive}
          onClose={() => setZoomOpen(false)}
        />
      )}
    </div>
  );
};

export default function ProductDetailPage() {
  const { slug } = useParams();
  const { t, lang } = useI18n();
  const product = productBySlug(slug);
  const [summary, setSummary] = useState(null);
  const origin = typeof window !== "undefined" ? window.location.origin : "";

  usePageSeo(
    product
      ? {
          site_title: `${product.name} in UAE | My Labels UAE`,
          meta_description: product.short,
          meta_keywords: `${product.name}, ${product.name} Dubai, ${product.name} UAE, printing services, ${product.name} Al Ain, ${product.name} Fujairah, ${product.name} Ras Al Khaimah`,
          og_title: `${product.name} — My Labels UAE`,
          og_description: product.short,
          canonical_url: `${origin}/products/${product.slug}`,
          jsonLd: [
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: `${origin}/` },
                { "@type": "ListItem", position: 2, name: "Products & Services", item: `${origin}/products` },
                { "@type": "ListItem", position: 3, name: product.name, item: `${origin}/products/${product.slug}` },
              ],
            },
            {
              "@context": "https://schema.org",
              "@type": "Service",
              serviceType: product.name,
              name: `${product.name} in the UAE`,
              description: product.description,
              areaServed: ["Dubai", "Al Ain", "Fujairah", "Ras Al Khaimah"],
              provider: { "@type": "LocalBusiness", name: "My Labels UAE", telephone: "+971561159894", email: "sales@mylabelsuae.com", areaServed: "AE" },
              url: `${origin}/products/${product.slug}`,
            },
            {
              "@context": "https://schema.org",
              "@type": "Product",
              name: product.name,
              description: product.description,
              image: product.image,
              brand: { "@type": "Brand", name: "My Labels UAE" },
              ...(summary && summary.count > 0
                ? { aggregateRating: { "@type": "AggregateRating", ratingValue: summary.average, reviewCount: summary.count } }
                : {}),
            },
          ],
        }
      : null
  );

  if (!product) return <Navigate to="/products" replace />;

  const name = lang === "ar" ? product.name_ar : product.name;
  const desc = lang === "ar" ? product.description_ar : product.description;
  const images = product.gallery && product.gallery.length ? product.gallery : [product.image];
  const related = products.filter((p) => p.slug !== slug).slice(0, 3);
  const waHref = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(`Hi My Labels UAE, I'd like a quote for ${product.name}.`)}`;

  return (
    <div>
      <PageHero
        overline={lang === "ar" ? product.tagline_ar : product.tagline}
        title={name}
        subtitle={lang === "ar" ? product.short_ar : product.short}
        image={product.image}
        crumbs={[{ label: t("nav.products"), to: "/products" }, { label: name }]}
      />

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-5 lg:px-8 grid lg:grid-cols-2 gap-10 lg:gap-14 items-start [&>*]:min-w-0">
          <Reveal>
            <ProductGallery images={images} name={name} />
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="font-display font-black text-3xl lg:text-4xl tracking-tight text-foreground">{name}</h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">{desc}</p>

            <div className="mt-8">
              <h3 className="overline text-primary">{t("products.provide")}</h3>
              <div className="mt-4 grid sm:grid-cols-2 gap-3">
                {product.features.map((ftr) => (
                  <div key={ftr} className="flex items-center gap-2.5 text-sm text-foreground/85">
                    <span className="w-5 h-5 bg-primary/10 flex items-center justify-center shrink-0"><Check size={13} className="text-primary" /></span>
                    {ftr}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <h3 className="overline text-primary">{t("products.useCases")}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {product.applications.map((a) => (
                  <span key={a} className="text-xs font-medium border border-border px-3 py-1.5 text-foreground/75">{a}</span>
                ))}
              </div>
            </div>

            <div className="mt-9 flex flex-wrap gap-3">
              <Link to="/contact" data-testid="detail-quote-btn" className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-7 py-3.5 rounded-sm hover:bg-[#CC0000] transition-colors">
                {t("common.getQuote")} <ArrowRight size={18} className="rtl:rotate-180" />
              </Link>
              <a href={waHref} target="_blank" rel="noopener noreferrer" data-testid="detail-whatsapp-btn" className="inline-flex items-center gap-2 border border-foreground/15 text-foreground font-semibold px-7 py-3.5 rounded-sm hover:border-primary hover:text-primary transition-colors">
                <MessageCircle size={18} className="text-primary" /> {t("common.whatsapp")}
              </a>
              <a href={`tel:${CONTACT.phones[0].replace(/\s/g, "")}`} data-testid="detail-call-btn" className="inline-flex items-center gap-2 border border-foreground/15 text-foreground font-semibold px-7 py-3.5 rounded-sm hover:border-primary hover:text-primary transition-colors">
                <Phone size={18} className="text-primary" /> {t("common.callUs")}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-secondary">
        <div className="max-w-[1400px] mx-auto px-5 lg:px-8 grid lg:grid-cols-5 gap-10 items-start">
          <div className="lg:col-span-2">
            <span className="overline text-primary">{t("contact.overline")}</span>
            <h2 className="font-display font-black text-3xl tracking-tight text-foreground mt-3">{t("contact.title")}</h2>
            <p className="mt-4 text-muted-foreground">{t("contact.sub")}</p>
          </div>
          <div className="lg:col-span-3">
            <QuoteForm selectedProduct={product.name} />
          </div>
        </div>
      </section>

      <ProductReviews product={product} onSummary={setSummary} />

      <section className="py-20 bg-white">
        <div className="max-w-[1400px] mx-auto px-5 lg:px-8">
          <h2 className="font-display font-black text-2xl lg:text-3xl tracking-tight text-foreground mb-10">{t("products.relatedTitle")}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((p, i) => <ProductCard key={p.slug} product={p} index={i} />)}
          </div>
        </div>
      </section>
    </div>
  );
}
