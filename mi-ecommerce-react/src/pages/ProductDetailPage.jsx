
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCarrito } from '../context/CarritoContext';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';


import { Container, Row, Col, Card, Button, Placeholder } from 'react-bootstrap';
import { MOCKAPI_PRODUCTS_URL } from '../Config/api';


const ProductDetailSkeleton = () => (
  <Container className="p-4 my-5">
    <Card className="p-4 rounded-3 shadow-lg border border-light animate-pulse d-flex flex-column flex-md-row align-items-center align-items-md-start gap-4">
      
      <Col md={4} className="d-flex justify-content-center align-items-center p-3 bg-light rounded-3">
        <Placeholder as="div" animation="glow" className="w-100" style={{ height: '20rem' }}>
          <Placeholder className="w-100 h-100 bg-secondary rounded-3" />
        </Placeholder>
      </Col>
      
      <Col md={8} className="text-center text-md-start">
        
        <Placeholder as="div" animation="glow">
          <Placeholder xs={8} className="h-5 mb-3" />
          <Placeholder xs={12} className="h-4 mb-2" />
          <Placeholder xs={10} className="h-4 mb-4" />
          <div className="d-flex align-items-baseline justify-content-center justify-content-md-start mb-4">
            <Placeholder xs={4} className="h-6 me-3" />
            <Placeholder xs={3} className="h-4" />
          </div>
          <Placeholder xs={8} className="h-6 mb-3 rounded-3" />
          <Placeholder xs={4} className="h-4" />
        </Placeholder>
      </Col>
    </Card>
  </Container>
);

const ProductDetailPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { handleAddToCart } = useCarrito();

  
  const PLACEHOLDER_IMAGE = 'https://via.placeholder.com/400x300?text=Imagen+No+Disponible';

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`${MOCKAPI_PRODUCTS_URL}/${id}`);
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Producto no encontrado.');
          }
          throw new Error(`Error al cargar el producto: ${response.statusText}`);
        }
        const data = await response.json();
        
        const productWithImage = {
          ...data,
          image: data.avatar 
        };
        setProduct(productWithImage);
      } catch (err) {
        console.error("Error al obtener detalle del producto:", err);
        setError(err.message || 'No se pudo cargar el detalle del producto.');
        toast.error('Error al cargar el detalle del producto.');
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const pageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: {
        duration: 0.3,
        ease: "easeIn"
      }
    }
  };

  if (loading) {
    return <ProductDetailSkeleton />;
  }

  if (error) {
    return (
      <motion.div
        className="text-center text-danger fs-5 my-5"
        variants={pageVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <Helmet>
          <title>Error - Producto No Encontrado - Mi Tienda</title>
          <meta name="description" content="Ha ocurrido un error al cargar el producto o el producto no fue encontrado en Mi Tienda E-commerce." />
        </Helmet>
        <Container>
          <p>Error: {error}</p>
          <Link to="/products" className="text-primary text-decoration-none mt-3 d-block">
            Volver a la tienda
          </Link>
        </Container>
      </motion.div>
    );
  }

  if (!product) {
    return (
      <motion.div
        className="text-center text-secondary fs-5 my-5"
        variants={pageVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <Helmet>
          <title>Producto No Encontrado - Mi Tienda</title>
          <meta name="description" content="El producto que buscas no existe o no está disponible en Mi Tienda E-commerce." />
        </Helmet>
        <Container>
          <p>El producto no se encontró.</p>
          <Link to="/products" className="text-primary text-decoration-none mt-3 d-block">
            Volver a la tienda
          </Link>
        </Container>
      </motion.div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{product.name} - Mi Tienda E-commerce</title>
        <meta name="description" content={`Detalles de ${product.name}. Precio: $${(parseFloat(product.price)).toFixed(2)}. ${product.description}`} />
        <meta name="keywords" content={`${product.name}, ${product.category || 'producto'}, ${product.brand || 'marca'}, detalles de producto, comprar, tienda online`} />
      </Helmet>
      <motion.div
        className="my-5"
        variants={pageVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <Container>
          <Card className="rounded-3 shadow-lg border border-light p-4">
            <Row className="g-4 align-items-center">
              
              <Col lg={6} className="d-flex justify-content-center align-items-center p-3 bg-light rounded-3">
                <img
                  src={product.image && product.image.trim() !== '' ? product.image : PLACEHOLDER_IMAGE} 
                  alt={product.name}
                  className="img-fluid rounded-3 shadow-sm"
                  style={{ maxHeight: '24rem', objectFit: 'contain' }}
                  onError={(e) => { 
                    e.currentTarget.onerror = null; 
                    e.currentTarget.src = PLACEHOLDER_IMAGE; 
                    console.warn(`Error al cargar la imagen de ${product.name}. Usando placeholder.`);
                  }}
                />
              </Col>

              
              <Col lg={6} className="d-flex flex-column justify-content-between">
                <div>
                  <h1 className="display-4 fw-bold text-dark mb-3">{product.name}</h1>
                  <p className="lead text-secondary mb-4">{product.description}</p>
                  <p className="display-5 fw-bold text-success mb-4">${(parseFloat(product.price)).toFixed(2) || '0.00'}</p>
                </div>

                <div className="d-flex flex-column flex-sm-row gap-3 mt-4">
                  <motion.button
                    onClick={() => {
                      handleAddToCart(product);
                    }}
                    className="btn btn-primary btn-lg w-100 w-sm-auto fw-bold py-3 px-5 rounded-3 shadow-lg fs-5"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    aria-label={`Agregar ${product.name} al carrito`}
                  >
                    Agregar al Carrito
                  </motion.button>
                  <Link
                    to="/products"
                    className="btn btn-primary btn-lg w-100 w-sm-auto fw-bold py-3 px-5 rounded-3 shadow-lg fs-5"
                  >
                    Volver a la tienda
                  </Link>
                </div>
              </Col>
            </Row>
          </Card>
        </Container>
      </motion.div>
    </>
  );
};

export default ProductDetailPage;