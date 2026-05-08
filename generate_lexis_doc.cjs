const fs = require('fs');

const md = fs.readFileSync('Lexis_System_Prompt.md', 'utf8');

// Escape RTF special chars and convert non-ASCII to RTF unicode escapes
function rtfEscape(s) {
  let out = s
    .replace(/\\/g, '\\\\')
    .replace(/\{/g, '\\{')
    .replace(/\}/g, '\\}');
  // Replace non-ASCII chars with \uN? escapes
  return out.replace(/[-￿]/g, ch => `\\u${ch.charCodeAt(0)}?`);
}

// Convert simple markdown inline (bold) to RTF
function inlineMd(line) {
  // **bold** -> \b ... \b0
  return rtfEscape(line).replace(/\*\*([^*]+)\*\*/g, '\\b $1\\b0 ');
}

const lines = md.split('\n');
let rtf = '{\\rtf1\\ansi\\ansicpg1252\\deff0\\nouicompat\\deflang1033{\\fonttbl{\\f0\\fnil\\fcharset0 Calibri;}{\\f1\\fmodern Consolas;}}{\\colortbl;\\red0\\green0\\blue0;\\red80\\green80\\blue80;}\\fs22\n';

for (const raw of lines) {
  const line = raw.replace(/\r$/, '');
  if (line.startsWith('# ')) {
    rtf += '\\fs36\\b ' + inlineMd(line.slice(2)) + '\\b0\\fs22\\par\n\\par\n';
  } else if (line.startsWith('## ')) {
    rtf += '\\fs30\\b ' + inlineMd(line.slice(3)) + '\\b0\\fs22\\par\n';
  } else if (line.startsWith('### ')) {
    rtf += '\\fs26\\b ' + inlineMd(line.slice(4)) + '\\b0\\fs22\\par\n';
  } else if (/^---+$/.test(line.trim())) {
    rtf += '\\par\n';
  } else if (line.startsWith('- ')) {
    rtf += '\\bullet  ' + inlineMd(line.slice(2)) + '\\par\n';
  } else if (/^\d+\.\s/.test(line)) {
    rtf += inlineMd(line) + '\\par\n';
  } else if (line.startsWith('| ')) {
    rtf += '\\f1\\fs20 ' + inlineMd(line) + '\\f0\\fs22\\par\n';
  } else if (line === '') {
    rtf += '\\par\n';
  } else {
    rtf += inlineMd(line) + '\\par\n';
  }
}

rtf += '}\n';
fs.writeFileSync('Lexis_System_Prompt.rtf', rtf);
console.log('Created Lexis_System_Prompt.rtf (' + Math.round(rtf.length / 1024) + ' KB)');
