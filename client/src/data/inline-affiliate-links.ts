/**
 * Inline Affiliate Links — Natural embedding logic
 *
 * This module provides the logic for selecting which products to embed
 * in an article and generating the natural-sounding recommendation sentences.
 *
 * Rules:
 *   - Strictly 2-4 Amazon links per article total
 *   - Links spread at natural breakpoints (not clumped)
 *   - Each recommendation uses soft, conversational language
 *   - Each ends with (paid link)
 *   - Bottom "Recovery Toolkit" section with 3-4 soft suggestions
 */

import { matchProducts, amazonLink, type CatalogProduct, AFFILIATE_TAG } from "./product-catalog";

export interface InlineLink {
  html: string;        // Full anchor tag HTML
  sentence: string;    // Complete embedding sentence
  product: CatalogProduct;
}

export interface ArticleAffiliateData {
  inlineLinks: InlineLink[];       // 1-2 links to inject at natural breakpoints
  bottomProducts: InlineLink[];    // 3-4 products for the bottom section
  totalLinkCount: number;          // Must be 2-4
}

/**
 * Build the anchor tag for a product
 */
function buildAnchorTag(product: CatalogProduct): string {
  const url = amazonLink(product.asin);
  return `<a href="${url}" target="_blank" rel="noopener sponsored">${product.name}</a>`;
}

/**
 * Build the full embedding sentence with the link inserted
 */
function buildSentence(product: CatalogProduct): string {
  const anchor = buildAnchorTag(product);
  return product.sentence.replace("{{link}}", anchor);
}

/**
 * Select and prepare affiliate links for an article.
 *
 * @param articleTitle - Article title
 * @param categorySlug - Article category slug
 * @param keywords - Article meta_keywords
 * @param existingAmazonCount - Number of Amazon links already in the article body_html
 * @returns ArticleAffiliateData with inline and bottom section links
 */
export function getArticleAffiliates(
  articleTitle: string,
  categorySlug: string,
  keywords: string,
  existingAmazonCount: number = 0
): ArticleAffiliateData {
  // Total target: 2-4 Amazon links. Subtract existing ones.
  const maxNew = Math.max(0, 4 - existingAmazonCount);
  const minNew = Math.max(0, 2 - existingAmazonCount);

  if (maxNew === 0) {
    // Article already has enough links
    return { inlineLinks: [], bottomProducts: [], totalLinkCount: existingAmazonCount };
  }

  // Get matched products (request more than needed for selection)
  const matched = matchProducts(articleTitle, categorySlug, keywords, 8);

  if (matched.length === 0) {
    return { inlineLinks: [], bottomProducts: [], totalLinkCount: existingAmazonCount };
  }

  // Decide how many to inject: aim for 3-4 total (existing + new)
  const targetTotal = Math.min(4, Math.max(2, existingAmazonCount + Math.min(matched.length, maxNew)));
  const newCount = targetTotal - existingAmazonCount;

  // Split: 1 inline + rest in bottom section (or 2 inline if enough)
  const inlineCount = newCount >= 3 ? 1 : Math.min(1, newCount);
  const bottomCount = newCount - inlineCount;

  const inlineLinks: InlineLink[] = matched.slice(0, inlineCount).map((product) => ({
    html: buildAnchorTag(product),
    sentence: buildSentence(product),
    product,
  }));

  const bottomProducts: InlineLink[] = matched.slice(inlineCount, inlineCount + bottomCount).map((product) => ({
    html: buildAnchorTag(product),
    sentence: buildSentence(product),
    product,
  }));

  return {
    inlineLinks,
    bottomProducts,
    totalLinkCount: existingAmazonCount + inlineLinks.length + bottomProducts.length,
  };
}

/**
 * Count existing Amazon links in body HTML
 */
export function countAmazonLinks(bodyHtml: string): number {
  const matches = bodyHtml.match(/amazon\.com\/dp\//g);
  return matches ? matches.length : 0;
}
