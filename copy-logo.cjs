const fs = require('fs');
const path = require('path');

const src = "C:\\Users\\Hari Prasath\\.gemini\\antigravity\\brain\\bb28a02b-661f-4d37-bc69-b07b71c2c84c\\media__1777628031832.jpg";
const dest = path.join(__dirname, 'src', 'assets', 'logo.jpg');

try {
  fs.copyFileSync(src, dest);
  console.log('Successfully copied logo to', dest);
} catch (err) {
  console.error('Error copying logo:', err);
  process.exit(1);
}
