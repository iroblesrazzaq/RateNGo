// models/Review.js
const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  text: { type: String, required: true },
  sentiment: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

ReviewSchema.post('save', async function() {
  const Restaurant = mongoose.model('Restaurant');
  const restaurant = await Restaurant.findById(this.restaurantId);
  
  restaurant.reviewCount += 1;
  restaurant.averageRating = (restaurant.averageRating * (restaurant.reviewCount - 1) + this.rating) / restaurant.reviewCount;
  
  await restaurant.save();
});

module.exports = mongoose.model('Review', ReviewSchema);