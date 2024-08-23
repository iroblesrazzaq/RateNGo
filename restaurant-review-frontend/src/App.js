import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import QRScanner from './components/QRscanner';
import ReviewForm from './components/ReviewForm';
import RestaurantDashboard from './components/RestaurantDashboard';
import CouponSystem from './components/CouponSystem';
import Login from './components/Login';
import Register from './components/Register';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<QRScanner />} />
            <Route path="/review/:restaurantId" element={<ReviewForm />} />
            <Route 
              path="/dashboard/:restaurantId" 
              element={
                <PrivateRoute>
                  <RestaurantDashboard />
                </PrivateRoute>
              } 
            />
            <Route 
              path="/coupons" 
              element={
                <PrivateRoute>
                  <CouponSystem />
                </PrivateRoute>
              } 
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;