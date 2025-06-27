
import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { motion } from 'framer-motion'; 

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
        setError(null); 

        
        await new Promise(resolve => setTimeout(resolve, 1000)); 

        const response = await fetch('https://68599f039f6ef9611153b9ee.mockapi.io/api/v1/products');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err); 
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  
  const containerVariants = {
    hidden: { opacity: 0 }, 
    visible: {
      opacity: 1,           
      transition: {
        staggerChildren: 0.1, 
      },
    },
  };

  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 }, 
    visible: { opacity: 1, y: 0 }, 
  };

  if (loading) {
    return (
      <div className="text-center py-16">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Cargando productos...</h2>
        <p className="text-gray-600 text-lg mb-10">Un momento, estamos trayendo los mejores artículos para ti.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 py-8">
          {[...Array(8)].map((_, i) => ( 
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
    
    <motion.div
      variants={containerVariants} 
      initial="hidden"            
      animate="visible"           
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10 py-8"
    >
      {products.map(product => (
        
        <ProductCard key={product.id} product={product} variants={itemVariants} />
      ))}
    </motion.div>
  );
};

export default ProductList;