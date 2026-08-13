import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Maximize2 } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { ImageLightbox } from "@/components/ImageLightbox";
import { products, IMG } from "@/data/products";
import { useI18n } from "@/i18n/LanguageContext";

const spans = ["lg:col-span-2 lg:row-span-2", "", "", "", "lg:col-span-2", "", "", "", "", "lg:col-span-2"];
const FILTERS = ["all", "labels", "warehouse", "packaging", "apparel", "largeformat", "engraving"];

export default function GalleryPage() {
  const { t, lang } = useI18n();
  const [filter, setFilter] = useState("all");
  const [zoomIndex, setZoomIndex] = useState(null);

  const tiles = useMemo(
    () =>
      products
        .filter((p) => filter === "all" || p.category === filter)
        .map((p, i) => ({
          img: p.image,
          slug: p.slug,
          name: lang === "ar" ? p.name_ar : p.name,
          span: spans[i] || "",
        })),
    [filter, lang]
  );

  const counts = useMemo(
    () =>
      FILTERS.reduce((acc, f) => {
        acc[f] = f === "all" ? products.length : products.filter((p) => p.category === f).length;
        return acc;
      }, {}),
    []
  );

  return (
    <div>
      <PageHero overline={t("gallery.overline")} title={t("gallery.title")} subtitle={t("gallery.sub")} image={IMG.factoryHero} crumbs={[{ label: t("nav.gallery") }]} />
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-5 lg:px-8">
          <div className="flex flex-wrap gap-2 mb-10" data-testid="gallery-filters">
            {FILTERS.map((f) => (
              <button
                key={f}
                data-testid={`gallery-filter-${f}`}
                onClick={() => setFilter(f)}
                className={`inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold border transition-all duration-200 ${
                  filter === f
                    ? "bg-primary text-white border-primary"
                    : "bg-white text-foreground/70 border-border hover:border-primary hover:text-primary"
                }`}
              >
                {t(`gallery.${f}`)}
                <span className={`text-[11px] ${filter === f ? "text-white/70" : "text-muted-foreground"}`}>{counts[f]}</span>
              </button>
            ))}
          </div>

          {tiles.length === 0 ? (
            <p className="text-muted-foreground py-16 text-center" data-testid="gallery-empty">{t("gallery.empty")}</p>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 auto-rows-[220px] gap-4">
              {tiles.map((tile, i) => (
                <motion.div
                  key={tile.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: (i % 4) * 0.05 }}
                  className={`relative overflow-hidden group border border-border ${tile.span}`}
                >
                  <img src={tile.img} alt={tile.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[600ms]" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <button
                    data-testid={`gallery-zoom-${tile.slug}`}
                    onClick={() => setZoomIndex(i)}
                    aria-label={`Zoom ${tile.name}`}
                    className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center bg-black/60 text-white opacity-0 group-hover:opacity-100 hover:bg-primary transition-all duration-200"
                  >
                    <Maximize2 size={15} />
                  </button>
                  <Link
                    to={`/products/${tile.slug}`}
                    data-testid={`gallery-tile-${tile.slug}`}
                    className="absolute bottom-4 left-4 rtl:left-auto rtl:right-4 text-white font-display font-bold text-lg opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300"
                  >
                    {tile.name}
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {zoomIndex !== null && (
        <ImageLightbox
          images={tiles.map((tl) => tl.img)}
          index={zoomIndex}
          alt={tiles[zoomIndex]?.name || "Gallery image"}
          onIndexChange={setZoomIndex}
          onClose={() => setZoomIndex(null)}
        />
      )}
    </div>
  );
}
