"use client";

import { useState, useCallback, useRef } from "react";
import { SeoHead, toolJsonLd } from "@/components/seo-head";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Download, Trash2, Sparkles, MoveHorizontal, Cpu, Zap, Lock } from "lucide-react";

// Comparison Slider Component
function ComparisonSlider({ before, after }: { before: string; after: string }) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updatePos = (clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPosition(Math.max(2, Math.min(98, ((clientX - rect.left) / rect.width) * 100)));
  };

  return (
    <div
      ref={containerRef}
      className="relative select-none overflow-hidden rounded-2xl cursor-col-resize shadow-2xl"
      style={{ touchAction: "none" }}
      onMouseMove={(e) => dragging.current && updatePos(e.clientX)}
      onMouseDown={(e) => { dragging.current = true; updatePos(e.clientX); }}
      onMouseUp={() => { dragging.current = false; }}
      onMouseLeave={() => { dragging.current = false; }}
      onTouchMove={(e) => updatePos(e.touches[0].clientX)}
    >
      <div className="w-full" style={{ background: "repeating-conic-gradient(#d1d5db 0% 25%, #fff 0% 50%) 0 0 / 20px 20px" }}>
        <img src={after} alt="Background removed" className="w-full max-h-[480px] object-contain" loading="lazy" decoding="async" />
      </div>
      <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
        <img src={before} alt="Original" className="w-full h-full object-contain" loading="lazy" decoding="async" />
      </div>
      <div className="absolute top-3 left-3 bg-black/60 text-white text-xs font-bold px-2 py-1 rounded-full backdrop-blur-sm">Original</div>
      <div className="absolute top-3 right-3 bg-violet-600/80 text-white text-xs font-bold px-2 py-1 rounded-full backdrop-blur-sm">Removed</div>
      <div className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_12px_rgba(0,0,0,0.4)]"
        style={{ left: `${position}%`, transform: "translateX(-50%)" }}>
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white shadow-xl flex items-center justify-center border-2 border-violet-300">
          <MoveHorizontal className="w-5 h-5 text-violet-600" />
        </div>
      </div>
    </div>
  );
}

const FEATURES = [
  { icon: Cpu, title: "100% On-Device AI", desc: "Runs in your browser via WebAssembly. Your photo never leaves your device.", color: "text-violet-500", bg: "bg-violet-500/10" },
  { icon: Lock, title: "Zero API Key Needed", desc: "No account, no subscription. Powered by open-source ONNX AI models.", color: "text-emerald-500", bg: "bg-emerald-500/10" },
  { icon: Zap, title: "Professional Results", desc: "State-of-the-art segmentation model for clean, accurate hair & edge detection.", color: "text-amber-500", bg: "bg-amber-500/10" },
];

