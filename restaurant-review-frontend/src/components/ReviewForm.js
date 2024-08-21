// src/components/ReviewForm.js
import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/api';

function ReviewForm({ restaurantId, onReviewSubmitted }) {
  const [rating, setRating] = useState(5);
  const [text, setText] = useState('');
  const { user } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert('You must be logged in to submit a review');
      return;
    }
    try {
      await api.post('/reviews', { restaurantId, rating, text });
      setText('');
      setRating(5);
      onReviewSubmitted();
    } catch (error) {
      console.error('Error submitting review', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Write a Review</h3>
      <div>
        <label>Rating:</label>
        <select value={rating} onChange={(e) => setRating(Number(e.target.value))}>
          {[1, 2, 3, 4, 5].map(num => (
            <option key={num} value={num}>{num}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Review:</label>
        <textarea value={text} onChange={(e) => setText(e.target.value)} required />
      </div>
      <button type="submit">Submit Review</button>
    </form>
  );
}

export default ReviewForm;