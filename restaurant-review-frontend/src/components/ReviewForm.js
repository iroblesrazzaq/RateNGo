// src/components/ReviewForm.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';

const ReviewForm = () => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { restaurantId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/restaurants/${restaurantId}`);
        setRestaurant(response.data);
      } catch (err) {
        setError('Failed to fetch restaurant information.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurant();
  }, [restaurantId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/login', { state: { from: `/review/${restaurantId}` } });
      return;
    }
    try {
      await api.post('/reviews', { restaurantId, rating, text: review });
      navigate(`/restaurant/${restaurantId}`, { state: { message: 'Review submitted successfully!' } });
    } catch (err) {
      setError('Failed to submit review. Please try again.');
      console.error(err);
    }
  };

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Review {restaurant?.name}</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
          <div className="flex justify-center space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className={`text-3xl ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
              >
                ★
              </button>
            ))}
          </div>
        </div>
        <div>
          <label htmlFor="review" className="block text-sm font-medium text-gray-700 mb-1">Your Review</label>
          <textarea
            id="review"
            rows="4"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder="Write your review here..."
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;