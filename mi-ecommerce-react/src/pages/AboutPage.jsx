// src/pages/AboutPage.jsx
import React from 'react';
import { Helmet } from 'react-helmet-async';
// Importar componentes de React-Bootstrap
import { Container, Card } from 'react-bootstrap';

const AboutPage = () => {
  return (
    <>
      <Helmet>
        {/*
          Los metadatos son cruciales para la accesibilidad (y SEO).
          Proporcionan contexto sobre el contenido de la página para los motores de búsqueda
          y, lo que es más importante, para los usuarios de tecnologías de asistencia.
          Los títulos y descripciones son concisos y descriptivos.
        */}
        <title>Acerca de Nosotros - Mi Tienda E-commerce</title>
        <meta name="description" content="Conoce más sobre Mi Tienda E-commerce, un proyecto ficticio creado para demostración de tecnologías web modernas como React, Vite y Bootstrap." />
        <meta name="keywords" content="acerca de, sobre nosotros, proyecto React, demo, e-commerce ficticio, Vite, Bootstrap" />
      </Helmet>
      
      {/*
        El Container de Bootstrap proporciona un ancho controlado y centrado,
        lo que mejora la legibilidad en pantallas grandes.
      */}
      <Container className="my-5">
        {/*
          Card es un contenedor visual.
          Sus clases de Bootstrap (`bg-white`, `p-4`, `rounded-4`, `shadow-lg`, `border`, `text-center`)
          son puramente para estilo y no requieren atributos ARIA adicionales.
          El `maxWidth` y `margin: '0 auto'` aseguran que el contenido no se extienda demasiado,
          lo que mejora la legibilidad.
        */}
        <Card className="bg-white p-4 p-md-5 rounded-4 shadow-lg border border-light text-center" style={{ maxWidth: '48rem', margin: '0 auto' }}>
          <Card.Body>
            {/*
              Un `<h2>` es apropiado para un título de sección dentro de una página.
              Asumiendo que hay un `<h1>` a nivel de la aplicación o un título de página principal,
              esto mantiene la jerarquía de encabezados semántica y lógica.
              El texto es claro y conciso.
            */}
            <h2 className="display-5 fw-bold text-dark mb-4">Acerca de Mi eCommerce</h2>
            
            {/*
              Los párrafos (`<p>`) son el elemento semántico correcto para el contenido textual.
              Las clases de Bootstrap (`fs-5`, `text-secondary`, `mb-4`, `text-muted`, `mt-4`)
              manejan el tamaño, color y espaciado.
              Es importante que las combinaciones de color tengan un contraste suficiente
              para la legibilidad (las clases de Bootstrap suelen cumplir con esto).
            */}
            <p className="fs-5 text-secondary mb-4">
              Mi eCommerce es una plataforma ficticia creada con fines educativos y de demostración,
              utilizando las últimas tecnologías de desarrollo web como React, Vite y **Bootstrap**.
              Nos enfocamos en construir experiencias de usuario intuitivas y visualmente atractivas.
            </p>
            <p className="fs-5 text-secondary mb-4">
              Explora nuestros productos de ejemplo provistos por la API de Fake Store,
              simula un carrito de compras y experimenta una navegación fluida.
            </p>
            <p className="fs-5 text-secondary mb-4">
              Este proyecto busca demostrar la integración de diferentes funcionalidades clave en una aplicación de comercio electrónico moderna,
              desde la gestión de estado y el consumo de APIs hasta la implementación de rutas dinámicas y protegidas.
            </p>
            <p className="text-muted mt-4">¡Gracias por explorar nuestro trabajo!</p>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default AboutPage;