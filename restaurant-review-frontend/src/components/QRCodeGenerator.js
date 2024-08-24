import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode.react';
import api from '../utils/api';

function QRCodeGenerator() {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState('');
  const [qrValue, setQrValue] = useState('');

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await api.get('/restaurants/owner');
        setRestaurants(response.data);
      } catch (error) {
        console.error('Error fetching restaurants:', error);
      }
    };
    fetchRestaurants();
  }, []);

  const handleRestaurantChange = (e) => {
    const restaurantId = e.target.value;
    setSelectedRestaurant(restaurantId);
    setQrValue(`${window.location.origin}/review/${restaurantId}`);
  };

  const handleDownload = () => {
    const canvas = document.getElementById('qr-code');
    const pngUrl = canvas
      .toDataURL('image/png')
      .replace('image/png', 'image/octet-stream');
    let downloadLink = document.createElement('a');
    downloadLink.href = pngUrl;
    downloadLink.download = `qr-code-${selectedRestaurant}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div className="qr-code-generator p-6">
      <h1 className="text-3xl font-bold mb-6">QR Code Generator</h1>
      <div className="mb-4">
        <label htmlFor="restaurant-select" className="block mb-2">Select a Restaurant:</label>
        <select
          id="restaurant-select"
          value={selectedRestaurant}
          onChange={handleRestaurantChange}
          className="w-full p-2 border rounded"
        >
          <option value="">Select a restaurant</option>
          {restaurants.map((restaurant) => (
            <option key={restaurant._id} value={restaurant._id}>
              {restaurant.name}
            </option>
          ))}
        </select>
      </div>
      {qrValue && (
        <div className="mt-6">
          <QRCode id="qr-code" value={qrValue} size={256} level="H" />
          <button
            onClick={handleDownload}
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Download QR Code
          </button>
        </div>
      )}
    </div>
  );
}

export default QRCodeGenerator;