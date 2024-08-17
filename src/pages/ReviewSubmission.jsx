import React, { useState } from 'react';
import { useQuery, useAction, getRestaurant, createReview } from 'wasp/client/operations';
import { Link } from 'wasp/client/router';

const ReviewSubmissionPage = () => {
  const [ratings, setRatings] = useState(0);
  const [comments, setComments] = useState('');
  const { data: restaurant, isLoading, error } = useQuery(getRestaurant, { id: 'restaurantId' });
  const createReviewFn = useAction(createReview);

  const handleReviewSubmit = () => {
    if (ratings < 1 || ratings > 5) {
      alert('Please select a rating between 1 and 5.');
      return;
    }
    if (comments.trim() === '') {
      alert('Please enter your comments.');
      return;
    }
    createReviewFn({
      restaurantId: restaurant.id,
      ratings: ratings,
      comments: comments
    });
  };

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>Submit a Review for {restaurant.name}</h1>
      <div className='flex flex-col gap-y-4'>
        <label className='font-bold'>Food Quality</label>
        <input type='number' min='1' max='5' value={ratings} onChange={(e) => setRatings(parseInt(e.target.value))} className='border p-2 rounded' />
        <label className='font-bold'>Service</label>
        <input type='number' min='1' max='5' value={ratings} onChange={(e) => setRatings(parseInt(e.target.value))} className='border p-2 rounded' />
        <label className='font-bold'>Atmosphere</label>
        <input type='number' min='1' max='5' value={ratings} onChange={(e) => setRatings(parseInt(e.target.value))} className='border p-2 rounded' />
        <label className='font-bold'>Comments</label>
        <textarea value={comments} onChange={(e) => setComments(e.target.value)} className='border p-2 rounded'></textarea>
        <button onClick={handleReviewSubmit} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Submit Review</button>
      </div>
    </div>
  );
};

export default ReviewSubmissionPage;