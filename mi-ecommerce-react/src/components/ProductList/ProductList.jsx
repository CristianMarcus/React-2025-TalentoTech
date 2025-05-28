// src/components/ProductList/ProductList.jsx
import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { motion } from 'framer-motion'; // ¡Importamos motion!

// Componente de "Skeleton Loader" para una mejor UX
const SkeletonCard = () => (
  <div className="bg-white rounded-3xl shadow-lg p-7 border border-gray-100 animate-pulse flex flex-col items-center text-center">
    <div className="w-48 h-48 bg-gray-200 rounded-lg mb-6"></div>
    <div className="h-6 bg-gray-200 w-3/4 mb-2 rounded"></div>
    <div className="h-4 bg-gray-200 w-1/2 mb-4 rounded"></div>
    <div className="h-8 bg-gray-200 w-1/3 mb-6 rounded"></div>
    <div className="h-12 bg-gray-200 w-full rounded-lg"></div>
    <div className="h-12 bg-gray-200 w-full rounded-lg mt-3"></div>
  </div>
);

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null); // Limpiar cualquier error previo

        // Simular un retraso en la carga para que puedas ver el esqueleto
        await new Promise(resolve => setTimeout(resolve, 1000)); // Retraso de 1 segundo

        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err); // Para depuración
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Variantes de animación para el contenedor de la grilla (ProductList)
  const containerVariants = {
    hidden: { opacity: 0 }, // Estado inicial del contenedor: invisible
    visible: {
      opacity: 1,           // Estado final del contenedor: visible
      transition: {
        staggerChildren: 0.1, // Retraso entre la animación de cada ProductCard (0.1 segundos)
      },
    },
  };

  // Variantes de animación para cada ProductCard (elemento hijo)
  const itemVariants = {
    hidden: { opacity: 0, y: 20 }, // Cada ProductCard comienza invisible y un poco más abajo
    visible: { opacity: 1, y: 0 }, // Cada ProductCard termina visible y en su posición
  };

  if (loading) {
    return (
      <div className="text-center py-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Cargando productos...</h2>
        <p className="text-gray-600 text-lg mb-10">Un momento, estamos trayendo los mejores artículos para ti.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 py-8">
          {[...Array(8)].map((_, i) => ( // Muestra 8 tarjetas de esqueleto durante la carga
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 bg-red-50 rounded-lg shadow-md max-w-xl mx-auto border border-red-200">
        <h2 className="text-4xl font-bold text-red-700 mb-6">¡Error al cargar los productos!</h2>
        <p className="text-red-600 text-xl mb-4">Parece que hubo un problema.</p>
        <p className="text-red-600 text-lg mb-8">Por favor, intenta recargar la página o contáctanos si el problema persiste.</p>
        <p className="text-sm text-red-800 italic">Detalles: {error.message}</p>
      </div>
    );
  }

  return (
    // Envolvemos la grilla con motion.div para aplicar las animaciones de contenedor
    <motion.div
      variants={containerVariants} // Aplica las variantes del contenedor
      initial="hidden"            // Inicia en el estado "hidden"
      animate="visible"           // Anima al estado "visible"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 py-8"
    >
      {products.map(product => (
        // Pasamos las variantes del ítem a cada ProductCard
        <ProductCard key={product.id} product={product} variants={itemVariants} />
      ))}
    </motion.div>
  );
};

export default ProductList;