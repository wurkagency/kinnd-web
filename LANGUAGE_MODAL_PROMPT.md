# Add the language selector modal

The KINND website is live. Add one feature: when a visitor clicks the language button in the header (the "EN" code with a chevron), a modal opens where they pick the site language.

## Design

| Board | What it shows |
|---|---|
| `design/boards/Language.dc.html` | Desktop: centred dialog over a dimmed page, three columns of language cards |
| `design/boards/Language-mobile.dc.html` | Mobile: bottom sheet with a grab handle and a one-column list |

Read the dialog `<div role="dialog">` in each file as the spec. The page behind it is only context.

Breakpoint: bottom sheet below 768px, centred dialog from 768px up. At tablet widths the grid may drop to two columns.

## Languages, in this order

| Code | Native name | English name | Flag |
|---|---|---|---|
| `en` | English | English | United Kingdom |
| `da` | Dansk | Danish | Denmark |
| `sv` | Svenska | Swedish | Sweden |
| `no` | Norsk | Norwegian | Norway |
| `fo` | Føroyskt | Faroese | Faroe Islands |
| `is` | Íslenska | Icelandic | Iceland |
| `de` | Deutsch | German | Germany |
| `tr` | Türkçe | Turkish | Turkey |
| `ar` | العربية | Arabic | No flag. A lilac tile with the letter ع, because Arabic is not one country |

The flags in the boards are simplified inline SVGs. Use a proper flag set (for example the `flag-icons` package, or hand-made SVGs) at the same 40 by 28 size, radius 6, with a faint 1px outline so white flags stay visible.

Each option shows the native name (17px, 600), the English name below it (13px, muted) and, for the current language, a forest outline and a round forest check. Set `lang` on each option to its own code so screen readers pronounce the names right. The Arabic name has `dir="rtl"`.

Heading: "Choose *language*" (one italic word, Instrument Serif). Line under it: "The website changes to the language you pick." Close button top right.

## Behaviour

- Use a native `<dialog>` opened with `showModal()`. Focus moves to the current language; focus is trapped; Escape, the close button and a click on the backdrop close it; focus returns to the header button.
- Options are links to the same page in the other locale (`/da/pricing` etc.), so it works without JavaScript too. The header button falls back to a link to a plain language list page if JS is off.
- On the mobile sheet, a swipe down on the handle closes it. Honour `prefers-reduced-motion` for the slide and fade.
- Remember the choice in a cookie or `localStorage` only for redirecting the visitor next time; never block content on it. Do not auto-redirect by browser language without a visible way back.
- The header button shows the current code (EN, DA, SV, NO, FO, IS, DE, TR, AR).
- The footer language buttons (EN, DA, SV) should open the same modal instead of linking directly.

## Locales

- Add `no`, `fo`, `is`, `de`, `tr` and `ar` locale files next to the existing ones. Until real translations exist, fill them with the English text and mark them as untranslated. Do not ship machine translation. Ask Charlie whether untranslated languages should be hidden from the modal until they are ready.
- `ar` is right to left. Set `dir="rtl"` on `<html>` for Arabic pages and check every page for layout that breaks in RTL: use logical CSS properties (`margin-inline-start`, `padding-inline`, `inset-inline`), flip directional icons (arrows, chevrons), keep numbers, prices and the phone mockup left to right.
- Albert Sans and Instrument Serif have no Arabic glyphs. Add an Arabic fallback font (for example IBM Plex Sans Arabic or Noto Sans Arabic, self-hosted) and ask Charlie to approve the choice.
- Update `hreflang` links and the sitemap for every locale.

## Proof

Screenshots of the modal at 390, 768 and 1440, of the Home page in Arabic at 390 and 1440, keyboard-only walkthrough (open, move, select, close), and Lighthouse accessibility 95+ on a page with the modal open.
