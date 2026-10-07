/** 24x24 stroke icons from the boards. Rendered with stroke="currentColor". */
export const icons = {
  lock: '<rect x="5" y="10.5" width="14" height="9.5" rx="2"/><path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5"/>',
  pinOff: '<path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11z"/><path d="M4 4l16 16"/>',
  shield: '<path d="M12 3l7.5 3v5.5c0 4.5-3 8-7.5 9.5-4.5-1.5-7.5-5-7.5-9.5V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.8 3 2.8 15 0 18M12 3c-2.8 3-2.8 15 0 18"/>',
  people:
    '<circle cx="9" cy="8.5" r="3"/><path d="M3.5 19c.6-3 2.7-4.5 5.5-4.5s4.9 1.5 5.5 4.5"/><circle cx="17" cy="9.5" r="2.3"/><path d="M16.5 14.5c2.2.2 3.6 1.5 4 4"/>',
  download: '<path d="M12 4v11M7.5 11l4.5 4.5 4.5-4.5M5 19.5h14"/>',
  calendar: '<rect x="4" y="5.5" width="16" height="14.5" rx="2.5"/><path d="M4 10h16M8.5 3.5v4M15.5 3.5v4"/>',
  close: '<path d="M6 6l12 12M18 6L6 18"/>',
  school: '<path d="M3 9l9-5 9 5-9 5z"/><path d="M7 11.5V16c1.5 1.5 3.2 2 5 2s3.5-.5 5-2v-4.5"/>',
  checklist:
    '<path d="M9.5 6.5h11M9.5 12h11M9.5 17.5h11M3.5 6.5l1.3 1.3 2.2-2.6M3.5 12l1.3 1.3 2.2-2.6M3.5 17.5l1.3 1.3 2.2-2.6"/>',
  image: '<rect x="4" y="4.5" width="16" height="15" rx="2.5"/><circle cx="9" cy="9.5" r="1.6"/><path d="M5 17l4.5-4.5 3.5 3.5 2.5-2.5L20 17"/>',
  phone: '<rect x="7" y="3" width="10" height="18" rx="2.5"/><path d="M11 17.5h2"/>',
  mail: '<rect x="3.5" y="5.5" width="17" height="13" rx="2"/><path d="M4 7l8 6 8-6"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  minus: '<path d="M5 12h14"/>',
  chevronDown: '<path d="M6 9l6 6 6-6"/>',
  arrowUpRight: '<path d="M7 17L17 7M9 7h8v8"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  growth: '<path d="M4 19l5-6 4 3 7-9"/><path d="M15 7h5v5"/>',
} as const;

export type IconName = keyof typeof icons;
export type Tone = 'lilac' | 'mint' | 'orange' | 'forest' | 'sky' | 'yellow';
