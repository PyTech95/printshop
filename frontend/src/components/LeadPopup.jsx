import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Loader2, Send } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useI18n } from "@/i18n/LanguageContext";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const SEEN_KEY = "ml_lead_popup_seen";

export const LeadPopup = () => {
  const { lang, t } = useI18n();
  const [cfg, setCfg] = useState(null);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let timer;
    const run = async () => {
      if (localStorage.getItem(SEEN_KEY)) return;
      try {
        const { data } = await axios.get(`${API}/popup`);
        setCfg(data);
        if (data.enabled) {
          timer = setTimeout(() => {
            if (!localStorage.getItem(SEEN_KEY)) setOpen(true);
          }, (Number(data.delay_seconds) || 15) * 1000);
        }
      } catch {
        /* ignore */
      }
    };
    run();
    return () => timer && clearTimeout(timer);
  }, []);

  const dismiss = () => {
    localStorage.setItem(SEEN_KEY, "1");
    setOpen(false);
  };

  const set = (k, v) => setForm((s) => ({ ...s, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.email) {
      toast.error(lang === "ar" ? "يرجى إدخال الاسم والهاتف والبريد الإلكتروني." : "Please enter your name, phone and email.");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API}/enquiries`, {
        name: form.name,
        email: form.email,
        phone: form.phone,
        product: "Website Popup Enquiry",
        message: "Lead captured via website popup.",
      });
      toast.success(lang === "ar" ? "شكراً لك! سنعاود التواصل معك قريباً." : "Thank you! Our team will be in touch shortly.");
      localStorage.setItem(SEEN_KEY, "1");
      setOpen(false);
    } catch {
      toast.error(lang === "ar" ? "حدث خطأ ما. حاول مرة أخرى." : "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!cfg) return null;
  const headline = lang === "ar" ? cfg.headline_ar || cfg.headline : cfg.headline;
  const subtext = lang === "ar" ? cfg.subtext_ar || cfg.subtext : cfg.subtext;
  const btn = lang === "ar" ? cfg.button_label_ar || cfg.button_label : cfg.button_label;

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) dismiss(); }}>
      <DialogContent
        data-testid="lead-popup"
        dir={lang === "ar" ? "rtl" : "ltr"}
        className="w-[calc(100%-2rem)] max-w-md p-0 overflow-hidden gap-0 rounded-md border-0"
      >
        <div className="bg-primary px-6 py-6 pe-12">
          <DialogTitle data-testid="lead-popup-headline" className="font-display font-black text-2xl text-white leading-tight">
            {headline}
          </DialogTitle>
          <DialogDescription className="text-white/85 text-sm mt-2">{subtext}</DialogDescription>
        </div>
        <form onSubmit={submit} className="p-6 space-y-3" data-testid="lead-popup-form">
          <Input data-testid="lead-name" value={form.name} onChange={(e) => set("name", e.target.value)} placeholder={t("contact.form.namePh")} className="rounded-sm" />
          <Input data-testid="lead-phone" value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder={t("contact.form.phonePh")} className="rounded-sm" dir="ltr" />
          <Input data-testid="lead-email" type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder={t("contact.form.emailPh")} className="rounded-sm" />
          <button
            type="submit"
            data-testid="lead-submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 bg-primary text-white font-semibold px-6 py-3.5 rounded-sm hover:bg-[#CC0000] transition-colors disabled:opacity-60"
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />} {loading ? t("common.sending") : btn}
          </button>
          <p className="text-[11px] text-muted-foreground text-center pt-1">
            {lang === "ar" ? "لن نشارك بياناتك أبداً." : "We'll never share your details."}
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};
