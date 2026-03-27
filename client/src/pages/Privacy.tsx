import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";

export default function Privacy() {
  return (
    <Layout>
      <SEOHead title="Privacy Policy" description="Privacy policy for The Clean Burn." canonicalPath="/privacy" noindex />
      <section className="container max-w-3xl mx-auto px-4 py-16 lg:py-24">
        <h1 className="font-heading text-3xl lg:text-4xl font-black text-[var(--charcoal)] mb-8">Privacy Policy</h1>
        <div className="space-y-6 text-[var(--charcoal)]/70 leading-relaxed">
          <p>Last updated: March 2026</p>
          <p>The Clean Burn ("we," "us," or "our") respects your privacy. This Privacy Policy explains how we collect, use, and protect information when you visit cleanburn.love.</p>
          <h2 className="font-heading text-xl font-bold text-[var(--charcoal)] mt-8">Information We Collect</h2>
          <p>We collect minimal, anonymized analytics data (page views, referral sources, browser type) through privacy-focused analytics. We do not use cookies for tracking. We do not collect personal information unless you voluntarily provide it.</p>
          <h2 className="font-heading text-xl font-bold text-[var(--charcoal)] mt-8">How We Use Information</h2>
          <p>Analytics data is used solely to understand which content is most helpful and to improve the site. We do not sell, share, or monetize any visitor data.</p>
          <h2 className="font-heading text-xl font-bold text-[var(--charcoal)] mt-8">Third-Party Services</h2>
          <p>Images and fonts are served via Bunny CDN. We use privacy-focused analytics that does not track individual users. No advertising networks or social media trackers are present on this site.</p>
          <h2 className="font-heading text-xl font-bold text-[var(--charcoal)] mt-8">Your Rights</h2>
          <p>Since we do not collect personal data, there is generally no personal information to access, correct, or delete. If you have questions about your privacy, you may contact us through the author's website.</p>
          <h2 className="font-heading text-xl font-bold text-[var(--charcoal)] mt-8">Changes</h2>
          <p>We may update this policy from time to time. Changes will be reflected on this page with an updated date.</p>
        </div>
      </section>
    </Layout>
  );
}
