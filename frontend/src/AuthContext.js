import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const storedUser = localStorage.getItem('user');
    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      const response = await axios.post('http://localhost:8000/api/auth/login/', {
        username,
        password,
      });
      
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      
      // Fetch user details to check if admin
      const userResponse = await axios.get('http://localhost:8000/api/auth/me/', {
        headers: { Authorization: `Bearer ${response.data.access}` }
      });
      
      const userData = {
        username: userResponse.data.username,
        isAdmin: userResponse.data.is_staff
      };
      
      localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data?.detail || 'Login failed' 
      };
    }
  };

  const register = async (username, email, password, password2) => {
    try {
      const response = await axios.post('http://localhost:8000/api/auth/register/', {
        username,
        email,
        password,
        password2,
      });
      
      return { success: true, data: response.data };
    } catch (error) {
      return { 
        success: false, 
        error: error.response?.data || 'Registration failed' 
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    setUser(null);
  };

  const isAuthenticated = () => {
    return !!localStorage.getItem('access_token');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAuthenticated, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
