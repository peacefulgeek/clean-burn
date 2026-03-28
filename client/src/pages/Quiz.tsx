/*
 * DESIGN: "Luminous Awakening" — Dark quiz page with amber accents
 */
import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import { Link } from "wouter";
import { Flame, ArrowRight, ArrowLeft, RotateCcw } from "lucide-react";

const QUESTIONS = [
  { q: "How often do you find yourself watching porn when you didn't plan to?", options: ["Rarely or never", "Once or twice a month", "Weekly", "Several times a week", "Daily or almost daily"] },
  { q: "Have you noticed needing more extreme or novel content to feel the same level of arousal?", options: ["No", "Slightly", "Moderately", "Significantly", "Yes, dramatically"] },
  { q: "Has your porn use affected your real-life sexual experiences or relationships?", options: ["Not at all", "Slightly", "Moderately", "Significantly", "Severely"] },
  { q: "Do you feel a sense of shame, guilt, or emptiness after watching porn?", options: ["Rarely", "Sometimes", "Often", "Almost always", "Every time"] },
  { q: "Have you tried to stop or reduce your porn use and found it difficult?", options: ["Haven't tried", "Tried once, succeeded", "Tried a few times", "Tried many times", "Tried repeatedly without lasting success"] },
  { q: "Do you use porn to cope with stress, loneliness, boredom, or difficult emotions?", options: ["Rarely", "Sometimes", "Often", "Most of the time", "It's my primary coping mechanism"] },
  { q: "Has your porn use affected your motivation, energy, or focus in other areas of life?", options: ["Not at all", "Slightly", "Moderately", "Significantly", "Severely"] },
  { q: "Do you find yourself spending more time watching porn than you intended?", options: ["Rarely", "Sometimes", "Often", "Very often", "Almost every session"] },
  { q: "Have you experienced difficulty with arousal or performance during real sexual encounters?", options: ["No", "Occasionally", "Sometimes", "Frequently", "Consistently"] },
  { q: "How would you describe your overall relationship with pornography?", options: ["Casual, take it or leave it", "Habitual but manageable", "Concerning", "Problematic", "Out of control"] },
];

function getResult(score: number) {
  if (score <= 12) return { level: "Low Concern", color: "text-emerald-400", bg: "bg-emerald-400/10 border-emerald-400/20", message: "Your responses suggest a relatively low level of concern. That said, awareness is the first step. If you're here, something brought you — and that instinct is worth honoring.", suggestion: "the-brain", suggestionText: "Start with The Brain to understand the neuroscience" };
  if (score <= 24) return { level: "Moderate Concern", color: "text-yellow-400", bg: "bg-yellow-400/10 border-yellow-400/20", message: "Your responses suggest a moderate level of concern. You may be noticing patterns that are becoming harder to manage. This is a meaningful moment — the fact that you're paying attention matters more than you might think.", suggestion: "the-cost", suggestionText: "Explore The Cost to understand what's at stake" };
  if (score <= 36) return { level: "Significant Concern", color: "text-orange-400", bg: "bg-orange-400/10 border-orange-400/20", message: "Your responses suggest a significant level of concern. The patterns you're describing are consistent with compulsive use that is affecting your life. Recovery is possible, and it begins with understanding what you're actually dealing with.", suggestion: "the-recovery", suggestionText: "Begin with The Recovery for practical protocols" };
  return { level: "High Concern", color: "text-red-400", bg: "bg-red-400/10 border-red-400/20", message: "Your responses suggest a high level of concern. What you're experiencing is real, it's neurological, and it's not your fault — but it is your responsibility to address. The good news: the brain that learned these patterns can unlearn them.", suggestion: "the-rewire", suggestionText: "Start with The Rewire for somatic and neural practices" };
}

