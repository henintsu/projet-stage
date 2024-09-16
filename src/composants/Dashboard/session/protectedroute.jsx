import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

// Composant de route protégée
const ProtectedRoute = ({ element: Element, ...rest }) => {
    const { isAuthenticated } = useAuth();

    return (
        <Route
            {...rest}
            element={isAuthenticated ? <Element /> : <Navigate to="/login-page" />}
        />
    );
};

export default ProtectedRoute;
