
import React from 'react';
import { Row, Col, Button, Card } from 'react-bootstrap';

const CartItem = ({ item, onUpdateQuantity, onRemoveItem }) => {
  const { image, name, price = 0, quantity = 0, id } = item || {};
  
  const PLACEHOLDER_IMAGE = 'https://via.placeholder.com/100x100?text=Sin+Imagen';

  return (
    <Card className="mb-3 shadow-sm border border-secondary bg-dark text-white">
      <Card.Body>
        <Row className="align-items-center g-3">
          
          <Col xs={4} sm={3} md={2} className="d-flex justify-content-center align-items-center">
            <img
              src={image && image.trim() !== '' ? image : PLACEHOLDER_IMAGE}
              alt={name || 'Producto en el carrito'}
              className="img-fluid rounded shadow-sm border border-secondary p-1"
              style={{ width: '80px', height: '80px', objectFit: 'contain' }}
              onError={(e) => { 
                e.currentTarget.onerror = null; 
                e.currentTarget.src = PLACEHOLDER_IMAGE; 
                console.warn(`Error al cargar la imagen de ${name || 'un producto'}. Usando placeholder.`);
              }}
            />
          </Col>

          
          <Col xs={8} sm={9} md={5}>
            <h5 className="fw-semibold mb-1" title={name}>
              {name || 'Producto Desconocido'}
            </h5>
            <p className="text-light mb-2">${price.toFixed(2)}</p>
          </Col>

          
          <Col
            xs={12}
            md={5}
            className="d-flex flex-column flex-md-row justify-content-md-end align-items-center gap-2 mt-2 mt-md-0 flex-wrap"
          >
            
            <div className="d-flex align-items-center me-md-2 w-auto">
              <Button
                onClick={() => onUpdateQuantity(id, quantity - 1)}
                variant="outline-light"
                className="px-3 py-1 rounded-pill"
                disabled={quantity <= 1}
                aria-label={`Disminuir cantidad de ${name || 'este producto'}`}
              >
                -
              </Button>
              <span className="mx-2 fs-5 fw-medium text-white" aria-live="polite" aria-atomic="true">
                {quantity}
              </span>
              <Button
                onClick={() => onUpdateQuantity(id, quantity + 1)}
                variant="outline-light"
                className="px-3 py-1 rounded-pill"
                aria-label={`Aumentar cantidad de ${name || 'este producto'}`}
              >
                +
              </Button>
            </div>
            
            
            <span className="fw-bold fs-5 text-success mb-0 d-none d-md-inline-block ms-md-auto me-2">
                ${(price * quantity).toFixed(2)}
            </span>

            
            <Button
              onClick={() => onRemoveItem(id)}
              variant="danger"
              size="sm"
              className="px-4 shadow-sm"
              aria-label={`Eliminar ${name || 'este producto'} del carrito`}
            >
              Eliminar
            </Button>
          </Col>
          
          <Col xs={12} className="d-block d-md-none text-center mt-2">
            <p className="fw-bold fs-4 text-success mb-0">Total: ${(price * quantity).toFixed(2)}</p>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default CartItem;