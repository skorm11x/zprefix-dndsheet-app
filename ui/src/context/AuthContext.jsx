import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const login = (userData) => {
    return new Promise((resolve) => {
      setIsAuthenticated(true);
      setUser(userData);
      resolve();
    });
  };

  const logout = () => {
    return new Promise((resolve) => {
      setIsAuthenticated(false);
      setUser(userData);
      resolve();
    });
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};