import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { QrReader } from 'react-qr-reader';

function QRScanner() {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleScan = (result) => {
    if (result) {
      const restaurantId = result?.text.split('/').pop();
      navigate(`/restaurant/${restaurantId}`);
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
        onResult={handleScan}
        onError={handleError}
        style={{ width: '100%', maxWidth: '300px', margin: '0 auto' }}
      />
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default QRScanner;