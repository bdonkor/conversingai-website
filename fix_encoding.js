const fs = require('fs');
const path = require('path');

const replacements = {
  'â€”': '&mdash;',
  'â€“': '&ndash;',
  'â†’': '&rarr;',
  'â–¼': '&#9660;',
  'âœ“': '&#10003;',
  'â ±ï¸ ': '&#9201;', // Clock
  'â °': '&#9200;',    // Alarm Clock
  'ðŸŽ¨': '🎨',
  'ðŸ“ˆ': '📈',
  'ðŸ †': '🏆',
  'ðŸ› ï¸ ': '🛠️',
  'ðŸ“ž': '📞',
  'ðŸ’µ': '💰',
  'ðŸ˜Š': '😊',
  'ðŸ”—': '🔗',
  'ðŸŽ¯': '🎯',
  'ðŸ’°': '💰',
  'ðŸš€': '🚀',
  'ðŸ’💡': '💡',
  'ðŸ’¡': '💡'
};

const dir = 'c:/Users/Benjamin/Desktop/ConversingAI-Website';
const files = fs.readdirSync(dir);

files.forEach(file => {
  if (file.endsWith('.html')) {
    const filePath = path.join(dir, file);
    try {
      let content = fs.readFileSync(filePath, 'utf8');
      let fixed = false;

      for (const [search, replace] of Object.entries(replacements)) {
        if (content.includes(search)) {
          content = content.split(search).join(replace);
          fixed = true;
        }
      }

      if (fixed) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`  Fixed ${file}`);
      }
    } catch (e) {
      console.log(`  Error on ${file}: ${e.message}`);
    }
  }
});

console.log('Finished!');
