import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ArrowLeft, RefreshCw, Inbox, Mail, Phone, LogOut } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/auth/AuthContext";
import { SeoSettingsPanel } from "@/components/SeoSettingsPanel";
import { ChangePasswordPanel } from "@/components/ChangePasswordPanel";
import { PageSeoPanel } from "@/components/PageSeoPanel";
import { PopupSettingsPanel } from "@/components/PopupSettingsPanel";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export default function AdminPage() {
  const { user, token, logout } = useAuth();
  const navigate = useNavigate();
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("enquiries");
  const tabCls = (k) => `px-4 py-2.5 text-sm font-semibold -mb-px border-b-2 transition-colors whitespace-nowrap ${tab === k ? "border-primary text-primary" : "border-transparent text-foreground/60 hover:text-foreground"}`;

  useEffect(() => {
    if (user === false) navigate("/login");
  }, [user, navigate]);

  const load = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API}/enquiries`, { headers: { Authorization: `Bearer ${token}` } });
      const data = res.data;
      setEnquiries(Array.isArray(data) ? data : data?.enquiries || data?.items || []);
    } catch (e) {
      if (e.response?.status === 401) { logout(); navigate("/login"); }
      else toast.error("Failed to load enquiries.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { if (token) load(); /* eslint-disable-next-line */ }, [token]);

  const fmt = (iso) => { try { return new Date(iso).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" }); } catch { return iso; } };

  if (!user) return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Loading...</div>;

  const items = Array.isArray(enquiries) ? enquiries : [];

  return (
    <div className="min-h-screen bg-secondary">
      <header className="bg-white border-b sticky top-0 z-20">
        <div className="max-w-[1400px] mx-auto px-5 lg:px-8 h-16 flex items-center justify-between gap-4">
          <Link to="/" data-testid="admin-back-link" className="flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary transition-colors"><ArrowLeft size={18} /> Site</Link>
          <span className="font-display font-extrabold text-lg hidden sm:block">Enquiries Dashboard</span>
          <div className="flex items-center gap-4">
            <button data-testid="admin-refresh-btn" onClick={load} className="flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary transition-colors"><RefreshCw size={16} className={loading ? "animate-spin" : ""} /> Refresh</button>
            <button data-testid="admin-logout-btn" onClick={() => { logout(); navigate("/login"); }} className="flex items-center gap-2 text-sm font-semibold text-primary"><LogOut size={16} /> Logout</button>
          </div>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto px-5 lg:px-8 py-10">
        <div className="flex gap-1 mb-8 border-b border-border overflow-x-auto">
          <button data-testid="tab-enquiries" onClick={() => setTab("enquiries")} className={tabCls("enquiries")}>Enquiries</button>
          <button data-testid="tab-seo" onClick={() => setTab("seo")} className={tabCls("seo")}>SEO Settings</button>
          <button data-testid="tab-page-seo" onClick={() => setTab("page-seo")} className={tabCls("page-seo")}>Page SEO</button>
          <button data-testid="tab-popup" onClick={() => setTab("popup")} className={tabCls("popup")}>Popup</button>
          <button data-testid="tab-security" onClick={() => setTab("security")} className={tabCls("security")}>Security</button>
        </div>

        {tab === "seo" && <SeoSettingsPanel token={token} />}
        {tab === "page-seo" && <PageSeoPanel token={token} />}
        {tab === "popup" && <PopupSettingsPanel token={token} />}
        {tab === "security" && <ChangePasswordPanel token={token} />}

        {tab === "enquiries" && (<>
        <div className="grid sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white border border-border p-6"><p className="overline text-primary">Total</p><p className="font-display font-black text-4xl mt-2">{items.length}</p></div>
          <div className="bg-white border border-border p-6"><p className="overline text-primary">New</p><p className="font-display font-black text-4xl mt-2">{items.filter((e) => e.status === "new").length}</p></div>
          <div className="bg-white border border-border p-6"><p className="overline text-primary">Latest</p><p className="font-display font-bold text-lg mt-3 truncate">{items[0]?.name || "—"}</p></div>
        </div>

        <div className="bg-white border border-border">
          {loading ? (
            <div className="p-16 text-center text-muted-foreground">Loading...</div>
          ) : items.length === 0 ? (
            <div className="p-16 text-center text-muted-foreground flex flex-col items-center gap-3"><Inbox size={40} className="text-muted-foreground/40" /> No enquiries yet.</div>
          ) : (
            <Table data-testid="enquiries-table">
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead><TableHead>Name</TableHead><TableHead>Contact</TableHead><TableHead>Product</TableHead><TableHead>Qty</TableHead><TableHead>Message</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((e) => (
                  <TableRow key={e.id} data-testid={`enquiry-row-${e.id}`}>
                    <TableCell className="text-xs whitespace-nowrap text-muted-foreground">{fmt(e.created_at)}</TableCell>
                    <TableCell><div className="font-semibold">{e.name}</div>{e.company && <div className="text-xs text-muted-foreground">{e.company}</div>}</TableCell>
                    <TableCell className="text-xs"><div className="flex items-center gap-1"><Mail size={12} className="text-primary" />{e.email}</div><div className="flex items-center gap-1 mt-1"><Phone size={12} className="text-primary" />{e.phone}</div></TableCell>
                    <TableCell><Badge variant="secondary" className="rounded-sm">{e.product}</Badge></TableCell>
                    <TableCell className="text-sm">{e.quantity || "—"}</TableCell>
                    <TableCell className="max-w-xs text-xs text-muted-foreground">{e.message || "—"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
        </>)}
      </main>
    </div>
  );
}
