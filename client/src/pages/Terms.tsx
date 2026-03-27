import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";

export default function Terms() {
  return (
    <Layout>
      <SEOHead title="Terms of Use" description="Terms of use for The Clean Burn." canonicalPath="/terms" noindex />
      <section className="container max-w-3xl mx-auto px-4 py-16 lg:py-24">
        <h1 className="font-heading text-3xl lg:text-4xl font-black text-[var(--charcoal)] mb-8">Terms of Use</h1>
        <div className="space-y-6 text-[var(--charcoal)]/70 leading-relaxed">
          <p>Last updated: March 2026</p>
          <p>By accessing and using The Clean Burn (cleanburn.love), you agree to the following terms.</p>
          <h2 className="font-heading text-xl font-bold text-[var(--charcoal)] mt-8">Educational Purpose</h2>
          <p>All content on this site is provided for educational and informational purposes only. It is not intended as medical, psychological, or psychiatric advice. Always consult a qualified healthcare professional for personal health concerns.</p>
          <h2 className="font-heading text-xl font-bold text-[var(--charcoal)] mt-8">Intellectual Property</h2>
          <p>All articles, images, and original content on this site are the intellectual property of the author and The Clean Burn. You may share links to articles but may not reproduce, republish, or redistribute content without written permission.</p>
          <h2 className="font-heading text-xl font-bold text-[var(--charcoal)] mt-8">No Professional Relationship</h2>
          <p>Reading this site does not create a therapist-client, doctor-patient, or any other professional relationship. The self-assessment quiz is for self-reflection only and is not a diagnostic tool.</p>
          <h2 className="font-heading text-xl font-bold text-[var(--charcoal)] mt-8">Limitation of Liability</h2>
          <p>The Clean Burn and its author are not liable for any actions taken based on the content of this site. Use the information at your own discretion and risk.</p>
          <h2 className="font-heading text-xl font-bold text-[var(--charcoal)] mt-8">Changes</h2>
          <p>We reserve the right to modify these terms at any time. Continued use of the site constitutes acceptance of updated terms.</p>
        </div>
      </section>
    </Layout>
  );
}
