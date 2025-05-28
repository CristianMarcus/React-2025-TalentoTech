// src/components/Header/Header.jsx
import React, { useState } from 'react'; // Importamos useState
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCarrito } from '../../context/CarritoContext';

const Header = () => {
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();
  const { cartItems } = useCarrito();

  // Estado para controlar la visibilidad del menú móvil
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const totalCartItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  const getLinkClasses = (path) => {
    let classes = "transition-all duration-300 transform hover:-translate-y-0.5";
    if (path === '/' && location.pathname === '/') {
      classes += " text-blue-200 font-bold border-b-2 border-blue-200 pb-1";
    } else if (path !== '/' && location.pathname.startsWith(path)) {
      classes += " text-blue-200 font-bold border-b-2 border-blue-200 pb-1";
    } else {
      classes += " hover:text-blue-200";
    }
    return classes;
  };

  return (
    <header className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white p-5 shadow-xl relative z-10">
      <nav className="container mx-auto flex justify-between items-center flex-wrap">
        <Link to="/" className="text-4xl font-extrabold tracking-tight hover:text-blue-200 transition-colors duration-300 transform hover:scale-105">
          Mi <span className="text-purple-300">eCommerce</span>
        </Link>

        {/* Botón de hamburguesa para móviles */}
        <button
          className="md:hidden text-white text-3xl focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Abrir menú"
        >
          {isMobileMenuOpen ? '✕' : '☰'} {/* Icono de "X" o "hamburguesa" */}
        </button>

        {/* Menú de navegación */}
        <ul
          className={`
            ${isMobileMenuOpen ? 'flex' : 'hidden'}
            md:flex flex-col md:flex-row justify-center md:justify-end
            space-y-4 md:space-y-0 space-x-0 md:space-x-8 text-xl font-medium
            mt-4 md:mt-0 w-full md:w-auto
            bg-gradient-to-r from-blue-700 to-indigo-800 md:bg-none
            p-4 md:p-0 rounded-lg md:rounded-none
          `}
          // Opcional: Cerrar menú móvil al hacer clic en un enlace
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <li><Link to="/" className={getLinkClasses("/")}>Inicio</Link></li>
          <li><Link to="/products" className={getLinkClasses("/products")}>Productos</Link></li>
          
          <li>
            <Link to="/cart" className={`${getLinkClasses("/cart")} relative`}>
              Carrito
              {totalCartItems > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                  {totalCartItems}
                </span>
              )}
            </Link>
          </li>
          
          <li><Link to="/about" className={getLinkClasses("/about")}>Acerca de</Link></li>
          
          {isAuthenticated ? (
            <>
              <li><Link to="/dashboard" className={getLinkClasses("/dashboard")}>Dashboard</Link></li>
              <li>
                <button
                  onClick={logout}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-5 rounded-md text-lg transition-colors duration-300 transform hover:-translate-y-0.5"
                >
                  Salir
                </button>
              </li>
            </>
          ) : (
            <li><Link to="/login" className={getLinkClasses("/login")}>Login</Link></li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;