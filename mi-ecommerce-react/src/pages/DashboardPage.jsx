
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import ProductForm from '../components/ProductForm/ProductForm';
import ConfirmationModal from '../components/ConfirmationModal';
import { FaEdit, FaTrash, FaPlusCircle } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';


import { Container, Row, Col, Card, Button, Badge, Modal } from 'react-bootstrap';
import { MOCKAPI_PRODUCTS_URL } from '../Config/api';



const DashboardPage = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [productToDeleteId, setProductToDeleteId] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  const PLACEHOLDER_IMAGE = 'https://via.placeholder.com/200x150?text=Imagen+No+Disponible';

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(MOCKAPI_PRODUCTS_URL);
      if (!response.ok) {
        throw new Error(`Error HTTP! Estado: ${response.status}`);
      }
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      console.error("Error al obtener los productos:", err);
      setError("No se pudieron cargar los productos. Por favor, intenta de nuevo.");
      toast.error("Error al cargar productos: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleEdit = (product) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleDeleteClick = (productId) => {
    setProductToDeleteId(productId);
    setShowConfirmModal(true);
  };

  const handleConfirmDelete = async () => {
    if (productToDeleteId) {
      setShowConfirmModal(false);
      try {
        const response = await fetch(`${MOCKAPI_PRODUCTS_URL}/${productToDeleteId}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error(`Error HTTP! Estado: ${response.status}`);
        }
        setProducts(products.filter(product => product.id !== productToDeleteId));
        toast.success("Producto eliminado con éxito!");
      } catch (err) {
        console.error("Error al eliminar el producto:", err);
        toast.error("Error al eliminar el producto: " + err.message);
      } finally {
        setProductToDeleteId(null);
      }
    }
  };

  const handleCancelDelete = () => {
    setShowConfirmModal(false);
    setProductToDeleteId(null);
    toast.info("Eliminación cancelada.");
  };

  const handleFormSubmit = async (productData) => {
    setLoading(true);
    try {
      let response;
      if (productData.id) {
        response = await fetch(`${MOCKAPI_PRODUCTS_URL}/${productData.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(productData),
        });
        toast.success("Producto actualizado con éxito!");
      } else {
        response = await fetch(MOCKAPI_PRODUCTS_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(productData),
        });
        toast.success("Producto agregado con éxito!");
      }

      if (!response.ok) {
        throw new Error(`Error HTTP! Estado: ${response.status}`);
      }

      setIsFormOpen(false);
      setEditingProduct(null);
      fetchProducts();
    } catch (err) {
      console.error("Error al guardar el producto:", err);
      toast.error("Error al guardar el producto: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProductClick = () => {
    setEditingProduct(null);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingProduct(null);
  };

  if (loading && products.length === 0) return <div className="text-center mt-5 fs-4 text-white">Cargando productos...</div>;
  if (error && products.length === 0) return <div className="text-center text-danger mt-5 fs-4">Error: {error}</div>;

  const productToDeleteName = products.find(p => p.id === productToDeleteId)?.name;

  return (
    <>
      <Helmet>
        <title>Panel de Administración - Mi Tienda E-commerce</title>
        <meta nameNname="description" content="Panel de administración de productos de Mi Tienda E-commerce. Gestiona tu inventario, añade, edita o elimina productos." />
        <meta name="keywords" content="admin, dashboard, gestión de productos, inventario, e-commerce, administrador" />
      </Helmet>

      <Container fluid className="p-4 bg-dark min-vh-100 text-white">
        <h1 className="fs-1 fw-bold text-white mb-5 text-center">Panel de Administración de Productos</h1>

        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="fs-3 fw-semibold text-light">Listado de Productos</h2>
          <Button
            onClick={handleAddProductClick}
            variant="success"
            className="fw-bold py-2 px-4 rounded-3 shadow-sm transition-hover-scale-effect d-flex align-items-center"
            aria-label="Abrir formulario para agregar nuevo producto"
          >
            <FaPlusCircle className="me-2" /> Agregar Nuevo Producto
          </Button>
        </div>

        <Modal show={isFormOpen} onHide={handleCloseForm} centered size="lg" aria-labelledby="productFormModalTitle">
          <Modal.Header closeButton className="bg-secondary text-white">
            <Modal.Title id="productFormModalTitle">{editingProduct ? 'Editar Producto' : 'Agregar Nuevo Producto'}</Modal.Title>
          </Modal.Header>
          <Modal.Body className="bg-dark text-white">
            <ProductForm
              productToEdit={editingProduct}
              onSubmit={handleFormSubmit}
              onCancel={handleCloseForm}
            />
          </Modal.Body>
        </Modal>

        {loading && products.length > 0 && <div className="text-center fs-4 mb-4 text-light">Actualizando lista de productos...</div>}
        {error && products.length > 0 && <div className="text-center text-danger fs-4 mb-4">Error al actualizar: {error}</div>}

        <Row xs={1} md={2} lg={3} className="g-4">
          {products.length === 0 && !loading && !error ? (
            <Col className="col-12 text-center text-light fs-5">No hay productos disponibles. Agrega uno.</Col>
          ) : (
            products.map(product => (
              <Col key={product.id}>
                <Card className="h-100 shadow-sm d-flex flex-column bg-secondary text-white">
                  <Card.Img
                    variant="top"
                    src={product.avatar && product.avatar.trim() !== '' ? product.avatar : PLACEHOLDER_IMAGE}
                    alt={product.name}
                    className="img-fluid object-fit-cover rounded-top"
                    style={{ height: '12rem' }}
                   
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = PLACEHOLDER_IMAGE; 
                      console.warn(`Error al cargar la imagen para ${product.name}. Usando placeholder.`);
                    }}
                  />
                  <Card.Body className="d-flex flex-column flex-grow-1 p-4">
                    <Card.Title className="fs-4 fw-semibold text-white mb-2">{product.name}</Card.Title>
                    <Card.Text className="text-info fs-5 fw-bold mb-3">${(parseFloat(product.price)).toFixed(2)}</Card.Text>
                    <Card.Text className="text-light small mb-4 line-clamp-3">{product.description}</Card.Text>
                  </Card.Body>
                  <Card.Footer className="bg-dark border-0 d-flex justify-content-end space-x-2 p-3 mt-auto">
                    <Button
                      onClick={() => handleEdit(product)}
                      variant="primary"
                      size="sm"
                      className="fw-bold rounded-2 d-flex align-items-center me-2"
                      aria-label={`Editar producto ${product.name}`}
                    >
                      <FaEdit className="me-1" /> Editar
                    </Button>
                    <Button
                      onClick={() => handleDeleteClick(product.id)}
                      variant="danger"
                      size="sm"
                      className="fw-bold rounded-2 d-flex align-items-center"
                      aria-label={`Eliminar producto ${product.name}`}
                    >
                      <FaTrash className="me-1" /> Eliminar
                    </Button>
                  </Card.Footer>
                </Card>
              </Col>
            ))
          )}
        </Row>
      </Container>

      <ConfirmationModal
        isOpen={showConfirmModal}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="Confirmar eliminación"
        message={`¿Estás seguro de que quieres eliminar el producto "${productToDeleteName || 'desconocido'}" de forma permanente? Esta acción no se puede deshacer.`}
        descriptionId="confirmDeleteDescription"
      />
    </>
  );
};

export default DashboardPage;