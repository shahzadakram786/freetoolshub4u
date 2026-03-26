import { useState } from "react";
import { Layout } from "@/components/layout";
import { SeoHead } from "@/components/seo-head";
import { Card, Input, Button } from "@/components/ui";
import { Instagram, Facebook, Download, AlertCircle } from "lucide-react";

interface Props {
  platform: "instagram" | "facebook";
}

export function SocialDownloader({ platform }: Props) {
  const [url, setUrl] = useState("");
  const isInsta = platform === "instagram";

  const handleDownload = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would hit an API endpoint or third-party service
    alert("This is a frontend UI demo for the downloader. In production, this requires a specialized backend or third-party API integration to bypass social media protections.");
  };

  return (
    <Layout>
      <SeoHead 
        title={`${isInsta ? 'Instagram' : 'Facebook'} Video Downloader`} 
        description={`Download ${isInsta ? 'Instagram Reels and Videos' : 'Facebook Videos'} online for free.`} 
      />
      
      <div className="w-full max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <div className={`inline-flex items-center justify-center p-4 rounded-2xl mb-6 ${isInsta ? 'bg-pink-500/10' : 'bg-blue-600/10'}`}>
            {isInsta ? <Instagram className="w-10 h-10 text-pink-500" /> : <Facebook className="w-10 h-10 text-blue-600" />}
          </div>
          <h1 className="text-4xl font-bold mb-4">{isInsta ? 'Instagram' : 'Facebook'} Downloader</h1>
          <p className="text-muted-foreground">Paste the video link below to download it to your device.</p>
        </div>

        <Card className="p-6 shadow-xl mb-12 border-t-4" style={{ borderTopColor: isInsta ? '#ec4899' : '#2563eb' }}>
          <form onSubmit={handleDownload} className="flex flex-col md:flex-row gap-4">
            <Input 
              placeholder={`Paste ${isInsta ? 'Instagram' : 'Facebook'} URL here...`} 
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1 h-14 text-lg"
            />
            <Button type="submit" size="lg" className={`h-14 ${isInsta ? 'bg-pink-600 hover:bg-pink-700' : 'bg-blue-600 hover:bg-blue-700'}`}>
              <Download className="w-5 h-5 mr-2" /> Download
            </Button>
          </form>
        </Card>

        <Card className="p-6 bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900">
          <div className="flex gap-4">
            <AlertCircle className="w-6 h-6 text-blue-500 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-blue-900 dark:text-blue-400 mb-2">How to download:</h3>
              <ol className="list-decimal pl-5 space-y-2 text-blue-800 dark:text-blue-300/80">
                <li>Open the {isInsta ? 'Instagram' : 'Facebook'} app or website</li>
                <li>Find the video or reel you want to save</li>
                <li>Click the Share button and select "Copy Link"</li>
                <li>Paste the link in the input box above and click Download</li>
              </ol>
            </div>
          </div>
        </Card>

        <div className="ad-banner mt-16">
          [ Ad Placeholder ]
        </div>
      </div>
    </Layout>
  );
}
