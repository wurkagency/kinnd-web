// @ts-check
import { readdirSync, readFileSync } from 'node:fs';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Locales still marked untranslated are noindex and stay out of the sitemap
// (see src/i18n/index.ts). A translator flips `_meta.untranslated` to false.
const localesDir = new URL('./src/i18n/locales/', import.meta.url);
const untranslated = readdirSync(localesDir)
  .filter((f) => f.endsWith('.json') && f !== 'en.json')
  .filter((f) => JSON.parse(readFileSync(new URL(f, localesDir), 'utf8'))._meta?.untranslated !== false)
  .map((f) => `/${f.replace('.json', '')}/`);

export default defineConfig({
  site: 'https://www.kinnd.eu',
  trailingSlash: 'always',
  devToolbar: { enabled: false },
  integrations: [
    sitemap({
      filter: (page) => !untranslated.some((p) => new URL(page).pathname.startsWith(p)),
    }),
  ],
});
