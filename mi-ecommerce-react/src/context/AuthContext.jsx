// src/context/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

// 1. Crear el Contexto de Autenticación
export const AuthContext = createContext();

// 2. Crear el Proveedor (Provider) de Autenticación
export const AuthProvider = ({ children }) => {
  // Estado de autenticación, inicializado desde localStorage si existe
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Intentar cargar el estado de autenticación desde localStorage al inicio
    const storedAuth = localStorage.getItem('isAuthenticated');
    return storedAuth === 'true'; // localStorage guarda como string, convertir a booleano
  });

  // Efecto para guardar el estado de autenticación en localStorage cada vez que cambia
  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated);
  }, [isAuthenticated]);

  // Función para iniciar sesión
  const login = () => {
    setIsAuthenticated(true);
  };

  // Función para cerrar sesión
  const logout = () => {
    setIsAuthenticated(false);
    // Eliminar cualquier token o dato de sesión de localStorage
    localStorage.removeItem('isAuthenticated');
  };

  
  const contextValue = {
    isAuthenticated,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};