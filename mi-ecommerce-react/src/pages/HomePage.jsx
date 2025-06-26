// src/pages/HomePage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

// Importar componentes de React-Bootstrap
import { Container, Button } from 'react-bootstrap';

const HomePage = () => {
  return (
    <>
      <Helmet>
        {/* Títulos y descripciones SEO principales */}
        <title>Inicio - Mi eCommerce: Tu Tienda de Electrónica Online</title>
        <meta name="description" content="Bienvenido a Mi eCommerce. Descubre nuestra exclusiva colección de productos electrónicos de alta calidad: desde Smart TVs hasta electrodomésticos para el hogar. Innovación y estilo te esperan." />
        <meta name="keywords" content="eCommerce, tienda online, productos electrónicos, comprar, ofertas, tecnología, electrodomésticos, Smart TV, neveras, lavadoras, hogar inteligente" />

        {/* Open Graph Tags (para Facebook, LinkedIn y otras redes sociales) */}
        <meta property="og:title" content="Mi eCommerce: Tu Tienda de Electrónica Online" />
        <meta property="og:description" content="Descubre nuestra exclusiva colección de productos electrónicos de alta calidad: desde Smart TVs hasta electrodomésticos para el hogar." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.tudominio.com/" />
        <meta property="og:image" content="https://www.tudominio.com/images/home_banner_og.jpg" />
        <meta property="og:site_name" content="Mi eCommerce" />

        {/* Twitter Card Tags (para Twitter) */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@tu_usuario_twitter" />
        <meta name="twitter:title" content="Mi eCommerce: Tu Tienda de Electrónica Online" />
        <meta name="twitter:description" content="Descubre nuestra exclusiva colección de productos electrónicos de alta calidad." />
        <meta name="twitter:image" content="https://www.tudominio.com/images/home_banner_twitter.jpg" />
      </Helmet>

      {/* Contenedor principal del banner de bienvenida */}
      <div className="text-center py-5 bg-light rounded-5 shadow-lg my-5">
        <h1 className="display-3 fw-bold text-dark mb-4">
          Bienvenido a <span className="text-primary">Mi</span> <span className="text-info">eCommerce</span>
          <p className='text-warning'>TalentoTech Digital</p>
        </h1>
        <p className="fs-5 text-secondary mb-5 mx-auto" style={{ maxWidth: '48rem' }}>
          Descubre nuestra exclusiva colección de productos electrónicos.
          Calidad, innovación y estilo te esperan para una experiencia de compra sin igual.
        </p>
        <Button
          as={Link} // Usar 'as={Link}' para integrar con react-router-dom
          to="/products"
          variant="primary"
          size="lg"
          // === AÑADIDO text-decoration-none aquí ===
          className="rounded-pill px-5 py-3 fs-5 shadow-lg text-decoration-none"
        >
          Explorar Productos Ahora
        </Button>
      </div>
    </>
  );
};

export default HomePage;