import { Link } from "wouter";
import { Layout } from "@/components/layout";
import { SeoHead } from "@/components/seo-head";
import { Card } from "@/components/ui";
import { 
  CloudSun, DollarSign, Instagram, Facebook, Youtube, 
  BrainCircuit, ShieldAlert, FileEdit, Hash, KeyRound, 
  QrCode, Underline, CalendarDays, Activity, Link as LinkIcon, 
  FileCode, Braces, Type
} from "lucide-react";

const TOOLS = [
  { id: 'weather', name: 'Weather Report', desc: 'Real-time global weather conditions', path: '/weather', icon: CloudSun, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { id: 'currency', name: 'Currency Converter', desc: 'Live exchange rates for 50+ countries', path: '/currency-converter', icon: DollarSign, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  { id: 'insta', name: 'Instagram Video Downloader', desc: 'Download IG reels and videos', path: '/instagram-video-downloader', icon: Instagram, color: 'text-pink-500', bg: 'bg-pink-500/10' },
  { id: 'fb', name: 'Facebook Video Downloader', desc: 'Save Facebook videos offline', path: '/facebook-video-downloader', icon: Facebook, color: 'text-blue-600', bg: 'bg-blue-600/10' },
  { id: 'yt', name: 'YouTube Thumbnail Downloader', desc: 'Get HD thumbnails from any YT video', path: '/youtube-thumbnail-downloader', icon: Youtube, color: 'text-red-500', bg: 'bg-red-500/10' },
  { id: 'ai', name: 'AI Content Detector', desc: 'Detect ChatGPT, Claude, and AI text', path: '/ai-detector', icon: BrainCircuit, color: 'text-purple-500', bg: 'bg-purple-500/10' },
  { id: 'plagiarism', name: 'Plagiarism Checker', desc: 'Scan text for copied content', path: '/plagiarism-checker', icon: ShieldAlert, color: 'text-orange-500', bg: 'bg-orange-500/10' },
  { id: 'paraphrase', name: 'Article Rewriter', desc: 'Paraphrase text automatically', path: '/plagiarism-remover', icon: FileEdit, color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
  { id: 'words', name: 'Word Counter', desc: 'Count words, chars, and reading time', path: '/word-counter', icon: Hash, color: 'text-slate-500', bg: 'bg-slate-500/10' },
  { id: 'password', name: 'Password Generator', desc: 'Create strong, secure passwords', path: '/password-generator', icon: KeyRound, color: 'text-amber-500', bg: 'bg-amber-500/10' },
  { id: 'qr', name: 'QR Code Generator', desc: 'Make custom QR codes instantly', path: '/qr-code-generator', icon: QrCode, color: 'text-gray-800 dark:text-gray-200', bg: 'bg-gray-500/10' },
  { id: 'ocr', name: 'Image to Text (OCR)', desc: 'Extract text from pictures', path: '/image-to-text', icon: Underline, color: 'text-cyan-500', bg: 'bg-cyan-500/10' },
  { id: 'age', name: 'Age Calculator', desc: 'Calculate exact age in years, months, days', path: '/age-calculator', icon: CalendarDays, color: 'text-lime-500', bg: 'bg-lime-500/10' },
  { id: 'bmi', name: 'BMI Calculator', desc: 'Check body mass index and category', path: '/bmi-calculator', icon: Activity, color: 'text-rose-500', bg: 'bg-rose-500/10' },
  { id: 'url', name: 'URL Shortener', desc: 'Create short, shareable links', path: '/url-shortener', icon: LinkIcon, color: 'text-sky-500', bg: 'bg-sky-500/10' },
  { id: 'base64', name: 'Base64 Encoder/Decoder', desc: 'Encode or decode base64 strings', path: '/base64', icon: FileCode, color: 'text-fuchsia-500', bg: 'bg-fuchsia-500/10' },
  { id: 'json', name: 'JSON Formatter', desc: 'Format, validate, and beautify JSON', path: '/json-formatter', icon: Braces, color: 'text-yellow-600', bg: 'bg-yellow-600/10' },
  { id: 'case', name: 'Case Converter', desc: 'Change text to UPPER, lower, camelCase', path: '/case-converter', icon: Type, color: 'text-violet-500', bg: 'bg-violet-500/10' },
];

export function Home() {
  return (
    <Layout>
      <SeoHead 
        title="18+ Free Online SEO Tools" 
        description="Access free online tools including Youtube Thumbnail downloader, AI content detector, plagiarism checker, currency converter, and more." 
      />
      
      {/* Hero Section */}
      <section className="relative w-full py-20 lg:py-32 overflow-hidden flex justify-center border-b border-border/50">
        <div className="absolute inset-0 z-0 opacity-20 dark:opacity-40">
          <img src={`${import.meta.env.BASE_URL}images/hero-abstract.png`} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/50 to-background z-10" />
        
        <div className="container max-w-7xl mx-auto px-4 relative z-20 text-center">
          <span className="inline-block py-1.5 px-4 rounded-full bg-primary/10 text-primary font-medium text-sm mb-6 border border-primary/20 shadow-sm">
            100% Free Forever
          </span>
          <h1 className="text-5xl lg:text-7xl font-bold mb-6 tracking-tight text-balance">
            Every Online Tool<br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">You Will Ever Need.</span>
          </h1>
          <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 text-balance">
            Boost your productivity with our suite of free online utilities. No signup required. Fast, secure, and ready to use.
          </p>
        </div>
      </section>

      <div className="ad-banner max-w-5xl mx-auto">
        [ AdSense Leaderboard Placeholder ]
      </div>

      {/* Tools Grid */}
      <section className="w-full py-16 bg-background" id="tools">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-3xl font-bold">Explore Our Tools</h2>
            <p className="text-muted-foreground mt-2">Find the perfect utility for your task.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {TOOLS.map((tool) => (
              <Link key={tool.id} href={tool.path}>
                <Card className="h-full p-6 hover:-translate-y-1 hover:shadow-xl hover:border-primary/50 transition-all duration-300 group cursor-pointer flex flex-col items-start text-left bg-white dark:bg-card">
                  <div className={`w-14 h-14 rounded-2xl ${tool.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <tool.icon className={`w-7 h-7 ${tool.color}`} />
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{tool.name}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{tool.desc}</p>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="ad-banner max-w-5xl mx-auto">
        [ AdSense Bottom Banner Placeholder ]
      </div>
    </Layout>
  );
}
