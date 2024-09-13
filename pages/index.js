import React from 'react';
import ReviewForm from '../survey/ReviewForm';

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Submit a Review</h1>
      <ReviewForm />
    </div>
  );
};

export default Home;