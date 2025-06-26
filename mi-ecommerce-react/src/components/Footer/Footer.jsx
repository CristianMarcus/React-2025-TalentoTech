// src/components/Footer/Footer.jsx
import React from 'react';
// Importar componentes de React-Bootstrap para el layout de grilla
import { Container, Row, Col } from 'react-bootstrap';
// Importar los iconos de desarrollador (FaCode), WhatsApp (FaWhatsapp) y Email (FaEnvelope)
import { FaCode, FaWhatsapp, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const whatsappNumber = '5491126884940'; // Tu número de WhatsApp con código de país (54) y de área (911 para móviles de CABA/GBA)
  const whatsappLink = `https://wa.me/${whatsappNumber}`;
  const emailAddress = 'cristianmarcus34@gmail.com';
  const emailLink = `mailto:${emailAddress}`;

  return (
    <footer className="footer mt-auto">
      <Container className="text-center">

        {/* Título de Copyright */}
        <p className="fs-4 fw-bold mb-4">
          &copy; {currentYear} Mi eCommerce. Todos los derechos reservados.
        </p>

        {/* Sección de dos columnas para "Proyecto Desarrollado Por" y "Detalles del Curso" */}
        <Row className="justify-content-center g-4 mb-5">

          {/* Columna 1: Proyecto Desarrollado Por */}
          <Col xs={12} md={6} lg={6}>
            <div className="bg-secondary p-4 rounded-3 shadow h-100 d-flex flex-column justify-content-center">
              <h3 className="fs-5 fw-semibold text-white mb-2">Proyecto Desarrollado Por:</h3>
              <p className="fs-6 text-light d-flex align-items-center justify-content-center mb-1">
                <span className="text-info fw-bold fs-4">Cristian Marcus</span>
              </p>
              <p className="fs-6 text-light mb-1">
                <span className="fw-semibold text-muted">DNI:</span> 34.738.462
              </p>
              <p className="small text-muted mt-2 mb-0">
                Parte del curso: <span className="fw-semibold">React (talento-tech) - Proyecto Final </span>
              </p>
            </div>
          </Col>

          {/* Columna 2: Detalles del Curso */}
          <Col xs={12} md={6} lg={6}>
            <div className="bg-secondary p-4 rounded-3 shadow h-100 d-flex flex-column justify-content-center">
              <h3 className="fs-5 fw-semibold text-white mb-2">Detalles del Curso:</h3>
              <p className="fs-6 text-light mb-1">
                <span className="fw-semibold text-muted">Curso:</span> React (talento-tech) - Entrega: Proyecto Final
              </p>
              <p className="small text-muted mb-1">
                Instructor/a: <a href="mailto:nicolas.fernandez4@bue.edu.ar" className="text-info text-decoration-none">nicolas.fernandez4@bue.edu.ar</a>
              </p>
              <p className="small text-muted mb-0">
                Tutor/a: <a href="mailto:amancay.arribillaga@bue.edu.ar" className="text-info text-decoration-none">amancay.arribillaga@bue.edu.ar</a>
              </p>
            </div>
          </Col>

        </Row>

        {/* Separador (hr de Bootstrap) */}
        <hr className="border-secondary w-50 mx-auto my-5" />

        {/* SECCIÓN MODIFICADA: Desarrollo 'POWA' con iconos de WhatsApp y Email */}
        <div className="my-4">
          <p className="fs-6 text-white-50 mb-3"> {/* Aumentado mb para más espacio */}
            Desarrollo <span className="text-warning fw-bold">'POWA'</span>
          </p>
          <div className="d-flex justify-content-center align-items-center gap-4"> {/* Contenedor para los iconos */}
            {/* Icono de WhatsApp */}
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-success text-decoration-none" // Color verde para WhatsApp
              aria-label="Contactar por WhatsApp"
              style={{ fontSize: '2.5rem', transition: 'transform 0.2s ease-in-out', display: 'inline-block' }}
              onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'}
              onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              <FaWhatsapp />
            </a>

            {/* Icono de Email */}
            <a
              href={emailLink}
              className="text-info text-decoration-none" // Color azul para Email
              aria-label="Contactar por Email"
              style={{ fontSize: '2.5rem', transition: 'transform 0.2s ease-in-out', display: 'inline-block' }}
              onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'}
              onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              <FaEnvelope />
            </a>
          </div>
        </div>

        {/* Slogan */}
        <p className="small text-white mt-3 fst-italic">
          "Donde la tecnología se encuentra con el talento."
        </p>
      </Container>
    </footer>
  );
};

export default Footer;