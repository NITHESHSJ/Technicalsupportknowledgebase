require('dotenv').config();
const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI;
console.log('--- Environment Check ---');
console.log('URI exists:', !!uri);
if (uri) {
  // Check for hidden characters or incorrect splitting
  const parts = uri.split('@');
  console.log('Number of @ symbols:', parts.length - 1);
  if (parts.length > 1) {
    const hostPart = parts[1].split('/')[0];
    console.log('Detected Hostname:', hostPart);
  }
}

console.log('\n--- Connecting ---');
mongoose.connect(uri)
  .then(() => console.log('✅ Connected successfully!'))
  .catch(err => {
    console.error('❌ Connection failed.');
    console.error('Error:', err.message);
    if (err.message.includes('ENOTFOUND')) {
      console.log('\nDNS ERROR DETECTED:');
      console.log('It seems your system cannot find the MongoDB Atlas cluster.');
      console.log('Try using the "Standard Connection String" (mongodb://...) if SRV (mongodb+srv://) is failing on your network.');
    }
  });
