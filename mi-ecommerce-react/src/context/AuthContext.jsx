
import React, { createContext, useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';

export const AuthContext = createContext(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem('user');
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Error al parsear user de localStorage:", error);
      return null;
    }
  });

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        localStorage.removeItem('user');
      }
    } catch (error) {
      console.error("Error al guardar user en localStorage:", error);
    }
  }, [user]);

  
  const login = (username, password) => {
    
    if (username === 'admin' && password === 'admin') {
      const userData = { username, role: 'admin' }; 
      setUser(userData);
      toast.success(`¡Bienvenido, ${username}! Has iniciado sesión.`, { autoClose: 2000 });
      return true;
    } else {
      toast.error("Credenciales incorrectas. Intenta con 'admin' / 'admin'.", { autoClose: 3000 });
      return false; 
    }
  };

  const logout = () => {
    setUser(null);
    toast.info("Has cerrado sesión.", { autoClose: 2000 });
  };

  const authContextValue = {
    user,
    isAuthenticated: !!user,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};