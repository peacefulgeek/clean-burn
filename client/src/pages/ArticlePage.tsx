/*
 * DESIGN: "Luminous Awakening" — Immersive dark reading with visible hero images
 * Full-bleed hero image, dark body with warm amber typography
 */
import { useEffect } from "react";
import { useParams, Link, Redirect } from "wouter";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import ArticleCard from "@/components/ArticleCard";
import { getArticleBySlug, getRelatedArticles, formatDate, SITE_CONFIG } from "@/data";
import { ArrowLeft, Clock, Calendar } from "lucide-react";

export default function ArticlePage() {
  const params = useParams<{ category: string; slug: string }>();
  const article = getArticleBySlug(params.slug || "");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [params.slug]);

  if (!article) {
    return <Redirect to="/404" />;
  }

  const related = getRelatedArticles(article, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.meta_description,
    image: article.hero_url,
    datePublished: article.date,
    dateModified: article.date,
    author: {
      "@type": "Person",
      name: SITE_CONFIG.author.name,
      url: SITE_CONFIG.author.link,
      jobTitle: SITE_CONFIG.author.title,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_CONFIG.title,
      url: `https://${SITE_CONFIG.domain}`,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://${SITE_CONFIG.domain}/${article.category_slug}/${article.slug}`,
    },
    wordCount: article.body_html.split(/\s+/).length,
    articleSection: article.category_name,
    keywords: article.meta_keywords,
  };

  // FAQ JSON-LD
  const faqMatch = article.body_html.match(/<h3[^>]*>(.*?)<\/h3>\s*<p>([\s\S]*?)<\/p>/g);
  let faqJsonLd = null;
  if (article.faq_count > 0 && faqMatch && faqMatch.length > 0) {
    const faqItems = faqMatch.slice(-article.faq_count).map(block => {
      const qMatch = block.match(/<h3[^>]*>(.*?)<\/h3>/);
      const aMatch = block.match(/<\/h3>\s*<p>([\s\S]*?)<\/p>/);
      return {
        "@type": "Question",
        name: qMatch ? qMatch[1].replace(/<[^>]+>/g, '') : '',
        acceptedAnswer: {
          "@type": "Answer",
          text: aMatch ? aMatch[1].replace(/<[^>]+>/g, '') : '',
        },
      };
    }).filter(q => q.name && q.acceptedAnswer.text);
    if (faqItems.length > 0) {
      faqJsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqItems,
      };
    }
  }

  return (
    <Layout>
      <SEOHead
        title={article.title}
        description={article.meta_description}
        ogImage={article.og_url}
        ogType="article"
        canonicalPath={`/${article.category_slug}/${article.slug}`}
        keywords={article.meta_keywords}
        articleDate={article.date}
        articleAuthor={SITE_CONFIG.author.name}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      {/* ═══ HERO IMAGE ═══ */}
      <section className="relative h-[60vh] lg:h-[70vh] overflow-hidden">
        <img
          src={article.hero_url}
          alt={article.image_alt || article.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--deep)] via-transparent to-transparent" style={{ background: 'linear-gradient(to top, var(--deep) 0%, rgba(26,22,18,0.4) 30%, transparent 60%)' }} />
      </section>

      {/* ═══ ARTICLE CONTENT ═══ */}
      <div className="bg-[var(--deep)] relative">
        <div className="container max-w-3xl -mt-32 relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-6 text-xs text-[var(--warm-subtle)]">
            <Link href="/" className="hover:text-[var(--amber)] transition-colors no-underline">Home</Link>
            <span className="text-[var(--amber)]/30">/</span>
            <Link href={`/category/${article.category_slug}`} className="hover:text-[var(--amber)] transition-colors no-underline">
              {article.category_name}
            </Link>
          </div>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className="category-pill">{article.category_name}</span>
            <div className="flex items-center gap-4 text-xs text-[var(--warm-subtle)]">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {formatDate(article.date)}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {article.reading_time} min read
              </span>
            </div>
          </div>

          {/* Title */}
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-[1.1] tracking-tight mb-6">
            {article.title}
          </h1>

          {/* Subtitle */}
          <p className="text-lg text-[var(--warm-muted)] leading-relaxed mb-8">
            {article.meta_description}
          </p>

          {/* Author line */}
          <div className="flex items-center gap-3 pb-8 border-b border-[var(--amber)]/10">
            <div className="w-10 h-10 rounded-full bg-[var(--amber)]/10 flex items-center justify-center">
              <span className="text-sm font-heading font-bold text-[var(--amber)]">K</span>
            </div>
            <div>
              <a
                href={SITE_CONFIG.author.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-[var(--warm-white)] hover:text-[var(--amber)] transition-colors no-underline"
              >
                {SITE_CONFIG.author.name}
              </a>
              <p className="text-xs text-[var(--warm-subtle)]">{SITE_CONFIG.author.title}</p>
            </div>
          </div>
        </div>

        {/* ═══ ARTICLE BODY ═══ */}
        <div className="container max-w-3xl py-12">
          <div
            className="article-body"
            dangerouslySetInnerHTML={{ __html: article.body_html }}
          />
        </div>

        {/* ═══ AUTHOR BOX ═══ */}
        <div className="container max-w-3xl pb-12">
          <div className="bg-[var(--deep-card)] border border-[var(--amber)]/8 rounded-2xl p-6 lg:p-8">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-full bg-[var(--amber)]/10 flex items-center justify-center shrink-0">
                <span className="text-xl font-heading font-bold text-[var(--amber)]">K</span>
              </div>
              <div>
                <h3 className="font-heading font-bold text-[var(--warm-white)] mb-1">
                  Written by {SITE_CONFIG.author.name}
                </h3>
                <p className="text-sm text-[var(--amber)] mb-3">{SITE_CONFIG.author.title}</p>
                <p className="text-sm text-[var(--warm-subtle)] leading-relaxed mb-4">
                  {SITE_CONFIG.author.bio}
                </p>
                <a
                  href={SITE_CONFIG.author.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[var(--amber)] hover:text-[var(--amber-glow)] transition-colors no-underline"
                >
                  kalesh.love →
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Back link */}
        <div className="container max-w-3xl pb-12">
          <Link
            href={`/category/${article.category_slug}`}
            className="inline-flex items-center gap-2 text-sm text-[var(--warm-subtle)] hover:text-[var(--amber)] transition-colors no-underline"
          >
            <ArrowLeft className="w-4 h-4" /> More in {article.category_name}
          </Link>
        </div>

        {/* ═══ RELATED ARTICLES ═══ */}
        {related.length > 0 && (
          <div className="bg-[var(--deep-card)] py-16 lg:py-20">
            <div className="container">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-px bg-[var(--amber)]" />
                <h2 className="font-heading text-sm font-semibold text-[var(--amber)] uppercase tracking-[0.12em]">
                  Continue Reading
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {related.map((a) => (
                  <ArticleCard key={a.slug} article={a} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
