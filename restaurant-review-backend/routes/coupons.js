// routes/coupons.js
const express = require('express');
const router = express.Router();
const Coupon = require('../models/Coupon');
const auth = require('../middleware/auth');

// Generate a new coupon
router.post('/generate', auth, async (req, res) => {
  const coupon = new Coupon({
    code: Math.random().toString(36).substring(7),
    discount: 10, // 10% discount
    expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    userId: req.user.id
  });

  try {
    const newCoupon = await coupon.save();
    res.status(201).json(newCoupon);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all coupons for a user
router.get('/user', auth, async (req, res) => {
  try {
    const coupons = await Coupon.find({ userId: req.user.id, isUsed: false });
    res.json(coupons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Redeem a coupon
router.post('/redeem', auth, async (req, res) => {
  try {
    const coupon = await Coupon.findOne({ code: req.body.code, isUsed: false });
    if (!coupon) {
      return res.status(404).json({ message: 'Invalid or already used coupon' });
    }

    if (coupon.expiresAt < Date.now()) {
      return res.status(400).json({ message: 'Coupon has expired' });
    }

    coupon.isUsed = true;
    await coupon.save();

    res.json({ message: 'Coupon redeemed successfully', discount: coupon.discount });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;