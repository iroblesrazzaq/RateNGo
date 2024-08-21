// src/components/Dashboard.js
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../utils/api';

function Dashboard() {
  const [restaurants, setRestaurants] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await api.get('/restaurants/owner');
        setRestaurants(response.data);
      } catch (error) {
        console.error('Error fetching restaurants', error);
      }
    };

    if (user && user.role === 'restaurant_owner') {
      fetchRestaurants();
    }
  }, [user]);

  if (user.role !== 'restaurant_owner') {
    return <div>Access denied. Only restaurant owners can view this dashboard.</div>;
  }

  return (
    <div className="dashboard">
      <h2>Restaurant Owner Dashboard</h2>
      {restaurants.map(restaurant => (
        <div key={restaurant._id} className="dashboard-restaurant">
          <h3>{restaurant.name}</h3>
          <p>Average Rating: {restaurant.averageRating.toFixed(1)}</p>
          <p>Total Reviews: {restaurant.reviewCount}</p>
          <button onClick={() => {/* Add logic to view detailed stats */}}>View Detailed Stats</button>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;