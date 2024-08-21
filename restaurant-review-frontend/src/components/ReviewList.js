// src/components/ReviewList.js
import React, { useState, useEffect } from 'react';
import api from '../utils/api';

function ReviewList({ restaurantId }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/reviews/restaurant/${restaurantId}`);
        setReviews(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch reviews. Please try again later.');
        setLoading(false);
        console.error('Error fetching reviews:', err);
      }
    };

    fetchReviews();
  }, [restaurantId]);

  if (loading) return <div>Loading reviews...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="review-list">
      <h3>Customer Reviews</h3>
      {reviews.length === 0 ? (
        <p>No reviews yet. Be the first to review!</p>
      ) : (
        reviews.map(review => (
          <div key={review._id} className="review">
            <p>Rating: {review.rating}/5</p>
            <p>{review.text}</p>
            <p>Sentiment: {review.sentiment > 0 ? 'Positive' : review.sentiment < 0 ? 'Negative' : 'Neutral'}</p>
            <small>Date: {new Date(review.createdAt).toLocaleDateString()}</small>
          </div>
        ))
      )}
    </div>
  );
}

export default ReviewList;