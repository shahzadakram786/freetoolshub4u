"use client";

import { useState } from "react";
import { Layout } from "@/components/layout";
import { SeoHead } from "@/components/seo-head";
import { Card, Textarea, Button, Input, Label } from "@/components/ui";
import { FileCode, Type, Braces, Calculator, Activity } from "lucide-react";
import { copyToClipboard } from "@/lib/utils";

// Case Converter
export function CaseConverter() {
  const [text, setText] = useState("");

  const toCamelCase = (s: string) =>
    s.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_: string, chr: string) => chr.toUpperCase());
  const toSnakeCase = (s: string) =>
    s.toLowerCase().replace(/\s+/g, "_");

  return (
    <Layout>
      <SeoHead title="Case Converter - Free Online Text Case Tool | ToolsHub" description="Convert text to uppercase, lowercase, title case, camelCase, snake_case and more." />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center flex items-center justify-center gap-3"><Type className="text-violet-500" /> Case Converter</h1>
        <Card className="p-6">
          <div className="flex flex-wrap gap-2 mb-4">
            <Button variant="secondary" onClick={() => setText(text.toUpperCase())}>UPPERCASE</Button>
            <Button variant="secondary" onClick={() => setText(text.toLowerCase())}>lowercase</Button>
            <Button variant="secondary" onClick={() => setText(text.toLowerCase().replace(/\b\w/g, (s) => s.toUpperCase()))}>Title Case</Button>
            <Button variant="secondary" onClick={() => setText(toCamelCase(text))}>camelCase</Button>
            <Button variant="secondary" onClick={() => setText(toSnakeCase(text))}>snake_case</Button>
            <Button variant="outline" onClick={() => copyToClipboard(text)}>Copy</Button>
            <Button variant="ghost" onClick={() => setText("")}>Clear</Button>
          </div>
          <Textarea value={text} onChange={(e) => setText(e.target.value)} className="min-h-[300px]" placeholder="Type or paste your text here..." />
          <p className="text-xs text-muted-foreground mt-2">{text.split(/\s+/).filter(Boolean).length} words · {text.length} characters</p>
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

  const encode = () => { try { setOutput(btoa(unescape(encodeURIComponent(input)))); setError(false); } catch { setError(true); } };
  const decode = () => { try { setOutput(decodeURIComponent(escape(atob(input)))); setError(false); } catch { setError(true); } };

  return (
    <Layout>
      <SeoHead title="Base64 Encode/Decode - Free Online Tool | ToolsHub" description="Free online Base64 encoder and decoder tool. Encode text and decode base64 strings instantly." />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center flex items-center justify-center gap-3"><FileCode className="text-fuchsia-500" /> Base64 Tool</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6">
            <Label>Input</Label>
            <Textarea value={input} onChange={(e) => setInput(e.target.value)} className="mt-2 mb-4 min-h-[200px] font-mono text-sm" placeholder="Enter text to encode or base64 to decode..." />
            <div className="flex gap-2">
              <Button onClick={encode} className="flex-1 bg-fuchsia-600 hover:bg-fuchsia-700">Encode →</Button>
              <Button onClick={decode} variant="outline" className="flex-1">← Decode</Button>
            </div>
            {error && <p className="text-destructive text-sm mt-2">Invalid input format</p>}
          </Card>
          <Card className="p-6 bg-muted/30">
            <Label>Output</Label>
            <Textarea value={output} readOnly className="mt-2 mb-4 min-h-[200px] font-mono text-sm bg-transparent border-dashed" placeholder="Result appears here..." />
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
  const [minified, setMinified] = useState(false);

  const format = () => {
    try {
      const parsed = JSON.parse(json);
      setJson(JSON.stringify(parsed, null, 2));
      setMinified(false);
      setError(null);
    } catch (e: any) {
      setError(e.message);
    }
  };

  const minify = () => {
    try {
      const parsed = JSON.parse(json);
      setJson(JSON.stringify(parsed));
      setMinified(true);
      setError(null);
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <Layout>
      <SeoHead title="JSON Formatter & Validator - Free Online Tool | ToolsHub" description="Beautify, format, and validate JSON online. Minify JSON for production use." />
      <div className="max-w-5xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center flex items-center justify-center gap-3"><Braces className="text-yellow-600" /> JSON Formatter</h1>
        <Card className="p-6">
          <div className="flex flex-wrap gap-2 mb-4">
            <Button onClick={format} className="bg-yellow-600 hover:bg-yellow-700">Format / Beautify</Button>
            <Button onClick={minify} variant="outline">Minify</Button>
            <Button variant="outline" onClick={() => copyToClipboard(json)}>Copy</Button>
            <Button variant="ghost" onClick={() => { setJson(""); setError(null); }}>Clear</Button>
          </div>
          {error && <div className="mb-4 p-3 bg-destructive/10 text-destructive rounded-lg border border-destructive/20 text-sm font-mono">{error}</div>}
          <Textarea
            value={json}
            onChange={(e) => { setJson(e.target.value); setError(null); }}
            className="min-h-[500px] font-mono text-sm bg-slate-900 text-slate-100"
            placeholder='{"key": "value"}'
            spellCheck={false}
          />
        </Card>
      </div>
    </Layout>
  );
}

// BMI Calculator — with Imperial/Metric toggle
export function BmiCalculator() {
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [weight, setWeight] = useState("");
  const [weightLbs, setWeightLbs] = useState("");
  const [heightCm, setHeightCm] = useState("");
  const [heightFt, setHeightFt] = useState("");
  const [heightIn, setHeightIn] = useState("");
  const [bmi, setBmi] = useState<number | null>(null);

  const calculate = () => {
    if (unit === "metric") {
      const w = parseFloat(weight);
      const h = parseFloat(heightCm) / 100;
      if (w > 0 && h > 0) setBmi(w / (h * h));
    } else {
      const w = parseFloat(weightLbs);
      const ft = parseFloat(heightFt) || 0;
      const inches = parseFloat(heightIn) || 0;
      const totalInches = ft * 12 + inches;
      if (w > 0 && totalInches > 0) setBmi(703 * w / (totalInches * totalInches));
    }
  };

  const getCategory = (b: number) => {
    if (b < 18.5) return { label: "Underweight", color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-950/30", tip: "Consider consulting a healthcare provider about healthy weight gain strategies." };
    if (b < 25) return { label: "Normal weight", color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-950/30", tip: "Great! Maintain your healthy weight with balanced diet and regular exercise." };
    if (b < 30) return { label: "Overweight", color: "text-amber-500", bg: "bg-amber-50 dark:bg-amber-950/30", tip: "Consider a balanced diet and increased physical activity." };
    return { label: "Obese", color: "text-rose-500", bg: "bg-rose-50 dark:bg-rose-950/30", tip: "Consult a healthcare professional for a personalized weight management plan." };
  };

  const bmiPercent = bmi ? Math.min(100, Math.max(0, ((bmi - 10) / (45 - 10)) * 100)) : 0;

  return (
    <Layout>
      <SeoHead
        title="BMI Calculator - Metric & Imperial | ToolsHub"
        description="Calculate BMI in metric (kg/cm) or imperial (lbs/ft/inches). Free online BMI calculator with health category and tips."
        keywords="BMI calculator, body mass index, weight calculator, metric BMI, imperial BMI"
      />
      <div className="max-w-xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center flex items-center justify-center gap-3">
          <Activity className="text-rose-500" /> BMI Calculator
        </h1>

        <Card className="p-8 shadow-xl">
          <div className="flex rounded-xl overflow-hidden border border-border mb-6">
            <button
              onClick={() => { setUnit("metric"); setBmi(null); }}
              className={`flex-1 py-2.5 text-sm font-medium transition-colors ${unit === "metric" ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80 text-muted-foreground"}`}
            >
              Metric (kg / cm)
            </button>
            <button
              onClick={() => { setUnit("imperial"); setBmi(null); }}
              className={`flex-1 py-2.5 text-sm font-medium transition-colors ${unit === "imperial" ? "bg-primary text-primary-foreground" : "bg-muted hover:bg-muted/80 text-muted-foreground"}`}
            >
              Imperial (lbs / ft)
            </button>
          </div>

          <div className="space-y-4 mb-6">
            {unit === "metric" ? (
              <>
                <div>
                  <Label>Weight (kilograms)</Label>
                  <Input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="e.g. 70" className="mt-1" min="1" />
                </div>
                <div>
                  <Label>Height (centimeters)</Label>
                  <Input type="number" value={heightCm} onChange={(e) => setHeightCm(e.target.value)} placeholder="e.g. 175" className="mt-1" min="50" />
                </div>
              </>
            ) : (
              <>
                <div>
                  <Label>Weight (pounds)</Label>
                  <Input type="number" value={weightLbs} onChange={(e) => setWeightLbs(e.target.value)} placeholder="e.g. 154" className="mt-1" min="1" />
                </div>
                <div>
                  <Label>Height</Label>
                  <div className="grid grid-cols-2 gap-3 mt-1">
                    <div className="relative">
                      <Input type="number" value={heightFt} onChange={(e) => setHeightFt(e.target.value)} placeholder="e.g. 5" min="0" />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground font-medium">ft</span>
                    </div>
                    <div className="relative">
                      <Input type="number" value={heightIn} onChange={(e) => setHeightIn(e.target.value)} placeholder="e.g. 9" min="0" max="11" />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground font-medium">in</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Enter feet and inches separately (0–11 inches)</p>
                </div>
              </>
            )}
          </div>

          <Button onClick={calculate} className="w-full bg-rose-500 hover:bg-rose-600 h-12" size="lg">
            Calculate BMI
          </Button>

          {bmi !== null && (
            <div className={`mt-8 p-6 rounded-xl animate-in fade-in ${getCategory(bmi).bg}`}>
              <p className="text-sm text-muted-foreground text-center mb-1">Your BMI</p>
              <p className="text-6xl font-bold text-center mb-2">{bmi.toFixed(1)}</p>
              <p className={`text-xl font-bold text-center mb-4 ${getCategory(bmi).color}`}>{getCategory(bmi).label}</p>

              <div className="relative h-3 rounded-full bg-gradient-to-r from-blue-400 via-emerald-400 via-amber-400 to-rose-500 mb-1">
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-foreground rounded-full shadow-md transition-all"
                  style={{ left: `calc(${bmiPercent}% - 8px)` }}
                />
              </div>
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>Underweight</span><span>Normal</span><span>Overweight</span><span>Obese</span>
              </div>

              <p className="text-sm text-muted-foreground mt-4 text-center">{getCategory(bmi).tip}</p>
            </div>
          )}

          <div className="mt-6 p-4 bg-muted/30 rounded-lg text-xs text-muted-foreground">
            <strong>Note:</strong> BMI is a screening tool, not a diagnostic measure. It doesn't account for muscle mass, bone density, or age. Consult a healthcare provider for a complete assessment.
          </div>
        </Card>
      </div>
    </Layout>
  );
}

// Age Calculator
export function AgeCalculator() {
  const [dob, setDob] = useState("");
  const [age, setAge] = useState<{ y: number; m: number; d: number; totalDays: number } | null>(null);

  const calculate = () => {
    if (!dob) return;
    const birthDate = new Date(dob);
    const today = new Date();

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) { months--; days += new Date(today.getFullYear(), today.getMonth(), 0).getDate(); }
    if (months < 0) { years--; months += 12; }

    const totalDays = Math.floor((today.getTime() - birthDate.getTime()) / (1000 * 60 * 60 * 24));
    setAge({ y: years, m: months, d: days, totalDays });
  };

  return (
    <Layout>
      <SeoHead title="Age Calculator - Calculate Exact Age | ToolsHub" description="Calculate your exact age in years, months, days, and total days. Free online age calculator." />
      <div className="max-w-xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center flex items-center justify-center gap-3"><Calculator className="text-lime-500" /> Age Calculator</h1>
        <Card className="p-8 shadow-xl">
          <div className="mb-6">
            <Label>Date of Birth</Label>
            <Input type="date" value={dob} onChange={(e) => setDob(e.target.value)} className="mt-2" max={new Date().toISOString().split("T")[0]} />
          </div>
          <Button onClick={calculate} className="w-full bg-lime-600 hover:bg-lime-700 h-12" size="lg">Calculate Exact Age</Button>

          {age && (
            <div className="mt-8 space-y-4 animate-in fade-in">
              <div className="grid grid-cols-3 gap-3 text-center">
                {[{ val: age.y, label: "Years" }, { val: age.m, label: "Months" }, { val: age.d, label: "Days" }].map(({ val, label }) => (
                  <div key={label} className="p-4 bg-muted rounded-xl">
                    <p className="text-3xl font-bold">{val}</p>
                    <p className="text-sm text-muted-foreground">{label}</p>
                  </div>
                ))}
              </div>
              <div className="p-4 bg-lime-50 dark:bg-lime-950/30 rounded-xl text-center">
                <p className="text-sm text-muted-foreground">Total days lived</p>
                <p className="text-2xl font-bold text-lime-600">{age.totalDays.toLocaleString()}</p>
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
      <SeoHead title="Free Plagiarism Checker Online | ToolsHub" description="Check text for plagiarism instantly. Find duplicate content and get uniqueness score." />
      <div className="max-w-5xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">Plagiarism Checker</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="p-6">
            <Label className="mb-2 block">Paste your text below</Label>
            <Textarea value={text} onChange={(e) => setText(e.target.value)} className="min-h-[300px] mb-4" placeholder="Paste text to check (minimum 100 characters)..." />
            <p className="text-xs text-muted-foreground mb-3">{text.length} characters</p>
            <Button onClick={() => mutate({ data: { text } })} disabled={text.length < 20} isLoading={isPending} className="w-full">
              Check for Plagiarism
            </Button>
          </Card>
          <Card className="p-6 bg-slate-50 dark:bg-slate-900">
            {data ? (
              <div className="space-y-6">
                <h3 className="text-xl font-bold">{data.verdict}</h3>
                <div className="flex gap-4">
                  <div className="flex-1 p-4 bg-white dark:bg-black rounded-xl text-center border border-border">
                    <p className="text-rose-500 font-bold text-3xl">{data.score}%</p>
                    <p className="text-sm text-muted-foreground">Plagiarized</p>
                  </div>
                  <div className="flex-1 p-4 bg-white dark:bg-black rounded-xl text-center border border-border">
                    <p className="text-emerald-500 font-bold text-3xl">{data.uniqueScore}%</p>
                    <p className="text-sm text-muted-foreground">Unique</p>
                  </div>
                </div>
                {data.matches.length > 0 && (
                  <div>
                    <p className="font-medium mb-2 text-sm">Matched Phrases:</p>
                    {data.matches.map((m, i) => (
                      <div key={i} className="p-2 bg-rose-50 dark:bg-rose-950/20 rounded-lg text-sm mb-2">
                        <span className="font-mono text-xs">"{m.text}"</span>
                        <span className="ml-2 text-rose-500 font-medium">{m.similarity}%</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-muted-foreground text-sm text-center">
                <div>
                  <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mx-auto mb-3">
                    <span className="text-2xl">📋</span>
                  </div>
                  Results will appear here
                </div>
              </div>
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
      <SeoHead title="Article Rewriter & Plagiarism Remover | ToolsHub" description="Rewrite and paraphrase text to pass plagiarism checks. Free online article rewriter tool." />
      <div className="max-w-5xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center">Article Rewriter</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6">
            <Label>Original Text</Label>
            <Textarea value={text} onChange={(e) => setText(e.target.value)} className="min-h-[300px] my-4" placeholder="Paste your text to rewrite..." />
            <p className="text-xs text-muted-foreground mb-3">{text.split(/\s+/).filter(Boolean).length} words</p>
            <Button onClick={() => mutate({ data: { text } })} disabled={text.length < 10} isLoading={isPending} className="w-full">
              Rewrite / Paraphrase
            </Button>
          </Card>
          <Card className="p-6 bg-indigo-50/50 dark:bg-indigo-950/20">
            <div className="flex items-center justify-between mb-0">
              <Label>Rewritten Text</Label>
              {data?.result && <button onClick={() => copyToClipboard(data.result)} className="text-xs text-primary hover:underline">Copy</button>}
            </div>
            <Textarea readOnly value={data?.result || ""} className="min-h-[300px] my-4 bg-transparent" placeholder="Rewritten result will appear here..." />
            <Button variant="secondary" onClick={() => copyToClipboard(data?.result || "")} className="w-full" disabled={!data?.result}>
              Copy Result
            </Button>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
