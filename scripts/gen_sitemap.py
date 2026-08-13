#!/usr/bin/env python3
"""Generate sitemap.xml including all product and per-area location pages."""
import re

BASE = "https://emirates-prints.preview.emergentagent.com"

PRODUCTS = [
    "custom-labels-ribbons", "asset-tags", "offset-printing", "large-format-vinyl",
    "rak-labels", "dtf-printing", "screen-printing", "uniform-tshirt-printing",
    "promotional-items", "engraving-services",
]

MARKET_AREAS = {
    "dubai": ["Business Bay", "Dubai Marina", "JLT (Jumeirah Lake Towers)", "Downtown Dubai", "Dubai Internet City", "Dubai Media City", "Al Quoz", "Deira", "Bur Dubai", "Jebel Ali", "Dubai Silicon Oasis", "DIFC"],
    "al-ain": ["Al Ain City Centre", "Central District", "Al Jimi", "Al Mutaredh", "Al Muwaiji", "Al Markhaniya", "Al Khalidiya", "Al Foah", "Sanaiya (Industrial Area)", "Zakher", "Al Ain Industrial Area"],
    "fujairah": ["Fujairah City", "Hamad Bin Abdullah Road", "Al Faseel", "Al Ghurfa", "Al Hayl", "Sakamkam", "Madhab", "Fujairah Industrial Area", "Fujairah Free Zone", "Dibba Al-Fujairah", "Mirbah", "Qidfa", "Al Aqah"],
    "ras-al-khaimah": ["RAK City / Al Nakheel", "Al Qasimia", "Al Mairid", "Al Dhait", "Al Mamourah", "Al Seer", "Al Rams", "Khuzam", "Al Hamra Village", "Mina Al Arab", "Al Marjan Island", "RAKEZ (Economic Zone)", "Al Ghail Industrial Area", "Al Jazeera Al Hamra", "Al Hulaila"],
}

STATIC = [
    ("/", "weekly", "1.0"),
    ("/products", "weekly", "0.9"),
    ("/market-areas", "monthly", "0.9"),
    ("/industries", "monthly", "0.6"),
    ("/why-choose-us", "monthly", "0.6"),
    ("/gallery", "monthly", "0.6"),
    ("/about", "monthly", "0.6"),
    ("/faq", "monthly", "0.5"),
    ("/contact", "monthly", "0.7"),
]


def slugify(s):
    return re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")


def url(loc, changefreq=None, priority=None):
    parts = [f"<loc>{BASE}{loc}</loc>"]
    if changefreq:
        parts.append(f"<changefreq>{changefreq}</changefreq>")
    if priority:
        parts.append(f"<priority>{priority}</priority>")
    return "  <url>" + "".join(parts) + "</url>"


def main():
    lines = ['<?xml version="1.0" encoding="UTF-8"?>',
             '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
    for loc, cf, pr in STATIC:
        lines.append(url(loc, cf, pr))
    for p in PRODUCTS:
        lines.append(url(f"/products/{p}", "monthly", "0.8"))
    for region, areas in MARKET_AREAS.items():
        lines.append(url(f"/market-areas/{region}", "monthly", "0.9"))
        for a in areas:
            lines.append(url(f"/market-areas/{region}/{slugify(a)}", "monthly", "0.7"))
    lines.append("</urlset>")
    out = "\n".join(lines) + "\n"
    with open("/app/frontend/public/sitemap.xml", "w") as f:
        f.write(out)
    total = len(STATIC) + len(PRODUCTS) + sum(1 + len(a) for a in MARKET_AREAS.values())
    print(f"Wrote sitemap.xml with {total} URLs")


if __name__ == "__main__":
    main()
