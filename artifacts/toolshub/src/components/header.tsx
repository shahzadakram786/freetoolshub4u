"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Wrench, Menu, X, ChevronDown, Sun, Moon } from "lucide-react";
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

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isToolsOpen, setIsToolsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const location = usePathname() || "";
  const { isDark, toggle } = useTheme();

  const allLinks = TOOL_CATEGORIES.flatMap((c) => c.links);
  const searchResults = searchQuery.length > 1
    ? allLinks.filter((l) => l.label.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
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
  );
}
