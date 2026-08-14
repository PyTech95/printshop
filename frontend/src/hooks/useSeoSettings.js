import { useEffect } from "react";
import axios from "axios";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

let defaults = null;
let pageActive = false;

function setMeta(attr, key, content) {
  if (content == null || content === "") return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setCanonical(url) {
  if (!url) return;
  let link = document.head.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement("link");
    link.rel = "canonical";
    document.head.appendChild(link);
  }
  link.href = url;
}

function setJsonLd(list) {
  document.querySelectorAll('script[data-page-jsonld]').forEach((el) => el.remove());
  (list || []).forEach((obj) => {
    const s = document.createElement("script");
    s.type = "application/ld+json";
    s.setAttribute("data-page-jsonld", "1");
    s.text = JSON.stringify(obj);
    document.head.appendChild(s);
  });
}

export const applySeo = (s) => {
  if (!s) return;
  if (s.site_title) document.title = s.site_title;
  setMeta("name", "description", s.meta_description);
  setMeta("name", "keywords", s.meta_keywords);
  setMeta("property", "og:title", s.og_title || s.site_title);
  setMeta("property", "og:description", s.og_description || s.meta_description);
  setMeta("property", "og:type", "website");
  if (s.og_image) setMeta("property", "og:image", s.og_image);
  setMeta("name", "twitter:card", "summary_large_image");
  setMeta("name", "twitter:title", s.og_title || s.site_title);
  setMeta("name", "twitter:description", s.og_description || s.meta_description);
  setCanonical(s.canonical_url);
};

// Per-page SEO applied centrally from admin-managed settings, keyed by exact pathname.
let pageSeoMap = null;
let pageSeoPromise = null;
let managedPath = null; // current static route path being managed centrally

// Single source of truth for what SEO is shown, resolved from current state.
// Priority: dynamic page (pageActive) > per-page managed entry > site defaults.
const applyResolved = () => {
  if (pageActive) return; // dynamic detail pages control their own SEO
  const entry = managedPath && pageSeoMap ? pageSeoMap[managedPath] : null;
  if (entry) {
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    applySeo({ ...(defaults || {}), ...entry, canonical_url: `${origin}${managedPath}` });
  } else if (defaults) {
    applySeo(defaults);
  }
};

export const setDefaults = (s) => {
  defaults = s;
  applyResolved();
};

const loadDefaults = async () => {
  if (defaults) {
    applyResolved();
    return defaults;
  }
  try {
    const { data } = await axios.get(`${API}/seo`);
    defaults = data;
    applyResolved();
  } catch (e) {
    /* ignore */
  }
  return defaults;
};

// Site-wide default SEO loader (mounted once in Layout)
export const useSeoSettings = () => {
  useEffect(() => {
    loadDefaults();
  }, []);
};

const loadPageSeoMap = async () => {
  if (pageSeoMap) return pageSeoMap;
  if (!pageSeoPromise) {
    pageSeoPromise = axios
      .get(`${API}/seo/pages`)
      .then(({ data }) => {
        pageSeoMap = data.pages || {};
        return pageSeoMap;
      })
      .catch(() => {
        pageSeoMap = {};
        return pageSeoMap;
      });
  }
  return pageSeoPromise;
};

// Refresh the cached per-page SEO map (called after admin saves so the SPA
// reflects changes without a full reload).
export const setPageSeoMap = (map) => {
  pageSeoMap = map || {};
  applyResolved();
};

// Applies admin-managed SEO for static routes. Dynamic pages (product/area detail)
// keep using usePageSeo directly, which takes precedence via the pageActive flag.
export const useManagedPageSeo = (pathname) => {
  useEffect(() => {
    managedPath = pathname;
    applyResolved(); // apply immediately if caches are already warm
    loadPageSeoMap().then(() => applyResolved());
  }, [pathname]);
};

// Per-page SEO override for dynamic pages (falls back to site defaults for missing fields)
export const usePageSeo = (seo) => {
  const key = JSON.stringify(seo || {});
  useEffect(() => {
    if (!seo) return undefined;
    pageActive = true;
    applySeo({ ...(defaults || {}), ...seo });
    setJsonLd(seo.jsonLd || []);
    if (!defaults) {
      loadDefaults().then(() => {
        if (pageActive) applySeo({ ...(defaults || {}), ...seo });
      });
    }
    return () => {
      pageActive = false;
      setJsonLd([]);
      applyResolved();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
};
