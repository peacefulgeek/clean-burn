/**
 * Article Quality Gate — enforces word count, em-dashes, AI words/phrases, voice signals, Amazon links.
 * Every article must pass ALL checks before storage.
 */

// Words that flag content as AI-generated
const AI_FLAGGED_WORDS = [
  'delve', 'tapestry', 'paradigm', 'synergy', 'leverage', 'unlock', 'empower',
  'utilize', 'pivotal', 'embark', 'underscore', 'paramount', 'seamlessly',
  'robust', 'beacon', 'foster', 'elevate', 'curate', 'curated', 'bespoke',
  'resonate', 'harness', 'intricate', 'plethora', 'myriad', 'comprehensive',
  'transformative', 'groundbreaking', 'innovative', 'cutting-edge', 'revolutionary',
  'state-of-the-art', 'ever-evolving', 'game-changing', 'next-level', 'world-class',
  'unparalleled', 'unprecedented', 'remarkable', 'extraordinary', 'exceptional',
  'profound', 'holistic', 'nuanced', 'multifaceted', 'stakeholders',
  'ecosystem', 'landscape', 'realm', 'sphere', 'domain',
  'arguably', 'notably', 'crucially', 'importantly', 'essentially',
  'fundamentally', 'inherently', 'intrinsically', 'substantively',
  'streamline', 'optimize', 'facilitate', 'amplify', 'catalyze',
  'propel', 'spearhead', 'orchestrate', 'navigate', 'traverse',
  'furthermore', 'moreover', 'additionally', 'consequently', 'subsequently',
  'thereby', 'thusly', 'wherein', 'whereby'
];

const AI_FLAGGED_PHRASES = [
  "it's important to note that", "it's worth noting that", "it's worth mentioning",
  "it's crucial to", "it is essential to", "in conclusion,", "in summary,",
  "to summarize,", "a holistic approach", "unlock your potential", "unlock the power",
  "in the realm of", "in the world of", "dive deep into", "dive into", "delve into",
  "at the end of the day", "in today's fast-paced world", "in today's digital age",
  "in today's modern world", "in this digital age", "when it comes to",
  "navigate the complexities", "a testament to", "speaks volumes",
  "the power of", "the beauty of", "the art of", "the journey of",
  "the key lies in", "plays a crucial role", "plays a vital role",
  "plays a significant role", "plays a pivotal role", "a wide array of",
  "a wide range of", "a plethora of", "a myriad of", "stands as a",
  "serves as a", "acts as a", "has emerged as", "continues to evolve",
  "has revolutionized", "cannot be overstated", "it goes without saying",
  "needless to say", "last but not least", "first and foremost"
];

const AMAZON_LINK_RE = /https:\/\/www\.amazon\.com\/dp\/([A-Z0-9]{10})(?:\/[^"\s?]*)?(?:\?[^"\s]*)?/g;

export function countWords(text) {
  const stripped = text.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  return stripped ? stripped.split(/\s+/).length : 0;
}

export function hasEmDash(text) {
  return text.includes('\u2014');
}

export function findFlaggedWords(text) {
  const stripped = text.replace(/<[^>]+>/g, ' ').toLowerCase();
  return AI_FLAGGED_WORDS.filter(w => {
    const escaped = w.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
    return new RegExp(`\\b${escaped}\\b`, 'i').test(stripped);
  });
}

export function findFlaggedPhrases(text) {
  const stripped = text.replace(/<[^>]+>/g, ' ').toLowerCase().replace(/\s+/g, ' ');
  return AI_FLAGGED_PHRASES.filter(p => stripped.includes(p));
}

export function countAmazonLinks(text) {
  return (text.match(AMAZON_LINK_RE) || []).length;
}

export function extractAsinsFromText(text) {
  const asins = new Set();
  let m;
  const re = new RegExp(AMAZON_LINK_RE.source, 'g');
  while ((m = re.exec(text)) !== null) asins.add(m[1]);
  return [...asins];
}

