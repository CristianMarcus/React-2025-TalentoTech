// src/components/Layout/Layout.jsx
import React from 'react';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto p-6 md:p-10 lg:p-12"> {/* Más padding para espacio */}
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;