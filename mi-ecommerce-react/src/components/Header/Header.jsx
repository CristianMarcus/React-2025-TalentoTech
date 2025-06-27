
import React, { useState, useRef, useEffect } from 'react'; 
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCarrito } from '../../context/CarritoContext';
import { FaShoppingCart } from 'react-icons/fa';


import { Navbar, Nav, Container, Badge, Button } from 'react-bootstrap';

const Header = () => {
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();
  const { cartItems } = useCarrito();

  const totalCartItems = cartItems.reduce((total, item) => total + item.quantity, 0);


  const [expanded, setExpanded] = useState(false); 
  
  const navbarRef = useRef(null); 

  
  useEffect(() => {
    const handleClickOutside = (event) => {
      
      if (expanded && navbarRef.current && !navbarRef.current.contains(event.target)) {
        setExpanded(false); 
      }
    };

    
    document.addEventListener('mousedown', handleClickOutside);

    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [expanded]); 

  

  return (
    
    <Navbar 
      variant="dark" 
      expand="lg" 
      fixed="top" 
      className="shadow-lg py-3 custom-navbar-animated" 
      style={{ zIndex: 1060 }}
      expanded={expanded} 
      onToggle={() => setExpanded(!expanded)} 
      ref={navbarRef} 
    >
      <Container fluid>
        <Navbar.Brand
          as={Link}
          to="/"
          className="fs-3 fw-bold text-white text-decoration-none"
        >
          Mi<span className="text-info">eCommerce</span>
        </Navbar.Brand>

      
        <Navbar.Toggle aria-controls="basic-navbar-nav" aria-label="Abrir navegación principal" />

       
        <Navbar.Collapse id="basic-navbar-nav" className="bg-blue"> 
          <Nav
            className="ms-auto"
            
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