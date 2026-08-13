import React from "react";
import { PageHero } from "@/components/PageHero";
import { ProductCard } from "@/components/ProductCard";
import { products, IMG } from "@/data/products";
import { useI18n } from "@/i18n/LanguageContext";

export default function ProductsPage() {
  const { t } = useI18n();
  return (
    <div>
      <PageHero overline={t("products.overline")} title={t("products.title")} subtitle={t("products.sub")} image={IMG.labelsRolls} crumbs={[{ label: t("nav.products") }]} />
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1400px] mx-auto px-5 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p, i) => <ProductCard key={p.slug} product={p} index={i} />)}
          </div>
        </div>
      </section>
    </div>
  );
}
