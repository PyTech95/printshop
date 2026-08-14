import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Save, Loader2, MousePointerClick } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export const PopupSettingsPanel = ({ token }) => {
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    axios
      .get(`${API}/popup`)
      .then(({ data }) => setForm(data))
      .catch(() => toast.error("Failed to load popup settings."))
      .finally(() => setLoading(false));
  }, []);

  const set = (k, v) => setForm((s) => ({ ...s, [k]: v }));

  const save = async () => {
    setSaving(true);
    try {
      const payload = { ...form, delay_seconds: Number(form.delay_seconds) || 15 };
      const { data } = await axios.put(`${API}/popup`, payload, { headers: { Authorization: `Bearer ${token}` } });
      setForm(data);
      toast.success("Popup settings saved and live.");
    } catch (e) {
      toast.error("Failed to save popup settings.");
    } finally {
      setSaving(false);
    }
  };

  if (loading || !form) return <div className="p-16 text-center text-muted-foreground">Loading popup settings...</div>;

  return (
    <div className="bg-white border border-border p-6 lg:p-8" data-testid="popup-settings-panel">
      <div className="flex items-center gap-2.5 mb-6">
        <span className="w-9 h-9 bg-primary/10 flex items-center justify-center"><MousePointerClick size={18} className="text-primary" /></span>
        <div>
          <h2 className="font-display font-bold text-xl text-foreground">Lead-Capture Popup</h2>
          <p className="text-sm text-muted-foreground">A timed popup with a short quote form. Shows once per visitor.</p>
        </div>
      </div>

      <div className="max-w-3xl grid gap-5">
        <div className="flex items-center justify-between border border-border p-4 rounded-sm">
          <div>
            <p className="font-semibold text-foreground">Enable popup</p>
            <p className="text-xs text-muted-foreground">Turn the timed lead-capture popup on or off across the site.</p>
          </div>
          <Switch data-testid="popup-enabled" checked={!!form.enabled} onCheckedChange={(v) => set("enabled", !!v)} />
        </div>

        <div className="max-w-[220px]">
          <label className="text-sm font-medium text-foreground mb-1.5 block">Show after (seconds)</label>
          <Input data-testid="popup-delay" type="number" min={1} value={form.delay_seconds} onChange={(e) => set("delay_seconds", e.target.value)} className="rounded-sm" />
          <p className="text-xs text-muted-foreground mt-1">Delay before the popup appears.</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Headline (English)</label>
            <Input data-testid="popup-headline" value={form.headline || ""} onChange={(e) => set("headline", e.target.value)} className="rounded-sm" />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Headline (Arabic)</label>
            <Input data-testid="popup-headline-ar" dir="rtl" value={form.headline_ar || ""} onChange={(e) => set("headline_ar", e.target.value)} className="rounded-sm" />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Sub-text (English)</label>
            <Textarea data-testid="popup-subtext" rows={2} value={form.subtext || ""} onChange={(e) => set("subtext", e.target.value)} className="rounded-sm" />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Sub-text (Arabic)</label>
            <Textarea data-testid="popup-subtext-ar" dir="rtl" rows={2} value={form.subtext_ar || ""} onChange={(e) => set("subtext_ar", e.target.value)} className="rounded-sm" />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Button label (English)</label>
            <Input data-testid="popup-btn" value={form.button_label || ""} onChange={(e) => set("button_label", e.target.value)} className="rounded-sm" />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1.5 block">Button label (Arabic)</label>
            <Input data-testid="popup-btn-ar" dir="rtl" value={form.button_label_ar || ""} onChange={(e) => set("button_label_ar", e.target.value)} className="rounded-sm" />
          </div>
        </div>
      </div>

      <div className="mt-7">
        <button
          data-testid="popup-save-btn"
          onClick={save}
          disabled={saving}
          className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-7 py-3 rounded-sm hover:bg-[#CC0000] transition-colors disabled:opacity-60"
        >
          {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />} {saving ? "Saving..." : "Save Popup Settings"}
        </button>
        <p className="text-xs text-muted-foreground mt-3">Tip: the popup shows once per visitor. Clear your browser's local storage to preview it again.</p>
      </div>
    </div>
  );
};
