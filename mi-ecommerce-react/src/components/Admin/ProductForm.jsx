// src/components/admin/ProductForm.jsx
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify'; // <-- Importa toast
// Importa componentes o clases de Bootstrap si es necesario para un control más específico
// import { Form, Button, Container, Row, Col } from 'react-bootstrap'; 

const ProductForm = ({ onProductAdded, productToEdit }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    if (productToEdit) {
      setName(productToEdit.name || '');
      setPrice(productToEdit.price || 0);
      setDescription(productToEdit.description || '');
      setImage(productToEdit.image || '');
    } else {
      setName('');
      setPrice(0);
      setDescription('');
      setImage('');
    }
    setError(null);
    setValidationErrors({});
  }, [productToEdit]);

  const MOCKAPI_PRODUCTS_URL = "https://68599f039f6ef9611153b9ee.mockapi.io/api/v1/productos";

  const validateForm = () => {
    const errors = {};
    if (!name.trim()) {
      errors.name = 'El nombre del producto es obligatorio.';
    }
    if (parseFloat(price) <= 0 || isNaN(parseFloat(price))) {
      errors.price = 'El precio debe ser un número mayor a 0.';
    }
    if (description.trim().length < 10) {
      errors.description = 'La descripción debe tener al menos 10 caracteres.';
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setValidationErrors({});

    if (!validateForm()) {
      toast.error('Por favor, corrige los errores en el formulario.', {
        position: "bottom-center",
        autoClose: 3000,
      });
      return;
    }

    setLoading(true);
    try {
      const productData = {
        name: name.trim(),
        price: parseFloat(price),
        description: description.trim(),
        image: image.trim(),
        createdAt: productToEdit ? productToEdit.createdAt : new Date().toISOString(),
      };

      let response;
      if (productToEdit) {
        response = await fetch(`${MOCKAPI_PRODUCTS_URL}/${productToEdit.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(productData),
        });
      } else {
        response = await fetch(MOCKAPI_PRODUCTS_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(productData),
        });
      }
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Error al ${productToEdit ? 'actualizar' : 'agregar'} el producto.`);
      }

      const newProduct = await response.json();
      if (onProductAdded) {
        onProductAdded(newProduct);
      }
      toast.success(`Producto ${productToEdit ? 'actualizado' : 'agregado'} exitosamente!`, {
        position: "top-right",
        autoClose: 2000,
      });
      if (!productToEdit) {
        setName('');
        setPrice(0);
        setDescription('');
        setImage('');
      }

    } catch (err) {
      console.error("Error al procesar el producto:", err);
      setError(err.message || 'Ocurrió un error inesperado al procesar el producto.');
      toast.error(err.message || 'Ocurrió un error inesperado al procesar el producto.', {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow mx-auto" style={{ maxWidth: '600px' }}>
      <h3 className="fs-3 fw-bold text-dark mb-4 text-center">
        {productToEdit ? 'Editar Producto' : 'Agregar Nuevo Producto'}
      </h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label fs-5 fw-semibold">Nombre del Producto</label>
          <input
            type="text"
            id="name"
            className={`form-control form-control-lg ${validationErrors.name ? 'is-invalid' : ''}`}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ej: Camiseta de algodón"
          />
          {validationErrors.name && <div className="invalid-feedback">{validationErrors.name}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="price" className="form-label fs-5 fw-semibold">Precio</label>
          <input
            type="number"
            id="price"
            className={`form-control form-control-lg ${validationErrors.price ? 'is-invalid' : ''}`}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            min="0.01"
            step="0.01"
            placeholder="Ej: 29.99"
          />
          {validationErrors.price && <div className="invalid-feedback">{validationErrors.price}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label fs-5 fw-semibold">Descripción</label>
          <textarea
            id="description"
            rows="4"
            className={`form-control form-control-lg ${validationErrors.description ? 'is-invalid' : ''}`}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descripción detallada del producto..."
          ></textarea>
          {validationErrors.description && <div className="invalid-feedback">{validationErrors.description}</div>}
        </div>

        <div className="mb-4">
          <label htmlFor="image" className="form-label fs-5 fw-semibold">URL de la Imagen</label>
          <input
            type="text"
            id="image"
            className={`form-control form-control-lg ${validationErrors.image ? 'is-invalid' : ''}`}
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="Ej: https://ejemplo.com/imagen.jpg"
          />
          {validationErrors.image && <div className="invalid-feedback">{validationErrors.image}</div>}
        </div>

        {error && <p className="text-danger text-center mb-3">{error}</p>}

        <button
          type="submit"
          className="btn btn-primary btn-lg w-100 shadow-sm"
          disabled={loading}
        >
          {loading ? (productToEdit ? 'Actualizando...' : 'Agregando...') : (productToEdit ? 'Guardar Cambios' : 'Agregar Producto')}
        </button>
      </form>
    </div>
  );
};

export default ProductForm;