import React, { useState } from "react";
import Marquee from "react-fast-marquee";
import { Maximize2 } from "lucide-react";
import { ImageLightbox } from "@/components/ImageLightbox";
import { products } from "@/data/products";
import { useI18n } from "@/i18n/LanguageContext";

const showreel = products.map((p, index) => ({
  img: p.image,
  slug: p.slug,
  name: p.name,
  name_ar: p.name_ar,
  index,
}));

export const WorkShowreel = () => {
  const { t, lang } = useI18n();
  const [zoomIndex, setZoomIndex] = useState(null);

  return (
    <section data-testid="work-showreel" className="relative py-16 lg:py-24 bg-[#0A0A0A] overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.06]"
        style={{ backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "22px 22px" }}
      />
      <div className="relative max-w-[1400px] mx-auto px-5 lg:px-8 mb-10 lg:mb-14">
        <span className="overline text-primary">{t("showreel.overline")}</span>
        <h2 className="font-display font-black text-3xl lg:text-5xl tracking-tight text-white mt-3">{t("showreel.title")}</h2>
        <p className="mt-4 text-white/55 max-w-2xl text-sm lg:text-base">{t("showreel.sub")}</p>
      </div>

      <div className="relative">
        <Marquee speed={32} gradient={false} autoFill pauseOnHover direction={lang === "ar" ? "right" : "left"}>
          {showreel.map((item) => (
            <button
              key={item.slug}
              data-testid={`showreel-item-${item.index}`}
              onClick={() => setZoomIndex(item.index)}
              aria-label={`Zoom ${item.name}`}
              className="group relative mx-2 lg:mx-3 w-[250px] sm:w-[320px] lg:w-[380px] h-[170px] sm:h-[210px] lg:h-[240px] shrink-0 overflow-hidden border border-white/10 hover:border-primary transition-colors duration-300"
            >
              <img
                src={item.img}
                alt={lang === "ar" ? item.name_ar : item.name}
                loading="lazy"
                className="w-full h-full object-cover grayscale-[35%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="absolute bottom-3 left-4 rtl:left-auto rtl:right-4 text-start text-white font-display font-bold text-sm lg:text-base leading-tight pr-8">
                {lang === "ar" ? item.name_ar : item.name}
              </span>
              <span className="absolute top-3 right-3 rtl:right-auto rtl:left-3 w-8 h-8 flex items-center justify-center bg-primary text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Maximize2 size={14} />
              </span>
            </button>
          ))}
        </Marquee>
      </div>

      {zoomIndex !== null && (
        <ImageLightbox
          images={showreel.map((s) => s.img)}
          index={zoomIndex}
          alt={showreel[zoomIndex]?.name || "Work sample"}
          onIndexChange={setZoomIndex}
          onClose={() => setZoomIndex(null)}
        />
      )}
    </section>
  );
};
