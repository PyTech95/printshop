import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Send, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CONTACT, products } from "@/data/products";
import { useI18n } from "@/i18n/LanguageContext";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;
const initial = { name: "", email: "", phone: "", company: "", product: "", quantity: "", message: "" };

export const QuoteForm = ({ selectedProduct, onSuccess, noBg = false }) => {
  const { t, lang } = useI18n();
  const [form, setForm] = useState(initial);
  const [loading, setLoading] = useState(false);
  const [alsoWhatsapp, setAlsoWhatsapp] = useState(true);
  const f = (k) => t(`contact.form.${k}`);

  useEffect(() => {
    if (selectedProduct) setForm((s) => ({ ...s, product: selectedProduct }));
  }, [selectedProduct]);

  const set = (k, v) => setForm((s) => ({ ...s, [k]: v }));

  const buildWhatsAppText = (d) =>
    `*New Quote Request — My Labels UAE*%0A%0A` +
    `*Name:* ${d.name}%0A` +
    (d.company ? `*Company:* ${d.company}%0A` : "") +
    `*Email:* ${d.email}%0A` +
    `*Phone:* ${d.phone}%0A` +
    `*Product:* ${d.product}%0A` +
    (d.quantity ? `*Quantity:* ${d.quantity}%0A` : "") +
    (d.message ? `*Message:* ${d.message}%0A` : "");

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.product) {
      toast.error(f("required"));
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API}/enquiries`, form);
      toast.success(f("success"));
      if (alsoWhatsapp) {
        const url = `https://wa.me/${CONTACT.whatsapp}?text=${buildWhatsAppText(form)}`;
        window.open(url, "_blank", "noopener,noreferrer");
      }
      setForm(initial);
      onSuccess?.();
    } catch (err) {
      toast.error(f("error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form data-testid="quote-form" onSubmit={submit} className={noBg ? "" : "bg-secondary border border-border p-6 lg:p-8"}>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">{f("name")} *</label>
          <Input data-testid="input-name" value={form.name} onChange={(e) => set("name", e.target.value)} placeholder={f("namePh")} className="rounded-sm bg-white" />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">{f("company")}</label>
          <Input data-testid="input-company" value={form.company} onChange={(e) => set("company", e.target.value)} placeholder={f("companyPh")} className="rounded-sm bg-white" />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">{f("email")} *</label>
          <Input data-testid="input-email" type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder={f("emailPh")} className="rounded-sm bg-white" />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">{f("phone")} *</label>
          <Input data-testid="input-phone" value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder={f("phonePh")} className="rounded-sm bg-white" dir="ltr" />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">{f("product")} *</label>
          <Select value={form.product} onValueChange={(v) => set("product", v)}>
            <SelectTrigger data-testid="select-product" className="rounded-sm bg-white"><SelectValue placeholder={f("selectProduct")} /></SelectTrigger>
            <SelectContent>
              {products.map((p) => (
                <SelectItem key={p.slug} value={p.name} data-testid={`select-option-${p.slug}`}>{lang === "ar" ? p.name_ar : p.name}</SelectItem>
              ))}
              <SelectItem value="Other / General Enquiry">{f("other")}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">{f("quantity")}</label>
          <Input data-testid="input-quantity" value={form.quantity} onChange={(e) => set("quantity", e.target.value)} placeholder={f("quantityPh")} className="rounded-sm bg-white" />
        </div>
      </div>
      <div className="mt-4">
        <label className="text-sm font-medium text-foreground mb-1.5 block">{f("message")}</label>
        <Textarea data-testid="input-message" value={form.message} onChange={(e) => set("message", e.target.value)} placeholder={f("messagePh")} rows={4} className="rounded-sm bg-white" />
      </div>
      <label className="flex items-center gap-2.5 mt-4 cursor-pointer">
        <Checkbox data-testid="whatsapp-check" checked={alsoWhatsapp} onCheckedChange={(v) => setAlsoWhatsapp(!!v)} />
        <span className="text-sm text-foreground/80">{f("alsoWhatsapp")}</span>
      </label>
      <button type="submit" data-testid="submit-quote-btn" disabled={loading} className="mt-6 w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary text-white font-semibold px-8 py-3.5 rounded-sm hover:bg-[#CC0000] transition-colors duration-200 disabled:opacity-60">
        {loading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
        {loading ? t("common.sending") : t("common.sendRequest")}
      </button>
    </form>
  );
};
