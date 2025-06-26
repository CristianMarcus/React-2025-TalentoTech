// src/pages/ProductsPage.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';

// Importar componentes de React-Bootstrap
import { Container, Row, Col, Card, Button as BootstrapButton, Form, Pagination, InputGroup } from 'react-bootstrap';

// Asumiendo que ProductCard maneja su propio estilo internamente,
// DEBERÁS REVISAR ProductCard.jsx para asegurarte de que también use Bootstrap
import ProductCard from '../components/ProductList/ProductCard';

const MOCKAPI_PRODUCTS_URL = "https://68599f039f6ef9611153b9ee.mockapi.io/api/v1/productos";

// Componente Skeleton para la carga (Actualizado con Bootstrap y animación de pulso)
const ProductCardSkeleton = () => (
  <Card className="h-100 shadow-sm" style={{ overflow: 'hidden' }}>
    {/* Aplica la clase animate-pulse aquí */}
    <div className="w-100 bg-secondary animate-pulse" style={{ height: '200px' }}></div>
    <Card.Body className="d-flex flex-column">
      <div className="bg-light rounded mb-2 animate-pulse" style={{ height: '24px', width: '75%' }}></div>
      <div className="bg-light rounded mb-4 animate-pulse" style={{ height: '20px', width: '50%' }}></div>
      <div className="bg-light rounded mb-4 animate-pulse" style={{ height: '16px', width: '100%' }}></div>
      <div className="bg-light rounded animate-pulse" style={{ height: '40px', width: '100%' }}></div>
    </Card.Body>
  </Card>
);

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Estados para la paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8); // Número de productos por página

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(MOCKAPI_PRODUCTS_URL);
        if (!response.ok) {
          throw new Error('Error al cargar los productos del catálogo.');
        }
        const data = await response.json();
        // === CAMBIO CLAVE AQUÍ: Mapear 'avatar' a 'image' ===
        const productsWithImage = data.map(product => ({
          ...product,
          image: product.avatar // Asigna el valor de 'avatar' a 'image'
        }));
        setProducts(productsWithImage); // Usa los productos con la propiedad 'image'
      } catch (err) {
        console.error("Error al obtener productos para la tienda:", err);
        setError(err.message || 'No se pudieron cargar los productos.');
        toast.error('Error al cargar los productos. Por favor, inténtalo de nuevo más tarde.', {
          position: "top-right",
          autoClose: 3000,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Lógica de filtrado de productos con useMemo
  const filteredProducts = useMemo(() => {
    setCurrentPage(1); // Resetear a la primera página cuando el filtro cambia
    if (!searchTerm) {
      return products;
    }
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    return products.filter(product =>
      product.name.toLowerCase().includes(lowercasedSearchTerm) ||
      (product.category && product.category.toLowerCase().includes(lowercasedSearchTerm))
    );
  }, [products, searchTerm]);

  // Lógica de paginación
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <>
      <Helmet>
        <title>Catálogo de Productos - Mi Tienda E-commerce</title>
        <meta name="description" content="Explora nuestro extenso catálogo de productos electrónicos. Encuentra las mejores ofertas y la última tecnología. Busca por nombre o categoría y navega por las páginas de productos." />
        <meta name="keywords" content="productos, catálogo, tienda online, electrónica, ofertas, comprar, gadgets, tecnología, buscar productos, filtrar, paginación, páginas" />
      </Helmet>

      <Container className="p-4 my-4">
        <h1 className="display-4 fw-bold text-center text-yellow mb-5">Nuestros Productos</h1>

        {/* Barra de Búsqueda con Icono */}
        <Row className="justify-content-center mb-4">
          <Col xs={12} md={6} lg={6}>
            <InputGroup>
              <InputGroup.Text className="p-3 border rounded-start shadow-sm" style={{ borderColor: 'transparent' }}>
                {/* El icono es decorativo, no necesita ARIA */}
                <i className="bi bi-search text-secondary"></i>
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Buscar productos por nombre o categoría..."
                className="p-3 border rounded-end shadow-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                // MEJORA: Añadir aria-label para el campo de búsqueda
                aria-label="Buscar productos por nombre o categoría"
              />
            </InputGroup>
          </Col>
        </Row>

        {loading && (
          <Row xs={1} sm={2} md={3} lg={4} className="g-4">
            {[...Array(productsPerPage)].map((_, index) => (
              <Col key={index}>
                <ProductCardSkeleton />
              </Col>
            ))}
          </Row>
        )}
        {error && (
          <p className="text-center text-danger fs-5">Error: {error}</p>
        )}
        {!loading && !error && filteredProducts.length === 0 && (
          <p className="text-center text-secondary fs-5">
            {searchTerm ? `No se encontraron productos que coincidan con "${searchTerm}".` : 'No hay productos disponibles en la tienda.'}
          </p>
        )}

        {!loading && !error && filteredProducts.length > 0 && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <Row xs={1} sm={2} md={3} lg={4} className="g-4">
              {currentProducts.map((product) => (
                <Col key={product.id}>
                  {/* Asegúrate de que ProductCard sea accesible (imágenes con alt, botones con labels) */}
                  <ProductCard
                    product={product}
                    variants={itemVariants}
                  />
                </Col>
              ))}
            </Row>
          </motion.div>
        )}

        {/* <-- Paginación --> */}
        {!loading && !error && filteredProducts.length > productsPerPage && (
          <Row className="mt-5">
            <Col className="d-flex justify-content-center">
              <Pagination aria-label="Navegación de páginas de productos"> {/* MEJORA: Etiqueta ARIA para la navegación de paginación */}
                <Pagination.Prev
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  aria-label="Ir a la página anterior de productos" // MEJORA: Etiqueta ARIA para botón "Anterior"
                />
                {Array.from({ length: totalPages }, (_, i) => (
                  <Pagination.Item
                    key={i + 1}
                    active={i + 1 === currentPage}
                    onClick={() => paginate(i + 1)}
                    aria-label={`Ir a la página ${i + 1} de productos`} // MEJORA: Etiqueta ARIA para cada número de página
                  >
                    {i + 1}
                  </Pagination.Item>
                ))}
                <Pagination.Next
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  aria-label="Ir a la página siguiente de productos" // MEJORA: Etiqueta ARIA para botón "Siguiente"
                />
              </Pagination>
            </Col>
          </Row>
        )}
        {/* <-- Fin Paginación --> */}

      </Container>
    </>
  );
};

export default ProductsPage;