// src/components/RestaurantDashboard.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function RestaurantDashboard() {
  const [restaurant, setRestaurant] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [summary, setSummary] = useState({ positive: [], negative: [] });
  const { restaurantId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const restaurantResponse = await axios.get(`/api/restaurants/${restaurantId}`);
        setRestaurant(restaurantResponse.data);

        const reviewsResponse = await axios.get(`/api/reviews/restaurant/${restaurantId}`);
        setReviews(reviewsResponse.data);

        const summaryResponse = await axios.get(`/api/reviews/summary/${restaurantId}`);
        setSummary(summaryResponse.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };
    fetchData();
  }, [restaurantId]);

  return (
    <div className="restaurant-dashboard">
      <h2>{restaurant?.name} Dashboard</h2>
      <div className="summary">
        <h3>Review Summary</h3>
        <div className="positive">
          <h4>Positive Aspects</h4>
          <ul>
            {summary.positive.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <div className="negative">
          <h4>Areas for Improvement</h4>
          <ul>
            {summary.negative.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="reviews">
        <h3>Recent Reviews</h3>
        {reviews.map((review) => (
          <div key={review._id} className="review">
            <p>Rating: {review.rating}/5</p>
            <p>{review.text}</p>
            <p>Sentiment: {review.sentiment > 0 ? 'Positive' : review.sentiment < 0 ? 'Negative' : 'Neutral'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RestaurantDashboard;