// src/components/Layout/Layout.jsx
import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const Layout = ({ children }) => {
  return (
    <div className="d-flex flex-column min-vh-100"> 
      <Header />
      {/* Añadimos la clase 'main-content-wrapper' aquí */}
      <main className="flex-grow-1 container my-4 px-3 main-content-wrapper"> 
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;