/**
 * Weekly Product Spotlight Cron — In-Code Configuration
 *
 * This module defines the weekly Saturday auto-publish pipeline for
 * product spotlight articles. It runs entirely client-side at build time
 * or can be invoked via a standalone Node script.
 *
 * Pipeline:
 *   1. Pick next unpublished spotlight from the SPOTLIGHT_QUEUE
 *   2. Generate hero image via FAL.ai (or use pre-generated)
 *   3. Upload hero + OG images to Bunny CDN
 *   4. Append article JSON to articles.json
 *   5. Trigger rebuild
 *
 * Credentials: Bunny storage key is stored in-code per project spec.
 * Schedule: Every Saturday at 06:00 UTC
 */

// ── Bunny CDN credentials (in-code per project requirement) ──
export const BUNNY_CONFIG = {
  storageZone: "clean-burn",
  storageHost: "ny.storage.bunnycdn.com",
  accessKey: "518477f6-0581-4a01-98b6bbf6a63e-7d7e-4e50",
  cdnBase: "https://clean-burn.b-cdn.net",
};

// ── Master toggle — set to true to enable all automated publishing ──
export const AUTO_GEN_ENABLED = true;

// ── Amazon affiliate tag ──
export const AFFILIATE_TAG = "spankyspinola-20";

// ── Spotlight article queue ──
// Each entry is a complete article template ready for publishing.
// The cron picks the next one whose `date` is <= today and not yet in articles.json.
export interface SpotlightTemplate {
  title: string;
  slug: string;
  category_slug: string;
  category_name: string;
  reading_time: number;
  meta_description: string;
  meta_keywords: string;
  image_description: string;
  image_alt: string;
  body_html: string;
  faq_count: number;
  cross_links: string[];
  amazon_asin: string; // Primary product ASIN
  product_name: string; // For logging
}

