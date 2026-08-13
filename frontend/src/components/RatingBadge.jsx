import React, { useEffect, useState } from "react";
import axios from "axios";
import { Star } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

export const RatingBadge = ({ variant = "light", className = "" }) => {
  const [s, setS] = useState(null);
  useEffect(() => {
    let active = true;
    axios
      .get(`${API}/reviews/summary`)
      .then(({ data }) => {
        if (active && data && typeof data === "object" && !Array.isArray(data)) {
          setS({ count: Number(data.count) || 0, average: Number(data.average) || 0 });
        }
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  if (!s || !s.count) return null;
  const dark = variant === "dark";

  return (
    <div data-testid="rating-badge" className={`inline-flex items-center gap-2.5 ${dark ? "text-white" : "text-foreground"} ${className}`}>
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((n) => (
          <Star key={n} size={16} className={n <= Math.round(s.average) ? "fill-primary text-primary" : dark ? "text-white/30" : "text-muted-foreground/40"} />
        ))}
      </div>
      <span className="font-display font-bold text-sm">{s.average}/5</span>
      <span className={`text-xs ${dark ? "text-white/60" : "text-muted-foreground"}`}>from {s.count}+ reviews</span>
    </div>
  );
};
