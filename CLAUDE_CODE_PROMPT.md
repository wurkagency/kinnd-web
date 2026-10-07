# Build the KINND marketing website

You are building the public marketing website for **KINND**, a private app where parents and the family around a child share calendar, moments, lists and more. The app itself lives at `https://app.kinnd.eu` and is a separate project. This repository is only the marketing site (planned domain `kinnd.eu`; confirm with Charlie).

The design is finished and approved. Your job is to turn it into a real, fast, accessible, responsive website. Do not redesign it.

## 1. Sources of truth

Everything you need is in `design/`:

| Path | What it is |
|---|---|
| `design/boards/*.dc.html` | One file per approved screen. Plain HTML with inline styles. Read them as the exact spec for layout, spacing, colour, type and copy. |
| `design/boards/canvas.json` | Board list with titles and sizes. |
| `design/assets/` | The three images the boards use. |

Boards come in pairs, desktop (1440 wide) and mobile (390 wide):

| Page | Desktop board | Mobile board | Route |
|---|---|---|---|
| Home | `Home-v2.dc.html` | `Home-mobile.dc.html` | `/` |
| Features | `Features.dc.html` | `Features-mobile.dc.html` | `/features` |
| Pricing | `Pricing.dc.html` | `Pricing-mobile.dc.html` | `/pricing` |
| Safety & privacy | `Safety.dc.html` | `Safety-mobile.dc.html` | `/safety` |
| FAQ | `FAQ.dc.html` | `FAQ-mobile.dc.html` | `/faq` |
| About & contact | `About.dc.html` | `About-mobile.dc.html` | `/about` |
| Legal | `Legal.dc.html` | `Legal-mobile.dc.html` | `/legal/privacy`, `/legal/terms`, `/legal/cookies` |

How to read a board file: ignore the wrapper (`<x-dc>`, `<helmet>`, `support.js`, the `text/x-dc` script). The design is the single root `<div>` inside `<x-dc>`. Image URLs of the form `/_blob/<id>` map to local files:

| Blob id | Local file | Used for |
|---|---|---|
| `974df86bfbda66bed7e367169a7b1724` | `design/assets/family-orchard.jpg` | Hero background, Features highlight card, About story (always greyscale under a forest tint) |
| `896e970f37015370da53cc8844335171` | `design/assets/today-screen-blurred.png` | App screenshot inside the phone mockup |
| `791c98501dab1bc81ec983cb1e58a5a9` | `design/assets/moment-canal.webp` | "Canal tour" Moments card on Home |

**When desktop and mobile disagree on copy, desktop wins.** Charlie edits desktop first. Known gaps on the mobile boards that you should fill from desktop: the Pricing "Good to know" section, and the footer company line.

Some boards carry fixed pixel `width`/`height` values on a few elements (left over from visual editing). Treat them as hints, not rules. Build fluid layouts.

## 2. Stack

Use **Astro** with plain CSS (CSS custom properties for tokens, no CSS framework), TypeScript, and zero client JavaScript except the small pieces in section 6. Output must be fully static. If you have a strong reason to choose something else, stop and ask Charlie before scaffolding.

- Shared components: `Header`, `MobileMenu`, `Footer`, `Button`, `CtaBand`, `Accordion`, `IconTile`, `PlanCard`, `PhoneMockup`, `PageHero`.
- Self-host the fonts (Albert Sans 400/500/600/700 and Instrument Serif regular/italic) with `font-display: swap`. Do not load from Google at runtime.
- Images: convert to AVIF/WebP with responsive `srcset`; lazy-load everything below the fold; the hero image is priority.

## 3. Design tokens

Define these once as CSS variables and use them everywhere.

| Token | Value |
|---|---|
| `--bg` | `#F5F3EE` |
| `--surface` | `#FFFFFF` |
| `--ink` | `#142019` |
| `--muted` | `#5D615B` |
| `--line` | `#E2DFD7` |
| `--line-strong` | `#BDB8AE` |
| `--forest` | `#0F3D35` |
| `--forest-muted` | `#9DB3AC` |
| `--mint` | `#A9E5A0` |
| `--lilac` | `#D8C4F3` |
| `--lilac-edge` | `#B79CE0` |
| `--plum` | `#4A1D2B` |
| `--orange` | `#F39A5C` |
| `--yellow` | `#F6E2A3` |
| `--sky` | `#AEE4EA` |

Type: body is Albert Sans; display headings are Instrument Serif, weight 400. Each display heading has exactly one italic word or phrase, as drawn. Radii: cards 20px, large bands 24 to 28px, buttons and icon tiles 12px, pills fully round. Buttons are flat rectangles with a solid coloured bottom edge (`box-shadow: 0 4px 0 <edge colour>`), never a blurred shadow. Minimum touch target is 44px.

## 4. Responsive rules

The boards define two points: 390 and 1440. You fill in the rest.

- Mobile first. Content max-width 1240px, side padding 16px on mobile and 32px from tablet up.
- Up to about 767px: the mobile boards. One column, full-width buttons, header with logo, language selector and menu button.
- 768px and up: the desktop header with inline nav. Card grids go to two columns at tablet and to the drawn column count at desktop. Use `auto-fit` grids where the boards do.
- Home hero: text column and phone sit side by side on desktop and stack on mobile, with the phone running off the bottom edge of the panel in both. The four numbered callouts are positioned relative to the phone; keep them attached to it at every width and never let them cause horizontal scroll.
- No horizontal scrolling at any width from 320px up.

There is no tablet board. Use your judgement between the two drawn widths and show Charlie screenshots at 768 and 1024.

## 5. Not drawn, but required

