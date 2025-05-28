// src/pages/ProductDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCarrito } from '../context/CarritoContext'; 


const ProductDetailSkeleton = () => (
  <div className="bg-white p-12 rounded-2xl shadow-2xl max-w-6xl mx-auto mt-8 flex flex-col md:flex-row items-center md:items-start space-y-10 md:space-y-0 md:space-x-16 border border-gray-100 animate-pulse">
    <div className="md:w-1/3 flex justify-center items-center p-6 bg-gray-100 rounded-xl">
      <div className="w-72 h-72 bg-gray-200 rounded-lg"></div>
    </div>
    <div className="md:w-2/3 text-center md:text-left">
      <div className="h-10 bg-gray-200 w-3/4 mb-4 rounded"></div>
      <div className="h-6 bg-gray-200 w-full mb-2 rounded"></div>
      <div className="h-6 bg-gray-200 w-5/6 mb-8 rounded"></div>
      <div className="flex items-baseline justify-center md:justify-start mb-8">
        <div className="h-12 bg-gray-200 w-1/4 rounded mr-4"></div>
        <div className="h-6 bg-gray-200 w-1/6 rounded"></div>
      </div>
      <div className="h-16 bg-gray-200 w-2/3 rounded-lg mb-4"></div>
      <div className="h-8 bg-gray-200 w-1/3 rounded"></div>
    </div>
  </div>
);


const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { handleAddToCart } = useCarrito(); 

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <ProductDetailSkeleton />;
  }

  if (error) {
    return <div className="text-center text-3xl font-semibold text-red-600 mt-20">Error al cargar el producto: {error.message}</div>;
  }

  if (!product) {
    return <div className="text-center text-3xl font-semibold text-gray-700 mt-20">Producto no encontrado.</div>;
  }

  return (
    <div className="bg-white p-12 rounded-2xl shadow-2xl max-w-6xl mx-auto mt-10 flex flex-col md:flex-row items-center md:items-start space-y-10 md:space-y-0 md:space-x-16 border border-gray-100">
      <div className="md:w-1/3 flex justify-center items-center p-6 bg-gray-50 rounded-xl shadow-inner-lg">
        <img src={product.image} alt={product.title} className="w-72 h-72 object-contain transform hover:scale-105 transition-transform duration-300" />
      </div>
      <div className="md:w-2/3 text-center md:text-left">
        <h2 className="text-5xl font-bold text-gray-900 mb-5 leading-tight">{product.title}</h2>
        <p className="text-gray-700 text-xl mb-8 leading-relaxed">{product.description}</p>
        <div className="flex items-baseline justify-center md:justify-start mb-8">
          <p className="text-6xl font-extrabold text-green-700 mr-4">${product.price.toFixed(2)}</p>
          <span className="text-gray-500 text-xl line-through">$ {(product.price * 1.25).toFixed(2)}</span>
        </div>
        <button
          onClick={() => handleAddToCart(product)} // Usamos handleAddToCart del contexto
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4.5 px-12 rounded-lg text-2xl transition-all duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-70 transform hover:-translate-y-0.5"
        >
          Agregar al Carrito
        </button>
        <Link to="/products" className="block mt-8 text-blue-700 hover:underline text-xl font-medium transition-colors duration-200">
          ← Volver a todos los productos
        </Link>
      </div>
    </div>
  );
};

export default ProductDetailPage;