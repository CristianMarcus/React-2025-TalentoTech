// src/pages/HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="text-center py-28 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl shadow-2xl mt-12 mb-12 transform hover:shadow-3xl transition-shadow duration-500">
      <h1 className="text-7xl font-extrabold text-gray-900 mb-8 leading-tight tracking-tighter">
        Bienvenido a <span className="text-blue-700">Mi</span> <span className="text-indigo-700">eCommerce</span>
      </h1>
      <p className="text-2xl text-gray-700 mb-14 max-w-4xl mx-auto leading-relaxed">
        Descubre nuestra exclusiva colección de productos electrónicos.
        Calidad, innovación y estilo te esperan para una experiencia de compra sin igual.
      </p>
      <Link
        to="/products"
        className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4.5 px-14 rounded-full text-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
      >
        Explorar Productos Ahora
      </Link>
    </div>
  );
};

export default HomePage;