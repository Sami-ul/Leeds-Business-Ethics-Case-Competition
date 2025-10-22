const QRCode = require('qrcode');
const fs = require('fs');
const path = require('path');

const url = 'https://leeds-business-ethics-case-competit.vercel.app/demo';
const outputPath = path.join(__dirname, 'public', 'qr-demo.png');

QRCode.toFile(outputPath, url, {
  errorCorrectionLevel: 'H',
  type: 'png',
  quality: 1,
  margin: 2,
  width: 400,
  color: {
    dark: '#000000',
    light: '#FFFFFF'
  }
}, function (err) {
  if (err) {
    console.error('Error generating QR code:', err);
  } else {
    console.log('✅ QR code generated successfully at:', outputPath);
  }
});
