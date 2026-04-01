/*
 * DESIGN: "Luminous Awakening" — Quizzes hub page with 8 interactive quizzes
 * Each quiz: on-screen results + PDF export. No data stored.
 */
import { useState, useEffect, useRef } from "react";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import { Flame, ArrowRight, ArrowLeft, RotateCcw, Download, ChevronDown } from "lucide-react";

interface QuizQuestion {
  q: string;
  options: string[];
}

interface QuizDef {
  id: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
  getResult: (score: number, max: number) => { level: string; color: string; message: string };
}

const QUIZZES: QuizDef[] = [
  {
    id: "dopamine-sensitivity",
    title: "Dopamine Sensitivity Check",
    description: "How desensitized is your reward system? This quiz assesses signs of dopamine downregulation from chronic overstimulation.",
    questions: [
      { q: "Do everyday pleasures (food, nature, conversation) feel less rewarding than they used to?", options: ["Not at all", "Slightly", "Moderately", "Significantly", "Everything feels flat"] },
      { q: "How often do you seek increasingly intense or novel stimulation to feel engaged?", options: ["Rarely", "Sometimes", "Often", "Very often", "Constantly"] },
      { q: "Do you feel restless or bored when you're not being stimulated by a screen?", options: ["Rarely", "Sometimes", "Often", "Most of the time", "Almost always"] },
      { q: "How would you describe your motivation levels for work, exercise, or creative projects?", options: ["Strong and consistent", "Mostly good", "Variable", "Often low", "Chronically low"] },
      { q: "Do you find it difficult to sit in silence or stillness without reaching for your phone?", options: ["No difficulty", "Slight difficulty", "Moderate difficulty", "Significant difficulty", "Nearly impossible"] },
      { q: "After consuming stimulating content, how long does the 'flat' feeling last?", options: ["No flat feeling", "Minutes", "An hour or two", "Several hours", "The rest of the day or longer"] },
      { q: "How often do you feel genuinely excited about something in your daily life?", options: ["Daily", "Several times a week", "Once a week", "Rarely", "Almost never"] },
      { q: "Do you notice a pattern of needing 'more' to feel the same level of satisfaction?", options: ["No pattern", "Slight pattern", "Clear pattern", "Strong pattern", "Definite escalation"] },
    ],
    getResult: (score, max) => {
      const pct = score / max;
      if (pct <= 0.25) return { level: "Healthy Sensitivity", color: "text-emerald-400", message: "Your dopamine system appears to be functioning well. You can still enjoy everyday pleasures and don't show significant signs of desensitization. Keep nurturing this baseline." };
      if (pct <= 0.5) return { level: "Mild Desensitization", color: "text-yellow-400", message: "You're showing early signs of dopamine desensitization. Your reward system is still largely intact, but you may benefit from reducing high-stimulation inputs and increasing natural dopamine activities like exercise, cold exposure, and meditation." };
      if (pct <= 0.75) return { level: "Moderate Desensitization", color: "text-orange-400", message: "Your responses suggest meaningful dopamine desensitization. The reward system has adapted to chronic overstimulation, making everyday life feel less rewarding. A structured dopamine reset — reducing artificial stimulation while increasing natural rewards — would be beneficial." };
      return { level: "Significant Desensitization", color: "text-red-400", message: "Your reward system shows significant signs of downregulation. This is consistent with chronic overstimulation from high-dopamine sources. A deliberate period of reduced stimulation, combined with exercise, nature exposure, and mindfulness practices, can help restore healthy sensitivity over time." };
    },
  },
  {
    id: "trigger-awareness",
    title: "Trigger Awareness Assessment",
    description: "How well do you understand and recognize your personal triggers? Awareness is the foundation of any effective recovery strategy.",
    questions: [
      { q: "Can you identify the specific emotions that precede your urges?", options: ["Yes, clearly", "Most of the time", "Sometimes", "Rarely", "I'm not sure what triggers me"] },
      { q: "Do you know what time of day you're most vulnerable?", options: ["Yes, precisely", "Generally", "Somewhat", "Not really", "No idea"] },
      { q: "Can you distinguish between genuine sexual desire and compulsive urge?", options: ["Always", "Usually", "Sometimes", "Rarely", "They feel the same to me"] },
      { q: "How aware are you of the physical sensations in your body before an urge hits?", options: ["Very aware", "Somewhat aware", "Occasionally notice", "Rarely notice", "Never notice"] },
      { q: "Do you have a plan for what to do when a trigger occurs?", options: ["Yes, a detailed plan", "A general idea", "Sort of", "Not really", "No plan at all"] },
      { q: "How often do environmental cues (locations, devices, times) catch you off guard?", options: ["Rarely", "Sometimes", "Often", "Very often", "Constantly"] },
      { q: "Can you trace a recent relapse back to its original trigger?", options: ["Yes, clearly", "Mostly", "Partially", "Barely", "Not at all"] },
      { q: "Do you notice the 'negotiation' phase — the internal bargaining before acting out?", options: ["Always catch it", "Usually", "Sometimes", "Rarely", "What negotiation phase?"] },
    ],
    getResult: (score, max) => {
      const pct = score / max;
      if (pct <= 0.25) return { level: "High Awareness", color: "text-emerald-400", message: "You demonstrate strong trigger awareness. You can identify emotional, environmental, and physical precursors to urges. This self-knowledge is a powerful asset in recovery — continue refining it through journaling and mindfulness." };
      if (pct <= 0.5) return { level: "Developing Awareness", color: "text-yellow-400", message: "You have a reasonable foundation of trigger awareness but there are gaps. Consider keeping a trigger journal for two weeks — noting the emotion, time, location, and physical sensation before each urge. Patterns will emerge that you can then plan around." };
      if (pct <= 0.75) return { level: "Limited Awareness", color: "text-orange-400", message: "Your trigger awareness needs significant development. Many of your urges likely feel like they come out of nowhere, which makes them harder to manage. Start with body scanning practices and a simple trigger log. The goal is to create space between stimulus and response." };
      return { level: "Minimal Awareness", color: "text-red-400", message: "You're operating largely on autopilot when it comes to triggers. This isn't a criticism — it's extremely common. The compulsive cycle moves faster than conscious awareness. Begin with the most basic practice: after each urge (whether you act on it or not), write down what happened in the 30 minutes before." };
    },
  },
  {
    id: "relationship-impact",
    title: "Relationship Impact Quiz",
    description: "How has compulsive porn use affected your intimate relationships, emotional availability, and capacity for connection?",
    questions: [
      { q: "Do you feel emotionally present during intimate moments with your partner?", options: ["Fully present", "Mostly present", "Sometimes distracted", "Often disconnected", "Rarely present"] },
      { q: "Has your porn use created secrecy or dishonesty in your relationship?", options: ["No secrecy", "Minor omissions", "Some hiding", "Significant secrecy", "Extensive deception"] },
      { q: "How has your sexual responsiveness to your partner changed?", options: ["No change", "Slightly decreased", "Noticeably decreased", "Significantly decreased", "Severely impacted"] },
      { q: "Do you compare your partner to what you see in pornography?", options: ["Never", "Rarely", "Sometimes", "Often", "Constantly"] },
      { q: "How comfortable are you with emotional vulnerability in your relationship?", options: ["Very comfortable", "Mostly comfortable", "Somewhat guarded", "Quite guarded", "Completely walled off"] },
      { q: "Has your partner expressed concern about your behavior or emotional availability?", options: ["Never", "Once", "A few times", "Regularly", "It's a constant issue"] },
      { q: "Do you use porn as a substitute for addressing relationship difficulties?", options: ["Never", "Rarely", "Sometimes", "Often", "It's my default escape"] },
      { q: "How would you rate your capacity for genuine intimacy right now?", options: ["Strong", "Good", "Moderate", "Diminished", "Very low"] },
    ],
    getResult: (score, max) => {
      const pct = score / max;
      if (pct <= 0.25) return { level: "Minimal Impact", color: "text-emerald-400", message: "Your relationships appear to be relatively unaffected. You maintain emotional presence and genuine connection. Continue nurturing these bonds — they are one of your strongest assets in recovery." };
      if (pct <= 0.5) return { level: "Moderate Impact", color: "text-yellow-400", message: "There are signs that compulsive behavior is beginning to affect your relational capacity. The good news is that these patterns are still relatively early and responsive to change. Honest conversation with your partner and increased emotional presence can begin reversing these effects." };
      if (pct <= 0.75) return { level: "Significant Impact", color: "text-orange-400", message: "Your relationships are meaningfully affected by compulsive patterns. Emotional disconnection, secrecy, and diminished intimacy are taking a toll. Consider couples therapy alongside individual recovery work — rebuilding trust requires both partners to be involved." };
      return { level: "Severe Impact", color: "text-red-400", message: "The impact on your relationships is severe. This level of disconnection and secrecy creates deep wounds for both partners. Professional support is strongly recommended — not just for recovery, but for relationship repair. Healing is possible, but it requires honest engagement." };
    },
  },
  {
    id: "withdrawal-readiness",
    title: "Withdrawal Readiness Check",
    description: "Are you prepared for the neurological and emotional challenges of the withdrawal period? This quiz assesses your readiness.",
    questions: [
      { q: "Do you understand what a 'flatline' is and why it happens during recovery?", options: ["Yes, thoroughly", "Generally", "Somewhat", "Vaguely", "No idea"] },
      { q: "Do you have healthy coping mechanisms in place for when urges hit?", options: ["Several strong ones", "A few", "One or two", "Not really", "None"] },
      { q: "Is there at least one person you can talk to honestly about your recovery?", options: ["Yes, several people", "One trusted person", "Someone I could reach out to", "Not really", "Absolutely no one"] },
      { q: "How is your sleep hygiene?", options: ["Excellent routine", "Good most nights", "Inconsistent", "Poor", "Severely disrupted"] },
      { q: "Do you have a regular exercise practice?", options: ["Daily", "Several times a week", "Once or twice a week", "Occasionally", "No exercise"] },
      { q: "How would you rate your stress management skills?", options: ["Strong", "Good", "Moderate", "Weak", "Non-existent"] },
      { q: "Have you removed or reduced access to triggering content on your devices?", options: ["Completely", "Mostly", "Partially", "Barely", "Not at all"] },
      { q: "Do you have a structured daily routine that fills the time porn used to occupy?", options: ["Yes, detailed", "Mostly", "Partially", "Not really", "No structure at all"] },
    ],
    getResult: (score, max) => {
      const pct = score / max;
      if (pct <= 0.25) return { level: "Well Prepared", color: "text-emerald-400", message: "You have strong foundations in place for the withdrawal period. Your support systems, coping mechanisms, and daily structure give you a significant advantage. Remember: preparation doesn't eliminate difficulty, but it makes difficulty manageable." };
      if (pct <= 0.5) return { level: "Moderately Prepared", color: "text-yellow-400", message: "You have some good foundations but there are gaps in your preparation. Focus on strengthening your weakest areas — whether that's sleep, exercise, social support, or device management — before or during your recovery attempt." };
      if (pct <= 0.75) return { level: "Under-Prepared", color: "text-orange-400", message: "You're entering recovery without adequate preparation, which significantly increases the risk of early relapse. Take two weeks to build your foundations: establish a sleep routine, start exercising, find one accountability partner, and set up content blockers." };
      return { level: "Not Yet Ready", color: "text-red-400", message: "Your current infrastructure won't support a sustained recovery attempt. This isn't a reason to despair — it's a reason to prepare. Spend the next month building the basics: sleep, exercise, one trusted person, and a structured daily routine. Then begin." };
    },
  },
  {
    id: "emotional-regulation",
    title: "Emotional Regulation Quiz",
    description: "How well do you manage difficult emotions without turning to compulsive behavior? Emotional regulation is the core skill of lasting recovery.",
    questions: [
      { q: "When you feel anxious, what is your first instinct?", options: ["Breathe and observe it", "Talk to someone", "Distract myself healthily", "Reach for my phone", "Seek immediate relief through compulsive behavior"] },
      { q: "How comfortable are you sitting with uncomfortable emotions without acting on them?", options: ["Very comfortable", "Mostly comfortable", "Somewhat", "Quite uncomfortable", "Cannot tolerate it"] },
      { q: "Can you name what you're feeling in the moment?", options: ["Usually with precision", "Generally", "Sometimes", "Rarely", "Emotions feel like one undifferentiated mass"] },
      { q: "How do you typically respond to loneliness?", options: ["Reach out to someone", "Engage in a meaningful activity", "Accept it and sit with it", "Scroll or consume content", "Act out compulsively"] },
      { q: "When you feel shame, what happens?", options: ["I process it and move on", "I talk about it", "I withdraw temporarily", "I spiral into more shame", "I act out to escape the feeling"] },
      { q: "How often do you use substances or behaviors to change how you feel?", options: ["Rarely", "Occasionally", "Sometimes", "Often", "It's my primary strategy"] },
      { q: "Can you delay gratification when you want something?", options: ["Easily", "Usually", "With effort", "With great difficulty", "Almost never"] },
      { q: "How do you respond to boredom?", options: ["Find something meaningful", "Accept it peacefully", "Get mildly restless", "Become very agitated", "Immediately seek stimulation"] },
    ],
    getResult: (score, max) => {
      const pct = score / max;
      if (pct <= 0.25) return { level: "Strong Regulation", color: "text-emerald-400", message: "You demonstrate strong emotional regulation skills. You can identify, tolerate, and process difficult emotions without defaulting to compulsive behavior. This is perhaps the single most important skill in recovery." };
      if (pct <= 0.5) return { level: "Developing Regulation", color: "text-yellow-400", message: "Your emotional regulation is developing but inconsistent. You can manage some emotions well but others still overwhelm your coping capacity. Mindfulness meditation and body-based practices like breathwork can strengthen these skills significantly." };
      if (pct <= 0.75) return { level: "Limited Regulation", color: "text-orange-400", message: "Emotional regulation is a significant challenge for you. Difficult feelings tend to trigger automatic escape behaviors. This is the core pattern that sustains compulsive use. Somatic practices — learning to feel emotions in the body without reacting — are the most direct path forward." };
      return { level: "Dysregulated", color: "text-red-400", message: "Your emotional regulation system is significantly compromised. Emotions feel overwhelming and the impulse to escape them is powerful. This is not a character flaw — it's a nervous system pattern that can be rewired. Start with the simplest practices: naming emotions, breathing through urges, and building tolerance in small increments." };
    },
  },
  {
    id: "neuroplasticity-progress",
    title: "Neuroplasticity Progress Tracker",
    description: "If you've been in recovery for a while, this quiz tracks signs that your brain is actually rewiring. Are the neural pathways changing?",
    questions: [
      { q: "Have you noticed everyday activities becoming more enjoyable over time?", options: ["Significantly more", "Somewhat more", "About the same", "Less enjoyable", "Everything still feels flat"] },
      { q: "How has your ability to focus on a single task changed?", options: ["Much improved", "Somewhat improved", "No change", "Slightly worse", "Significantly worse"] },
      { q: "Are your urges becoming less frequent or less intense?", options: ["Much less", "Somewhat less", "About the same", "More frequent", "More intense"] },
      { q: "How has your sleep quality changed since reducing consumption?", options: ["Much better", "Somewhat better", "No change", "Somewhat worse", "Much worse"] },
      { q: "Do you notice more emotional range — feeling both highs and lows more fully?", options: ["Yes, significantly", "Somewhat", "Not sure", "Not really", "Less emotional range"] },
      { q: "Has your motivation for non-screen activities increased?", options: ["Significantly", "Somewhat", "No change", "Decreased", "Severely decreased"] },
      { q: "How has your social engagement and desire for real connection changed?", options: ["Much stronger", "Somewhat stronger", "No change", "Somewhat weaker", "Much weaker"] },
      { q: "Do you experience moments of genuine contentment without external stimulation?", options: ["Frequently", "Sometimes", "Occasionally", "Rarely", "Never"] },
    ],
    getResult: (score, max) => {
      const pct = score / max;
      if (pct <= 0.25) return { level: "Strong Rewiring", color: "text-emerald-400", message: "Excellent signs of neuroplasticity at work. Your brain is actively rewiring — everyday pleasures are returning, focus is improving, and urges are diminishing. Keep going. The changes you're experiencing are the direct result of new neural pathways forming." };
      if (pct <= 0.5) return { level: "Early Rewiring", color: "text-yellow-400", message: "You're seeing early signs of neural change. Some areas are improving while others remain stubborn. This is completely normal — the brain doesn't rewire uniformly. The areas that were most affected take longest to recover. Patience and consistency are everything right now." };
      if (pct <= 0.75) return { level: "Pre-Rewiring", color: "text-orange-400", message: "You haven't yet seen significant rewiring signs, which may mean you're still in the early stages of recovery or that your approach needs adjustment. Ensure you're combining abstinence with positive neuroplasticity drivers: exercise, novel experiences, social connection, and mindfulness." };
      return { level: "Flatline Phase", color: "text-red-400", message: "You appear to be in the flatline phase — a period where the brain is recalibrating but hasn't yet established new reward pathways. This is the hardest part of recovery and the point where most people quit. The flatline is not permanent. It is evidence that your brain is changing." };
    },
  },
  {
    id: "somatic-awareness",
    title: "Somatic Awareness Quiz",
    description: "How connected are you to your body's signals? Somatic awareness is the bridge between intellectual understanding and embodied recovery.",
    questions: [
      { q: "Can you feel your heartbeat without touching your chest?", options: ["Easily", "With some focus", "Sometimes", "Rarely", "Never tried or can't"] },
      { q: "Do you notice tension patterns in your body throughout the day?", options: ["Yes, and I release them", "I notice them", "Sometimes", "Rarely", "I'm not aware of body tension"] },
      { q: "How connected do you feel to your breathing right now?", options: ["Very connected", "Somewhat", "I had to check", "Barely aware", "Completely disconnected"] },
      { q: "Can you feel the difference between hunger, thirst, and emotional craving?", options: ["Clearly", "Usually", "Sometimes", "Rarely", "They all feel the same"] },
      { q: "When an urge arises, can you locate where you feel it in your body?", options: ["Yes, precisely", "Generally", "Sometimes", "Rarely", "Urges feel purely mental"] },
      { q: "How often do you practice any form of body-based awareness (yoga, breathwork, body scan)?", options: ["Daily", "Several times a week", "Weekly", "Occasionally", "Never"] },
      { q: "Do you notice how different foods, activities, or environments affect your physical state?", options: ["Very attuned", "Somewhat", "Occasionally", "Rarely", "Not at all"] },
      { q: "Can you sense when your nervous system is activated (fight/flight) vs. calm (rest/digest)?", options: ["Clearly", "Usually", "Sometimes", "Rarely", "I don't know the difference"] },
    ],
    getResult: (score, max) => {
      const pct = score / max;
      if (pct <= 0.25) return { level: "High Somatic Awareness", color: "text-emerald-400", message: "You have strong body awareness — a significant advantage in recovery. You can feel urges as physical sensations, track your nervous system state, and use body-based practices effectively. This embodied awareness is what allows you to respond rather than react." };
      if (pct <= 0.5) return { level: "Developing Awareness", color: "text-yellow-400", message: "Your somatic awareness is developing. You have some connection to your body's signals but it's inconsistent. Regular body scan meditation (even 5 minutes daily) can dramatically improve this. The goal is to make body awareness your default mode, not something you have to consciously activate." };
      if (pct <= 0.75) return { level: "Limited Awareness", color: "text-orange-400", message: "You're largely disconnected from your body's signals, which means urges and emotions tend to bypass your awareness and drive behavior directly. This is extremely common in compulsive patterns. Start with the simplest practice: three conscious breaths, three times a day. Build from there." };
      return { level: "Dissociated", color: "text-red-400", message: "You show significant dissociation from bodily experience. This isn't unusual — compulsive porn use often develops alongside a pattern of 'living in the head' and disconnecting from physical sensation. Gentle, gradual reconnection through yoga, walking meditation, or progressive muscle relaxation is the path forward." };
    },
  },
  {
    id: "recovery-sustainability",
    title: "Recovery Sustainability Check",
    description: "Is your recovery approach sustainable for the long term, or are you white-knuckling it? This quiz assesses the durability of your current strategy.",
    questions: [
      { q: "Does your recovery feel like deprivation or like building something better?", options: ["Building something better", "Mostly positive", "Mixed", "Mostly deprivation", "Pure willpower and suffering"] },
      { q: "How integrated is your recovery into your daily life?", options: ["Seamlessly integrated", "Mostly integrated", "Somewhat", "Barely", "It's a separate struggle"] },
      { q: "Do you have positive activities that genuinely fulfill you?", options: ["Several meaningful ones", "A few", "One or two", "Not really", "Nothing feels fulfilling"] },
      { q: "How do you handle setbacks or slips?", options: ["Learn and adjust", "Brief disappointment, then move on", "Significant guilt but recover", "Spiral into shame", "Complete collapse and binge"] },
      { q: "Is your motivation for recovery internal or external?", options: ["Deeply internal", "Mostly internal", "Mixed", "Mostly external", "Entirely external pressure"] },
      { q: "How often do you feel grateful for your recovery progress?", options: ["Daily", "Often", "Sometimes", "Rarely", "Never — I only see how far I have to go"] },
      { q: "Do you have a vision of who you're becoming through this process?", options: ["Clear and inspiring", "General sense", "Vague", "Not really", "I'm just trying to stop a behavior"] },
      { q: "How would you describe your relationship with yourself right now?", options: ["Compassionate and honest", "Mostly kind", "Mixed", "Self-critical", "Deeply adversarial"] },
    ],
    getResult: (score, max) => {
      const pct = score / max;
      if (pct <= 0.25) return { level: "Highly Sustainable", color: "text-emerald-400", message: "Your recovery approach is built on solid foundations. You've moved beyond willpower into genuine transformation — finding meaning, building new patterns, and relating to yourself with compassion. This is the kind of recovery that lasts." };
      if (pct <= 0.5) return { level: "Mostly Sustainable", color: "text-yellow-400", message: "Your recovery has good elements of sustainability but some areas need strengthening. Focus on deepening your internal motivation and building more positive activities that genuinely fulfill you. Recovery that's only about stopping something is harder to maintain than recovery that's about becoming someone." };
      if (pct <= 0.75) return { level: "At Risk", color: "text-orange-400", message: "Your current approach has sustainability concerns. Heavy reliance on willpower, external motivation, or shame-based thinking makes long-term recovery fragile. Shift your focus from 'not doing' to 'becoming' — what kind of person are you building? What activities genuinely light you up?" };
      return { level: "Unsustainable", color: "text-red-400", message: "Your current approach is unlikely to sustain long-term recovery. White-knuckling, shame spirals, and lack of positive replacement activities create a pressure cooker that eventually releases. This isn't a judgment — it's an invitation to rebuild your approach from the ground up, starting with self-compassion." };
    },
  },
];

