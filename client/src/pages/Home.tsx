import { Link } from "wouter";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import ArticleCard from "@/components/ArticleCard";
import { getPublishedArticles, getArticlesByCategory, getPublishedCount, CATEGORIES, SITE_CONFIG } from "@/data";
import { ArrowRight } from "lucide-react";

export default function Home() {
  const published = getPublishedArticles();
  const featured = published.slice(0, 1)[0];
  const recent = published.slice(1, 7);

  return (
    <Layout>
      <SEOHead />

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: SITE_CONFIG.title,
            url: `https://${SITE_CONFIG.domain}`,
            description: SITE_CONFIG.tagline,
            publisher: {
              "@type": "Person",
              name: SITE_CONFIG.author.name,
              url: SITE_CONFIG.author.link,
              jobTitle: SITE_CONFIG.author.title,
            },
          }),
        }}
      />

      {/* Hero */}
      <section className="relative bg-[var(--cream)] overflow-hidden">
        <div className="container py-20 lg:py-32">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-6">
              <span className="w-8 h-[2px] bg-[var(--gold)]" />
              <span className="text-xs font-medium text-[var(--charcoal)]/50 uppercase tracking-widest">
                Evidence-Based Recovery
              </span>
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-black text-[var(--charcoal)] leading-[1.1] tracking-tight mb-6">
              Breaking Free
              <br />
              <span className="text-[var(--gold)]">From Porn</span>
              <br />
              Without Shame
            </h1>
            <p className="text-lg lg:text-xl text-[var(--charcoal)]/60 leading-relaxed max-w-xl mb-8">
              {SITE_CONFIG.tagline} Neuroscience, somatic practices, and consciousness — woven into {getPublishedCount()} articles that meet you where you are.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href={`/${published[0]?.category_slug}/${published[0]?.slug}`}
                className="inline-flex items-center gap-2 bg-[var(--charcoal)] text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-[var(--charcoal)]/90 transition-colors no-underline"
              >
                Start Reading <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/quiz"
                className="inline-flex items-center gap-2 border-2 border-[var(--charcoal)]/20 text-[var(--charcoal)] px-6 py-3 rounded-full text-sm font-medium hover:border-[var(--gold)] hover:text-[var(--gold)] transition-colors no-underline"
              >
                Take the Quiz
              </Link>
            </div>
          </div>
        </div>
        {/* Decorative dots */}
        <div className="absolute top-12 right-12 hidden lg:block">
          <div className="grid grid-cols-5 gap-3">
            {Array.from({ length: 15 }).map((_, i) => (
              <span key={i} className="w-1.5 h-1.5 rounded-full bg-[var(--gold)]/30" />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Article */}
      {featured && (
        <section className="container py-16 lg:py-20">
          <div className="flex items-center gap-3 mb-8">
            <span className="w-2 h-2 rounded-full bg-[var(--gold)]" />
            <h2 className="font-heading text-sm font-semibold text-[var(--charcoal)]/50 uppercase tracking-wider">
              Latest
            </h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <ArticleCard article={featured} variant="featured" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {recent.slice(0, 4).map(a => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Categories */}
      {CATEGORIES.map((cat, idx) => {
        const catArticles = getArticlesByCategory(cat.slug);
        if (catArticles.length === 0) return null;
        return (
          <section
            key={cat.slug}
            className={`py-16 lg:py-20 ${idx % 2 === 0 ? 'bg-white' : 'bg-[var(--cream)]/50'}`}
          >
            <div className="container">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-[var(--gold)]" />
                  <h2 className="font-heading text-2xl lg:text-3xl font-bold text-[var(--charcoal)]">
                    {cat.name}
                  </h2>
                </div>
                <Link
                  href={`/category/${cat.slug}`}
                  className="text-sm font-medium text-[var(--gold)] hover:text-[var(--charcoal)] transition-colors no-underline flex items-center gap-1"
                >
                  View all <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
              <p className="text-sm text-[var(--charcoal)]/50 max-w-2xl mb-8">{cat.description}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {catArticles.slice(0, 3).map(a => (
                  <ArticleCard key={a.slug} article={a} />
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* CTA */}
      <section className="bg-[var(--charcoal)] py-20 lg:py-24">
        <div className="container text-center">
          <h2 className="font-heading text-3xl lg:text-4xl font-bold text-white mb-4">
            Ready to begin?
          </h2>
          <p className="text-white/60 max-w-lg mx-auto mb-8">
            Take our 2-minute self-assessment to understand where you are in your recovery journey.
          </p>
          <Link
            href="/quiz"
            className="inline-flex items-center gap-2 bg-[var(--gold)] text-[var(--charcoal)] px-8 py-4 rounded-full text-sm font-semibold hover:bg-[var(--gold)]/90 transition-colors no-underline"
          >
            Take the Quiz <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </Layout>
  );
}
