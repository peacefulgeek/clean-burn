import { useEffect } from "react";
import { SITE_CONFIG } from "@/data";

interface SEOProps {
  title?: string;
  description?: string;
  ogImage?: string;
  ogType?: string;
  canonicalPath?: string;
  keywords?: string;
  articleDate?: string;
  articleAuthor?: string;
  noindex?: boolean;
}

export default function SEOHead({
  title,
  description,
  ogImage,
  ogType = "website",
  canonicalPath = "/",
  keywords,
  articleDate,
  articleAuthor,
  noindex,
}: SEOProps) {
  const fullTitle = title
    ? `${title} — ${SITE_CONFIG.title}`
    : `${SITE_CONFIG.title} — ${SITE_CONFIG.subtitle}`;
  const fullDescription = description || SITE_CONFIG.tagline;
  const fullUrl = `https://${SITE_CONFIG.domain}${canonicalPath}`;
  const fullOgImage = ogImage || `https://clean-burn.b-cdn.net/og/site-og.png`;

  useEffect(() => {
    document.title = fullTitle;

    const setMeta = (name: string, content: string, property = false) => {
      const attr = property ? "property" : "name";
      let el = document.querySelector(`meta[${attr}="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta("description", fullDescription);
    if (keywords) setMeta("keywords", keywords);
    if (noindex) setMeta("robots", "noindex, nofollow");
    setMeta("author", articleAuthor || SITE_CONFIG.author.name);

    // OG
    setMeta("og:title", fullTitle, true);
    setMeta("og:description", fullDescription, true);
    setMeta("og:url", fullUrl, true);
    setMeta("og:image", fullOgImage, true);
    setMeta("og:type", ogType, true);
    setMeta("og:site_name", SITE_CONFIG.title, true);

    // Twitter
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", fullTitle);
    setMeta("twitter:description", fullDescription);
    setMeta("twitter:image", fullOgImage);

    if (articleDate) {
      setMeta("article:published_time", articleDate, true);
      setMeta("article:author", articleAuthor || SITE_CONFIG.author.name, true);
    }

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", fullUrl);
  }, [fullTitle, fullDescription, fullUrl, fullOgImage, ogType, keywords, articleDate, articleAuthor, noindex]);

  return null;
}