function generatePDF(quiz: QuizDef, score: number, maxScore: number, result: ReturnType<QuizDef["getResult"]>) {
  // Build a simple text-based PDF using a data URI
  const lines = [
    `THE CLEAN BURN — ${quiz.title}`,
    `${"=".repeat(50)}`,
    ``,
    `Score: ${score} / ${maxScore}`,
    `Result: ${result.level}`,
    ``,
    result.message,
    ``,
    `${"—".repeat(50)}`,
    ``,
    `This quiz is for self-reflection only and is not a clinical diagnostic tool.`,
    `If you are concerned about your behavior, please consult a licensed mental health professional.`,
    ``,
    `cleanburn.love`,
  ];

  const content = lines.join("\n");
  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `clean-burn-${quiz.id}-results.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function QuizRunner({ quiz, onBack }: { quiz: QuizDef; onBack: () => void }) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [current, showResult]);

  const handleAnswer = (idx: number) => {
    const newAnswers = [...answers];
    newAnswers[current] = idx;
    setAnswers(newAnswers);
  };

  const next = () => {
    if (current < quiz.questions.length - 1) setCurrent(current + 1);
    else setShowResult(true);
  };

  const prev = () => { if (current > 0) setCurrent(current - 1); };
  const reset = () => { setCurrent(0); setAnswers([]); setShowResult(false); };

  const maxScore = quiz.questions.length * 4;
  const score = answers.reduce((sum, a) => sum + (a || 0), 0);
  const result = quiz.getResult(score, maxScore);
  const progress = ((current + 1) / quiz.questions.length) * 100;

  return (
    <div ref={topRef}>
      {!showResult ? (
        <>
          <button onClick={onBack} className="flex items-center gap-2 text-sm text-[var(--warm-subtle)] hover:text-[var(--amber)] transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" /> All Quizzes
          </button>

          <h2 className="font-heading text-2xl lg:text-3xl font-bold text-white mb-4">{quiz.title}</h2>

          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-[var(--warm-subtle)]">Question {current + 1} of {quiz.questions.length}</span>
              <span className="text-xs text-[var(--amber)]">{Math.round(progress)}%</span>
            </div>
            <div className="h-1 bg-[var(--deep-elevated)] rounded-full overflow-hidden">
              <div className="h-full bg-[var(--amber)] rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>
          </div>

          <div className="bg-[var(--deep-card)] border border-[var(--amber)]/8 rounded-2xl p-6 lg:p-10">
            <h3 className="font-heading text-xl lg:text-2xl font-bold text-white mb-8 leading-snug">
              {quiz.questions[current].q}
            </h3>
            <div className="space-y-3">
              {quiz.questions[current].options.map((opt, idx) => (
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
              <button onClick={prev} disabled={current === 0} className="flex items-center gap-2 text-sm text-[var(--warm-subtle)] hover:text-[var(--amber)] transition-colors disabled:opacity-30">
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
              <button onClick={next} disabled={answers[current] === undefined} className="flex items-center gap-2 bg-[var(--amber)] text-[var(--deep)] px-6 py-2.5 rounded-lg text-sm font-semibold hover:bg-[var(--amber-light)] transition-colors disabled:opacity-30">
                {current === quiz.questions.length - 1 ? "See Results" : "Next"} <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
          <p className="text-xs text-[var(--warm-subtle)] mt-6 text-center">Completely private. No data is stored or transmitted.</p>
        </>
      ) : (
        <>
          <button onClick={onBack} className="flex items-center gap-2 text-sm text-[var(--warm-subtle)] hover:text-[var(--amber)] transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" /> All Quizzes
          </button>

          <h2 className="font-heading text-2xl lg:text-3xl font-bold text-white mb-6">{quiz.title} — Results</h2>

          <div className="bg-[var(--deep-card)] border border-[var(--amber)]/8 rounded-2xl p-8 lg:p-10 mb-8">
            <div className={`inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4 border bg-opacity-10 ${result.color}`} style={{ borderColor: 'currentColor', backgroundColor: 'color-mix(in srgb, currentColor 10%, transparent)' }}>
              {result.level}
            </div>
            <p className="text-sm text-[var(--warm-subtle)] mb-6">Score: {score} / {maxScore}</p>
            <p className="text-[var(--warm-muted)] leading-relaxed text-lg">{result.message}</p>
          </div>

          <div className="flex flex-wrap gap-4">
            <button onClick={() => generatePDF(quiz, score, maxScore, result)} className="inline-flex items-center gap-2 bg-[var(--amber)] text-[var(--deep)] px-6 py-3 rounded-lg text-sm font-semibold hover:bg-[var(--amber-light)] transition-colors">
              <Download className="w-4 h-4" /> Download Results
            </button>
            <button onClick={reset} className="inline-flex items-center gap-2 border border-[var(--amber)]/20 text-[var(--warm-muted)] px-6 py-3 rounded-lg text-sm hover:border-[var(--amber)]/40 hover:text-[var(--amber)] transition-colors">
              <RotateCcw className="w-4 h-4" /> Retake
            </button>
          </div>

          <p className="text-xs text-[var(--warm-subtle)] mt-8">
            This quiz is for self-reflection only and is not a clinical diagnostic tool. If you are concerned about your behavior, please consult a licensed mental health professional.
          </p>
        </>
      )}
    </div>
  );
}

export default function Quizzes() {
  const [activeQuiz, setActiveQuiz] = useState<string | null>(null);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const quiz = QUIZZES.find(q => q.id === activeQuiz);

  return (
    <Layout>
      <SEOHead
        title="Recovery Quizzes — Self-Assessment Tools"
        description="8 interactive quizzes to assess your recovery progress, trigger awareness, emotional regulation, and more. Completely private — no data stored."
        canonicalPath="/quizzes"
      />

      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden min-h-screen">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--deep-card)] to-[var(--deep)]" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[var(--amber)]/3 rounded-full blur-[120px]" />

        <div className="relative container max-w-3xl">
          {!quiz ? (
            <>
              <div className="flex items-center gap-3 mb-6">
                <Flame className="w-5 h-5 text-[var(--amber)]" />
                <span className="text-xs font-medium text-[var(--amber)] uppercase tracking-[0.15em]">Self-Assessment</span>
              </div>
              <h1 className="font-heading text-4xl lg:text-5xl font-black text-white tracking-tight mb-6">Recovery Quizzes</h1>
              <p className="text-lg text-[var(--warm-muted)] leading-relaxed mb-12 max-w-2xl">
                Eight focused quizzes to help you understand where you are in your recovery journey. Each takes 2-3 minutes. Results are displayed immediately and can be downloaded. Nothing is stored — this is between you and yourself.
              </p>

              <div className="space-y-4">
                {QUIZZES.map((q) => (
                  <button
                    key={q.id}
                    onClick={() => setActiveQuiz(q.id)}
                    className="w-full text-left bg-[var(--deep-card)] border border-[var(--amber)]/8 rounded-xl p-5 hover:border-[var(--amber)]/20 transition-all group"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-heading font-semibold text-[var(--warm-white)] mb-1 group-hover:text-[var(--amber-light)] transition-colors">
                          {q.title}
                        </h3>
                        <p className="text-sm text-[var(--warm-subtle)]">{q.description}</p>
                      </div>
                      <ChevronDown className="w-5 h-5 text-[var(--amber)]/50 -rotate-90 shrink-0 ml-4" />
                    </div>
                  </button>
                ))}
              </div>

              <p className="text-xs text-[var(--warm-subtle)] mt-8 text-center">
                All quizzes are for self-reflection only. No data is stored or transmitted. Not a substitute for professional assessment.
              </p>
            </>
          ) : (
            <QuizRunner quiz={quiz} onBack={() => setActiveQuiz(null)} />
          )}
        </div>
      </section>
    </Layout>
  );
}
