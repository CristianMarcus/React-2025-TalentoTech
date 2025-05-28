
import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-gray-900 to-black text-gray-200 py-12 mt-20 shadow-xl">
      <div className="container mx-auto px-6 text-center">
        
        <p className="text-xl md:text-2xl font-bold mb-6 tracking-wide">
          © {currentYear} Mi eCommerce. Todos los derechos reservados.
        </p>

        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-8">

          
          <div className="bg-gray-800 p-6 rounded-xl shadow-md transform hover:scale-105 transition-transform duration-300">
            <h3 className="text-lg font-semibold text-white mb-3">Proyecto Desarrollado Por:</h3>
            <p className="text-md text-gray-300 flex items-center justify-center">
              <span className="text-blue-400 font-bold text-xl">Cristian Marcus</span>
            </p>
            <p className="text-md text-gray-300 mt-2">
              <span className="font-semibold text-gray-400">DNI:</span> 34.738.462
            </p>
            <p className="text-sm text-gray-400 mt-2">
              Parte del curso: <span className="font-semibold">React (talento-tech) - Pre-Entrega 1</span>
            </p>
          </div>

          
          <div className="bg-gray-800 p-6 rounded-xl shadow-md transform hover:scale-105 transition-transform duration-300">
            <h3 className="text-lg font-semibold text-white mb-2">Detalles del Curso:</h3>
            <p className="text-md text-gray-300">
              <span className="font-semibold text-gray-400">Curso:</span> React (talento-tech) - Pre-Entrega 1
            </p>
            <p className="text-sm text-gray-400 mt-2">
              Instructor/a: <a href="mailto:nicolas.fernandez4@bue.edu.ar" className="text-blue-300 hover:underline">nicolas.fernandez4@bue.edu.ar</a>
            </p>
            <p className="text-sm text-gray-400">
              Tutor/a: <a href="mailto:amancay.arribillaga@bue.edu.ar" className="text-blue-300 hover:underline">amancay.arribillaga@bue.edu.ar</a>
            </p>
          </div>

        </div>

        
        <hr className="border-gray-700 w-1/3 mx-auto my-8" />

        
        <p className="text-sm text-gray-500 mt-6 italic">
          "Donde la tecnología se encuentra con el talento."
        </p>
      </div>
    </footer>
  );
};

export default Footer;