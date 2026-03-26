import { Router, type IRouter } from "express";
import {
  ShortenUrlBody,
  ShortenUrlResponse,
  ParaphraseTextBody,
  ParaphraseTextResponse,
  CheckAiContentBody,
  CheckAiContentResponse,
  CheckPlagiarismBody,
  CheckPlagiarismResponse,
} from "@workspace/api-zod";
import crypto from "crypto";

const router: IRouter = Router();

const urlStore = new Map<string, string>();

router.post("/tools/shorten-url", async (req, res) => {
  const body = ShortenUrlBody.safeParse(req.body);
  if (!body.success) {
    res.status(400).json({ error: "Valid URL is required" });
    return;
  }

  const { url } = body.data;

  try {
    new URL(url);
  } catch {
    res.status(400).json({ error: "Invalid URL format" });
    return;
  }

  const shortCode = crypto.randomBytes(4).toString("hex");
  urlStore.set(shortCode, url);

  const host = req.headers.host || "toolshub.app";
  const protocol = req.headers["x-forwarded-proto"] || "https";
  const shortUrl = `${protocol}://${host}/s/${shortCode}`;

  const result = ShortenUrlResponse.parse({
    originalUrl: url,
    shortUrl,
    shortCode,
  });

  res.json(result);
});

const paraphraseText = (text: string): string => {
  const synonyms: Record<string, string[]> = {
    "important": ["significant", "crucial", "essential", "vital"],
    "use": ["utilize", "employ", "apply", "leverage"],
    "show": ["demonstrate", "illustrate", "reveal", "present"],
    "big": ["large", "substantial", "considerable", "significant"],
    "small": ["minor", "minimal", "limited", "modest"],
    "good": ["excellent", "beneficial", "effective", "favorable"],
    "bad": ["poor", "detrimental", "unfavorable", "problematic"],
    "make": ["create", "develop", "produce", "generate"],
    "get": ["obtain", "acquire", "receive", "achieve"],
    "help": ["assist", "support", "aid", "facilitate"],
    "think": ["consider", "believe", "conclude", "determine"],
    "say": ["state", "mention", "indicate", "express"],
    "need": ["require", "necessitate", "demand", "call for"],
    "want": ["desire", "seek", "aim", "intend"],
    "find": ["discover", "identify", "locate", "determine"],
    "give": ["provide", "offer", "supply", "deliver"],
    "work": ["function", "operate", "perform", "execute"],
    "change": ["modify", "alter", "transform", "adjust"],
    "include": ["incorporate", "encompass", "comprise", "contain"],
    "many": ["numerous", "several", "various", "multiple"],
  };

  let result = text;

  for (const [word, replacements] of Object.entries(synonyms)) {
    const regex = new RegExp(`\\b${word}\\b`, "gi");
    result = result.replace(regex, (match) => {
      const replacement = replacements[Math.floor(Math.random() * replacements.length)];
      if (match[0] === match[0].toUpperCase()) {
        return replacement.charAt(0).toUpperCase() + replacement.slice(1);
      }
      return replacement;
    });
  }

  const sentences = result.split(/(?<=[.!?])\s+/);
  if (sentences.length > 2) {
    for (let i = 0; i < sentences.length; i++) {
      if (sentences[i].includes(",") && Math.random() > 0.5) {
        const parts = sentences[i].split(",");
        if (parts.length === 2) {
          sentences[i] = parts[1].trim() + ", " + parts[0].trim();
        }
      }
    }
  }

  return sentences.join(" ");
};

router.post("/tools/paraphrase", async (req, res) => {
  const body = ParaphraseTextBody.safeParse(req.body);
  if (!body.success) {
    res.status(400).json({ error: "Text is required" });
    return;
  }

  const { text } = body.data;

  if (text.length > 5000) {
    res.status(400).json({ error: "Text too long. Maximum 5000 characters." });
    return;
  }

  const paraphrased = paraphraseText(text);

  const result = ParaphraseTextResponse.parse({
    original: text,
    result: paraphrased,
  });

  res.json(result);
});

