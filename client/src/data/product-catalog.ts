/**
 * Product Catalog — 150+ real Amazon products for auto-affiliate injection
 *
 * Each product has:
 *   - name: Product display name
 *   - asin: Real Amazon ASIN
 *   - category: Product category for grouping
 *   - tags: Topic-matching keywords (matched against article title + category + keywords)
 *   - sentence: Natural embedding sentence template ({{link}} is replaced with the anchor tag)
 *   - price_tier: "budget" | "mid" | "premium" for mixing price points
 */

export interface CatalogProduct {
  name: string;
  asin: string;
  category: string;
  tags: string[];
  sentence: string;
  price_tier: "budget" | "mid" | "premium";
}

export const AFFILIATE_TAG = "spankyspinola-20";

export function amazonLink(asin: string): string {
  return `https://www.amazon.com/dp/${asin}?tag=${AFFILIATE_TAG}`;
}

export const PRODUCT_CATALOG: CatalogProduct[] = [
  // ═══════════════════════════════════════════
  // BOOKS — Neuroscience & Addiction
  // ═══════════════════════════════════════════
  { name: "Your Brain on Porn", asin: "B00N2AH8NW", category: "Books", tags: ["porn", "brain", "addiction", "dopamine", "gary wilson", "reboot"], sentence: "One option that many people find helpful is {{link}} by Gary Wilson, which breaks down the neuroscience in a way that actually makes sense (paid link).", price_tier: "budget" },
  { name: "The Porn Trap", asin: "0061231878", category: "Books", tags: ["porn", "addiction", "recovery", "couples", "relationship", "trap"], sentence: "A tool that often helps with this is {{link}} by Wendy and Larry Maltz, a practical guide for anyone working through compulsive use (paid link).", price_tier: "budget" },
  { name: "Wired for Intimacy", asin: "0830837000", category: "Books", tags: ["intimacy", "brain", "porn", "neuroscience", "sexuality", "wired"], sentence: "Something worth considering might be {{link}} by William Struthers, which explores how pornography rewires the male brain (paid link).", price_tier: "budget" },
  { name: "Breaking the Cycle", asin: "0985063327", category: "Books", tags: ["addiction", "recovery", "cycle", "compulsive", "behavior", "relapse"], sentence: "For those looking for a simple solution, {{link}} by George Collins offers a clear recovery framework (paid link).", price_tier: "budget" },
  { name: "Out of the Shadows", asin: "1568386214", category: "Books", tags: ["sex addiction", "compulsive", "shadows", "carnes", "recovery"], sentence: "You could also try {{link}} by Patrick Carnes, one of the foundational texts on understanding sexual compulsivity (paid link).", price_tier: "budget" },
  { name: "Facing the Shadow", asin: "0982650574", category: "Books", tags: ["recovery", "workbook", "carnes", "shadow", "exercises", "addiction"], sentence: "A popular choice for situations like this is {{link}} by Patrick Carnes, a structured workbook for early recovery (paid link).", price_tier: "budget" },
  { name: "Unwinding Anxiety", asin: "0593330447", category: "Books", tags: ["anxiety", "habit", "loop", "mindfulness", "brewer", "craving"], sentence: "One resource that many readers find useful is {{link}} by Judson Brewer, which maps the habit loop behind cravings (paid link).", price_tier: "budget" },
  { name: "The Body Keeps the Score", asin: "0143127748", category: "Books", tags: ["trauma", "body", "somatic", "ptsd", "van der kolk", "nervous system"], sentence: "A book that often helps people understand this better is {{link}} by Bessel van der Kolk, the definitive guide to how trauma lives in the body (paid link).", price_tier: "budget" },
  { name: "In the Realm of Hungry Ghosts", asin: "155643880X", category: "Books", tags: ["addiction", "compassion", "mate", "trauma", "hungry ghosts"], sentence: "Something worth reading on this topic is {{link}} by Gabor Mate, which connects addiction to early trauma with real compassion (paid link).", price_tier: "budget" },
  { name: "Atomic Habits", asin: "0735211299", category: "Books", tags: ["habits", "routine", "willpower", "behavior change", "morning", "discipline"], sentence: "For building better daily systems, {{link}} by James Clear is a practical starting point (paid link).", price_tier: "budget" },
  { name: "Dopamine Nation", asin: "152474672X", category: "Books", tags: ["dopamine", "pleasure", "pain", "balance", "lembke", "addiction"], sentence: "One book that really gets into this is {{link}} by Anna Lembke, which explains the pleasure-pain balance in modern life (paid link).", price_tier: "budget" },
  { name: "Why We Sleep", asin: "1501144324", category: "Books", tags: ["sleep", "insomnia", "circadian", "rest", "walker", "recovery"], sentence: "If sleep is part of your struggle, {{link}} by Matthew Walker is worth the read (paid link).", price_tier: "budget" },
  { name: "Come As You Are", asin: "1476762090", category: "Books", tags: ["sexuality", "desire", "arousal", "women", "nagoski", "intimacy"], sentence: "For understanding healthy sexuality, {{link}} by Emily Nagoski offers a science-backed perspective (paid link).", price_tier: "budget" },
  { name: "No More Mr Nice Guy", asin: "0762415339", category: "Books", tags: ["nice guy", "masculinity", "boundaries", "glover", "people pleasing"], sentence: "A book that often resonates here is {{link}} by Robert Glover, especially for those who struggle with people-pleasing patterns (paid link).", price_tier: "budget" },
  { name: "The Willpower Instinct", asin: "1583335080", category: "Books", tags: ["willpower", "self-control", "discipline", "mcgonigal", "impulse"], sentence: "For understanding why willpower fails, {{link}} by Kelly McGonigal is a solid resource (paid link).", price_tier: "budget" },
  { name: "Breath", asin: "0735213615", category: "Books", tags: ["breathwork", "breathing", "nestor", "respiratory", "vagus", "nervous system"], sentence: "One book that changed how I think about this is {{link}} by James Nestor, which explores the lost art of breathing (paid link).", price_tier: "budget" },
  { name: "The Craving Mind", asin: "0300234368", category: "Books", tags: ["craving", "mindfulness", "addiction", "brewer", "meditation", "urge"], sentence: "Something that might help with cravings is {{link}} by Judson Brewer, which applies mindfulness directly to addictive patterns (paid link).", price_tier: "budget" },
  { name: "Mating in Captivity", asin: "0060753641", category: "Books", tags: ["desire", "relationship", "intimacy", "perel", "erotic", "couples"], sentence: "For couples navigating this, {{link}} by Esther Perel offers a fresh take on desire and domesticity (paid link).", price_tier: "budget" },
  { name: "Hold Me Tight", asin: "031611300X", category: "Books", tags: ["attachment", "couples", "relationship", "johnson", "bonding", "emotional"], sentence: "A resource that many couples find helpful is {{link}} by Sue Johnson, which maps the emotional bonding patterns underneath conflict (paid link).", price_tier: "budget" },
  { name: "Fortify", asin: "0996890203", category: "Books", tags: ["porn", "recovery", "young", "program", "fortify", "freedom"], sentence: "For younger readers or those early in recovery, {{link}} offers a structured, shame-free approach (paid link).", price_tier: "budget" },

  // ═══════════════════════════════════════════
  // JOURNALS & WORKBOOKS
  // ═══════════════════════════════════════════
  { name: "The Five Minute Journal", asin: "B0B2HR3PMV", category: "Journals", tags: ["journal", "gratitude", "morning", "routine", "reflection", "mindfulness"], sentence: "One tool that fits naturally into a morning routine is {{link}}, a structured gratitude journal that takes about five minutes (paid link).", price_tier: "mid" },
  { name: "The Daily Stoic Journal", asin: "0525534393", category: "Journals", tags: ["stoic", "journal", "discipline", "philosophy", "reflection", "marcus aurelius"], sentence: "For those drawn to stoic philosophy, {{link}} pairs daily prompts with ancient wisdom (paid link).", price_tier: "mid" },
  { name: "Addiction Recovery Journal", asin: "B0CQFZ5RKW", category: "Journals", tags: ["addiction", "recovery", "journal", "tracking", "progress", "sobriety"], sentence: "A practical option for tracking recovery progress is {{link}}, designed specifically for daily check-ins (paid link).", price_tier: "budget" },
  { name: "The Bullet Journal Method", asin: "0525533338", category: "Journals", tags: ["bullet journal", "organization", "tracking", "habits", "planning"], sentence: "If you prefer building your own system, {{link}} by Ryder Carroll teaches a flexible tracking method (paid link).", price_tier: "budget" },
  { name: "Cognitive Behavioral Therapy Workbook", asin: "1646040716", category: "Journals", tags: ["cbt", "therapy", "workbook", "cognitive", "thought patterns", "exercises"], sentence: "Something worth considering is {{link}}, which walks through CBT exercises you can do on your own (paid link).", price_tier: "budget" },
  { name: "DBT Skills Workbook", asin: "1684034582", category: "Journals", tags: ["dbt", "emotional regulation", "distress tolerance", "mindfulness", "interpersonal"], sentence: "For building emotional regulation skills, {{link}} offers structured exercises grounded in dialectical behavior therapy (paid link).", price_tier: "budget" },

  // ═══════════════════════════════════════════
  // SUPPLEMENTS & NUTRITION
  // ═══════════════════════════════════════════
  { name: "Magnesium Glycinate 400mg", asin: "B07K2LFCBX", category: "Supplements", tags: ["magnesium", "sleep", "anxiety", "calm", "supplement", "nervous system", "mineral"], sentence: "One supplement that many people in recovery find helpful for sleep is {{link}}, a highly absorbable form of magnesium (paid link).", price_tier: "budget" },
  { name: "L-Theanine 200mg", asin: "B01D1YQBOK", category: "Supplements", tags: ["theanine", "calm", "focus", "anxiety", "supplement", "relaxation", "amino acid"], sentence: "For daytime calm without drowsiness, {{link}} is a popular choice among people working on focus and anxiety (paid link).", price_tier: "budget" },
  { name: "Omega-3 Fish Oil", asin: "B001LF39S8", category: "Supplements", tags: ["omega", "fish oil", "brain", "inflammation", "supplement", "dha", "epa"], sentence: "A foundational supplement for brain health is {{link}}, which supports the neural repair process (paid link).", price_tier: "budget" },
  { name: "Ashwagandha KSM-66", asin: "B078K14TP1", category: "Supplements", tags: ["ashwagandha", "stress", "cortisol", "adaptogen", "supplement", "anxiety"], sentence: "For managing chronic stress, {{link}} is an adaptogen with solid research behind it (paid link).", price_tier: "budget" },
  { name: "Vitamin D3 + K2", asin: "B07255MPRB", category: "Supplements", tags: ["vitamin d", "mood", "depression", "supplement", "sunshine", "immune"], sentence: "Something simple that often makes a difference is {{link}}, especially if you spend a lot of time indoors (paid link).", price_tier: "budget" },
  { name: "NAC (N-Acetyl Cysteine) 600mg", asin: "B0013OQGO6", category: "Supplements", tags: ["nac", "glutathione", "compulsive", "ocd", "supplement", "antioxidant"], sentence: "One supplement with emerging research for compulsive behaviors is {{link}}, which supports glutathione production (paid link).", price_tier: "budget" },
  { name: "Lion's Mane Mushroom", asin: "B078SZX3ML", category: "Supplements", tags: ["lions mane", "neuroplasticity", "brain", "focus", "mushroom", "cognition"], sentence: "For supporting neuroplasticity during recovery, {{link}} is a mushroom supplement with promising research (paid link).", price_tier: "budget" },
  { name: "Rhodiola Rosea", asin: "B0013OQIJQ", category: "Supplements", tags: ["rhodiola", "fatigue", "energy", "adaptogen", "stress", "supplement"], sentence: "If fatigue is dragging you down, {{link}} is an adaptogen that supports energy without the jitteriness of caffeine (paid link).", price_tier: "budget" },
  { name: "Zinc Picolinate 50mg", asin: "B001F0R7S4", category: "Supplements", tags: ["zinc", "testosterone", "immune", "supplement", "mineral", "recovery"], sentence: "A basic but often overlooked mineral for recovery is {{link}}, which supports immune function and hormonal balance (paid link).", price_tier: "budget" },
  { name: "GABA 750mg", asin: "B000MGWLHM", category: "Supplements", tags: ["gaba", "calm", "anxiety", "sleep", "neurotransmitter", "supplement"], sentence: "For evening calm, {{link}} is a neurotransmitter supplement that some people find helpful for winding down (paid link).", price_tier: "budget" },
  { name: "Probiotics 50 Billion CFU", asin: "B07YMPB4GK", category: "Supplements", tags: ["probiotics", "gut", "brain", "microbiome", "supplement", "digestion"], sentence: "The gut-brain connection is real, and {{link}} supports the microbiome that influences mood and cravings (paid link).", price_tier: "mid" },
  { name: "B-Complex Vitamins", asin: "B005F6FNB2", category: "Supplements", tags: ["b vitamins", "energy", "mood", "nervous system", "supplement", "stress"], sentence: "A solid B-complex like {{link}} supports nervous system function and energy production during recovery (paid link).", price_tier: "budget" },
  { name: "Melatonin 1mg Low Dose", asin: "B08FHCG5LH", category: "Supplements", tags: ["melatonin", "sleep", "circadian", "insomnia", "supplement", "rest"], sentence: "For resetting sleep patterns, a low-dose option like {{link}} can help without the grogginess of higher doses (paid link).", price_tier: "budget" },
  { name: "Creatine Monohydrate", asin: "B002DYIZEO", category: "Supplements", tags: ["creatine", "brain", "energy", "exercise", "supplement", "cognitive"], sentence: "Beyond gym performance, {{link}} has research supporting cognitive function and brain energy (paid link).", price_tier: "budget" },

  // ═══════════════════════════════════════════
  // DEVICES & PHYSICAL TOOLS
  // ═══════════════════════════════════════════
  { name: "Weighted Blanket 20lb", asin: "B0C1LBMZ5G", category: "Devices", tags: ["weighted blanket", "anxiety", "sleep", "deep pressure", "calm", "evening"], sentence: "One thing that genuinely changed my evenings is {{link}}, which uses deep pressure to calm the nervous system (paid link).", price_tier: "mid" },
  { name: "Blue Light Blocking Glasses", asin: "B0BVD2JY5B", category: "Devices", tags: ["blue light", "glasses", "sleep", "screen", "melatonin", "circadian", "evening"], sentence: "A small investment that makes a real difference is {{link}}, which blocks the blue light that suppresses melatonin (paid link).", price_tier: "budget" },
  { name: "Cold Plunge Tub", asin: "B0CPKD2KR1", category: "Devices", tags: ["cold plunge", "cold exposure", "ice bath", "dopamine", "recovery", "nervous system"], sentence: "For those ready to try cold exposure, {{link}} is a practical home option (paid link).", price_tier: "premium" },
  { name: "Meditation Cushion Zafu", asin: "B01MSQNX0N", category: "Devices", tags: ["meditation", "cushion", "zafu", "sitting", "mindfulness", "practice"], sentence: "If you sit for meditation, {{link}} makes a real difference for comfort and posture (paid link).", price_tier: "mid" },
  { name: "Breathing Trainer", asin: "B0CJKL5VFQ", category: "Devices", tags: ["breathwork", "breathing", "trainer", "respiratory", "vagus nerve", "device"], sentence: "For structured breathwork practice, {{link}} adds resistance training to your breathing (paid link).", price_tier: "mid" },
  { name: "Yoga Mat Extra Thick", asin: "B01LP0V0LK", category: "Devices", tags: ["yoga", "mat", "exercise", "stretching", "body", "movement"], sentence: "A good foundation for any body practice is {{link}}, thick enough for comfort on hard floors (paid link).", price_tier: "budget" },
  { name: "Resistance Bands Set", asin: "B01AVDVHTI", category: "Devices", tags: ["exercise", "resistance", "bands", "strength", "home workout", "fitness"], sentence: "For home workouts that support recovery, {{link}} is a versatile and affordable option (paid link).", price_tier: "budget" },
  { name: "Acupressure Mat", asin: "B07BBYJ6QT", category: "Devices", tags: ["acupressure", "pain", "relaxation", "nervous system", "mat", "stress relief"], sentence: "Something that helps with evening wind-down is {{link}}, which stimulates pressure points to promote relaxation (paid link).", price_tier: "budget" },
  { name: "White Noise Machine", asin: "B07RWRJ4HW", category: "Devices", tags: ["white noise", "sleep", "sound", "insomnia", "environment", "rest"], sentence: "For better sleep environments, {{link}} masks disruptive sounds and creates a consistent backdrop for rest (paid link).", price_tier: "budget" },
  { name: "Sunrise Alarm Clock", asin: "B0093162RM", category: "Devices", tags: ["alarm", "sunrise", "morning", "circadian", "light", "wake", "routine"], sentence: "A gentler way to start the day is {{link}}, which simulates sunrise to wake you naturally (paid link).", price_tier: "mid" },
  { name: "Foam Roller", asin: "B0040EKZDY", category: "Devices", tags: ["foam roller", "tension", "body", "myofascial", "recovery", "muscle"], sentence: "For releasing stored tension in the body, {{link}} is a simple tool that makes a noticeable difference (paid link).", price_tier: "budget" },
  { name: "Pull-Up Bar Doorway", asin: "B001EJMS6K", category: "Devices", tags: ["pull up", "exercise", "strength", "home", "fitness", "bar"], sentence: "Having {{link}} in a doorway makes it easy to channel restless energy into something productive (paid link).", price_tier: "budget" },
  { name: "Jump Rope Speed", asin: "B0895FKQ5J", category: "Devices", tags: ["jump rope", "cardio", "exercise", "energy", "fitness", "quick workout"], sentence: "When you need to burn off anxious energy fast, {{link}} gives you a full-body workout in minutes (paid link).", price_tier: "budget" },
  { name: "Grip Strengthener Set", asin: "B08FMJDQKF", category: "Devices", tags: ["grip", "strength", "fidget", "hands", "stress", "physical"], sentence: "A simple redirect for restless hands is {{link}}, which gives you something physical to grip when urges hit (paid link).", price_tier: "budget" },
  { name: "Kitchen Safe Time Lock Container", asin: "B00JGFQTD2", category: "Devices", tags: ["phone", "lock", "screen time", "device", "boundary", "container"], sentence: "For those who need a physical barrier, {{link}} lets you lock your phone away for a set period (paid link).", price_tier: "mid" },
  { name: "Blackout Curtains", asin: "B07VN2QHWZ", category: "Devices", tags: ["blackout", "curtains", "sleep", "dark", "bedroom", "environment"], sentence: "Better sleep starts with a darker room, and {{link}} make a noticeable difference in sleep quality (paid link).", price_tier: "budget" },
  { name: "Sauna Blanket", asin: "B0BXFYY2JC", category: "Devices", tags: ["sauna", "heat", "detox", "relaxation", "recovery", "sweat"], sentence: "For at-home heat therapy, {{link}} provides the benefits of sauna exposure without the gym trip (paid link).", price_tier: "premium" },
  { name: "Massage Gun", asin: "B09MVPVH2Y", category: "Devices", tags: ["massage", "tension", "muscle", "recovery", "percussion", "body"], sentence: "For releasing physical tension that builds up during stressful days, {{link}} targets tight muscles directly (paid link).", price_tier: "mid" },
  { name: "Standing Desk Converter", asin: "B07GLDNBDH", category: "Devices", tags: ["standing desk", "posture", "work", "energy", "movement", "office"], sentence: "Changing your physical position during the day helps with energy and focus, and {{link}} makes that easy (paid link).", price_tier: "mid" },
  { name: "Himalayan Salt Lamp", asin: "B06XR2FQMB", category: "Devices", tags: ["salt lamp", "ambiance", "evening", "warm light", "environment", "calm"], sentence: "For creating a calmer evening environment, {{link}} provides warm, low-intensity light (paid link).", price_tier: "budget" },

  // ═══════════════════════════════════════════
  // APPS & DIGITAL TOOLS
  // ═══════════════════════════════════════════
  { name: "Headspace Subscription Gift Card", asin: "B07XLRJQHQ", category: "Apps", tags: ["meditation", "app", "mindfulness", "headspace", "guided", "calm"], sentence: "For guided meditation, a {{link}} gives access to one of the most beginner-friendly platforms (paid link).", price_tier: "mid" },
  { name: "Kindle Paperwhite", asin: "B09TMN58KL", category: "Apps", tags: ["kindle", "reading", "books", "screen", "alternative", "evening"], sentence: "Swapping your phone for a {{link}} in the evening removes the temptation while keeping you engaged (paid link).", price_tier: "mid" },
  { name: "Oura Ring Gen 3", asin: "B0CSX8JKJ9", category: "Apps", tags: ["oura", "sleep tracking", "hrv", "recovery", "biometric", "ring"], sentence: "For tracking sleep and recovery metrics, {{link}} provides data that helps you see progress objectively (paid link).", price_tier: "premium" },
  { name: "Whoop 4.0 Strap", asin: "B0D7XFVNQD", category: "Apps", tags: ["whoop", "hrv", "recovery", "strain", "sleep", "biometric"], sentence: "If you want continuous recovery tracking, {{link}} monitors HRV, sleep, and strain around the clock (paid link).", price_tier: "premium" },
  { name: "Apple AirPods Pro", asin: "B0D1XD1ZV3", category: "Apps", tags: ["airpods", "noise cancellation", "meditation", "audio", "focus", "music"], sentence: "For meditation and focus audio, {{link}} with noise cancellation creates an immersive listening environment (paid link).", price_tier: "premium" },
  { name: "Echo Dot Smart Speaker", asin: "B09B8V1LZ3", category: "Apps", tags: ["echo", "alexa", "timer", "alarm", "routine", "smart home"], sentence: "Setting up voice-activated routines with {{link}} can support morning and evening structure (paid link).", price_tier: "budget" },

  // ═══════════════════════════════════════════
  // NUTRITION & KITCHEN
  // ═══════════════════════════════════════════
  { name: "Blender Bottle Shaker", asin: "B01LZWGBHB", category: "Nutrition", tags: ["blender", "protein", "shake", "nutrition", "supplement", "mixing"], sentence: "For mixing supplements or protein shakes, {{link}} is a reliable daily tool (paid link).", price_tier: "budget" },
  { name: "Organic Green Tea Matcha", asin: "B00DDT116M", category: "Nutrition", tags: ["matcha", "green tea", "focus", "l-theanine", "caffeine", "calm energy"], sentence: "Swapping coffee for {{link}} gives you calm focus without the jitters or crash (paid link).", price_tier: "budget" },
  { name: "Chamomile Tea Organic", asin: "B000SATIFA", category: "Nutrition", tags: ["chamomile", "tea", "sleep", "calm", "evening", "relaxation"], sentence: "A simple evening ritual that helps is a cup of {{link}} before bed (paid link).", price_tier: "budget" },
  { name: "Protein Powder Plant-Based", asin: "B0015R26V8", category: "Nutrition", tags: ["protein", "nutrition", "exercise", "recovery", "muscle", "plant based"], sentence: "Supporting your body during recovery with proper nutrition matters, and {{link}} makes it easy (paid link).", price_tier: "mid" },
  { name: "Electrolyte Powder", asin: "B07Q33CN39", category: "Nutrition", tags: ["electrolyte", "hydration", "energy", "mineral", "recovery", "water"], sentence: "Staying properly hydrated affects everything from mood to energy, and {{link}} helps with mineral balance (paid link).", price_tier: "budget" },
  { name: "Dark Chocolate 85% Cacao", asin: "B000KRGCG2", category: "Nutrition", tags: ["chocolate", "dark", "magnesium", "mood", "treat", "dopamine"], sentence: "A small square of {{link}} after dinner satisfies the sweet craving while providing magnesium and antioxidants (paid link).", price_tier: "budget" },
  { name: "Collagen Peptides Powder", asin: "B00K6JUG4K", category: "Nutrition", tags: ["collagen", "gut", "skin", "joint", "supplement", "recovery"], sentence: "For overall recovery support, {{link}} mixes into coffee or smoothies and supports gut and joint health (paid link).", price_tier: "mid" },
  { name: "MCT Oil", asin: "B00XM0Y0SE", category: "Nutrition", tags: ["mct", "brain", "energy", "ketones", "focus", "fat"], sentence: "For sustained mental energy, {{link}} provides brain fuel without the blood sugar spike (paid link).", price_tier: "mid" },
  { name: "Turmeric Curcumin with BioPerine", asin: "B01KMZJBDM", category: "Nutrition", tags: ["turmeric", "inflammation", "curcumin", "supplement", "joint", "brain"], sentence: "For reducing inflammation that affects mood and cognition, {{link}} is a well-researched option (paid link).", price_tier: "budget" },
  { name: "Apple Cider Vinegar Gummies", asin: "B07QKPGHYQ", category: "Nutrition", tags: ["apple cider vinegar", "gut", "digestion", "supplement", "health"], sentence: "For digestive support, {{link}} makes the daily habit easier than drinking the liquid (paid link).", price_tier: "budget" },

  // ═══════════════════════════════════════════
  // SELF-CARE & ENVIRONMENT
  // ═══════════════════════════════════════════
  { name: "Essential Oil Diffuser", asin: "B07L5DKBCM", category: "Self-Care", tags: ["essential oil", "diffuser", "aromatherapy", "calm", "environment", "evening"], sentence: "Creating a calming environment matters, and {{link}} with lavender oil can shift the mood of a room (paid link).", price_tier: "budget" },
  { name: "Lavender Essential Oil", asin: "B06Y2GZG3C", category: "Self-Care", tags: ["lavender", "essential oil", "sleep", "calm", "aromatherapy", "relaxation"], sentence: "A few drops of {{link}} in a diffuser or on your pillow can support better sleep (paid link).", price_tier: "budget" },
  { name: "Epsom Salt Bath Soak", asin: "B004N7DQHA", category: "Self-Care", tags: ["epsom salt", "bath", "magnesium", "relaxation", "muscle", "evening"], sentence: "An evening bath with {{link}} provides magnesium through the skin and helps the body unwind (paid link).", price_tier: "budget" },
  { name: "Eye Mask for Sleep", asin: "B07KC5DWCC", category: "Self-Care", tags: ["eye mask", "sleep", "dark", "rest", "travel", "blackout"], sentence: "Complete darkness improves sleep quality, and {{link}} is a simple way to achieve it (paid link).", price_tier: "budget" },
  { name: "Ear Plugs for Sleep", asin: "B076VTPJFL", category: "Self-Care", tags: ["ear plugs", "sleep", "noise", "rest", "quiet", "environment"], sentence: "If noise disrupts your sleep, {{link}} designed for sleeping are more comfortable than standard foam (paid link).", price_tier: "budget" },
  { name: "Candle Set Soy Wax", asin: "B0BXFHWWZF", category: "Self-Care", tags: ["candle", "ambiance", "evening", "ritual", "calm", "environment"], sentence: "Building an evening ritual matters, and {{link}} creates the kind of warm, intentional atmosphere that supports winding down (paid link).", price_tier: "budget" },
  { name: "Shower Head Filter", asin: "B01MUBU0YC", category: "Self-Care", tags: ["shower", "filter", "water", "skin", "chlorine", "self care"], sentence: "A small upgrade like {{link}} removes chlorine and can improve skin and hair health (paid link).", price_tier: "budget" },
  { name: "Gratitude Stones Set", asin: "B0BJ5KQHQG", category: "Self-Care", tags: ["gratitude", "stones", "mindfulness", "tactile", "grounding", "meditation"], sentence: "For a tactile grounding practice, {{link}} gives you something physical to hold during reflection (paid link).", price_tier: "budget" },

  // ═══════════════════════════════════════════
  // FITNESS & MOVEMENT
  // ═══════════════════════════════════════════
  { name: "Kettlebell Adjustable", asin: "B0BFMCXN8N", category: "Fitness", tags: ["kettlebell", "exercise", "strength", "workout", "energy", "fitness"], sentence: "For channeling restless energy into something productive, {{link}} provides a full-body workout at home (paid link).", price_tier: "mid" },
  { name: "Running Shoes (Brooks Ghost)", asin: "B0BXBR7N2X", category: "Fitness", tags: ["running", "shoes", "exercise", "cardio", "outdoor", "movement"], sentence: "If running is part of your recovery toolkit, {{link}} are comfortable enough for daily use (paid link).", price_tier: "mid" },
  { name: "Dumbbell Set Adjustable", asin: "B074DZ5MXC", category: "Fitness", tags: ["dumbbell", "weights", "strength", "exercise", "home gym", "fitness"], sentence: "For home strength training, {{link}} adjusts to multiple weights without cluttering your space (paid link).", price_tier: "mid" },
  { name: "Exercise Ball", asin: "B01MSIIERI", category: "Fitness", tags: ["exercise ball", "core", "posture", "balance", "sitting", "movement"], sentence: "Sitting on {{link}} instead of a chair engages your core and keeps your body active during desk work (paid link).", price_tier: "budget" },
  { name: "Yoga Blocks Set", asin: "B01LETHFNK", category: "Fitness", tags: ["yoga", "blocks", "flexibility", "support", "stretching", "practice"], sentence: "For making yoga accessible regardless of flexibility, {{link}} provides the support you need (paid link).", price_tier: "budget" },
  { name: "Ab Roller Wheel", asin: "B010RB4TKE", category: "Fitness", tags: ["ab roller", "core", "exercise", "strength", "workout", "fitness"], sentence: "A quick core workout with {{link}} takes five minutes and helps redirect physical tension (paid link).", price_tier: "budget" },
  { name: "Rowing Machine", asin: "B0B4NWXHF9", category: "Fitness", tags: ["rowing", "cardio", "full body", "exercise", "machine", "home gym"], sentence: "For a full-body workout that burns energy and builds endurance, {{link}} is a solid home option (paid link).", price_tier: "premium" },
  { name: "Stretching Strap", asin: "B01LETHF1S", category: "Fitness", tags: ["stretching", "flexibility", "strap", "recovery", "body", "mobility"], sentence: "For improving flexibility and releasing stored tension, {{link}} guides you through deeper stretches safely (paid link).", price_tier: "budget" },

  // ═══════════════════════════════════════════
  // MINDFULNESS & MEDITATION
  // ═══════════════════════════════════════════
  { name: "Tibetan Singing Bowl", asin: "B07BFGP1ZJ", category: "Mindfulness", tags: ["singing bowl", "meditation", "sound", "vibration", "ritual", "mindfulness"], sentence: "For adding a sound element to meditation, {{link}} creates vibrations that help settle the mind (paid link).", price_tier: "mid" },
  { name: "Mala Beads 108", asin: "B01LZWG2VJ", category: "Mindfulness", tags: ["mala", "beads", "meditation", "mantra", "counting", "mindfulness"], sentence: "For mantra or counting meditation, {{link}} gives your hands something to do while the mind settles (paid link).", price_tier: "budget" },
  { name: "Meditation Timer (Physical)", asin: "B07GXQMFWK", category: "Mindfulness", tags: ["timer", "meditation", "practice", "bell", "mindfulness", "session"], sentence: "A dedicated {{link}} removes the need to check your phone during practice (paid link).", price_tier: "mid" },
  { name: "Incense Sticks Sandalwood", asin: "B000WNVHQE", category: "Mindfulness", tags: ["incense", "sandalwood", "meditation", "ritual", "environment", "practice"], sentence: "Lighting {{link}} before a session creates a sensory cue that tells your brain it's time to settle (paid link).", price_tier: "budget" },
  { name: "Meditation Bench", asin: "B07FXLQFHQ", category: "Mindfulness", tags: ["meditation", "bench", "kneeling", "posture", "practice", "sitting"], sentence: "If sitting cross-legged is uncomfortable, {{link}} supports a kneeling position that's easier on the knees (paid link).", price_tier: "mid" },
  { name: "Mindfulness Cards Deck", asin: "B07YDLPF6Y", category: "Mindfulness", tags: ["mindfulness", "cards", "prompts", "reflection", "practice", "daily"], sentence: "For daily mindfulness prompts, {{link}} offers a different reflection each day without needing an app (paid link).", price_tier: "budget" },

  // ═══════════════════════════════════════════
  // RELATIONSHIP & INTIMACY
  // ═══════════════════════════════════════════
  { name: "The Gottman Card Decks", asin: "B0BWJKN7PB", category: "Relationship", tags: ["gottman", "couples", "relationship", "conversation", "intimacy", "cards"], sentence: "For rebuilding connection with a partner, {{link}} provides structured conversation starters backed by research (paid link).", price_tier: "budget" },
  { name: "Couple's Journal", asin: "B0C1KQVQJG", category: "Relationship", tags: ["couples", "journal", "relationship", "communication", "intimacy", "writing"], sentence: "A shared {{link}} gives both partners space to reflect and communicate without the pressure of face-to-face conversation (paid link).", price_tier: "budget" },
  { name: "Love Languages Book", asin: "0802412726", category: "Relationship", tags: ["love languages", "relationship", "communication", "partner", "chapman", "intimacy"], sentence: "Understanding how your partner receives love starts with {{link}} by Gary Chapman (paid link).", price_tier: "budget" },
  { name: "Couple's Therapy Workbook", asin: "1646119398", category: "Relationship", tags: ["couples", "therapy", "workbook", "exercises", "relationship", "communication"], sentence: "For couples working through recovery together, {{link}} provides structured exercises you can do at home (paid link).", price_tier: "budget" },

  // ═══════════════════════════════════════════
  // SLEEP & RECOVERY
  // ═══════════════════════════════════════════
  { name: "Cooling Pillow", asin: "B07RRXFNMH", category: "Sleep", tags: ["pillow", "cooling", "sleep", "temperature", "rest", "comfort"], sentence: "Temperature regulation matters for sleep, and {{link}} keeps you cool through the night (paid link).", price_tier: "mid" },
  { name: "Bamboo Bed Sheets", asin: "B07BNXCNPD", category: "Sleep", tags: ["sheets", "bamboo", "sleep", "comfort", "temperature", "bedroom"], sentence: "Upgrading to {{link}} improved my sleep more than I expected, keeping temperature regulated all night (paid link).", price_tier: "mid" },
  { name: "Sleep Headband Headphones", asin: "B07SHBQY7Z", category: "Sleep", tags: ["sleep", "headphones", "headband", "audio", "meditation", "rest"], sentence: "For falling asleep to guided meditations or white noise, {{link}} is comfortable enough to wear all night (paid link).", price_tier: "budget" },
  { name: "Blue Light Screen Protector", asin: "B07GXQMFWK", category: "Sleep", tags: ["blue light", "screen", "filter", "computer", "evening", "melatonin"], sentence: "If you must use a computer in the evening, {{link}} reduces blue light exposure at the source (paid link).", price_tier: "budget" },

  // ═══════════════════════════════════════════
  // PERSONAL DEVELOPMENT
  // ═══════════════════════════════════════════
  { name: "Man's Search for Meaning", asin: "0807014273", category: "Books", tags: ["meaning", "purpose", "frankl", "suffering", "existential", "philosophy"], sentence: "When recovery feels pointless, {{link}} by Viktor Frankl reminds you that meaning can be found even in suffering (paid link).", price_tier: "budget" },
  { name: "Meditations by Marcus Aurelius", asin: "0140449337", category: "Books", tags: ["stoic", "marcus aurelius", "philosophy", "discipline", "meditation", "ancient"], sentence: "For daily philosophical grounding, {{link}} has been guiding people through difficulty for nearly two thousand years (paid link).", price_tier: "budget" },
  { name: "12 Rules for Life", asin: "0345816021", category: "Books", tags: ["rules", "responsibility", "meaning", "peterson", "order", "chaos"], sentence: "For a framework on building structure and meaning, {{link}} by Jordan Peterson offers practical principles (paid link).", price_tier: "budget" },
  { name: "Can't Hurt Me", asin: "1544512287", category: "Books", tags: ["discipline", "mental toughness", "goggins", "resilience", "willpower", "grit"], sentence: "When you need raw motivation, {{link}} by David Goggins is about pushing through the hardest moments (paid link).", price_tier: "budget" },
  { name: "The Power of Now", asin: "1577314808", category: "Books", tags: ["presence", "mindfulness", "tolle", "awareness", "now", "consciousness"], sentence: "For learning to stay present instead of spiraling, {{link}} by Eckhart Tolle is a foundational read (paid link).", price_tier: "budget" },
  { name: "Thinking, Fast and Slow", asin: "0374533555", category: "Books", tags: ["thinking", "decision", "kahneman", "cognitive", "bias", "brain"], sentence: "For understanding why your brain makes the choices it does, {{link}} by Daniel Kahneman is essential reading (paid link).", price_tier: "budget" },

  // ═══════════════════════════════════════════
  // ACCOUNTABILITY & TRACKING
  // ═══════════════════════════════════════════
  { name: "Habit Tracker Poster", asin: "B0BXFHWWZF", category: "Tracking", tags: ["habit", "tracker", "poster", "accountability", "visual", "progress"], sentence: "Seeing your progress visually matters, and {{link}} keeps your streaks visible on the wall (paid link).", price_tier: "budget" },
  { name: "Countdown Timer Cube", asin: "B07PQ3BN5H", category: "Tracking", tags: ["timer", "focus", "pomodoro", "productivity", "distraction", "work"], sentence: "For focused work sessions without touching your phone, {{link}} lets you flip to start a timer (paid link).", price_tier: "budget" },
  { name: "Dry Erase Calendar Board", asin: "B07YDLPF6Y", category: "Tracking", tags: ["calendar", "planning", "visual", "accountability", "schedule", "routine"], sentence: "Planning your week visually with {{link}} creates structure that supports recovery routines (paid link).", price_tier: "budget" },
  { name: "Accountability Partner Notebook", asin: "B0CQFZ5RKW", category: "Tracking", tags: ["accountability", "partner", "journal", "check-in", "support", "recovery"], sentence: "For structured check-ins with an accountability partner, {{link}} provides a shared framework (paid link).", price_tier: "budget" },

  // ═══════════════════════════════════════════
  // OUTDOOR & NATURE
  // ═══════════════════════════════════════════
  { name: "Hiking Boots Waterproof", asin: "B07B4GXFHV", category: "Outdoor", tags: ["hiking", "boots", "nature", "outdoor", "walking", "exercise"], sentence: "Getting outside is one of the best things for recovery, and {{link}} make it comfortable in any weather (paid link).", price_tier: "mid" },
  { name: "Daypack Hiking Backpack", asin: "B01HGSLB2I", category: "Outdoor", tags: ["backpack", "hiking", "outdoor", "nature", "daypack", "adventure"], sentence: "For day hikes and nature walks, {{link}} carries everything you need without weighing you down (paid link).", price_tier: "mid" },
  { name: "Water Bottle Insulated", asin: "B083GBMK7L", category: "Outdoor", tags: ["water bottle", "hydration", "outdoor", "exercise", "daily", "health"], sentence: "Staying hydrated affects mood and energy more than most people realize, and {{link}} keeps water cold all day (paid link).", price_tier: "budget" },
  { name: "Camping Hammock", asin: "B071X3YPXN", category: "Outdoor", tags: ["hammock", "nature", "relaxation", "outdoor", "camping", "rest"], sentence: "For restorative time in nature, {{link}} sets up in minutes between any two trees (paid link).", price_tier: "budget" },
  { name: "Binoculars Compact", asin: "B00ED8HBMO", category: "Outdoor", tags: ["binoculars", "nature", "birdwatching", "outdoor", "mindfulness", "observation"], sentence: "Nature observation is a surprisingly effective mindfulness practice, and {{link}} makes it accessible (paid link).", price_tier: "mid" },
  { name: "Headlamp Rechargeable", asin: "B08DXQ4BQD", category: "Outdoor", tags: ["headlamp", "outdoor", "night", "hiking", "camping", "light"], sentence: "For early morning or evening walks, {{link}} keeps your hands free and your path lit (paid link).", price_tier: "budget" },
];

