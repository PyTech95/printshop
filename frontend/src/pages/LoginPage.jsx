import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "sonner";
import { Lock, Loader2, ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/auth/AuthContext";

function formatErr(detail) {
  if (detail == null) return "Something went wrong.";
  if (typeof detail === "string") return detail;
  if (Array.isArray(detail)) return detail.map((e) => e?.msg || JSON.stringify(e)).join(" ");
  return String(detail);
}

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password);
      toast.success("Welcome back!");
      navigate("/admin");
    } catch (err) {
      toast.error(formatErr(err.response?.data?.detail) || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex items-center justify-center px-5 relative overflow-hidden">
      <div className="absolute inset-0 grain-overlay opacity-10 pointer-events-none" />
      <div className="relative w-full max-w-md">
        <Link to="/" className="flex items-center gap-2 text-sm text-white/50 hover:text-white mb-6"><ArrowLeft size={16} /> Back to site</Link>
        <div className="bg-white p-8 lg:p-10 border-t-4 border-primary">
          <div className="bg-white inline-block mb-6"><img src="/logo-trim.png" alt="My Labels UAE" className="h-14 w-auto" /></div>
          <h1 className="font-display font-black text-2xl text-foreground flex items-center gap-2"><Lock size={22} className="text-primary" /> Admin Login</h1>
          <p className="text-sm text-muted-foreground mt-2">Sign in to view quote enquiries.</p>
          <form onSubmit={submit} className="mt-8 space-y-4" data-testid="login-form">
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Email</label>
              <Input data-testid="login-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@mylabelsuae.com" className="rounded-sm" required />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1.5 block">Password</label>
              <Input data-testid="login-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" className="rounded-sm" required />
            </div>
            <button type="submit" data-testid="login-submit" disabled={loading} className="w-full inline-flex items-center justify-center gap-2 bg-primary text-white font-semibold px-6 py-3.5 rounded-sm hover:bg-[#CC0000] transition-colors disabled:opacity-60">
              {loading ? <Loader2 size={18} className="animate-spin" /> : null} {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
