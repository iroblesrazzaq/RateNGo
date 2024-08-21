// utils/qrCodeGenerator.js
const qr = require('qrcode');

async function generateQRCode(data) {
  try {
    return await qr.toDataURL(data);
  } catch (err) {
    console.error('Error generating QR code:', err);
    throw err;
  }
}

module.exports = generateQRCode;