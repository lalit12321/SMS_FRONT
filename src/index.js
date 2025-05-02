import React from 'react';
import ReactDOM from 'react-dom/client'; // Import from react-dom/client
import App from './App';
import { AuthProvider } from './context/AuthContext';

// Create a root container for React 18
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the App inside AuthProvider
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
