import { en, type Dict } from './en';
import { da } from './da';
import { sv } from './sv';

export const locales = ['en', 'da', 'sv'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

const dicts: Record<Locale, Dict> = { en, da, sv };

export function useDict(lang: Locale): Dict {
  return dicts[lang];
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
