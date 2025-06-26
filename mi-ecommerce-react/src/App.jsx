// src/App.jsx
import React, { lazy, Suspense } from 'react'; // Importa lazy y Suspense
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { HelmetProvider } from 'react-helmet-async';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';


// --- Importaciones de Componentes (Ahora Lazy Loaded) ---
import Layout from './components/Layout/Layout';
import PrivateRoute from './components/Auth/PrivateRoute'; // PrivateRoute no necesita lazy loading si es un wrapper simple

import { CarritoProvider } from './context/CarritoContext';
import { AuthProvider } from './context/AuthContext';

// Importa tu nuevo componente FloatingCart
import FloatingCart from './components/FloatingCart/FloatingCart'; 

// ====================================================================
// Define tus componentes de página para Carga Perezosa
// ====================================================================

const HomePage = lazy(() => import('./pages/HomePage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const ProductsPage = lazy(() => import('./pages/ProductsPage'));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'));
const CartPage = lazy(() => import('./pages/CartPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const Login = lazy(() => import('./components/Auth/Login')); // El componente de Login también puede ser lazy loaded

// ====================================================================

function App() {
  return (
    <Router>
      <HelmetProvider>
        <AuthProvider>
          <CarritoProvider>
            <Layout>
              {/* ==================================================================== */}
              {/* Envuelve tus rutas con Suspense */}
              {/* Puedes añadir un componente de carga más sofisticado aquí, como un spinner */}
              {/* ==================================================================== */}
              <Suspense fallback={
                <div className="d-flex justify-content-center align-items-center vh-100">
                  <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Cargando...</span>
                  </div>
                </div>
              }>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/products" element={<ProductsPage />} />
                  <Route path="/products/:id" element={<ProductDetailPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/login" element={<Login />} />

                  {/* Rutas Protegidas (envueltas en PrivateRoute, que a su vez renderizará el componente lazy) */}
                  <Route
                    path="/dashboard"
                    element={
                      <PrivateRoute>
                        <DashboardPage />
                      </PrivateRoute>
                    }
                  />
                  <Route
                    path="/cart"
                    element={
                      <PrivateRoute>
                        <CartPage />
                      </PrivateRoute>
                    }
                  />

                  <Route path="*" element={<h2 className="text-3xl font-bold text-center mt-10">404 - Página No Encontrada</h2>} />
                </Routes>
              </Suspense> {/* Cierre de Suspense */}
            </Layout>
            {/* Agrega el FloatingCart aquí, fuera de Layout pero dentro de los Providers */}
            <FloatingCart />
            {/* Agrega ToastContainer aquí, fuera de Layout pero dentro de Router/Providers */}
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
            />
          </CarritoProvider>
        </AuthProvider>
      </HelmetProvider>
    </Router>
  );
}

export default App;