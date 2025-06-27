
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Helmet } from 'react-helmet-async';


import { Container, Form, Button, Card } from 'react-bootstrap';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = login(username, password);

    if (success) {
      navigate('/dashboard');
    }
  };

  return (
    <>
      <Helmet>
        <title>Iniciar Sesión - Mi Tienda E-commerce</title>
        <meta name="description" content="Inicia sesión en tu cuenta de administrador de Mi Tienda E-commerce para acceder al panel de control." />
        <meta name="keywords" content="login, iniciar sesión, administración, panel de control, e-commerce" />
      </Helmet>

      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '70vh', paddingBlock: '2.5rem' }}>
        <Card className="p-4 p-md-5 rounded-4 shadow-lg border border-light" style={{ maxWidth: '32rem', width: '100%' }}>
          <Card.Body>

            <h2 className="display-5 fw-bold text-center text-dark mb-5">Iniciar Sesión</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-4" controlId="username">
                <Form.Label className="fs-5 fw-semibold text-secondary">Usuario</Form.Label>
                <Form.Control
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  autoComplete="username"
                  className="p-3 fs-5 text-secondary rounded shadow-sm"
                />
              </Form.Group>

              <Form.Group className="mb-5" controlId="password">
                <Form.Label className="fs-5 fw-semibold text-secondary">Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="admin"
                  autoComplete="current-password"
                  className="p-3 fs-5 text-secondary rounded shadow-sm"
                />
              </Form.Group>

              <div className="d-flex justify-content-center">
                <Button
                  type="submit"
                  variant="primary"
                  className="fw-bold py-3 px-5 rounded-3 shadow-lg fs-4"

                >
                  Entrar
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default Login;