export function voiceSignals(text) {
  const stripped = text.replace(/<[^>]+>/g, ' ');
  const lower = stripped.toLowerCase();
  const words = countWords(text);

  const contractions = (lower.match(/\b\w+'(s|re|ve|d|ll|m|t)\b/g) || []).length;
  const directAddress = (lower.match(/\byou('re|r|rself|)?\b/g) || []).length;
  const firstPerson = (lower.match(/\b(i|i'm|i've|i'd|i'll|my|me|mine)\b/g) || []).length;

  const sentences = stripped.split(/(?<=[.!?])\s+/).filter(s => s.trim().length > 0);
  const lengths = sentences.map(s => s.split(/\s+/).length);
  const avg = lengths.reduce((a, b) => a + b, 0) / (lengths.length || 1);
  const variance = lengths.reduce((sum, len) => sum + Math.pow(len - avg, 2), 0) / (lengths.length || 1);
  const stdDev = Math.sqrt(variance);
  const shortSentences = lengths.filter(l => l <= 6).length;

  const conversationalMarkers = [
    /\bhere's the thing\b/i, /\blook,\s/i, /\bhonestly,?\s/i, /\btruth is\b/i,
    /\bthe truth\b/i, /\bi'll tell you\b/i, /\bthink about it\b/i,
    /\bthat said\b/i, /\bbut here's\b/i, /\bso yeah\b/i, /\bkind of\b/i,
    /\bsort of\b/i, /\byou know\b/i
  ];
  const markerCount = conversationalMarkers.filter(r => r.test(stripped)).length;

  return {
    contractions,
    directAddress,
    firstPerson,
    sentenceCount: sentences.length,
    avgSentenceLength: +avg.toFixed(1),
    sentenceStdDev: +stdDev.toFixed(1),
    shortSentences,
    conversationalMarkers: markerCount,
    words
  };
}

export function runQualityGate(body) {
  const failures = [];
  const warnings = [];

  const words = countWords(body);
  if (words < 1200) failures.push(`words-too-low:${words}`);
  if (words > 2500) failures.push(`words-too-high:${words}`);

  const links = countAmazonLinks(body);
  if (links < 3) failures.push(`amazon-links-too-few:${links}`);
  if (links > 4) failures.push(`amazon-links-too-many:${links}`);

  if (hasEmDash(body)) failures.push('contains-em-dash');

  const bw = findFlaggedWords(body);
  if (bw.length > 0) failures.push(`ai-flagged-words:${bw.join(',')}`);

  const bp = findFlaggedPhrases(body);
  if (bp.length > 0) failures.push(`ai-flagged-phrases:${bp.join('|')}`);

  const voice = voiceSignals(body);
  const per1k = (n) => (n / words) * 1000;

  if (per1k(voice.contractions) < 4) {
    failures.push(`contractions-too-few:${voice.contractions}(${per1k(voice.contractions).toFixed(1)}/1k)`);
  }
  if (voice.directAddress === 0 && voice.firstPerson === 0) {
    failures.push('no-direct-address-or-first-person');
  }
  if (voice.sentenceStdDev < 4) {
    failures.push(`sentence-variance-too-low:${voice.sentenceStdDev}`);
  }
  if (voice.shortSentences < 2) {
    failures.push(`too-few-short-sentences:${voice.shortSentences}`);
  }
  if (voice.conversationalMarkers < 2) {
    warnings.push(`conversational-markers-low:${voice.conversationalMarkers}`);
  }

  return {
    passed: failures.length === 0,
    failures,
    warnings,
    wordCount: words,
    amazonLinks: links,
    asins: extractAsinsFromText(body),
    voice
  };
}

/** Hard rules prompt amendment for Anthropic article generation */
export const GENERATION_HARD_RULES = `
HARD RULES for this article:
- 1,600 to 2,000 words (strict)
- Zero em-dashes. Use commas, periods, colons, or parentheses instead.
- Never use these words: delve, tapestry, paradigm, synergy, leverage, unlock, empower, utilize, pivotal, embark, underscore, paramount, seamlessly, robust, beacon, foster, elevate, curate, curated, bespoke, resonate, harness, intricate, plethora, myriad, comprehensive, transformative, groundbreaking, innovative, cutting-edge, revolutionary, state-of-the-art, ever-evolving, profound, holistic, nuanced, multifaceted, stakeholders, ecosystem, furthermore, moreover, additionally, consequently, subsequently, thereby, streamline, optimize, facilitate, amplify, catalyze, landscape, realm, navigate, fundamentally, inherently, remarkable, unprecedented, importantly, domain, groundbreaking, extraordinary, exceptional, arguably, notably, crucially, essentially, intrinsically, substantively, propel, spearhead, orchestrate, traverse, thusly, wherein, whereby.
- Never use these phrases: "it's important to note," "in conclusion," "in summary," "in the realm of," "dive deep into," "at the end of the day," "in today's fast-paced world," "plays a crucial role," "a testament to," "when it comes to," "cannot be overstated," "the journey of," "the art of," "the power of," "the beauty of," "acts as a," "serves as a," "stands as a," "has emerged as," "continues to evolve," "it goes without saying," "first and foremost," "last but not least."
- Contractions throughout. You're. Don't. It's. That's. I've. We'll.
- Vary sentence length aggressively. Some fragments. Some long ones that stretch across a full breath. Some just three words.
- Direct address ("you") throughout OR first-person ("I / my") throughout. Pick one.
- Include at least 2 conversational openers somewhere in the piece: "Here's the thing," "Honestly," "Look," "Truth is," "But here's what's interesting," "Think about it," "That said."
- Concrete specifics over abstractions. A name. A number. A moment.
- 3 to 4 Amazon product links embedded naturally in prose, each followed by "(paid link)" in plain text. Use only ASINs from the provided catalog.
- No em-dashes. No em-dashes. No em-dashes.
`;
