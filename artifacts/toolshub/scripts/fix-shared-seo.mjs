import fs from 'fs';
import path from 'path';

const patches = {
  'src/app/about/page.tsx': { title: 'About Us | ToolsHub', description: 'Learn about ToolsHub and our mission to provide free tools.' },
  'src/app/contact/page.tsx': { title: 'Contact Us | ToolsHub', description: 'Get in touch with ToolsHub.' },
  'src/app/terms-of-service/page.tsx': { title: 'Terms of Service | ToolsHub', description: 'Read our terms of service.' },
  'src/app/plagiarism-checker/page.tsx': { title: 'Free Plagiarism Checker Online | ToolsHub', description: 'Check text for plagiarism instantly. Find duplicate content and get uniqueness score.' },
  'src/app/plagiarism-remover/page.tsx': { title: 'Article Rewriter & Plagiarism Remover | ToolsHub', description: 'Rewrite and paraphrase text to pass plagiarism checks. Free online article rewriter tool.' },
  'src/app/base64/page.tsx': { title: 'Base64 Encode/Decode - Free Online Tool | ToolsHub', description: 'Free online Base64 encoder and decoder tool. Encode text and decode base64 strings instantly.' },
  'src/app/json-formatter/page.tsx': { title: 'JSON Formatter & Validator - Free Online Tool | ToolsHub', description: 'Beautify, format, and validate JSON online. Minify JSON for production use.' },
  'src/app/bmi-calculator/page.tsx': { title: 'BMI Calculator - Free Body Mass Index Checker | ToolsHub', description: 'Calculate your Body Mass Index (BMI) instantly for both men and women.' },
  'src/app/age-calculator/page.tsx': { title: 'Age Calculator - Calculate Exact Age | ToolsHub', description: 'Calculate your exact age in years, months, days, and total days. Free online age calculator.' },
  'src/app/instagram-video-downloader/page.tsx': { title: 'Instagram Video Downloader | ToolsHub', description: 'Download Instagram videos, reels, and stories for free.' },
  'src/app/facebook-video-downloader/page.tsx': { title: 'Facebook Video Downloader | ToolsHub', description: 'Download Facebook HD videos for free online.' }
};

for (const [file, meta] of Object.entries(patches)) {
  const filePath = path.join(process.cwd(), file);
  if (!fs.existsSync(filePath)) continue;
  
  let content = fs.readFileSync(filePath, 'utf8');
  content = content.replace(/export const metadata = \{[\s\S]*?\};\n/g, '');
  
  const metadataStr = `\nexport const metadata = {\n  title: ${JSON.stringify(meta.title)},\n  description: ${JSON.stringify(meta.description)},\n};\n`;
  content = content + metadataStr;
  
  fs.writeFileSync(filePath, content);
  console.log(`Patched ${filePath}`);
}

// Special case for dynamic blog post
const blogPostPath = path.join(process.cwd(), 'src/app/blog/[slug]/page.tsx');
if (fs.existsSync(blogPostPath)) {
  let content = fs.readFileSync(blogPostPath, 'utf8');
  content = content.replace(/export const metadata = \{[\s\S]*?\};\n/g, '');
  content = content + `\nexport async function generateMetadata({ params }: { params: Promise<{slug: string}> }) {\n  const resolved = await params;\n  const title = (resolved.slug.charAt(0).toUpperCase() + resolved.slug.slice(1).replace(/-/g, ' ')) + ' | ToolsHub Blog';\n  return {\n    title,\n    description: 'Read our latest insights on ' + title,\n  };\n}\n`;
  fs.writeFileSync(blogPostPath, content);
  console.log('Patched Dynamic Blog Post Metadata');
}
