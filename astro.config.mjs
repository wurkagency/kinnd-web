// @ts-check
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Locales still marked untranslated are noindex and stay out of the sitemap
// (see src/i18n/index.ts). A translator flips `_meta.untranslated` to false.
const localesDir = new URL('./src/i18n/locales/', import.meta.url);
const untranslated = readdirSync(localesDir)
  .filter((f) => f.endsWith('.json') && f !== 'en.json')
  .filter((f) => JSON.parse(readFileSync(new URL(f, localesDir), 'utf8'))._meta?.untranslated !== false)
  .map((f) => `/${f.replace('.json', '')}/`);

// Long documents (legal texts, Safety deep dives) are Markdown files per language.
// A language without its own file shows the English text, so that page is noindex
// and stays out of the sitemap too (see src/views/Legal.astro and Technical.astro).
const docs = { legal: ['privacy', 'terms', 'subscription', 'cookies'], safety: ['technical'] };
const otherLocales = readdirSync(localesDir)
  .filter((f) => f.endsWith('.json') && f !== 'en.json')
  .map((f) => f.replace('.json', ''));
const englishOnly = Object.entries(docs).flatMap(([dir, names]) =>
  names.flatMap((doc) =>
    otherLocales
      .filter((l) => !existsSync(new URL(`./src/content/${dir}/${l}/${doc}.md`, import.meta.url)))
      .map((l) => `/${l}/${dir}/${doc}/`),
  ),
);

export default defineConfig({
  site: 'https://www.kinnd.eu',
  trailingSlash: 'always',
  devToolbar: { enabled: false },
  integrations: [
    sitemap({
      filter: (page) => {
        const path = new URL(page).pathname;
        return (
          !path.endsWith('/language/') &&
          !untranslated.some((p) => path.startsWith(p)) &&
          !englishOnly.includes(path)
        );
      },
    }),
  ],
});
