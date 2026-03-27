import { Link, useLocation } from "wouter";
import { CATEGORIES, SITE_CONFIG } from "@/data";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[var(--fresh-white)]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-[var(--cream)]">
        <div className="container flex items-center justify-between h-16 lg:h-20">
          <Link href="/" className="flex items-center gap-2 no-underline">
            <span className="w-2 h-2 rounded-full bg-[var(--gold)]" />
            <span className="font-heading text-xl lg:text-2xl font-bold tracking-tight text-[var(--charcoal)]">
              The Clean Burn
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            <div className="relative group">
              <button
                className="flex items-center gap-1 text-sm font-medium text-[var(--charcoal)]/70 hover:text-[var(--charcoal)] transition-colors"
                onMouseEnter={() => setCatOpen(true)}
                onMouseLeave={() => setCatOpen(false)}
              >
                Categories <ChevronDown className="w-3.5 h-3.5" />
              </button>
              <div
                className={`absolute top-full left-0 pt-2 ${catOpen ? 'block' : 'hidden'} group-hover:block`}
                onMouseEnter={() => setCatOpen(true)}
                onMouseLeave={() => setCatOpen(false)}
              >
                <div className="bg-white rounded-xl shadow-lg border border-[var(--cream)] p-2 min-w-[200px]">
                  {CATEGORIES.map(cat => (
                    <Link
                      key={cat.slug}
                      href={`/category/${cat.slug}`}
                      className="block px-4 py-2.5 text-sm text-[var(--charcoal)]/80 hover:bg-[var(--cream)] rounded-lg transition-colors no-underline"
                    >
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <Link
              href="/about"
              className={`text-sm font-medium transition-colors no-underline ${
                location === '/about' ? 'text-[var(--charcoal)]' : 'text-[var(--charcoal)]/70 hover:text-[var(--charcoal)]'
              }`}
            >
              About
            </Link>
            <Link
              href="/quiz"
              className="text-sm font-medium bg-[var(--gold)] text-[var(--charcoal)] px-4 py-2 rounded-full hover:bg-[var(--gold)]/80 transition-colors no-underline"
            >
              Take the Quiz
            </Link>
          </nav>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2 text-[var(--charcoal)]"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile nav */}
        {mobileOpen && (
          <div className="lg:hidden bg-white border-t border-[var(--cream)] px-4 py-6 space-y-4">
            <p className="text-xs font-medium text-[var(--charcoal)]/50 uppercase tracking-wider">Categories</p>
            {CATEGORIES.map(cat => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className="block py-2 text-[var(--charcoal)]/80 no-underline"
                onClick={() => setMobileOpen(false)}
              >
                {cat.name}
              </Link>
            ))}
            <hr className="border-[var(--cream)]" />
            <Link href="/about" className="block py-2 text-[var(--charcoal)]/80 no-underline" onClick={() => setMobileOpen(false)}>
              About
            </Link>
            <Link
              href="/quiz"
              className="block text-center bg-[var(--gold)] text-[var(--charcoal)] font-medium px-4 py-3 rounded-full no-underline"
              onClick={() => setMobileOpen(false)}
            >
              Take the Quiz
            </Link>
          </div>
        )}
      </header>

      {/* Main content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-[var(--charcoal)] text-white/80">
        <div className="container py-16 lg:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
            {/* Brand */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-2 h-2 rounded-full bg-[var(--gold)]" />
                <span className="font-heading text-xl font-bold text-white">The Clean Burn</span>
              </div>
              <p className="text-sm text-white/60 leading-relaxed mb-4">
                Breaking free from porn without shame. Evidence-based recovery through neuroscience, somatic practices, and consciousness.
              </p>
              <p className="text-xs text-white/40">
                Written by{" "}
                <a href="https://kalesh.love" className="text-[var(--gold)] hover:text-white transition-colors no-underline">
                  Kalesh
                </a>
              </p>
            </div>

            {/* Categories */}
            <div>
              <h4 className="font-heading text-sm font-semibold text-white uppercase tracking-wider mb-4">Categories</h4>
              <ul className="space-y-2.5">
                {CATEGORIES.map(cat => (
                  <li key={cat.slug}>
                    <Link href={`/category/${cat.slug}`} className="text-sm text-white/60 hover:text-[var(--gold)] transition-colors no-underline">
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Pages */}
            <div>
              <h4 className="font-heading text-sm font-semibold text-white uppercase tracking-wider mb-4">Pages</h4>
              <ul className="space-y-2.5">
                <li><Link href="/about" className="text-sm text-white/60 hover:text-[var(--gold)] transition-colors no-underline">About</Link></li>
                <li><Link href="/quiz" className="text-sm text-white/60 hover:text-[var(--gold)] transition-colors no-underline">Recovery Quiz</Link></li>
                <li><Link href="/privacy" className="text-sm text-white/60 hover:text-[var(--gold)] transition-colors no-underline">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-sm text-white/60 hover:text-[var(--gold)] transition-colors no-underline">Terms of Use</Link></li>
              </ul>
            </div>

            {/* Author */}
            <div>
              <h4 className="font-heading text-sm font-semibold text-white uppercase tracking-wider mb-4">Author</h4>
              <p className="text-sm text-white/60 leading-relaxed">
                {SITE_CONFIG.author.name} — {SITE_CONFIG.author.title}
              </p>
              <a
                href={SITE_CONFIG.author.link}
                className="inline-block mt-3 text-sm text-[var(--gold)] hover:text-white transition-colors no-underline"
              >
                kalesh.love →
              </a>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs text-white/40">
              © {new Date().getFullYear()} The Clean Burn. All rights reserved.
            </p>
            <p className="text-xs text-white/30">
              This site is not a substitute for professional medical or psychological advice.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