- **Open mobile menu.** Full-screen or sheet menu with Features, Pricing, Safety, FAQ, About & contact, and the "Try for free" button. Match the existing style. Focus trap, Escape closes, body scroll locked.
- **Terms and Cookies pages.** Same template as the privacy notice board; the tab row switches between the three.
- **404 page.** Simple, in the same style, with a link home.
- **Language menu.** The header shows the current language code with a chevron (EN, DA, SV). Clicking opens a small list.

## 6. Behaviour

- **Accordion** (Features "Main features, explained" and Pricing "Questions about paying"): one column, first item open by default, one open at a time. Use real `<button aria-expanded>` controls or `<details>`; it must work without JavaScript. Open item style differs by background: on the grey band the open item is a white card; on white the open item is a grey panel. The Features board shows only the first answer. The other seven answers are in section 9 below.
- **Pricing toggle** (Monthly / Yearly): switches the prices shown on the Parents and Family cards. Monthly is the default.
- **Header nav** marks the current page (underline, weight 600, `aria-current="page"`).
- **Buttons** "Try for free" and "Start free for 30 days" link to `https://app.kinnd.eu`. "Start with Free" too.
- **Mail links** use real `mailto:` addresses once Charlie supplies them.
- No cookie banner unless you add something that needs consent. Do not add analytics or third-party scripts without asking.

## 7. Languages

Three locales: English (default, `/`), Danish (`/da/`), Swedish (`/sv/`). Put every string in locale files from the start; no copy hard-coded in components. Only English copy exists. Create the Danish and Swedish files with the English text as a placeholder and mark them clearly as untranslated; do not machine-translate and ship. Add `hreflang` links and set `<html lang>`.

## 8. Quality bar

- Semantic HTML: one `<h1>` per page, landmark elements, a skip link, visible focus styles.
- WCAG 2.1 AA contrast. Honour `prefers-reduced-motion`.
- Decorative images get empty `alt`; the phone mockup gets a real description (see the `aria-label` in the board).
- Lighthouse 95+ for performance, accessibility, best practices and SEO on mobile.
- Per-page `<title>` and meta description, Open Graph tags, `sitemap.xml`, `robots.txt`, a favicon.
- The logo in the boards is a placeholder (three dots and the word KINND). Build it as one component so it can be swapped.

## 9. Copy that is not visible on the boards

Features accordion, answers for the closed items:

1. How does the custody calendar work? (visible on the board)
2. How do we share photos and videos? Post a moment and choose who sees it. Everything is kept in one shared media library.
3. What are lists for? Necessities for each home, and wishlists the family can pick from. No double gifts.
4. Can we add tasks and reminders? Yes. Add tasks to appointments and school lessons, with a reminder before they are due.
5. Can I see the school day? Yes. See when each child starts and ends, and open the full week schedule.
6. Where do we keep health info and growth? On the child. Medical info like allergies and medicine, and height and weight on WHO growth charts.
7. Who can see what? Each adult sees only what their role allows. You decide who is invited.
8. Can we message each other in KINND? Yes. Messages stay inside KINND, next to everything else about your child.

Pricing accordion, answers for the closed items:

- Can I stay on Free? Yes. If your family fits Free, it is free forever.
- How do I pay? By card in the app. KINND is not sold through an app store.
- Can I change plan later? Yes, at any time. You only pay the difference for the rest of the period.

Yearly prices for the toggle: take them from the "or save … annually at … DKK / year" lines on the Pricing board.

## 10. Rules for copy and claims

- Keep it simple. Short sentences, one idea per section, no jargon. Do not add marketing copy that is not on the boards.
- Use the copy on the boards exactly, including capitalisation ("Moments" as a feature name).
- **Never claim end-to-end encryption.** Do not strengthen any security or privacy statement beyond what the boards say.
- Do not invent company facts, prices, storage sizes or legal text.
- The growth chart on Home is an illustration, not real WHO data. Keep it as an inline SVG.

## 11. Open items: do not guess, leave a visible placeholder and list them for Charlie

1. Final prices and yearly discounts (the board shows 29 and 69 DKK a month; 279 and 579 a year). The toggle badge says "Save 20%" but the Family card says 30%; ask which is right.
2. Contact email and safety email (boards show `[CONTACT EMAIL]` and `[SAFETY EMAIL]`).
3. Footer company line: some boards say "WURK ApS · CVR 34378424", others still show placeholders. The About page has the full address. Ask which form the footer should use, then make it the same on every page.
4. EU hosting and GDPR wording, to be confirmed with counsel. The Safety page still has two `[Confirm …]` notes.
5. Location wording: Home says "GPS data is removed from photos"; Safety says location data is removed from the photos other people download. They must say the same thing. Ask Charlie which is correct.
6. "A person answers, within 1 working days" on About: confirm the promise and fix the grammar.
7. All legal text (privacy notice, terms, cookies). The board has headings only.
8. Final logo, favicon and social share image.
9. Licence for `family-orchard.jpg`. It looks like a stock photo; confirm it is licensed before launch.
10. Danish and Swedish translations.
11. Domain and hosting target.

## 12. How to work

1. Read every board first. Write a short plan to `tasks/todo.md` with checkable items and check in with Charlie before building.
2. Phase 1: scaffold, tokens, fonts, Header, Footer, Button, CtaBand. Show Home at 390 and 1440 next to the boards.
3. Phase 2: Home complete, including hero, phone mockup, feature cards and safety band.
4. Phase 3: Features, Pricing, Safety, FAQ, About, Legal.
5. Phase 4: mobile menu, language menu, locales, 404, SEO files.
6. Phase 5: accessibility and performance pass.

After each phase, prove it: screenshots at 390, 768, 1024 and 1440 compared with the boards, plus Lighthouse numbers. Do not mark a phase done without that proof. Keep changes simple and do not add dependencies you do not need. Record corrections from Charlie in `tasks/lessons.md`.
