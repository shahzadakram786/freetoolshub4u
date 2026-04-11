import { Metadata, Viewport } from "next";
import { Toaster } from "@/components/ui/toaster";
import { Providers } from "@/components/providers";

// Assuming you have or will create these components:
import { Header } from "@/components/header"; 
import { Footer } from "@/components/footer";

import "../index.css"; // Global styles

// 1. Separate Viewport export (Next.js 14+ standard)
export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

// 2. Premium Global SEO Metadata
export const metadata: Metadata = {
  // Replace with your actual domain when you deploy!
  metadataBase: new URL("https://yourwebsite.com"), 
  title: {
    default: "ToolsHub | Premium Free Web Tools & Utilities",
    // This template automatically makes subpages look like: "AI Object Eraser | ToolsHub"
    template: "%s | ToolsHub", 
  },
  description: "A premium collection of free, privacy-first web tools. Use our AI background remover, currency converter, and utilities instantly without signing up.",
  keywords: ["free web tools", "online utilities", "AI tools free", "ToolsHub"],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "ToolsHub | Premium Free Web Tools",
    description: "The ultimate collection of free, privacy-first web tools.",
    siteName: "ToolsHub",
  },
  twitter: {
    card: "summary_large_image",
    title: "ToolsHub | Premium Free Web Tools",
    description: "The ultimate collection of free, privacy-first web tools.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* 3. Added flexbox to the body so the footer always sticks to the bottom */}
      <body className="antialiased font-sans flex flex-col min-h-screen">
        <Providers>
          {/* Persistent Header */}
          <Header />
          
          {/* Main content wrapper pushes the footer down */}
          <main className="grow">
            {children}
          </main>

          {/* Persistent Footer */}
          <Footer />

          {/* UI Toasts */}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}