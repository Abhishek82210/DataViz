import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css'; // Global styles
import App from './App'; // Main App component

// Create a root element and render the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);