const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/**
 * Turns copy markers into HTML:
 * `*italic*` -> <em>, `[open item]` -> highlighted placeholder, `\n` -> line break from tablet up.
 */
export function rich(s: string): string {
  return escapeHtml(s)
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/\[([^\]]+)\]/g, '<span class="placeholder">[$1]</span>')
    .replace(/\n/g, '<br class="br-wide"> ');
}

/** Plain text for <title>, meta and aria attributes. */
export function plain(s: string): string {
  return s.replace(/\*/g, '').replace(/\n/g, ' ');
}

/** An email value is a placeholder until it contains an @. */
export const isEmail = (s: string) => s.includes('@');
