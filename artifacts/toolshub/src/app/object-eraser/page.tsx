import { ObjectEraser } from "@/views/object-eraser";
import { Metadata } from "next";
// import { ObjectEraser } from "@/views/object-eraser";

// 1. Enhanced Metadata for Google, Twitter, and OpenGraph
export const metadata: Metadata = {
  title: "Free AI Object Eraser - Remove Unwanted Objects | ToolsHub",
  description: "Erase unwanted objects, people, or text from photos instantly using free AI inpainting. Paint over the object and our AI fills the background seamlessly.",
  keywords: ["object eraser", "remove people from photo", "AI inpainting free", "magic eraser tool", "photo cleanup"],
  openGraph: {
    title: "Free AI Object Eraser | ToolsHub",
    description: "Remove unwanted objects from photos instantly with AI inpainting.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free AI Object Eraser",
    description: "Remove unwanted objects from photos instantly with AI inpainting.",
  },
};

export default function ObjectEraserPage() {
  // 2. WebApplication Schema specifically tailored for an Eraser Tool
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Free AI Object Eraser",
    "description": "An AI-powered web application that removes unwanted objects, text, or people from images using advanced inpainting technology.",
    "applicationCategory": "DesignApplication",
    "operatingSystem": "All",
    "browserRequirements": "Requires JavaScript",
    "offers": {
      "@type": "Offer",
      "price": "0.00",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    },
    "featureList": [
      "AI Inpainting technology",
      "Seamless background reconstruction",
      "Instant object removal",
      "Browser-based processing"
    ]
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      {/* Injecting Schema safely into the DOM */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Your actual interactive tool */}
      <ObjectEraser />

      {/* 3. SEO Content Section for Long-Tail Keywords */}
      <section className="max-w-4xl mx-auto px-4 py-12 mt-12 border-t border-border w-full text-left">
        <h2 className="text-2xl font-bold mb-4">How to Erase Unwanted Objects from Photos</h2>
        <p className="text-muted-foreground mb-6">
          Our AI Object Eraser acts like a magic wand for your images. Whether there is a photobomber in your vacation picture, a distracting power line, or unwanted text, this tool uses advanced AI inpainting to reconstruct the background as if the object was never there. Just brush over the distraction, and watch the AI seamlessly fill in the gaps.
        </p>
        
        <h3 className="text-xl font-bold mb-2">Is this magic eraser tool completely free?</h3>
        <p className="text-muted-foreground mb-6">
          Yes! You can clean up your photos directly in your web browser without paying for expensive graphic design software or dealing with complicated layers and clone stamps.
        </p>

        <h3 className="text-xl font-bold mb-2">What can I remove using AI Inpainting?</h3>
        <p className="text-muted-foreground">
          You can remove almost anything that disrupts your composition. Popular uses include erasing strangers from travel photos, removing watermarks or date stamps, deleting blemishes from portraits, and clearing trash or debris from real estate photography.
        </p>
      </section>
    </main>
  );
}