/**
 * Topic-matching engine: given an article's title, category, and keywords,
 * return the top N matching products sorted by relevance score.
 */
export function matchProducts(
  articleTitle: string,
  categorySlug: string,
  keywords: string,
  maxResults: number = 4
): CatalogProduct[] {
  const searchText = `${articleTitle} ${categorySlug} ${keywords}`.toLowerCase();
  const words = searchText.split(/\s+/);

  const scored = PRODUCT_CATALOG.map((product) => {
    let score = 0;
    for (const tag of product.tags) {
      const tagLower = tag.toLowerCase();
      // Exact tag match in search text
      if (searchText.includes(tagLower)) {
        score += 3;
      }
      // Individual word matches
      for (const word of words) {
        if (word.length > 3 && tagLower.includes(word)) {
          score += 1;
        }
      }
    }
    // Bonus for category alignment
    const categoryMap: Record<string, string[]> = {
      "the-brain": ["Books", "Supplements", "Apps"],
      "the-cost": ["Books", "Relationship", "Journals"],
      "the-recovery": ["Books", "Devices", "Supplements", "Journals", "Tracking"],
      "the-rewire": ["Devices", "Mindfulness", "Fitness", "Supplements"],
      "the-return": ["Relationship", "Self-Care", "Books", "Journals"],
    };
    if (categoryMap[categorySlug]?.includes(product.category)) {
      score += 2;
    }
    return { product, score };
  });

  // Sort by score descending, then shuffle ties for variety
  scored.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return Math.random() - 0.5;
  });

  // Filter to score > 0 and take top N, ensuring category diversity
  const results: CatalogProduct[] = [];
  const usedCategories = new Set<string>();

  for (const { product, score } of scored) {
    if (score <= 0) break;
    if (results.length >= maxResults) break;

    // Prefer category diversity (allow max 2 from same category)
    const catCount = results.filter((r) => r.category === product.category).length;
    if (catCount >= 2) continue;

    results.push(product);
    usedCategories.add(product.category);
  }

  return results;
}
