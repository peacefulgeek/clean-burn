import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import { Link } from "wouter";
import { ArrowRight, ArrowLeft, RotateCcw } from "lucide-react";

const QUESTIONS = [
  {
    q: "How often do you find yourself watching porn when you didn't plan to?",
    options: ["Rarely or never", "Once or twice a month", "Weekly", "Several times a week", "Daily or almost daily"],
  },
  {
    q: "Have you noticed needing more extreme or novel content to feel the same level of arousal?",
    options: ["No", "Slightly", "Moderately", "Significantly", "Yes, dramatically"],
  },
  {
    q: "Has your porn use affected your real-life sexual experiences or relationships?",
    options: ["Not at all", "Slightly", "Moderately", "Significantly", "Severely"],
  },
  {
    q: "Do you feel a sense of shame, guilt, or emptiness after watching porn?",
    options: ["Rarely", "Sometimes", "Often", "Almost always", "Every time"],
  },
  {
    q: "Have you tried to stop or reduce your porn use and found it difficult?",
    options: ["Haven't tried", "Tried once, succeeded", "Tried a few times", "Tried many times", "Tried repeatedly without lasting success"],
  },
  {
    q: "Do you use porn to cope with stress, loneliness, boredom, or difficult emotions?",
    options: ["Rarely", "Sometimes", "Often", "Most of the time", "It's my primary coping mechanism"],
  },
  {
    q: "Has your porn use affected your motivation, energy, or focus in other areas of life?",
    options: ["Not at all", "Slightly", "Moderately", "Significantly", "Severely"],
  },
  {
    q: "Do you find yourself spending more time watching porn than you intended?",
    options: ["Rarely", "Sometimes", "Often", "Very often", "Almost every session"],
  },
  {
    q: "Have you experienced difficulty with arousal or performance during real sexual encounters?",
    options: ["No", "Occasionally", "Sometimes", "Frequently", "Consistently"],
  },
  {
    q: "How would you describe your overall relationship with pornography?",
    options: ["Casual, take it or leave it", "Habitual but manageable", "Concerning", "Problematic", "Out of control"],
  },
];

function getResult(score: number) {
  if (score <= 12) {
    return {
      level: "Low Concern",
      color: "#4CAF50",
      message: "Your responses suggest a relatively low level of concern. That said, awareness is the first step. If you're here, something brought you — and that instinct is worth honoring.",
      suggestion: "the-brain",
      suggestionText: "Start with The Brain to understand the neuroscience",
    };
  }
  if (score <= 24) {
    return {
      level: "Moderate Concern",
      color: "#FFB347",
      message: "Your responses suggest a moderate level of concern. You may be noticing patterns that are becoming harder to manage. This is a meaningful moment — the fact that you're paying attention matters more than you might think.",
      suggestion: "the-cost",
      suggestionText: "Explore The Cost to understand what's at stake",
    };
  }
  if (score <= 36) {
    return {
      level: "Significant Concern",
      color: "#FF9800",
      message: "Your responses suggest a significant level of concern. The patterns you're describing are consistent with compulsive use that is affecting your life. Recovery is possible, and it begins with understanding what you're actually dealing with.",
      suggestion: "the-recovery",
      suggestionText: "Begin with The Recovery for practical protocols",
    };
  }
  return {
    level: "High Concern",
    color: "#F44336",
    message: "Your responses suggest a high level of concern. What you're experiencing is real, it's neurological, and it's not your fault — but it is your responsibility to address. The good news: the brain that learned these patterns can unlearn them.",
    suggestion: "the-rewire",
    suggestionText: "Start with The Rewire for somatic and neural practices",
  };
}

