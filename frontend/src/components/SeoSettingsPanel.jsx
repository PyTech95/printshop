import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Save, Loader2, Search, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { applySeo, setDefaults } from "@/hooks/useSeoSettings";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const FIELDS = [
  { key: "site_title", label: "Site Title", hint: "Shown in the browser tab and search results.", type: "input" },
  { key: "meta_description", label: "Meta Description", hint: "150–160 characters recommended.", type: "textarea" },
  { key: "meta_keywords", label: "Meta Keywords", hint: "Comma-separated keywords.", type: "textarea" },
  { key: "og_title", label: "Open Graph Title", hint: "Title used when shared on social media.", type: "input" },
  { key: "og_description", label: "Open Graph Description", hint: "Description used on social shares.", type: "textarea" },
  { key: "og_image", label: "Open Graph Image URL", hint: "Preview image for social shares (optional).", type: "input" },
  { key: "canonical_url", label: "Canonical URL", hint: "The primary URL of the site.", type: "input" },
];

export const SeoSettingsPanel = ({ token }) => {
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [pinging, setPinging] = useState(false);

  useEffect(() => {
    axios
      .get(`${API}/seo`)
      .then(({ data }) => setForm(data))
      .catch(() => toast.error("Failed to load SEO settings."))
      .finally(() => setLoading(false));
  }, []);

  const set = (k, v) => setForm((s) => ({ ...s, [k]: v }));

  const save = async () => {
    setSaving(true);
    try {
      const { data } = await axios.put(`${API}/seo`, form, { headers: { Authorization: `Bearer ${token}` } });
      setDefaults(data);
      applySeo(data);
      toast.success("SEO settings saved and applied.");
    } catch (e) {
      toast.error("Failed to save SEO settings.");
    } finally {
      setSaving(false);
    }
  };

  const ping = async () => {
    setPinging(true);
    try {
      const { data } = await axios.post(`${API}/seo/ping-sitemap`, {}, { headers: { Authorization: `Bearer ${token}` } });
      toast.success(`Sitemap submitted to search engines: ${data.sitemap}`);
    } catch (e) {
      toast.error("Failed to submit sitemap.");
    } finally {
      setPinging(false);
    }
  };

  if (loading || !form) return <div className="p-16 text-center text-muted-foreground">Loading SEO settings...</div>;

  return (
    <div className="bg-white border border-border p-6 lg:p-8" data-testid="seo-settings-panel">
      <div className="flex items-center gap-2.5 mb-6">
        <span className="w-9 h-9 bg-primary/10 flex items-center justify-center"><Search size={18} className="text-primary" /></span>
        <div>
          <h2 className="font-display font-bold text-xl text-foreground">SEO Settings</h2>
          <p className="text-sm text-muted-foreground">Manage how the site appears in search engines and social media.</p>
        </div>
      </div>

      <div className="grid gap-5 max-w-3xl">
        {FIELDS.map((f) => (
          <div key={f.key}>
            <label className="text-sm font-medium text-foreground mb-1.5 block">{f.label}</label>
            {f.type === "textarea" ? (
              <Textarea data-testid={`seo-${f.key}`} value={form[f.key] || ""} onChange={(e) => set(f.key, e.target.value)} rows={3} className="rounded-sm" />
            ) : (
              <Input data-testid={`seo-${f.key}`} value={form[f.key] || ""} onChange={(e) => set(f.key, e.target.value)} className="rounded-sm" />
            )}
            <p className="text-xs text-muted-foreground mt-1">{f.hint}</p>
          </div>
        ))}
      </div>

      <div className="mt-7 flex flex-wrap items-center gap-3">
        <button data-testid="seo-save-btn" onClick={save} disabled={saving} className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-7 py-3 rounded-sm hover:bg-[#CC0000] transition-colors disabled:opacity-60">
          {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />} {saving ? "Saving..." : "Save SEO Settings"}
        </button>
        <button data-testid="seo-ping-btn" onClick={ping} disabled={pinging} className="inline-flex items-center gap-2 border border-foreground/15 text-foreground font-semibold px-7 py-3 rounded-sm hover:border-primary hover:text-primary transition-colors disabled:opacity-60">
          {pinging ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} className="text-primary" />} {pinging ? "Submitting..." : "Submit to Google (ping sitemap)"}
        </button>
      </div>
      <p className="text-xs text-muted-foreground mt-3">Submits your sitemap.xml to search engines so new pages get discovered faster.</p>
    </div>
  );
};
