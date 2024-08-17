import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useAction, getRestaurant, getQRCode, generateQRCode } from 'wasp/client/operations';
import { Link } from 'wasp/client/router';

const QRCodeGeneratorPage = () => {
  const { restaurantId } = useParams();
  const [qrCode, setQRCode] = useState(null);
  const { data: restaurant, isLoading: restaurantLoading, error: restaurantError } = useQuery(getRestaurant, { id: restaurantId });
  const { data: existingQRCode, isLoading: qrCodeLoading, error: qrCodeError } = useQuery(getQRCode, { restaurantId: restaurantId });
  const generateQRCodeFn = useAction(generateQRCode);

  useEffect(() => {
    if (restaurant && !existingQRCode) {
      generateQRCodeFn({ restaurantId }).then((newQRCode) => {
        setQRCode(newQRCode.code);
      });
    } else if (existingQRCode) {
      setQRCode(existingQRCode.code);
    }
  }, [restaurant, existingQRCode]);

  if (restaurantLoading || qrCodeLoading) return 'Loading...';
  if (restaurantError || qrCodeError) return 'Error: ' + (restaurantError || qrCodeError);

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>QR Code for {restaurant.name}</h1>
      {qrCode ? (
        <img src={`https://api.qrserver.com/v1/create-qr-code/?data=${qrCode}`} alt='QR Code' />
      ) : (
        <p>No QR Code generated yet.</p>
      )}
      <Link to={`/review/${restaurantId}`} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 block'>Go to Review Page</Link>
    </div>
  );
}

export default QRCodeGeneratorPage;