"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Wrench, Github, Twitter, Youtube, Sun, Moon, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/hooks/use-theme";

export function Footer() {
  const { isDark, toggle } = useTheme();
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <>
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
    </>
  );
}
