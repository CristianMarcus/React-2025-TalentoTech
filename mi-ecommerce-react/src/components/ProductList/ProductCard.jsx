// src/components/ProductList/ProductCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useCarrito } from '../../context/CarritoContext';
import { motion } from 'framer-motion'; // ¡Importamos motion!

// ProductCard ahora recibe 'variants' para la animación en cascada
const ProductCard = ({ product, variants }) => {
  const { handleAddToCart } = useCarrito();

  return (
    <motion.div
      // Animación de entrada y animación en cascada (staggered)
      variants={variants} // Usa las variantes pasadas desde ProductList
      initial="hidden" // Estado inicial definido en las variantes
      animate="visible" // Estado final definido en las variantes
      // Animación al pasar el ratón y al hacer clic
      whileHover={{ scale: 1.05, boxShadow: '0 15px 25px rgba(0, 0, 0, 0.2)' }}
      whileTap={{ scale: 0.98 }}
      className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col items-center text-center p-7 border border-gray-100 transform cursor-pointer group"
    >
      <Link to={`/products/${product.id}`} className="block">
        <img
          src={product.image}
          alt={product.title}
          className="w-48 h-48 object-contain mb-6 transform group-hover:scale-110 transition-transform duration-300"
        />
      </Link>
      <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">{product.title}</h3>
      <p className="text-sm text-gray-600 mb-4 line-clamp-3 leading-relaxed">{product.description}</p>
      <p className="text-3xl font-extrabold text-green-700 mb-6">${product.price.toFixed(2)}</p>
      <div className="flex flex-col gap-4 w-full">
        <motion.button // Usamos motion.button para animaciones de clic/hover
          onClick={() => handleAddToCart(product)}
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3.5 px-7 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-70 transform"
          whileHover={{ scale: 1.02 }} // Pequeña animación al pasar el ratón
          whileTap={{ scale: 0.98 }}   // Pequeña animación al hacer clic
        >
          Agregar al Carrito
        </motion.button>
        <Link
          to={`/products/${product.id}`}
          className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3.5 px-7 rounded-lg transition-all duration-300 shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-opacity-70 transform hover:-translate-y-0.5"
        >
          Ver Detalles
        </Link>
      </div>
    </motion.div>
  );
};

export default ProductCard;