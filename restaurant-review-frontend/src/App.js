// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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
        <Switch>
          <Route exact path="/" component={QRScanner} />
          <Route path="/review/:restaurantId" component={ReviewForm} />
          <Route path="/dashboard/:restaurantId" component={RestaurantDashboard} />
          <Route path="/coupons" component={CouponSystem} />
        </Switch>
        <Footer />
      </div>
    </Router>
  );
}

export default App;