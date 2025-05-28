// src/pages/AboutPage.jsx
import React from 'react';

const AboutPage = () => {
  return (
    <div className="bg-white p-12 rounded-2xl shadow-2xl max-w-4xl mx-auto mt-10 border border-gray-100 text-center">
      <h2 className="text-4xl font-bold text-gray-800 mb-8">Acerca de Mi eCommerce</h2>
      <p className="text-lg text-gray-700 mb-6 leading-relaxed">
        Mi eCommerce es una plataforma ficticia creada con fines educativos y de demostración,
        utilizando las últimas tecnologías de desarrollo web como React, Vite y Tailwind CSS.
        Nos enfocamos en construir experiencias de usuario intuitivas y visualmente atractivas.
      </p>
      <p className="text-lg text-gray-700 mb-6 leading-relaxed">
        Explora nuestros productos de ejemplo provistos por la API de Fake Store,
        simula un carrito de compras y experimenta una navegación fluida.
      </p>
      <p className="text-lg text-gray-700 mb-6 leading-relaxed">
        Este proyecto busca demostrar la integración de diferentes funcionalidades clave en una aplicación de comercio electrónico moderna,
        desde la gestión de estado y el consumo de APIs hasta la implementación de rutas dinámicas y protegidas.
      </p>
      <p className="text-md text-gray-500 mt-8">¡Gracias por explorar nuestro trabajo!</p>
    </div>
  );
};

export default AboutPage;