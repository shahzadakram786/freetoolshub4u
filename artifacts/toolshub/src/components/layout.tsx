import { ReactNode, useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Search, Wrench, Menu, X, Github, Twitter, Youtube, ChevronDown, Sun, Moon, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/hooks/use-theme";

const TOOL_CATEGORIES = [
  {
    name: "Image Tools",
    links: [
      { label: "Background Remover", href: "/bg-remover" },
      { label: "Object Eraser", href: "/object-eraser" },
      { label: "Image to Text (OCR)", href: "/image-to-text" },
      { label: "YouTube Thumbnail", href: "/youtube-thumbnail-downloader" },
    ]
  },
  {
    name: "Text & AI",
    links: [
      { label: "Plagiarism Checker", href: "/plagiarism-checker" },
      { label: "Plagiarism Remover", href: "/plagiarism-remover" },
      { label: "AI Detector", href: "/ai-detector" },
      { label: "Word Counter", href: "/word-counter" },
      { label: "Case Converter", href: "/case-converter" },
    ]
  },
  {
    name: "Converters",
    links: [
      { label: "Currency Converter", href: "/currency-converter" },
      { label: "Base64 Encode/Decode", href: "/base64" },
      { label: "JSON Formatter", href: "/json-formatter" },
    ]
  },
  {
    name: "Web Tools",
    links: [
      { label: "URL Shortener", href: "/url-shortener" },
      { label: "QR Code Generator", href: "/qr-code-generator" },
      { label: "Password Generator", href: "/password-generator" },
    ]
  },
  {
    name: "Downloaders",
    links: [
      { label: "Instagram Downloader", href: "/instagram-video-downloader" },
      { label: "Facebook Downloader", href: "/facebook-video-downloader" },
    ]
  },
  {
    name: "Calculators & Live",
    links: [
      { label: "Weather Report", href: "/weather" },
      { label: "BMI Calculator", href: "/bmi-calculator" },
      { label: "Age Calculator", href: "/age-calculator" },
    ]
  },
];

export function Layout({ children }: { children: ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [location] = useLocation();
  const { theme, toggle, isDark } = useTheme();

  const allLinks = TOOL_CATEGORIES.flatMap((c) => c.links);
  const searchResults = searchQuery.length > 1
    ? allLinks.filter((l) => l.label.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="min-h-screen flex flex-col bg-background selection:bg-primary/20">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 backdrop-blur-md bg-background/90 shadow-sm">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between gap-4">
            <Link href="/" className="flex items-center gap-2 group shrink-0">
              <div className="bg-primary/10 p-2 rounded-xl group-hover:bg-primary/20 transition-colors">
                <Wrench className="w-5 h-5 text-primary" />
              </div>
              <span className="font-bold text-xl tracking-tight text-foreground hidden sm:block">
                Tools<span className="text-primary">Hub</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-6 flex-1 justify-center">
              <Link href="/" className={cn("text-sm font-medium transition-colors hover:text-primary", location === "/" ? "text-primary" : "text-muted-foreground")}>
                Home
              </Link>

              <div className="relative" onMouseEnter={() => setIsToolsOpen(true)} onMouseLeave={() => setIsToolsOpen(false)}>
                <button className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-primary transition-colors">
                  Tools <ChevronDown className={cn("w-4 h-4 transition-transform duration-200", isToolsOpen && "rotate-180")} />
                </button>
                {isToolsOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[680px]">
                    <div className="bg-card border border-border rounded-2xl shadow-2xl p-5 grid grid-cols-3 gap-5">
                      {TOOL_CATEGORIES.map((cat) => (
                        <div key={cat.name}>
                          <p className="text-xs font-bold text-primary/70 uppercase tracking-wider mb-2.5">{cat.name}</p>
                          {cat.links.map((link) => (
                            <Link key={link.href} href={link.href}
                              className="block text-sm py-1 hover:text-primary transition-colors text-foreground/80 hover:translate-x-0.5 transform duration-150">
                              {link.label}
                            </Link>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Link href="/blog" className={cn("text-sm font-medium transition-colors hover:text-primary", location.startsWith("/blog") ? "text-primary" : "text-muted-foreground")}>
                Blog
              </Link>

              <Link href="/about" className={cn("text-sm font-medium transition-colors hover:text-primary", location === "/about" ? "text-primary" : "text-muted-foreground")}>
                About
              </Link>
            </nav>

            {/* Right: Search + Dark Toggle + Mobile Menu */}
            <div className="flex items-center gap-2">
              {/* Search */}
              <div className="hidden md:block relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                <input
                  type="search"
                  placeholder="Search tools..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onBlur={() => setTimeout(() => setSearchQuery(""), 200)}
                  className="pl-9 pr-4 py-2 bg-muted/50 border border-border/50 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all w-[180px] lg:w-[220px]"
                />
                {searchResults.length > 0 && (
                  <div className="absolute top-full right-0 mt-2 w-64 bg-card border border-border rounded-xl shadow-xl py-2 z-50">
                    {searchResults.map((r) => (
                      <Link key={r.href} href={r.href} onClick={() => setSearchQuery("")}
                        className="flex items-center gap-2 px-4 py-2 text-sm hover:bg-muted transition-colors">
                        <Search className="w-3 h-3 text-muted-foreground" />
                        {r.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Dark/Light Toggle */}
              <button
                onClick={toggle}
                aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
                title={isDark ? "Light mode" : "Dark mode"}
                className="w-9 h-9 rounded-xl flex items-center justify-center bg-muted/50 border border-border/50 hover:bg-muted hover:border-primary/30 transition-all text-muted-foreground hover:text-primary"
              >
                {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              {/* Mobile Menu */}
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden p-2 text-muted-foreground hover:text-foreground rounded-xl hover:bg-muted transition-colors">
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-background max-h-[80vh] overflow-y-auto">
            <div className="px-4 py-4 space-y-4">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input type="search" placeholder="Search tools..." className="w-full pl-9 pr-4 py-2.5 bg-muted border border-border rounded-xl text-sm focus:outline-none" />
              </div>
              <div className="flex gap-3">
                <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="flex-1 text-center px-3 py-2 font-medium text-foreground hover:text-primary rounded-xl hover:bg-muted transition-colors text-sm">Home</Link>
                <Link href="/blog" onClick={() => setIsMobileMenuOpen(false)} className="flex-1 text-center px-3 py-2 font-medium text-foreground hover:text-primary rounded-xl hover:bg-muted transition-colors text-sm">Blog</Link>
                <Link href="/about" onClick={() => setIsMobileMenuOpen(false)} className="flex-1 text-center px-3 py-2 font-medium text-foreground hover:text-primary rounded-xl hover:bg-muted transition-colors text-sm">About</Link>
              </div>
              {TOOL_CATEGORIES.map((cat) => (
                <div key={cat.name}>
                  <p className="px-2 text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">{cat.name}</p>
                  {cat.links.map((link) => (
                    <Link key={link.href} href={link.href} onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted transition-colors">
                      {link.label}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </header>

      <main className="flex-grow w-full flex flex-col items-center">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-card border-t border-border mt-auto w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-10">
            {/* Brand Column */}
            <div className="col-span-2">
              <Link href="/" className="flex items-center gap-2 mb-4 group">
                <div className="bg-primary/10 p-2 rounded-xl group-hover:bg-primary/20 transition-colors">
                  <Wrench className="w-4 h-4 text-primary" />
                </div>
                <span className="font-bold text-lg">Tools<span className="text-primary">Hub</span></span>
              </Link>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mb-5">
                Free online tools for everyone. No signup required, no popups — just fast, powerful utilities at your fingertips.
              </p>
              <div className="flex gap-3 mb-5">
                <a href="#" aria-label="GitHub" className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"><Github className="w-4 h-4" /></a>
                <a href="#" aria-label="Twitter" className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"><Twitter className="w-4 h-4" /></a>
                <a href="#" aria-label="YouTube" className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all"><Youtube className="w-4 h-4" /></a>
              </div>
              {/* Theme toggle in footer too */}
              <button onClick={toggle}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors px-3 py-1.5 rounded-lg border border-border hover:border-primary/40">
                {isDark ? <><Sun className="w-3.5 h-3.5" /> Light Mode</> : <><Moon className="w-3.5 h-3.5" /> Dark Mode</>}
              </button>
            </div>

            {/* Tool columns */}
            <div>
              <h3 className="font-bold mb-3 text-sm">Image Tools</h3>
              <ul className="space-y-2">
                <li><Link href="/bg-remover" className="text-muted-foreground text-sm hover:text-primary transition-colors">Background Remover</Link></li>
                <li><Link href="/object-eraser" className="text-muted-foreground text-sm hover:text-primary transition-colors">Object Eraser</Link></li>
                <li><Link href="/image-to-text" className="text-muted-foreground text-sm hover:text-primary transition-colors">Image to Text</Link></li>
                <li><Link href="/youtube-thumbnail-downloader" className="text-muted-foreground text-sm hover:text-primary transition-colors">YT Thumbnail</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-3 text-sm">Text & AI</h3>
              <ul className="space-y-2">
                <li><Link href="/plagiarism-checker" className="text-muted-foreground text-sm hover:text-primary transition-colors">Plagiarism Checker</Link></li>
                <li><Link href="/plagiarism-remover" className="text-muted-foreground text-sm hover:text-primary transition-colors">Plagiarism Remover</Link></li>
                <li><Link href="/ai-detector" className="text-muted-foreground text-sm hover:text-primary transition-colors">AI Detector</Link></li>
                <li><Link href="/word-counter" className="text-muted-foreground text-sm hover:text-primary transition-colors">Word Counter</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-3 text-sm">Converters</h3>
              <ul className="space-y-2">
                <li><Link href="/currency-converter" className="text-muted-foreground text-sm hover:text-primary transition-colors">Currency Converter</Link></li>
                <li><Link href="/weather" className="text-muted-foreground text-sm hover:text-primary transition-colors">Weather Report</Link></li>
                <li><Link href="/bmi-calculator" className="text-muted-foreground text-sm hover:text-primary transition-colors">BMI Calculator</Link></li>
                <li><Link href="/age-calculator" className="text-muted-foreground text-sm hover:text-primary transition-colors">Age Calculator</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-3 text-sm">Company</h3>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-muted-foreground text-sm hover:text-primary transition-colors">About Us</Link></li>
                <li><Link href="/blog" className="text-muted-foreground text-sm hover:text-primary transition-colors">Blog</Link></li>
                <li><Link href="/contact" className="text-muted-foreground text-sm hover:text-primary transition-colors">Contact</Link></li>
                <li><Link href="/privacy-policy" className="text-muted-foreground text-sm hover:text-primary transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms-of-service" className="text-muted-foreground text-sm hover:text-primary transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} ToolsHub. All rights reserved. Made with ❤️ for the web.</p>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground justify-center">
              <Link href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link>
              <Link href="/terms-of-service" className="hover:text-primary transition-colors">Terms of Service</Link>
              <Link href="/about" className="hover:text-primary transition-colors">About</Link>
              <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
              <a href="/sitemap.xml" target="_blank" className="hover:text-primary transition-colors">Sitemap</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Back to top */}
      <button
        onClick={scrollToTop}
        aria-label="Back to top"
        className={cn(
          "fixed bottom-6 right-6 z-50 w-10 h-10 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center transition-all duration-300 hover:bg-primary/90 hover:scale-110",
          showBackToTop ? "opacity-100 pointer-events-auto translate-y-0" : "opacity-0 pointer-events-none translate-y-4"
        )}
      >
        <ArrowUp className="w-4 h-4" />
      </button>
    </div>
  );
}
