import fs from 'fs';
import path from 'path';

const files = [
  'artifacts/toolshub/src/components/seo-head.tsx',
  'artifacts/toolshub/src/views/legal.tsx',
  'artifacts/toolshub/public/robots.txt'
];

for (const file of files) {
  const filePath = path.join(process.cwd(), file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(/toolshub\.replit\.app/g, 'freetoolshub4u.com');
    fs.writeFileSync(filePath, content);
    console.log(`Updated ${file}`);
  }
}
