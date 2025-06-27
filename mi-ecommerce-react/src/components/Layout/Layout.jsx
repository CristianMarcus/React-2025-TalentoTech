// src/components/Layout/Layout.jsx
import React, { useState, useEffect } from 'react'; // ¡Importamos useState y useEffect!
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { FaArrowUp } from 'react-icons/fa'; // ¡Importamos el ícono de la flecha!

const Layout = ({ children }) => {
  // Estado para controlar si el botón "Volver Arriba" debe mostrarse
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  // Función para desplazar la página suavemente hasta arriba
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' 
    });
  };

  // Efecto para escuchar el evento de scroll y decidir si mostrar u ocultar el botón
  useEffect(() => {
    const handleScroll = () => {
      // Si el usuario se desplazó más de 300 píxeles hacia abajo, mostramos el botón
      if (window.scrollY > 300) {
        setShowScrollToTop(true);
      } else {
        // De lo contrario, lo ocultamos
        setShowScrollToTop(false);
      }
    };

    // Añadimos el "escuchador" de eventos para el scroll cuando el componente se monta
    window.addEventListener('scroll', handleScroll);

    // Función de limpieza: removemos el "escuchador" de eventos cuando el componente se desmonta
    // Esto es crucial para evitar problemas de rendimiento y fugas de memoria
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // El array vacío significa que este efecto solo se ejecuta una vez al montar y una vez al desmontar

  return (
    <div className="d-flex flex-column min-vh-100"> 
      <Header />
      {/* Añadimos la clase 'main-content-wrapper' aquí */}
      <main className="flex-grow-1 container my-4 px-3 main-content-wrapper"> 
        {children}
      </main>
      <Footer />

      {/* Renderizamos el botón "Volver Arriba" solo si showScrollToTop es true */}
      {showScrollToTop && (
        <button
          onClick={scrollToTop} // Al hacer clic, subimos la página
          className="btn btn-primary rounded-circle shadow-lg" // Clases de Bootstrap para el estilo
          aria-label="Volver arriba" // Etiqueta accesible para lectores de pantalla
          style={{ // Estilos en línea para posicionamiento y tamaño
            position: 'fixed', // Hace que el botón se quede fijo en la pantalla
            bottom: '90px',    // A 20px del borde inferior
            right: '20px',     // A 20px del borde derecho
            zIndex: 1050,      // Asegura que esté por encima de la mayoría del contenido (Navbar tiene 1060)
            width: '55px',     // Ancho del botón
            height: '55px',    // Alto del botón
            display: 'flex',   // Para centrar el ícono dentro del botón
            justifyContent: 'center', // Centra horizontalmente el ícono
            alignItems: 'center',     // Centra verticalmente el ícono
            border: 'none',    // Quitamos el borde
            color: 'white',    // Color del ícono
            // Opcional: puedes añadir 'transition' para una aparición/desaparición más suave
            // transition: 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out',
            // opacity: 1, // Esto se controla con la condición 'showScrollToTop'
            // transform: 'translateY(0)'
          }}
        >
          <FaArrowUp className="fs-4" /> {/* El ícono de flecha de Font Awesome */}
        </button>
      )}
    </div>
  );
};

export default Layout;