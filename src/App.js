import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'; // BrowserRouter import
import AppRoutes from './routes/AppRoutes'; // Import AppRoutes component

function App() {
  return (
    <Router> {/* Ensure BrowserRouter wraps the entire app */}
      <AppRoutes /> {/* This will handle all routes */}
    </Router>
  );
}

export default App;
