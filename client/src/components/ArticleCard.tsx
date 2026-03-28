/*
 * DESIGN: "Luminous Awakening" — Dark cards, amber accents, warm glow on hover
 */
import { Link } from "wouter";
import { type Article, formatDate } from "@/data";

interface Props {
  article: Article;
  variant?: "featured" | "compact" | "default";
}

export default function ArticleCard({ article, variant = "default" }: Props) {
  const href = `/${article.category_slug}/${article.slug}`;

  if (variant === "featured") {
    return (
      <Link href={href} className="group block no-underline">
        <div className="relative rounded-2xl overflow-hidden aspect-[4/3] lg:aspect-[16/10] warm-glow">
          <img
            src={article.hero_url}
            alt={article.image_alt || article.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--deep)] via-[var(--deep)]/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 lg:p-8">
            <span className="category-pill mb-3 inline-block">{article.category_name}</span>
            <h3 className="font-heading text-xl lg:text-2xl font-bold text-white leading-tight mb-2 group-hover:text-[var(--amber-light)] transition-colors">
              {article.title}
            </h3>
            <p className="text-sm text-white/50 line-clamp-2 max-w-lg">{article.meta_description}</p>
            <div className="flex items-center gap-3 mt-4 text-xs text-white/40">
              <span>{formatDate(article.date)}</span>
              <span className="w-1 h-1 rounded-full bg-[var(--amber)]/40" />
              <span>{article.reading_time} min read</span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  if (variant === "compact") {
    return (
      <Link href={href} className="group block no-underline">
        <div className="flex gap-4 items-start p-3 rounded-xl hover:bg-[var(--deep-elevated)] transition-colors">
          <div className="shrink-0 w-20 h-20 rounded-lg overflow-hidden">
            <img
              src={article.hero_url}
              alt={article.image_alt || article.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-medium text-[var(--amber)] uppercase tracking-wider">{article.category_name}</span>
            <h4 className="font-heading text-sm font-semibold text-[var(--warm-white)] leading-snug mt-1 group-hover:text-[var(--amber-light)] transition-colors line-clamp-2">
              {article.title}
            </h4>
            <span className="text-xs text-[var(--warm-subtle)] mt-1 block">{article.reading_time} min</span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={href} className="group block no-underline">
      <div className="bg-[var(--deep-card)] rounded-xl overflow-hidden border border-[var(--amber)]/5 warm-glow h-full">
        <div className="aspect-[16/10] overflow-hidden">
          <img
            src={article.hero_url}
            alt={article.image_alt || article.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
          />
        </div>
        <div className="p-5 lg:p-6">
          <div className="flex items-center gap-3 mb-3">
            <span className="category-pill">{article.category_name}</span>
            <span className="text-xs text-[var(--warm-subtle)]">{article.reading_time} min</span>
          </div>
          <h3 className="font-heading text-base lg:text-lg font-semibold text-[var(--warm-white)] leading-snug mb-2 group-hover:text-[var(--amber-light)] transition-colors line-clamp-2">
            {article.title}
          </h3>
          <p className="text-sm text-[var(--warm-subtle)] line-clamp-2 leading-relaxed">
            {article.meta_description}
          </p>
          <div className="mt-4 pt-4 border-t border-[var(--amber)]/5">
            <span className="text-xs text-[var(--warm-subtle)]">{formatDate(article.date)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
