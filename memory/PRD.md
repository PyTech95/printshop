# My Labels UAE — PRD

## Original Problem Statement
User uploaded a zip of an already-built web app ("My Labels UAE" — a UAE printing, labels & packaging company website) and asked to deploy it, then to verify admin and all flows work without errors.

## Architecture
- Frontend: React 19 + CRA/craco + Tailwind + shadcn/ui + framer-motion, i18n (EN/AR with RTL)
- Backend: FastAPI + Motor (async MongoDB)
- Auth: JWT (HS256), bcrypt password hashing, admin seeded on startup
- Email: Emergent-managed Resend proxy (enquiry notifications to sales inbox)

## User Personas
- Prospective customers in UAE (Dubai, Al Ain, Fujairah, RAK) requesting print quotes
- Admin/shop staff reviewing enquiries and managing SEO settings

## Core Requirements (static)
- Public marketing site: home, products + product detail, market areas + area detail, industries, why-us, gallery, about, FAQ, contact
- Quote/enquiry form with email notification
- Product reviews with rating summary
- Bilingual EN/AR with RTL, mobile-first responsive
- Admin dashboard: enquiries list + SEO settings
- Dynamic sitemap.xml + SEO meta management

## Implemented
- 2026-06: Restored full codebase from uploaded zip into /app; installed backend + frontend deps
- 2026-06: UI review round 1 — hero badge changed to "Dubai • Labelling Solutions" (EN/AR), removed "Quality Assured / ISO-grade output" trust stat, renamed nav "Why Us" → "Why Choose Us" (EN/AR), added AI-generated background imagery to About page Mission/Vision cards, made floating Enquire/Call buttons icon-only on mobile so they no longer cover content, deleted dead components/Hero.jsx
- 2026-06: Configured backend env (JWT_SECRET, ADMIN_EMAIL/PASSWORD, EMERGENT_EMAIL_KEY, EMAIL_FROM_NAME, SALES_EMAIL, SITE_URL)
- 2026-06: Verified admin auth, enquiries dashboard, SEO tab, reviews, sitemap, all 12 public pages, RTL toggle, mobile 390px
- 2026-06: Fixed deployment blockers: .gitignore no longer excludes .env; added skip/limit pagination to GET /api/enquiries; canonical_url now env-driven via SITE_URL
- 2026-06: Deployment readiness check PASS
- 2026-06: Fixed white-screen crash on product detail pages — `ProductReviews.jsx` called `.slice().map()` on unvalidated API data; now normalises non-array payloads and coerces summary numerics. Same guard applied to `RatingBadge.jsx`. Verified across all 10 product pages incl. mocked malformed responses.

## Test Credentials
See /app/memory/test_credentials.md — admin@mylabelsuae.com / admin123

## Backlog
- P1: Enquiry status management UI in admin (PATCH endpoint exists, no UI control)
- P1: Status enum validation on PATCH /api/enquiries/{id}
- P2: E-commerce layer from original brief (cart, artwork upload to object storage, Stripe checkout, order pipeline)
- P2: WhatsApp order/enquiry updates via Twilio
- P2: Migrate framer-motion motion() calls to motion.create()

## Image asset update (2026-06)
- Offset Printing: new hero showing box + bag + flyer + business card + brochure together, plus brochures/flyers, shopping bags, custom boxes and booklets gallery images; features updated to Business cards / Brochures & flyers / Booklets & catalogues / Shopping bags & boxes
- Custom Labels & Ribbons: new hero with many plain, printed and barcode label rolls plus branding ribbons
- Asset Tags: user-supplied real photos cleaned + enhanced (metal tag grid, angled tags, laptop machine-ID label, hand-held barcode label)
- RAK Labels: enhanced printed compliance label sheet
- All new assets on the job-0fd45bfd CDN; verified 54/54 image requests return 200

## Gallery filters, zoom & full AI imagery (2026-06)
- Added `category` (labels / packaging / apparel / largeformat) to all 10 products
- Gallery page: filter bar with live counts, animated filtered grid, EN + AR labels
- New shared `components/ImageLightbox.jsx`: tap-to-zoom lightbox with fit/zoom toggle, prev/next, keyboard (Esc + arrows), backdrop close, body-scroll lock. Used by product detail gallery (zoom button + click main image) and gallery tiles
- AI imagery generated for large format, vinyl pasting, DTF, screen printing, uniforms, promotional items, engraving and the gallery factory hero — site now runs entirely on branded imagery, no generic stock left on product pages
- Verified: 100% frontend pass, zero broken images, zero console errors across ~19 routes, desktop + mobile + Arabic RTL

