// src/components/CouponList.js
import React, { useState, useEffect } from 'react';
import api from '../utils/api';

function CouponList() {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        setLoading(true);
        const response = await api.get('/coupons/user');
        setCoupons(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch coupons. Please try again later.');
        setLoading(false);
        console.error('Error fetching coupons:', err);
      }
    };

    fetchCoupons();
  }, []);

  if (loading) return <div>Loading coupons...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="coupon-list">
      <h3>Your Coupons</h3>
      {coupons.length === 0 ? (
        <p>You don't have any coupons yet. Write a review to earn coupons!</p>
      ) : (
        coupons.map(coupon => (
          <div key={coupon._id} className="coupon">
            <h4>Discount: {coupon.discount}% off</h4>
            <p>Code: <strong>{coupon.code}</strong></p>
            <p>Valid until: {new Date(coupon.expiresAt).toLocaleDateString()}</p>
            <p>Status: {coupon.isUsed ? 'Used' : 'Available'}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default CouponList;