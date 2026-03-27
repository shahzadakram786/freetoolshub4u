import { Router, type IRouter } from "express";

const router: IRouter = Router();

const STATIC_PAGES = [
  { path: "/", priority: "1.0", changefreq: "daily" },
  { path: "/weather", priority: "0.9", changefreq: "hourly" },
  { path: "/currency-converter", priority: "0.9", changefreq: "hourly" },
  { path: "/bg-remover", priority: "0.9", changefreq: "weekly" },
  { path: "/object-eraser", priority: "0.9", changefreq: "weekly" },
  { path: "/ai-detector", priority: "0.8", changefreq: "weekly" },
  { path: "/plagiarism-checker", priority: "0.8", changefreq: "weekly" },
  { path: "/plagiarism-remover", priority: "0.8", changefreq: "weekly" },
  { path: "/youtube-thumbnail-downloader", priority: "0.8", changefreq: "weekly" },
  { path: "/instagram-video-downloader", priority: "0.8", changefreq: "weekly" },
  { path: "/facebook-video-downloader", priority: "0.8", changefreq: "weekly" },
  { path: "/image-to-text", priority: "0.8", changefreq: "weekly" },
  { path: "/word-counter", priority: "0.7", changefreq: "weekly" },
  { path: "/password-generator", priority: "0.7", changefreq: "weekly" },
  { path: "/qr-code-generator", priority: "0.7", changefreq: "weekly" },
  { path: "/bmi-calculator", priority: "0.7", changefreq: "weekly" },
  { path: "/age-calculator", priority: "0.7", changefreq: "weekly" },
  { path: "/url-shortener", priority: "0.7", changefreq: "weekly" },
  { path: "/base64", priority: "0.6", changefreq: "monthly" },
  { path: "/json-formatter", priority: "0.6", changefreq: "monthly" },
  { path: "/case-converter", priority: "0.6", changefreq: "monthly" },
  { path: "/blog", priority: "0.9", changefreq: "daily" },
  { path: "/about", priority: "0.5", changefreq: "monthly" },
  { path: "/privacy-policy", priority: "0.4", changefreq: "yearly" },
  { path: "/terms-of-service", priority: "0.4", changefreq: "yearly" },
  { path: "/contact", priority: "0.5", changefreq: "monthly" },
];

const BLOG_SLUGS = [
  "how-to-remove-background-from-image-free",
  "best-free-currency-converter-2026",
  "how-to-check-ai-generated-content",
  "free-plagiarism-checker-vs-paid-tools",
  "how-to-calculate-bmi-correctly",
  "how-to-download-youtube-thumbnails",
];

router.get("/sitemap.xml", (req, res) => {
  const baseUrl = process.env.SITE_URL || `https://${req.hostname}`;
  const today = new Date().toISOString().split("T")[0];

  const urls = [
    ...STATIC_PAGES.map(
      (p) => `  <url>
    <loc>${baseUrl}${p.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`
    ),
    ...BLOG_SLUGS.map(
      (slug) => `  <url>
    <loc>${baseUrl}/blog/${slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`
    ),
  ];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${urls.join("\n")}
</urlset>`;

  res.setHeader("Content-Type", "application/xml");
  res.send(xml);
});

export default router;
