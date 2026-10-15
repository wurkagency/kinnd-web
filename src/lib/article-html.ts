/**
 * Gives an article's rendered Markdown the look of the article design, without
 * changing the Markdown itself:
 *
 * - the first paragraph becomes the large serif lead
 * - numbered headings ("Vane 3: …", "Princip 2: …", "4. …") get a big serif number
 * - a bold-only paragraph becomes a small label above the list that follows
 * - quotes become lilac quote cards
 * - the closing "Kom i gang" section becomes a green checklist box
 * - the closing KINND paragraph and its link become a "Gør det i KINND" callout
 *
 * Returns the HTML split in two before the middle section, where the page puts
 * the second image. The articles' Markdown always ends with "## Kom i gang …"
 * followed by a KINND paragraph and a bold link to the app.
 */

// "Vane 3: …", "Princip 1: …", "Uge 2: …" or "4. …": an optional single word, a number, then the title.
const NUMBERED = /^(\p{Lu}\p{Ll}+\s+)?(\d+)[.:]\s+(.+)$/u;

export function shapeArticle(html: string): { before: string; after: string } {
  let out = html;

  // Lead: the first paragraph.
  out = out.replace(/<p>/, '<p class="lead">');

  // Numbered headings (plain text only).
  out = out.replace(/<(h[23])([^>]*)>([^<]+)<\/\1>/g, (whole, tag: string, attrs: string, inner: string) => {
    const m = inner.trim().match(NUMBERED);
    if (!m) return whole;
    const [, word = '', num, rest] = m;
    return `<${tag}${attrs} class="numbered"><span class="num" aria-hidden="true">${num}</span><span><span class="visually-hidden">${word}${num}: </span>${rest}</span></${tag}>`;
  });

  // Bold-only paragraphs are labels (not the closing link to the app).
  out = out.replace(/<p><strong>((?:(?!<\/?strong|<a\b).)+)<\/strong><\/p>/g, '<p class="label"><strong>$1</strong></p>');

  out = out.replace(/<blockquote>/g, '<blockquote class="quote">');

  // Closing section → checklist box + KINND callout.
  const startMatch = [...out.matchAll(/<h2[^>]*>(?:(?!<\/h2>).)*Kom i gang(?:(?!<\/h2>).)*<\/h2>/g)].pop();
  if (startMatch?.index !== undefined) {
    const start = startMatch.index;
    const pitchRel = out.slice(start).search(/<p>(?:(?!<\/p>)[\s\S])*KINND/);
    if (pitchRel > 0) {
      const pitch = start + pitchRel;
      const box = out.slice(start, pitch);
      const callout = out
        .slice(pitch)
        .replace(/<strong><a href="https:\/\/app\.kinnd\.eu"/g, '<strong><a class="cta-button" href="https://app.kinnd.eu"');
      out = `${out.slice(0, start)}<section class="start-box">${box}</section><aside class="kinnd-callout">${callout}</aside>`;
    }
  }

  // Split before the middle section heading (the closing section does not count).
  const sections = [...out.matchAll(/<h2[^>]*>/g)].filter((m) => !out.slice(0, m.index).endsWith('<section class="start-box">'));
  const mid = sections[Math.floor(sections.length / 2)];
  if (!mid || mid.index === undefined) return { before: out, after: '' };
  return { before: out.slice(0, mid.index), after: out.slice(mid.index) };
}
