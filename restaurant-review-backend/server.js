// server.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/database');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// Connect to database
connectDB();

// Import routes
const restaurantRoutes = require('./routes/restaurants');
const reviewRoutes = require('./routes/reviews');
const couponRoutes = require('./routes/coupons');
const userRoutes = require('./routes/users');

// Use routes
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/coupons', couponRoutes);
app.use('/api/users', userRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));