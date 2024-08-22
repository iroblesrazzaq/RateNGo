import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import QRScanner from './components/QRScanner';
import ReviewForm from './components/ReviewForm';
import RestaurantDashboard from './components/RestaurantDashboard';
import CouponSystem from './components/CouponSystem';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<QRScanner />} />
          <Route path="/review/:restaurantId" element={<ReviewForm />} />
          <Route path="/dashboard/:restaurantId" element={<RestaurantDashboard />} />
          <Route path="/coupons" element={<CouponSystem />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;