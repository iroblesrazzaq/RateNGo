// routes/restaurants.js
const express = require('express');
const router = express.Router();
const Restaurant = require('../models/Restaurant');
const auth = require('../middleware/auth');
const generateQRCode = require('../utils/qrCodeGenerator');

// Get all restaurants
router.get('/', async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific restaurant
router.get('/:id', async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) return res.status(404).json({ message: 'Restaurant not found' });
    res.json(restaurant);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new restaurant (protected route)
router.post('/', auth, async (req, res) => {
  const restaurant = new Restaurant({
    name: req.body.name,
    address: req.body.address,
  });

  try {
    const newRestaurant = await restaurant.save();
    
    // Generate QR code
    const qrCodeData = `http://yourfrontend.com/review/${newRestaurant._id}`;
    const qrCodeImage = await generateQRCode(qrCodeData);
    
    // Update restaurant with QR code
    newRestaurant.qrCode = qrCodeImage;
    await newRestaurant.save();

    res.status(201).json(newRestaurant);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a restaurant (protected route)
router.patch('/:id', auth, async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) return res.status(404).json({ message: 'Restaurant not found' });

    if (req.body.name) restaurant.name = req.body.name;
    if (req.body.address) restaurant.address = req.body.address;

    const updatedRestaurant = await restaurant.save();
    res.json(updatedRestaurant);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a restaurant (protected route)
router.delete('/:id', auth, async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) return res.status(404).json({ message: 'Restaurant not found' });

    await restaurant.remove();
    res.json({ message: 'Restaurant deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Generate new QR code for a restaurant (protected route)
router.post('/:id/generate-qr', auth, async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) return res.status(404).json({ message: 'Restaurant not found' });

    const qrCodeData = `http://yourfrontend.com/review/${restaurant._id}`;
    const qrCodeImage = await generateQRCode(qrCodeData);

    restaurant.qrCode = qrCodeImage;
    await restaurant.save();

    res.json({ message: 'QR code generated successfully', qrCode: qrCodeImage });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;