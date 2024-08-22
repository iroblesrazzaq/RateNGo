import React, { useState, useEffect } from 'react';

function CouponPage() {
  const [coupon, setCoupon] = useState(null);

  useEffect(() => {
    // Generate or fetch a coupon
    generateCoupon();
  }, []);

  const generateCoupon = () => {
    // This would typically involve an API call to your backend
    const newCoupon = {
      code: 'REVIEW10',
      discount: '10%',
      expiryDate: '2023-12-31'
    };
    setCoupon(newCoupon);
  };

  return (
    <div>
      <h2>Thank You for Your Review!</h2>
      {coupon ? (
        <div>
          <h3>Here's your coupon:</h3>
          <p>Code: {coupon.code}</p>
          <p>Discount: {coupon.discount}</p>
          <p>Valid until: {coupon.expiryDate}</p>
        </div>
      ) : (
        <p>Loading your coupon...</p>
      )}
    </div>
  );
}

export default CouponPage;