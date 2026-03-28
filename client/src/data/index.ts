import articlesRaw from './articles.json';

export interface Article {
  title: string;
  slug: string;
  category_slug: string;
  category_name: string;
  date: string;
  reading_time: number;
  meta_description: string;
  meta_keywords: string;
  image_description: string;
  image_alt: string;
  body_html: string;
  hero_url: string;
  og_url: string;
  faq_count: number;
  opener_type: string;
  backlink_type: string;
  conclusion_type: string;
  has_lived_experience: boolean;
  named_refs_used: string;
  kalesh_phrases_used: string;
  cross_links: string[];
}

export interface Category {
  slug: string;
  name: string;
  description: string;
  meta_description: string;
}

export const CATEGORIES: Category[] = [
  {
    slug: "the-brain",
    name: "The Brain",
    description: "The neuroscience behind porn addiction — dopamine, escalation, desensitization, and how your brain actually changes.",
    meta_description: "Understand the neuroscience of porn addiction. Explore dopamine pathways, escalation patterns, and how pornography rewires your brain's reward system."
  },
  {
    slug: "the-cost",
    name: "The Cost",
    description: "What porn takes from you — relationships, intimacy, performance, emotional depth, and the life you could be living.",
    meta_description: "Explore the real costs of porn addiction on relationships, intimacy, mental health, and daily life. Honest assessment without shame."
  },
  {
    slug: "the-recovery",
    name: "The Recovery",
    description: "Practical protocols for quitting — withdrawal, relapse prevention, building support, and the daily work of getting free.",
    meta_description: "Practical, evidence-based strategies for porn addiction recovery. From first days of withdrawal to building lasting freedom."
  },
  {
    slug: "the-rewire",
    name: "The Rewire",
    description: "Somatic practices, mindfulness, breathwork, and neural rewiring — rebuilding your brain and body from the inside out.",
    meta_description: "Rewire your brain after porn addiction through somatic practices, mindfulness, breathwork, and evidence-based neural recovery techniques."
  },
  {
    slug: "the-return",
    name: "The Return",
    description: "Coming home to real intimacy, healthy sexuality, authentic connection, and the embodied life that was always waiting.",
    meta_description: "Rediscover healthy sexuality, real intimacy, and authentic connection after porn addiction recovery. The return to embodied living."
  },
];

export const SITE_CONFIG = {
  title: "The Clean Burn",
  subtitle: "Breaking Free From Porn Without Shame",
  tagline: "This isn't about morality. It's about taking your brain back.",
  domain: "cleanburn.love",
  editorialName: "The Clean Burn Editorial",
  author: {
    name: "Kalesh",
    title: "Consciousness Teacher & Writer",
    bio: "Kalesh is a consciousness teacher and writer whose work explores the intersection of ancient contemplative traditions and modern neuroscience. With decades of practice in meditation, breathwork, and somatic inquiry, he guides others toward embodied awareness.",
    link: "https://kalesh.love",
    photo: "https://clean-burn.b-cdn.net/images/kalesh-portrait.webp",
  },
  bunnyBase: "https://clean-burn.b-cdn.net",
  colors: {
    primary: "#333333",
    secondary: "#FFB347",
    accent: "#FAFAFA",
    cream: "#F5F0EB",
  },
};

const allArticles: Article[] = articlesRaw as Article[];

// Direct access to all articles array
export const articles: Article[] = allArticles;

export function filterPublished(articles: Article[]): Article[] {
  const now = new Date();
  const today = now.toISOString().split('T')[0];
  return articles.filter(a => a.date <= today);
}

export function getPublishedArticles(): Article[] {
  return filterPublished(allArticles).sort((a, b) => b.date.localeCompare(a.date));
}

export function getAllArticles(): Article[] {
  return allArticles;
}

export function getArticleBySlug(slug: string): Article | undefined {
  return allArticles.find(a => a.slug === slug);
}

export function getArticlesByCategory(categorySlug: string): Article[] {
  return filterPublished(allArticles.filter(a => a.category_slug === categorySlug))
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return CATEGORIES.find(c => c.slug === slug);
}

export function getRelatedArticles(article: Article, count: number = 4): Article[] {
  const published = getPublishedArticles();
  const crossLinked = article.cross_links
    .map(slug => published.find(a => a.slug === slug))
    .filter(Boolean) as Article[];
  
  if (crossLinked.length >= count) return crossLinked.slice(0, count);
  
  // Fill with same category
  const sameCategory = published
    .filter(a => a.category_slug === article.category_slug && a.slug !== article.slug)
    .filter(a => !crossLinked.find(c => c.slug === a.slug));
  
  return [...crossLinked, ...sameCategory].slice(0, count);
}

export function getPopularArticles(count: number = 5, exclude?: string[]): Article[] {
  const published = getPublishedArticles();
  const excludeSet = new Set(exclude || []);
  return published
    .filter(a => !excludeSet.has(a.slug))
    .slice(0, count);
}

export function getPublishedCount(): number {
  return getPublishedArticles().length;
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
