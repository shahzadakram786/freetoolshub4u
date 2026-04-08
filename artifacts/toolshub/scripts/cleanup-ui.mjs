import fs from 'fs';
import path from 'path';

const SRC_VIEWS = './src/views';

function processDirectory(dirPath) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    
    if (entry.isDirectory()) {
      processDirectory(fullPath);
    } else if (entry.name.endsWith('.tsx')) {
      processFile(fullPath);
    }
  }
}

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;

  // 1. Remove Ad Placeholders
  const adRegex = /\[\s*Ad Placeholder(?:[\s—]*Google AdSense)?\s*\]/gi;
  if (adRegex.test(content)) {
    content = content.replace(adRegex, '');
    changed = true;
  }

  // 2. Add loading="lazy" to <img> tags instead of forced aspect ratio next/image
  if (content.includes('<img ')) {
    content = content.replace(/<img\s([^>]+)\/?>/gi, (match, attrs) => {
      let newAttrs = attrs;
      if (!newAttrs.includes('loading=')) newAttrs += ' loading="lazy"';
      if (!newAttrs.includes('decoding=')) newAttrs += ' decoding="async"';
      return `<img ${newAttrs.trim()} />`;
    });
    changed = true;
  }

  if (changed) {
    fs.writeFileSync(filePath, content);
    console.log(`Updated ${filePath}`);
  }
}

processDirectory(SRC_VIEWS);