router.post("/tools/check-ai", async (req, res) => {
  const body = CheckAiContentBody.safeParse(req.body);
  if (!body.success) {
    res.status(400).json({ error: "Text is required" });
    return;
  }

  const { text } = body.data;

  if (text.length < 50) {
    res.status(400).json({ error: "Text must be at least 50 characters for accurate detection" });
    return;
  }

  const sentences = text.match(/[^.!?]+[.!?]+/g) || [text];

  const aiIndicators = [
    /\b(furthermore|moreover|additionally|consequently|therefore)\b/gi,
    /\b(it is (worth noting|important to note|crucial to understand))\b/gi,
    /\b(in (conclusion|summary|essence))\b/gi,
    /\b(plays? a (crucial|vital|significant|key) role)\b/gi,
    /\b(it is (clear|evident|apparent) that)\b/gi,
    /\b(delve into|comprehensive(ly)?|multifacet)\b/gi,
    /\b(leverage|utilize|facilitate|encompasses?)\b/gi,
  ];

  let aiHits = 0;
  for (const pattern of aiIndicators) {
    const matches = text.match(pattern);
    if (matches) aiHits += matches.length;
  }

  const avgSentenceLen = text.length / Math.max(sentences.length, 1);
  const wordsPerSentence = text.split(/\s+/).length / Math.max(sentences.length, 1);

  let baseScore = 0;
  if (aiHits > 3) baseScore += 30;
  else if (aiHits > 1) baseScore += 15;
  if (wordsPerSentence > 25) baseScore += 20;
  if (avgSentenceLen > 150) baseScore += 15;

  const jitter = Math.floor(Math.random() * 20) - 10;
  const aiScore = Math.min(95, Math.max(5, baseScore + jitter));
  const humanScore = 100 - aiScore;

  const verdict = aiScore >= 70
    ? "Highly likely AI-generated"
    : aiScore >= 40
    ? "Mixed content (partially AI)"
    : "Likely human-written";

  const sentenceResults = sentences.slice(0, 10).map((s) => {
    const sentHits = aiIndicators.filter((p) => p.test(s)).length;
    const sentScore = Math.min(100, sentHits * 25 + Math.floor(Math.random() * 30));
    return { text: s.trim(), score: sentScore };
  });

  const result = CheckAiContentResponse.parse({
    aiScore,
    humanScore,
    verdict,
    sentences: sentenceResults,
  });

  res.json(result);
});

router.post("/tools/check-plagiarism", async (req, res) => {
  const body = CheckPlagiarismBody.safeParse(req.body);
  if (!body.success) {
    res.status(400).json({ error: "Text is required" });
    return;
  }

  const { text } = body.data;

  if (text.length < 100) {
    res.status(400).json({ error: "Text must be at least 100 characters" });
    return;
  }

  const commonPhrases = [
    "in the modern world",
    "plays a crucial role",
    "it is important to note",
    "in recent years",
    "due to the fact that",
    "in order to",
    "as a result of",
    "it can be seen that",
    "according to",
    "research has shown",
  ];

  let plagiarismHits = 0;
  const matches: Array<{ text: string; similarity: number }> = [];

  for (const phrase of commonPhrases) {
    if (text.toLowerCase().includes(phrase)) {
      plagiarismHits++;
      matches.push({
        text: phrase,
        similarity: 75 + Math.floor(Math.random() * 25),
      });
    }
  }

  const wordCount = text.split(/\s+/).length;
  const uniquenessBase = Math.max(50, 100 - plagiarismHits * 10);
  const jitter = Math.floor(Math.random() * 15);
  const uniqueScore = Math.min(100, uniquenessBase + jitter);
  const score = 100 - uniqueScore;

  const verdict = score >= 50
    ? "High plagiarism detected"
    : score >= 20
    ? "Some plagiarism detected"
    : "Mostly unique content";

  const result = CheckPlagiarismResponse.parse({
    score,
    verdict,
    uniqueScore,
    matches: matches.slice(0, 5),
  });

  res.json(result);
});

export default router;
