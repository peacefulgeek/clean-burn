import { Link } from "wouter";
import type { Article } from "@/data";
import { formatDate } from "@/data";

interface ArticleCardProps {
  article: Article;
  variant?: "default" | "featured" | "compact";
}

export default function ArticleCard({ article, variant = "default" }: ArticleCardProps) {
  const href = `/${article.category_slug}/${article.slug}`;

  if (variant === "featured") {
    return (
      <Link href={href} className="group block no-underline">
        <article className="relative overflow-hidden rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
          <div className="aspect-[16/9] overflow-hidden">
            <img
              src={article.hero_url}
              alt={article.image_alt}
              className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
              loading="lazy"
            />
          </div>
          <div className="p-6 lg:p-8">
            <div className="flex items-center gap-3 mb-3">
              <span className="category-pill">{article.category_name}</span>
              <span className="text-xs text-[var(--charcoal)]/40">{article.reading_time} min read</span>
            </div>
            <h2 className="font-heading text-xl lg:text-2xl font-bold text-[var(--charcoal)] leading-tight mb-3 group-hover:text-[var(--gold)] transition-colors">
              {article.title}
            </h2>
            <p className="text-sm text-[var(--charcoal)]/60 leading-relaxed line-clamp-2">
              {article.meta_description}
            </p>
            <div className="mt-4 text-xs text-[var(--charcoal)]/40">
              {formatDate(article.date)}
            </div>
          </div>
        </article>
      </Link>
    );
  }

  if (variant === "compact") {
    return (
      <Link href={href} className="group block no-underline">
        <article className="flex gap-4 items-start py-4 border-b border-[var(--cream)] last:border-0">
          <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0">
            <img
              src={article.hero_url}
              alt={article.image_alt}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="flex-1 min-w-0">
            <span className="text-[10px] font-medium text-[var(--gold)] uppercase tracking-wider">{article.category_name}</span>
            <h3 className="font-heading text-sm font-semibold text-[var(--charcoal)] leading-snug mt-1 group-hover:text-[var(--gold)] transition-colors line-clamp-2">
              {article.title}
            </h3>
            <span className="text-[10px] text-[var(--charcoal)]/40 mt-1 block">{article.reading_time} min</span>
          </div>
        </article>
      </Link>
    );
  }

  // Default card
  return (
    <Link href={href} className="group block no-underline">
      <article className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 h-full">
        <div className="aspect-[16/10] overflow-hidden">
          <img
            src={article.hero_url}
            alt={article.image_alt}
            className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
            loading="lazy"
          />
        </div>
        <div className="p-5">
          <div className="flex items-center gap-2 mb-2.5">
            <span className="category-pill text-[10px]">{article.category_name}</span>
            <span className="text-[10px] text-[var(--charcoal)]/40">{article.reading_time} min</span>
          </div>
          <h3 className="font-heading text-base font-bold text-[var(--charcoal)] leading-snug mb-2 group-hover:text-[var(--gold)] transition-colors line-clamp-2">
            {article.title}
          </h3>
          <p className="text-xs text-[var(--charcoal)]/50 leading-relaxed line-clamp-2">
            {article.meta_description}
          </p>
          <div className="mt-3 text-[10px] text-[var(--charcoal)]/35">
            {formatDate(article.date)}
          </div>
        </div>
      </article>
    </Link>
  );
}
