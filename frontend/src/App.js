import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import ProtectedRoute from './ProtectedRoute';
import Login from './components/Login';
import Register from './components/Register';
import TicketList from './components/TicketList';
import TicketForm from './components/TicketForm';
import TicketDetail from './components/TicketDetail';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route 
            path="/" 
            element={
              <ProtectedRoute>
                <TicketList />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/create" 
            element={
              <ProtectedRoute>
                <TicketForm />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/ticket/:id" 
            element={
              <ProtectedRoute>
                <TicketDetail />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/edit/:id" 
            element={
              <ProtectedRoute>
                <TicketForm />
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
