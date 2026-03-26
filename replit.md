# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Structure

```text
artifacts-monorepo/
├── artifacts/              # Deployable applications
│   ├── api-server/         # Express API server
│   └── toolshub/           # ToolsHub React + Vite frontend (main app at /)
├── lib/                    # Shared libraries
│   ├── api-spec/           # OpenAPI spec + Orval codegen config
│   ├── api-client-react/   # Generated React Query hooks
│   ├── api-zod/            # Generated Zod schemas from OpenAPI
│   └── db/                 # Drizzle ORM schema + DB connection
├── scripts/                # Utility scripts (single workspace package)
│   └── src/                # Individual .ts scripts
├── pnpm-workspace.yaml     # pnpm workspace
├── tsconfig.base.json      # Shared TS options
├── tsconfig.json           # Root TS project references
└── package.json            # Root package with hoisted devDeps
```

## Main App: ToolsHub (artifacts/toolshub)

A free online multi-tools website with 18+ tools, fully SEO-optimized, responsive, with ad placeholders.

### Tools Included
- Weather Report (`/weather`)
- Currency Converter (`/currency-converter`) — 60+ currencies with full country names like "Pakistan (PKR)"
- Instagram Video Downloader (`/instagram-video-downloader`)
- Facebook Video Downloader (`/facebook-video-downloader`)
- YouTube Thumbnail Downloader (`/youtube-thumbnail-downloader`)
- AI Content Detector / ZeroGPT (`/ai-detector`)
- Plagiarism Checker (`/plagiarism-checker`)
- Plagiarism Remover / Paraphraser (`/plagiarism-remover`)
- Word Counter (`/word-counter`)
- Password Generator (`/password-generator`)
- QR Code Generator (`/qr-code-generator`)
- Image to Text OCR (`/image-to-text`)
- Age Calculator (`/age-calculator`)
- BMI Calculator (`/bmi-calculator`)
- URL Shortener (`/url-shortener`)
- Base64 Encoder/Decoder (`/base64`)
- JSON Formatter (`/json-formatter`)
- Case Converter (`/case-converter`)

### Frontend
- React + Vite
- Tailwind CSS (v4)
- wouter (routing)
- qrcode.react (QR generation)
- tesseract.js (OCR)
- framer-motion (animations)

### SEO
- Each page has unique title, meta description, Open Graph tags
- Semantic HTML (h1, h2, article, nav, main, footer)
- Ad placeholder divs (`.ad-banner`) ready for Google AdSense

### API Routes (artifacts/api-server)
- `GET /api/weather?city=` — Weather data (uses OpenWeatherMap API if OPENWEATHER_API_KEY set, else fallback)
- `GET /api/currency/rates?base=` — Currency rates (uses ExchangeRate API if EXCHANGE_RATE_API_KEY set, else fallback)
- `POST /api/tools/shorten-url` — URL shortener
- `POST /api/tools/paraphrase` — Text paraphraser
- `POST /api/tools/check-ai` — AI content detector
- `POST /api/tools/check-plagiarism` — Plagiarism checker

### Optional API Keys (for live data)
- `OPENWEATHER_API_KEY` — OpenWeatherMap (free tier at openweathermap.org)
- `EXCHANGE_RATE_API_KEY` — ExchangeRate-API (free tier at exchangerate-api.com)

## TypeScript & Composite Projects

Every package extends `tsconfig.base.json` which sets `composite: true`. The root `tsconfig.json` lists all packages as project references.

## Root Scripts

- `pnpm run build` — runs `typecheck` first, then recursively runs `build` in all packages that define it
- `pnpm run typecheck` — runs `tsc --build --emitDeclarationOnly` using project references

## Packages

### `artifacts/api-server` (`@workspace/api-server`)
Express 5 API server. Routes in `src/routes/`.
- `pnpm --filter @workspace/api-server run dev` — run the dev server

### `artifacts/toolshub` (`@workspace/toolshub`)
React + Vite frontend. Preview at `/`.
- `pnpm --filter @workspace/toolshub run dev` — run the dev server

### `lib/db` (`@workspace/db`)
Database layer using Drizzle ORM with PostgreSQL.
- `pnpm --filter @workspace/db run push` — push schema to database

### `lib/api-spec` (`@workspace/api-spec`)
OpenAPI spec + Orval codegen.
- `pnpm --filter @workspace/api-spec run codegen` — generate types/hooks