export function BgRemover() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressLabel, setProgressLabel] = useState("");
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

 
const processFile = useCallback(async (file: File) => {
  if (!file.type.startsWith("image/")) {
    setError("Please upload an image file (JPG, PNG, WEBP).");
    return;
  }
  if (file.size > 8 * 1024 * 1024) {
    setError("Image is too large. Please use an image under 8MB.");
    return;
  }

  setError(null);
  setResultImage(null);
  setProgress(0);
  setProgressLabel("Downloading AI model...");
  setOriginalImage(URL.createObjectURL(file));
  setIsProcessing(true);

  try {
    setProgress(10);
    setProgressLabel("Loading AI model library...");
    const { removeBackground } = await import("@imgly/background-removal");
    setProgress(20);
    setProgressLabel("Downloading AI model...");

    const resultBlob = await removeBackground(file, {
      progress: (key: string, current: number, total: number) => {
        if (total === 0) return;
        const pct = Math.round((current / total) * 100);

        if (key.includes("fetch")) {
          setProgress(20 + Math.round(pct * 0.3)); // 20-50%
          setProgressLabel(`Downloading AI assets... ${pct}%`);
        } else if (key.includes("inference") || key.includes("compute")) {
          setProgress(50 + Math.round(pct * 0.45)); // 50-95%
          if (pct > 80) {
            setProgressLabel("Refining edges...");
          } else {
            setProgressLabel("Removing background...");
          }
        }
      },
    });

    setProgress(100);
    setProgressLabel("Done!");
    setResultImage(URL.createObjectURL(resultBlob));
  } catch (err: any) {
    console.error("BG REMOVAL ERROR:", err);
    setError(`Processing failed: ${err.message || "Unknown error"}. Please try a different image or refresh the page.`);
  } finally {
    setIsProcessing(false);
  }
}, []);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  };

  const reset = () => {
    setOriginalImage(null);
    setResultImage(null);
    setError(null);
    setProgress(0);
    if (inputRef.current) inputRef.current.value = "";
  };

  const downloadResult = () => {
    if (!resultImage) return;
    const a = document.createElement("a");
    a.href = resultImage;
    a.download = "toolshub-bg-removed.png";
    a.click();
  };

  return (
    <>
      <SeoHead
        title="AI Background Remover — Free, Instant & Private"
        description="Remove image backgrounds instantly with on-device AI. 100% private — your image never leaves your browser. No API key needed. Download as transparent PNG."
        keywords="background remover, remove background, transparent PNG, AI background removal, free background remover"
        canonicalPath="/bg-remover"
        jsonLd={toolJsonLd("AI Background Remover", "Remove image backgrounds with on-device AI. 100% private, no API key needed.", "/bg-remover")}
      />

      <div className="w-full max-w-4xl mx-auto px-4 py-12">
        {/* Header */}
        <motion.div className="text-center mb-10" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="w-16 h-16 rounded-2xl bg-violet-500/10 flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-8 h-8 text-violet-500" />
          </div>
          <h1 className="text-4xl font-bold mb-3">AI Background Remover</h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Powered by <strong>on-device AI</strong> — your image is processed entirely in your browser. Zero uploads, 100% private.
          </p>
        </motion.div>

        {/* Features */}
        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10"
          initial="hidden" animate="show"
          variants={{ show: { transition: { staggerChildren: 0.1 } }, hidden: {} }}>
          {FEATURES.map((f) => (
            <motion.div key={f.title} variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
              className="flex items-start gap-3 p-4 rounded-2xl bg-card border border-border">
              <div className={`w-9 h-9 rounded-xl ${f.bg} flex items-center justify-center shrink-0`}>
                <f.icon className={`w-4 h-4 ${f.color}`} />
              </div>
              <div>
                <p className="font-bold text-sm">{f.title}</p>
                <p className="text-xs text-muted-foreground">{f.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          {/* Upload Zone */}
          {!originalImage && !isProcessing && (
            <motion.div key="upload" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
              <div
                onDrop={handleDrop}
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onClick={() => inputRef.current?.click()}
                className={`relative border-2 border-dashed rounded-3xl p-16 text-center cursor-pointer transition-all duration-300 ${
                  isDragging ? "border-violet-500 bg-violet-500/5 scale-[1.01]" : "border-border hover:border-violet-400/60 hover:bg-muted/30"
                }`}
              >
                <input ref={inputRef} type="file" className="hidden" accept="image/*"
                  onChange={(e) => { const f = e.target.files?.[0]; if (f) processFile(f); }} />
                <motion.div animate={{ y: isDragging ? -6 : 0 }} transition={{ type: "spring", stiffness: 300 }}>
                  <div className="w-16 h-16 rounded-2xl bg-violet-500/10 flex items-center justify-center mx-auto mb-5">
                    <Upload className="w-8 h-8 text-violet-500" />
                  </div>
                </motion.div>
                <p className="text-xl font-bold mb-1">Drop your image here</p>
                <p className="text-muted-foreground mb-5">or click to browse your files</p>
                <span className="inline-block px-5 py-2.5 rounded-xl bg-violet-600 text-white font-semibold text-sm hover:bg-violet-700 transition-colors shadow-lg shadow-violet-600/20">
                  Choose Image
                </span>
                <p className="text-xs text-muted-foreground mt-4">Supports JPG, PNG, WEBP · Max 8MB</p>
              </div>
            </motion.div>
          )}

          {/* Processing */}
          {isProcessing && (
            <motion.div key="processing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-16 text-center">
              <div className="relative w-24 h-24 mx-auto mb-6">
                <svg className="w-24 h-24 -rotate-90" viewBox="0 0 96 96">
                  <circle cx="48" cy="48" r="40" fill="none" stroke="hsl(var(--muted))" strokeWidth="7" />
                  <circle cx="48" cy="48" r="40" fill="none" stroke="hsl(250,84%,60%)" strokeWidth="7"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 40}`}
                    strokeDashoffset={`${2 * Math.PI * 40 * (1 - progress / 100)}`}
                    style={{ transition: "stroke-dashoffset 0.5s cubic-bezier(0.4,0,0.2,1)" }} />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-base font-bold text-violet-600">{progress}%</span>
                </div>
              </div>
              <p className="text-lg font-bold mb-1">AI Processing...</p>
              <p className="text-muted-foreground text-sm">{progressLabel}</p>
              <p className="text-xs text-muted-foreground mt-3 flex items-center justify-center gap-1.5">
                <Lock className="w-3 h-3" /> Your image stays local — never sent to any server
              </p>
              {originalImage && (
                <div className="mt-6 max-w-xs mx-auto rounded-xl overflow-hidden opacity-40 border border-border">
                  <img src={originalImage} alt="preview" className="w-full h-32 object-cover" loading="lazy" decoding="async" />
                </div>
              )}
            </motion.div>
          )}

          {/* Result */}
          {!isProcessing && resultImage && originalImage && (
            <motion.div key="result" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <p className="text-center text-sm text-muted-foreground mb-4 font-medium flex items-center justify-center gap-2">
                <MoveHorizontal className="w-4 h-4" /> Drag the slider to compare before & after
              </p>
              <ComparisonSlider before={originalImage} after={resultImage} />

              <div className="flex flex-wrap gap-3 justify-center mt-6">
                <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                  onClick={downloadResult}
                  className="flex items-center gap-2 bg-violet-600 text-white px-7 py-3 rounded-xl font-semibold hover:bg-violet-700 transition-colors shadow-lg shadow-violet-600/25">
                  <Download className="w-4 h-4" /> Download PNG (Transparent)
                </motion.button>
                <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                  onClick={reset}
                  className="flex items-center gap-2 bg-muted text-foreground px-7 py-3 rounded-xl font-semibold hover:bg-muted/70 transition-colors border border-border">
                  <Trash2 className="w-4 h-4" /> Try Another Image
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {error && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-4 rounded-xl bg-destructive/10 border border-destructive/30 text-destructive text-sm text-center">
            {error}
            <button onClick={reset} className="underline ml-2 opacity-80 hover:opacity-100">Clear & try again</button>
          </motion.div>
        )}
      </div>
    </>
  );
}