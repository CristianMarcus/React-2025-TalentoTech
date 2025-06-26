// src/components/ProductForm/ProductForm.jsx
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
// === IMPORTACIONES DE REACT-BOOTSTRAP ===
import { Form, Button, FormGroup, FormLabel, FormControl, Image } from 'react-bootstrap';

// === Definición del PLACEHOLDER_PREVIEW_IMAGE para el formulario ===
const PLACEHOLDER_PREVIEW_IMAGE = 'https://placehold.co/150x150?text=No+Imagen+Disponible'; 

const ProductForm = ({ productToEdit, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',        // Corresponde a 'name' del API
    description: '',
    price: '',
    category: '',     // Campo de categoría
    image: '',        // Corresponde a 'avatar' del API
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (productToEdit) {
      setFormData({
        title: productToEdit.name || '',
        description: productToEdit.description || '',
        price: productToEdit.price || '',
        category: productToEdit.category || '',
        image: productToEdit.avatar || '',
      });
    } else {
      setFormData({
        title: '',
        description: '',
        price: '',
        category: '',
        image: '',
      });
    }
    setErrors({}); // Limpiar errores al cambiar de producto o añadir nuevo
  }, [productToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
    // Limpiar el error específico del campo cuando el usuario empieza a escribir
    if (errors[name]) {
      setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
    }
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.title.trim()) {
      newErrors.title = 'El título es obligatorio.';
    }
    if (!formData.description.trim()) {
      newErrors.description = 'La descripción es obligatoria.';
    }
    if (!formData.price || isNaN(formData.price) || parseFloat(formData.price) <= 0) {
      newErrors.price = 'El precio debe ser un número positivo.';
    }
    if (!formData.category.trim()) {
      newErrors.category = 'La categoría es obligatoria.';
    }
    if (formData.image && !/^https?:\/\/.+\.(jpg|jpeg|png|gif|svg)(\?.+)?$/.test(formData.image)) {
      newErrors.image = 'La URL de la imagen no es válida (debe terminar en jpg, png, gif, svg y ser http/https).';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const dataToSend = {
        name: formData.title,
        description: formData.description,
        price: parseFloat(formData.price),
        category: formData.category,
        avatar: formData.image,
      };

      onSubmit({ ...dataToSend, id: productToEdit ? productToEdit.id : undefined });
    } else {
      toast.error("Por favor, corrige los errores en el formulario.");
    }
  };

  return (
    // === USO DE COMPONENTES Y CLASES DE BOOTSTRAP ===
    <Form onSubmit={handleSubmit} className="p-4 rounded shadow-lg bg-dark text-white">
      {/* SE HA ELIMINADO EL H3 Y EL BOTÓN DE CERRAR DE AQUÍ, YA QUE EL MODAL PADRE LOS PROPORCIONA */}
      {/* <h3 className="mb-4 text-center text-white">
        {productToEdit ? 'Editar Producto' : 'Agregar Nuevo Producto'}
      </h3>
      <Button
        variant="close" 
        onClick={onCancel}
        className="position-absolute top-0 end-0 m-3"
        aria-label="Cerrar formulario"
      />
      */}

      <FormGroup className="mb-3">
        <FormLabel htmlFor="title">Título *</FormLabel>
        <FormControl
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          isInvalid={!!errors.title} 
          className="bg-secondary border-0 text-white" 
          aria-required="true"
          aria-describedby={errors.title ? "titleError" : undefined}
        />
        {errors.title && <FormControl.Feedback type="invalid" id="titleError">{errors.title}</FormControl.Feedback>}
      </FormGroup>

      <FormGroup className="mb-3">
        <FormLabel htmlFor="description">Descripción *</FormLabel>
        <FormControl
          as="textarea"
          id="description"
          name="description"
          rows={4}
          value={formData.description}
          onChange={handleChange}
          isInvalid={!!errors.description}
          className="bg-secondary border-0 text-white"
          aria-required="true"
          aria-describedby={errors.description ? "descriptionError" : undefined}
        />
        {errors.description && <FormControl.Feedback type="invalid" id="descriptionError">{errors.description}</FormControl.Feedback>}
      </FormGroup>

      <FormGroup className="mb-3">
        <FormLabel htmlFor="price">Precio *</FormLabel>
        <FormControl
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          step="0.01"
          isInvalid={!!errors.price}
          className="bg-secondary border-0 text-white"
          aria-required="true"
          aria-describedby={errors.price ? "priceError" : undefined}
        />
        {errors.price && <FormControl.Feedback type="invalid" id="priceError">{errors.price}</FormControl.Feedback>}
      </FormGroup>

      {/* === CAMPO: Categoría === */}
      <FormGroup className="mb-3">
        <FormLabel htmlFor="category">Categoría *</FormLabel>
        <FormControl
          type="text"
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          isInvalid={!!errors.category}
          className="bg-secondary border-0 text-white"
          aria-required="true"
          aria-describedby={errors.category ? "categoryError" : undefined}
        />
        {errors.category && <FormControl.Feedback type="invalid" id="categoryError">{errors.category}</FormControl.Feedback>}
      </FormGroup>

      <FormGroup className="mb-3">
        <FormLabel htmlFor="image">URL de la Imagen (Avatar)</FormLabel>
        <FormControl
          type="url"
          id="image"
          name="image"
          value={formData.image}
          onChange={handleChange}
          isInvalid={!!errors.image}
          className="bg-secondary border-0 text-white"
          aria-describedby={errors.image ? "imageError" : undefined}
        />
        {errors.image && <FormControl.Feedback type="invalid" id="imageError">{errors.image}</FormControl.Feedback>}
        
        {/* Este Form.Text se mantiene si es relevante para la entrada de URL */}
        <Form.Text className="text-muted mt-1">
          Para una aplicación real, aquí podrías subir archivos directamente a un servicio de almacenamiento (ej. Cloudinary). Con MockAPI, necesitas una URL pública.
        </Form.Text>

        {/* === Previsualización de la imagen === */}
        <div className="mt-3 text-center">
          <Image 
            src={formData.image && formData.image.trim() !== '' ? formData.image : PLACEHOLDER_PREVIEW_IMAGE} 
            alt="Previsualización de la imagen del producto" 
            style={{ maxWidth: '150px', maxHeight: '150px', objectFit: 'contain', border: '1px solid #ccc', padding: '5px', borderRadius: '5px' }}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = PLACEHOLDER_PREVIEW_IMAGE;
            }}
            fluid // Hace que la imagen sea responsive
            thumbnail // Añade un borde y relleno ligero
          />
        </div>
      </FormGroup>

      <div className="d-flex justify-content-end gap-2 mt-4">
        <Button variant="secondary" onClick={onCancel} className="fw-bold px-4 py-2">
          Cancelar
        </Button>
        <Button type="submit" variant="success" className="fw-bold px-4 py-2">
          {productToEdit ? 'Guardar Cambios' : 'Agregar Producto'}
        </Button>
      </div>
    </Form>
  );
};

export default ProductForm;