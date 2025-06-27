// src/components/Header/Header.jsx
import React, { useState, useRef, useEffect } from 'react'; // Importa useState, useRef y useEffect
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCarrito } from '../../context/CarritoContext';
import { FaShoppingCart } from 'react-icons/fa';

// Importar componentes de React-Bootstrap
import { Navbar, Nav, Container, Badge, Button } from 'react-bootstrap';

const Header = () => {
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();
  const { cartItems } = useCarrito();

  const totalCartItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  // === NUEVO ESTADO Y REFERENCIA ===
  // Estado para controlar si la Navbar está expandida (abierta)
  const [expanded, setExpanded] = useState(false); 
  // Referencia al elemento de la Navbar en el DOM
  const navbarRef = useRef(null); 

  // Efecto para manejar clics fuera de la Navbar
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Si la Navbar está expandida Y el clic no fue dentro de la Navbar
      // (navbarRef.current verifica que la referencia esté definida)
      if (expanded && navbarRef.current && !navbarRef.current.contains(event.target)) {
        setExpanded(false); // Colapsa la Navbar
      }
    };

    // Añade el event listener al documento cuando el componente se monta
    // Esto detectará clics en cualquier parte de la página
    document.addEventListener('mousedown', handleClickOutside);

    // Función de limpieza: remueve el event listener cuando el componente se desmonta
    // Esto es crucial para evitar fugas de memoria
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [expanded]); // El efecto se re-ejecuta solo si el estado 'expanded' cambia

  // === FIN DE NUEVO ESTADO Y REFERENCIA ===

  return (
    // Usa el estado 'expanded' para controlar la Navbar de Bootstrap
    // y onToggle para actualizar el estado cuando se hace clic en el botón de hamburguesa
    <Navbar 
      variant="dark" 
      expand="lg" 
      fixed="top" 
      className="shadow-lg py-3 custom-navbar-animated" 
      style={{ zIndex: 1060 }}
      expanded={expanded} // Controla la expansión de la Navbar de Bootstrap
      onToggle={() => setExpanded(!expanded)} // Invierte el estado al usar el toggle
      ref={navbarRef} // Asigna la referencia al elemento Navbar
    >
      <Container fluid>
        <Navbar.Brand
          as={Link}
          to="/"
          className="fs-3 fw-bold text-white text-decoration-none"
        >
          Mi<span className="text-info">eCommerce</span>
        </Navbar.Brand>

        {/* Navbar.Toggle usa onToggle de la Navbar, no necesita cambios */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" aria-label="Abrir navegación principal" />

        {/* El fondo del menú colapsado. Lo cambiaste a bg-blue, asegúrate de que 'bg-blue' esté definido en tu CSS si no es una clase de Bootstrap. */}
        <Navbar.Collapse id="basic-navbar-nav" className="bg-blue"> 
          <Nav
            className="ms-auto"
            // Al seleccionar cualquier enlace de navegación, colapsa la Navbar
            onSelect={() => setExpanded(false)} 
          >
            <Nav.Link as={NavLink} to="/" className="mx-2 text-decoration-none" end>Inicio</Nav.Link>
            <Nav.Link as={NavLink} to="/products" className="mx-2 text-decoration-none">Productos</Nav.Link>

            <Nav.Link as={NavLink} to="/cart" className="mx-2 position-relative text-decoration-none" aria-label={`Ver carrito de compras, ${totalCartItems} ítems`}>
              <FaShoppingCart className="fs-5" />
              {totalCartItems > 0 && (
                <Badge
                  pill
                  bg="danger"
                  className="position-absolute top-0 start-100 translate-middle"
                >
                  {totalCartItems}
                </Badge>
              )}
            </Nav.Link>

            <Nav.Link as={NavLink} to="/about" className="mx-2 text-decoration-none">Acerca de</Nav.Link>

            {isAuthenticated ? (
              <>
                <Nav.Link as={NavLink} to="/dashboard" className="mx-2 text-decoration-none">Dashboard</Nav.Link>
                <Button
                  variant="danger"
                  className="rounded-pill px-4 ms-3"
                  // Cierra la Navbar al hacer clic en "Cerrar Sesión"
                  onClick={() => { logout(); setExpanded(false); }} 
                  aria-label="Cerrar sesión"
                >
                  Cerrar Sesión
                </Button>
              </>
            ) : (
              <Nav.Link as={NavLink} to="/login" className="mx-2">
                <Button 
                  variant="primary" 
                  className="rounded-pill px-4" 
                  aria-label="Iniciar sesión"
                  // Cierra la Navbar al hacer clic en "Login"
                  onClick={() => setExpanded(false)} 
                >
                  Login
                </Button>
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar >
  );
};

export default Header;