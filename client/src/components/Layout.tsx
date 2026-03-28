/*
 * DESIGN: "Luminous Awakening" — Dark canvas, amber/gold light
 * Header: Transparent → dark on scroll. Minimal. Amber accents.
 * Footer: Deep dark with warm amber glow lines.
 */
import { useState, useEffect, type ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { CATEGORIES, SITE_CONFIG } from "@/data";
import { ChevronDown, Menu, X, Flame } from "lucide-react";

function CookieConsent() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    if (!localStorage.getItem("cb-cookies")) setShow(true);
  }, []);
  if (!show) return null;
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[var(--deep-card)] border-t border-[var(--amber)]/10 px-4 py-3">
      <div className="container flex items-center justify-between gap-4">
        <p className="text-xs text-[var(--warm-muted)]">
          This site uses essential cookies and Bunny CDN for content delivery. We do not track individual users or use advertising cookies.{" "}
          <Link href="/privacy" className="text-[var(--amber)] underline underline-offset-2">Privacy Policy</Link>
        </p>
        <button
          onClick={() => { localStorage.setItem("cb-cookies", "1"); setShow(false); }}
          className="shrink-0 text-xs font-medium px-4 py-1.5 bg-[var(--amber)]/10 text-[var(--amber)] border border-[var(--amber)]/20 rounded-full hover:bg-[var(--amber)]/20 transition-colors"
        >
          Got it
        </button>
      </div>
    </div>
  );
}

function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "ok" | "err">("idle");
  const [loc] = useLocation();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    try {
      const row = JSON.stringify({ email, ts: new Date().toISOString(), source: loc }) + "\n";
      const blob = new Blob([row], { type: "application/x-ndjson" });
      const res = await fetch(
        "https://ny.storage.bunnycdn.com/clean-burn/newsletter/subs.jsonl",
        {
          method: "PUT",
          headers: {
            AccessKey: "518477f6-0581-4a01-98b6bbf6a63e-7d7e-4e50",
            "Content-Type": "application/x-ndjson",
          },
          body: blob,
        }
      );
      setStatus(res.ok ? "ok" : "err");
    } catch {
      setStatus("err");
    }
  };

  if (status === "ok") {
    return <p className="text-sm text-[var(--amber)]">Welcome to the journey.</p>;
  }

  return (
    <form onSubmit={submit} className="flex gap-2 max-w-sm">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email"
        required
        className="flex-1 bg-[var(--deep)]/60 border border-[var(--amber)]/15 rounded-lg px-4 py-2.5 text-sm text-[var(--warm-white)] placeholder:text-[var(--warm-subtle)] focus:outline-none focus:border-[var(--amber)]/40 transition-colors"
      />
      <button
        type="submit"
        className="px-5 py-2.5 bg-[var(--amber)] text-[var(--deep)] text-sm font-semibold rounded-lg hover:bg-[var(--amber-light)] transition-colors"
      >
        Join
      </button>
      {status === "err" && <p className="text-xs text-red-400 mt-1">Something went wrong.</p>}
    </form>
  );
}

