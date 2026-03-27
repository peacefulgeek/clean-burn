import { useParams, Redirect } from "wouter";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import ArticleCard from "@/components/ArticleCard";
import { getArticlesByCategory, getCategoryBySlug, SITE_CONFIG } from "@/data";
import { useEffect } from "react";

export default function CategoryPage() {
  const params = useParams<{ slug: string }>();
  const category = getCategoryBySlug(params.slug || "");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [params.slug]);

  if (!category) {
    return <Redirect to="/404" />;
  }

  const articles = getArticlesByCategory(category.slug);

  return (
    <Layout>
      <SEOHead
        title={category.name}
        description={category.meta_description}
        canonicalPath={`/category/${category.slug}`}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: category.name,
            description: category.meta_description,
            url: `https://${SITE_CONFIG.domain}/category/${category.slug}`,
            isPartOf: {
              "@type": "WebSite",
              name: SITE_CONFIG.title,
              url: `https://${SITE_CONFIG.domain}`,
            },
          }),
        }}
      />

      {/* Category header */}
      <section className="bg-[var(--cream)] py-16 lg:py-24">
        <div className="container">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-8 h-[2px] bg-[var(--gold)]" />
            <span className="text-xs font-medium text-[var(--charcoal)]/50 uppercase tracking-widest">Category</span>
          </div>
          <h1 className="font-heading text-4xl lg:text-5xl font-black text-[var(--charcoal)] mb-4">
            {category.name}
          </h1>
          <p className="text-lg text-[var(--charcoal)]/60 max-w-2xl leading-relaxed">
            {category.description}
          </p>
          <p className="text-sm text-[var(--charcoal)]/40 mt-4">
            {articles.length} article{articles.length !== 1 ? 's' : ''}
          </p>
        </div>
      </section>

      {/* Articles grid */}
      <section className="container py-12 lg:py-16">
        {articles.length > 0 && (
          <>
            {/* Featured first article */}
            <div className="mb-12">
              <ArticleCard article={articles[0]} variant="featured" />
            </div>

            {/* Rest in grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.slice(1).map(a => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </div>
          </>
        )}
        {articles.length === 0 && (
          <div className="text-center py-20">
            <p className="text-[var(--charcoal)]/40">No articles published yet in this category.</p>
          </div>
        )}
      </section>
    </Layout>
  );
}
