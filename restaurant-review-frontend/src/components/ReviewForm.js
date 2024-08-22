// src/components/ReviewForm.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ReviewForm() {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [restaurant, setRestaurant] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [coupon, setCoupon] = useState(null);
  const { restaurantId } = useParams();

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const response = await axios.get(`/api/restaurants/${restaurantId}`);
        setRestaurant(response.data);
      } catch (error) {
        console.error('Error fetching restaurant:', error);
      }
    };
    fetchRestaurant();
  }, [restaurantId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/reviews', { restaurantId, rating, review });
      const couponResponse = await axios.post('/api/coupons/generate', { userId: 'user-id' }); // Replace with actual user ID
      setSubmitted(true);
      setCoupon(couponResponse.data);
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  if (submitted) {
    return (
      <div className="review-submitted">
        <h2>Thank you for your review!</h2>
        {coupon && (
          <div className="coupon">
            <h3>Your Coupon</h3>
            <p>Code: {coupon.code}</p>
            <p>Discount: {coupon.discount}%</p>
            <p>Valid until: {new Date(coupon.expiresAt).toLocaleDateString()}</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="review-form">
      <h2>Review {restaurant?.name}</h2>
      <form onSubmit={handleSubmit}>
        <div className="rating">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => setRating(star)}
              style={{ cursor: 'pointer', color: star <= rating ? 'gold' : 'gray' }}
            >
              ★
            </span>
          ))}
        </div>
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Write your review here..."
          required
        />
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
}

export default ReviewForm;