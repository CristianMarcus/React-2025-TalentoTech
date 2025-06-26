// src/pages/CartPage.jsx
import React from 'react';
import Cart from '../components/Cart/Cart';
import { Helmet } from 'react-helmet-async'; // <-- NUEVA IMPORTACIÓN

const CartPage = () => {
  return (
    <> {/* Fragmento para Helmet */}
      <Helmet>
        <title>Tu Carrito de Compras - Mi Tienda E-commerce</title>
        <meta name="description" content="Revisa los productos que has añadido a tu carrito de compras en Mi Tienda E-commerce y procede al pago." />
        <meta name="keywords" content="carrito de compras, checkout, comprar online, productos, tienda" />
      </Helmet>
      <div>
        <Cart />
      </div>
    </>
  );
};

export default CartPage;