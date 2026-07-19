const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else { 
      if (file.endsWith('.tsx') || file.endsWith('.ts')) results.push(file);
    }
  });
  return results;
}

const files = walk('./apps/web');
files.forEach(f => {
  let content = fs.readFileSync(f, 'utf8');
  const newContent = content.replace(/\$\{process\.env\.NEXT_PUBLIC_API_URL\}/g, "${(process.env.NEXT_PUBLIC_API_URL || '').replace(/\\/+$/, '').endsWith('/api') ? (process.env.NEXT_PUBLIC_API_URL || '').replace(/\\/+$/, '') : (process.env.NEXT_PUBLIC_API_URL || '').replace(/\\/+$/, '') + '/api'}");
  if (content !== newContent) {
    fs.writeFileSync(f, newContent);
    console.log('Updated ' + f);
  }
});
