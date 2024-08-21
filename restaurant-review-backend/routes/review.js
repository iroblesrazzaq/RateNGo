// routes/reviews.js
const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const Restaurant = require('../models/Restaurant');
const auth = require('../middleware/auth');
const analyzeSentiment = require('../utils/sentimentAnalysis');

// Get all reviews for a restaurant
router.get('/restaurant/:restaurantId', async (req, res) => {
  try {
    const reviews = await Review.find({ restaurantId: req.params.restaurantId });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new review
router.post('/', auth, async (req, res) => {
  const { restaurantId, rating, text } = req.body;
  const sentiment = analyzeSentiment(text);

  const review = new Review({
    restaurantId,
    userId: req.user.id,
    rating,
    text,
    sentiment
  });

  try {
    const newReview = await review.save();
    res.status(201).json(newReview);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get review summary for a restaurant
router.get('/summary/:restaurantId', async (req, res) => {
  try {
    const reviews = await Review.find({ restaurantId: req.params.restaurantId });
    const restaurant = await Restaurant.findById(req.params.restaurantId);

    const summary = {
      averageRating: restaurant.averageRating,
      totalReviews: restaurant.reviewCount,
      sentimentBreakdown: {
        positive: reviews.filter(r => r.sentiment > 0).length,
        neutral: reviews.filter(r => r.sentiment === 0).length,
        negative: reviews.filter(r => r.sentiment < 0).length
      }
    };

    res.json(summary);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;