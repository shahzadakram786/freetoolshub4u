"use client";

import { useState, useRef } from "react";
import { Layout } from "@/components/layout";
import { SeoHead } from "@/components/seo-head";
import { Card, Input, Button, Label } from "@/components/ui";
import { QrCode, Download } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

export function QrGenerator() {
  const [text, setText] = useState("https://toolshub.com");
  const svgRef = useRef<SVGSVGElement>(null);

  const downloadQR = () => {
    if (!svgRef.current) return;
    const svgData = new XMLSerializer().serializeToString(svgRef.current);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.download = "qrcode.png";
      downloadLink.href = `${pngFile}`;
      downloadLink.click();
    };
    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
  };

  return (
    <Layout>
      <SeoHead title="QR Code Generator" description="Generate high quality QR codes for URLs, text, and contacts for free." />
      
      <div className="w-full max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-4 bg-gray-500/10 rounded-2xl mb-6">
            <QrCode className="w-10 h-10 text-gray-700 dark:text-gray-300" />
          </div>
          <h1 className="text-4xl font-bold mb-4">QR Code Generator</h1>
          <p className="text-muted-foreground">Create scannable QR codes for your links and texts.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="p-8">
            <div className="space-y-6">
              <div>
                <Label className="mb-2 block text-lg">Enter Link or Text</Label>
                <Input 
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="https://..."
                  className="h-14"
                />
              </div>
              <p className="text-sm text-muted-foreground">
                The QR code updates automatically as you type. Once finished, click the download button to save it as a high-quality PNG.
              </p>
            </div>
          </Card>

          <Card className="p-8 flex flex-col items-center justify-center bg-muted/20 border-dashed border-2">
            <div className="bg-white p-6 rounded-2xl shadow-sm mb-6">
              <QRCodeSVG 
                value={text || " "} 
                size={256} 
                level="H"
                includeMargin={true}
                ref={svgRef}
              />
            </div>
            <Button size="lg" className="w-full max-w-[256px]" onClick={downloadQR} disabled={!text}>
              <Download className="w-5 h-5 mr-2" /> Download PNG
            </Button>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
