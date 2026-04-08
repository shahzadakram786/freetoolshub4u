import fs from 'fs';
import path from 'path';

const SRC_APP = './src/app';
const SRC_VIEWS = './src/views';

function processDirectory(dirPath) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    
    if (entry.isDirectory()) {
      processDirectory(fullPath);
    } else if (entry.name === 'page.tsx') {
      processPageFile(fullPath);
    }
  }
}

function processPageFile(pagePath) {
  let content = fs.readFileSync(pagePath, 'utf8');
  
  // Find the import statement to know which view is used
  const viewImportMatch = content.match(/import\s+\{\s*([a-zA-Z0-9_]+)\s*\}\s+from\s+"@\/views\/([^"]+)"/);
  
  if (!viewImportMatch) {
    return;
  }
  
  const componentName = viewImportMatch[1];
  const viewFileBase = viewImportMatch[2];
  
  let viewFilePath = path.join(SRC_VIEWS, `${viewFileBase}.tsx`);
  if (!fs.existsSync(viewFilePath)) {
    viewFilePath = path.join(SRC_VIEWS, viewFileBase, 'index.tsx');
  }
  if (!fs.existsSync(viewFilePath)) {
    console.log(`Could not find view file for ${viewFileBase}`);
    return;
  }
  
  let viewContent = fs.readFileSync(viewFilePath, 'utf8');
  
  // 1. Prepend "use client" to the view if not present
  if (!viewContent.includes('"use client"')) {
    viewContent = `"use client";\n\n` + viewContent;
    fs.writeFileSync(viewFilePath, viewContent);
  }
  
  // 2. Extract SeoHead
  let title = null;
  let description = null;
  
  const seoMatch = viewContent.match(/<SeoHead\s+([\s\S]*?)\/>/i);
  if (seoMatch) {
    const propsString = seoMatch[1];
    const titleMatch = propsString.match(/title=(["'])(.*?)\1/i);
    const descMatch = propsString.match(/description=(["'])(.*?)\1/i);
    
    if (titleMatch) title = titleMatch[2];
    if (descMatch) description = descMatch[2];
  }
  
  // 3. Remove "use client" from page.tsx (only at the top)
  content = content.replace(/"use client";\n*/g, '');
  
  // 4. Inject metadata if statically found
  if (title) {
    let metadataStr = `\nexport const metadata = {\n  title: ${JSON.stringify(title)},`;
    if (description) {
      metadataStr += `\n  description: ${JSON.stringify(description)},`;
    }
    metadataStr += `\n};\n`;
    
    // Check if metadata already exists
    if (!content.includes('export const metadata')) {
      content = content + metadataStr;
    }
  }
  
  fs.writeFileSync(pagePath, content);
  console.log(`Processed ${pagePath} -> extracted Title: "${title}"`);
}

processDirectory(SRC_APP);
