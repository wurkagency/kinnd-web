# Translating the KINND website

One file per language. `en.json` is the English source; do not edit it for translation.

| File | Language | URL |
|---|---|---|
| `da.json` | Danish | /da/ |
| `sv.json` | Swedish | /sv/ |
| `no.json` | Norwegian (Bokmål) | /no/ |
| `fo.json` | Faroese | /fo/ |
| `is.json` | Icelandic | /is/ |
| `de.json` | German | /de/ |
| `tr.json` | Turkish | /tr/ |
| `ar.json` | Arabic (right-to-left) | /ar/ |

Each file starts as a copy of the English text.

## How to translate

1. Open the file in a plain text editor (VS Code, Notepad++, TextEdit in plain-text mode). Not Word.
2. Change only the text to the **right** of each colon, inside the quotes. Never change the names on the left.
3. When the whole file is translated and checked, change the top of the file to:
   ```json
   "_meta": {
     "untranslated": false
   },
   ```
   Until then the language is hidden from Google and left out of the sitemap.
4. Send the file back (or commit it). Anything left in English simply shows in English.

## Keep these as they are

| You see | Meaning | Example |
|---|---|---|
| `*word*` | The one word in a heading shown in italic. Keep the stars around the matching word in your language. | `"Simple *pricing*"` → `"Enkle *priser*"` |
| `\n` | A line break in a heading. Keep it at a natural break. | |
| `[...]` | An open item (missing email, legal text). Leave as is. | `[CONTACT EMAIL]` |
| ` ` | A space that never breaks a line. | |
| `\"` | A quote mark inside the text. | |
| `KINND`, `Moments`, `DKK`, `GB`, `MB`, `7/7`, `10/4` | Product names and units. Keep. | |

Rules from the brief: short sentences, plain words, warm and calm tone. Do not add claims. Never say "end-to-end encryption".

## For developers

After changing `en.json`, run `npm run i18n:sync`. It adds new English keys to every language file, removes old ones and keeps all translations.
