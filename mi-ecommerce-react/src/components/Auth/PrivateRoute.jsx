// src/components/auth/PrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // ¡Importamos el custom hook de Auth!

// PrivateRoute ya no necesita isAuthenticated como prop
const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth(); // Obtenemos isAuthenticated del contexto

  // Si el usuario no está autenticado, redirige a la página de login
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;