import { useState, useRef } from "react";
import { Layout } from "@/components/layout";
import { SeoHead } from "@/components/seo-head";
import { Card, Button } from "@/components/ui";
import { Upload, Copy, Trash2, FileImage } from "lucide-react";

export function ImageToText() {
  const [image, setImage] = useState<string | null>(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setImage(ev.target?.result as string);
        setText("");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setImage(ev.target?.result as string);
        setText("");
      };
      reader.readAsDataURL(file);
    }
  };

  const extractText = async () => {
    if (!image) return;
    setLoading(true);
    setProgress(0);
    setText("");

    try {
      const Tesseract = await import("tesseract.js");
      const { createWorker } = Tesseract;
      const worker = await createWorker("eng", 1, {
        logger: (m: { status: string; progress: number }) => {
          if (m.status === "recognizing text") {
            setProgress(Math.round(m.progress * 100));
          }
        },
      });
      const { data } = await worker.recognize(image);
      setText(data.text.trim());
      await worker.terminate();
    } catch (err) {
      setText("Error extracting text. Please try again with a clearer image.");
    } finally {
      setLoading(false);
      setProgress(0);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setImage(null);
    setText("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <Layout>
      <SeoHead
        title="Image to Text - Free OCR Tool Online | ToolsHub"
        description="Convert images to text online for free. Extract text from JPG, PNG, or any image using powerful OCR technology. No signup required."
        keywords="image to text, ocr online, extract text from image, photo to text, png to text"
      />

      <div className="w-full max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-violet-100 mb-4">
            <FileImage className="w-8 h-8 text-violet-600" />
          </div>
          <h1 className="text-4xl font-bold mb-3">Image to Text (OCR)</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Upload any image and extract the text from it instantly. Works with JPG, PNG, GIF and more.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6">
            <h2 className="font-semibold text-lg mb-4">Upload Image</h2>
            <div
              className="border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:border-primary/50 transition-colors"
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              onClick={() => fileInputRef.current?.click()}
            >
              {image ? (
                <img src={image} alt="Uploaded" className="max-h-48 mx-auto rounded-lg object-contain" />
              ) : (
                <div>
                  <Upload className="w-10 h-10 mx-auto text-muted-foreground mb-3" />
                  <p className="text-muted-foreground text-sm">
                    Drag & drop an image here, or click to browse
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">Supports JPG, PNG, GIF, BMP, TIFF</p>
                </div>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />

            <div className="flex gap-3 mt-4">
              <Button
                className="flex-1"
                onClick={extractText}
                disabled={!image || loading}
              >
                {loading ? `Extracting... ${progress}%` : "Extract Text"}
              </Button>
              <Button variant="outline" onClick={handleClear} disabled={loading}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>

            {loading && (
              <div className="mt-4">
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1 text-center">{progress}% complete</p>
              </div>
            )}
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-lg">Extracted Text</h2>
              {text && (
                <Button variant="outline" size="sm" onClick={handleCopy}>
                  <Copy className="w-4 h-4 mr-1" />
                  {copied ? "Copied!" : "Copy"}
                </Button>
              )}
            </div>
            <textarea
              className="w-full h-64 p-4 rounded-xl border border-border bg-muted/30 resize-none text-sm font-mono focus:outline-none focus:ring-2 focus:ring-primary/50"
              placeholder="Extracted text will appear here after processing..."
              value={text}
              readOnly
            />
            {text && (
              <p className="text-xs text-muted-foreground mt-2">
                {text.split(/\s+/).filter(Boolean).length} words · {text.length} characters
              </p>
            )}
          </Card>
        </div>

        <div className="ad-banner mt-12 p-6 rounded-xl bg-muted/30 border text-center text-muted-foreground text-sm">
          [ Ad Placeholder ]
        </div>

        <section className="mt-12 prose prose-sm max-w-none">
          <h2 className="text-2xl font-bold mb-4">What is an OCR Tool?</h2>
          <p className="text-muted-foreground">
            OCR (Optical Character Recognition) technology converts images containing written text into machine-readable text.
            Our free Image to Text tool uses Tesseract.js, one of the most powerful OCR engines, to accurately extract text
            from your images directly in your browser — no data is uploaded to any server.
          </p>
          <h2 className="text-2xl font-bold mt-6 mb-4">How to Use</h2>
          <ol className="text-muted-foreground space-y-2 list-decimal list-inside">
            <li>Click the upload area or drag and drop your image</li>
            <li>Click "Extract Text" to process the image</li>
            <li>Wait for the OCR to complete (may take a few seconds)</li>
            <li>Copy the extracted text to use anywhere</li>
          </ol>
        </section>
      </div>
    </Layout>
  );
}
