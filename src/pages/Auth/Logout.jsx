// src/pages/Logout.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear user data from local storage or session storage
    localStorage.removeItem('user');  // Example: Remove user info from localStorage
    sessionStorage.removeItem('user'); // Optional: If you use sessionStorage
    
    // You can also reset any global state (like Redux store) if you are using Redux
    
    // Redirect the user to the login page after logout
    navigate('/login');
  }, [navigate]);

  return (
    <div className="logout-page p-8">
      <h2 className="text-2xl font-semibold">Logging out...</h2>
      <p>Please wait while we log you out.</p>
    </div>
  );
};

export default Logout;
