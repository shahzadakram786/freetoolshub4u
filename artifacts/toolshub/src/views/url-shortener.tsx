"use client";

import { useState } from "react";
import { SeoHead } from "@/components/seo-head";
import { Card, Input, Button, Label } from "@/components/ui";
import { LinkIcon, Copy, CheckCircle2 } from "lucide-react";
import { useShortenUrl } from "@workspace/api-client-react";
import { copyToClipboard } from "@/lib/utils";

export function UrlShortener() {
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState(false);
  
  const { mutate, data, isPending, error } = useShortenUrl();

  const handleShorten = (e: React.FormEvent) => {
    e.preventDefault();
    if (url) mutate({ data: { url } });
  };

  const handleCopy = () => {
    if (data?.shortUrl) {
      copyToClipboard(data.shortUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
      <>
      <SeoHead title="Free URL Shortener" description="Create short, memorable links instantly. Best free URL shortener tool online." />
      
      <div className="w-full max-w-3xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-4 bg-primary/10 rounded-2xl mb-6">
            <LinkIcon className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-4xl font-bold mb-4">URL Shortener</h1>
          <p className="text-muted-foreground">Paste your long link below to make it short and easy to share.</p>
        </div>

        <Card className="p-6 md:p-8">
          <form onSubmit={handleShorten} className="flex flex-col md:flex-row gap-4">
            <Input 
              placeholder="https://example.com/very/long/path/that/needs/shortening..." 
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1 h-14"
              type="url"
              required
            />
            <Button type="submit" size="lg" className="h-14 md:w-40" isLoading={isPending}>
              Shorten URL
            </Button>
          </form>
          {error && <p className="text-destructive text-sm mt-3 font-medium">Failed to shorten URL. Please check the format.</p>}
        </Card>

        {data && (
          <Card className="mt-8 p-6 md:p-8 border-primary/20 bg-primary/5 animate-in slide-in-from-bottom-4">
            <Label className="text-primary mb-2 block">Your short link is ready!</Label>
            <div className="flex items-center gap-4 bg-background p-4 rounded-xl border border-border shadow-sm">
              <span className="flex-1 text-lg font-medium truncate">{data.shortUrl}</span>
              <Button variant="secondary" onClick={handleCopy} className="gap-2">
                {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                {copied ? "Copied" : "Copy"}
              </Button>
            </div>
            <div className="mt-4 text-sm text-muted-foreground break-all">
              Original: {data.originalUrl}
            </div>
          </Card>
        )}

        <div className="ad-banner mt-12">
          
        </div>
      </div>
      </>
  );
}
