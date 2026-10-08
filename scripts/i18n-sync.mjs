// Brings every locale file in line with en.json.
// - Adds keys that are new in English (with the English text, to translate).
// - Removes keys that no longer exist in English.
// - Keeps every existing translation.
// - Leaves out keys that are never translated (icon, tone).
// Usage: npm run i18n:sync
import { readFileSync, writeFileSync } from 'node:fs';

const LOCALES = ['da', 'sv', 'no', 'fo', 'is', 'de', 'tr', 'ar'];
const LOCKED = new Set(['icon', 'tone']);
const dir = new URL('../src/i18n/locales/', import.meta.url);
const read = (f) => JSON.parse(readFileSync(new URL(f, dir), 'utf8'));

function sync(base, cur) {
  if (Array.isArray(base)) return base.map((b, i) => sync(b, Array.isArray(cur) ? cur[i] : undefined));
  if (base && typeof base === 'object') {
    const c = cur && typeof cur === 'object' ? cur : {};
    const out = {};
    for (const [k, v] of Object.entries(base)) if (!LOCKED.has(k)) out[k] = sync(v, c[k]);
    return out;
  }
  return typeof cur === 'string' ? cur : base;
}

const en = read('en.json');
for (const l of LOCALES) {
  let cur = {};
  try {
    cur = read(`${l}.json`);
  } catch {}
  const meta = { untranslated: cur._meta?.untranslated ?? true };
  writeFileSync(new URL(`${l}.json`, dir), JSON.stringify({ _meta: meta, ...sync(en, cur) }, null, 2) + '\n');
  console.log(`${l}.json synced${meta.untranslated ? ' (untranslated)' : ''}`);
}
