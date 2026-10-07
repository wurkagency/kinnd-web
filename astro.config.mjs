// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Danish and Swedish pages exist but are untranslated. Keep them out of the
// sitemap until real translations land (see src/i18n/index.ts).
const untranslated = ['/da/', '/sv/'];

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
