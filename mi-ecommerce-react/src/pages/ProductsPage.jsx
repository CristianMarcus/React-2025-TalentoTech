// src/pages/ProductsPage.jsx
import React from 'react';
import ProductList from '../components/ProductList/ProductList';

const ProductsPage = () => {
  return (
    <div>
      <h1 className="text-5xl font-extrabold text-gray-900 mb-10 text-center">Nuestros Productos</h1>
      <ProductList /> 
    </div>
  );
};

export default ProductsPage;