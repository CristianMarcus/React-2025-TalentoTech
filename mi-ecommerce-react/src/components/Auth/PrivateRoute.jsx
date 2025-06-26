// src/components/auth/PrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    // Reemplazado text-center mt-20 text-xl por clases de Bootstrap
    return <div className="text-center mt-5 fs-4">Cargando autenticación...</div>; {/* text-center mt-5 (equivalente a mt-20), fs-4 (equivalente a text-xl) */}
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;