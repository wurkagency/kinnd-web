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

/**
 * Language names are shown in their own language (and in English under them),
 * so they are not translated. `flag` is a file in src/assets/flags; Arabic has
 * no flag because it is not one country.
 */
export const localeInfo: Record<
  Locale,
  { name: string; english: string; dir: 'ltr' | 'rtl'; og: string; flag?: string }
> = {
  en: { name: 'English', english: 'English', dir: 'ltr', og: 'en_GB', flag: 'gb' },
  da: { name: 'Dansk', english: 'Danish', dir: 'ltr', og: 'da_DK', flag: 'dk' },
  sv: { name: 'Svenska', english: 'Swedish', dir: 'ltr', og: 'sv_SE', flag: 'se' },
  no: { name: 'Norsk', english: 'Norwegian', dir: 'ltr', og: 'nb_NO', flag: 'no' },
  fo: { name: 'Føroyskt', english: 'Faroese', dir: 'ltr', og: 'fo_FO', flag: 'fo' },
  is: { name: 'Íslenska', english: 'Icelandic', dir: 'ltr', og: 'is_IS', flag: 'is' },
  de: { name: 'Deutsch', english: 'German', dir: 'ltr', og: 'de_DE', flag: 'de' },
  tr: { name: 'Türkçe', english: 'Turkish', dir: 'ltr', og: 'tr_TR', flag: 'tr' },
  ar: { name: 'العربية', english: 'Arabic', dir: 'rtl', og: 'ar_AR' },
};

/** Locales with a finished translation. Only these are picked automatically for a visitor. */
export const translatedLocales = (): Locale[] => locales.filter((l) => !isUntranslated(l));

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
  /** Plain language list; the header button falls back to it without JavaScript. */
  language: '/language/',
} as const;
export type RouteKey = keyof typeof routes;

/** Path for a route in a locale. English has no prefix. */
export function localePath(lang: Locale, route: string): string {
  return lang === defaultLocale ? route : `/${lang}${route}`;
}

export const APP_URL = 'https://app.kinnd.eu';
