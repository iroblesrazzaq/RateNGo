import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import { useHistory } from 'react-router-dom';
import QRCode from 'qrcode.react';

function QRScanner() {
  const [result, setResult] = useState('No result');
  const [restaurantId, setRestaurantId] = useState('');
  const [generatedQR, setGeneratedQR] = useState('');
  const history = useHistory();

  const handleScan = (data) => {
    if (data) {
      setResult(data);
      // Assume the QR code contains the restaurant ID
      history.push(`/review/${data}`);
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  const generateQR = () => {
    if (restaurantId) {
      setGeneratedQR(restaurantId);
    }
  };

  return (
    <div>
      <h2>Scan Restaurant QR Code</h2>
      <QrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: '100%' }}
      />
      <p>{result}</p>

      <h2>Generate QR Code for Restaurant</h2>
      <input 
        type="text" 
        value={restaurantId} 
        onChange={(e) => setRestaurantId(e.target.value)}
        placeholder="Enter Restaurant ID"
      />
      <button onClick={generateQR}>Generate QR Code</button>
      {generatedQR && (
        <div>
          <h3>Generated QR Code:</h3>
          <QRCode value={generatedQR} />
        </div>
      )}
    </div>
  );
}

export default QRScanner;