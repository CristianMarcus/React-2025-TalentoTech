// src/components/ProductList/ProductCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useCarrito } from '../../context/CarritoContext';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

// Importar componentes de React-Bootstrap
import { Card, Button } from 'react-bootstrap';

// === NUEVO: Definición del PLACEHOLDER_IMAGE ===
const PLACEHOLDER_IMAGE = 'https://via.placeholder.com/400x300?text=Imagen+No+Disponible';

const ProductCard = ({ product, variants }) => {
  const { handleAddToCart } = useCarrito();

  if (!product) {
    return null;
  }

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      whileHover={{ scale: 1.05, boxShadow: '0 15px 25px rgba(0, 0, 0, 0.4)' }}
      whileTap={{ scale: 0.98 }}
      className="h-100"
    >
      <Card className="bg-white rounded-4 shadow-lg border border-light p-4 d-flex flex-column h-100 text-center">
        {/* Enlace a detalles del producto - AÑADIDO aria-label */}
        <Link to={`/products/${product.id}`} className="d-block mx-auto mb-3" aria-label={`Ver detalles de ${product.name}`}>
          <Card.Img
            variant="top"
            // === CAMBIO CRÍTICO AQUÍ: Ahora usando product.image ===
            src={product.image && product.image.trim() !== '' ? product.image : PLACEHOLDER_IMAGE}
            alt={product.name}
            className="rounded-3 shadow-sm"
            style={{ width: '12rem', height: '12rem', objectFit: 'contain' }}
            onError={(e) => {
              e.currentTarget.onerror = null; // Previene bucles infinitos de error
              e.currentTarget.src = PLACEHOLDER_IMAGE; // Establece la imagen de placeholder
              console.warn(`Error al cargar la imagen para el producto ${product.name} (ID: ${product.id}). Usando placeholder.`);
            }}
          />
        </Link>
        <Card.Body className="d-flex flex-column align-items-center text-center p-0 flex-grow-1">
          <Card.Title className="h5 fw-semibold text-dark mb-2" style={{ overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
            {product.name}
          </Card.Title>
          <Card.Text className="small text-body mb-3" style={{ overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', lineHeight: '1.4' }}>
            {product.description}
          </Card.Text>
          <p className="h4 fw-bold text-success mb-4 mt-auto">${product.price?.toFixed(2) || '0.00'}</p>
        </Card.Body>

        <div className="d-flex flex-column gap-2 w-100">
          {/* Botón Agregar al Carrito - No necesita aria-label, el texto es claro */}
          <motion.button
            onClick={() => {
              handleAddToCart(product);
              toast.success(`${product.name} agregado al carrito!`, {
                position: "top-right",
                autoClose: 2000,
              });
            }}
            className="btn btn-primary fw-semibold py-2 px-4 rounded-3 shadow w-100"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Agregar al Carrito
          </motion.button>
          {/* Botón Ver Detalles - No necesita aria-label, el texto es claro */}
          <Button
            as={Link}
            to={`/products/${product.id}`}
            className="btn btn-primary fw-semibold py-2 px-4 rounded-3 shadow w-100"
          >
            Ver Detalles
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};

export default ProductCard;