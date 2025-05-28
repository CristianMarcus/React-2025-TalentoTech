// src/App.jsx
import React from 'react'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// --- Importaciones de Componentes ---
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import AboutPage from './pages/AboutPage';
import Login from './components/auth/Login';
import DashboardPage from './pages/DashboardPage';
import PrivateRoute from './components/auth/PrivateRoute';


import { CarritoProvider } from './context/CarritoContext';
import { AuthProvider } from './context/AuthContext'; 

function App() {
  

  return (
    <Router>
      <AuthProvider>
        <CarritoProvider> 
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/:id" element={<ProductDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/about" element={<AboutPage />} />
              
              <Route path="/login" element={<Login />} />

              
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute> 
                    <DashboardPage /> 
                  </PrivateRoute>
                }
              />

              <Route path="*" element={<h2 className="text-3xl font-bold text-center mt-10">404 - Página No Encontrada</h2>} />
            </Routes>
          </Layout>
        </CarritoProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;