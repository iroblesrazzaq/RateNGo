// src/components/RestaurantRegister.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';

const RestaurantRegister = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    restaurantName: '',
    address: '',
    cuisine: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/users/register', {
        ...formData,
        role: 'restaurant',
        restaurantInfo: {
          name: formData.restaurantName,
          address: formData.address,
          cuisine: formData.cuisine
        }
      });
      login(response.data);
      navigate('/restaurant-dashboard');
    } catch (err) {
      setError('Registration failed. Please try again.');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Add input fields for username, email, password, restaurantName, address, and cuisine */}
      <button type="submit">Register Restaurant</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default RestaurantRegister;