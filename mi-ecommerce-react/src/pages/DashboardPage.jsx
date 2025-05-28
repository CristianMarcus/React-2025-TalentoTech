// src/pages/DashboardPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; 


const DashboardPage = () => {
  const { logout } = useAuth(); 

  return (
    <div className="text-center mt-12 bg-white p-12 rounded-2xl shadow-2xl max-w-3xl mx-auto border border-gray-100">
      <h2 className="text-5xl font-bold text-gray-800 mb-8">¡Bienvenido al Panel de Administración!</h2>
      <p className="text-xl text-gray-700 mb-10 leading-relaxed">
        Aquí podrías gestionar productos, ver pedidos, analizar estadísticas y mucho más.
      </p>
      <div className="flex flex-col md:flex-row justify-center items-center gap-6">
        <button
          onClick={logout} 
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 px-10 rounded-lg shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-70 transition-all duration-300 text-xl transform hover:-translate-y-0.5"
        >
          Cerrar Sesión
        </button>
        <Link
          to="/products"
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3.5 px-10 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 text-xl transform hover:-translate-y-0.5"
        >
          Ver Tienda
        </Link>
      </div>
    </div>
  );
};

export default DashboardPage;