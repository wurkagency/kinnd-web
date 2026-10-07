# KINND marketing site: plan

Source of truth: `design/boards/*.dc.html` (desktop wins on copy). Stack: Astro (static), TypeScript, plain CSS with tokens, no client JS except menu, language list, accordion enhancement and pricing toggle.

## Phase 0: check-in (now)
- [x] Read all 14 boards, the brief and the build prompt
- [ ] Charlie answers the questions at the bottom of this file
- [ ] `git init` and first commit (repo is not under git yet)

## Phase 1: scaffold and shell
- [ ] Astro project (`npm create astro`, minimal template, strict TS), `@astrojs/sitemap` only
- [ ] `src/styles/tokens.css` (colours, radii, spacing, type scale with `clamp()` between 390 and 1440 values) and `base.css` (reset, focus ring, skip link, reduced motion)
- [ ] Self-host Albert Sans 400/500/600/700 and Instrument Serif regular/italic as woff2 (latin subset), `font-display: swap`, preload the two above-the-fold files
- [ ] i18n: `src/i18n/en.ts`, `da.ts`, `sv.ts` (da/sv = English copy with `UNTRANSLATED` flag), `t()` helper, routes `/`, `/da/`, `/sv/`
- [ ] Components: `Logo` (placeholder, swappable), `Header`, `Footer`, `Button` (variants: forest/mint, lilac/lilac-edge, white/line-strong), `CtaBand`
- [ ] Proof: Home shell at 390 and 1440 next to the boards

## Phase 2: Home
- [ ] `PageHero` / home hero panel: greyscale photo + forest gradient (90° desktop, 180° mobile), h1, sub-line, CTA, plum handover card
- [ ] `PhoneMockup` with Today screenshot and real `aria-label`; phone runs off the bottom of the panel
- [ ] Four numbered callouts positioned relative to the phone (one coordinate system, scaled per breakpoint, clipped so no horizontal scroll)
- [ ] "Share with co-parents & family" grid: canal Moments card, 0 DKK card, calendar card, growth card (inline SVG, illustration), storage card
- [ ] Safety band with four `IconTile` rows, link to `/safety`
- [ ] Images: AVIF/WebP via `astro:assets` `<Picture>`, responsive `srcset`, hero `fetchpriority="high"`, rest lazy
- [ ] Proof: 390 / 768 / 1024 / 1440 + Lighthouse mobile

## Phase 3: inner pages
- [ ] Features: intro, three highlight cards, `Accordion` on grey band (open item = white card), "It runs on your phone" with three tiles, CtaBand
- [ ] Pricing: Monthly/Yearly toggle, three `PlanCard`s, "Good to know" (also on mobile), `Accordion` on white (open item = grey panel), CtaBand without "See pricing"
- [ ] Safety: six promise cards, "Behind the scenes" band, privacy notice callout, CtaBand
- [ ] FAQ: four grouped cards (two columns from ~1000px, one below), "Did not find your answer?" callout, CtaBand
- [ ] About: story (photo + text), "What we believe", three contact cards, CtaBand
- [ ] Legal: tab row (links, `aria-current`, not ARIA tabs since they are separate pages), "On this page" nav, numbered sections with placeholders; `/legal/privacy`, `/legal/terms`, `/legal/cookies`
- [ ] Proof: every page at 390 / 768 / 1024 / 1440 + Lighthouse

## Phase 4: undrawn pieces
- [ ] `MobileMenu` (<768px): full-screen sheet in forest, links + "Try for free"; focus trap, Escape, scroll lock; works as a plain link list without JS
- [ ] Language menu: button with code + chevron, small list (EN/DA/SV) linking to the same page in each locale; footer pill switcher as drawn
- [ ] 404 page in the page-hero style with a link home
- [ ] SEO: per-page title + description, Open Graph, canonical, `hreflang` (en, da, sv, x-default), `<html lang>`, `sitemap.xml`, `robots.txt`, favicon (placeholder from logo dots)

## Phase 5: quality pass
- [ ] axe + manual keyboard pass, contrast check on every text/background pair (forest-muted on forest, white on orange tiles, etc.)
- [ ] 320px check on every page, no horizontal scroll
- [ ] Lighthouse 95+ on all four categories, mobile, every page
- [ ] Open items list updated for Charlie

## Decided by Charlie (2026-10-07)
- Footer on every page: "WURK ApS · CVR 34378424" only (no address, no VAT line).
- Yearly toggle badge: "Save up to 30%"; cards keep 20% (Parents) and 30% (Family).
- Location wording on Home and Safety: "Location data is removed from the photos other people download."
- EU/GDPR wording on Home and Safety: "We follow GDPR and store data in the EU." Keep the `[Confirm hosting wording with counsel]` note on Safety.
- Follow-up from footer choice: VAT is no longer in the footer, so I plan to show "Prices include Danish VAT." under the plans on Pricing at all widths (it is on the mobile board).

## Things I noticed in the boards (decisions for Charlie)
1. **Pricing badge**: toggle says "Save 20%", Parents says 20%, Family says 30%. Brief also says 20% / 30%. Suggest badge "Save up to 30%", or one number. Yearly prices on board: 279 and 579 DKK; brief says 278.40 and 579.60.
2. **Family badge** on board is "Most room" (brief said "most popular"). I will use "Most room".
3. **Footer company line**: Features, Pricing, Safety and Home-mobile show "WURK ApS · CVR 34378424"; Home, FAQ, About, Legal show placeholders plus "Prices include Danish VAT". Suggest on every page: "WURK ApS · CVR 34378424 · Skoleholdervej 91, 2400 Copenhagen" left, "Prices include Danish VAT" right.
4. **EU/GDPR wording differs**: Home says "Full GDPR compliant and our data is only stored in EU." Safety says "We follow GDPR and store data in the EU." The Home line is a stronger claim. Suggest using the Safety wording on both until counsel confirms.
5. **Location wording**: Home "GPS data is removed from photos" vs Safety "Location data is removed from the photos other people download." Which is true?
6. **Copy typos on boards** I'd like to fix (only with your OK): FAQ "their  children" (double space), "Your data = your choice." (keep?), About "within 1 working days" → "within 1 working day"?
7. **Pricing mobile** has an extra line "Prices include Danish VAT. [Confirm final prices]" under the plans. Keep it on both widths, or drop it since the footer says it?
8. **Home safety band heading** wraps with a forced `<br>` on desktop only. I'll keep the break at desktop widths and let it flow on mobile, as drawn.
9. Home "Share with co-parents & family" cards don't link to Features (brief wanted that). Board wins: no links, unless you want them.

## Open items (placeholders stay visible until answered)
- [ ] Final prices and yearly discount (see 1)
- [ ] Contact email and safety email
- [ ] Footer company line (see 3)
- [ ] EU hosting / GDPR wording, two `[Confirm …]` notes on Safety (counsel)
- [ ] Location wording (see 5)
- [ ] "within 1 working days" promise and grammar
- [ ] Legal text: privacy, terms, cookies (headings for terms/cookies also missing: I'll reuse the privacy structure with `[Text from counsel]` unless you send headings)
- [ ] Final logo, favicon, social share image
- [ ] Licence for `family-orchard.jpg`
- [ ] Danish and Swedish translations
- [ ] Domain (`kinnd.eu`?) and hosting target (affects `site` in config, sitemap, canonical URLs)
