/*
 * DESIGN: "Luminous Awakening" — Immersive dark reading with visible hero images
 * Full-bleed hero image, dark body with warm amber typography
 * Kalesh author sidebar with photo, health disclaimer card at bottom
 */
import { useEffect, useMemo } from "react";
import { useParams, Link, Redirect } from "wouter";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import ArticleCard from "@/components/ArticleCard";
import { getArticleBySlug, getRelatedArticles, formatDate, SITE_CONFIG } from "@/data";
import AutoAffiliates from "@/components/AutoAffiliates";
import { ArrowLeft, Clock, Calendar, ExternalLink, ShieldCheck } from "lucide-react";

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

  // Detect if article has Amazon affiliate links
  const hasAffiliateLinks = useMemo(() => {
    return article.body_html.includes("amazon.com/dp/") || article.body_html.includes("tag=spankyspinola-20");
  }, [article.body_html]);

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
      image: SITE_CONFIG.author.photo,
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

      {/* ═══ ARTICLE CONTENT WITH SIDEBAR ═══ */}
      <div className="bg-[var(--deep)] relative">
        <div className="container max-w-6xl -mt-32 relative z-10">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Main Content */}
            <div className="flex-1 min-w-0 max-w-3xl">
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
                <img
                  src={SITE_CONFIG.author.photo}
                  alt={SITE_CONFIG.author.name}
                  className="w-10 h-10 rounded-full object-cover border border-[var(--amber)]/20"
                />
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

              {/* Affiliate disclosure (only if article has Amazon links) */}
              {hasAffiliateLinks && (
                <div className="bg-[var(--amber)]/5 border border-[var(--amber)]/15 rounded-xl px-5 py-4 mt-8">
                  <p className="text-sm text-[var(--warm-muted)]">
                    This article contains affiliate links. We may earn a small commission if you make a purchase — at no extra cost to you.
                  </p>
                </div>
              )}

              {/* ═══ ARTICLE BODY ═══ */}
              <div className="py-12">
                <AutoAffiliates article={article} />
              </div>

              {/* ═══ HEALTH DISCLAIMER CARD ═══ */}
              <div className="bg-[var(--deep-card)] border border-[var(--amber)]/10 rounded-2xl p-6 mb-8">
                <div className="flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-[var(--amber)] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-heading font-semibold text-[var(--warm-white)] text-sm mb-2">Health Disclaimer</h4>
                    <p className="text-xs text-[var(--warm-subtle)] leading-relaxed">
                      The content on The Clean Burn is provided for educational and informational purposes only and is not intended as a substitute for professional medical advice, diagnosis, or treatment. Always seek the guidance of a qualified healthcare provider with any questions you may have regarding a medical condition or mental health concern. Never disregard professional medical advice or delay in seeking it because of something you have read on this website. If you are experiencing a mental health crisis, please reach out to a licensed professional in your area immediately.
                    </p>
                  </div>
                </div>
              </div>

              {/* ═══ AUTHOR BOX ═══ */}
              <div className="pb-12">
                <div className="bg-[var(--deep-card)] border border-[var(--amber)]/8 rounded-2xl p-6 lg:p-8">
                  <div className="flex flex-col sm:flex-row items-start gap-4">
                    <img
                      src={SITE_CONFIG.author.photo}
                      alt={SITE_CONFIG.author.name}
                      className="w-16 h-16 rounded-xl object-cover border-2 border-[var(--amber)]/20 shrink-0"
                    />
                    <div>
                      <h3 className="font-heading font-bold text-[var(--warm-white)] mb-1">
                        Written by {SITE_CONFIG.author.name}
                      </h3>
                      <p className="text-sm text-[var(--amber)] mb-3">{SITE_CONFIG.author.title}</p>
                      <p className="text-sm text-[var(--warm-subtle)] leading-relaxed mb-4">
                        Kalesh is a mystic and spiritual advisor who brings ancient wisdom and depth to life's biggest decisions. His work explores the intersection of contemplative traditions and modern neuroscience.
                      </p>
                      <div className="flex flex-wrap items-center gap-3">
                        <a
                          href={SITE_CONFIG.author.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--amber)] text-[var(--deep)] text-sm font-semibold rounded-lg hover:bg-[var(--amber-light)] transition-colors no-underline"
                        >
                          Book a Session
                        </a>
                        <a
                          href={SITE_CONFIG.author.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm text-[var(--amber)] hover:text-[var(--amber-glow)] transition-colors no-underline"
                        >
                          Visit kalesh.love <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Back link */}
              <div className="pb-12">
                <Link
                  href={`/category/${article.category_slug}`}
                  className="inline-flex items-center gap-2 text-sm text-[var(--warm-subtle)] hover:text-[var(--amber)] transition-colors no-underline"
                >
                  <ArrowLeft className="w-4 h-4" /> More in {article.category_name}
                </Link>
              </div>
            </div>

            {/* ═══ SIDEBAR ═══ */}
            <aside className="w-full lg:w-72 shrink-0 pt-8 lg:pt-48">
              <div className="lg:sticky lg:top-24 space-y-6">
                {/* Author Card */}
                <div className="bg-[var(--deep-card)] border border-[var(--amber)]/8 rounded-xl p-5">
                  <img
                    src={SITE_CONFIG.author.photo}
                    alt={SITE_CONFIG.author.name}
                    className="w-20 h-20 rounded-xl object-cover border-2 border-[var(--amber)]/20 mx-auto mb-4"
                  />
                  <h4 className="font-heading font-bold text-[var(--warm-white)] text-center mb-1">{SITE_CONFIG.author.name}</h4>
                  <p className="text-xs text-[var(--amber)] text-center mb-3">{SITE_CONFIG.author.title}</p>
                  <p className="text-xs text-[var(--warm-subtle)] text-center leading-relaxed mb-4">
                    Kalesh is a mystic and spiritual advisor who brings ancient wisdom and depth to life's biggest decisions.
                  </p>
                  <a
                    href={SITE_CONFIG.author.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center px-4 py-2.5 bg-[var(--amber)] text-[var(--deep)] text-sm font-semibold rounded-lg hover:bg-[var(--amber-light)] transition-colors no-underline"
                  >
                    Book a Session
                  </a>
                  <a
                    href={SITE_CONFIG.author.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center mt-2 text-xs text-[var(--amber)]/70 hover:text-[var(--amber)] transition-colors no-underline"
                  >
                    Visit Kalesh's Website →
                  </a>
                </div>

                {/* Tools CTA */}
                <Link
                  href="/tools"
                  className="block bg-[var(--deep-card)] border border-[var(--amber)]/8 rounded-xl p-5 no-underline hover:border-[var(--amber)]/20 transition-all group"
                >
                  <h4 className="font-heading font-semibold text-[var(--warm-white)] text-sm mb-2 group-hover:text-[var(--amber-light)] transition-colors">
                    Tools We Recommend
                  </h4>
                  <p className="text-xs text-[var(--warm-subtle)] leading-relaxed">
                    Books, supplements, and resources personally vetted for recovery.
                  </p>
                </Link>

                {/* Self-Check CTA */}
                <Link
                  href="/quiz"
                  className="block bg-[var(--deep-card)] border border-[var(--amber)]/8 rounded-xl p-5 no-underline hover:border-[var(--amber)]/20 transition-all group"
                >
                  <h4 className="font-heading font-semibold text-[var(--warm-white)] text-sm mb-2 group-hover:text-[var(--amber-light)] transition-colors">
                    Take the Self-Check
                  </h4>
                  <p className="text-xs text-[var(--warm-subtle)] leading-relaxed">
                    A private, honest assessment of where you are right now.
                  </p>
                </Link>
              </div>
            </aside>
          </div>
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
