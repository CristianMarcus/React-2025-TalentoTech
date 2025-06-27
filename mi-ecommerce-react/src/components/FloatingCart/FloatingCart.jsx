import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button, Badge } from 'react-bootstrap';
import { FaShoppingCart, FaTimes, FaPlus, FaMinus, FaTrash } from 'react-icons/fa'; 
import { useCarrito } from '../../context/CarritoContext';
import { toast } from 'react-toastify'; 

const FloatingCart = () => {
  
  const { cartItems, handleUpdateQuantity, handleRemoveItem, clearCart } = useCarrito();
  
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const [isOpen, setIsOpen] = useState(false);
  const cartRef = useRef(null);
  const location = useLocation();

  const toggleCart = () => {
    setIsOpen(!isOpen);
  };

  
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.warn('Tu carrito está vacío. ¡No hay nada que comprar!', {
        position: "bottom-center", 
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    clearCart(); 
    setIsOpen(false);
    toast.success('¡Compra finalizada con éxito! Gracias por tu pedido.', {
      position: "top-center",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  
  const handleClearCart = () => {
    if (cartItems.length === 0) {
      toast.info('El carrito ya está vacío.', {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    clearCart(); 
    setIsOpen(false); 
    toast.info('El carrito ha sido vaciado.', {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };


  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  
  if (itemCount === 0 && !isOpen) { 
    return null; 
  }

  return (
    <div ref={cartRef}>
      
      <Button
        onClick={toggleCart}
        variant="primary"
        className="rounded-circle shadow-lg d-flex align-items-center justify-content-center p-3"
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          zIndex: 1050,
          width: '60px',
          height: '60px',
        }}
        aria-label="Alternar visibilidad del carrito"
      >
        <FaShoppingCart size={24} />
        {itemCount > 0 && (
          <Badge
            pill
            bg="danger"
            className="position-absolute top-0 start-100 translate-middle"
            style={{ fontSize: '0.7em' }}
          >
            {itemCount}
          </Badge>
        )}
      </Button>

      
      {isOpen && (
        <div
          className="bg-dark text-white p-4 rounded-3 shadow-lg animate__animated animate__fadeInRight"
          style={{
            position: 'fixed',
            bottom: '90px',
            right: '20px',
            width: '300px',
            maxHeight: '400px',
            overflowY: 'auto',
            zIndex: 1049,
            border: '1px solid #444',
          }}
        >
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="mb-0">Tu Carrito</h4>
            <Button variant="outline-light" size="sm" onClick={toggleCart} aria-label="Cerrar carrito">
              <FaTimes />
            </Button>
          </div>
          {itemCount === 0 ? (
            <p className="text-white-50">El carrito está vacío.</p>
          ) : (
            <>
              <ul className="list-unstyled">
                {cartItems.map(item => (
                  <li key={item.id} className="d-flex flex-column mb-3 pb-2 border-bottom border-secondary">
                    <div className="d-flex justify-content-between align-items-center w-100 mb-1">
                      <span className="fw-semibold">{item.name}</span>
                      <Button 
                        variant="link" 
                        className="text-danger p-0" 
                        onClick={() => handleRemoveItem(item.id)}
                        aria-label={`Eliminar ${item.name} del carrito`}
                      >
                        <FaTrash size={14} />
                      </Button>
                    </div>
                    <div className="d-flex justify-content-between align-items-center w-100">
                      <div className="d-flex align-items-center gap-2">
                        <Button 
                          variant="outline-secondary" 
                          size="sm" 
                          onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)} 
                          disabled={item.quantity <= 1}
                          aria-label={`Decrementar cantidad de ${item.name}`}
                        >
                          <FaMinus size={10} />
                        </Button>
                        <span className="fw-bold">{item.quantity}</span>
                        <Button 
                          variant="outline-secondary" 
                          size="sm" 
                          onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                          aria-label={`Incrementar cantidad de ${item.name}`}
                        >
                          <FaPlus size={10} />
                        </Button>
                      </div>
                      <span className="fw-bold text-success">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="d-flex justify-content-between fw-bold mt-3 border-top border-white-50 pt-2">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="d-grid gap-2 mt-3">
                <Button variant="success" onClick={handleCheckout}>
                  Finalizar Compra
                </Button>
                <Button variant="outline-danger" onClick={handleClearCart}>
                  Vaciar Carrito
                </Button>
                <Button as={Link} to="/cart" variant="outline-info" onClick={toggleCart}>
                  Revisar Carrito
                </Button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default FloatingCart;