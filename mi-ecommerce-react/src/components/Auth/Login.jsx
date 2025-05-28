// src/components/auth/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // ¡Importamos el custom hook de Auth!

// Login ya no necesita onLogin como prop
const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); // Obtenemos la función login del contexto

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin') {
      login(); // Llamamos a la función login del contexto
      navigate('/dashboard');
    } else {
      alert('Credenciales incorrectas. Usa admin/admin');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[70vh] py-10">
      <form onSubmit={handleSubmit} className="bg-white p-12 rounded-2xl shadow-2xl w-full max-w-lg border border-gray-100">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">Iniciar Sesión</h2>
        <div className="mb-7">
          <label className="block text-gray-700 text-lg font-semibold mb-2" htmlFor="username">
            Usuario
          </label>
          <input
            type="text"
            id="username"
            className="shadow-inner appearance-none border border-gray-300 rounded-lg w-full py-3.5 px-5 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-lg"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="admin"
            autoComplete="username"
          />
        </div>
        <div className="mb-9">
          <label className="block text-gray-700 text-lg font-semibold mb-2" htmlFor="password">
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            className="shadow-inner appearance-none border border-gray-300 rounded-lg w-full py-3.5 px-5 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="admin"
            autoComplete="current-password"
          />
        </div>
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-10 rounded-lg shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-70 transition-all duration-300 text-xl transform hover:-translate-y-0.5"
          >
            Entrar
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;