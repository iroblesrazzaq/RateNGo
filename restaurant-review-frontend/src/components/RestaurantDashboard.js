// src/components/RestaurantDashboard.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import api from '../utils/api';

const RestaurantDashboard = () => {
  const [restaurant, setRestaurant] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [metrics, setMetrics] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { restaurantId } = useParams();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [restaurantData, reviewsData, metricsData] = await Promise.all([
          api.get(`/restaurants/${restaurantId}`),
          api.get(`/reviews/restaurant/${restaurantId}`),
          api.get(`/restaurants/${restaurantId}/metrics`)
        ]);
        setRestaurant(restaurantData.data);
        setReviews(reviewsData.data);
        setMetrics(metricsData.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch dashboard data');
        setLoading(false);
        console.error(err);
      }
    };

    fetchDashboardData();
  }, [restaurantId]);

  if (loading) return <div className="text-center mt-8">Loading dashboard...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">{error}</div>;

  const sentimentColors = {
    positive: 'text-green-500',
    neutral: 'text-yellow-500',
    negative: 'text-red-500'
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{restaurant.name} Dashboard</h1>
      
      {/* Overall Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Average Rating</h2>
          <p className="text-4xl font-bold text-blue-500">{metrics.averageRating.toFixed(1)}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Total Reviews</h2>
          <p className="text-4xl font-bold text-green-500">{metrics.totalReviews}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Sentiment Distribution</h2>
          <div className="flex justify-between">
            <span className={sentimentColors.positive}>{metrics.sentimentDistribution.positive}% Positive</span>
            <span className={sentimentColors.neutral}>{metrics.sentimentDistribution.neutral}% Neutral</span>
            <span className={sentimentColors.negative}>{metrics.sentimentDistribution.negative}% Negative</span>
          </div>
        </div>
      </div>

      {/* Rating Trend Chart */}
      <div className="bg-white p-4 rounded-lg shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">Rating Trend</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={metrics.ratingTrend}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis domain={[0, 5]} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="rating" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Reviews */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Recent Reviews</h2>
        <div className="space-y-4">
          {reviews.slice(0, 5).map((review) => (
            <div key={review._id} className="border-b pb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold">Rating: {review.rating}/5</span>
                <span className={sentimentColors[review.sentiment]}>
                  {review.sentiment.charAt(0).toUpperCase() + review.sentiment.slice(1)}
                </span>
              </div>
              <p className="text-gray-700">{review.text}</p>
              <p className="text-sm text-gray-500 mt-2">
                {new Date(review.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Key Insights */}
      <div className="mt-8 bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Key Insights</h2>
        <ul className="list-disc pl-5 space-y-2">
          {metrics.keyInsights.map((insight, index) => (
            <li key={index} className="text-gray-700">{insight}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RestaurantDashboard;