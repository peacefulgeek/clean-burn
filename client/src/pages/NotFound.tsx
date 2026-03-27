import Layout from "@/components/Layout";
import SEOHead from "@/components/SEOHead";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <Layout>
      <SEOHead title="Page Not Found" noindex />
      <section className="container max-w-xl mx-auto px-4 py-32 text-center">
        <div className="w-16 h-16 rounded-full bg-[var(--gold)]/20 flex items-center justify-center mx-auto mb-6">
          <span className="font-heading text-2xl font-bold text-[var(--gold)]">404</span>
        </div>
        <h1 className="font-heading text-3xl font-black text-[var(--charcoal)] mb-4">Page Not Found</h1>
        <p className="text-[var(--charcoal)]/50 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-[var(--charcoal)] text-white px-6 py-3 rounded-full text-sm font-medium hover:bg-[var(--charcoal)]/90 transition-colors no-underline"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
      </section>
    </Layout>
  );
}
