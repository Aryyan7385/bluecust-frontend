import React from 'react';
import ReactDOM from 'react-dom/client';
import './pages/index.css'; // Path to your CSS inside pages
import App from './App';    // Points to App.js in the same src folder

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
