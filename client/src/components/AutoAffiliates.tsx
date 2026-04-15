/**
 * AutoAffiliates — Runtime affiliate link injection component
 *
 * Renders:
 *   1. The article body_html with up to 1 inline product recommendation
 *      injected at a natural breakpoint (after ~3-4 paragraphs)
 *   2. A bottom "Recovery Toolkit" section with 3-4 soft product suggestions
 *   3. Amazon Associate disclosure
 *
 * Rules:
 *   - Strictly 2-4 Amazon links per article total
 *   - Auto-injected links count toward this limit
 *   - Existing links in body_html are counted first
 *   - Soft, conversational language only
 *   - Each recommendation ends with (paid link)
 */

import { useMemo } from "react";
import { getArticleAffiliates, countAmazonLinks } from "@/data/inline-affiliate-links";
import type { Article } from "@/data";

interface AutoAffiliatesProps {
  article: Article;
}

export default function AutoAffiliates({ article }: AutoAffiliatesProps) {
  const { processedHtml, bottomProducts, totalLinks } = useMemo(() => {
    const existingCount = countAmazonLinks(article.body_html);
    const affiliateData = getArticleAffiliates(
      article.title,
      article.category_slug,
      article.meta_keywords,
      existingCount
    );

    let html = article.body_html;

    // Inject inline link(s) at natural breakpoints (after 3rd-4th paragraph)
    if (affiliateData.inlineLinks.length > 0) {
      const paragraphs = html.split("</p>");
      const insertAfter = Math.min(3, Math.max(2, Math.floor(paragraphs.length * 0.3)));

      if (paragraphs.length > insertAfter + 1) {
        const inlineHtml = affiliateData.inlineLinks
          .map((link) => `<p>${link.sentence}</p>`)
          .join("");

        paragraphs.splice(insertAfter, 0, inlineHtml.replace(/<\/p>$/, ""));
        html = paragraphs.join("</p>");
      }
    }

    return {
      processedHtml: html,
      bottomProducts: affiliateData.bottomProducts,
      totalLinks: affiliateData.totalLinkCount,
    };
  }, [article]);

  return (
    <>
      {/* Article body with injected inline links */}
      <div
        className="article-body"
        dangerouslySetInnerHTML={{ __html: processedHtml }}
      />

      {/* Recovery Toolkit section (bottom products) */}
      {bottomProducts.length > 0 && (
        <div className="mt-10 mb-6 bg-[var(--deep-card)] border border-[var(--amber)]/10 rounded-2xl p-6 lg:p-8">
          <h3 className="font-heading text-lg font-bold text-[var(--warm-white)] mb-2">
            Recovery Toolkit
          </h3>
          <p className="text-sm text-[var(--warm-subtle)] mb-5">
            A few tools that readers working through similar topics have found helpful.
          </p>
          <div className="space-y-4">
            {bottomProducts.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3 text-sm text-[var(--warm-muted)] leading-relaxed"
              >
                <span className="text-[var(--amber)] mt-0.5 shrink-0">&#9679;</span>
                <span dangerouslySetInnerHTML={{ __html: item.sentence }} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Amazon Associate disclosure */}
      {totalLinks > 0 && (
        <div className="mt-4 mb-6 px-4 py-3 bg-[var(--amber)]/5 border border-[var(--amber)]/10 rounded-lg">
          <p className="text-xs text-[var(--warm-subtle)]">
            As an Amazon Associate, I earn from qualifying purchases.
          </p>
        </div>
      )}
    </>
  );
}
