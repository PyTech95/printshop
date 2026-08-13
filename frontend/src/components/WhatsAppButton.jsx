import React from "react";
import { MessageCircle } from "lucide-react";
import { CONTACT } from "@/data/products";
import { useI18n } from "@/i18n/LanguageContext";

export const WhatsAppButton = () => {
  const { t } = useI18n();
  const url = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent("Hello My Labels UAE, I would like to request a quote.")}`;
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      data-testid="whatsapp-float-btn"
      className="fixed bottom-6 right-6 z-[60] flex items-center gap-2 bg-[#25D366] text-white font-semibold pl-4 pr-5 py-3 rounded-full shadow-xl hover:scale-105 transition-transform duration-200"
      aria-label="WhatsApp"
    >
      <MessageCircle size={22} fill="white" strokeWidth={0} />
      <span className="hidden sm:inline text-sm">{t("common.whatsapp")}</span>
    </a>
  );
};
