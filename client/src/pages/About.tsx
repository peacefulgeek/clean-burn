import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import { SITE_CONFIG, getPublishedCount, CATEGORIES } from "@/data";
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
            },
          }),
        }}
      />

      {/* Hero */}
      <section className="bg-[var(--cream)] py-20 lg:py-28">
        <div className="container max-w-3xl mx-auto px-4">
          <div className="flex items-center gap-2 mb-6">
            <span className="w-8 h-[2px] bg-[var(--gold)]" />
            <span className="text-xs font-medium text-[var(--charcoal)]/50 uppercase tracking-widest">About</span>
          </div>
          <h1 className="font-heading text-4xl lg:text-5xl font-black text-[var(--charcoal)] leading-tight mb-6">
            This Isn't About Morality.
            <br />
            <span className="text-[var(--gold)]">It's About Taking Your Brain Back.</span>
          </h1>
        </div>
      </section>

      <section className="container max-w-3xl mx-auto px-4 py-16 lg:py-20">
        {/* Mission */}
        <div className="mb-16">
          <h2 className="font-heading text-2xl font-bold text-[var(--charcoal)] mb-6">What This Site Is</h2>
          <div className="space-y-4 text-[var(--charcoal)]/70 leading-relaxed text-lg">
            <p>
              The Clean Burn is a long-form editorial site about porn addiction recovery. It exists because most of what passes for help in this space is either shame-based moralizing or surface-level advice that treats the symptom while ignoring the system.
            </p>
            <p>
              We take a different approach. Every article here is grounded in neuroscience, somatic practices, and consciousness traditions — Buddhism, Taoism, Vedanta, and the latest research on neuroplasticity, dopamine regulation, and embodied healing. The writing is long, careful, and honest. It assumes you are intelligent enough to handle complexity.
            </p>
            <p>
              There are currently {count} published articles across five categories, with new content releasing on a regular schedule. The site is organized around a clear arc: understanding what happened to your brain, recognizing what it has cost you, building a practical recovery, rewiring your neural pathways, and returning to real intimacy and embodied living.
            </p>
          </div>
        </div>

        {/* Author */}
        <div className="bg-white rounded-2xl p-8 lg:p-10 shadow-sm mb-16">
          <div className="flex items-start gap-6">
            <div className="w-20 h-20 rounded-full bg-[var(--gold)]/20 flex items-center justify-center shrink-0">
              <span className="font-heading text-2xl font-bold text-[var(--gold)]">K</span>
            </div>
            <div>
              <h2 className="font-heading text-2xl font-bold text-[var(--charcoal)] mb-1">
                {SITE_CONFIG.author.name}
              </h2>
              <p className="text-sm text-[var(--gold)] font-medium mb-4">{SITE_CONFIG.author.title}</p>
              <div className="space-y-3 text-[var(--charcoal)]/60 leading-relaxed">
                <p>
                  Kalesh is a consciousness teacher and writer whose work explores the intersection of ancient contemplative traditions and modern neuroscience. With decades of practice in meditation, breathwork, and somatic inquiry, he guides others toward embodied awareness — the kind that changes how you actually live, not just how you think about living.
                </p>
                <p>
                  His writing draws equally from Buddhist psychology, Taoist philosophy, Vedantic inquiry, and contemporary research on the brain and nervous system. He does not belong to any single tradition, and his work reflects that independence — a willingness to follow the truth wherever it leads, regardless of which lineage it comes from.
                </p>
                <p>
                  The Clean Burn represents one facet of his broader work: the application of consciousness-based practices to one of the most pervasive and least honestly discussed challenges of modern life.
                </p>
              </div>
              <a
                href={SITE_CONFIG.author.link}
                className="inline-block mt-4 text-sm text-[var(--gold)] hover:text-[var(--charcoal)] transition-colors no-underline font-medium"
              >
                Visit kalesh.love →
              </a>
            </div>
          </div>
        </div>

        {/* What We Don't Do */}
        <div className="mb-16">
          <h2 className="font-heading text-2xl font-bold text-[var(--charcoal)] mb-6">What We Don't Do</h2>
          <div className="space-y-4 text-[var(--charcoal)]/70 leading-relaxed text-lg">
            <p>
              We don't moralize. We don't use shame as a motivational tool. We don't pretend that willpower alone is sufficient to overcome a neurologically entrenched pattern. We don't offer quick fixes, 30-day challenges, or the kind of simplistic advice that makes the advisor feel helpful while leaving the reader exactly where they started.
            </p>
            <p>
              We also don't pathologize sexuality. The goal of this site is not to make you afraid of desire. It is to help you develop a relationship with desire that is conscious, embodied, and free — rather than compulsive, dissociated, and driven by a hijacked reward system.
            </p>
          </div>
        </div>

        {/* Categories */}
        <div className="mb-16">
          <h2 className="font-heading text-2xl font-bold text-[var(--charcoal)] mb-6">The Five Categories</h2>
          <div className="space-y-4">
            {CATEGORIES.map(cat => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="block bg-[var(--cream)] rounded-xl p-5 hover:shadow-sm transition-shadow no-underline"
              >
                <h3 className="font-heading text-lg font-bold text-[var(--charcoal)] mb-1">{cat.name}</h3>
                <p className="text-sm text-[var(--charcoal)]/50">{cat.description}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="border-t border-[var(--cream)] pt-8">
          <p className="text-xs text-[var(--charcoal)]/40 leading-relaxed">
            <strong>Disclaimer:</strong> The Clean Burn is an educational resource and is not a substitute for professional medical, psychological, or psychiatric advice. If you are in crisis, please contact a licensed mental health professional or call the SAMHSA National Helpline at 1-800-662-4357.
          </p>
        </div>
      </section>
    </Layout>
  );
}