export default function Layout({ children }: { children: ReactNode }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setCatOpen(false);
  }, [location]);

  return (
    <div className="min-h-screen bg-[var(--deep)] text-[var(--warm-white)]">
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          scrolled
            ? "bg-[var(--deep)]/95 backdrop-blur-xl border-b border-[var(--amber)]/8 shadow-lg shadow-black/20"
            : "bg-transparent"
        }`}
      >
        <div className="container flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 no-underline group">
            <Flame className="w-5 h-5 text-[var(--amber)] group-hover:text-[var(--amber-glow)] transition-colors" />
            <span className="font-heading font-bold text-lg text-[var(--warm-white)] tracking-tight">
              {SITE_CONFIG.title}
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            <div className="relative" onMouseEnter={() => setCatOpen(true)} onMouseLeave={() => setCatOpen(false)}>
              <button className="flex items-center gap-1 text-sm text-[var(--warm-muted)] hover:text-[var(--warm-white)] transition-colors">
                Explore <ChevronDown className={`w-3.5 h-3.5 transition-transform ${catOpen ? "rotate-180" : ""}`} />
              </button>
              {catOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-[var(--deep-card)] border border-[var(--amber)]/10 rounded-xl p-2 shadow-2xl shadow-black/40">
                  {CATEGORIES.map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/category/${cat.slug}`}
                      className="block px-4 py-3 rounded-lg text-sm text-[var(--warm-muted)] hover:text-[var(--amber-light)] hover:bg-[var(--amber)]/5 transition-all no-underline"
                    >
                      <span className="font-medium">{cat.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link href="/about" className="text-sm text-[var(--warm-muted)] hover:text-[var(--warm-white)] transition-colors no-underline">
              About
            </Link>
            <Link
              href="/quiz"
              className="text-sm font-medium px-5 py-2 bg-[var(--amber)]/10 text-[var(--amber)] border border-[var(--amber)]/20 rounded-full hover:bg-[var(--amber)]/20 hover:border-[var(--amber)]/40 transition-all no-underline"
            >
              Take the Quiz
            </Link>
          </nav>

          {/* Mobile toggle */}
          <button
            className="lg:hidden text-[var(--warm-muted)] hover:text-[var(--warm-white)] transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-[var(--deep)]/98 backdrop-blur-xl border-t border-[var(--amber)]/8">
            <nav className="container py-6 space-y-1">
              {CATEGORIES.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/category/${cat.slug}`}
                  className="block px-4 py-3 text-sm text-[var(--warm-muted)] hover:text-[var(--amber-light)] rounded-lg hover:bg-[var(--amber)]/5 transition-all no-underline"
                >
                  {cat.name}
                </Link>
              ))}
              <div className="h-px bg-[var(--amber)]/10 my-3" />
              <Link href="/about" className="block px-4 py-3 text-sm text-[var(--warm-muted)] hover:text-[var(--warm-white)] rounded-lg no-underline">
                About
              </Link>
              <Link href="/quiz" className="block px-4 py-3 text-sm font-medium text-[var(--amber)] no-underline">
                Take the Quiz
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* Main */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-[var(--deep)] border-t border-[var(--amber)]/8 pt-16 pb-8">
        <div className="glow-line mb-16" />
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div className="lg:col-span-1">
              <div className="flex items-center gap-2.5 mb-4">
                <Flame className="w-5 h-5 text-[var(--amber)]" />
                <span className="font-heading font-bold text-lg text-[var(--warm-white)]">{SITE_CONFIG.title}</span>
              </div>
              <p className="text-sm text-[var(--warm-subtle)] leading-relaxed mb-6">
                Evidence-based recovery without shame. Neuroscience, somatic practices, and consciousness.
              </p>
              <NewsletterForm />
            </div>
            <div>
              <h4 className="font-heading font-semibold text-sm text-[var(--amber)] uppercase tracking-wider mb-4">Explore</h4>
              <ul className="space-y-2.5">
                {CATEGORIES.map((cat) => (
                  <li key={cat.slug}>
                    <Link href={`/category/${cat.slug}`} className="text-sm text-[var(--warm-subtle)] hover:text-[var(--warm-white)] transition-colors no-underline">
                      {cat.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-heading font-semibold text-sm text-[var(--amber)] uppercase tracking-wider mb-4">Pages</h4>
              <ul className="space-y-2.5">
                <li><Link href="/about" className="text-sm text-[var(--warm-subtle)] hover:text-[var(--warm-white)] transition-colors no-underline">About</Link></li>
                <li><Link href="/quiz" className="text-sm text-[var(--warm-subtle)] hover:text-[var(--warm-white)] transition-colors no-underline">Self-Assessment</Link></li>
                <li><Link href="/privacy" className="text-sm text-[var(--warm-subtle)] hover:text-[var(--warm-white)] transition-colors no-underline">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-sm text-[var(--warm-subtle)] hover:text-[var(--warm-white)] transition-colors no-underline">Terms of Use</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-heading font-semibold text-sm text-[var(--amber)] uppercase tracking-wider mb-4">Author</h4>
              <p className="text-sm text-[var(--warm-subtle)] leading-relaxed mb-3">
                {SITE_CONFIG.author.name} — {SITE_CONFIG.author.title}
              </p>
              <a
                href={SITE_CONFIG.author.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[var(--amber)] hover:text-[var(--amber-glow)] transition-colors no-underline"
              >
                kalesh.love →
              </a>
            </div>
          </div>
          <div className="glow-line mb-6" />
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-[var(--warm-subtle)]">
              © {new Date().getFullYear()} {SITE_CONFIG.title}. For educational purposes only. Not medical advice.
            </p>
            <p className="text-xs text-[var(--warm-subtle)]">
              By <a href={SITE_CONFIG.author.link} target="_blank" rel="noopener noreferrer" className="text-[var(--amber)]/70 hover:text-[var(--amber)] transition-colors no-underline">{SITE_CONFIG.author.name}</a>
            </p>
          </div>
        </div>
      </footer>
      <CookieConsent />
    </div>
  );
}
