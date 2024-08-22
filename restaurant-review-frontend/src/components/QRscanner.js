import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';
import api from '../utils/api';

function QRScanner() {
  const [qrCode, setQrCode] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const webcamRef = useRef(null);

  const handleScan = async (data) => {
    if (data) {
      try {
        const response = await api.post('/qr/scan', { qrData: data });
        const { restaurantId } = response.data;
        navigate(`/restaurant/${restaurantId}`);
      } catch (error) {
        setError('Error processing QR code. Please try again.');
        console.error(error);
      }
    }
  };

  const captureQR = async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    try {
      const response = await api.post('/qr/process', { image: imageSrc });
      const { qrData } = response.data;
      setQrCode(qrData);
      handleScan(qrData);
    } catch (error) {
      setError('Error processing image. Please try again.');
      console.error(error);
    }
  };

  return (
    <div className="qr-scanner max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Scan Restaurant QR Code</h2>
      <div className="mb-4">
        <Webcam
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          className="w-full"
        />
      </div>
      <button 
        onClick={captureQR}
        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Capture QR Code
      </button>
      {qrCode && <p className="mt-4">QR Code scanned: {qrCode}</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}
    </div>
  );
}

export default QRScanner;