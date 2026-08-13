import React, { useState } from "react";
import { Phone, MessageCircle, FileText } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { QuoteForm } from "@/components/QuoteForm";
import { CONTACT } from "@/data/products";
import { useI18n } from "@/i18n/LanguageContext";

export const FloatingActions = () => {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const waUrl = `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent("Hello My Labels UAE, I would like to request a quote.")}`;

  return (
    <>
      {/* LEFT: Enquiry + Call */}
      <div className="fixed bottom-5 left-4 sm:bottom-6 sm:left-6 z-[60] flex flex-row sm:flex-col items-start gap-3">
        <button
          onClick={() => setOpen(true)}
          data-testid="floating-enquiry-btn"
          className="flex items-center gap-2 bg-primary text-white font-semibold p-3.5 sm:pl-4 sm:pr-5 sm:py-3 rounded-full shadow-xl hover:bg-[#CC0000] hover:scale-105 transition-all duration-200"
          aria-label={t("nav.quote")}
        >
          <FileText size={20} />
          <span className="text-sm hidden sm:inline">{t("common.enquireNow")}</span>
        </button>
        <a
          href={`tel:${CONTACT.phones[0].replace(/\s/g, "")}`}
          data-testid="floating-call-btn"
          className="flex items-center gap-2 bg-[#0A0A0A] text-white font-semibold p-3.5 sm:pl-4 sm:pr-5 sm:py-3 rounded-full shadow-xl hover:bg-primary hover:scale-105 transition-all duration-200"
          aria-label={t("common.callUs")}
        >
          <Phone size={20} />
          <span className="text-sm hidden sm:inline">{t("common.callUs")}</span>
        </a>
      </div>

      {/* RIGHT: WhatsApp round */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        data-testid="whatsapp-float-btn"
        className="fixed bottom-5 right-4 sm:bottom-6 sm:right-6 z-[60] w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center bg-[#25D366] text-white rounded-full shadow-xl hover:scale-110 transition-transform duration-200"
        aria-label={t("common.whatsapp")}
      >
        <MessageCircle size={26} fill="white" strokeWidth={0} />
      </a>

      {/* ENQUIRY POPUP */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent data-testid="enquiry-dialog" className="max-w-xl p-0 rounded-none overflow-hidden gap-0 border-t-4 border-primary max-h-[92vh] overflow-y-auto">
          <div className="bg-primary text-white px-6 py-5">
            <DialogHeader>
              <DialogTitle className="font-display font-black text-2xl text-white text-start">{t("contact.title")}</DialogTitle>
              <DialogDescription className="text-white/85 text-sm text-start mt-1">{t("contact.sub")}</DialogDescription>
            </DialogHeader>
          </div>
          <div className="p-6">
            <QuoteForm noBg onSuccess={() => setOpen(false)} />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
