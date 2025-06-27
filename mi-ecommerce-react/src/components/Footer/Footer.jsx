// src/components/Footer/Footer.jsx
import React from 'react';

import { Container, Row, Col } from 'react-bootstrap';

import { FaCode, FaWhatsapp, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const whatsappNumber = '5491126884940'; 
  const whatsappLink = `https://wa.me/${whatsappNumber}`;
  const emailAddress = 'cristianmarcus34@gmail.com';
  const emailLink = `mailto:${emailAddress}`;

  return (
    <footer className="footer mt-auto">
      <Container className="text-center">

        
        <p className="fs-4 fw-bold mb-4">
          &copy; {currentYear} Mi eCommerce. Todos los derechos reservados.
        </p>

        
        <Row className="justify-content-center g-4 mb-5">

          
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

        
        <hr className="border-secondary w-50 mx-auto my-5" />

        
        <div className="my-4">
          <p className="fs-6 text-white-50 mb-3"> 
            Desarrollo <span className="text-warning fw-bold">'POWA'</span>
          </p>
          <div className="d-flex justify-content-center align-items-center gap-4"> 
            
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-success text-decoration-none" 
              aria-label="Contactar por WhatsApp"
              style={{ fontSize: '2.5rem', transition: 'transform 0.2s ease-in-out', display: 'inline-block' }}
              onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'}
              onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              <FaWhatsapp />
            </a>

           
            <a
              href={emailLink}
              className="text-info text-decoration-none" 
              aria-label="Contactar por Email"
              style={{ fontSize: '2.5rem', transition: 'transform 0.2s ease-in-out', display: 'inline-block' }}
              onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'}
              onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
            >
              <FaEnvelope />
            </a>
          </div>
        </div>

       
        <p className="small text-white mt-3 fst-italic">
          "Donde la tecnología se encuentra con el talento."
        </p>
      </Container>
    </footer>
  );
};

export default Footer;