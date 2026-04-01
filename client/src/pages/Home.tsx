/*
 * DESIGN: "Luminous Awakening" — Dark, warm, lightly sensual
 * Hero: Full-bleed cinematic image with text overlay
 * Sections: Dark cards with amber glow accents
 */
import { Link } from "wouter";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import ArticleCard from "@/components/ArticleCard";
import { getPublishedArticles, getArticlesByCategory, getPublishedCount, CATEGORIES, SITE_CONFIG } from "@/data";
import { ArrowRight, Flame } from "lucide-react";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663309220512/WoF57cygVjqdsBgovRWgpm/hero-main-3ei3EFqp2bDbFtQ6KZRz8r.webp";

const CATEGORY_IMAGES: Record<string, string> = {
  "the-brain": "https://d2xsxph8kpxj0f.cloudfront.net/310519663309220512/WoF57cygVjqdsBgovRWgpm/hero-brain-359PV86y8KzTLEPUJ69jzF.webp",
  "the-cost": "https://d2xsxph8kpxj0f.cloudfront.net/310519663309220512/WoF57cygVjqdsBgovRWgpm/hero-main-3ei3EFqp2bDbFtQ6KZRz8r.webp",
  "the-recovery": "https://d2xsxph8kpxj0f.cloudfront.net/310519663309220512/WoF57cygVjqdsBgovRWgpm/hero-recovery-3LEQuBRfR9zTwD9yU24vMR.webp",
  "the-rewire": "https://d2xsxph8kpxj0f.cloudfront.net/310519663309220512/WoF57cygVjqdsBgovRWgpm/hero-rewire-Gnta5VjUW6fZd2c2j99RRy.webp",
  "the-return": "https://d2xsxph8kpxj0f.cloudfront.net/310519663309220512/WoF57cygVjqdsBgovRWgpm/hero-return-i5udugQ5ekXXu7YV3fEsfe.webp",
};

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

      {/* ═══ HERO — Full-bleed cinematic ═══ */}
      <section className="relative min-h-[100vh] flex items-end overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src={HERO_IMG}
            alt="Golden light on dark stone"
            className="w-full h-full object-cover"
          />
          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--deep)] via-[var(--deep)]/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--deep)]/80 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative container pb-20 lg:pb-28 pt-32">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6 fade-in-up">
              <Flame className="w-4 h-4 text-[var(--amber)]" />
              <span className="text-xs font-medium text-[var(--amber)] uppercase tracking-[0.15em]">
                Evidence-Based Recovery
              </span>
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight mb-6 fade-in-up fade-in-up-delay-1">
              Breaking Free
              <br />
              <span className="text-[var(--amber)]">Without Shame</span>
            </h1>
            <p className="text-lg lg:text-xl text-white/60 leading-relaxed max-w-lg mb-10 fade-in-up fade-in-up-delay-2">
              {SITE_CONFIG.tagline} Neuroscience, somatic practices, and consciousness — woven into {getPublishedCount()} articles that meet you where you are.
            </p>
            <div className="flex flex-wrap gap-4 fade-in-up fade-in-up-delay-3">
              <Link
                href={featured ? `/${featured.category_slug}/${featured.slug}` : "/category/the-brain"}
                className="inline-flex items-center gap-2 bg-[var(--amber)] text-[var(--deep)] px-7 py-3.5 rounded-lg text-sm font-semibold hover:bg-[var(--amber-light)] transition-all hover:shadow-lg hover:shadow-[var(--amber)]/20 no-underline"
              >
                Start Reading <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/quiz"
                className="inline-flex items-center gap-2 border border-white/20 text-white/80 px-7 py-3.5 rounded-lg text-sm font-medium hover:border-[var(--amber)]/40 hover:text-[var(--amber)] transition-all no-underline"
              >
                Take the Quiz
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <div className="w-px h-8 bg-gradient-to-b from-transparent to-[var(--amber)]" />
        </div>
      </section>

      {/* ═══ LATEST ARTICLES ═══ */}
      {featured && (
        <section className="bg-[var(--deep)] py-20 lg:py-28">
          <div className="container">
            <div className="flex items-center gap-3 mb-10">
              <div className="w-8 h-px bg-[var(--amber)]" />
              <h2 className="font-heading text-sm font-semibold text-[var(--amber)] uppercase tracking-[0.12em]">
                Latest
              </h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              {/* Featured — large */}
              <div className="lg:col-span-3">
                <ArticleCard article={featured} variant="featured" />
              </div>
              {/* Recent — stacked */}
              <div className="lg:col-span-2 space-y-6">
                {recent.slice(0, 4).map((a) => (
                  <ArticleCard key={a.slug} article={a} variant="compact" />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ═══ CATEGORY SECTIONS ═══ */}
      {CATEGORIES.map((cat, idx) => {
        const catArticles = getArticlesByCategory(cat.slug);
        if (catArticles.length === 0) return null;
        const isEven = idx % 2 === 0;
        return (
          <section
            key={cat.slug}
            className={`py-20 lg:py-28 ${isEven ? "bg-[var(--deep-card)]" : "bg-[var(--deep)]"}`}
          >
            <div className="container">
              {/* Category header with background image */}
              <div className="relative rounded-2xl overflow-hidden mb-12 h-48 lg:h-56">
                <img
                  src={CATEGORY_IMAGES[cat.slug] || HERO_IMG}
                  alt={cat.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[var(--deep)]/90 via-[var(--deep)]/70 to-transparent" />
                <div className="absolute inset-0 flex items-center">
                  <div className="px-8 lg:px-12">
                    <h2 className="font-heading text-3xl lg:text-4xl font-bold text-white mb-2">
                      {cat.name}
                    </h2>
                    <p className="text-sm text-white/50 max-w-md leading-relaxed">
                      {cat.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Articles grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {catArticles.slice(0, 3).map((a) => (
                  <ArticleCard key={a.slug} article={a} />
                ))}
              </div>

              <div className="text-center">
                <Link
                  href={`/category/${cat.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-medium text-[var(--amber)] hover:text-[var(--amber-glow)] transition-colors no-underline"
                >
                  View all {cat.name} articles <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </section>
        );
      })}

      {/* ═══ RESOURCES SECTION ═══ */}
      <section className="bg-[var(--deep)] py-20 lg:py-28">
        <div className="container">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-8 h-px bg-[var(--amber)]" />
            <h2 className="font-heading text-sm font-semibold text-[var(--amber)] uppercase tracking-[0.12em]">
              Recovery Resources
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/tools" className="group bg-[var(--deep-card)] border border-[var(--amber)]/8 rounded-2xl p-8 no-underline hover:border-[var(--amber)]/20 transition-all">
              <h3 className="font-heading text-xl font-bold text-[var(--warm-white)] mb-3 group-hover:text-[var(--amber-light)] transition-colors">Tools We Recommend</h3>
              <p className="text-sm text-[var(--warm-subtle)] leading-relaxed mb-4">Books, supplements, devices, and resources personally vetted for recovery. Every recommendation earned its place.</p>
              <span className="inline-flex items-center gap-1.5 text-sm text-[var(--amber)] font-medium">Browse tools <ArrowRight className="w-3.5 h-3.5" /></span>
            </Link>
            <Link href="/quizzes" className="group bg-[var(--deep-card)] border border-[var(--amber)]/8 rounded-2xl p-8 no-underline hover:border-[var(--amber)]/20 transition-all">
              <h3 className="font-heading text-xl font-bold text-[var(--warm-white)] mb-3 group-hover:text-[var(--amber-light)] transition-colors">Recovery Quizzes</h3>
              <p className="text-sm text-[var(--warm-subtle)] leading-relaxed mb-4">Eight focused quizzes covering dopamine sensitivity, trigger awareness, emotional regulation, and more. Private and downloadable.</p>
              <span className="inline-flex items-center gap-1.5 text-sm text-[var(--amber)] font-medium">Take a quiz <ArrowRight className="w-3.5 h-3.5" /></span>
            </Link>
            <Link href="/assessments" className="group bg-[var(--deep-card)] border border-[var(--amber)]/8 rounded-2xl p-8 no-underline hover:border-[var(--amber)]/20 transition-all">
              <h3 className="font-heading text-xl font-bold text-[var(--warm-white)] mb-3 group-hover:text-[var(--amber-light)] transition-colors">In-Depth Assessments</h3>
              <p className="text-sm text-[var(--warm-subtle)] leading-relaxed mb-4">Eight comprehensive assessments with personalized recommendations. Evaluate severity, attachment style, nervous system state, and more.</p>
              <span className="inline-flex items-center gap-1.5 text-sm text-[var(--amber)] font-medium">Start assessment <ArrowRight className="w-3.5 h-3.5" /></span>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--deep-card)] to-[var(--deep)]" />
        {/* Ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[var(--amber)]/5 rounded-full blur-3xl" />
        <div className="relative container text-center">
          <Flame className="w-8 h-8 text-[var(--amber)] mx-auto mb-6" />
          <h2 className="font-heading text-3xl lg:text-5xl font-bold text-white mb-4">
            Ready to begin?
          </h2>
          <p className="text-white/50 max-w-md mx-auto mb-10 leading-relaxed">
            Take our 2-minute self-assessment to understand where you are — and where you're going.
          </p>
          <Link
            href="/quiz"
            className="inline-flex items-center gap-2 bg-[var(--amber)] text-[var(--deep)] px-8 py-4 rounded-lg text-sm font-semibold hover:bg-[var(--amber-light)] transition-all hover:shadow-lg hover:shadow-[var(--amber)]/20 no-underline"
          >
            Take the Quiz <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </Layout>
  );
}
