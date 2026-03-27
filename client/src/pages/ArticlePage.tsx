import { useParams, Link, Redirect } from "wouter";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import ArticleCard from "@/components/ArticleCard";
import { getArticleBySlug, getRelatedArticles, formatDate, SITE_CONFIG, getCategoryBySlug } from "@/data";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { useEffect } from "react";

export default function ArticlePage() {
  const params = useParams<{ category: string; slug: string }>();
  const article = getArticleBySlug(params.slug || "");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [params.slug]);

  if (!article) {
    return <Redirect to="/404" />;
  }

  const category = getCategoryBySlug(article.category_slug);
  const related = getRelatedArticles(article, 4);

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

      {/* Hero */}
      <div className="relative">
        <div className="aspect-[21/9] lg:aspect-[3/1] overflow-hidden">
          <img
            src={article.hero_url}
            alt={article.image_alt}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        </div>
      </div>

      <article className="container max-w-3xl mx-auto px-4 -mt-16 relative z-10">
        {/* Article header card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-10 mb-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 mb-4 text-xs text-[var(--charcoal)]/40">
            <Link href="/" className="hover:text-[var(--gold)] transition-colors no-underline">Home</Link>
            <span>/</span>
            <Link href={`/category/${article.category_slug}`} className="hover:text-[var(--gold)] transition-colors no-underline">
              {article.category_name}
            </Link>
          </div>

          <span className="category-pill mb-4 inline-block">{article.category_name}</span>

          <h1 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-black text-[var(--charcoal)] leading-tight mb-4">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-[var(--charcoal)]/40">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {formatDate(article.date)}
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {article.reading_time} min read
            </div>
            <span>
              By{" "}
              <a href={SITE_CONFIG.author.link} className="text-[var(--gold)] no-underline hover:underline">
                {SITE_CONFIG.author.name}
              </a>
            </span>
          </div>
        </div>

        {/* Article body */}
        <div
          className="article-body bg-white rounded-2xl shadow-sm p-6 lg:p-10 mb-8"
          dangerouslySetInnerHTML={{ __html: article.body_html }}
        />

        {/* Author box */}
        <div className="bg-[var(--cream)] rounded-2xl p-6 lg:p-8 mb-8">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-full bg-[var(--gold)]/20 flex items-center justify-center shrink-0">
              <span className="font-heading text-lg font-bold text-[var(--gold)]">K</span>
            </div>
            <div>
              <h3 className="font-heading text-base font-bold text-[var(--charcoal)] mb-1">
                Written by {SITE_CONFIG.author.name}
              </h3>
              <p className="text-xs text-[var(--charcoal)]/50 mb-2">{SITE_CONFIG.author.title}</p>
              <p className="text-sm text-[var(--charcoal)]/60 leading-relaxed">
                {SITE_CONFIG.author.bio}
              </p>
              <a
                href={SITE_CONFIG.author.link}
                className="inline-block mt-3 text-sm text-[var(--gold)] hover:text-[var(--charcoal)] transition-colors no-underline"
              >
                kalesh.love →
              </a>
            </div>
          </div>
        </div>

        {/* Back link */}
        <Link
          href={`/category/${article.category_slug}`}
          className="inline-flex items-center gap-2 text-sm text-[var(--charcoal)]/50 hover:text-[var(--gold)] transition-colors no-underline mb-12"
        >
          <ArrowLeft className="w-4 h-4" /> More in {article.category_name}
        </Link>
      </article>

      {/* Related articles */}
      {related.length > 0 && (
        <section className="bg-[var(--cream)]/50 py-16">
          <div className="container">
            <div className="flex items-center gap-3 mb-8">
              <span className="w-2 h-2 rounded-full bg-[var(--gold)]" />
              <h2 className="font-heading text-xl font-bold text-[var(--charcoal)]">Keep Reading</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map(a => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
}
