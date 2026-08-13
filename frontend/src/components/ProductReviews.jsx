import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Star, Loader2, BadgeCheck } from "lucide-react";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const Stars = ({ value, size = 16, onSelect }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((n) => (
      <button
        key={n}
        type="button"
        disabled={!onSelect}
        onClick={onSelect ? () => onSelect(n) : undefined}
        className={onSelect ? "cursor-pointer" : "cursor-default"}
        aria-label={`${n} star`}
      >
        <Star size={size} className={n <= Math.round(value) ? "fill-primary text-primary" : "text-muted-foreground/40"} />
      </button>
    ))}
  </div>
);

export const ProductReviews = ({ product, onSummary }) => {
  const [reviews, setReviews] = useState([]);
  const [summary, setSummary] = useState({ count: 0, average: 0 });
  const [form, setForm] = useState({ name: "", rating: 5, comment: "", order_ref: "" });
  const [submitting, setSubmitting] = useState(false);

  const load = useCallback(async () => {
    try {
      const [r, s] = await Promise.all([
        axios.get(`${API}/reviews`, { params: { product_slug: product.slug } }),
        axios.get(`${API}/reviews/summary`, { params: { product_slug: product.slug } }),
      ]);
      const list = Array.isArray(r.data) ? r.data : r.data?.reviews || r.data?.items || [];
      setReviews(list);
      const sum = s.data && typeof s.data === "object" && !Array.isArray(s.data) ? s.data : {};
      setSummary({ count: Number(sum.count) || 0, average: Number(sum.average) || 0 });
      if (onSummary) onSummary({ count: Number(sum.count) || 0, average: Number(sum.average) || 0 });
    } catch (e) {
      setReviews([]);
      setSummary({ count: 0, average: 0 });
    }
  }, [product.slug, onSummary]);

  useEffect(() => {
    load();
  }, [load]);

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      toast.error("Please enter your name.");
      return;
    }
    setSubmitting(true);
    try {
      await axios.post(`${API}/reviews`, { product_slug: product.slug, name: form.name, rating: form.rating, comment: form.comment, order_ref: form.order_ref });
      toast.success("Thanks! Your review has been posted.");
      setForm({ name: "", rating: 5, comment: "", order_ref: "" });
      load();
    } catch (e) {
      toast.error("Could not submit review.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="py-16 lg:py-20 bg-secondary" data-testid="product-reviews">
      <div className="max-w-[1400px] mx-auto px-5 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <span className="overline text-primary">Reviews</span>
            <h2 className="font-display font-black text-2xl lg:text-3xl tracking-tight text-foreground mt-3">What customers say</h2>
          </div>
          {summary.count > 0 && (
            <div className="flex items-center gap-3" data-testid="reviews-summary">
              <Stars value={summary.average} size={20} />
              <span className="font-display font-bold text-xl text-foreground">{summary.average}</span>
              <span className="text-sm text-muted-foreground">({summary.count} reviews)</span>
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-5 gap-8 items-start [&>*]:min-w-0">
          <div className="lg:col-span-3 grid sm:grid-cols-2 gap-4 min-w-0 [&>*]:min-w-0">
            {reviews.slice(0, 6).map((rv) => (
              <div key={rv.id} className="bg-white border border-border p-5 min-w-0" data-testid="review-item">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <p className="font-display font-bold text-foreground truncate">{rv.name}</p>
                    {rv.verified && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full shrink-0" data-testid="verified-badge">
                        <BadgeCheck size={12} /> Verified
                      </span>
                    )}
                  </div>
                  <Stars value={rv.rating} />
                </div>
                {rv.comment && <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{rv.comment}</p>}
              </div>
            ))}
            {reviews.length === 0 && <p className="text-muted-foreground">Be the first to review {product.name}.</p>}
          </div>

          <form onSubmit={submit} className="lg:col-span-2 bg-white border border-border p-6 min-w-0" data-testid="review-form">
            <h3 className="font-display font-bold text-lg text-foreground">Leave a review</h3>
            <div className="mt-4">
              <label className="text-sm font-medium text-foreground">Your rating</label>
              <div className="mt-1.5">
                <Stars value={form.rating} size={24} onSelect={(n) => setForm((f) => ({ ...f, rating: n }))} />
              </div>
            </div>
            <input data-testid="review-name" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="Your name" className="mt-4 w-full border border-border px-3 py-2.5 text-sm rounded-sm focus:outline-none focus:border-primary" />
            <input data-testid="review-order" value={form.order_ref} onChange={(e) => setForm((f) => ({ ...f, order_ref: e.target.value }))} placeholder="Order reference (optional — marks you as a verified buyer)" className="mt-3 w-full border border-border px-3 py-2.5 text-sm rounded-sm focus:outline-none focus:border-primary" />
            <textarea data-testid="review-comment" value={form.comment} onChange={(e) => setForm((f) => ({ ...f, comment: e.target.value }))} rows={3} placeholder="Share your experience (optional)" className="mt-3 w-full border border-border px-3 py-2.5 text-sm rounded-sm focus:outline-none focus:border-primary resize-none" />
            <button data-testid="review-submit" disabled={submitting} className="mt-4 inline-flex items-center gap-2 bg-primary text-white font-semibold px-6 py-3 rounded-sm hover:bg-[#CC0000] transition-colors disabled:opacity-60">
              {submitting ? <Loader2 size={16} className="animate-spin" /> : <Star size={16} />} Submit review
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
