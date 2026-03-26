import { ReactNode, useState } from "react";
import { Link, useLocation } from "wouter";
import { Search, Wrench, Menu, X, Github, Twitter, Youtube, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

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
    name: "Text Tools",
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
    name: "Calculators",
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
  const [location] = useLocation();

  const allLinks = TOOL_CATEGORIES.flatMap((c) => c.links);
  const searchResults = searchQuery.length > 1
    ? allLinks.filter((l) => l.label.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

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
                  Tools <ChevronDown className={cn("w-4 h-4 transition-transform", isToolsOpen && "rotate-180")} />
                </button>
                {isToolsOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[640px]">
                    <div className="bg-card border border-border rounded-2xl shadow-xl p-4 grid grid-cols-3 gap-4">
                      {TOOL_CATEGORIES.map((cat) => (
                        <div key={cat.name}>
                          <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">{cat.name}</p>
                          {cat.links.map((link) => (
                            <Link key={link.href} href={link.href} className="block text-sm py-1 hover:text-primary transition-colors text-foreground">
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
            </nav>

            {/* Search */}
            <div className="hidden md:block relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search tools..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onBlur={() => setTimeout(() => setSearchQuery(""), 200)}
                className="pl-9 pr-4 py-2 bg-muted/50 border border-border/50 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all w-[200px] lg:w-[240px]"
              />
              {searchResults.length > 0 && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-card border border-border rounded-xl shadow-xl py-2 z-50">
                  {searchResults.map((r) => (
                    <Link key={r.href} href={r.href} onClick={() => setSearchQuery("")} className="block px-4 py-2 text-sm hover:bg-muted transition-colors">
                      {r.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Button */}
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="md:hidden p-2 text-muted-foreground hover:text-foreground">
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
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
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="block px-2 py-2 font-medium text-foreground">Home</Link>
              <Link href="/blog" onClick={() => setIsMobileMenuOpen(false)} className="block px-2 py-2 font-medium text-foreground">Blog</Link>
              {TOOL_CATEGORIES.map((cat) => (
                <div key={cat.name}>
                  <p className="px-2 text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">{cat.name}</p>
                  {cat.links.map((link) => (
                    <Link key={link.href} href={link.href} onClick={() => setIsMobileMenuOpen(false)}
                      className="block px-4 py-2 text-sm text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted">
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

      <footer className="bg-card border-t border-border mt-auto w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            <div className="col-span-2">
              <Link href="/" className="flex items-center gap-2 mb-4">
                <Wrench className="w-5 h-5 text-primary" />
                <span className="font-bold text-xl">ToolsHub</span>
              </Link>
              <p className="text-muted-foreground text-sm max-w-xs mb-6">
                Free online tools for everyone. No signup, no ads popups, just tools.
              </p>
              <div className="flex gap-4">
                <a href="#" aria-label="GitHub" className="text-muted-foreground hover:text-primary transition-colors"><Github className="w-5 h-5" /></a>
                <a href="#" aria-label="Twitter" className="text-muted-foreground hover:text-primary transition-colors"><Twitter className="w-5 h-5" /></a>
                <a href="#" aria-label="YouTube" className="text-muted-foreground hover:text-primary transition-colors"><Youtube className="w-5 h-5" /></a>
              </div>
            </div>

            {TOOL_CATEGORIES.slice(0, 3).map((cat) => (
              <div key={cat.name}>
                <h3 className="font-bold mb-3 text-sm">{cat.name}</h3>
                <ul className="space-y-2">
                  {cat.links.map((link) => (
                    <li key={link.href}><Link href={link.href} className="text-muted-foreground text-sm hover:text-primary transition-colors">{link.label}</Link></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-border mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} ToolsHub. All rights reserved.</p>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
              <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-primary transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
