# KINND marketing site: plan and status

Source of truth: `design/boards/*.dc.html` (desktop wins on copy). Stack: Astro 7 (static), TypeScript, plain CSS with tokens. Client JS only for: language menu (Escape/click-outside), mobile menu fallback, pricing toggle.

Repo: https://github.com/wurkagency/kinnd-web · Site: https://www.kinnd.eu

## Phase 0: check-in
- [x] Read all 14 boards, the brief and the build prompt
- [x] Charlie answered the first questions (see "Decided")
- [x] `git init`, remote `origin`

## Phase 1: scaffold and shell
- [x] Astro project, `@astrojs/sitemap` only runtime integration
- [x] Tokens (`src/styles/tokens.css`), base styles, fluid type/spacing between 390 and 1440
- [x] Self-hosted fonts (latin woff2, `font-display: swap`) + metric-matched fallbacks (no layout shift)
- [x] i18n: `src/i18n/{en,da,sv}.ts`, all copy in locale files, `/`, `/da/`, `/sv/`
- [x] `Logo` (placeholder, one component), `Header`, `Footer`, `Button`, `CtaBand`, `PageHero`, `IconTile`

## Phase 2: Home
- [x] Hero, `PhoneMockup` with callouts attached to the phone at every width
- [x] Share grid (Moments, 0 DKK, calendar, growth SVG illustration, storage), safety band
- [x] AVIF/WebP `srcset`, hero image `fetchpriority="high"`, rest lazy

## Phase 3: inner pages
- [x] Features (accordion on grey band), Pricing (toggle, plan cards, Good to know, accordion on white), Safety, FAQ, About, Legal (privacy/terms/cookies)

## Phase 4: undrawn pieces
- [x] Mobile menu: full-screen modal `<dialog>`; Escape closes, page behind is inert, scroll locked (CSS)
- [x] Language menu (`<details>`), footer language pills, both link to the same page in each locale
- [x] 404 page
- [x] Titles, descriptions, canonical, Open Graph, `hreflang` (en/da/sv/x-default), `<html lang>`, sitemap, robots.txt, favicon

## Phase 5: quality
- [x] No horizontal scroll at 320 / 390 / 768 / 1024 / 1440 on every page
- [x] Lighthouse mobile (production build): every English page 99–100 / 100 / 100 / 100. `/da/` and `/sv/` SEO is 69 on purpose (noindex until translated)
- [x] Keyboard: skip link, visible focus, menu/language menu/accordion/toggle tested

## Decided by Charlie
- 2026-10-07: Footer on every page: "WURK ApS · CVR 34378424" only.
- 2026-10-07: Yearly toggle badge "Save up to 30%"; cards keep 20% (Parents) and 30% (Family).
- 2026-10-07: Location wording on Home and Safety: "Location data is removed from the photos other people download."
- 2026-10-07: EU/GDPR wording on Home and Safety: "We follow GDPR and store data in the EU." Safety keeps `[Confirm hosting wording with counsel]`.
- 2026-10-07: Domain `https://www.kinnd.eu`. Typos fixed. Terms/Cookies use the privacy template; content comes later.

## Choices I made (please check)
- "Prices include Danish VAT. [Confirm final prices]" sits under the plan cards on Pricing at all widths, since it left the footer.
- Yearly view sub-line (not drawn): "Billed yearly. You save 20%." / "… 30%."
- Terms h1 "*Terms*", Cookies h1 "Cookie *policy*", intro lines and section headings are visible placeholders.
- 404 copy: "Page *not found*" / "The link may be old, or the page has moved." / "Go to the home page".
- Mobile menu style: white full-screen sheet, serif links, "Try for free" at the bottom.
- Danish/Swedish pages are English placeholders, `noindex`, and left out of the sitemap until translated.
- Home grid at tablet: two columns, storage card full width. Plan cards: two columns at 768–959 with Family full width, three from 960.
- Mobile "It runs on your phone" button is full width (brief rule) where the mobile board draws it auto width.

## Open items (placeholders stay visible until answered)
- [ ] Final prices (29 / 69 DKK a month, 279 / 579 a year)
- [ ] Contact email and safety email
- [ ] EU hosting / GDPR wording (counsel)
- [ ] "A person answers within 1 working day": confirm the promise
- [ ] Legal text: privacy, terms, cookies; "Last updated" date
- [ ] Final logo, favicon, social share image (`public/og-default.png` is a placeholder)
- [ ] Licence for `family-orchard.jpg`
- [ ] Danish and Swedish translations (then set `untranslated: false` and drop the sitemap filter in `astro.config.mjs`)
- [ ] Hosting target (build output is plain static files in `dist/`)
