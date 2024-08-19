import React, { useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

function ReviewForm() {
  const { restaurantId } = useParams();
  const history = useHistory();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the review data to your backend
    console.log({ restaurantId, rating, comment });
    // After submitting, redirect to the coupon page
    history.push('/coupon');
  };

  return (
    <div>
      <h2>Review Restaurant</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Rating: </label>
          <input
            type="number"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
          />
        </div>
        <div>
          <label>Comment: </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
}

export default ReviewForm;