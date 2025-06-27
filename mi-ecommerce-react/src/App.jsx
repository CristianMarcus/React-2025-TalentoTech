
import React, { lazy, Suspense } from 'react'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { HelmetProvider } from 'react-helmet-async';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';



import Layout from './components/Layout/Layout';
import PrivateRoute from './components/Auth/PrivateRoute'; 

import { CarritoProvider } from './context/CarritoContext';
import { AuthProvider } from './context/AuthContext';


import FloatingCart from './components/FloatingCart/FloatingCart';


import LoadingScreen from './components/LoadingScreen/LoadingScreen'; 




const HomePage = lazy(() => import('./pages/HomePage'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const ProductsPage = lazy(() => import('./pages/ProductsPage'));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'));
const CartPage = lazy(() => import('./pages/CartPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const Login = lazy(() => import('./components/Auth/Login')); 



function App() {
  return (
    <Router>
      <HelmetProvider>
        <AuthProvider>
          <CarritoProvider>
            <Layout>
             
              <Suspense fallback={<LoadingScreen />}>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/products" element={<ProductsPage />} />
                  <Route path="/products/:id" element={<ProductDetailPage />} />
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
              </Suspense> 
            </Layout>
            
            <FloatingCart />
            
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