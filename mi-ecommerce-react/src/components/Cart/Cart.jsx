// src/components/Cart/Cart.jsx
import React from 'react';
import CartItem from './CartItem';
import { Link } from 'react-router-dom';
import { useCarrito } from '../../context/CarritoContext'; // ¡Importamos el custom hook!

// Cart ya no necesita cartItems, onUpdateQuantity, onRemoveItem como props
const Cart = () => {
  const { cartItems, handleUpdateQuantity, handleRemoveItem } = useCarrito(); // Obtenemos todo del contexto

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="bg-white p-12 rounded-2xl shadow-2xl max-w-5xl mx-auto mt-10 border border-gray-100">
      <h2 className="text-4xl font-bold text-gray-800 mb-10 text-center">Tu Carrito de Compras</h2>
      {cartItems.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-600 text-2xl mb-8">Tu carrito está vacío. ¡Descubre productos increíbles!</p>
          <Link to="/products" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-10 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg text-xl transform hover:-translate-y-0.5">
            Ir a Productos
          </Link>
        </div>
      ) : (
        <>
          <div className="divide-y divide-gray-100 mb-8">
            {cartItems.map(item => (
              <CartItem
                key={item.id}
                item={item}
                onUpdateQuantity={handleUpdateQuantity} // Usamos del contexto
                onRemoveItem={handleRemoveItem} // Usamos del contexto
              />
            ))}
          </div>
          <div className="flex justify-between items-center mt-10 pt-8 border-t-2 border-gray-300">
            <h3 className="text-3xl font-bold text-gray-800">Total:</h3>
            <p className="text-4xl font-extrabold text-green-700">${total.toFixed(2)}</p>
          </div>
          <button className="bg-green-600 hover:bg-green-700 text-white font-semibold py-5 px-10 rounded-lg w-full mt-12 text-2xl transition-all duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-70 transform hover:-translate-y-0.5">
            Finalizar Compra
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;