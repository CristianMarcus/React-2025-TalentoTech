
import CartItem from './CartItem';
import { Link, useNavigate } from 'react-router-dom';
import { useCarrito } from '../../context/CarritoContext';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';

const Cart = () => {
  const { cartItems, handleUpdateQuantity, handleRemoveItem, clearCart } = useCarrito();
  const navigate = useNavigate();

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.warn('Tu carrito está vacío. ¡No hay nada que comprar!', {
        position: "bottom-right",
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

  return (
    <Container className="my-5">
      <Card className="bg-dark text-white p-4 p-md-5 rounded-4 shadow-lg border border-secondary">
        <Card.Body>
          <h2 className="display-5 fw-bold mb-4 text-center">Tu Carrito de Compras</h2>
          {cartItems.length === 0 ? (
            <div className="text-center py-5">
              <p className="fs-4 text-white-50 mb-4">Tu carrito está vacío. ¡Descubre productos increíbles!</p>
              <Button
                as={Link}
                to="/products"
                variant="primary"
                className="fw-semibold py-3 px-5 rounded-3 shadow text-decoration-none" 
              >
                Ir a Productos
              </Button>
            </div>
          ) : (
            <>
              <div className="mb-4">
                {cartItems.map(item => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onUpdateQuantity={handleUpdateQuantity}
                    onRemoveItem={handleRemoveItem}
                  />
                ))}
              </div>
              <div className="d-flex justify-content-between align-items-center mt-4 pt-3 border-top border-white-50">
                <h3 className="fs-3 fw-bold text-white">Total:</h3>
                <p className="display-6 fw-bold text-success">${total.toFixed(2)}</p>
              </div>

              <div className="d-flex flex-column flex-md-row justify-content-between gap-3 mt-4">
                <Button
                  as={Link}
                  to="/products"
                  variant="outline-info"
                  className="fw-semibold py-2 px-4 rounded-3 shadow flex-grow-1 flex-md-grow-0 text-decoration-none" // text-decoration-none AÑADIDO
                  aria-label="Continuar comprando productos"
                >
                  Continuar Comprando
                </Button>

                
                <div className="d-flex flex-column flex-sm-row gap-2 justify-content-end flex-grow-1 flex-md-grow-0">
                  <Button
                    variant="outline-danger"
                    onClick={clearCart}
                    className="fw-semibold py-2 px-4 rounded-3 shadow"
                    aria-label="Vaciar todo el carrito de compras"
                  >
                    Vaciar Carrito
                  </Button>
                  <Button
                    variant="success"
                    onClick={handleCheckout}
                    className="fw-semibold py-2 px-5 rounded-3 shadow"
                  >
                    Finalizar Compra
                  </Button>
                </div>
              </div>
            </>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Cart;