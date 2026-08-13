import React from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";
import { CONTACT, products } from "@/data/products";
import { RatingBadge } from "@/components/RatingBadge";
import { useI18n } from "@/i18n/LanguageContext";

export const Footer = () => {
  const { t, lang } = useI18n();
  return (
    <footer data-testid="site-footer" className="bg-[#0A0A0A] text-white">
      <div className="max-w-[1400px] mx-auto px-5 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <div className="bg-white inline-block p-3 rounded-sm mb-5">
              <img src="/logo-trim.png" alt="My Labels UAE" className="h-16 w-auto object-contain" />
            </div>
            <p className="text-sm text-white/55 leading-relaxed">{t("footer.tagline")}</p>
            <div className="mt-5"><RatingBadge variant="dark" /></div>
          </div>

          <div>
            <h4 className="font-display font-bold text-sm uppercase tracking-widest mb-5">{t("footer.products")}</h4>
            <ul className="space-y-3">
              {products.slice(0, 6).map((p) => (
                <li key={p.slug}>
                  <Link to={`/products/${p.slug}`} className="text-sm text-white/55 hover:text-primary transition-colors">
                    {lang === "ar" ? p.name_ar : p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-sm uppercase tracking-widest mb-5">{t("footer.company")}</h4>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-sm text-white/55 hover:text-primary transition-colors">{t("nav.about")}</Link></li>
              <li><Link to="/market-areas" className="text-sm text-white/55 hover:text-primary transition-colors">{t("nav.marketAreas")}</Link></li>
              <li><Link to="/industries" className="text-sm text-white/55 hover:text-primary transition-colors">{t("nav.industries")}</Link></li>
              <li><Link to="/why-choose-us" className="text-sm text-white/55 hover:text-primary transition-colors">{t("nav.why")}</Link></li>
              <li><Link to="/gallery" className="text-sm text-white/55 hover:text-primary transition-colors">{t("nav.gallery")}</Link></li>
              <li><Link to="/faq" className="text-sm text-white/55 hover:text-primary transition-colors">{t("nav.faq")}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-sm uppercase tracking-widest mb-5">{t("footer.getInTouch")}</h4>
            <ul className="space-y-4">
              {CONTACT.phones.map((ph) => (
                <li key={ph}>
                  <a href={`tel:${ph.replace(/\s/g, "")}`} className="flex items-center gap-3 text-sm text-white/70 hover:text-primary transition-colors">
                    <Phone size={16} className="text-primary shrink-0" /> <span dir="ltr">{ph}</span>
                  </a>
                </li>
              ))}
              <li>
                <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-3 text-sm text-white/70 hover:text-primary transition-colors break-all">
                  <Mail size={16} className="text-primary shrink-0" /> {CONTACT.email}
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm text-white/70">
                <MapPin size={16} className="text-primary shrink-0" /> {CONTACT.location}
              </li>
            </ul>
            <Link to="/contact" className="inline-flex items-center gap-1 mt-6 bg-primary text-white text-sm font-semibold px-5 py-2.5 rounded-sm hover:bg-[#CC0000] transition-colors">
              {t("nav.quote")} <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>

        <div className="mt-14 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between gap-3">
          <p className="text-xs text-white/40">© {new Date().getFullYear()} {CONTACT.company}. {t("footer.rights")}</p>
          <Link to="/login" data-testid="footer-admin-link" className="text-xs text-white/30 hover:text-white/60 transition-colors">{t("footer.admin")}</Link>
        </div>
      </div>
    </footer>
  );
};