export default function Quiz() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleAnswer = (idx: number) => {
    const newAnswers = [...answers];
    newAnswers[current] = idx;
    setAnswers(newAnswers);
  };

  const next = () => {
    if (current < QUESTIONS.length - 1) {
      setCurrent(current + 1);
    } else {
      setShowResult(true);
    }
  };

  const prev = () => {
    if (current > 0) setCurrent(current - 1);
  };

  const reset = () => {
    setCurrent(0);
    setAnswers([]);
    setShowResult(false);
  };

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

      <section className="bg-[var(--cream)] py-16 lg:py-24">
        <div className="container max-w-2xl mx-auto px-4">
          {!showResult ? (
            <>
              {/* Progress */}
              <div className="mb-8">
                <div className="flex justify-between text-xs text-[var(--charcoal)]/40 mb-2">
                  <span>Question {current + 1} of {QUESTIONS.length}</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="h-1 bg-[var(--charcoal)]/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[var(--gold)] rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Question */}
              <div className="bg-white rounded-2xl p-6 lg:p-10 shadow-sm">
                <h2 className="font-heading text-xl lg:text-2xl font-bold text-[var(--charcoal)] mb-8 leading-snug">
                  {QUESTIONS[current].q}
                </h2>

                <div className="space-y-3">
                  {QUESTIONS[current].options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAnswer(idx)}
                      className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all text-sm ${
                        answers[current] === idx
                          ? 'border-[var(--gold)] bg-[var(--gold)]/10 text-[var(--charcoal)]'
                          : 'border-[var(--cream)] bg-white text-[var(--charcoal)]/70 hover:border-[var(--gold)]/50'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>

                <div className="flex justify-between mt-8">
                  <button
                    onClick={prev}
                    disabled={current === 0}
                    className="flex items-center gap-2 text-sm text-[var(--charcoal)]/40 hover:text-[var(--charcoal)] transition-colors disabled:opacity-30"
                  >
                    <ArrowLeft className="w-4 h-4" /> Back
                  </button>
                  <button
                    onClick={next}
                    disabled={answers[current] === undefined}
                    className="flex items-center gap-2 bg-[var(--charcoal)] text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-[var(--charcoal)]/90 transition-colors disabled:opacity-30"
                  >
                    {current === QUESTIONS.length - 1 ? 'See Results' : 'Next'} <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            /* Results */
            <div className="bg-white rounded-2xl p-6 lg:p-10 shadow-sm">
              <div className="text-center mb-8">
                <div
                  className="inline-block px-4 py-2 rounded-full text-sm font-semibold mb-4"
                  style={{ backgroundColor: result.color + '20', color: result.color }}
                >
                  {result.level}
                </div>
                <h2 className="font-heading text-2xl lg:text-3xl font-bold text-[var(--charcoal)] mb-4">
                  Your Assessment
                </h2>
              </div>

              <p className="text-[var(--charcoal)]/70 leading-relaxed text-lg mb-8">
                {result.message}
              </p>

              <div className="bg-[var(--cream)] rounded-xl p-5 mb-8">
                <p className="text-sm text-[var(--charcoal)]/50 mb-2">Recommended starting point:</p>
                <Link
                  href={`/category/${result.suggestion}`}
                  className="text-[var(--gold)] font-medium no-underline hover:underline"
                >
                  {result.suggestionText} →
                </Link>
              </div>

              <p className="text-xs text-[var(--charcoal)]/40 mb-8 leading-relaxed">
                This quiz is for self-reflection only and is not a clinical diagnostic tool. If you are concerned about your behavior, please consult a licensed mental health professional.
              </p>

              <div className="flex gap-4">
                <button
                  onClick={reset}
                  className="flex items-center gap-2 text-sm text-[var(--charcoal)]/50 hover:text-[var(--charcoal)] transition-colors"
                >
                  <RotateCcw className="w-4 h-4" /> Retake
                </button>
                <Link
                  href={`/category/${result.suggestion}`}
                  className="flex items-center gap-2 bg-[var(--gold)] text-[var(--charcoal)] px-6 py-2.5 rounded-full text-sm font-medium hover:bg-[var(--gold)]/80 transition-colors no-underline"
                >
                  Start Reading <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
