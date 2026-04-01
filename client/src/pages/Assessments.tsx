/*
 * DESIGN: "Luminous Awakening" — Assessments hub page with 8 clinical-style assessments
 * Each assessment: on-screen results + downloadable export. No data stored.
 */
import { useState, useEffect, useRef } from "react";
import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import { Flame, ArrowRight, ArrowLeft, RotateCcw, Download, ChevronDown, ClipboardCheck } from "lucide-react";

interface AssessmentQuestion {
  q: string;
  options: string[];
  weights?: number[];
}

interface AssessmentDef {
  id: string;
  title: string;
  description: string;
  questions: AssessmentQuestion[];
  getResult: (score: number, max: number) => { level: string; color: string; message: string; recommendations: string[] };
}

const ASSESSMENTS: AssessmentDef[] = [
  {
    id: "compulsive-use-severity",
    title: "Compulsive Use Severity Index",
    description: "A comprehensive assessment of the severity of compulsive pornography use across behavioral, emotional, and functional dimensions.",
    questions: [
      { q: "How many hours per week do you spend consuming pornographic content?", options: ["Less than 1 hour", "1-3 hours", "4-7 hours", "8-14 hours", "15+ hours"] },
      { q: "How often do you consume pornography when you had explicitly decided not to?", options: ["Never", "Rarely (once a month)", "Sometimes (weekly)", "Often (several times a week)", "Almost every day"] },
      { q: "Have you escalated to content that would have previously disturbed or disinterested you?", options: ["No escalation", "Slight escalation", "Moderate escalation", "Significant escalation", "Extreme escalation"] },
      { q: "How much does your pornography use interfere with work, school, or responsibilities?", options: ["Not at all", "Minimally", "Moderately", "Significantly", "Severely"] },
      { q: "How often do you feel unable to stop a session once it has started?", options: ["Never", "Rarely", "Sometimes", "Often", "Almost always"] },
      { q: "Have you continued despite knowing it was causing problems in your life?", options: ["No", "Once or twice", "Several times", "Many times", "Continuously"] },
      { q: "How much time do you spend thinking about or planning your next session?", options: ["Almost none", "A little", "A moderate amount", "A lot", "It dominates my thoughts"] },
      { q: "Have you given up important activities (social, professional, recreational) because of your use?", options: ["No", "Rarely", "Sometimes", "Often", "Frequently"] },
      { q: "Do you experience withdrawal symptoms (irritability, anxiety, restlessness) when you try to stop?", options: ["None", "Mild", "Moderate", "Significant", "Severe"] },
      { q: "How would you rate the overall impact on your quality of life?", options: ["No impact", "Minor impact", "Moderate impact", "Major impact", "Devastating impact"] },
    ],
    getResult: (score, max) => {
      const pct = score / max;
      if (pct <= 0.2) return { level: "Minimal Severity", color: "text-emerald-400", message: "Your assessment indicates minimal severity. Your use appears to be non-compulsive and is not significantly impacting your functioning.", recommendations: ["Continue monitoring your patterns", "Maintain healthy coping strategies", "Stay educated about the neuroscience of habit formation"] };
      if (pct <= 0.4) return { level: "Mild Severity", color: "text-yellow-400", message: "Your assessment indicates mild severity. There are some concerning patterns developing, but they have not yet significantly impaired your daily functioning.", recommendations: ["Begin tracking your usage patterns in a journal", "Identify your top 3 triggers and develop alternatives", "Consider reading 'Your Brain on Porn' by Gary Wilson", "Establish a consistent sleep and exercise routine"] };
      if (pct <= 0.6) return { level: "Moderate Severity", color: "text-orange-400", message: "Your assessment indicates moderate severity. Compulsive patterns are established and are meaningfully affecting your life. This level typically responds well to structured self-help combined with accountability.", recommendations: ["Implement content blocking on all devices", "Find an accountability partner or join a support group", "Begin a daily mindfulness practice (even 5 minutes)", "Create a structured daily routine that fills high-risk time slots", "Consider professional counseling specializing in behavioral addiction"] };
      if (pct <= 0.8) return { level: "Significant Severity", color: "text-red-400", message: "Your assessment indicates significant severity. The compulsive pattern is deeply entrenched and is causing substantial harm across multiple life domains. Professional support is strongly recommended.", recommendations: ["Seek a therapist specializing in compulsive sexual behavior", "Consider a structured recovery program", "Implement comprehensive environmental controls", "Build a support network of at least 2-3 trusted people", "Address co-occurring issues (depression, anxiety, trauma)"] };
      return { level: "Severe", color: "text-red-500", message: "Your assessment indicates severe compulsive use. This level of severity typically requires professional intervention and comprehensive support.", recommendations: ["Seek professional help immediately — a CSAT (Certified Sex Addiction Therapist) is ideal", "Consider intensive outpatient or residential treatment options", "Remove all private access to triggering devices temporarily", "Disclose to at least one trusted person in your life", "Address any co-occurring mental health conditions"] };
    },
  },
  {
    id: "porn-induced-ed",
    title: "Porn-Induced Erectile Dysfunction Assessment",
    description: "Assess whether your sexual performance difficulties may be related to pornography consumption patterns rather than physical causes.",
    questions: [
      { q: "Do you achieve full arousal easily when watching pornography?", options: ["Yes, always", "Usually", "Sometimes need specific content", "Need increasingly specific content", "Difficulty even with pornography"] },
      { q: "Do you achieve the same level of arousal with a real partner?", options: ["Yes, equally", "Slightly less", "Noticeably less", "Significantly less", "Cannot achieve arousal with a partner"] },
      { q: "Have your difficulties with real partners developed gradually alongside increasing porn use?", options: ["No connection", "Possibly", "Likely", "Clearly correlated", "Directly caused"] },
      { q: "Can you achieve arousal through fantasy alone (no visual stimulation)?", options: ["Easily", "With some effort", "With difficulty", "Rarely", "Not at all"] },
      { q: "Do you need to mentally replay pornographic scenes during real sexual encounters?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
      { q: "How has your sensitivity to physical touch changed over time?", options: ["No change", "Slightly decreased", "Moderately decreased", "Significantly decreased", "Severely decreased"] },
      { q: "At what age did you begin regular pornography consumption?", options: ["After 25", "18-25", "15-17", "12-14", "Before 12"] },
      { q: "Have you noticed improvement in sexual function during periods of abstinence from porn?", options: ["Yes, significant", "Yes, some", "Not sure", "No improvement", "Haven't tried abstaining"] },
    ],
    getResult: (score, max) => {
      const pct = score / max;
      if (pct <= 0.25) return { level: "Low PIED Indicators", color: "text-emerald-400", message: "Your responses do not strongly suggest porn-induced erectile dysfunction. Your sexual function with partners appears relatively intact.", recommendations: ["Continue monitoring any changes", "Maintain a healthy relationship with sexuality", "If concerns persist, consult a urologist to rule out physical causes"] };
      if (pct <= 0.5) return { level: "Moderate PIED Indicators", color: "text-yellow-400", message: "Your responses suggest moderate indicators of porn-induced sexual dysfunction. There appears to be a growing gap between your arousal response to pornography versus real partners.", recommendations: ["Begin a 90-day pornography abstinence period", "Reduce masturbation frequency and avoid pornographic fantasy", "Focus on sensate focus exercises with your partner", "Exercise regularly to improve blood flow and testosterone", "Be patient — recovery typically takes 2-6 months"] };
      if (pct <= 0.75) return { level: "Strong PIED Indicators", color: "text-orange-400", message: "Your responses strongly suggest porn-induced sexual dysfunction. The pattern of full arousal to pornography but diminished response to real partners is a hallmark of PIED.", recommendations: ["Complete abstinence from pornography is essential", "Avoid all artificial sexual stimulation for at least 90 days", "Communicate openly with your partner about the recovery process", "Consider working with a sex therapist who understands PIED", "Expect a flatline period — temporary loss of all libido — as the brain recalibrates"] };
      return { level: "Severe PIED Indicators", color: "text-red-400", message: "Your responses indicate severe porn-induced sexual dysfunction. Your arousal system has been significantly conditioned to respond primarily to pornographic stimulation.", recommendations: ["Immediate and complete cessation of all pornography", "Consult both a urologist (to rule out physical causes) and a sex therapist", "Extended recovery period may be needed (6-12+ months)", "Focus on rebuilding real-world intimacy gradually", "Address any underlying anxiety or shame around sexual performance"] };
    },
  },
  {
    id: "attachment-style",
    title: "Attachment Style & Addiction Assessment",
    description: "Explore how your attachment patterns may be contributing to compulsive behavior. Insecure attachment is one of the strongest predictors of addictive patterns.",
    questions: [
      { q: "How comfortable are you depending on others for emotional support?", options: ["Very comfortable", "Mostly comfortable", "Somewhat uncomfortable", "Very uncomfortable", "I avoid it entirely"] },
      { q: "Do you worry about being abandoned or rejected by people close to you?", options: ["Rarely", "Sometimes", "Often", "Very often", "Constantly"] },
      { q: "How do you typically respond when a close relationship becomes difficult?", options: ["Work through it together", "Express my needs", "Withdraw temporarily", "Shut down emotionally", "Seek escape through compulsive behavior"] },
      { q: "As a child, were your emotional needs consistently met by caregivers?", options: ["Yes, consistently", "Mostly", "Inconsistently", "Rarely", "Almost never"] },
      { q: "Do you use pornography as a substitute for emotional intimacy?", options: ["Never", "Rarely", "Sometimes", "Often", "It's my primary source of 'connection'"] },
      { q: "How do you feel about emotional vulnerability?", options: ["It's natural and healthy", "Somewhat comfortable", "Cautious but willing", "Deeply uncomfortable", "Terrifying"] },
      { q: "Do you feel worthy of love and genuine connection?", options: ["Absolutely", "Mostly", "Sometimes", "Rarely", "No"] },
      { q: "How would you describe your pattern in romantic relationships?", options: ["Secure and stable", "Anxious but engaged", "Avoidant but wanting", "Push-pull cycle", "Unable to maintain them"] },
    ],
    getResult: (score, max) => {
      const pct = score / max;
      if (pct <= 0.25) return { level: "Secure Attachment", color: "text-emerald-400", message: "Your responses suggest a predominantly secure attachment style. You're comfortable with intimacy and independence, which provides a strong foundation for recovery.", recommendations: ["Leverage your relational strengths in recovery", "Your secure base makes accountability partnerships particularly effective", "Continue nurturing your close relationships"] };
      if (pct <= 0.5) return { level: "Mildly Insecure Attachment", color: "text-yellow-400", message: "Your responses suggest some insecure attachment patterns that may be contributing to compulsive behavior. The connection between unmet attachment needs and addictive patterns is well-documented.", recommendations: ["Explore attachment theory through reading (try 'Attached' by Amir Levine)", "Practice vulnerability in small, safe doses with trusted people", "Notice when you reach for porn as a substitute for connection", "Consider therapy focused on attachment repair"] };
      if (pct <= 0.75) return { level: "Insecure Attachment", color: "text-orange-400", message: "Your responses indicate significant insecure attachment patterns. Your compulsive behavior likely serves as a substitute for the emotional connection and regulation that secure attachment provides.", recommendations: ["Attachment-focused therapy is strongly recommended", "Begin building one genuinely vulnerable relationship", "Practice identifying the emotional need behind each urge", "Read 'In the Realm of Hungry Ghosts' by Gabor Maté", "Join a support group — shared vulnerability builds attachment security"] };
      return { level: "Deeply Insecure Attachment", color: "text-red-400", message: "Your responses suggest deeply insecure attachment patterns that are likely a primary driver of compulsive behavior. Pornography may be serving as your primary source of pseudo-connection and emotional regulation.", recommendations: ["Professional therapy specializing in attachment trauma is essential", "This is not about willpower — it's about healing relational wounds", "Start with the smallest possible acts of trust and vulnerability", "Recognize that recovery IS the process of learning to connect", "Be extraordinarily patient with yourself — attachment patterns formed early and change slowly"] };
    },
  },
  {
    id: "nervous-system",
    title: "Nervous System Regulation Assessment",
    description: "Assess the state of your autonomic nervous system. Chronic dysregulation is both a cause and consequence of compulsive behavior.",
    questions: [
      { q: "How often do you feel a sense of calm and safety in your body?", options: ["Most of the time", "Often", "Sometimes", "Rarely", "Almost never"] },
      { q: "Do you startle easily or feel hypervigilant?", options: ["Rarely", "Sometimes", "Often", "Very often", "Constantly on edge"] },
      { q: "How is your digestion?", options: ["Excellent", "Good", "Variable", "Often problematic", "Chronically disrupted"] },
      { q: "Do you experience unexplained physical tension, pain, or tightness?", options: ["Rarely", "Occasionally", "Frequently", "Most of the time", "Constantly"] },
      { q: "How would you describe your energy levels throughout the day?", options: ["Steady and adequate", "Mostly good", "Variable", "Often depleted", "Chronically exhausted or wired"] },
      { q: "Do you feel emotionally numb or disconnected from your body?", options: ["Rarely", "Sometimes", "Often", "Very often", "Most of the time"] },
      { q: "How well do you transition between activity and rest?", options: ["Easily", "Usually fine", "Sometimes difficult", "Often difficult", "Cannot wind down or cannot get going"] },
      { q: "Do you experience racing thoughts, especially at night?", options: ["Rarely", "Sometimes", "Often", "Very often", "Every night"] },
      { q: "How does your body respond to stress?", options: ["Activates and recovers quickly", "Activates moderately, recovers", "Activates strongly, slow recovery", "Gets stuck in activation", "Shuts down or freezes"] },
      { q: "Do you use substances or behaviors to regulate your nervous system state?", options: ["Rarely", "Occasionally", "Sometimes", "Often", "It's my primary regulation strategy"] },
    ],
    getResult: (score, max) => {
      const pct = score / max;
      if (pct <= 0.25) return { level: "Well Regulated", color: "text-emerald-400", message: "Your nervous system appears to be well-regulated. You can activate in response to stress and return to baseline effectively. This is a significant asset in recovery.", recommendations: ["Maintain your current regulation practices", "Continue exercise, sleep hygiene, and stress management", "Your regulated state makes it easier to process urges without acting on them"] };
      if (pct <= 0.5) return { level: "Mildly Dysregulated", color: "text-yellow-400", message: "Your nervous system shows mild dysregulation. You can generally manage but may struggle during high-stress periods, which is when compulsive behavior is most likely.", recommendations: ["Establish a daily breathwork practice (box breathing or 4-7-8)", "Prioritize sleep consistency above all else", "Add regular vagal toning exercises (cold water on face, humming, gargling)", "Reduce caffeine and stimulant intake"] };
      if (pct <= 0.75) return { level: "Moderately Dysregulated", color: "text-orange-400", message: "Your nervous system is moderately dysregulated. You likely spend significant time in sympathetic activation (fight/flight) or dorsal vagal shutdown (freeze/collapse). Compulsive behavior is being used to regulate this state.", recommendations: ["Somatic therapy (Somatic Experiencing or Sensorimotor Psychotherapy) is recommended", "Begin with gentle yoga or tai chi — not intense exercise", "Practice co-regulation: spend time with calm, safe people", "Cold exposure (cold showers) can help reset the autonomic nervous system", "Reduce all unnecessary stimulation, especially before bed"] };
      return { level: "Significantly Dysregulated", color: "text-red-400", message: "Your nervous system is significantly dysregulated. You may be cycling between hyperactivation and shutdown, with compulsive behavior serving as an attempt to manage overwhelming physiological states.", recommendations: ["Professional somatic therapy is strongly recommended", "Start with the gentlest possible practices — even 30 seconds of conscious breathing", "Prioritize safety and stability above all else", "Avoid intense exercise until basic regulation improves", "Consider polyvagal-informed therapy", "Be very gentle with yourself — your nervous system is doing its best to protect you"] };
    },
  },
  {
    id: "shame-resilience",
    title: "Shame Resilience Assessment",
    description: "Shame is the fuel that keeps the addiction cycle running. This assessment measures your resilience to shame and your ability to process it without spiraling.",
    questions: [
      { q: "After a relapse, what is your dominant emotional response?", options: ["Self-compassion and recommitment", "Brief disappointment, then forward", "Significant guilt", "Intense shame and self-hatred", "Complete despair"] },
      { q: "Can you distinguish between guilt ('I did something bad') and shame ('I am bad')?", options: ["Clearly", "Usually", "Sometimes", "Rarely", "They feel identical"] },
      { q: "How do you respond when someone discovers or learns about your struggle?", options: ["Openly and honestly", "With some discomfort but honesty", "Defensively", "With intense shame", "Complete shutdown or denial"] },
      { q: "Do you believe you deserve recovery and a good life?", options: ["Absolutely", "Mostly", "Sometimes", "Rarely", "No"] },
      { q: "How often does shame about your behavior lead to more of the same behavior?", options: ["Never", "Rarely", "Sometimes", "Often", "Almost always — it's a cycle"] },
      { q: "Can you talk about your struggle without excessive self-deprecation?", options: ["Yes, matter-of-factly", "Mostly", "With difficulty", "Only with extreme discomfort", "Cannot talk about it at all"] },
      { q: "Do you define yourself by your compulsive behavior?", options: ["No — it's something I do, not who I am", "Mostly separate", "Sometimes it feels like my identity", "Often", "It IS my identity"] },
      { q: "How do you treat yourself compared to how you'd treat a friend with the same struggle?", options: ["With equal compassion", "Somewhat less kindly", "Noticeably harsher", "Much harsher", "With cruelty I'd never direct at anyone else"] },
    ],
    getResult: (score, max) => {
      const pct = score / max;
      if (pct <= 0.25) return { level: "High Shame Resilience", color: "text-emerald-400", message: "You demonstrate strong shame resilience. You can experience shame without it derailing your recovery or defining your identity. This is one of the most protective factors against relapse.", recommendations: ["Continue practicing self-compassion", "Share your resilience strategies with others in recovery", "Your ability to process shame healthily is a model for sustainable recovery"] };
      if (pct <= 0.5) return { level: "Moderate Shame Resilience", color: "text-yellow-400", message: "Your shame resilience is developing but has vulnerabilities. You can sometimes process shame healthily, but under pressure it can still trigger the shame-relapse cycle.", recommendations: ["Practice Kristin Neff's self-compassion exercises daily", "When shame arises, name it: 'This is shame. It is not truth.'", "Share your experience with one trusted person — shame cannot survive being spoken", "Read 'Daring Greatly' by Brené Brown"] };
      if (pct <= 0.75) return { level: "Low Shame Resilience", color: "text-orange-400", message: "Shame is a significant driver of your compulsive cycle. The pattern is clear: behavior → shame → escape from shame → more behavior. Breaking this cycle requires directly addressing the shame itself.", recommendations: ["Therapy focused on shame processing is essential", "Begin a daily self-compassion practice, even if it feels forced initially", "Write yourself a letter of compassion after each difficult moment", "Recognize that shame is a learned response, not a truth about who you are", "Join a group where others share similar struggles — shame dissolves in shared experience"] };
      return { level: "Shame-Dominated", color: "text-red-400", message: "Shame is the primary engine of your compulsive cycle. You likely experience yourself as fundamentally flawed, and this belief drives the very behavior that seems to confirm it. This is not the truth about you — it is a pattern that can be changed.", recommendations: ["Professional therapy is essential — specifically shame-focused or IFS (Internal Family Systems)", "The single most important thing: tell one person the truth about your struggle", "Start with micro-doses of self-compassion — even 10 seconds of kindness toward yourself", "Understand that your shame predates your addiction — the addiction is a response to shame, not its cause", "Recovery from shame IS recovery from addiction — they are the same process"] };
    },
  },
  {
    id: "life-balance",
    title: "Life Balance & Fulfillment Assessment",
    description: "Addiction thrives in a vacuum. This assessment evaluates the overall balance and fulfillment across key life domains that either support or undermine recovery.",
    questions: [
      { q: "How fulfilled are you in your work or primary occupation?", options: ["Deeply fulfilled", "Mostly satisfied", "Neutral", "Unsatisfied", "Deeply unfulfilled"] },
      { q: "How strong is your social support network?", options: ["Rich and diverse", "Good with a few close people", "Adequate", "Thin", "Isolated"] },
      { q: "How often do you engage in physical activity?", options: ["Daily", "4-5 times/week", "2-3 times/week", "Occasionally", "Rarely or never"] },
      { q: "Do you have creative outlets or hobbies that genuinely engage you?", options: ["Several meaningful ones", "One or two", "Trying to develop some", "Used to, but lost them", "None"] },
      { q: "How would you rate your spiritual or philosophical life?", options: ["Rich and sustaining", "Active and growing", "Present but undeveloped", "Dormant", "Non-existent"] },
      { q: "How is your financial situation affecting your stress levels?", options: ["Stable and secure", "Manageable", "Somewhat stressful", "Very stressful", "Crisis level"] },
      { q: "Do you spend regular time in nature?", options: ["Daily", "Several times a week", "Weekly", "Occasionally", "Almost never"] },
      { q: "How much of your free time is spent on screens?", options: ["Less than 1 hour/day", "1-2 hours", "3-4 hours", "5-7 hours", "8+ hours"] },
      { q: "Do you have goals or projects that excite you?", options: ["Yes, several", "One or two", "Vaguely", "Not really", "Nothing excites me"] },
      { q: "How often do you experience genuine joy or contentment?", options: ["Daily", "Several times a week", "Weekly", "Rarely", "Almost never"] },
    ],
    getResult: (score, max) => {
      const pct = score / max;
      if (pct <= 0.25) return { level: "Well-Balanced Life", color: "text-emerald-400", message: "Your life has strong balance across multiple domains. This rich, engaged life is one of the best protections against compulsive behavior — there's simply too much good to risk.", recommendations: ["Continue investing in the areas that bring you fulfillment", "Your balanced life is your recovery's strongest foundation", "Help others build similar balance — it reinforces your own"] };
      if (pct <= 0.5) return { level: "Moderately Balanced", color: "text-yellow-400", message: "Your life has reasonable balance but some domains are underdeveloped. The areas of emptiness or dissatisfaction are where compulsive behavior finds its foothold.", recommendations: ["Identify your weakest life domain and invest in it this month", "Add one new activity that genuinely engages you", "Increase time in nature — even 20 minutes daily makes a measurable difference", "Reduce passive screen time and replace it with active engagement"] };
      if (pct <= 0.75) return { level: "Imbalanced", color: "text-orange-400", message: "Your life has significant imbalances. Multiple domains are underdeveloped, creating the emptiness and boredom that compulsive behavior fills. Recovery requires building a life worth protecting.", recommendations: ["Start with the basics: exercise 3x/week, consistent sleep, one social connection", "Reduce screen time by 50% and fill that time with physical or creative activity", "Reconnect with one hobby or interest you've abandoned", "Spend time outdoors daily, even briefly", "Set one meaningful goal and work toward it daily"] };
      return { level: "Severely Imbalanced", color: "text-red-400", message: "Your life is severely imbalanced. Isolation, inactivity, and lack of fulfillment have created a vacuum that compulsive behavior fills by default. Building a meaningful life IS the recovery.", recommendations: ["Start with the absolute minimum: one walk per day, one conversation per day", "Any positive change, no matter how small, shifts the balance", "Consider volunteering — it provides purpose, social connection, and structure simultaneously", "Address any depression or anxiety that may be underlying the imbalance", "Recovery is not about removing porn — it's about building a life where porn becomes irrelevant"] };
    },
  },
  {
    id: "trauma-screening",
    title: "Trauma & Adverse Experience Screening",
    description: "Many compulsive behaviors have roots in unresolved trauma. This screening helps identify whether trauma may be a contributing factor in your patterns.",
    questions: [
      { q: "Did you experience emotional neglect or unavailability from caregivers growing up?", options: ["No", "Mildly", "Moderately", "Significantly", "Severely"] },
      { q: "Were you exposed to any form of abuse (physical, emotional, or sexual) as a child?", options: ["No", "Possibly", "Yes, mild", "Yes, moderate", "Yes, severe"] },
      { q: "Did you experience bullying, social rejection, or isolation during childhood/adolescence?", options: ["No", "Mildly", "Moderately", "Significantly", "Severely"] },
      { q: "Have you experienced any traumatic events as an adult?", options: ["No", "One minor event", "One significant event", "Multiple events", "Ongoing trauma"] },
      { q: "Do you experience flashbacks, intrusive memories, or nightmares?", options: ["Never", "Rarely", "Sometimes", "Often", "Frequently"] },
      { q: "Do you feel a persistent sense of unsafety in your body, even when objectively safe?", options: ["No", "Occasionally", "Sometimes", "Often", "Almost always"] },
      { q: "Did your compulsive behavior begin during or shortly after a difficult life period?", options: ["No connection", "Possibly", "Likely", "Clearly", "Directly after trauma"] },
      { q: "Do you use pornography specifically to numb, escape, or dissociate from painful feelings?", options: ["Never", "Rarely", "Sometimes", "Often", "It's the primary purpose"] },
    ],
    getResult: (score, max) => {
      const pct = score / max;
      if (pct <= 0.25) return { level: "Low Trauma Indicators", color: "text-emerald-400", message: "Your responses do not strongly suggest trauma as a primary driver of compulsive behavior. Your patterns may be more related to habit formation, dopamine conditioning, or environmental factors.", recommendations: ["Focus on behavioral and neurological approaches to recovery", "Habit restructuring and dopamine regulation strategies are likely most effective", "Continue monitoring for any trauma-related patterns that may emerge"] };
      if (pct <= 0.5) return { level: "Moderate Trauma Indicators", color: "text-yellow-400", message: "Your responses suggest some adverse experiences that may be contributing to compulsive patterns. The connection between unresolved difficult experiences and addictive behavior is well-established.", recommendations: ["Consider exploring these experiences with a trauma-informed therapist", "Body-based approaches (yoga, breathwork, somatic therapy) can help process stored experiences", "Read 'The Body Keeps the Score' by Bessel van der Kolk", "Be gentle with yourself — healing happens at its own pace"] };
      if (pct <= 0.75) return { level: "Significant Trauma Indicators", color: "text-orange-400", message: "Your responses indicate significant adverse experiences that are likely contributing to your compulsive behavior. The addiction may be serving as a coping mechanism for unresolved pain.", recommendations: ["Trauma-informed therapy is strongly recommended (EMDR, Somatic Experiencing, or IFS)", "Address the trauma alongside the addiction — they are connected", "Avoid approaches that focus only on behavior change without addressing underlying pain", "Build safety in your body through gentle somatic practices", "Recovery from trauma IS recovery from addiction in your case"] };
      return { level: "High Trauma Indicators", color: "text-red-400", message: "Your responses indicate significant trauma that is very likely a primary driver of compulsive behavior. Your addiction is almost certainly a survival strategy — a way your system learned to cope with overwhelming experience.", recommendations: ["Professional trauma therapy is essential — not optional", "EMDR, Somatic Experiencing, or IFS (Internal Family Systems) are recommended modalities", "Do NOT attempt to white-knuckle through recovery without addressing the underlying trauma", "Safety and stabilization come first — before processing traumatic memories", "Be extraordinarily compassionate with yourself — your coping mechanisms kept you alive"] };
    },
  },
  {
    id: "digital-dependency",
    title: "Digital Dependency & Screen Assessment",
    description: "Pornography addiction rarely exists in isolation from broader digital dependency. This assessment evaluates your overall relationship with screens and digital stimulation.",
    questions: [
      { q: "How many hours per day do you spend on screens outside of work?", options: ["Less than 1", "1-2 hours", "3-4 hours", "5-7 hours", "8+ hours"] },
      { q: "Do you check your phone within the first 10 minutes of waking?", options: ["Never", "Rarely", "Sometimes", "Usually", "Immediately upon waking"] },
      { q: "How often do you use your phone while eating meals?", options: ["Never", "Rarely", "Sometimes", "Usually", "Every meal"] },
      { q: "Can you sit in a waiting room for 10 minutes without reaching for your phone?", options: ["Easily", "With mild discomfort", "With significant effort", "With great difficulty", "No — I always reach for it"] },
      { q: "How often do you scroll social media or news without a specific purpose?", options: ["Rarely", "A few times a week", "Daily", "Multiple times daily", "Almost constantly"] },
      { q: "Do you feel anxious or incomplete without your phone nearby?", options: ["No", "Slightly", "Moderately", "Significantly", "Severely"] },
      { q: "How often do you use screens in the hour before bed?", options: ["Rarely", "Sometimes", "Often", "Usually", "Every night, right until sleep"] },
      { q: "Has your attention span for reading, conversation, or focused work decreased?", options: ["No", "Slightly", "Moderately", "Significantly", "Severely"] },
      { q: "Do you feel the need for constant stimulation or novelty?", options: ["Rarely", "Sometimes", "Often", "Very often", "Constantly"] },
      { q: "How would you describe your relationship with digital technology overall?", options: ["Intentional and balanced", "Mostly controlled", "Somewhat dependent", "Significantly dependent", "Completely dependent"] },
    ],
    getResult: (score, max) => {
      const pct = score / max;
      if (pct <= 0.25) return { level: "Healthy Digital Relationship", color: "text-emerald-400", message: "Your relationship with digital technology appears healthy and intentional. You use screens as tools rather than being used by them.", recommendations: ["Maintain your current digital boundaries", "Your intentional screen use supports recovery from compulsive behavior", "Consider helping others develop similar digital discipline"] };
      if (pct <= 0.5) return { level: "Mild Digital Dependency", color: "text-yellow-400", message: "You show mild signs of digital dependency. While not severe, these patterns create the neural environment in which compulsive pornography use thrives.", recommendations: ["Implement a 'no screens before 9am' rule", "Use grayscale mode on your phone to reduce dopamine hits", "Create screen-free zones (bedroom, dining table)", "Replace 30 minutes of daily scrolling with reading or walking"] };
      if (pct <= 0.75) return { level: "Moderate Digital Dependency", color: "text-orange-400", message: "Your digital dependency is moderate and is likely contributing to the same dopamine dysregulation that drives compulsive pornography use. The two patterns reinforce each other.", recommendations: ["Digital minimalism is essential for your recovery", "Remove social media apps from your phone", "Implement strict screen curfew 1 hour before bed", "Get a physical alarm clock and charge your phone outside the bedroom", "Replace digital entertainment with physical activities and real-world engagement"] };
      return { level: "Severe Digital Dependency", color: "text-red-400", message: "Your digital dependency is severe and is almost certainly maintaining the neurological conditions that drive compulsive pornography use. Addressing screen addiction is inseparable from addressing porn addiction.", recommendations: ["Consider a 30-day digital detox (essential apps only)", "Get a basic phone for calls/texts and lock away your smartphone", "Your brain needs extended periods without digital stimulation to begin healing", "Fill the void with physical activity, nature, social interaction, and creative work", "This will be uncomfortable — that discomfort is your brain beginning to recalibrate"] };
    },
  },
];

function generateAssessmentPDF(assessment: AssessmentDef, score: number, maxScore: number, result: ReturnType<AssessmentDef["getResult"]>) {
  const lines = [
    `THE CLEAN BURN — ${assessment.title}`,
    `${"=".repeat(50)}`,
    ``,
    `Score: ${score} / ${maxScore}`,
    `Result: ${result.level}`,
    ``,
    result.message,
    ``,
    `RECOMMENDATIONS:`,
    ...result.recommendations.map((r, i) => `${i + 1}. ${r}`),
    ``,
    `${"—".repeat(50)}`,
    ``,
    `This assessment is for self-reflection only and is not a clinical diagnostic tool.`,
    `If you are concerned about your behavior, please consult a licensed mental health professional.`,
    ``,
    `cleanburn.love`,
  ];

  const content = lines.join("\n");
  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `clean-burn-${assessment.id}-results.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function AssessmentRunner({ assessment, onBack }: { assessment: AssessmentDef; onBack: () => void }) {
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
    if (current < assessment.questions.length - 1) setCurrent(current + 1);
    else setShowResult(true);
  };

  const prev = () => { if (current > 0) setCurrent(current - 1); };
  const reset = () => { setCurrent(0); setAnswers([]); setShowResult(false); };

  const maxScore = assessment.questions.length * 4;
  const score = answers.reduce((sum, a) => sum + (a || 0), 0);
  const result = assessment.getResult(score, maxScore);
  const progress = ((current + 1) / assessment.questions.length) * 100;

  return (
    <div ref={topRef}>
      {!showResult ? (
        <>
          <button onClick={onBack} className="flex items-center gap-2 text-sm text-[var(--warm-subtle)] hover:text-[var(--amber)] transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" /> All Assessments
          </button>

          <h2 className="font-heading text-2xl lg:text-3xl font-bold text-white mb-4">{assessment.title}</h2>

          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-[var(--warm-subtle)]">Question {current + 1} of {assessment.questions.length}</span>
              <span className="text-xs text-[var(--amber)]">{Math.round(progress)}%</span>
            </div>
            <div className="h-1 bg-[var(--deep-elevated)] rounded-full overflow-hidden">
              <div className="h-full bg-[var(--amber)] rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
            </div>
          </div>

          <div className="bg-[var(--deep-card)] border border-[var(--amber)]/8 rounded-2xl p-6 lg:p-10">
            <h3 className="font-heading text-xl lg:text-2xl font-bold text-white mb-8 leading-snug">
              {assessment.questions[current].q}
            </h3>
            <div className="space-y-3">
              {assessment.questions[current].options.map((opt, idx) => (
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
                {current === assessment.questions.length - 1 ? "See Results" : "Next"} <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
          <p className="text-xs text-[var(--warm-subtle)] mt-6 text-center">Completely private. No data is stored or transmitted.</p>
        </>
      ) : (
        <>
          <button onClick={onBack} className="flex items-center gap-2 text-sm text-[var(--warm-subtle)] hover:text-[var(--amber)] transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" /> All Assessments
          </button>

          <h2 className="font-heading text-2xl lg:text-3xl font-bold text-white mb-6">{assessment.title} — Results</h2>

          <div className="bg-[var(--deep-card)] border border-[var(--amber)]/8 rounded-2xl p-8 lg:p-10 mb-6">
            <div className={`inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4 border ${result.color}`} style={{ borderColor: 'currentColor', backgroundColor: 'color-mix(in srgb, currentColor 10%, transparent)' }}>
              {result.level}
            </div>
            <p className="text-sm text-[var(--warm-subtle)] mb-6">Score: {score} / {maxScore}</p>
            <p className="text-[var(--warm-muted)] leading-relaxed text-lg mb-8">{result.message}</p>

            <h4 className="font-heading font-semibold text-[var(--warm-white)] text-sm mb-4">Recommendations</h4>
            <ul className="space-y-2">
              {result.recommendations.map((rec, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-[var(--warm-subtle)]">
                  <span className="w-5 h-5 rounded-full bg-[var(--amber)]/10 flex items-center justify-center text-xs text-[var(--amber)] shrink-0 mt-0.5">{i + 1}</span>
                  <span>{rec}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap gap-4">
            <button onClick={() => generateAssessmentPDF(assessment, score, maxScore, result)} className="inline-flex items-center gap-2 bg-[var(--amber)] text-[var(--deep)] px-6 py-3 rounded-lg text-sm font-semibold hover:bg-[var(--amber-light)] transition-colors">
              <Download className="w-4 h-4" /> Download Results
            </button>
            <button onClick={reset} className="inline-flex items-center gap-2 border border-[var(--amber)]/20 text-[var(--warm-muted)] px-6 py-3 rounded-lg text-sm hover:border-[var(--amber)]/40 hover:text-[var(--amber)] transition-colors">
              <RotateCcw className="w-4 h-4" /> Retake
            </button>
          </div>

          <p className="text-xs text-[var(--warm-subtle)] mt-8">
            This assessment is for self-reflection only and is not a clinical diagnostic tool. If you are concerned about your behavior, please consult a licensed mental health professional.
          </p>
        </>
      )}
    </div>
  );
}

export default function AssessmentsPage() {
  const [activeAssessment, setActiveAssessment] = useState<string | null>(null);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  const assessment = ASSESSMENTS.find(a => a.id === activeAssessment);

  return (
    <Layout>
      <SEOHead
        title="Recovery Assessments — In-Depth Self-Evaluation"
        description="8 comprehensive assessments covering compulsive use severity, PIED, attachment style, nervous system regulation, and more. Private and downloadable."
        canonicalPath="/assessments"
      />

      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden min-h-screen">
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--deep-card)] to-[var(--deep)]" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[var(--amber)]/3 rounded-full blur-[120px]" />

        <div className="relative container max-w-3xl">
          {!assessment ? (
            <>
              <div className="flex items-center gap-3 mb-6">
                <ClipboardCheck className="w-5 h-5 text-[var(--amber)]" />
                <span className="text-xs font-medium text-[var(--amber)] uppercase tracking-[0.15em]">In-Depth Evaluation</span>
              </div>
              <h1 className="font-heading text-4xl lg:text-5xl font-black text-white tracking-tight mb-6">Recovery Assessments</h1>
              <p className="text-lg text-[var(--warm-muted)] leading-relaxed mb-12 max-w-2xl">
                Eight comprehensive assessments that go deeper than a quick quiz. Each one evaluates a specific dimension of your recovery landscape and provides personalized recommendations. Results can be downloaded for your records. Nothing is stored.
              </p>

              <div className="space-y-4">
                {ASSESSMENTS.map((a) => (
                  <button
                    key={a.id}
                    onClick={() => setActiveAssessment(a.id)}
                    className="w-full text-left bg-[var(--deep-card)] border border-[var(--amber)]/8 rounded-xl p-5 hover:border-[var(--amber)]/20 transition-all group"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-heading font-semibold text-[var(--warm-white)] mb-1 group-hover:text-[var(--amber-light)] transition-colors">
                          {a.title}
                        </h3>
                        <p className="text-sm text-[var(--warm-subtle)]">{a.description}</p>
                        <p className="text-xs text-[var(--amber)]/50 mt-1">{a.questions.length} questions</p>
                      </div>
                      <ChevronDown className="w-5 h-5 text-[var(--amber)]/50 -rotate-90 shrink-0 ml-4" />
                    </div>
                  </button>
                ))}
              </div>

              <p className="text-xs text-[var(--warm-subtle)] mt-8 text-center">
                All assessments are for self-reflection only. No data is stored or transmitted. Not a substitute for professional clinical assessment.
              </p>
            </>
          ) : (
            <AssessmentRunner assessment={assessment} onBack={() => setActiveAssessment(null)} />
          )}
        </div>
      </section>
    </Layout>
  );
}
