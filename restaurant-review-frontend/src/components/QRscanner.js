import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';

const QRScanner = () => {
  const [qrCode, setQrCode] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const webcamRef = useRef(null);

  const captureQR = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    // Simulating QR code detection
    setQrCode('Sample QR Code');
    navigate('/review/123');
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Scan Restaurant QR Code</h2>
      <div className="mb-4">
        <Webcam
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          className="w-full rounded"
        />
      </div>
      <button 
        onClick={captureQR}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
      >
        Capture QR Code
      </button>
      {qrCode && <p className="mt-4 text-center text-green-600">QR Code scanned: {qrCode}</p>}
      {error && <p className="mt-4 text-center text-red-500">{error}</p>}
    </div>
  );
};

export default QRScanner;