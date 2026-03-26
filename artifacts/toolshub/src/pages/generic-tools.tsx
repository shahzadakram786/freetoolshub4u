import { useState } from "react";
import { Layout } from "@/components/layout";
import { SeoHead } from "@/components/seo-head";
import { Card, Textarea, Button, Input, Label } from "@/components/ui";
import { FileCode, Type, Braces, Calculator, Activity } from "lucide-react";
import { copyToClipboard } from "@/lib/utils";

// Case Converter
export function CaseConverter() {
  const [text, setText] = useState("");

  return (
    <Layout>
      <SeoHead title="Case Converter" description="Convert text to uppercase, lowercase, title case, and more." />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center flex items-center justify-center gap-3"><Type className="text-violet-500"/> Case Converter</h1>
        <Card className="p-6">
          <div className="flex flex-wrap gap-2 mb-4">
            <Button variant="secondary" onClick={() => setText(text.toUpperCase())}>UPPERCASE</Button>
            <Button variant="secondary" onClick={() => setText(text.toLowerCase())}>lowercase</Button>
            <Button variant="secondary" onClick={() => {
              setText(text.toLowerCase().replace(/\b\w/g, s => s.toUpperCase()));
            }}>Title Case</Button>
            <Button variant="secondary" onClick={() => copyToClipboard(text)}>Copy Result</Button>
          </div>
          <Textarea value={text} onChange={e => setText(e.target.value)} className="min-h-[300px]" placeholder="Type or paste text..." />
        </Card>
      </div>
    </Layout>
  );
}

// Base64
export function Base64Encoder() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState(false);

  const encode = () => { try { setOutput(btoa(input)); setError(false); } catch { setError(true); } };
  const decode = () => { try { setOutput(atob(input)); setError(false); } catch { setError(true); } };

  return (
    <Layout>
      <SeoHead title="Base64 Encode/Decode" description="Free online Base64 encoder and decoder tool." />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center flex items-center justify-center gap-3"><FileCode className="text-fuchsia-500"/> Base64 Tool</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6">
            <Label>Input</Label>
            <Textarea value={input} onChange={e => setInput(e.target.value)} className="mt-2 mb-4" />
            <div className="flex gap-2">
              <Button onClick={encode} className="flex-1 bg-fuchsia-600 hover:bg-fuchsia-700">Encode</Button>
              <Button onClick={decode} variant="outline" className="flex-1">Decode</Button>
            </div>
            {error && <p className="text-destructive text-sm mt-2">Invalid input format</p>}
          </Card>
          <Card className="p-6 bg-muted/30">
            <Label>Output</Label>
            <Textarea value={output} readOnly className="mt-2 mb-4 bg-transparent border-dashed" />
            <Button onClick={() => copyToClipboard(output)} variant="secondary" className="w-full">Copy Output</Button>
          </Card>
        </div>
      </div>
    </Layout>
  );
}

// JSON Formatter
export function JsonFormatter() {
  const [json, setJson] = useState("");
  const [error, setError] = useState<string | null>(null);

  const format = () => {
    try {
      const parsed = JSON.parse(json);
      setJson(JSON.stringify(parsed, null, 2));
      setError(null);
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <Layout>
      <SeoHead title="JSON Formatter & Validator" description="Beautify and validate JSON code online." />
      <div className="max-w-5xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center flex items-center justify-center gap-3"><Braces className="text-yellow-600"/> JSON Formatter</h1>
        <Card className="p-6">
          <div className="flex gap-2 mb-4">
            <Button onClick={format} className="bg-yellow-600 hover:bg-yellow-700">Format / Validate</Button>
            <Button variant="outline" onClick={() => copyToClipboard(json)}>Copy</Button>
            <Button variant="ghost" onClick={() => setJson("")}>Clear</Button>
          </div>
          {error && <div className="mb-4 p-3 bg-destructive/10 text-destructive rounded-lg border border-destructive/20 text-sm font-mono">{error}</div>}
          <Textarea 
            value={json} 
            onChange={e => setJson(e.target.value)} 
            className="min-h-[500px] font-mono text-sm bg-slate-900 text-slate-100" 
            placeholder='{"key": "value"}' 
            spellCheck={false}
          />
        </Card>
      </div>
    </Layout>
  );
}

// BMI Calculator
export function BmiCalculator() {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState<number | null>(null);

  const calculate = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100; // cm to m
    if (w > 0 && h > 0) {
      setBmi(w / (h * h));
    }
  };

  const getCategory = (b: number) => {
    if (b < 18.5) return { label: "Underweight", color: "text-blue-500" };
    if (b < 25) return { label: "Normal weight", color: "text-emerald-500" };
    if (b < 30) return { label: "Overweight", color: "text-amber-500" };
    return { label: "Obese", color: "text-rose-500" };
  };

  return (
    <Layout>
      <SeoHead title="BMI Calculator" description="Calculate your Body Mass Index (BMI) instantly." />
      <div className="max-w-xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center flex items-center justify-center gap-3"><Activity className="text-rose-500"/> BMI Calculator</h1>
        <Card className="p-8 shadow-xl">
          <div className="space-y-4 mb-6">
            <div>
              <Label>Weight (kg)</Label>
              <Input type="number" value={weight} onChange={e => setWeight(e.target.value)} placeholder="e.g. 70" className="mt-1" />
            </div>
            <div>
              <Label>Height (cm)</Label>
              <Input type="number" value={height} onChange={e => setHeight(e.target.value)} placeholder="e.g. 175" className="mt-1" />
            </div>
          </div>
          <Button onClick={calculate} className="w-full bg-rose-500 hover:bg-rose-600 h-12" size="lg">Calculate BMI</Button>

          {bmi !== null && (
            <div className="mt-8 text-center animate-in fade-in p-6 bg-muted rounded-xl">
              <p className="text-muted-foreground mb-2">Your BMI is</p>
              <p className="text-5xl font-bold mb-2">{bmi.toFixed(1)}</p>
              <p className={`text-xl font-bold ${getCategory(bmi).color}`}>{getCategory(bmi).label}</p>
            </div>
          )}
        </Card>
      </div>
    </Layout>
  );
}

