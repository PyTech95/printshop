import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Save, Loader2, FileText } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { setPageSeoMap } from "@/hooks/useSeoSettings";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const FIELDS = [
  { key: "site_title", label: "Page Title", type: "input", hint: "Shown in the browser tab and as the search-result title." },
  { key: "meta_description", label: "Meta Description", type: "textarea", hint: "150–160 characters recommended." },
  { key: "meta_keywords", label: "Meta Keywords", type: "textarea", hint: "Comma-separated keywords for this page." },
  { key: "og_title", label: "Open Graph Title", type: "input", hint: "Title used when this page is shared on social media." },
  { key: "og_description", label: "Open Graph Description", type: "textarea", hint: "Description used on social shares." },
];

export const PageSeoPanel = ({ token }) => {
  const [pages, setPages] = useState(null);
  const [meta, setMeta] = useState([]);
  const [active, setActive] = useState("/");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    axios
      .get(`${API}/seo/pages`)
      .then(({ data }) => {
        setPages(data.pages);
        setMeta(data.meta || []);
      })
      .catch(() => toast.error("Failed to load page SEO."))
      .finally(() => setLoading(false));
  }, []);

  const set = (k, v) => setPages((p) => ({ ...p, [active]: { ...(p[active] || {}), [k]: v } }));

  const save = async () => {
    setSaving(true);
    try {
      const { data } = await axios.put(`${API}/seo/pages`, { pages }, { headers: { Authorization: `Bearer ${token}` } });
      setPages(data.pages);
      setPageSeoMap(data.pages);
      toast.success("Page SEO saved and live.");
    } catch (e) {
      toast.error("Failed to save page SEO.");
    } finally {
      setSaving(false);
    }
  };

  if (loading || !pages) return <div className="p-16 text-center text-muted-foreground">Loading page SEO...</div>;

  const cur = pages[active] || {};
  const activeName = meta.find((m) => m.path === active)?.name || active;

  return (
    <div className="bg-white border border-border p-6 lg:p-8" data-testid="page-seo-panel">
      <div className="flex items-center gap-2.5 mb-6">
        <span className="w-9 h-9 bg-primary/10 flex items-center justify-center"><FileText size={18} className="text-primary" /></span>
        <div>
          <h2 className="font-display font-bold text-xl text-foreground">Per-Page SEO</h2>
          <p className="text-sm text-muted-foreground">Set a unique title & description for each page. Changes apply live.</p>
        </div>
      </div>

      <div className="max-w-3xl">
        <div className="mb-6">
          <label className="text-sm font-medium text-foreground mb-1.5 block">Select page to edit</label>
          <Select value={active} onValueChange={setActive}>
            <SelectTrigger data-testid="page-seo-select" className="rounded-sm max-w-md">
              <SelectValue>{activeName} <span className="text-muted-foreground">({active})</span></SelectValue>
            </SelectTrigger>
            <SelectContent>
              {meta.map((m) => (
                <SelectItem key={m.path} value={m.path} data-testid={`page-opt-${m.path === "/" ? "home" : m.path.replace(/\//g, "")}`}>
                  {m.name} <span className="text-muted-foreground text-xs">{m.path}</span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-5">
          {FIELDS.map((f) => (
            <div key={f.key}>
              <label className="text-sm font-medium text-foreground mb-1.5 block">{f.label}</label>
              {f.type === "textarea" ? (
                <Textarea data-testid={`pageseo-${f.key}`} value={cur[f.key] || ""} onChange={(e) => set(f.key, e.target.value)} rows={3} className="rounded-sm" />
              ) : (
                <Input data-testid={`pageseo-${f.key}`} value={cur[f.key] || ""} onChange={(e) => set(f.key, e.target.value)} className="rounded-sm" />
              )}
              <p className="text-xs text-muted-foreground mt-1">{f.hint}</p>
            </div>
          ))}
        </div>

        <div className="mt-7">
          <button
            data-testid="page-seo-save-btn"
            onClick={save}
            disabled={saving}
            className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-7 py-3 rounded-sm hover:bg-[#CC0000] transition-colors disabled:opacity-60"
          >
            {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />} {saving ? "Saving..." : "Save Page SEO"}
          </button>
        </div>
      </div>
    </div>
  );
};
