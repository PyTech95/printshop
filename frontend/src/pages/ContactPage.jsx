import React from "react";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { QuoteForm } from "@/components/QuoteForm";
import { CONTACT, IMG } from "@/data/products";
import { useI18n } from "@/i18n/LanguageContext";

export default function ContactPage() {
  const { t } = useI18n();
  const waUrl = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent("Hello My Labels UAE, I would like to request a quote.")}`;

  return (
    <div>
      <PageHero overline={t("contact.overline")} title={t("contact.title")} subtitle={t("contact.sub")} image={IMG.contactHero} crumbs={[{ label: t("nav.contact") }]} />

      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-[1400px] mx-auto px-5 lg:px-8 grid lg:grid-cols-5 gap-12 items-start">
          <Reveal className="lg:col-span-2">
            <span className="overline text-primary">{t("contact.overline")}</span>
            <h2 className="font-display font-black text-3xl lg:text-4xl tracking-tight text-foreground mt-3">{t("contact.title")}</h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">{t("contact.sub")}</p>

            <div className="mt-10 space-y-6">
              {CONTACT.phones.map((ph) => (
                <a key={ph} href={`tel:${ph.replace(/\s/g, "")}`} data-testid={`contact-phone-${ph.replace(/\s/g, "")}`} className="flex items-center gap-4 group">
                  <span className="w-11 h-11 bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors"><Phone size={18} className="text-primary group-hover:text-white transition-colors" /></span>
                  <span className="font-semibold text-foreground group-hover:text-primary transition-colors" dir="ltr">{ph}</span>
                </a>
              ))}
              <a href={`mailto:${CONTACT.email}`} data-testid="contact-email" className="flex items-center gap-4 group">
                <span className="w-11 h-11 bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors"><Mail size={18} className="text-primary group-hover:text-white transition-colors" /></span>
                <span className="font-semibold text-foreground group-hover:text-primary transition-colors break-all">{CONTACT.email}</span>
              </a>
              <div className="flex items-center gap-4">
                <span className="w-11 h-11 bg-primary/10 flex items-center justify-center"><MapPin size={18} className="text-primary" /></span>
                <span className="font-semibold text-foreground">{CONTACT.location}</span>
              </div>
              <a href={waUrl} target="_blank" rel="noopener noreferrer" data-testid="contact-whatsapp" className="inline-flex items-center gap-2 bg-[#25D366] text-white font-semibold px-6 py-3 rounded-sm hover:opacity-90 transition-opacity">
                <MessageCircle size={18} fill="white" strokeWidth={0} /> {t("common.whatsapp")}
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-3">
            <QuoteForm />
          </Reveal>
        </div>
      </section>
    </div>
  );
}
