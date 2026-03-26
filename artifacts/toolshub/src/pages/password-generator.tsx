import { useState, useEffect } from "react";
import { Layout } from "@/components/layout";
import { SeoHead } from "@/components/seo-head";
import { Card, Button, Label } from "@/components/ui";
import { KeyRound, Copy, RefreshCw } from "lucide-react";
import { copyToClipboard } from "@/lib/utils";

export function PasswordGenerator() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(16);
  const [options, setOptions] = useState({ uppercase: true, lowercase: true, numbers: true, symbols: true });
  const [copied, setCopied] = useState(false);

  const generatePassword = () => {
    let charset = "";
    if (options.uppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (options.lowercase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (options.numbers) charset += "0123456789";
    if (options.symbols) charset += "!@#$%^&*()_+~`|}{[]:;?><,./-=";
    
    if (charset === "") charset = "abcdefghijklmnopqrstuvwxyz";

    let newPassword = "";
    for (let i = 0; i < length; i++) {
      newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setPassword(newPassword);
    setCopied(false);
  };

  useEffect(() => {
    generatePassword();
  }, [length, options]);

  const handleCopy = () => {
    copyToClipboard(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Layout>
      <SeoHead title="Strong Password Generator" description="Create highly secure, random passwords instantly to protect your accounts." />
      
      <div className="w-full max-w-3xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-4 bg-amber-500/10 rounded-2xl mb-6">
            <KeyRound className="w-10 h-10 text-amber-500" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Password Generator</h1>
          <p className="text-muted-foreground">Generate robust, random passwords to keep your online data secure.</p>
        </div>

        <Card className="p-8 shadow-xl border-amber-500/20">
          <div className="relative mb-8 group">
            <div className="w-full bg-muted border-2 border-border p-6 rounded-2xl text-center text-3xl font-mono tracking-wider break-all min-h-[90px] flex items-center justify-center">
              {password}
            </div>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-2">
              <Button size="icon" variant="secondary" onClick={generatePassword} title="Regenerate">
                <RefreshCw className="w-5 h-5" />
              </Button>
              <Button size="icon" className="bg-amber-500 hover:bg-amber-600 text-white shadow-lg" onClick={handleCopy}>
                <Copy className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <div className="flex justify-between mb-4">
                <Label className="text-base">Password Length</Label>
                <span className="font-bold text-amber-600">{length}</span>
              </div>
              <input 
                type="range" 
                min="8" max="64" 
                value={length} 
                onChange={(e) => setLength(Number(e.target.value))}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { id: 'uppercase', label: 'Uppercase Letters (A-Z)' },
                { id: 'lowercase', label: 'Lowercase Letters (a-z)' },
                { id: 'numbers', label: 'Numbers (0-9)' },
                { id: 'symbols', label: 'Symbols (!@#$)' }
              ].map((opt) => (
                <label key={opt.id} className="flex items-center gap-3 p-4 border border-border rounded-xl cursor-pointer hover:bg-muted/50 transition-colors">
                  <input 
                    type="checkbox" 
                    className="w-5 h-5 rounded text-amber-500 focus:ring-amber-500 border-border"
                    checked={options[opt.id as keyof typeof options]}
                    onChange={(e) => setOptions({...options, [opt.id]: e.target.checked})}
                  />
                  <span className="font-medium">{opt.label}</span>
                </label>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
}
