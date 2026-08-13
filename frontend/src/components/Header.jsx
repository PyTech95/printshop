import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Phone, ChevronDown, Globe } from "lucide-react";
import { CONTACT, products } from "@/data/products";
import { useI18n } from "@/i18n/LanguageContext";

export const Header = () => {
  const { t, lang, toggle } = useI18n();
  const [open, setOpen] = useState(false);
  const [prodOpen, setProdOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); setProdOpen(false); }, [pathname]);

  const links = [
    { to: "/", label: t("nav.home") },
    { to: "/about", label: t("nav.about") },
    { to: "/products", label: t("nav.products"), hasDropdown: true },
    { to: "/market-areas", label: t("nav.marketAreas") },
    { to: "/industries", label: t("nav.industries") },
    { to: "/why-choose-us", label: t("nav.why") },
    { to: "/gallery", label: t("nav.gallery") },
    { to: "/faq", label: t("nav.faq") },
    { to: "/contact", label: t("nav.contact") },
  ];

  const isActive = (to) => (to === "/" ? pathname === "/" : pathname.startsWith(to));

  return (
    <header
      data-testid="site-header"
      className={`fixed top-0 inset-x-0 z-50 bg-white/95 backdrop-blur-md border-b transition-all duration-300 ${scrolled ? "shadow-lg" : ""}`}
    >
      <div className="max-w-[1400px] mx-auto px-5 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20 gap-4">
          <Link to="/" data-testid="logo-link" className="flex items-center shrink-0 group">
            <img src="/logo-trim.png" alt="My Labels UAE" className="h-10 lg:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.04]" />
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {links.map((l) => (
              <div
                key={l.to}
                className="relative"
                onMouseEnter={() => l.hasDropdown && setProdOpen(true)}
                onMouseLeave={() => l.hasDropdown && setProdOpen(false)}
              >
                <Link
                  to={l.to}
                  data-testid={`nav-${l.to === "/" ? "home" : l.to.slice(1)}`}
                  className={`relative px-3 py-2 text-sm font-medium flex items-center gap-1 whitespace-nowrap transition-colors duration-200 after:absolute after:bottom-0 after:inset-x-3 after:h-0.5 after:bg-primary after:origin-left after:transition-transform after:duration-300 ${isActive(l.to) ? "text-primary after:scale-x-100" : "text-foreground/80 hover:text-primary after:scale-x-0 hover:after:scale-x-100"}`}
                >
                  {l.label}
                  {l.hasDropdown && <ChevronDown size={14} />}
                </Link>
                {l.hasDropdown && prodOpen && (
                  <div data-testid="products-dropdown" className="absolute top-full -left-4 pt-3 w-72">
                    <div className="bg-white border border-border shadow-xl py-2">
                      {products.map((p) => (
                        <Link
                          key={p.slug}
                          to={`/products/${p.slug}`}
                          data-testid={`dropdown-${p.slug}`}
                          className="block px-4 py-2.5 text-sm text-foreground/80 hover:text-primary hover:bg-secondary transition-colors"
                        >
                          {lang === "ar" ? p.name_ar : p.name}
                        </Link>
                      ))}
                      <Link to="/products" className="block px-4 py-2.5 text-sm font-semibold text-primary border-t border-border mt-1">
                        {t("nav.allProducts")} →
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <button
              onClick={toggle}
              data-testid="lang-toggle"
              className="flex items-center gap-1.5 text-sm font-semibold text-foreground hover:text-primary transition-colors whitespace-nowrap"
            >
              <Globe size={16} /> {lang === "en" ? "العربية" : "English"}
            </button>
            <Link
              to="/contact"
              data-testid="header-quote-btn"
              className="bg-primary text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-[#CC0000] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/30 transition-all duration-200 whitespace-nowrap"
            >
              {t("nav.quote")}
            </Link>
          </div>

          <div className="flex items-center gap-3 lg:hidden">
            <button onClick={toggle} data-testid="lang-toggle-mobile" className="text-sm font-semibold text-foreground flex items-center gap-1">
              <Globe size={18} />
            </button>
            <button data-testid="mobile-menu-toggle" onClick={() => setOpen(!open)} aria-label="Menu" className="text-foreground">
              {open ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div data-testid="mobile-menu" className="lg:hidden bg-white border-t max-h-[80vh] overflow-y-auto px-5 py-4">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              data-testid={`mobile-nav-${l.to === "/" ? "home" : l.to.slice(1)}`}
              className="block py-3 text-base font-medium text-foreground border-b border-border/60"
            >
              {l.label}
            </Link>
          ))}
          <Link to="/contact" data-testid="mobile-quote-btn" className="block text-center bg-primary text-white font-semibold px-5 py-3 rounded-sm mt-4">
            {t("nav.quote")}
          </Link>
          <a href={`tel:${CONTACT.phones[0].replace(/\s/g, "")}`} className="flex items-center justify-center gap-2 mt-3 text-sm font-semibold text-foreground">
            <Phone size={16} className="text-primary" /> {CONTACT.phones[0]}
          </a>
        </div>
      )}
    </header>
  );
};
