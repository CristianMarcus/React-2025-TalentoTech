

import { Helmet } from 'react-helmet-async'
import { Container, Card } from 'react-bootstrap';

const AboutPage = () => {
  return (
    <>
      <Helmet>
        <title>Acerca de Nosotros - Mi Tienda E-commerce</title>
        <meta name="description" content="Conoce más sobre Mi Tienda E-commerce, un proyecto ficticio creado para demostración de tecnologías web modernas como React, Vite y Bootstrap." />
        <meta name="keywords" content="acerca de, sobre nosotros, proyecto React, demo, e-commerce ficticio, Vite, Bootstrap" />
      </Helmet>
      
      
      <Container className="my-5">
       
        <Card className="bg-white p-4 p-md-5 rounded-4 shadow-lg border border-light text-center" style={{ maxWidth: '48rem', margin: '0 auto' }}>
          <Card.Body>
            
            <h2 className="display-5 fw-bold text-dark mb-4">Acerca de Mi eCommerce</h2>
            
           
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