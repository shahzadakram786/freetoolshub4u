import { useEffect } from "react";

interface JsonLd {
  "@context": string;
  "@type": string;
  [key: string]: unknown;
}

interface SeoHeadProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  canonicalPath?: string;
  jsonLd?: JsonLd;
}

export function SeoHead({ title, description, keywords, ogImage, canonicalPath, jsonLd }: SeoHeadProps) {
  useEffect(() => {
    const suffix = title.includes("ToolsHub") ? "" : " | ToolsHub";
    document.title = `${title}${suffix}`;

    const setMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("name", name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    const setOg = (property: string, content: string) => {
      let el = document.querySelector(`meta[property="${property}"]`);
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("property", property);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta("description", description);
    if (keywords) setMeta("keywords", keywords);

    // Open Graph
    setOg("og:title", `${title}${title.includes("ToolsHub") ? "" : " | ToolsHub"}`);
    setOg("og:description", description);
    setOg("og:type", "website");
    setOg("og:site_name", "ToolsHub");
    if (ogImage) setOg("og:image", ogImage);

    // Twitter Card
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", `${title}${title.includes("ToolsHub") ? "" : " | ToolsHub"}`);
    setMeta("twitter:description", description);

    // Canonical
    if (canonicalPath) {
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (!link) {
        link = document.createElement("link");
        link.rel = "canonical";
        document.head.appendChild(link);
      }
      link.href = `https://toolshub.replit.app${canonicalPath}`;
    }

    // JSON-LD
    const existingLd = document.getElementById("json-ld-schema");
    if (existingLd) existingLd.remove();

    if (jsonLd) {
      const script = document.createElement("script");
      script.id = "json-ld-schema";
      script.type = "application/ld+json";
      script.textContent = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }

    return () => {
      const ld = document.getElementById("json-ld-schema");
      if (ld) ld.remove();
    };
  }, [title, description, keywords, ogImage, canonicalPath, jsonLd]);

  return null;
}

// Reusable JSON-LD schemas for tools
export function toolJsonLd(name: string, description: string, url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    description,
    url: `https://toolshub.replit.app${url}`,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web Browser",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    provider: {
      "@type": "Organization",
      name: "ToolsHub",
      url: "https://toolshub.replit.app",
    },
  };
}
