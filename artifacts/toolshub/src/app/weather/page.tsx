import { Metadata } from "next";
import { Weather } from "@/views/weather";

// 1. Enhanced Metadata for Maximum Click-Through Rate (CTR)
export const metadata: Metadata = {
  title: "Live Weather Report - Real-Time Global Forecast | ToolsHub",
  description: "Get instant, ad-free weather conditions for any city worldwide. Check real-time temperature, humidity, wind speed, and local forecasts instantly.",
  keywords: ["live weather report", "real-time weather", "local weather check", "humidity tracker", "wind speed free", "ad-free weather"],
  openGraph: {
    title: "Live Weather Report & Real-Time Forecast",
    description: "Check the exact weather, humidity, and wind speed for any city instantly. No ads, no tracking.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Live Weather Report & Real-Time Forecast",
    description: "Check the exact weather, humidity, and wind speed for any city instantly.",
  },
};

export default function WeatherPage() {
  // 2. WebApplication Schema tailored for a Weather Utility
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Live Weather Report",
    "description": "A fast, ad-free web application that provides real-time weather tracking, including temperature, humidity, and wind speed for global locations.",
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "All",
    "browserRequirements": "Requires JavaScript",
    "offers": {
      "@type": "Offer",
      "price": "0.00",
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock"
    },
    "featureList": [
      "Real-time temperature tracking",
      "Global city search",
      "Auto-detect local weather",
      "Humidity and wind speed metrics"
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
      <Weather />

      {/* 3. SEO Content Section targeting highly-searched weather queries */}
      <section className="max-w-4xl mx-auto px-4 py-12 mt-12 border-t border-border w-full text-left">
        <h2 className="text-2xl font-bold mb-4">How to Check Real-Time Weather Instantly</h2>
        <p className="text-muted-foreground mb-6">
          Our Live Weather Report tool gives you immediate access to global meteorological data without the bloated interfaces and intrusive ads found on traditional weather sites. Simply allow location access for an auto-detected local forecast, or type any city name into the search bar to see current conditions anywhere in the world.
        </p>
        
        <h3 className="text-xl font-bold mb-2">What weather metrics are included?</h3>
        <p className="text-muted-foreground mb-6">
          Beyond just the current temperature, this tool tracks essential real-time data including atmospheric humidity levels, wind speed, and general weather conditions (like clear skies, rain, or snow). This makes it perfect for planning your daily commute or checking conditions before a trip.
        </p>

        <h3 className="text-xl font-bold mb-2">Is this weather tracker accurate?</h3>
        <p className="text-muted-foreground">
          Yes. The application pulls live data from highly reliable, global weather APIs. Because the tool runs directly in your browser and updates instantly, you are always seeing the most up-to-date forecast available.
        </p>
      </section>
    </main>
  );
}