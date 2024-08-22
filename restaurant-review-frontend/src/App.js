import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import QRScanner from './components/QRScanner';
import ReviewForm from './components/ReviewForm';
import RestaurantDashboard from './components/RestaurantDashboard';
import CouponSystem from './components/CouponSystem';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<QRScanner />} />
              <Route path="/review/:restaurantId" element={<ReviewForm />} />
              <Route path="/dashboard/:restaurantId" element={<RestaurantDashboard />} />
              <Route path="/coupons" element={<CouponSystem />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;