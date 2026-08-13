import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Send, Phone, Mail, MapPin, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { CONTACT, products } from "@/data/products";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const initial = { name: "", email: "", phone: "", company: "", product: "", quantity: "", message: "" };

export const Contact = ({ selectedProduct }) => {
  const [form, setForm] = useState(initial);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedProduct) setForm((f) => ({ ...f, product: selectedProduct }));
  }, [selectedProduct]);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.product) {
      toast.error("Please fill in your name, email, phone and product.");
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API}/enquiries`, form);
      toast.success("Thank you! Your quote request has been received. We'll be in touch shortly.");
      setForm(initial);
    } catch (err) {
      toast.error("Something went wrong. Please try again or WhatsApp us.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" data-testid="contact-section" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <span className="overline text-primary">Request a Quote</span>
            <h2 className="font-display font-black text-3xl lg:text-4xl tracking-tight text-foreground mt-3">
              Let's talk about your project
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Tell us what you need and our team will get back to you with pricing
              and lead times. Prefer to chat? Call or WhatsApp us directly.
            </p>

            <div className="mt-10 space-y-6">
              {CONTACT.phones.map((ph) => (
                <a key={ph} href={`tel:${ph.replace(/\s/g, "")}`} data-testid={`contact-phone-${ph.replace(/\s/g,'')}`} className="flex items-center gap-4 group">
                  <span className="w-11 h-11 bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors">
                    <Phone size={18} className="text-primary group-hover:text-white transition-colors" />
                  </span>
                  <span className="font-semibold text-foreground group-hover:text-primary transition-colors">{ph}</span>
                </a>
              ))}
              <a href={`mailto:${CONTACT.email}`} data-testid="contact-email" className="flex items-center gap-4 group">
                <span className="w-11 h-11 bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors">
                  <Mail size={18} className="text-primary group-hover:text-white transition-colors" />
                </span>
                <span className="font-semibold text-foreground group-hover:text-primary transition-colors break-all">{CONTACT.email}</span>
              </a>
              <div className="flex items-center gap-4">
                <span className="w-11 h-11 bg-primary/10 flex items-center justify-center">
                  <MapPin size={18} className="text-primary" />
                </span>
                <span className="font-semibold text-foreground">{CONTACT.location}</span>
              </div>
            </div>
          </motion.div>

          <motion.form
            data-testid="quote-form"
            onSubmit={submit}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-3 bg-secondary border border-border p-6 lg:p-8"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Full Name *</label>
                <Input data-testid="input-name" value={form.name} onChange={(e) => set("name", e.target.value)} placeholder="Your name" className="rounded-sm bg-white" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Company</label>
                <Input data-testid="input-company" value={form.company} onChange={(e) => set("company", e.target.value)} placeholder="Company name" className="rounded-sm bg-white" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Email *</label>
                <Input data-testid="input-email" type="email" value={form.email} onChange={(e) => set("email", e.target.value)} placeholder="you@company.com" className="rounded-sm bg-white" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Phone *</label>
                <Input data-testid="input-phone" value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="+971 ..." className="rounded-sm bg-white" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Product / Service *</label>
                <Select value={form.product} onValueChange={(v) => set("product", v)}>
                  <SelectTrigger data-testid="select-product" className="rounded-sm bg-white">
                    <SelectValue placeholder="Select a product" />
                  </SelectTrigger>
                  <SelectContent>
                    {products.map((p) => (
                      <SelectItem key={p.id} value={p.name} data-testid={`select-option-${p.id}`}>{p.name}</SelectItem>
                    ))}
                    <SelectItem value="Other / General Enquiry">Other / General Enquiry</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Estimated Quantity</label>
                <Input data-testid="input-quantity" value={form.quantity} onChange={(e) => set("quantity", e.target.value)} placeholder="e.g. 5000 units" className="rounded-sm bg-white" />
              </div>
            </div>
            <div className="mt-4">
              <label className="text-sm font-medium text-foreground mb-1.5 block">Message</label>
              <Textarea data-testid="input-message" value={form.message} onChange={(e) => set("message", e.target.value)} placeholder="Tell us about sizes, materials, finishes, deadlines..." rows={4} className="rounded-sm bg-white" />
            </div>
            <button
              type="submit"
              data-testid="submit-quote-btn"
              disabled={loading}
              className="mt-6 w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary text-white font-semibold px-8 py-3.5 rounded-sm hover:bg-[#CC0000] transition-colors duration-200 disabled:opacity-60"
            >
              {loading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
              {loading ? "Sending..." : "Send Quote Request"}
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};
