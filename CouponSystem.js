// src/components/CouponSystem.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CouponSystem() {
  const [coupons, setCoupons] = useState([]);
  const [couponCode, setCouponCode] = useState('');
  const [redeemMessage, setRedeemMessage] = useState('');

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await axios.get('/api/coupons/user/user-id'); // Replace with actual user ID
        setCoupons(response.data);
      } catch (error) {
        console.error('Error fetching coupons:', error);
      }
    };
    fetchCoupons();
  }, []);

  const handleRedeem = async () => {
    try {
      const response = await axios.post('/api/coupons/redeem', { code: couponCode });
      setRedeemMessage(response.data.message);
      setCouponCode('');
      // Refresh coupons list
      const updatedCoupons = await axios.get('/api/coupons/user/user-id'); // Replace with actual user ID
      setCoupons(updatedCoupons.data);
    } catch (error) {
      setRedeemMessage('Error redeeming coupon. Please try again.');
      console.error('Error redeeming coupon:', error);
    }
  };

  return (
    <div className="coupon-system">
      <h2>Your Coupons</h2>
      <div className="coupon-list">
        {coupons.map((coupon) => (
          <div key={coupon._id} className="coupon">
            <p>Code: {coupon.code}</p>
            <p>Discount: {coupon.discount}%</p>
            <p>Expires: {new Date(coupon.expiresAt).toLocaleDateString()}</p>
            <p>Status: {coupon.isUsed ? 'Used' : 'Available'}</p>
          </div>
        ))}
      </div>
      <div className="redeem-coupon">
        <h3>Redeem a Coupon</h3>
        <input
          type="text"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          placeholder="Enter coupon code"
        />
        <button onClick={handleRedeem}>Redeem</button>
        {redeemMessage && <p>{redeemMessage}</p>}
      </div>
    </div>
  );
}

export default CouponSystem;