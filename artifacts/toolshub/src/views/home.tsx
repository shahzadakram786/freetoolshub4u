"use client";

import Link from "next/link";
import { SeoHead } from "@/components/seo-head";
import { Card } from "@/components/ui";
import {
  CloudSun, DollarSign, Instagram, Facebook, Youtube,
  BrainCircuit, ShieldAlert, FileEdit, Hash, KeyRound,
  QrCode, Underline, CalendarDays, Activity, Link as LinkIcon,
  FileCode, Braces, Type, Sparkles, Eraser, BookOpen, Clock, ChevronRight, Zap, Lock, Globe, Users, Star
} from "lucide-react";
import { useGetBlogPosts } from "@workspace/api-client-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const TOOLS = [
  { id: 'bg-remover', name: 'Background Remover', desc: 'AI-powered precise background removal', path: '/bg-remover', icon: Sparkles, color: 'text-violet-500', bg: 'bg-violet-500/10', badge: 'AI' },
  { id: 'object-eraser', name: 'Object Eraser', desc: 'Paint & erase objects with AI inpainting', path: '/object-eraser', icon: Eraser, color: 'text-rose-500', bg: 'bg-rose-500/10', badge: 'AI' },
  { id: 'weather', name: 'Weather Report', desc: 'Auto-detect location & real-time weather', path: '/weather', icon: CloudSun, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { id: 'currency', name: 'Currency Converter', desc: 'Live rates for 60+ currencies, auto-refresh', path: '/currency-converter', icon: DollarSign, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  { id: 'ai', name: 'AI Content Detector', desc: 'Detect ChatGPT, Claude, and AI text', path: '/ai-detector', icon: BrainCircuit, color: 'text-purple-500', bg: 'bg-purple-500/10' },
  { id: 'plagiarism', name: 'Plagiarism Checker', desc: 'Scan text for copied content', path: '/plagiarism-checker', icon: ShieldAlert, color: 'text-orange-500', bg: 'bg-orange-500/10' },
  { id: 'paraphrase', name: 'Article Rewriter', desc: 'Paraphrase text to remove plagiarism', path: '/plagiarism-remover', icon: FileEdit, color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
  { id: 'yt', name: 'YouTube Thumbnail', desc: 'Get HD thumbnails from any YT video', path: '/youtube-thumbnail-downloader', icon: Youtube, color: 'text-red-500', bg: 'bg-red-500/10' },
  { id: 'insta', name: 'Instagram Downloader', desc: 'Download IG reels and videos', path: '/instagram-video-downloader', icon: Instagram, color: 'text-pink-500', bg: 'bg-pink-500/10' },
  { id: 'fb', name: 'Facebook Downloader', desc: 'Save Facebook videos offline', path: '/facebook-video-downloader', icon: Facebook, color: 'text-blue-600', bg: 'bg-blue-600/10' },
  { id: 'ocr', name: 'Image to Text (OCR)', desc: 'Extract text from pictures', path: '/image-to-text', icon: Underline, color: 'text-cyan-500', bg: 'bg-cyan-500/10' },
  { id: 'words', name: 'Word Counter', desc: 'Count words, chars, and reading time', path: '/word-counter', icon: Hash, color: 'text-slate-500', bg: 'bg-slate-500/10' },
  { id: 'password', name: 'Password Generator', desc: 'Create strong, secure passwords', path: '/password-generator', icon: KeyRound, color: 'text-amber-500', bg: 'bg-amber-500/10' },
  { id: 'qr', name: 'QR Code Generator', desc: 'Make custom QR codes instantly', path: '/qr-code-generator', icon: QrCode, color: 'text-gray-700 dark:text-gray-200', bg: 'bg-gray-500/10' },
  { id: 'bmi', name: 'BMI Calculator', desc: 'Metric & Imperial with ft/inches support', path: '/bmi-calculator', icon: Activity, color: 'text-rose-500', bg: 'bg-rose-500/10' },
  { id: 'age', name: 'Age Calculator', desc: 'Exact age in years, months, and days', path: '/age-calculator', icon: CalendarDays, color: 'text-lime-500', bg: 'bg-lime-500/10' },
  { id: 'url', name: 'URL Shortener', desc: 'Create short, shareable links', path: '/url-shortener', icon: LinkIcon, color: 'text-sky-500', bg: 'bg-sky-500/10' },
  { id: 'base64', name: 'Base64 Encoder/Decoder', desc: 'Encode or decode base64 strings', path: '/base64', icon: FileCode, color: 'text-fuchsia-500', bg: 'bg-fuchsia-500/10' },
  { id: 'json', name: 'JSON Formatter', desc: 'Format, validate, and beautify JSON', path: '/json-formatter', icon: Braces, color: 'text-yellow-600', bg: 'bg-yellow-600/10' },
  { id: 'case', name: 'Case Converter', desc: 'UPPER, lower, camelCase, snake_case', path: '/case-converter', icon: Type, color: 'text-violet-500', bg: 'bg-violet-500/10' },
];

const FEATURES = [
  { icon: Zap, title: "Lightning Fast", desc: "All tools process instantly. No waiting, no queues.", color: "text-amber-500", bg: "bg-amber-500/10" },
  { icon: Lock, title: "Privacy First", desc: "Your files stay private. We never store your content.", color: "text-emerald-500", bg: "bg-emerald-500/10" },
  { icon: Globe, title: "No Signup Needed", desc: "100% free forever. Use any tool without an account.", color: "text-blue-500", bg: "bg-blue-500/10" },
  { icon: Star, title: "High Quality AI", desc: "Powered by the best AI models for professional output.", color: "text-yellow-500", bg: "bg-yellow-500/10" },
  { icon: Users, title: "Built for Everyone", desc: "Simple enough for anyone, powerful enough for pros.", color: "text-purple-500", bg: "bg-purple-500/10" },
  { icon: BookOpen, title: "Helpful Blog", desc: "Guides and tutorials for every tool we offer.", color: "text-rose-500", bg: "bg-rose-500/10" },
];

const STATS = [
  { value: "20+", label: "Free Tools" },
  { value: "60+", label: "Currencies" },
  { value: "0", label: "Signups Needed" },
  { value: "100%", label: "Free Forever" },
];

function ScrollSection({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useScrollAnimation() as React.RefObject<HTMLElement>;
  return (
    <section ref={ref} className={`animate-on-scroll ${className ?? ""}`}>
      {children}
    </section>
  );
}

export function Home() {
  const { data: blogData } = useGetBlogPosts({ limit: 3 });

  return (
      <>
      <SeoHead
        title="ToolsHub — 20+ Free Online Tools | Background Remover, Currency, Weather & More"
        description="Free online tools for everyone. AI background remover, live currency converter, weather report, plagiarism checker, AI detector, and 15+ more utilities. No signup required."
        keywords="free online tools, background remover, currency converter, weather report, plagiarism checker, AI detector"
      />

      {/* Hero — always visible, no animation class so never hidden */}
      <section className="relative w-full py-24 lg:py-36 overflow-hidden flex justify-center border-b border-border/50">
        <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/15 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl" />
        </div>
        <div className="container max-w-5xl mx-auto px-4 relative z-10 text-center">
          <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-primary/10 text-primary font-medium text-sm mb-8 border border-primary/20">
            <Sparkles className="w-3.5 h-3.5" /> 20+ Free Tools — No Signup Required
          </span>
          <h1 className="text-5xl lg:text-7xl font-bold mb-6 tracking-tight">
            Every Online Tool<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-violet-500 to-secondary">
              You Will Ever Need.
            </span>
          </h1>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            AI image tools, live weather, real-time currency rates, plagiarism checker, and 15+ more utilities — all free, all instant, no account needed.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#tools" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 rounded-xl font-semibold hover:bg-primary/90 transition-all hover:scale-105 shadow-lg shadow-primary/25">
              Browse All Tools <ChevronRight className="w-4 h-4" />
            </a>
            <Link href="/blog" className="inline-flex items-center gap-2 bg-card text-foreground px-8 py-3.5 rounded-xl font-semibold hover:bg-muted transition-all border border-border hover:border-primary/40">
              Read the Blog
            </Link>
          </div>
        </div>
      </section>

      {/* Stats — animate on scroll */}
      <ScrollSection className="w-full py-8 bg-primary/5 border-b border-border">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {STATS.map((s) => (
              <div key={s.label}>
                <p className="text-3xl font-bold text-primary mb-0.5">{s.value}</p>
                <p className="text-muted-foreground text-sm">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </ScrollSection>

      <div className="ad-banner w-full max-w-5xl mx-auto px-4">
        [ Google AdSense — Leaderboard ]
      </div>

      {/* Features — animate on scroll */}
      <ScrollSection className="w-full py-16 bg-card border-y border-border">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-2">Why Use ToolsHub?</h2>
            <p className="text-muted-foreground">Built for speed, privacy, and simplicity.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map(({ icon: Icon, title, desc, color, bg }) => (
              <div key={title} className="flex items-start gap-4 p-5 rounded-2xl border border-border hover:border-primary/30 transition-all hover:shadow-md bg-background">
                <div className={`w-11 h-11 rounded-xl ${bg} flex items-center justify-center shrink-0`}>
                  <Icon className={`w-5 h-5 ${color}`} />
                </div>
                <div>
                  <h3 className="font-bold mb-1">{title}</h3>
                  <p className="text-sm text-muted-foreground">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </ScrollSection>

      {/* Tools Grid — NO animation classes so all tools are always visible */}
      <section className="w-full py-20" id="tools">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-4xl font-bold mb-3">All Tools</h2>
            <p className="text-muted-foreground text-lg">Click any tool to get started instantly. No login, no limits.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {TOOLS.map((tool) => (
              <Link key={tool.id} href={tool.path}>
                <Card className="h-full p-6 hover:-translate-y-1.5 hover:shadow-xl hover:border-primary/40 transition-all duration-300 group cursor-pointer flex flex-col items-start text-left relative overflow-hidden">
                  {(tool as any).badge && (
                    <span className="absolute top-3 right-3 px-2 py-0.5 bg-primary/10 text-primary text-xs font-bold rounded-full border border-primary/20">
                      {(tool as any).badge}
                    </span>
                  )}
                  <div className={`w-12 h-12 rounded-2xl ${tool.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <tool.icon className={`w-6 h-6 ${tool.color}`} />
                  </div>
                  <h3 className="text-base font-bold mb-1.5 group-hover:text-primary transition-colors">{tool.name}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed flex-1">{tool.desc}</p>
                  <div className="mt-3 flex items-center gap-1 text-xs text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Open tool <ChevronRight className="w-3 h-3" />
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="w-full max-w-5xl mx-auto px-4 pb-4">
        <div className="ad-banner">[ Google AdSense — Bottom Banner ]</div>
      </div>

      {/* Blog Preview — animate on scroll */}
      {blogData && blogData.posts.length > 0 && (
        <ScrollSection className="w-full py-20 bg-muted/30 border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-12">
              <div>
                <h2 className="text-4xl font-bold">From the Blog</h2>
                <p className="text-muted-foreground mt-2">Guides and tips to get the most out of our tools.</p>
              </div>
              <Link href="/blog" className="text-primary text-sm font-semibold hover:underline flex items-center gap-1 shrink-0">
                All posts <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {blogData.posts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`}>
                  <Card className="overflow-hidden hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group cursor-pointer h-full">
                    <div className="overflow-hidden">
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        loading="lazy"
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-5">
                      <span className="inline-block text-xs text-primary font-semibold mb-2 bg-primary/10 px-2 py-0.5 rounded-full">{post.category}</span>
                      <h3 className="font-bold mt-1 mb-2 line-clamp-2 group-hover:text-primary transition-colors leading-snug">{post.title}</h3>
                      <p className="text-muted-foreground text-sm line-clamp-2 mb-3">{post.excerpt}</p>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" /> {post.readTime} min read
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </ScrollSection>
      )}

      {/* CTA — animate on scroll */}
      <ScrollSection className="w-full py-20 border-t border-border">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <Zap className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-4xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-muted-foreground text-lg mb-8">
            All tools are free, instant, and no signup required. Just pick one and start.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#tools" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3.5 rounded-xl font-semibold hover:bg-primary/90 transition-all hover:scale-105 shadow-lg shadow-primary/25">
              <Sparkles className="w-4 h-4" /> Explore All Tools
            </a>
            <Link href="/about" className="inline-flex items-center gap-2 bg-card text-foreground px-8 py-3.5 rounded-xl font-semibold hover:bg-muted transition-all border border-border hover:border-primary/40">
              Learn About Us
            </Link>
          </div>
        </div>
      </ScrollSection>
      </>
  );
}
