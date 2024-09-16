import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './provider';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/connexion-page" />;
  }

  return children;
};

export default ProtectedRoute;
