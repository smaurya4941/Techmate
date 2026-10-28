const fs = require('fs');

const html = fs.readFileSync('d:/Techmate/docs/bizznep-stitch-screen.html', 'utf8');

// Find headings, sections, classes, and main visual structures
const lines = html.split('\n');
console.log('Total HTML lines:', lines.length);

// Extract all headings
const headings = [...html.matchAll(/<(h[1-6])[^>]*>([\s\S]*?)<\/\1>/gi)].map(m => ({
  tag: m[1],
  text: m[2].replace(/<[^>]+>/g, '').trim().replace(/\s+/g, ' ')
}));

console.log('\n--- Headings in Bizznep Stitch Screen ---');
headings.forEach(h => console.log(`${h.tag}: ${h.text}`));

// Look for comments or section markers
const comments = [...html.matchAll(/<!--\s*([\s\S]*?)\s*-->/g)].map(m => m[1].trim());
console.log('\n--- All Comments / Section Markers ---');
comments.forEach(c => {
  if (c.startsWith('BEGIN:') || c.startsWith('END:')) {
    console.log(c);
  }
});

// Extract CSS or color definitions if any
const styleTag = html.match(/<style[^>]*>([\s\S]*?)<\/style>/i);
if (styleTag) {
  console.log('\n--- Custom Styles snippet ---');
  console.log(styleTag[1].slice(0, 500));
}