## Home showreel (2026-06)
- New `components/WorkShowreel.jsx`: dark showreel section on the homepage with two opposite-direction marquee rows (20 tiles = 10 products x 2 images), grayscale-to-colour hover, pause-on-hover, and click-to-zoom via the shared ImageLightbox
- Localised EN/AR copy (showreel.overline/title/sub); verified no horizontal overflow on mobile and scroll lock released on close
- Verified: 100% frontend pass, 0 console errors, 0 failed image requests

## Image accuracy pass (2026-06)
- Fixed mismatch: Engraving Services was showing a promotional gift-set photo; now uses 3 engraving-specific realistic photos (engraved metal/wood/acrylic plates, laser engraver in action, acrylic award)
- De-duplicated apparel imagery: DTF Printing, Screen Printing and Uniform & T-Shirt Printing previously shared the same 3 rotated photos; each now has its own realistic process photos (DTF printer/films/heat press, screen press/drying rack, uniform stack/rail/embroidery close-up)
- Verified unique main + gallery images per product, 0 broken images, 0 console errors
- Added a dedicated "Engraving" gallery category (EN/AR) so engraved work is no longer grouped under Large Format

## Rack & shelf labels + uniqueness + responsive pass (2026-06)
- NEW product "Rack & Shelf Labels" (slug rack-shelf-labels, category warehouse) with 8 AI warehouse photos modelled on the client's reference shots: yellow barcoded beam labels on orange racking, colour-coded rack upright strips, hanging aisle signs, load-capacity placard, label application, macro laminate detail. Added to sitemap PRODUCT_SLUGS
- New "Warehouse" gallery filter (EN/AR). Gallery counts: All 11, Labels 3, Warehouse 1, Packaging 2, Apparel 3, Large Format 1, Engraving 1
- Zero duplicate images across products: RAK Labels got its own 3 photos (applied packaging, QC bench, die-cut rewinder), Promotional Items got a merch close-up, and About / Contact / Why-Choose-Us / Products each got distinct hero photos
- Fixed mobile horizontal overflow: grid children (product gallery + thumbnail strip + reviews grid/form) lacked min-w-0, so the thumb strip forced the page wider than the viewport at 320-360px
- Verified: 0 overflow across 21 routes x 4 viewports (320/390/768/1024), backend 20/20, frontend 100%

## Reference-matched imagery: workwear, totes, screen-printed packaging (2026-06)
- Hi-vis safety vests (front/back mockup + worn on site) added to Uniform & T-Shirt Printing; feature list now includes "Hi-vis safety vests"
- Printed canvas tote bags (studio pair + workshop stack) added to Promotional Items; feature list now includes "Canvas tote bags"
- Screen Printing repositioned beyond garments to cover packaging, matching client references: single-colour printed kraft mailer boxes, red line-art canvas totes, trio of printed totes, open mailer with interior print, screen printing a kraft box on press. 8-image gallery; copy, features (Kraft box branding / Canvas tote printing / Garments & uniforms / Single or multi-colour) and use cases rewritten in EN + AR
- Image uniqueness maintained: 0 duplicates across all 11 products

## Removed duplicate "RAK Labels" product (2026-06)
- Client flagged that "RAK Labels" and "Rack & Shelf Labels" read as the same thing. Removed the RAK Labels product and merged its 3 photos (labels applied to jar/bottle/tube/tin, QC bench, die-cut rewinder) into Custom Labels & Ribbons, whose main image is now the labelled retail packaging shot
- Rack & Shelf Labels left untouched. Catalogue now 10 products; rak-labels removed from sitemap PRODUCT_SLUGS and from the homepage/why-us marquee lists
- Note: "RAK labels" intentionally retained in SEO meta keywords/description only, since Ras Al Khaimah remains a served market area (see /market-areas). It is no longer a product.

## Showreel simplified to one row (2026-06)
- Client flagged repeated product names in the showreel. Rewrote WorkShowreel.jsx from two opposite-direction rows (20 tiles, each product twice) to a SINGLE moving row with one tile per product = 10 unique names, one unique image each
- Testid pattern changed to showreel-item-{index} (0-9); lightbox counter now N/10; larger tiles (380px desktop) for better impact

