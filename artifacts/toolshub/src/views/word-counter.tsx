"use client";

import { useState } from "react";
import { Layout } from "@/components/layout";
import { SeoHead } from "@/components/seo-head";
import { Card, Textarea, Button } from "@/components/ui";
import { Hash, Copy, Trash2 } from "lucide-react";
import { copyToClipboard } from "@/lib/utils";

export function WordCounter() {
  const [text, setText] = useState("");

  const stats = {
    chars: text.length,
    words: text.trim() ? text.trim().split(/\s+/).length : 0,
    sentences: text.trim() ? text.split(/[.!?]+/).filter(Boolean).length : 0,
    paragraphs: text.trim() ? text.split(/\n+/).filter(Boolean).length : 0,
    readingTime: Math.ceil((text.trim() ? text.trim().split(/\s+/).length : 0) / 200) || 0
  };

  return (
    <Layout>
      <SeoHead title="Word & Character Counter" description="Free online word counter, character counter, and reading time estimator." />
      
      <div className="w-full max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-4 bg-slate-500/10 rounded-2xl mb-6">
            <Hash className="w-10 h-10 text-slate-500" />
          </div>
          <h1 className="text-4xl font-bold mb-4">Word Counter</h1>
          <p className="text-muted-foreground">Count words, characters, sentences, and paragraphs in real-time.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <Card className="p-4 text-center border-t-4 border-t-blue-500">
            <p className="text-sm text-muted-foreground font-medium">Words</p>
            <p className="text-3xl font-bold">{stats.words}</p>
          </Card>
          <Card className="p-4 text-center border-t-4 border-t-emerald-500">
            <p className="text-sm text-muted-foreground font-medium">Characters</p>
            <p className="text-3xl font-bold">{stats.chars}</p>
          </Card>
          <Card className="p-4 text-center border-t-4 border-t-amber-500">
            <p className="text-sm text-muted-foreground font-medium">Sentences</p>
            <p className="text-3xl font-bold">{stats.sentences}</p>
          </Card>
          <Card className="p-4 text-center border-t-4 border-t-purple-500">
            <p className="text-sm text-muted-foreground font-medium">Paragraphs</p>
            <p className="text-3xl font-bold">{stats.paragraphs}</p>
          </Card>
          <Card className="p-4 text-center border-t-4 border-t-rose-500 col-span-2 md:col-span-1">
            <p className="text-sm text-muted-foreground font-medium">Reading Time</p>
            <p className="text-3xl font-bold">{stats.readingTime} <span className="text-sm font-normal">min</span></p>
          </Card>
        </div>

        <Card className="overflow-hidden border-slate-500/20 shadow-xl">
          <div className="flex justify-between items-center bg-muted/50 px-4 py-3 border-b border-border">
            <h3 className="font-semibold text-sm">Your Text</h3>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => copyToClipboard(text)}>
                <Copy className="w-4 h-4 mr-2" /> Copy
              </Button>
              <Button size="sm" variant="ghost" className="text-destructive hover:bg-destructive/10" onClick={() => setText("")}>
                <Trash2 className="w-4 h-4 mr-2" /> Clear
              </Button>
            </div>
          </div>
          <Textarea 
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="min-h-[400px] border-0 rounded-none focus-visible:ring-0 focus-visible:ring-offset-0 text-base leading-relaxed"
            placeholder="Start typing or paste your text here..."
            autoFocus
          />
        </Card>
      </div>
    </Layout>
  );
}
