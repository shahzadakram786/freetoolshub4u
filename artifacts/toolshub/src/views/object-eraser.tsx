"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Layout } from "@/components/layout";
import { SeoHead } from "@/components/seo-head";
import { Card, Button } from "@/components/ui";
import { Upload, Download, Eraser, Undo2, Trash2, Sparkles } from "lucide-react";
import { useEraseObject } from "@workspace/api-client-react";

function fileToBase64(file: File): Promise<{ base64: string; mimeType: string }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      resolve({ base64: result.split(",")[1], mimeType: file.type });
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export function ObjectEraser() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const maskCanvasRef = useRef<HTMLCanvasElement>(null);
  const [originalImage, setOriginalImage] = useState<HTMLImageElement | null>(null);
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushSize, setBrushSize] = useState(30);
  const [hasMask, setHasMask] = useState(false);

  const { mutate, data, isPending, error, reset } = useEraseObject();

  const setupCanvases = useCallback((img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    const maskCanvas = maskCanvasRef.current;
    if (!canvas || !maskCanvas) return;

    const maxW = 600;
    const scale = Math.min(1, maxW / img.width);
    const w = Math.round(img.width * scale);
    const h = Math.round(img.height * scale);

    canvas.width = w;
    canvas.height = h;
    maskCanvas.width = w;
    maskCanvas.height = h;

    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(img, 0, 0, w, h);

    const mCtx = maskCanvas.getContext("2d")!;
    mCtx.fillStyle = "black";
    mCtx.fillRect(0, 0, w, h);
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setOriginalFile(file);
    reset();
    setHasMask(false);

    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      setOriginalImage(img);
      setupCanvases(img);
      URL.revokeObjectURL(url);
    };
    img.src = url;
  };

  const getPos = (e: React.MouseEvent | React.TouchEvent, canvas: HTMLCanvasElement) => {
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    if ("touches" in e) {
      const touch = e.touches[0];
      return {
        x: (touch.clientX - rect.left) * scaleX,
        y: (touch.clientY - rect.top) * scaleY,
      };
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const draw = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const maskCanvas = maskCanvasRef.current;
    if (!canvas || !maskCanvas) return;

    const pos = getPos(e, canvas);

    const ctx = canvas.getContext("2d")!;
    ctx.save();
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = "rgba(255, 100, 100, 0.5)";
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, brushSize / 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    const mCtx = maskCanvas.getContext("2d")!;
    mCtx.fillStyle = "white";
    mCtx.beginPath();
    mCtx.arc(pos.x, pos.y, brushSize / 2, 0, Math.PI * 2);
    mCtx.fill();

    setHasMask(true);
  }, [isDrawing, brushSize]);

  const clearMask = () => {
    const canvas = canvasRef.current;
    const maskCanvas = maskCanvasRef.current;
    if (!canvas || !maskCanvas || !originalImage) return;

    const ctx = canvas.getContext("2d")!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(originalImage, 0, 0, canvas.width, canvas.height);

    const mCtx = maskCanvas.getContext("2d")!;
    mCtx.fillStyle = "black";
    mCtx.fillRect(0, 0, maskCanvas.width, maskCanvas.height);

    setHasMask(false);
    reset();
  };

  const handleErase = async () => {
    const canvas = canvasRef.current;
    const maskCanvas = maskCanvasRef.current;
    if (!canvas || !maskCanvas || !originalFile) return;

    const { base64: imgBase64, mimeType } = await fileToBase64(originalFile);
    const maskBase64 = maskCanvas.toDataURL("image/png").split(",")[1];

    mutate({ data: { imageBase64: imgBase64, maskBase64, mimeType } });
  };

  const handleDownload = () => {
    if (!data?.resultBase64) return;
    const link = document.createElement("a");
    link.href = `data:image/png;base64,${data.resultBase64}`;
    link.download = "erased-object.png";
    link.click();
  };

  return (
    <Layout>
      <SeoHead
        title="AI Object Eraser - Remove Objects from Photos | ToolsHub"
        description="Erase unwanted objects from photos using AI inpainting. Paint over the object and our AI fills in the background seamlessly."
        keywords="object eraser, remove object from photo, AI inpainting, photo editor, object removal tool"
      />

      <div className="w-full max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-rose-100 mb-4">
            <Eraser className="w-8 h-8 text-rose-600" />
          </div>
          <h1 className="text-4xl font-bold mb-3">AI Object Eraser</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Paint over any object to erase it. Our AI fills in the background seamlessly.
          </p>
        </div>

        <div className="ad-banner mb-8 p-4 rounded-xl bg-muted/30 border text-center text-muted-foreground text-sm">
          
        </div>

        {!originalImage ? (
          <Card className="p-12 text-center">
            <Upload className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h2 className="text-xl font-bold mb-2">Upload an Image to Get Started</h2>
            <p className="text-muted-foreground mb-6 max-w-sm mx-auto">Upload a photo, then paint over the object you want to remove.</p>
            <Button onClick={() => document.getElementById("eraser-file-input")?.click()} size="lg">
              <Upload className="w-4 h-4 mr-2" /> Choose Image
            </Button>
            <input id="eraser-file-input" type="file" accept="image/*" className="hidden" onChange={handleFileInput} />
          </Card>
        ) : (
          <div className="grid lg:grid-cols-[auto_1fr] gap-8">
            <Card className="p-4 flex flex-col gap-4 w-full lg:w-72">
              <h3 className="font-semibold">Controls</h3>

              <div>
                <label className="text-sm text-muted-foreground block mb-2">Brush Size: {brushSize}px</label>
                <input
                  type="range" min="5" max="80" value={brushSize}
                  onChange={(e) => setBrushSize(Number(e.target.value))}
                  className="w-full accent-rose-500"
                />
              </div>

              <Button
                className="w-full bg-rose-500 hover:bg-rose-600"
                onClick={handleErase}
                disabled={isPending || !hasMask}
              >
                <Sparkles className="w-4 h-4 mr-2" />
                {isPending ? "Erasing..." : "Erase Object"}
              </Button>

              {data?.resultBase64 && (
                <Button variant="outline" className="w-full" onClick={handleDownload}>
                  <Download className="w-4 h-4 mr-2" /> Download
                </Button>
              )}

              <Button variant="ghost" className="w-full" onClick={clearMask}>
                <Undo2 className="w-4 h-4 mr-2" /> Clear Mask
              </Button>

              <Button variant="ghost" className="w-full text-destructive" onClick={() => { setOriginalImage(null); setOriginalFile(null); reset(); }}>
                <Trash2 className="w-4 h-4 mr-2" /> Remove Image
              </Button>

              <div className="text-xs text-muted-foreground bg-muted/50 p-3 rounded-lg space-y-1">
                <p className="font-medium">How to use:</p>
                <ol className="space-y-1 list-decimal list-inside">
                  <li>Paint <span className="text-rose-500">red</span> over object</li>
                  <li>Click "Erase Object"</li>
                  <li>AI fills the area</li>
                  <li>Download result</li>
                </ol>
              </div>

              {(error as any)?.message && (
                <div className="p-3 bg-amber-50 rounded-lg border border-amber-200">
                  <p className="text-xs text-amber-700">API key required. Add REPLICATE_API_TOKEN to enable AI erasing.</p>
                </div>
              )}
            </Card>

            <div>
              <div className="relative">
                <canvas
                  ref={canvasRef}
                  className="rounded-xl border border-border w-full cursor-crosshair touch-none"
                  onMouseDown={(e) => { setIsDrawing(true); draw(e); }}
                  onMouseMove={draw}
                  onMouseUp={() => setIsDrawing(false)}
                  onMouseLeave={() => setIsDrawing(false)}
                  onTouchStart={(e) => { e.preventDefault(); setIsDrawing(true); draw(e); }}
                  onTouchMove={(e) => { e.preventDefault(); draw(e); }}
                  onTouchEnd={() => setIsDrawing(false)}
                />
                <canvas ref={maskCanvasRef} className="hidden" />
              </div>

              {data?.resultBase64 && (
                <div className="mt-6">
                  <h3 className="font-semibold mb-3">Result</h3>
                  <div className="rounded-xl overflow-hidden border border-border"
                    style={{ background: "repeating-conic-gradient(#e5e7eb 0% 25%, transparent 0% 50%) 0 0 / 20px 20px" }}>
                    <img src={`data:image/png;base64,${data.resultBase64}`} alt="Result" className="w-full rounded-xl" loading="lazy" decoding="async" />
                  </div>
                </div>
              )}

              {isPending && (
                <div className="mt-4 p-4 bg-rose-50 rounded-xl text-center">
                  <div className="animate-spin w-6 h-6 border-2 border-rose-500 border-t-transparent rounded-full mx-auto mb-2" />
                  <p className="text-sm text-rose-700">AI is filling in the erased area...</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
