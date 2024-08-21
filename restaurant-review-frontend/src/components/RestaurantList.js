// src/components/RestaurantList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import RestaurantCard from './RestaurantCard';

function RestaurantList() {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await api.get('/restaurants');
        setRestaurants(response.data);
      } catch (error) {
        console.error('Error fetching restaurants', error);
      }
    };
    fetchRestaurants();
  }, []);

  return (
    <div className="restaurant-list">
      <h2>Restaurants</h2>
      {restaurants.map(restaurant => (
        <Link to={`/restaurant/${restaurant._id}`} key={restaurant._id}>
          <RestaurantCard restaurant={restaurant} />
        </Link>
      ))}
    </div>
  );
}

export default RestaurantList;