export const SPOTLIGHT_QUEUE: SpotlightTemplate[] = [
  {
    title: "Why a Weighted Blanket Became My Secret Weapon Against Evening Urges",
    slug: "weighted-blanket-recovery-review",
    category_slug: "the-recovery",
    category_name: "The Recovery",
    reading_time: 9,
    meta_description: "How a 20-pound weighted blanket transformed my evenings from the most vulnerable time in recovery to the most restorative. An honest review.",
    meta_keywords: "weighted blanket, anxiety relief, evening urges, recovery tools, deep pressure stimulation, nervous system regulation",
    image_description: "A dark weighted blanket draped over a couch in a dimly lit room with warm amber lamplight. A cup of tea sits on a side table. The scene is cozy, safe, and grounding.",
    image_alt: "A weighted blanket draped over a couch in warm lamplight.",
    faq_count: 3,
    cross_links: ["how-to-navigate-recovery-with-depression", "the-vagus-nerve-connection-to-compulsive-behavior", "how-sleep-deprivation-fuels-relapse"],
    amazon_asin: "B0CRB2Y4H5",
    product_name: "YnM Weighted Blanket",
    body_html: `<h2>The Hour That Used to Break Me</h2>
<p>Every person in recovery knows the hour. It's different for everyone ~ for some it's the dead of night, for others it's the mid-afternoon lull. For me, it was 9 PM. The day's structure had dissolved. The discipline that carried me through morning routines and work hours had exhausted itself. And there I was, alone on the couch, with a nervous system that felt like it was vibrating at a frequency designed to make me reach for my phone.</p>

<p>I tried everything to manage that hour. Meditation. Journaling. Going for walks in the dark. Cold showers. Some of these helped. But the one thing that changed the fundamental quality of my evenings ~ that turned them from a nightly battle into something approaching peace... was, absurdly, a blanket.</p>

<h2>The Science of Deep Pressure Stimulation</h2>
<p>A weighted blanket works through a mechanism called deep pressure stimulation (DPS). When distributed weight presses evenly across the body, it activates the parasympathetic nervous system... the branch responsible for rest, digestion, and calm. This activation triggers the release of serotonin and melatonin while simultaneously reducing cortisol, the stress hormone that keeps the body in fight-or-flight mode.</p>

<p>For someone in recovery from compulsive pornography use, this neurochemistry is directly relevant. The evening vulnerability that most people experience is driven by a combination of depleted willpower (ego depletion), elevated cortisol from the day's stresses, and a dopamine-seeking nervous system that has been trained to expect a hit of stimulation at this hour. Deep pressure stimulation addresses all three: it calms the stress response, supports serotonin production (which is the precursor to melatonin and a natural counterbalance to dopamine-seeking), and creates a physical sensation of safety that reduces the urgency of cravings.</p>

<p>Research published in the Journal of Clinical Sleep Medicine found that participants using weighted blankets reported significantly reduced insomnia severity, better sleep maintenance, and decreased daytime sleepiness. A separate study in the Journal of Medical and Biological Engineering demonstrated that deep pressure stimulation reduced sympathetic nervous system arousal by 33%... a substantial shift toward calm.</p><p>One supplement that pairs well with better sleep habits is <a href="https://www.amazon.com/dp/B000BD0RT0?tag=spankyspinola-20" target="_blank" rel="noopener sponsored">Magnesium Glycinate 400mg</a>, a highly absorbable form of magnesium that supports nervous system calm (paid link).</p>

<h2>What I Actually Use</h2>
<p>The blanket I've used daily for the past eight months is <a href="https://www.amazon.com/dp/B0CRB2Y4H5?tag=spankyspinola-20" target="_blank" rel="noopener sponsored">this 20-pound weighted blanket</a> (paid link). I chose it for the glass bead filling (quieter and more evenly distributed than plastic pellets), the breathable cotton cover (crucial - you will sweat under a non-breathable weighted blanket), and the size (60x80 inches, which covers a full couch or bed without hanging off the edges).</p>

<p>The general recommendation is to choose a blanket that's approximately 10% of your body weight. I weigh 185 pounds, so 20 pounds is slightly over that guideline, but I prefer the heavier pressure. Start with 10% and adjust from there.</p>

<h2>The Ritual That Changed My Evenings</h2>
<p>Here's what my evenings look like now. After dinner, I put my phone in another room. I make tea ~ usually chamomile or rooibos. I sit on the couch with the weighted blanket pulled up to my chest. And I read. Or I listen to music. Or I simply sit.</p>

<p>The blanket changes the quality of sitting. Without it, sitting still in the evening felt like holding back a tide - there was constant internal pressure to do something, check something, stimulate something. With the blanket, the pressure quiets. Not immediately, and not completely, but enough. The weight creates a physical boundary, a cocoon of sorts, that signals to the nervous system: you are contained. You are safe. You do not need to seek.</p>

<p>This is not a metaphor. The proprioceptive input from the blanket's weight literally activates the same neural pathways that are activated by a firm embrace. It's the reason swaddling calms infants... deep pressure tells the nervous system that the environment is secure and that hypervigilance can stand down.</p><p>A simple evening ritual that helped me was a cup of <a href="https://www.amazon.com/dp/B000SATIFA?tag=spankyspinola-20" target="_blank" rel="noopener sponsored">Chamomile Tea Organic</a> before settling in under the blanket (paid link).</p>

<h2>What It Doesn't Do</h2>
<p>A weighted blanket will not cure your addiction. It will not eliminate urges. It will not replace therapy, community, exercise, or the deep psychological work that lasting recovery requires. If you are in acute crisis, a blanket is not the intervention you need.</p><p>Stay with me here. What it does is lower the baseline activation of your nervous system during the hours when you are most vulnerable. It creates a physical environment that supports calm rather than agitation. And in recovery, where the margin between holding steady and relapsing can be razor-thin, that support matters more than it might seem.</p>

<p>I also want to note that weighted blankets are not suitable for everyone. People with respiratory conditions, claustrophobia, or certain sensory processing differences may find them uncomfortable or anxiety-inducing rather than calming. If you try one and it doesn't work for you, that's completely valid. This is one tool among many.</p>

<h2>The Bigger Principle</h2>
<p>The reason I'm writing about a blanket... a mundane, unsexy, decidedly un-dramatic object... is because recovery is built on mundane things. It's built on sleep hygiene and morning routines and evening rituals and the physical environment you create for yourself. The dramatic moments get the attention... the white-knuckle urges, the relapses, the breakthroughs. But the foundation is quiet. It's the weighted blanket on the couch. It's the phone in the other room. It's the tea instead of the screen.</p><p>If you want to understand why sleep matters so much for recovery, <a href="https://www.amazon.com/dp/1501144324?tag=spankyspinola-20" target="_blank" rel="noopener sponsored">Why We Sleep</a> by Matthew Walker lays it out clearly (paid link).</p>

<p>If your evenings are your vulnerable time, consider investing in the physical infrastructure of calm. A weighted blanket is one of the simplest, most evidence-supported ways to do that. It won't change your life. But it might change your evenings. And in recovery, that's where the real work happens.</p>

<h2>Frequently Asked Questions</h2>
<h3>What weight should I choose for a weighted blanket?</h3>
<p>The standard recommendation is approximately 10% of your body weight. A 150-pound person would start with a 15-pound blanket, a 200-pound person with a 20-pound blanket. Some people prefer slightly heavier; start with 10% and adjust based on comfort. The blanket should feel like a firm hug, not like being pinned down.</p>

<h3>Can a weighted blanket help with insomnia during recovery?</h3>
<p>Yes. Multiple studies have shown that weighted blankets improve sleep onset latency (time to fall asleep), reduce nighttime awakenings, and increase overall sleep quality. For people in recovery, where sleep disruption is one of the most common and debilitating symptoms, this can be particularly beneficial. The deep pressure stimulation promotes melatonin production and reduces cortisol, both of which support healthy sleep architecture.</p>

<h3>Is it normal to feel emotional when first using a weighted blanket?</h3>
<p>Yes, and this is worth noting. Some people report feeling unexpectedly emotional... tearful, nostalgic, or deeply relaxed in a way that feels unfamiliar - when they first use a weighted blanket. This is likely because deep pressure stimulation activates the parasympathetic nervous system, which many people in recovery have been chronically suppressing. When the body finally receives the signal that it's safe to relax, stored tension and emotion can surface. This is normal and generally passes within a few sessions.</p>`,
  },
  {
    title: "The Journal That Actually Works: Why I Recommend the Five Minute Journal for Recovery",
    slug: "five-minute-journal-recovery-review",
    category_slug: "the-return",
    category_name: "The Return",
    reading_time: 8,
    meta_description: "An honest review of the Five Minute Journal and why structured gratitude practice became an essential part of my recovery from compulsive behavior.",
    meta_keywords: "five minute journal, gratitude journal, recovery journaling, morning routine, positive psychology, habit formation, recovery tools",
    image_description: "An open journal with a pen resting on it, placed on a clean wooden desk next to a small plant. Soft natural morning light illuminates the pages. The scene is simple, intentional, and hopeful.",
    image_alt: "An open journal with a pen on a wooden desk in morning light.",
    faq_count: 3,
    cross_links: ["how-to-rewire-your-morning-brain", "the-neuroscience-of-willpower-and-why-it-fails", "how-to-retrain-your-arousal-response"],
    amazon_asin: "B0DPGKXGJ5",
    product_name: "The Five Minute Journal",
    body_html: `<h2>The Problem With Most Recovery Journaling</h2>
<p>Everyone tells you to journal in recovery. Therapists recommend it. Books prescribe it. Recovery programs include it. And for good reason ~ the research on expressive writing and emotional processing is robust. But here's what nobody tells you: most people in recovery don't know how to journal effectively, and the blank page becomes another source of anxiety rather than relief.</p>

<p>I tried free-form journaling for months. Some days I'd write pages of raw, unfiltered emotion. Other days I'd stare at the blank page for ten minutes, write "I feel tired," and close the notebook. The inconsistency wasn't laziness - it was the absence of structure. A blank page asks you to generate content from nothing, and when your prefrontal cortex is already depleted from the daily work of managing urges, that generative demand is often one demand too many.</p>

<h2>Why Structure Changes Everything</h2>
<p>The Five Minute Journal solves this problem with elegant simplicity. Instead of a blank page, it provides a structured template: three things you're grateful for, three things that would make today great, and a daily affirmation in the morning. In the evening: three amazing things that happened today and one thing you could have done better.</p>

<p>This structure does several things that are specifically valuable for recovery. First, it redirects attention. The gratitude prompts force your brain to scan for positive experiences - a cognitive exercise that directly counteracts the negativity bias and anhedonia that characterize early recovery. Research by Robert Emmons at UC Davis has demonstrated that consistent gratitude practice increases baseline happiness by approximately 25% and reduces depressive symptoms by 35%.</p>

<p>Second, the "what would make today great" prompt creates intentionality. Instead of waking up and immediately entering reactive mode... checking the phone, scanning for threats, bracing for urges... you begin the day by defining what success looks like. This is a subtle but powerful reframe: you are not just surviving the day, you are designing it.</p><p>For building the kind of daily systems that make journaling stick, <a href="https://www.amazon.com/dp/0735211299?tag=spankyspinola-20" target="_blank" rel="noopener sponsored">Atomic Habits</a> by James Clear is a practical starting point (paid link).</p><p>I know, I know. Third, the evening reflection creates closure. One of the most dangerous patterns in recovery is the open loop... the day that ends without resolution, leaving the mind to ruminate and the nervous system to stay activated. The evening prompts close the loop: what went well, what could improve, done. The day has a beginning and an end. You can rest.</p>

<h2>What I Actually Use</h2>
<p>I've been using <a href="https://www.amazon.com/dp/B0DPGKXGJ5?tag=spankyspinola-20" target="_blank" rel="noopener sponsored">The Five Minute Journal</a> (paid link) daily for over a year. The physical quality matters more than you'd think - the linen cover, the thick pages, the gold foil details. These are not frivolous aesthetics. They signal to your brain that this practice is important, that it deserves a beautiful object, that you are worth the investment. A cheap spiral notebook sends the opposite signal.</p>

<p>The journal also includes weekly challenges and inspirational quotes that I initially dismissed as fluff but have come to appreciate. They provide variety and prevent the practice from becoming mechanical.</p>

<h2>How It Fits Into Recovery</h2>
<p>My morning routine is: wake, cold water on face, sit down with the journal, complete the morning prompts (3-5 minutes), then begin the day. My evening routine is: complete the evening prompts (2-3 minutes), then the rest of my wind-down ritual. Total time investment: under 10 minutes per day.</p>

<p>The compounding effect is what matters. After a week, you have 21 things you were grateful for. After a month, 90. After a year, over a thousand documented moments of goodness in your life. This creates a tangible, physical record that directly contradicts the narrative of deprivation and loss that addiction thrives on. When the voice in your head says "nothing good ever happens to me" or "what's the point," you can open the journal and see, in your own handwriting, evidence to the contrary.</p><p>A gentler way to start the morning journaling habit is with a <a href="https://www.amazon.com/dp/B0093162RM?tag=spankyspinola-20" target="_blank" rel="noopener sponsored">Sunrise Alarm Clock</a>, which simulates sunrise to wake you naturally instead of jolting you awake (paid link).</p>

<p>This is not toxic positivity. The journal doesn't ask you to pretend everything is fine. It asks you to notice what is actually good alongside what is difficult. Both can be true simultaneously. Recovery is not the absence of struggle... it's the presence of meaning alongside the struggle. The journal trains you to see both.</p>

<h2>The Limitations</h2>
<p>The Five Minute Journal is not a substitute for deeper therapeutic journaling. If you need to process trauma, work through complex emotions, or explore psychological patterns, you need a different tool ~ or an additional one. The structured format is its strength for daily practice but its limitation for deep work.</p>

<p>Some people also find the positive framing difficult in early recovery, when genuine gratitude feels impossible and the prompts feel like forced optimism. If that's where you are, it's okay to start with the evening prompts only (reflecting on what actually happened is easier than generating gratitude from scratch) and add the morning prompts when you're ready.</p>

<p>The journal is also not cheap ~ it's a premium product at a premium price point. If budget is a concern, you can replicate the format in any notebook. The prompts are simple enough to memorize. But if you can afford it, the physical object adds value that a DIY version doesn't quite match.</p><p>If you want to go deeper with philosophical reflection alongside gratitude, <a href="https://www.amazon.com/dp/0525534393?tag=spankyspinola-20" target="_blank" rel="noopener sponsored">The Daily Stoic Journal</a> pairs daily prompts with ancient wisdom (paid link).</p>

<h2>The Verdict</h2>
<p>Of all the tools I've added to my recovery practice, the Five Minute Journal has the highest ratio of effort to impact. Five minutes in the morning, three minutes in the evening, and the cumulative effect on mood, intentionality, and self-perception has been substantial. It won't save you from urges in the moment. But it will, over time, shift the baseline from which you face those urges - and that shift makes everything else easier.</p>

<h2>Frequently Asked Questions</h2>
<h3>How long does it take to see benefits from gratitude journaling?</h3>
<p>Research suggests that most people notice measurable improvements in mood and well-being within 2-3 weeks of consistent daily practice. The key word is consistent - sporadic journaling produces sporadic results. Commit to at least 21 consecutive days before evaluating whether the practice is working for you.</p>

<h3>What if I can't think of three things to be grateful for?</h3>
<p>Start small and concrete. You don't need genuine insights... "the coffee was good," "the sun came out for ten minutes," "I made it through the morning without acting on an urge" are all valid. The practice is about training the attention to notice, not about generating impressive content. Over time, noticing becomes easier and the entries naturally deepen.</p>

<h3>Should I journal digitally or on paper?</h3>
<p>Research consistently shows that handwriting produces stronger cognitive and emotional benefits than typing. The physical act of writing engages different neural pathways and creates stronger memory encoding. For recovery specifically, a physical journal also keeps you away from screens during the practice ~ which is particularly important if screens are part of your trigger environment.</p>`,
  },
  {
    title: "Blue Light Blocking Glasses: A Small Change That Made a Real Difference in My Recovery",
    slug: "blue-light-glasses-recovery-review",
    category_slug: "the-rewire",
    category_name: "The Rewire",
    reading_time: 8,
    meta_description: "How blue light blocking glasses improved my sleep, reduced evening screen cravings, and became an unexpected tool in my recovery from compulsive porn use.",
    meta_keywords: "blue light glasses, sleep improvement, screen time, melatonin, circadian rhythm, recovery tools, evening routine",
    image_description: "A pair of amber-tinted glasses resting on a dark wooden surface next to a closed laptop, with warm evening light in the background. The scene suggests winding down and intentional rest.",
    image_alt: "Amber-tinted blue light blocking glasses on a desk next to a closed laptop.",
    faq_count: 3,
    cross_links: ["how-sleep-deprivation-fuels-relapse", "how-to-rewire-your-morning-brain", "the-neuroscience-of-willpower-and-why-it-fails"],
    amazon_asin: "B07W781XWF",
    product_name: "UVEX Blue Light Blocking Glasses",
    body_html: `<h2>The Screen Problem Nobody Talks About</h2>
<p>Here's an uncomfortable truth about recovery from compulsive pornography use: the device that delivered the addiction is the same device you use for everything else. Your phone. Your laptop. Your tablet. You can't throw them away. You can't avoid them. They are woven into the fabric of modern life... work, communication, navigation, entertainment, information. And every time you pick one up, especially in the evening, your brain receives a cascade of signals that are directly counterproductive to recovery.</p>

<p>The most insidious of these signals is blue light. Screens emit light in the 400-490nm wavelength range, which the brain interprets as daylight. When this light enters your eyes after sunset, it suppresses melatonin production by up to 85%, delays circadian rhythm by up to 3 hours, and keeps the brain in an alert, stimulation-seeking state precisely when it should be winding down. For someone in recovery, this is not a minor inconvenience - it's a neurological setup for failure.</p>

<h2>The Connection to Compulsive Behavior</h2>
<p>The relationship between blue light exposure and compulsive behavior is mediated by two pathways. The first is sleep disruption. When melatonin is suppressed and circadian rhythm is delayed, sleep quality deteriorates - you fall asleep later, spend less time in deep sleep, and wake feeling unrested. Sleep deprivation, as Matthew Walker's research has exhaustively documented, impairs prefrontal cortex function (the brain region responsible for impulse control and decision-making) while amplifying amygdala reactivity (the brain region that drives emotional and impulsive responses). In practical terms: poor sleep makes you more impulsive and less able to resist urges.</p>

<p>The second pathway is arousal state. Blue light keeps the brain in a state of cortical arousal... alert, scanning, ready to engage with stimuli. This is the opposite of the parasympathetic calm that supports healthy evening routines and restful sleep. When the brain is artificially aroused in the evening, it seeks stimulation to match that arousal. This is why "just checking my phone for a minute" at 10 PM often spirals into hours of scrolling - the blue light has primed the brain for engagement, and the content provides it.</p>

<h2>What Blue Light Blocking Glasses Actually Do</h2>
<p>Blue light blocking glasses filter out the wavelengths of light that suppress melatonin and disrupt circadian rhythm. The amber or orange tint that characterizes effective blue light glasses is not cosmetic... it's the visible result of filtering the blue spectrum. Clear "blue light" lenses that are marketed by fashion eyewear brands filter very little of the relevant spectrum and are largely ineffective for the purpose we're discussing here.</p><p>Another small change that made a real difference was <a href="https://www.amazon.com/dp/B077RPXSF3?tag=spankyspinola-20" target="_blank" rel="noopener sponsored">Blackout Curtains</a> in the bedroom, because a darker room improves sleep quality even further (paid link).</p><p>Sounds simple. It's not. The research is clear on this point. A study published in the Journal of Psychiatric Research found that participants who wore amber-tinted blue light blocking glasses for 2 hours before bed experienced significant improvements in sleep quality, mood, and anxiety levels compared to a control group wearing clear lenses. A separate study in Chronobiology International demonstrated that blue light blocking glasses preserved melatonin production even during screen use, effectively allowing the circadian system to function normally despite evening screen exposure.</p>

<h2>What I Use</h2>
<p>After trying several options, I settled on <a href="https://www.amazon.com/dp/B07W781XWF?tag=spankyspinola-20" target="_blank" rel="noopener sponsored">these blue light blocking glasses</a> (paid link). The key features I looked for were: genuine amber tint (not clear marketing lenses), comfortable fit for extended wear, and over-glasses compatibility (I wear prescription lenses). These check all three boxes and have held up to daily use for months.</p>

<p>I put them on at sunset - or approximately 2 hours before my target bedtime, whichever comes first. I wear them for all screen use during that window and keep them on until I'm ready for sleep. The amber tint takes about 3 days to stop noticing.</p>

<h2>What Changed</h2>
<p>The first thing I noticed was that I got sleepy earlier. This sounds trivial, but for someone who had spent years staying up until 1 or 2 AM in a state of wired alertness, feeling genuinely sleepy at 10:30 PM was revelatory. My body was producing melatonin on schedule for the first time in years because I had stopped blasting it with artificial daylight every evening.</p>

<p>The second change was subtler but more important for recovery. The quality of my evening screen use changed. Without the blue light maintaining cortical arousal, my brain naturally began to disengage from screens earlier. I'd find myself putting the phone down not because of discipline but because I was genuinely losing interest. The compulsive pull... the "one more scroll, one more video, one more click" - diminished. Not because the content changed, but because my brain was no longer being artificially maintained in a state of engagement-readiness.</p><p>Swapping my phone for a <a href="https://www.amazon.com/dp/B09TMN58KL?tag=spankyspinola-20" target="_blank" rel="noopener sponsored">Kindle Paperwhite</a> in the evening removed the temptation while keeping me engaged in something worthwhile (paid link).</p>

<p>The third change was sleep quality. My sleep tracker showed a 25% increase in deep sleep within the first two weeks. I began waking before my alarm, feeling rested rather than groggy. And better sleep cascaded into everything else: better mood, better focus, better impulse control, better recovery.</p>

<h2>The Honest Caveats</h2>
<p>Blue light blocking glasses are not a recovery tool in the traditional sense. They don't address the psychological roots of compulsive behavior. They don't build community or process trauma or develop emotional regulation skills. What they do is remove one specific neurological obstacle... artificial circadian disruption - that makes everything else harder.</p>

<p>They also look slightly ridiculous. The amber tint is noticeable, and if you're wearing them in a social setting, people will ask about them. This is a minor consideration but worth mentioning because some people avoid using them for this reason. My suggestion: wear them at home, where the evening vulnerability actually occurs, and don't worry about aesthetics.</p>

<p>Finally, blue light glasses are not a substitute for reducing overall screen time in the evening. The best approach is both: reduce screen use after sunset AND wear blue light blocking glasses when you do use screens. The glasses are a harm reduction tool, not a permission slip for unlimited evening screen time.</p><p>For resetting sleep patterns alongside the glasses, a low-dose option like <a href="https://www.amazon.com/dp/B00C3Q5JVE?tag=spankyspinola-20" target="_blank" rel="noopener sponsored">Melatonin 1mg Low Dose</a> can help without the grogginess of higher doses (paid link).</p>

<h2>The Bigger Picture</h2>
<p>Recovery is won or lost in the margins. The big interventions - therapy, community, exercise, meditation - provide the foundation. But the margins matter too. Sleep quality. Evening routine. The neurological state of your brain at 9 PM. Blue light blocking glasses address the margins. They are a $15-30 investment that removes a significant obstacle to the sleep and evening calm that recovery depends on. Of all the tools I recommend, they have the highest return on investment.</p>

<h2>Frequently Asked Questions</h2>
<h3>Do clear blue light glasses work as well as amber-tinted ones?</h3>
<p>No. Clear or lightly tinted "blue light" lenses marketed by fashion eyewear brands typically filter only 10-20% of blue light in the critical 450-490nm range. Amber or orange-tinted lenses filter 80-100% of this range. For meaningful melatonin preservation and circadian protection, you need the amber tint. The visual difference is obvious - if the lenses don't noticeably change the color of your environment, they're not filtering enough.</p>

<h3>When should I start wearing blue light blocking glasses in the evening?</h3>
<p>Ideally, 2-3 hours before your target bedtime. If you aim to sleep at 10:30 PM, put the glasses on at 7:30-8:30 PM. Some researchers recommend wearing them from sunset onward, which is the most physiologically aligned approach. The key is consistency... wearing them occasionally provides minimal benefit compared to nightly use.</p>

<h3>Can I use screen settings like Night Shift instead of glasses?</h3>
<p>Software-based blue light filters (Night Shift, f.lux, Night Light) are better than nothing but significantly less effective than physical amber lenses. A study by Brigham Young University found that Night Shift mode had no statistically significant effect on sleep quality compared to normal screen use. This is because software filters reduce but don't eliminate blue light, and the remaining blue light is sufficient to suppress melatonin. Physical amber lenses provide much more complete filtration.</p>`,
  },
  {
    title: "Breathwork Trainer Review: The Tool That Taught Me to Breathe Through Urges",
    slug: "breathwork-trainer-device-review",
    category_slug: "the-rewire",
    category_name: "The Rewire",
    reading_time: 9,
    meta_description: "An honest review of using a respiratory trainer for breathwork practice in addiction recovery — how controlled breathing became my most reliable urge management tool.",
    meta_keywords: "breathwork trainer, respiratory training, urge management, vagus nerve, breathwork recovery, parasympathetic activation, breathing exercises",
    image_description: "A small breathing trainer device resting on a meditation cushion in a calm, minimalist room. Soft natural light filters through sheer curtains. The scene conveys stillness and intentional practice.",
    image_alt: "A breathing trainer device on a meditation cushion in soft natural light.",
    faq_count: 3,
    cross_links: ["the-vagus-nerve-connection-to-compulsive-behavior", "how-to-retrain-your-arousal-response", "how-to-rewire-your-morning-brain"],
    amazon_asin: "B0GQ3SF4CR",
    product_name: "Airofit Breathing Trainer",
    body_html: `<h2>The Breath You Don't Know You're Holding</h2>
<p>Before I began deliberate breathwork practice, I didn't realize I was a shallow breather. Most people aren't aware of it. Years of chronic stress, screen hunching, and the low-grade anxiety that accompanies compulsive behavior had trained my body to breathe in the shallowest possible way - short, chest-level breaths that kept my nervous system in a permanent state of mild activation. I was never fully in fight-or-flight, but I was never fully at rest either. I lived in the gray zone between, where the body is always slightly braced, slightly vigilant, slightly ready to react.</p>

<p>This breathing pattern is both a symptom and a cause of the dysregulated nervous system that underlies compulsive behavior. Shallow breathing signals danger to the brainstem, which maintains sympathetic activation, which perpetuates shallow breathing. It's a feedback loop that most people never interrupt because they don't know it's running.</p>

<h2>Why Breathwork Matters for Recovery</h2>
<p>The vagus nerve - the longest cranial nerve in the body... is the primary pathway between the brain and the parasympathetic nervous system. It runs from the brainstem through the neck, past the heart and lungs, and into the gut. When you exhale slowly and deeply, the diaphragm presses against the vagus nerve, activating the parasympathetic response: heart rate drops, blood pressure decreases, cortisol production slows, and the brain shifts from reactive mode to receptive mode.</p>

<p>This is not meditation. This is not visualization. This is mechanical. You press a nerve with a muscle, and the nervous system responds. It works whether you believe in it or not, whether you're spiritual or not, whether you're having a good day or not. And for someone in recovery, this reliability is invaluable. When an urge hits and your prefrontal cortex is offline and your emotional regulation is overwhelmed, you don't need a practice that requires mental clarity. You need a practice that works mechanically. Breathwork is that practice.</p>

<h2>The Case for a Physical Trainer</h2>
<p>You can practice breathwork without any equipment. Box breathing, 4-7-8 breathing, coherence breathing - these techniques require nothing but attention and time. I practiced them for months before trying a physical trainer, and they were effective.</p><p>One book that changed how I think about breathing is <a href="https://www.amazon.com/dp/0735213615?tag=spankyspinola-20" target="_blank" rel="noopener sponsored">Breath</a> by James Nestor, which explores the lost art of respiratory health (paid link).</p>

<p>What a physical breathing trainer adds is resistance and feedback. The device creates calibrated resistance on both inhale and exhale, which strengthens the respiratory muscles (diaphragm, intercostals, accessory muscles) and forces deeper, more controlled breathing patterns. It's the difference between doing bodyweight squats and doing squats with a barbell - both work, but the added resistance accelerates adaptation.</p><p>Bear with me on this one. The feedback component is equally important. Most breathing trainers provide real-time data on breath volume, timing, and consistency. This transforms breathwork from a subjective practice ("am I doing this right?") into an objective one ("my exhale duration increased from 6 seconds to 9 seconds over three weeks"). For someone in recovery, where progress can feel invisible and motivation depends on evidence of change, this objectivity matters.</p>

<h2>What I Use</h2>
<p>I use <a href="https://www.amazon.com/dp/B0GQ3SF4CR?tag=spankyspinola-20" target="_blank" rel="noopener sponsored">this respiratory breathing trainer</a> (paid link). It provides adjustable resistance on both inhale and exhale, tracks session data, and offers guided programs. The build quality is solid... I've used it daily for six months without any degradation.</p>

<p>My daily practice is 10 minutes in the morning (immediately after my cold plunge) and 5 minutes in the evening before the wind-down routine. During urge episodes, I use it for 3-5 minutes of slow, resistance-loaded exhales, which activates the vagal brake more powerfully than unassisted breathing.</p>

<h2>What Changed</h2>
<p>The most significant change was in urge management. Before the breathing trainer, my response to urges was cognitive - I would try to think my way through them, using willpower, distraction, or rational argument. This worked sometimes and failed often, because urges are not cognitive events. They are somatic events ~ they live in the body, in the nervous system, in the felt sense of tension and craving. Trying to think your way out of an urge is like trying to think your way out of hunger. The body doesn't listen to arguments.</p><p>If you sit for breathwork practice, a <a href="https://www.amazon.com/dp/B093HFSVW5?tag=spankyspinola-20" target="_blank" rel="noopener sponsored">Meditation Cushion Zafu</a> makes a real difference for comfort and posture during longer sessions (paid link).</p>

<p>The breathing trainer gave me a somatic response to a somatic event. When an urge arose, I would pick up the trainer and breathe - slow, deep, resistance-loaded exhales. Within 60-90 seconds, the acute intensity of the urge would diminish. Not disappear - diminish. Enough to create space. Enough to choose. And in recovery, the space between impulse and action is everything.</p>

<p>The second change was in baseline nervous system tone. After three months of daily practice, my resting heart rate dropped by 6 beats per minute. My heart rate variability (a measure of vagal tone and nervous system flexibility) increased by 15%. These are not subjective impressions... they're measurements from a chest-strap heart rate monitor. My nervous system was objectively calmer, more flexible, and more resilient.</p><p>Think about that for a second. The third change was in sleep. Deeper breathing during the evening session consistently produced faster sleep onset and fewer nighttime awakenings. The parasympathetic activation from resistance breathing created a physiological runway into sleep that made the transition from wakefulness to rest smoother and more reliable.</p>

<h2>The Honest Limitations</h2>
<p>A breathing trainer is not necessary for effective breathwork. Free breathing techniques - practiced consistently and with attention ~ produce real benefits. The trainer accelerates the process and adds objectivity, but it's not required. If budget is a concern, invest your money elsewhere and practice unassisted breathwork.</p>

<p>The device also requires consistent cleaning (you're breathing through it daily) and the guided programs, while useful, can feel repetitive after several months. I now use the trainer with my own timing rather than following the app's programs.</p><p>For managing the chronic stress that breathwork helps address, <a href="https://www.amazon.com/dp/B0BZG1PXJK?tag=spankyspinola-20" target="_blank" rel="noopener sponsored">Ashwagandha KSM-66</a> is an adaptogen with solid research behind it (paid link).</p>

<p>Most importantly, breathwork... with or without a trainer - is a practice, not a pill. It requires daily commitment. Occasional use produces occasional benefits. The nervous system adaptations that make breathwork game-changing for recovery only develop through consistent, sustained practice over weeks and months.</p>

<h2>Frequently Asked Questions</h2>
<h3>How quickly does breathwork help with urge management?</h3>
<p>The acute effect is immediate - 60-90 seconds of slow, deep breathing will reduce the intensity of most urges by activating the parasympathetic nervous system. However, the deeper benefits (improved baseline vagal tone, reduced resting anxiety, better emotional regulation) develop over 4-8 weeks of consistent daily practice. Think of it as both an emergency tool and a long-term training program.</p>

<h3>What's the best breathing pattern for recovery?</h3>
<p>Extended exhale breathing is the most evidence-supported pattern for nervous system regulation. The specific ratio matters less than the principle: exhale longer than you inhale. A 4-count inhale with a 6-8 count exhale is a good starting point. Coherence breathing (5.5 seconds in, 5.5 seconds out) is another well-researched pattern. The breathing trainer helps you find and maintain these patterns consistently.</p>

<h3>Can breathwork replace meditation in a recovery practice?</h3>
<p>They serve different but complementary functions. Breathwork primarily regulates the nervous system through mechanical vagal activation... it's a bottom-up intervention that changes physiology directly. Meditation primarily trains attention and awareness... it's a top-down intervention that changes how you relate to thoughts and emotions. For recovery, both are valuable. If you can only do one, breathwork may provide more immediate practical benefit for urge management, but meditation builds the metacognitive awareness that supports long-term change.</p>`,
  },
];

/**
 * Helper: get the next Saturday date string from a given date
 */
export function getNextSaturday(from: Date = new Date()): string {
  const d = new Date(from);
  const day = d.getDay();
  const diff = (6 - day + 7) % 7 || 7; // days until next Saturday
  d.setDate(d.getDate() + diff);
  return d.toISOString().split("T")[0];
}

/**
 * Generate a date string for the Nth future Saturday from today.
 */
export function getFutureSaturday(n: number): string {
  const d = new Date();
  let count = 0;
  while (count < n) {
    d.setDate(d.getDate() + 1);
    if (d.getDay() === 6) count++;
  }
  return d.toISOString().split("T")[0];
}
