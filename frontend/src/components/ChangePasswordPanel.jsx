import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { KeyRound, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export const ChangePasswordPanel = ({ token }) => {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (next !== confirm) {
      toast.error("New passwords do not match.");
      return;
    }
    if (next.length < 6) {
      toast.error("New password must be at least 6 characters.");
      return;
    }
    setLoading(true);
    try {
      await axios.post(
        `${API}/auth/change-password`,
        { current_password: current, new_password: next },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Password updated successfully.");
      setCurrent("");
      setNext("");
      setConfirm("");
    } catch (err) {
      const d = err.response?.data?.detail;
      toast.error(typeof d === "string" ? d : "Failed to update password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md bg-white border border-border p-6 lg:p-8" data-testid="change-password-panel">
      <h2 className="font-display font-bold text-xl flex items-center gap-2">
        <KeyRound size={20} className="text-primary" /> Change Password
      </h2>
      <p className="text-sm text-muted-foreground mt-1">Update the password you use to sign in to the admin dashboard.</p>
      <form onSubmit={submit} className="mt-6 space-y-4" data-testid="change-password-form">
        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">Current password</label>
          <Input data-testid="cp-current" type="password" value={current} onChange={(e) => setCurrent(e.target.value)} placeholder="••••••••" className="rounded-sm" required />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">New password</label>
          <Input data-testid="cp-new" type="password" value={next} onChange={(e) => setNext(e.target.value)} placeholder="At least 6 characters" className="rounded-sm" required />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground mb-1.5 block">Confirm new password</label>
          <Input data-testid="cp-confirm" type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} placeholder="Re-enter new password" className="rounded-sm" required />
        </div>
        <button
          type="submit"
          data-testid="cp-submit"
          disabled={loading}
          className="inline-flex items-center justify-center gap-2 bg-primary text-white font-semibold px-6 py-3 rounded-sm hover:bg-[#CC0000] transition-colors disabled:opacity-60"
        >
          {loading ? <Loader2 size={18} className="animate-spin" /> : null} {loading ? "Updating..." : "Update Password"}
        </button>
      </form>
    </div>
  );
};
