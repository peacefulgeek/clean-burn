/*
 * DESIGN: "Luminous Awakening" — Dark category page with amber accents
 */
import { useParams, Redirect, Link } from "wouter";
import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import ArticleCard from "@/components/ArticleCard";
import { getArticlesByCategory, getCategoryBySlug, SITE_CONFIG } from "@/data";

const CATEGORY_IMAGES: Record<string, string> = {
  "the-brain": "https://d2xsxph8kpxj0f.cloudfront.net/310519663309220512/WoF57cygVjqdsBgovRWgpm/hero-brain-359PV86y8KzTLEPUJ69jzF.webp",
  "the-cost": "https://d2xsxph8kpxj0f.cloudfront.net/310519663309220512/WoF57cygVjqdsBgovRWgpm/hero-main-3ei3EFqp2bDbFtQ6KZRz8r.webp",
  "the-recovery": "https://d2xsxph8kpxj0f.cloudfront.net/310519663309220512/WoF57cygVjqdsBgovRWgpm/hero-recovery-3LEQuBRfR9zTwD9yU24vMR.webp",
  "the-rewire": "https://d2xsxph8kpxj0f.cloudfront.net/310519663309220512/WoF57cygVjqdsBgovRWgpm/hero-rewire-Gnta5VjUW6fZd2c2j99RRy.webp",
  "the-return": "https://d2xsxph8kpxj0f.cloudfront.net/310519663309220512/WoF57cygVjqdsBgovRWgpm/hero-return-i5udugQ5ekXXu7YV3fEsfe.webp",
};

const PER_PAGE = 12;

export default function CategoryPage() {
  const params = useParams<{ slug: string }>();
  const category = getCategoryBySlug(params.slug || "");
  const [page, setPage] = useState(1);

  useEffect(() => {
    window.scrollTo(0, 0);
    setPage(1);
  }, [params.slug]);

  if (!category) return <Redirect to="/404" />;

  const articles = getArticlesByCategory(category.slug);
  const totalPages = Math.ceil(articles.length / PER_PAGE);
  const paged = articles.slice(0, page * PER_PAGE);
  const heroImg = CATEGORY_IMAGES[category.slug] || CATEGORY_IMAGES["the-brain"];

  return (
    <Layout>
      <SEOHead
        title={`${category.name} — ${SITE_CONFIG.title}`}
        description={category.meta_description || category.description}
        canonicalPath={`/category/${category.slug}`}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: category.name,
            description: category.meta_description || category.description,
            url: `https://${SITE_CONFIG.domain}/category/${category.slug}`,
            isPartOf: {
              "@type": "WebSite",
              name: SITE_CONFIG.title,
              url: `https://${SITE_CONFIG.domain}`,
            },
          }),
        }}
      />

      {/* Hero */}
      <section className="relative h-[45vh] lg:h-[55vh] overflow-hidden">
        <img src={heroImg} alt={category.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--deep)] via-[var(--deep)]/60 to-[var(--deep)]/30" />
        <div className="absolute inset-0 flex items-end">
          <div className="container pb-12 lg:pb-16">
            <div className="flex items-center gap-2 mb-4 text-xs text-[var(--warm-subtle)]">
              <Link href="/" className="hover:text-[var(--amber)] transition-colors no-underline">Home</Link>
              <span className="text-[var(--amber)]/30">/</span>
              <span className="text-[var(--amber)]">{category.name}</span>
            </div>
            <h1 className="font-heading text-4xl lg:text-6xl font-black text-white tracking-tight mb-3">
              {category.name}
            </h1>
            <p className="text-lg text-white/50 max-w-lg">{category.description}</p>
            <p className="text-sm text-[var(--amber)]/60 mt-3">{articles.length} articles</p>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="bg-[var(--deep)] py-16 lg:py-20">
        <div className="container">
          {articles.length > 0 && (
            <>
              {/* Featured first */}
              <div className="mb-12">
                <ArticleCard article={articles[0]} variant="featured" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {paged.slice(1).map((a) => (
                  <ArticleCard key={a.slug} article={a} />
                ))}
              </div>
            </>
          )}

          {articles.length === 0 && (
            <div className="text-center py-20">
              <p className="text-[var(--warm-subtle)]">No articles published yet in this category.</p>
            </div>
          )}

          {page < totalPages && (
            <div className="text-center mt-12">
              <button
                onClick={() => setPage(p => p + 1)}
                className="px-8 py-3 bg-[var(--amber)]/10 text-[var(--amber)] border border-[var(--amber)]/20 rounded-lg text-sm font-medium hover:bg-[var(--amber)]/20 transition-colors"
              >
                Load More
              </button>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
