import { useState, useCallback } from "react";
import { Layout } from "@/components/layout";
import { SeoHead } from "@/components/seo-head";
import { Card, Button } from "@/components/ui";
import { Upload, Download, ImageOff, Trash2, Sparkles, Check } from "lucide-react";
import { useRemoveBg } from "@workspace/api-client-react";

function fileToBase64(file: File): Promise<{ base64: string; mimeType: string }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.split(",")[1];
      resolve({ base64, mimeType: file.type });
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function BgRemover() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const { mutate, data, isPending, error, reset } = useRemoveBg();

  const handleFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => setOriginalImage(e.target?.result as string);
    reader.readAsDataURL(file);
    setOriginalFile(file);
    reset();
  }, [reset]);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleRemoveBg = async () => {
    if (!originalFile) return;
    const { base64, mimeType } = await fileToBase64(originalFile);
    mutate({ data: { imageBase64: base64, mimeType } });
  };

  const handleDownload = () => {
    if (!data?.resultBase64) return;
    const link = document.createElement("a");
    link.href = `data:image/png;base64,${data.resultBase64}`;
    link.download = "removed-background.png";
    link.click();
  };

  const handleClear = () => {
    setOriginalImage(null);
    setOriginalFile(null);
    reset();
  };

  const resultSrc = data?.resultBase64 ? `data:image/png;base64,${data.resultBase64}` : null;

  return (
    <Layout>
      <SeoHead
        title="AI Background Remover - Free Online Tool | ToolsHub"
        description="Remove image backgrounds instantly with AI precision. Get clean, transparent PNG backgrounds for product photos, profile pictures, and more. 100% free."
        keywords="background remover, remove background, transparent background, bg remover AI, free background removal"
      />

      <div className="w-full max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-violet-100 mb-4">
            <Sparkles className="w-8 h-8 text-violet-600" />
          </div>
          <h1 className="text-4xl font-bold mb-3">AI Background Remover</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Remove image backgrounds with AI precision. Perfect for product photos, profile pictures, and designs.
          </p>
        </div>

        <div className="ad-banner mb-8 p-4 rounded-xl bg-muted/30 border text-center text-muted-foreground text-sm">
          [ Ad Placeholder ]
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Upload Panel */}
          <Card className="p-6">
            <h2 className="font-semibold text-lg mb-4">Original Image</h2>

            <div
              className={`border-2 border-dashed rounded-xl transition-all cursor-pointer ${isDragging ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"} ${originalImage ? "p-2" : "p-10"}`}
              onDrop={handleDrop}
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onClick={() => !originalImage && document.getElementById("bg-file-input")?.click()}
            >
              {originalImage ? (
                <img src={originalImage} alt="Original" className="w-full max-h-64 object-contain rounded-lg" />
              ) : (
                <div className="text-center">
                  <Upload className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                  <p className="font-medium mb-1">Drop image here or click to upload</p>
                  <p className="text-sm text-muted-foreground">PNG, JPG, WebP up to 10MB</p>
                </div>
              )}
            </div>
            <input id="bg-file-input" type="file" accept="image/*" className="hidden" onChange={handleFileInput} />

            <div className="flex gap-3 mt-4">
              {originalImage ? (
                <>
                  <Button className="flex-1 bg-violet-600 hover:bg-violet-700" onClick={handleRemoveBg} disabled={isPending}>
                    <Sparkles className="w-4 h-4 mr-2" />
                    {isPending ? "Processing..." : "Remove Background"}
                  </Button>
                  <Button variant="outline" onClick={handleClear}>
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </>
              ) : (
                <Button className="flex-1" onClick={() => document.getElementById("bg-file-input")?.click()}>
                  <Upload className="w-4 h-4 mr-2" /> Choose Image
                </Button>
              )}
            </div>

            {isPending && (
              <div className="mt-4 p-4 bg-violet-50 rounded-xl text-center">
                <div className="animate-spin w-6 h-6 border-2 border-violet-600 border-t-transparent rounded-full mx-auto mb-2" />
                <p className="text-sm text-violet-700">AI is removing the background...</p>
              </div>
            )}
          </Card>

          {/* Result Panel */}
          <Card className="p-6">
            <h2 className="font-semibold text-lg mb-4">Result (Transparent Background)</h2>

            {(error as any)?.message ? (
              <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
                <p className="text-sm text-amber-800 font-medium mb-1">API Key Required</p>
                <p className="text-xs text-amber-700">
                  {(error as any).message || "Add your REMOVE_BG_API_KEY secret to enable AI background removal. Get a free key at remove.bg"}
                </p>
              </div>
            ) : resultSrc ? (
              <div className="space-y-4">
                <div className="rounded-xl overflow-hidden border border-border"
                  style={{ background: "repeating-conic-gradient(#e5e7eb 0% 25%, transparent 0% 50%) 0 0 / 20px 20px" }}>
                  <img src={resultSrc} alt="Background removed" className="w-full max-h-64 object-contain" />
                </div>
                <div className="flex gap-3">
                  <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700" onClick={handleDownload}>
                    <Download className="w-4 h-4 mr-2" /> Download PNG
                  </Button>
                  <Button variant="outline" onClick={handleClear}>Try Another</Button>
                </div>
                <div className="flex items-center gap-2 text-sm text-emerald-600">
                  <Check className="w-4 h-4" />
                  <span>Background removed successfully</span>
                </div>
              </div>
            ) : (
              <div className="h-64 flex flex-col items-center justify-center text-muted-foreground border-2 border-dashed border-border rounded-xl"
                style={{ background: "repeating-conic-gradient(#f3f4f6 0% 25%, transparent 0% 50%) 0 0 / 20px 20px" }}>
                <ImageOff className="w-12 h-12 mb-3 text-muted-foreground/50" />
                <p className="text-sm">Result will appear here</p>
              </div>
            )}
          </Card>
        </div>

        <div className="mt-8 ad-banner p-4 rounded-xl bg-muted/30 border text-center text-muted-foreground text-sm">
          [ Ad Placeholder ]
        </div>

        <section className="mt-12 grid md:grid-cols-3 gap-6">
          {[
            { title: "AI-Powered Precision", desc: "Uses state-of-the-art machine learning to detect complex edges including hair, fur, and transparent objects." },
            { title: "Transparent PNG Output", desc: "Results are downloaded as PNG with transparent background, ready to use in any design software." },
            { title: "Privacy First", desc: "Your images are processed securely and never stored permanently on our servers." },
          ].map((f) => (
            <Card key={f.title} className="p-6">
              <h3 className="font-bold mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </Card>
          ))}
        </section>
      </div>
    </Layout>
  );
}
