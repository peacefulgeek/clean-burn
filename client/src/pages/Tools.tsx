/*
 * DESIGN: "Luminous Awakening" — Tools We Recommend page
 * Dark cards, amber accents, affiliate disclosure at top
 */
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import { SITE_CONFIG } from "@/data";
import { Flame, ExternalLink, BookOpen, Brain, Dumbbell, Moon, Sparkles, Smartphone } from "lucide-react";

const TAG = "spankyspinola-20";
const az = (asin: string) => `https://www.amazon.com/dp/${asin}?tag=${TAG}`;

interface Product {
  name: string;
  url: string;
  description: string;
  isAmazon: boolean;
  articleLink?: { text: string; href: string };
}

interface Category {
  title: string;
  icon: React.ReactNode;
  products: Product[];
}

const CATEGORIES: Category[] = [
  {
    title: "Books That Actually Help",
    icon: <BookOpen className="w-5 h-5" />,
    products: [
      {
        name: "Your Brain on Porn — Gary Wilson",
        url: az("099316160X"),
        description: "The foundational text on how internet pornography rewires the brain's reward circuitry. Wilson translates dense neuroscience into language anyone can follow. If you read one book from this list, make it this one.",
        isAmazon: true,
        articleLink: { text: "our guide to dopamine and the reward system", href: "/the-brain/dopamine-hijack-how-porn-rewires-your-reward-system" },
      },
      {
        name: "The Body Keeps the Score — Bessel van der Kolk",
        url: az("0143127748"),
        description: "Van der Kolk's masterwork on how trauma lives in the body, not just the mind. Essential reading for anyone whose compulsive behavior has roots in unresolved stress or childhood experience.",
        isAmazon: true,
        articleLink: { text: "why somatic awareness matters in recovery", href: "/the-recovery/somatic-experiencing-for-porn-addiction-recovery" },
      },
      {
        name: "In the Realm of Hungry Ghosts — Gabor Maté",
        url: az("155643880X"),
        description: "Maté's compassionate exploration of addiction as a response to pain rather than a moral failing. He draws from his clinical work with severe addicts to illuminate the universal patterns underneath all compulsive behavior.",
        isAmazon: true,
      },
      {
        name: "Atomic Habits — James Clear",
        url: az("0735211299"),
        description: "The most practical book on habit formation available. Clear's framework of cue-routine-reward mapping is directly applicable to building the daily structures that make recovery sustainable.",
        isAmazon: true,
        articleLink: { text: "building recovery habits that stick", href: "/the-rewire/building-new-neural-pathways-after-porn" },
      },
      {
        name: "Waking the Tiger — Peter Levine",
        url: az("155643233X"),
        description: "Levine's pioneering work on Somatic Experiencing — the idea that trauma resolution happens through the body's innate discharge mechanisms, not through talking alone. A paradigm shift for anyone stuck in cognitive loops.",
        isAmazon: true,
      },
      {
        name: "Cupid's Poisoned Arrow — Marnia Robinson",
        url: az("1556438095"),
        description: "A provocative look at how orgasm-driven neurochemistry affects pair bonding and relationship satisfaction. Robinson draws from neuroscience and ancient traditions to propose a different relationship with sexual energy.",
        isAmazon: true,
      },
    ],
  },
  {
    title: "Journals & Reflection Tools",
    icon: <Sparkles className="w-5 h-5" />,
    products: [
      {
        name: "The Five Minute Journal — Intelligent Change",
        url: az("B0DPGKXGJ5"),
        description: "The simplest gratitude practice that actually works. Morning intentions and evening reflections in under five minutes. Rewires your attention toward what's going right instead of what's pulling you down.",
        isAmazon: true,
      },
      {
        name: "Moleskine Classic Notebook",
        url: az("8883701127"),
        description: "Sometimes you just need a beautiful blank page. The Moleskine is the gold standard for freeform journaling — tracking urges, writing letters to yourself, mapping your triggers. The physical act of writing engages the brain differently than typing.",
        isAmazon: true,
      },
      {
        name: "The Addiction Recovery Workbook",
        url: az("1647397588"),
        description: "A structured CBT-based workbook with exercises designed specifically for addiction recovery. Useful for people who want guided prompts rather than blank pages.",
        isAmazon: true,
      },
    ],
  },
  {
    title: "Supplements for Brain Recovery",
    icon: <Brain className="w-5 h-5" />,
    products: [
      {
        name: "Magnesium Glycinate — Double Wood",
        url: az("B0B6CTYD6S"),
        description: "Magnesium is the most commonly deficient mineral in modern diets, and glycinate is the form best absorbed for nervous system support. Helps with sleep quality, anxiety reduction, and the muscle tension that accompanies withdrawal.",
        isAmazon: true,
        articleLink: { text: "the role of magnesium in neuroplasticity", href: "/the-brain/neuroplasticity-and-porn-addiction-rewiring-your-brain" },
      },
      {
        name: "L-Tyrosine — NOW Supplements (750mg)",
        url: az("B0013OQGO6"),
        description: "A precursor to dopamine that supports healthy neurotransmitter production without the artificial spike. Particularly useful during the early weeks of recovery when your reward system feels flat.",
        isAmazon: true,
      },
      {
        name: "Ashwagandha — NaturaLife Labs Organic",
        url: az("B06ZYHJYD5"),
        description: "An adaptogenic herb with thousands of years of use in Ayurvedic medicine. Clinical research supports its role in reducing cortisol, improving stress resilience, and supporting healthy testosterone levels.",
        isAmazon: true,
      },
      {
        name: "Omega-3 Fish Oil — Sports Research Triple Strength",
        url: az("B07DX89ZHN"),
        description: "High-potency EPA and DHA for brain health, mood regulation, and reducing neuroinflammation. The brain is roughly 60% fat — feeding it the right fats matters enormously during recovery.",
        isAmazon: true,
      },
      {
        name: "Lion's Mane Mushroom — Real Mushrooms",
        url: az("B078SZX3ML"),
        description: "Lion's Mane stimulates nerve growth factor (NGF), which supports the formation of new neural connections. One of the few natural compounds with genuine evidence for neuroplasticity support.",
        isAmazon: true,
      },
    ],
  },
  {
    title: "Body & Movement",
    icon: <Dumbbell className="w-5 h-5" />,
    products: [
      {
        name: "Zafu Meditation Cushion — Buckwheat Fill",
        url: az("B0002046F8"),
        description: "A proper meditation cushion changes everything about your practice. The buckwheat hull filling conforms to your body and provides stable support for extended sits. This is the one piece of equipment that makes daily meditation sustainable.",
        isAmazon: true,
        articleLink: { text: "meditation as a recovery practice", href: "/the-recovery/meditation-for-porn-addiction-recovery" },
      },
      {
        name: "Resistance Bands Set — 5 Levels",
        url: az("B089381VQF"),
        description: "Exercise is one of the most evidence-backed interventions for addiction recovery. These bands let you train anywhere — hotel room, living room, park — with no excuses. Start with the lightest band and build from there.",
        isAmazon: true,
      },
      {
        name: "Ice Bath Tub — Portable Cold Plunge",
        url: az("B0CSK9CK4X"),
        description: "Cold exposure triggers a massive dopamine release through natural pathways — up to 250% above baseline, lasting hours. A daily cold plunge retrains your reward system to find intensity through healthy challenge rather than screens.",
        isAmazon: true,
      },
      {
        name: "Yoga Mat — Manduka PRO",
        url: az("B0002TZ3JI"),
        description: "The Manduka PRO is the last yoga mat you will ever buy. Dense, grippy, and built to last decades. Yoga reconnects you with your body in ways that directly counteract the dissociation that compulsive porn use creates.",
        isAmazon: true,
      },
      {
        name: "Weighted Blanket — YnM 15 lbs",
        url: az("B073429DV2"),
        description: "Deep pressure stimulation activates the parasympathetic nervous system — the same system that compulsive behavior dysregulates. A weighted blanket at night can meaningfully improve sleep quality during the difficult early weeks.",
        isAmazon: true,
      },
    ],
  },
  {
    title: "Sleep & Evening Routine",
    icon: <Moon className="w-5 h-5" />,
    products: [
      {
        name: "Blue Light Blocking Glasses — DREAM RECOVERY",
        url: az("B0G1V1DG6R"),
        description: "Amber-tinted lenses that block the blue light spectrum responsible for suppressing melatonin. Wear them for 1-2 hours before bed. This single change can dramatically improve sleep onset — and nighttime is when most relapses happen.",
        isAmazon: true,
        articleLink: { text: "why sleep is critical for recovery", href: "/the-recovery/sleep-and-porn-addiction-recovery" },
      },
      {
        name: "Kindle Paperwhite",
        url: az("B09TMN58KL"),
        description: "Replace the phone-in-bed habit with a dedicated reading device. The Paperwhite has a warm light mode that does not suppress melatonin, and it cannot access the internet in any meaningful way. A physical barrier between you and your triggers.",
        isAmazon: true,
      },
      {
        name: "White Noise Machine — LectroFan",
        url: az("B00MY8V86Q"),
        description: "Consistent ambient sound masks the environmental triggers that can wake you during light sleep phases. Better sleep means better prefrontal cortex function, which means better impulse control. The chain of causation is direct.",
        isAmazon: true,
      },
    ],
  },
  {
    title: "Apps & Digital Tools",
    icon: <Smartphone className="w-5 h-5" />,
    products: [
      {
        name: "Insight Timer — Free Meditation App",
        url: "https://insighttimer.com/",
        description: "The world's largest free library of guided meditations — over 270,000 tracks from 17,000 teachers. Includes timers, courses, and community features. This is where I'd start if you've never meditated before.",
        isAmazon: false,
      },
      {
        name: "Calm — Meditation & Sleep",
        url: "https://www.calm.com/",
        description: "Premium meditation app with exceptional sleep content. The Daily Calm sessions and Sleep Stories are particularly useful for building an evening routine that replaces screen time with genuine rest.",
        isAmazon: false,
      },
      {
        name: "Muse S — Brain Sensing Headband",
        url: az("B0G4F6Z1WN"),
        description: "A neurofeedback device that gives you real-time data on your brain activity during meditation. It turns an invisible practice into something measurable — which is enormously motivating during the early months when progress feels abstract.",
        isAmazon: true,
      },
      {
        name: "Fortify — Recovery Program",
        url: "https://www.joinfortify.com/",
        description: "A structured recovery program built specifically for pornography addiction. Includes daily check-ins, educational content, and community support. One of the few digital tools designed for this exact problem.",
        isAmazon: false,
      },
      {
        name: "Covenant Eyes — Accountability Software",
        url: "https://www.covenanteyes.com/",
        description: "Screen accountability software that sends reports to a trusted partner. Not a blocker — a transparency tool. The research on accountability partnerships in addiction recovery is strong, and this is the most established platform for it.",
        isAmazon: false,
      },
      {
        name: "Cold Turkey Blocker",
        url: "https://getcoldturkey.com/",
        description: "The most aggressive website and app blocker available. Unlike most blockers, Cold Turkey cannot be easily bypassed — which is exactly the point. Use it to remove access during your highest-risk hours.",
        isAmazon: false,
      },
    ],
  },
];