## Deployment restore & readiness (2026-06)
- Restored full "My Labels UAE" codebase from uploaded zip (UAE-print2-main) into /app; preserved .git and .emergent
- Recreated backend/.env (gitignored in zip): MONGO_URL, DB_NAME, CORS_ORIGINS, JWT_SECRET, ADMIN_EMAIL/PASSWORD, EMAIL_FROM_NAME, SALES_EMAIL, SITE_URL
- Added missing httpx dep to requirements.txt (server.py imports it); installed frontend deps
- Removed `.env` / `.env.*` / `*.env` from root .gitignore so .env files are tracked (Emergent deploy requirement)
- deployment_agent readiness check: PASS (no blockers)
- Smoke-tested on preview: homepage render, admin login (JWT), enquiry create, protected enquiries list, reviews summary, sitemap.xml — all green
- NOTE: EMERGENT_EMAIL_KEY not set → enquiry email notifications to sales inbox are skipped (non-blocking; enquiries still save + show in admin). Set the email key if live notifications are needed.

## Bug fix: blank product detail pages (2026-06)
- Symptom: /products/<slug> deep links (e.g. custom-labels-ribbons) rendered a blank white page ("internal page not open"); reported on production (mylabelsuae.com), reproduced on preview
- Root cause: `products` array in data/products.js was sparse (stray commas created undefined holes). Array.find in productBySlug visited holes as undefined → "Cannot read properties of undefined (reading 'slug')". Listing pages worked because map/filter skip holes; find does not
- Fix: removed all stray commas (10 clean product objects, order unchanged) + defensive `p && p.slug === slug` guard in productBySlug. Fixed inflated Gallery "All" count as side effect
- Also (prior turn): reordered homepage + Why-Choose-Us marquees to match catalogue order and added missing Engraving Services
- Verified by testing_agent iteration_16: 100% frontend pass, all 10 detail pages render, 0 runtime/console errors
- NOTE: fix is in PREVIEW only — user must REDEPLOY to push to production (mylabelsuae.com / print-shop-test.emergent.host)

## Admin password change (2026-06)
- Set admin password to mylabels@1425 (email admin@mylabelsuae.com) via ADMIN_PASSWORD in backend/.env
- Added POST /api/auth/change-password (authenticated): verifies current password, requires >=6 chars, rejects same-as-current, updates bcrypt hash and sets password_changed:true
- Made seed_admin idempotent: it only syncs the .env password while password_changed is falsy, so an in-app password change now survives backend restarts/redeploys
- Added Admin dashboard "Security" tab -> components/ChangePasswordPanel.jsx (current/new/confirm fields, client-side match + length checks, sonner toasts)
- Verified: backend via curl (wrong pw 400, change ok, login with new pw ok, reverted) + testing_agent iteration_17 (100% frontend pass, password left as mylabels@1425)
- NOTE: changes are in PREVIEW only — user must REDEPLOY to apply on production (mylabelsuae.com). On first deploy the live DB admin will sync to mylabels@1425 automatically.

## Full SEO + timed lead popup (2026-06)
- Backend: GET/PUT /api/seo/pages (per-page SEO for 9 pages: Home, Products, Industries, Why Choose Us, Gallery, About, FAQ, Contact, Market Areas — each with title, meta description, keywords, OG title/description; sensible UAE defaults). GET/PUT /api/popup (enabled, delay_seconds, EN+AR headline/subtext/button). PUT routes auth-protected.
- Admin: new "Page SEO" tab (per-page editor with page selector) and "Popup" tab (toggle/delay/EN+AR text). Tab bar made horizontally scrollable for mobile. Existing global SEO + Security tabs retained.
- Frontend: useSeoSettings.js refactored to a single applyResolved() resolver — priority dynamic(usePageSeo) > per-page managed(useManagedPageSeo) > global defaults. Fixed a race where global defaults overwrote per-page titles. setPageSeoMap() invalidates the cache after admin saves so changes reflect without reload. Layout applies per-page SEO centrally by pathname.
- LeadPopup.jsx: timed lead-capture popup (name/phone/email) mounted in Layout, shows after admin-configured delay (default 15s), once per visitor (localStorage ml_lead_popup_seen), radix Dialog close (X), bilingual EN/AR, responsive (w-[calc(100%-2rem)] max-w-md). Submits to /api/enquiries with product "Website Popup Enquiry".
- Verified: iteration_18 (backend 7/7, popup+admin pass) and iteration_19 (per-page SEO fix retest: 9/9 unique titles + descriptions, SPA live update, product dynamic precedence, popup regression) — 100% frontend.
- NOTE: preview only — REDEPLOY to push to production (mylabelsuae.com).
