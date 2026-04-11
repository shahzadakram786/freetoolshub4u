import { BgRemover } from "@/views/bg-remover";
import { Metadata } from "next";
// Import the client component you already built
// import { BgRemover } from "@/src/views/bg-remover"; 

// 1. Dynamic Next.js Metadata (For <head> tags, Open Graph, and Twitter)
export const metadata: Metadata = {
  title: "Free AI Background Remover | Instant & Private",
  description: "Remove image backgrounds instantly with our free on-device AI tool. 100% private, no signup required, and unlimited use. Download as a transparent PNG.",
  keywords: ["background remover", "remove background free", "transparent PNG maker", "AI background removal"],
  openGraph: {
    title: "Free AI Background Remover",
    description: "Instantly remove backgrounds directly in your browser. 100% free and private.",
    type: "website",
    url: "https://yourwebsite.com/tools/bg-remover",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free AI Background Remover",
    description: "Remove image backgrounds instantly in your browser for free.",
  },
};

export default function BackgroundRemoverPage() {
  // 2. The WebApplication JSON-LD Schema
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Free AI Background Remover",
    "url": "https://yourwebsite.com/tools/bg-remover",
    "description": "An entirely browser-based AI tool that removes image backgrounds instantly without uploading files to a server.",
    "applicationCategory": "DesignApplication",
    "operatingSystem": "All", // Crucial for web tools
    "browserRequirements": "Requires JavaScript and WebAssembly support",
    "offers": {
      "@type": "Offer",
      "price": "0.00",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    },
    "featureList": [
      "On-device AI processing",
      "100% Privacy (no server uploads)",
      "Unlimited daily uses",
      "High-resolution transparent PNG downloads"
    ]
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      {/* Injecting the Schema safely into the DOM */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Your actual interactive tool component */}
      <BgRemover />

      {/* SEO Content Section (Highly Recommended for Ranking) */}
      <section className="max-w-4xl mx-auto px-4 py-12 mt-12 border-t border-border">
        <h2 className="text-2xl font-bold mb-4">How to Remove a Background for Free</h2>
        <p className="text-muted-foreground mb-6">
          Unlike other services that charge you per image or require a subscription, our tool leverages the power of your own device to isolate subjects and remove backgrounds instantly. Simply drag and drop your image, wait a few seconds for the AI to process it locally, and download your transparent PNG.
        </p>
        <h3 className="text-xl font-bold mb-2">Is it really 100% private?</h3>
        <p className="text-muted-foreground">
          Yes. Because we utilize WebAssembly and run the AI model directly in your browser, your photos never leave your computer. We do not store, view, or process your images on any external servers.
        </p>
      </section>
    </main>
  );
}