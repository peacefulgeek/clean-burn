/*
 * DESIGN: "Luminous Awakening" — Dark about page with Kalesh photo
 */
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import { SITE_CONFIG, getPublishedCount, CATEGORIES } from "@/data";
import { Flame, ExternalLink } from "lucide-react";
import { Link } from "wouter";

export default function About() {
  const count = getPublishedCount();

  return (
    <Layout>
      <SEOHead
        title="About"
        description="The Clean Burn is an evidence-based editorial site about porn addiction recovery, written by Kalesh — Consciousness Teacher & Writer."
        canonicalPath="/about"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            name: "About The Clean Burn",
            url: `https://${SITE_CONFIG.domain}/about`,
            mainEntity: {
              "@type": "Person",
              name: SITE_CONFIG.author.name,
              url: SITE_CONFIG.author.link,
              jobTitle: SITE_CONFIG.author.title,
              description: SITE_CONFIG.author.bio,
              image: SITE_CONFIG.author.photo,
            },
          }),
        }}
      />

      {/* Hero */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--deep-card)] to-[var(--deep)]" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--amber)]/3 rounded-full blur-[120px]" />
        <div className="relative container max-w-3xl">
          <div className="flex items-center gap-3 mb-6">
            <Flame className="w-5 h-5 text-[var(--amber)]" />
            <span className="text-xs font-medium text-[var(--amber)] uppercase tracking-[0.15em]">About</span>
          </div>
          <h1 className="font-heading text-4xl lg:text-6xl font-black text-white tracking-tight mb-6 leading-tight">
            This Isn't About Morality.
            <br />
            <span className="text-[var(--amber)]">It's About Taking Your Brain Back.</span>
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="bg-[var(--deep)] py-16 lg:py-24">
        <div className="container max-w-3xl">
          <div className="space-y-8 text-[var(--warm-muted)] leading-relaxed">
            <h2 className="font-heading text-2xl font-bold text-white">What This Site Is</h2>
            <p className="text-lg">
              The Clean Burn is a long-form editorial site about porn addiction recovery. It exists because most of what passes for help in this space is either shame-based moralizing or surface-level advice that treats the symptom while ignoring the system.
            </p>
            <p>
              We take a different approach. Every article here is grounded in neuroscience, somatic practices, and consciousness traditions — Buddhism, Taoism, Vedanta, and the latest research on neuroplasticity, dopamine regulation, and embodied healing. The writing is long, careful, and honest. It assumes you are intelligent enough to handle complexity.
            </p>
            <p>
              There are currently {count} published articles across five categories, with new content releasing on a regular schedule.
            </p>

            <div className="glow-line my-12" />

            {/* Author section with photo */}
            <div className="bg-[var(--deep-card)] border border-[var(--amber)]/8 rounded-2xl p-8 lg:p-10">
              <div className="flex flex-col sm:flex-row items-start gap-6">
                <img
                  src={SITE_CONFIG.author.photo}
                  alt={SITE_CONFIG.author.name}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-2 border-[var(--amber)]/20 shrink-0"
                />
                <div>
                  <h2 className="font-heading text-2xl font-bold text-white mb-1">
                    {SITE_CONFIG.author.name}
                  </h2>
                  <p className="text-sm text-[var(--amber)] mb-4">{SITE_CONFIG.author.title}</p>
                  <div className="space-y-3 text-[var(--warm-muted)] leading-relaxed">
                    <p>
                      Kalesh is a mystic and spiritual advisor who brings ancient wisdom and depth to life's biggest decisions. His work explores the intersection of contemplative traditions and modern neuroscience. With decades of practice in meditation, breathwork, and somatic inquiry, he guides others toward embodied awareness — the kind that changes how you actually live, not just how you think about living.
                    </p>
                    <p>
                      His writing draws equally from Buddhist psychology, Taoist philosophy, Vedantic inquiry, and contemporary research on the brain and nervous system. He does not belong to any single tradition, and his work reflects that independence — a willingness to follow the truth wherever it leads, regardless of which lineage it comes from.
                    </p>
                    <p>
                      The Clean Burn represents one facet of his broader work: the application of consciousness-based practices to one of the most pervasive and least honestly discussed challenges of modern life.
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 mt-5">
                    <a
                      href={SITE_CONFIG.author.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--amber)] text-[var(--deep)] text-sm font-semibold rounded-lg hover:bg-[var(--amber-light)] transition-colors no-underline"
                    >
                      Book a Session
                    </a>
                    <a
                      href={SITE_CONFIG.author.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-[var(--amber)] hover:text-[var(--amber-glow)] transition-colors no-underline"
                    >
                      Visit kalesh.love <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="glow-line my-12" />

            <h2 className="font-heading text-2xl font-bold text-white">What We Don't Do</h2>
            <p className="text-lg">
              We don't moralize. We don't use shame as a motivational tool. We don't pretend that willpower alone is sufficient to overcome a neurologically entrenched pattern. We don't offer quick fixes, 30-day challenges, or the kind of simplistic advice that makes the advisor feel helpful while leaving the reader exactly where they started.
            </p>
            <p>
              We also don't pathologize sexuality. The goal of this site is not to make you afraid of desire. It is to help you develop a relationship with desire that is conscious, embodied, and free — rather than compulsive, dissociated, and driven by a hijacked reward system.
            </p>

            <div className="glow-line my-12" />

            <h2 className="font-heading text-2xl font-bold text-white">The Five Categories</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  className="block p-5 bg-[var(--deep-elevated)] border border-[var(--amber)]/5 rounded-xl hover:border-[var(--amber)]/20 transition-all no-underline group"
                >
                  <h3 className="font-heading font-semibold text-[var(--warm-white)] mb-1 group-hover:text-[var(--amber-light)] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-sm text-[var(--warm-subtle)]">{cat.description}</p>
                </Link>
              ))}
            </div>

            <div className="glow-line my-12" />

            {/* Disclaimer - no contact info */}
            <div className="border-t border-[var(--amber)]/8 pt-8">
              <p className="text-xs text-[var(--warm-subtle)] leading-relaxed">
                <strong className="text-[var(--warm-muted)]">Disclaimer:</strong> The Clean Burn is an educational resource and is not a substitute for professional medical, psychological, or psychiatric advice. The content on this site is provided for informational purposes only. Always consult a licensed healthcare professional before making changes to your health or wellness routine. If you are experiencing a mental health crisis, please reach out to a qualified professional in your area.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
