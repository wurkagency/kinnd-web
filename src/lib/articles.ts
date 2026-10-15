import type { ImageMetadata, MarkdownInstance } from 'astro';

/**
 * Articles: src/content/articles/<slug>.md (Danish only for now).
 * Images: src/assets/articles/<slug>-hero.jpg and <slug>-inline.jpg.
 */
export interface ArticleData {
  title: string;
  slug: string;
  description: string;
  category: string;
  tags: string[];
  date: string | Date;
  reading_time: number;
  order: number;
}

export interface Category {
  name: string;
  id: string;
  /** Tag colour from the site palette. */
  tone: 'yellow' | 'lilac' | 'mint' | 'sky';
}

/** Order here is the order on the overview page. */
export const categories: Category[] = [
  { name: 'Hverdagen som forælder', id: 'hverdagen-som-foraelder', tone: 'yellow' },
  { name: 'Separerede forældre', id: 'separerede-foraeldre', tone: 'lilac' },
  { name: 'Børns rettigheder', id: 'boerns-rettigheder', tone: 'mint' },
  { name: 'Digital adfærd', id: 'digital-adfaerd', tone: 'sky' },
];

const files = import.meta.glob<MarkdownInstance<ArticleData>>('../content/articles/*.md', { eager: true });
const images = import.meta.glob<{ default: ImageMetadata }>('../assets/articles/*.jpg', { eager: true });

export interface Article extends ArticleData {
  md: MarkdownInstance<ArticleData>;
  categoryInfo: Category;
  hero: ImageMetadata;
  inline: ImageMetadata;
}

const image = (slug: string, kind: 'hero' | 'inline') => {
  const img = images[`../assets/articles/${slug}-${kind}.jpg`];
  if (!img) throw new Error(`Missing ${kind} image for article "${slug}"`);
  return img.default;
};

export const articles: Article[] = Object.values(files)
  .map((md) => {
    const fm = md.frontmatter;
    const categoryInfo = categories.find((c) => c.name === fm.category);
    if (!categoryInfo) throw new Error(`Unknown category "${fm.category}" in article "${fm.slug}"`);
    return { ...fm, md, categoryInfo, hero: image(fm.slug, 'hero'), inline: image(fm.slug, 'inline') };
  })
  .sort((a, b) => a.order - b.order);

export const inCategory = (id: string) => articles.filter((a) => a.categoryInfo.id === id);

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('da-DK', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(date));
}

export const ARTICLES_ROUTE = '/artikler/';
export const articlePath = (slug: string) => `/da/artikler/${slug}/`;
export const categoryAnchor = (id: string) => `/da/artikler/#${id}`;