export default function Quiz() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const handleAnswer = (idx: number) => {
    const newAnswers = [...answers];
    newAnswers[current] = idx;
    setAnswers(newAnswers);
  };

  const next = () => {
    if (current < QUESTIONS.length - 1) setCurrent(current + 1);
    else setShowResult(true);
  };

  const prev = () => { if (current > 0) setCurrent(current - 1); };

  const reset = () => { setCurrent(0); setAnswers([]); setShowResult(false); };

  const score = answers.reduce((sum, a) => sum + (a || 0), 0);
  const result = getResult(score);
  const progress = ((current + 1) / QUESTIONS.length) * 100;

  return (
    <Layout>
      <SEOHead
        title="Recovery Self-Assessment Quiz"
        description="Take this 2-minute self-assessment to understand where you are in your porn addiction recovery journey."
        canonicalPath="/quiz"
        noindex
      />

      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden min-h-screen">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--deep-card)] to-[var(--deep)]" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[var(--amber)]/3 rounded-full blur-[120px]" />

        <div className="relative container max-w-2xl">
          {!showResult ? (
            <>
              <div className="flex items-center gap-3 mb-8">
                <Flame className="w-5 h-5 text-[var(--amber)]" />
                <span className="text-xs font-medium text-[var(--amber)] uppercase tracking-[0.15em]">Self-Assessment</span>
              </div>

              {/* Progress */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-[var(--warm-subtle)]">Question {current + 1} of {QUESTIONS.length}</span>
                  <span className="text-xs text-[var(--amber)]">{Math.round(progress)}%</span>
                </div>
                <div className="h-1 bg-[var(--deep-elevated)] rounded-full overflow-hidden">
                  <div className="h-full bg-[var(--amber)] rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
                </div>
              </div>

              {/* Question card */}
              <div className="bg-[var(--deep-card)] border border-[var(--amber)]/8 rounded-2xl p-6 lg:p-10">
                <h2 className="font-heading text-xl lg:text-2xl font-bold text-white mb-8 leading-snug">
                  {QUESTIONS[current].q}
                </h2>

                <div className="space-y-3">
                  {QUESTIONS[current].options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAnswer(idx)}
                      className={`w-full text-left px-5 py-4 rounded-xl border transition-all text-sm ${
                        answers[current] === idx
                          ? "border-[var(--amber)] bg-[var(--amber)]/10 text-[var(--warm-white)]"
                          : "border-[var(--amber)]/8 bg-[var(--deep-elevated)] text-[var(--warm-muted)] hover:border-[var(--amber)]/30 hover:text-[var(--warm-white)]"
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <span className={`w-8 h-8 rounded-full border flex items-center justify-center text-xs transition-colors ${
                          answers[current] === idx
                            ? "border-[var(--amber)] bg-[var(--amber)]/20 text-[var(--amber)]"
                            : "border-[var(--amber)]/20 text-[var(--amber)]/50"
                        }`}>
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span>{opt}</span>
                      </span>
                    </button>
                  ))}
                </div>

                <div className="flex justify-between mt-8">
                  <button
                    onClick={prev}
                    disabled={current === 0}
                    className="flex items-center gap-2 text-sm text-[var(--warm-subtle)] hover:text-[var(--amber)] transition-colors disabled:opacity-30"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                  <button
                    onClick={next}
                    disabled={answers[current] === undefined}
                    className="flex items-center gap-2 bg-[var(--amber)] text-[var(--deep)] px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-[var(--amber-light)] transition-colors disabled:opacity-30"
                  >
                    {current === QUESTIONS.length - 1 ? "See Results" : "Next"} <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <p className="text-xs text-[var(--warm-subtle)] mt-6 text-center">
                This quiz is completely private. No data is stored or transmitted.
              </p>
            </>
          ) : (
            <>
              <div className="flex items-center gap-3 mb-8">
                <Flame className="w-5 h-5 text-[var(--amber)]" />
                <span className="text-xs font-medium text-[var(--amber)] uppercase tracking-[0.15em]">Your Results</span>
              </div>

              <div className="bg-[var(--deep-card)] border border-[var(--amber)]/8 rounded-2xl p-8 lg:p-10 mb-8">
                <div className={`inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4 border ${result.bg} ${result.color}`}>
                  {result.level}
                </div>
                <p className="text-sm text-[var(--warm-subtle)] mb-6">Score: {score} / {QUESTIONS.length * 4}</p>
                <p className="text-[var(--warm-muted)] leading-relaxed text-lg mb-8">
                  {result.message}
                </p>
                <div className="bg-[var(--deep-elevated)] rounded-xl p-5 border border-[var(--amber)]/5">
                  <p className="text-xs text-[var(--warm-subtle)] mb-2">Recommended starting point:</p>
                  <Link href={`/category/${result.suggestion}`} className="text-[var(--amber)] font-medium no-underline hover:text-[var(--amber-glow)] transition-colors">
                    {result.suggestionText} →
                  </Link>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link
                  href={`/category/${result.suggestion}`}
                  className="inline-flex items-center gap-2 bg-[var(--amber)] text-[var(--deep)] px-6 py-3 rounded-lg text-sm font-semibold hover:bg-[var(--amber-light)] transition-colors no-underline"
                >
                  Start Reading <ArrowRight className="w-4 h-4" />
                </Link>
                <button
                  onClick={reset}
                  className="inline-flex items-center gap-2 border border-[var(--amber)]/20 text-[var(--warm-muted)] px-6 py-3 rounded-lg text-sm hover:border-[var(--amber)]/40 hover:text-[var(--amber)] transition-colors"
                >
                  <RotateCcw className="w-4 h-4" /> Retake
                </button>
              </div>

              <p className="text-xs text-[var(--warm-subtle)] mt-8">
                This quiz is for self-reflection only and is not a clinical diagnostic tool. If you are concerned about your behavior, please consult a licensed mental health professional.
              </p>
            </>
          )}
        </div>
      </section>
    </Layout>
  );
}