// Age Calculator
export function AgeCalculator() {
  const [dob, setDob] = useState("");
  const [age, setAge] = useState<{y: number, m: number, d: number} | null>(null);

  const calculate = () => {
    if (!dob) return;
    const birthDate = new Date(dob);
    const today = new Date();
    
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
      months--;
      days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }
    setAge({ y: years, m: months, d: days });
  };

  return (
    <Layout>
      <SeoHead title="Age Calculator" description="Calculate your exact age in years, months, and days." />
      <div className="max-w-xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center flex items-center justify-center gap-3"><Calculator className="text-lime-500"/> Age Calculator</h1>
        <Card className="p-8 shadow-xl">
          <div className="mb-6">
            <Label>Date of Birth</Label>
            <Input type="date" value={dob} onChange={e => setDob(e.target.value)} className="mt-2" max={new Date().toISOString().split('T')[0]} />
          </div>
          <Button onClick={calculate} className="w-full bg-lime-600 hover:bg-lime-700 h-12" size="lg">Calculate Exact Age</Button>

          {age && (
            <div className="mt-8 grid grid-cols-3 gap-4 text-center animate-in fade-in">
              <div className="p-4 bg-muted rounded-xl">
                <p className="text-3xl font-bold text-foreground">{age.y}</p>
                <p className="text-sm text-muted-foreground">Years</p>
              </div>
              <div className="p-4 bg-muted rounded-xl">
                <p className="text-3xl font-bold text-foreground">{age.m}</p>
                <p className="text-sm text-muted-foreground">Months</p>
              </div>
              <div className="p-4 bg-muted rounded-xl">
                <p className="text-3xl font-bold text-foreground">{age.d}</p>
                <p className="text-sm text-muted-foreground">Days</p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </Layout>
  );
}

// Plagiarism Checkers (Using API hooks)
import { useCheckPlagiarism, useParaphraseText } from "@workspace/api-client-react";

export function PlagiarismChecker() {
  const [text, setText] = useState("");
  const { mutate, data, isPending } = useCheckPlagiarism();

  return (
    <Layout>
      <SeoHead title="Free Plagiarism Checker" description="Check text for plagiarism online." />
      <div className="max-w-5xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">Plagiarism Checker</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="p-6">
            <Textarea value={text} onChange={e => setText(e.target.value)} className="min-h-[300px] mb-4" placeholder="Paste text to check..." />
            <Button onClick={() => mutate({data:{text}})} disabled={text.length < 20} isLoading={isPending} className="w-full">Check for Plagiarism</Button>
          </Card>
          <Card className="p-6 bg-slate-50 dark:bg-slate-900">
            {data ? (
              <div className="space-y-6">
                <h3 className="text-2xl font-bold">{data.verdict}</h3>
                <div className="flex gap-4">
                  <div className="flex-1 p-4 bg-white dark:bg-black rounded-xl text-center">
                    <p className="text-rose-500 font-bold text-3xl">{data.score}%</p>
                    <p className="text-sm">Plagiarized</p>
                  </div>
                  <div className="flex-1 p-4 bg-white dark:bg-black rounded-xl text-center">
                    <p className="text-emerald-500 font-bold text-3xl">{data.uniqueScore}%</p>
                    <p className="text-sm">Unique</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-muted-foreground">Results will appear here</div>
            )}
          </Card>
        </div>
      </div>
    </Layout>
  );
}

export function Paraphraser() {
  const [text, setText] = useState("");
  const { mutate, data, isPending } = useParaphraseText();

  return (
    <Layout>
      <SeoHead title="Article Rewriter & Paraphraser" description="Rewrite text to avoid plagiarism." />
      <div className="max-w-5xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">Article Rewriter</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6">
            <Label>Original Text</Label>
            <Textarea value={text} onChange={e => setText(e.target.value)} className="min-h-[300px] my-4" />
            <Button onClick={() => mutate({data:{text}})} disabled={text.length < 10} isLoading={isPending} className="w-full">Paraphrase</Button>
          </Card>
          <Card className="p-6 bg-indigo-50/50 dark:bg-indigo-950/20">
            <Label>Rewritten Text</Label>
            <Textarea readOnly value={data?.result || ""} className="min-h-[300px] my-4 bg-transparent" placeholder="Result..." />
            <Button variant="secondary" onClick={() => copyToClipboard(data?.result || "")} className="w-full">Copy</Button>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
