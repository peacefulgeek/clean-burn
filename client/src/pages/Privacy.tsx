import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";

export default function Privacy() {
  return (
    <Layout>
      <SEOHead title="Privacy Policy" description="Privacy policy for The Clean Burn." canonicalPath="/privacy" noindex />
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-28 bg-[var(--deep)]">
        <div className="container max-w-3xl">
          <h1 className="font-heading text-4xl font-black text-white mb-8">Privacy Policy</h1>
          <div className="space-y-6 text-[var(--warm-muted)] leading-relaxed">
            <p><strong className="text-[var(--warm-white)]">Last updated:</strong> March 2026</p>
            <p>The Clean Burn ("we," "us," or "our") respects your privacy. This Privacy Policy explains how we collect, use, and protect information when you visit cleanburn.love.</p>
            <h2 className="font-heading text-xl font-bold text-white mt-8">Information We Collect</h2>
            <p>We collect minimal, anonymized analytics data (page views, referral sources, browser type) through privacy-focused analytics. We do not use cookies for tracking. We do not collect personal information unless you voluntarily provide it (e.g., subscribing to our newsletter).</p>
            <h2 className="font-heading text-xl font-bold text-white mt-8">Newsletter</h2>
            <p>If you subscribe to our newsletter, your email address is stored securely on Bunny CDN storage. We will only use it to send you new article notifications. You can unsubscribe at any time by contacting us.</p>
            <h2 className="font-heading text-xl font-bold text-white mt-8">Content Delivery</h2>
            <p>We use Bunny CDN to deliver images and static assets. Bunny CDN may collect standard server logs (IP addresses, user agents) as part of normal CDN operation. See <a href="https://bunny.net/privacy" target="_blank" rel="noopener noreferrer" className="text-[var(--amber)] no-underline hover:underline">Bunny.net Privacy Policy</a>.</p>
            <h2 className="font-heading text-xl font-bold text-white mt-8">Cookies</h2>
            <p>This site uses only essential cookies to remember your cookie consent preference. No advertising or tracking cookies are used.</p>
            <h2 className="font-heading text-xl font-bold text-white mt-8">Third-Party Links</h2>
            <p>Articles may link to external resources. We are not responsible for the privacy practices of external sites.</p>
            <h2 className="font-heading text-xl font-bold text-white mt-8">Your Rights</h2>
            <p>Since we do not collect personal data beyond optional newsletter subscriptions, there is generally no personal information to access, correct, or delete. If you have questions about your privacy, you may contact us through the author's website.</p>
            <h2 className="font-heading text-xl font-bold text-white mt-8">Contact</h2>
            <p>For privacy-related inquiries, visit <a href="https://kalesh.love" target="_blank" rel="noopener noreferrer" className="text-[var(--amber)] no-underline hover:underline">kalesh.love</a>.</p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
