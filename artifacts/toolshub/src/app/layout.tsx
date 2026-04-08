import { Toaster } from "@/components/ui/toaster";
import { Providers } from "@/components/providers";
import "../index.css"; // Global styles, moved from main.tsx

export const metadata = {
  title: "ToolsHub",
  description: "A collection of useful web tools",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased font-sans">
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
