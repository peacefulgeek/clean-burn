import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import { Link } from "wouter";
import { ArrowLeft, BookOpen } from "lucide-react";
import { articles } from "@/data";

export default function NotFound() {
  const categories = ["the-brain", "the-cost", "the-recovery", "the-rewire", "the-return"];
  const featured: typeof articles = [];
  for (const cat of categories) {
    const catArticle = articles.find(a => a.category_slug === cat && !featured.includes(a));
    if (catArticle) featured.push(catArticle);
  }
  const extra = articles.find(a => !featured.includes(a));
  if (extra) featured.push(extra);

  return (
    <Layout>
      <SEOHead title="Page Not Found — The Clean Burn" noindex />
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28 bg-[var(--deep)] min-h-screen">
        <div className="container max-w-2xl">
          <div className="text-center mb-12">
            <div className="w-20 h-20 rounded-full bg-[var(--amber)]/10 flex items-center justify-center mx-auto mb-6">
              <span className="font-heading text-3xl font-black text-[var(--amber)]">404</span>
            </div>
            <h1 className="font-heading text-4xl font-black text-white mb-4">
              This Page Doesn't Exist
            </h1>
            <p className="text-lg text-[var(--warm-muted)] leading-relaxed max-w-lg mx-auto">
              Sometimes the path we thought we were on dissolves beneath our feet. That disorientation
              is not failure — it is the moment before reorientation. The willingness to be lost is
              often the first step toward finding something real.
            </p>
          </div>

          <div className="bg-[var(--deep-card)] border border-[var(--amber)]/8 rounded-2xl p-8 mb-8">
            <div className="flex items-center gap-2 mb-6">
              <BookOpen className="w-5 h-5 text-[var(--amber)]" />
              <h2 className="font-heading text-lg font-bold text-white">Continue Your Reading</h2>
            </div>
            <div className="space-y-4">
              {featured.slice(0, 6).map((article) => (
                <Link
                  key={article.slug}
                  href={`/${article.category_slug}/${article.slug}`}
                  className="block group no-underline"
                >
                  <div className="flex items-start gap-4 p-3 -mx-3 rounded-xl hover:bg-[var(--deep-elevated)] transition-colors">
                    <div className="w-2 h-2 rounded-full bg-[var(--amber)] mt-2 shrink-0" />
                    <div>
                      <span className="text-xs font-medium uppercase tracking-wider text-[var(--amber)]">
                        {article.category_name}
                      </span>
                      <h3 className="font-heading text-base font-bold text-[var(--warm-white)] group-hover:text-[var(--amber)] transition-colors mt-0.5">
                        {article.title}
                      </h3>
                      <p className="text-sm text-[var(--warm-subtle)] mt-1 line-clamp-1">
                        {article.meta_description}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-[var(--amber)] text-[var(--deep)] px-6 py-3 rounded-lg text-sm font-semibold hover:bg-[var(--amber-light)] transition-colors no-underline"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
