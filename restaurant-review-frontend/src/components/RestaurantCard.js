// src/components/RestaurantCard.js
import React from 'react';

function RestaurantCard({ restaurant }) {
  return (
    <div className="restaurant-card">
      <h3>{restaurant.name}</h3>
      <p>{restaurant.address}</p>
      <p>Average Rating: {restaurant.averageRating.toFixed(1)}</p>
      <p>Reviews: {restaurant.reviewCount}</p>
    </div>
  );
}

export default RestaurantCard;