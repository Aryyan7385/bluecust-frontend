import React, { createContext, useState, useContext, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// These paths point into your pages folder from the new src/App.js location
import './pages/App.css';
import './pages/index.css';

import LandingPage from './pages/pages/LandingPage';
import LoginPage from './pages/pages/LoginPage';
import RegisterPage from './pages/pages/RegisterPage';
import CustomerDashboard from './pages/pages/CustomerDashboard';
import AdminDashboard from './pages/pages/AdminDashboard';

// Environment variable for your BlueCust backend
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'https://bluecast-api-vw9o.onrender.com';
export const API = `${BACKEND_URL}/api`;

export const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
};

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (newToken, newUser) => {
    setToken(newToken);
    setUser(newUser);
    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route 
              path="/dashboard" 
              element={<ProtectedRoute><CustomerDashboard /></ProtectedRoute>} 
            />
            <Route 
              path="/admin" 
              element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} 
            />
          </Routes>
        </BrowserRouter>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
