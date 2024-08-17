import React, { useState } from 'react';
import { useQuery, useAction, Link, getRestaurants } from 'wasp/client/operations';

const HomePage = () => {
  const { data: restaurants, isLoading, error } = useQuery(getRestaurants);

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  return (
    <div className='p-4'>
      {restaurants.map((restaurant) => (
        <div key={restaurant.id} className='bg-white p-4 mb-4 rounded-lg'>
          <h2 className='text-xl font-bold'>{restaurant.name}</h2>
          <p className='text-gray-600'>{restaurant.description}</p>
          <p className='text-gray-600'>Cuisine: {restaurant.cuisineType}</p>
          <Link to={`/review/${restaurant.id}`} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Write a Review</Link>
        </div>
      ))}
    </div>
  );
}

export default HomePage;