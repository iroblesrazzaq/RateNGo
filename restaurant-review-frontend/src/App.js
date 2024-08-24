import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import QRScanner from './components/QRscanner';
import ReviewForm from './components/ReviewForm';
import RestaurantDashboard from './components/RestaurantDashboard';
import QRCodeGenerator from './components/QRCodeGenerator';
import CouponSystem from './components/CouponSystem';
import Header from './components/Header';
import Footer from './components/Footer';
import { useAuth } from './context/AuthContext';

function App() {
  const { user } = useAuth();

  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-gray-100">
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8">
            <nav className="mb-4">
              <ul className="flex space-x-4">
                {user && user.role === 'restaurant_owner' ? (
                  <>
                    <li><Link to="/dashboard" className="text-blue-500 hover:text-blue-700">Dashboard</Link></li>
                    <li><Link to="/qr-generator" className="text-blue-500 hover:text-blue-700">QR Generator</Link></li>
                  </>
                ) : (
                  <li><Link to="/" className="text-blue-500 hover:text-blue-700">Scan QR</Link></li>
                )}
                <li><Link to="/coupons" className="text-blue-500 hover:text-blue-700">Coupons</Link></li>
              </ul>
            </nav>
            <Routes>
              <Route path="/" element={<QRScanner />} />
              <Route path="/dashboard" element={<RestaurantDashboard />} />
              <Route path="/qr-generator" element={<QRCodeGenerator />} />
              <Route path="/review/:restaurantId" element={<ReviewForm />} />
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