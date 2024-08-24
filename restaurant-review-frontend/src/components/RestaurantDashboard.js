import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../utils/api';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function RestaurantDashboard() {
  const [restaurant, setRestaurant] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const { restaurantId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [restaurantData, reviewsData, metricsData] = await Promise.all([
          api.get(`/restaurants/${restaurantId}`),
          api.get(`/reviews/restaurant/${restaurantId}`),
          api.get(`/reviews/summary/${restaurantId}`)
        ]);
        setRestaurant(restaurantData.data);
        setReviews(reviewsData.data);
        setMetrics(metricsData.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, [restaurantId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const ratingDistribution = [
    { name: '1 Star', count: metrics.ratingDistribution[1] || 0 },
    { name: '2 Stars', count: metrics.ratingDistribution[2] || 0 },
    { name: '3 Stars', count: metrics.ratingDistribution[3] || 0 },
    { name: '4 Stars', count: metrics.ratingDistribution[4] || 0 },
    { name: '5 Stars', count: metrics.ratingDistribution[5] || 0 },
  ];

  return (
    <div className="restaurant-dashboard p-6">
      <h1 className="text-3xl font-bold mb-6">{restaurant.name} Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Average Rating</h2>
          <p className="text-4xl font-bold text-yellow-500">{metrics.averageRating.toFixed(1)}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Total Reviews</h2>
          <p className="text-4xl font-bold text-blue-500">{metrics.totalReviews}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-2">Sentiment</h2>
          <p className="text-4xl font-bold text-green-500">{(metrics.positiveSentiment * 100).toFixed(1)}% Positive</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-xl font-semibold mb-4">Rating Distribution</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={ratingDistribution}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Recent Reviews</h2>
        {reviews.slice(0, 5).map((review) => (
          <div key={review._id} className="mb-4 pb-4 border-b">
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold">Rating: {review.rating}/5</span>
              <span className="text-sm text-gray-500">{new Date(review.createdAt).toLocaleDateString()}</span>
            </div>
            <p className="text-gray-700">{review.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RestaurantDashboard;