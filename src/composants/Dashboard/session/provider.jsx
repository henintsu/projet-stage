import React, { createContext, useState, useContext } from 'react';

// Créez le contexte d'authentification
const AuthContext = createContext();

// Créez un fournisseur pour le contexte
export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Initialisez l'état d'authentification

    // Fonction pour se connecter
    const login = () => setIsAuthenticated(true);

    // Fonction pour se déconnecter
    const logout = () => setIsAuthenticated(false);

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

// Créez un hook personnalisé pour utiliser le contexte
export function useAuth() {
    return useContext(AuthContext);
}
