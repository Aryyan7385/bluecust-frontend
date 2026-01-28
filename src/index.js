// Inside your src/index.js file
import React from 'react';
import ReactDOM from 'react-dom/client';
import './pages/index.css'; // This looks into the pages folder for your styles
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
