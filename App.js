import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import QRScanner from './pages/QRScanner';
import ReviewForm from './pages/ReviewForm';
import RestaurantDashboard from './pages/RestaurantDashboard';
import CouponPage from './pages/CouponPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/scan" component={QRScanner} />
          <Route path="/review/:restaurantId" component={ReviewForm} />
          <Route path="/dashboard" component={RestaurantDashboard} />
          <Route path="/coupon" component={CouponPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;