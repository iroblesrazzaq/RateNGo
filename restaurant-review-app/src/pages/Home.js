import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Welcome to Restaurant Review App</h1>
      <Link to="/scan">Scan QR Code</Link>
    </div>
  );
}

export default Home;