/**
 * Locales and copy.
 *
 * All copy lives in ./locales/<code>.json. en.json is the source of truth
 * (design/boards/*.dc.html, desktop boards win). Other locale files are edited
 * by translators; any key missing there falls back to English. Keys that must
 * not be translated (icons, tones, company facts) always come from English.
 *
 * Copy conventions
 * - `*text*` marks the one italic word or phrase in a display heading.
 * - `\n` in a heading is a line break shown from tablet width up.
 * - Values in [BRACKETS] are open items. They stay visible on purpose.
 */
import en from './locales/en.json';

export type Dict = typeof en;

export const locales = ['en', 'da', 'sv', 'no', 'fo', 'is', 'de', 'tr', 'ar'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

/** Language names are shown in their own language, so they are not translated. */
export const localeInfo: Record<Locale, { name: string; dir: 'ltr' | 'rtl'; og: string }> = {
  en: { name: 'English', dir: 'ltr', og: 'en_GB' },
  da: { name: 'Dansk', dir: 'ltr', og: 'da_DK' },
  sv: { name: 'Svenska', dir: 'ltr', og: 'sv_SE' },
  no: { name: 'Norsk', dir: 'ltr', og: 'nb_NO' },
  fo: { name: 'Føroyskt', dir: 'ltr', og: 'fo_FO' },
  is: { name: 'Íslenska', dir: 'ltr', og: 'is_IS' },
  de: { name: 'Deutsch', dir: 'ltr', og: 'de_DE' },
  tr: { name: 'Türkçe', dir: 'ltr', og: 'tr_TR' },
  ar: { name: 'العربية', dir: 'rtl', og: 'ar_AR' },
};

/** Company facts and contact details. Not translated. */
export const site = {
  name: 'KINND',
  company: 'WURK ApS · CVR 34378424',
  contactEmail: '[CONTACT EMAIL]',
  safetyEmail: '[SAFETY EMAIL]',
};

type Json = Record<string, unknown> & { _meta?: { untranslated?: boolean } };
const files = import.meta.glob<Json>('./locales/*.json', { eager: true, import: 'default' });
const raw = (lang: Locale): Json => files[`./locales/${lang}.json`] ?? {};

const LOCKED = new Set(['icon', 'tone']);

/** English as the base; take translated strings where they exist and have the same shape. */
function merge(base: unknown, over: unknown): unknown {
  if (Array.isArray(base)) {
    return base.map((b, i) => merge(b, Array.isArray(over) ? over[i] : undefined));
  }
  if (base && typeof base === 'object') {
    const o = (over && typeof over === 'object' ? over : {}) as Record<string, unknown>;
    return Object.fromEntries(
      Object.entries(base).map(([k, v]) => [k, LOCKED.has(k) ? v : merge(v, o[k])]),
    );
  }
  return typeof over === typeof base && over !== '' ? over : base;
}

const dicts = Object.fromEntries(
  locales.map((l) => [l, l === defaultLocale ? en : (merge(en, raw(l)) as Dict)]),
) as Record<Locale, Dict>;

export function useDict(lang: Locale): Dict {
  return dicts[lang];
}

/** True until a translator sets `"_meta": { "untranslated": false }` in the locale file. */
export function isUntranslated(lang: Locale): boolean {
  return lang !== defaultLocale && raw(lang)._meta?.untranslated !== false;
}

/** Site routes, without locale prefix. */
export const routes = {
  home: '/',
  features: '/features/',
  pricing: '/pricing/',
  safety: '/safety/',
  faq: '/faq/',
  about: '/about/',
  privacy: '/legal/privacy/',
  terms: '/legal/terms/',
  cookies: '/legal/cookies/',
} as const;
export type RouteKey = keyof typeof routes;

/** Path for a route in a locale. English has no prefix. */
export function localePath(lang: Locale, route: string): string {
  return lang === defaultLocale ? route : `/${lang}${route}`;
}

export const APP_URL = 'https://app.kinnd.eu';
