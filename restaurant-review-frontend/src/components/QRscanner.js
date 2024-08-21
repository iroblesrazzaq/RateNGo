// src/components/QRScanner.js
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import QrReader from 'react-qr-reader';

function QRScanner() {
  const [error, setError] = useState('');
  const history = useHistory();

  const handleScan = (data) => {
    if (data) {
      const restaurantId = data.split('/').pop();
      history.push(`/restaurant/${restaurantId}`);
    }
  };

  const handleError = (err) => {
    setError('Error scanning QR code. Please try again.');
    console.error(err);
  };

  return (
    <div className="qr-scanner">
      <h2>Scan Restaurant QR Code</h2>
      <QrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: '100%', maxWidth: '300px', margin: '0 auto' }}
      />
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default QRScanner;