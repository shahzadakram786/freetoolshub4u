"use client";

import { useState } from "react";
import { Layout } from "@/components/layout";
import { SeoHead } from "@/components/seo-head";
import { Card, Input, Button } from "@/components/ui";
import { Youtube, Download } from "lucide-react";

export function YoutubeThumbnail() {
  const [url, setUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const [error, setError] = useState(false);

  const extractId = (url: string) => {
    const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i);
    return match ? match[1] : null;
  };

  const handleExtract = (e: React.FormEvent) => {
    e.preventDefault();
    setError(false);
    const id = extractId(url);
    if (id) {
      setThumbnailUrl(`https://img.youtube.com/vi/${id}/maxresdefault.jpg`);
    } else {
      setThumbnailUrl(null);
      setError(true);
    }
  };

  return (
    <Layout>
      <SeoHead title="YouTube Thumbnail Downloader" description="Download HD thumbnails from any YouTube video for free." />
      
      <div className="w-full max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-4 bg-red-500/10 rounded-2xl mb-6">
            <Youtube className="w-10 h-10 text-red-500" />
          </div>
          <h1 className="text-4xl font-bold mb-4">YouTube Thumbnail Downloader</h1>
          <p className="text-muted-foreground">Paste the YouTube video link to get its high-resolution thumbnail.</p>
        </div>

        <Card className="p-6 shadow-xl mb-12">
          <form onSubmit={handleExtract} className="flex flex-col md:flex-row gap-4">
            <Input 
              placeholder="https://www.youtube.com/watch?v=..." 
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1 h-14 text-lg"
            />
            <Button type="submit" size="lg" className="h-14 bg-red-600 hover:bg-red-700">
              Get Thumbnail
            </Button>
          </form>
          {error && <p className="text-destructive mt-3 font-medium">Invalid YouTube URL. Please try again.</p>}
        </Card>

        {thumbnailUrl && (
          <div className="animate-in fade-in space-y-6">
            <h3 className="text-2xl font-bold text-center">High Resolution Thumbnail</h3>
            <Card className="overflow-hidden shadow-2xl p-2 border border-border/50 bg-muted/20">
              <img src={thumbnailUrl} alt="Video Thumbnail" className="w-full h-auto rounded-xl" / loading="lazy" decoding="async" />
            </Card>
            <div className="flex justify-center">
              <a href={thumbnailUrl} target="_blank" rel="noopener noreferrer" download="thumbnail.jpg" className="inline-flex h-11 items-center justify-center rounded-md bg-red-600 px-8 text-sm font-medium text-destructive-foreground shadow hover:bg-red-600/90 gap-2">
                <Download className="w-5 h-5" />
                Download HD Image
              </a>
            </div>
          </div>
        )}

        <div className="ad-banner mt-16">
          
        </div>
      </div>
    </Layout>
  );
}