const totalProducts = CATEGORIES.reduce((sum, cat) => sum + cat.products.length, 0);
const amazonProducts = CATEGORIES.reduce((sum, cat) => sum + cat.products.filter(p => p.isAmazon).length, 0);

export default function Tools() {
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Recovery Tools & Resources We Recommend",
    description: `Curated list of ${totalProducts} books, supplements, tools, and apps for porn addiction recovery. Personally vetted by ${SITE_CONFIG.author.name}.`,
    numberOfItems: totalProducts,
    itemListElement: CATEGORIES.flatMap((cat, ci) =>
      cat.products.map((p, pi) => ({
        "@type": "ListItem",
        position: ci * 10 + pi + 1,
        name: p.name,
        url: p.url,
      }))
    ),
  };

  return (
    <Layout>
      <SEOHead
        title="Best Recovery Tools & Resources We Recommend"
        description={`Curated list of the best books, supplements, tools, apps, and resources for porn addiction recovery. Personally vetted recommendations from ${SITE_CONFIG.author.name}.`}
        canonicalPath="/tools"
        keywords="porn addiction recovery tools, best recovery books, dopamine supplements, meditation tools, addiction recovery resources"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
      />

      {/* Hero */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--deep-card)] to-[var(--deep)]" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--amber)]/3 rounded-full blur-[120px]" />
        <div className="relative container max-w-4xl">
          <div className="flex items-center gap-3 mb-6">
            <Flame className="w-5 h-5 text-[var(--amber)]" />
            <span className="text-xs font-medium text-[var(--amber)] uppercase tracking-[0.15em]">Resources</span>
          </div>
          <h1 className="font-heading text-4xl lg:text-5xl font-black text-white tracking-tight mb-6 leading-tight">
            Tools We Recommend
          </h1>
          <p className="text-lg text-[var(--warm-muted)] leading-relaxed max-w-2xl">
            These are the tools, books, and resources I actually trust. Every recommendation here has been chosen because it serves the work this site is about — reclaiming your brain, your body, and your life from compulsive patterns.
          </p>
        </div>
      </section>

      {/* Affiliate Disclosure */}
      <section className="bg-[var(--deep)]">
        <div className="container max-w-4xl">
          <div className="bg-[var(--amber)]/5 border border-[var(--amber)]/15 rounded-xl px-5 py-4 mb-12">
            <p className="text-sm text-[var(--warm-muted)]">
              This page contains affiliate links. We may earn a small commission if you make a purchase — at no extra cost to you.
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-[var(--deep)] pb-20 lg:pb-28">
        <div className="container max-w-4xl space-y-16">
          {CATEGORIES.map((cat) => (
            <div key={cat.title}>
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-[var(--amber)]/10 flex items-center justify-center text-[var(--amber)]">
                  {cat.icon}
                </div>
                <h2 className="font-heading text-2xl font-bold text-white">{cat.title}</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {cat.products.map((product) => (
                  <div
                    key={product.name}
                    className="bg-[var(--deep-card)] border border-[var(--amber)]/6 rounded-xl p-5 hover:border-[var(--amber)]/15 transition-all group"
                  >
                    <h3 className="font-heading font-semibold text-[var(--warm-white)] mb-2 group-hover:text-[var(--amber-light)] transition-colors">
                      <a
                        href={product.url}
                        target="_blank"
                        rel={product.isAmazon ? "noopener sponsored" : "noopener noreferrer"}
                        className="no-underline text-inherit hover:text-[var(--amber-light)]"
                      >
                        {product.name}
                      </a>
                    </h3>
                    <p className="text-sm text-[var(--warm-subtle)] leading-relaxed mb-3">
                      {product.description}
                    </p>
                    {product.articleLink && (
                      <p className="text-xs text-[var(--warm-subtle)] mb-3">
                        We wrote about this in{" "}
                        <a href={product.articleLink.href} className="text-[var(--amber)]/70 hover:text-[var(--amber)] no-underline transition-colors">
                          {product.articleLink.text}
                        </a>
                        .
                      </p>
                    )}
                    <a
                      href={product.url}
                      target="_blank"
                      rel={product.isAmazon ? "noopener sponsored" : "noopener noreferrer"}
                      className="inline-flex items-center gap-1.5 text-sm text-[var(--amber)] hover:text-[var(--amber-glow)] transition-colors no-underline"
                    >
                      {product.isAmazon ? "View on Amazon" : "Visit Website"}{" "}
                      <ExternalLink className="w-3.5 h-3.5" />
                      {product.isAmazon && <span className="text-[var(--warm-subtle)] text-xs">(paid link)</span>}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}
