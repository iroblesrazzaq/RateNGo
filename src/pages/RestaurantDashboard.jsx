import React from 'react';
import { Link } from 'wasp/client/router';
import { useQuery } from 'wasp/client/operations';
import { getRestaurant, getReviews, getQRCode } from 'wasp/client/operations';

const RestaurantDashboardPage = () => {
  const { data: restaurant, isLoading: restaurantLoading, error: restaurantError } = useQuery(getRestaurant, { id: 'restaurantId' });
  const { data: reviews, isLoading: reviewsLoading, error: reviewsError } = useQuery(getReviews, { restaurantId: 'restaurantId' });
  const { data: qrCode, isLoading: qrCodeLoading, error: qrCodeError } = useQuery(getQRCode, { restaurantId: 'restaurantId' });

  if (restaurantLoading || reviewsLoading || qrCodeLoading) return 'Loading...';
  if (restaurantError || reviewsError || qrCodeError) return 'Error: ' + (restaurantError || reviewsError || qrCodeError);

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>{restaurant.name} Dashboard</h1>
      <div className='mb-4'>
        <h2 className='text-lg font-bold'>Reviews</h2>
        {reviews.map((review) => (
          <div key={review.id} className='bg-gray-100 p-4 mb-4 rounded-lg'>
            <p>Rating: {review.ratings}</p>
            <p>Comments: {review.comments}</p>
          </div>
        ))}
      </div>
      <div className='mb-4'>
        <h2 className='text-lg font-bold'>QR Code</h2>
        <p>Code: {qrCode.code}</p>
        <p>Expiration Date: {qrCode.expirationDate}</p>
      </div>
    </div>
  );
}

export default RestaurantDashboardPage;