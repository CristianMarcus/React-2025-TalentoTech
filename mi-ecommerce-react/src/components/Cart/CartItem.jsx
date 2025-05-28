// src/components/Cart/CartItem.jsx
import React from 'react';

const CartItem = ({ item, onUpdateQuantity, onRemoveItem }) => {
  return (
    <div className="flex items-center justify-between border-b border-gray-200 py-6 last:border-b-0">
      <div className="flex items-center flex-grow">
        <img src={item.image} alt={item.title} className="w-28 h-28 object-contain mr-6 rounded-xl shadow-md border border-gray-100 p-2" />
        <div className="flex-grow">
          <h4 className="font-semibold text-xl text-gray-800 mb-1">{item.title}</h4>
          <p className="text-gray-600 text-base">${item.price.toFixed(2)}</p>
          <div className="flex items-center mt-4">
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-xl font-semibold"
              disabled={item.quantity === 1}
            >
              -
            </button>
            <span className="mx-4 text-2xl font-medium">{item.quantity}</span>
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors duration-200 text-xl font-semibold"
            >
              +
            </button>
            <button
              onClick={() => onRemoveItem(item.id)}
              className="ml-8 bg-red-500 hover:bg-red-600 text-white text-base py-2 px-5 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>
      <p className="font-bold text-3xl text-green-700 ml-6">${(item.price * item.quantity).toFixed(2)}</p>
    </div>
  );
};

export default CartItem;